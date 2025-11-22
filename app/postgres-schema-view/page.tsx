"use client";

import { useState } from "react";
import Diagram from "@/components/Diagram";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SchemaView() {
  const [schema, setSchema] = useState(null);
  const [conn, setConn] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSchema() {
    setLoading(true);
    setSchema(null);

    try {
      const res = await fetch("/api/schema", {
        method: "POST",
        body: JSON.stringify({ connectionString: conn }),
      });

      const data = await res.json();
      setSchema(data);
    } catch (err) {
      console.error("Error loading schema:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-10 flex flex-col items-center">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold tracking-wide mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        PostgreSQL Schema Viewer
      </motion.h1>

      {/* Card */}
      <motion.div
        className="w-full max-w-3xl bg-[#1a1a1a] border border-gray-700 rounded-xl p-8 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <label className="block text-gray-400 mb-2 text-sm">
          Enter PostgreSQL connection URL
        </label>

        <input
          value={conn}
          onChange={(e) => setConn(e.target.value)}
          placeholder="postgres://user:pass@host:5432/dbname"
          className="
            w-full p-3 rounded-lg bg-black border border-gray-700 
            text-gray-100 placeholder-gray-500 focus:ring-2 
            focus:ring-blue-600 focus:outline-none transition
          "
        />

        <button
          onClick={loadSchema}
          disabled={loading || !conn}
          className="
            w-full mt-4 p-3 rounded-lg 
            bg-blue-600 hover:bg-blue-700 transition 
            font-semibold disabled:opacity-40 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Loading schema…
            </>
          ) : (
            <>Load Schema</>
          )}
        </button>
      </motion.div>

               {schema && (
        <div className="max-w-6xl mx-auto mt-8 flex items-center justify-between">


          {/* Actions */}
          <div className="flex gap-4">
            {/* {<button
              onClick={downloadPDF}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Download PDF
            </button> } */}

            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(schema, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "schema.json";
                a.click();
              }}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-semibold"
            >
              Export JSON
            </button>
          </div>
        </div>
      )}

      {/* Diagram */}
      <div className="w-full mt-8">
        {loading && (
          <motion.div
            className="text-center text-gray-400 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading tables…
          </motion.div>
        )}

        {schema && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Diagram schema={schema} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
