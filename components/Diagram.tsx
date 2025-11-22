"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./Tablenode";
import { applyDagreLayout } from "@/app/layout";


const nodeTypes = { tableNode: TableNode };

export default function Diagram({ schema }) {
  const { tables, relations } = schema;

  const [layoutNodes, setLayoutNodes] = useState(null);

  // Step 1: initial nodes with no positions
  const rawNodes = tables.map((t) => ({
    id: t.name,
    type: "tableNode",
    position: { x: 0, y: 0 },
    data: { table: t },
  }));

  const rawEdges = relations.map((r, i) => ({
    id: `edge-${i}`,
    source: r.sourceTable,
    target: r.targetTable,
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 2 },
  }));

    const edges = relations.map((r, i) => ({
    id: `edge-${i}`,
    source: r.sourceTable,
    sourceHandle: `${r.sourceColumn}-out`,
    target: r.targetTable,
    targetHandle: `${r.targetColumn}-in`,
    animated: true,
    type: "relation",
    data: {
      label: `${r.sourceTable}.${r.sourceColumn} → ${r.targetTable}.${r.targetColumn}`,
    },
    style: { strokeWidth: 2 },
  }));


  // Step 2: wait for nodes to render, then run Dagre with real heights
  useEffect(() => {
    requestAnimationFrame(() => {
      const positioned = applyDagreLayout(rawNodes, rawEdges, "TB"); // TB = vertical layout
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
        nodes={layoutNodes}
        edges={rawEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
