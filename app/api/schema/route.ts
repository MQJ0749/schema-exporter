import { NextResponse } from "next/server";
import { fetchSchema } from "@/lib/schemaFetcher";

export async function POST(req: Request) {
  try {
    const { connectionString } = await req.json();

    console.log("Connection string",connectionString)

    if (!connectionString) {
      return NextResponse.json({ error: "Missing connectionString" }, { status: 400 });
    }

    const schema = await fetchSchema(connectionString);

    return NextResponse.json(schema, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
