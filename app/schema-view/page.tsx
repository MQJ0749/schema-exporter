"use client";

import { useState } from "react";
import Diagram from "@/components/Diagram";

export default function SchemaView() {
  const [schema, setSchema] = useState(null);
  const [conn, setConn] = useState("");

  async function loadSchema() {
    const res = await fetch("/api/schema", {
      method: "POST",
      body: JSON.stringify({ connectionString: conn }),
    });

    const data = await res.json();
    setSchema(data);
  }

  return (
    <div>
      <h1>Schema Viewer</h1>

      <input
        value={conn}
        onChange={(e) => setConn(e.target.value)}
        placeholder="PostgreSQL URL 2"
        className="w-full text-blue-500"
      />

      <button onClick={loadSchema}>Load Schema</button>

      {schema && <Diagram schema={schema} />}
    </div>
  );
}
