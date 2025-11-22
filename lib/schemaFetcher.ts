import { getPgClient } from "./db";
import { SchemaResponse } from "./schemaTypes";

export async function fetchSchema(connectionString: string): Promise<SchemaResponse> {
  console.log("In Fetching Schema")
  const client = await getPgClient(connectionString);

  if(!client || client === 'CLIENT_NOT_CONNECTED' ){
    return {
    tables: [],
    relations: [],
    message: 'CLIENT_NOT_CONNECTED'
  };
  }

  const tablesRes = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';
  `);

  console.log("Tables",tablesRes)

  const tables = [];

  for (const t of tablesRes.rows) {
    const tableName = t.table_name;

    const columnsRes = await client.query(
      `
      SELECT column_name, data_type, is_nullable,
        EXISTS (
          SELECT 1
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          WHERE tc.table_name = $1
          AND tc.constraint_type = 'PRIMARY KEY'
          AND kcu.column_name = columns.column_name
        ) as is_primary
      FROM information_schema.columns
      WHERE table_name = $1;
    `,
      [tableName]
    );

    tables.push({
      name: tableName,
      columns: columnsRes.rows.map((c: any) => ({
        name: c.column_name,
        dataType: c.data_type,
        isNullable: c.is_nullable === "YES",
        isPrimaryKey: c.is_primary,
      })),
    });
  }

  const relationsRes = await client.query(`
    SELECT
      kcu.table_name AS source_table,
      kcu.column_name AS source_column,
      ccu.table_name AS target_table,
      ccu.column_name AS target_column
    FROM information_schema.key_column_usage kcu
    JOIN information_schema.constraint_column_usage ccu
      ON kcu.constraint_name = ccu.constraint_name
    JOIN information_schema.table_constraints tc
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY';
  `);

  await client.end();

  return {
    tables,
    relations: relationsRes.rows.map((r: any) => ({
      sourceTable: r.source_table,
      sourceColumn: r.source_column,
      targetTable: r.target_table,
      targetColumn: r.target_column,
    })),
    message: 'CLIENT_CONNECTED'
  };
}
