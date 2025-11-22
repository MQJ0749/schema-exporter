import { Client } from "pg";

export async function getPgClient(connectionString: string) {
  const client = new Client({ connectionString });
  await client.connect();
  console.log("Connection established")
  return client;
}
