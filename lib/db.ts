import { Client } from "pg";

export async function getPgClient(connectionString: string) {

  // todo
  try {
    const client = new Client({ connectionString });
    await client.connect();
    console.log("Connection established")
    return client;
  }
  catch (err) {
    console.log("err", err)
    return "CLIENT_NOT_CONNECTED"
  }

}
