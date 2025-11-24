import { MongoClient, ObjectId } from "mongodb";

export async function fetchMongoSchema(connectionString: string) {
  try {
    console.log("In fetcginh mongo schema", connectionString)
    const client = new MongoClient(connectionString);

    await client.connect();

    console.log("Client connected", client)

    function getDbNameFromUri(uri: string) {
      return uri.split("/").pop().split("?")[0];
    }

    const dbName = getDbNameFromUri(connectionString);
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    console.log("collections", collections)

    const tables = [];
    const relations: any = [];

    for (const col of collections) {
      const collection = db.collection(col.name);

      // Sample documents
      const docs = await collection.find({}).limit(30).toArray();

      const inferred = inferCollectionSchema(docs);

      tables.push({
        name: col.name,
        columns: inferred.fields
      });

      // detect ObjectId references to other collections
      inferred.fields.forEach((f) => {
        if (f.dataType === "ObjectId") {
          const target = guessReferencedCollection(f.name, collections);

          if (target) {
            relations.push({
              sourceTable: col.name,
              sourceColumn: f.name,
              targetTable: target,
              targetColumn: "_id",
            });
          }
        }
      });
    }

    await client.close();
    const returningData = {
      tables, relations, message: "CLIENT_CONNECTED"
    }

    console.log(returningData)
    return returningData;

  } catch (err) {
    console.error(err);
    return {
      tables: [],
      relations: [], message: "CLIENT_NOT_CONNECTED"
    };
  }
}



function inferCollectionSchema(docs) {
  const fields = {};

  docs.forEach((doc) => {
    extractFields(doc, fields);
  });

  return {
    fields: Object.entries(fields).map(([name, type]) => ({
      name,
      dataType: type,
    })),
  };
}

// Recursive field extractor
function extractFields(obj, out, prefix = "") {
  for (const key in obj) {
    const fullKey = prefix + key;
    const value = obj[key];

    if (value instanceof ObjectId) {
      out[fullKey] = "ObjectId";
    } else if (Array.isArray(value)) {
      out[fullKey] = "array";
    } else if (typeof value === "object" && value !== null) {
      out[fullKey] = "object";
      extractFields(value, out, fullKey + ".");
    } else {
      out[fullKey] = typeof value;
    }
  }
}

function guessReferencedCollection(fieldName, collections) {
  const base = fieldName.replace(/Id$/, "").toLowerCase();
  for (const c of collections) {
    if (c.name.toLowerCase() === base || c.name.toLowerCase().startsWith(base)) {
      return c.name;
    }
  }
  return null;
}
