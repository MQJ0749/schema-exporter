"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./Tablenode";
import { applyDagreLayout } from "@/app/layout";

const nodeTypes = { tableNode: TableNode };

export default function Diagram({ schema }) {
  const { tables, relations, message } = schema;

  const [selectedEdge, setSelectedEdge] = useState(null);
  const [layoutNodes, setLayoutNodes] = useState(null);

  // Build edges with column handles
  const edges = relations.map((r, i) => ({
    id: `edge-${i}`,
    source: r.sourceTable,
    sourceHandle: `${r.sourceColumn}-out`,
    target: r.targetTable,
    targetHandle: `${r.targetColumn}-in`,
    animated: true,
    type: "smoothstep",
    data: {
      label: `${r.sourceTable}.${r.sourceColumn} → ${r.targetTable}.${r.targetColumn}`,
    },
  }));

  function handleColumnClick(tableName, columnName) {
    const match = edges.find(
      (e) =>
        (e.source === tableName &&
          e.sourceHandle === `${columnName}-out`) ||
        (e.target === tableName &&
          e.targetHandle === `${columnName}-in`)
    );

    if (match) setSelectedEdge(match);
  }

  if (message === "CLIENT_NOT_CONNECTED") {
    return (
      <div className="mt-4 p-3 bg-red-900/40 border border-red-700 text-red-300 rounded-lg">
        <strong>Error:</strong> Unable to connect. Check your database URL.
      </div>
    );
  }

  // Build basic nodes
  const rawNodes = tables.map((t) => ({
    id: t.name,
    type: "tableNode",
    position: { x: 0, y: 0 },
    data: { table: t },
  }));

  // Auto layout after render
  useEffect(() => {
    requestAnimationFrame(() => {
      const positioned = applyDagreLayout(rawNodes, edges, "TB");
      setLayoutNodes(positioned);
    });
  }, []);


  if (!layoutNodes) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-300">
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
        <p className="text-sm text-gray-400">Preparing layout…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[85vh] border rounded-md">
      <ReactFlow
        nodes={layoutNodes.map((node) => {
          const isConnected =
            selectedEdge &&
            (node.id === selectedEdge.source ||
              node.id === selectedEdge.target);

          return {
            ...node,
            data: {
              ...node.data,
              selectedEdge,
              onColumnClick: handleColumnClick,
            },
            style: {
              opacity: selectedEdge ? (isConnected ? 1 : 0.25) : 1,
              border: isConnected ? "3px solid #3b82f6" : "1px solid #444",
              transition: "all 0.2s ease-in-out",
            },
          };
        })}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onEdgeClick={(_, edge) => setSelectedEdge(edge)}
        onPaneClick={() => setSelectedEdge(null)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
