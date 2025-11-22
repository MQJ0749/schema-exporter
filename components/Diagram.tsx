"use client";

import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./Tablenode";

const nodeTypes = {
  tableNode: TableNode,
};

export default function Diagram({ schema }) {
  const { tables, relations } = schema;

  // Simple grid layout (you can replace with Dagre later)
  const nodes = tables.map((t, i) => ({
    id: t.name,
    type: "tableNode",
    position: { x: (i % 3) * 400, y: Math.floor(i / 3) * 350 },
    data: { table: t },
  }));

  // COLUMN → COLUMN edges
  const edges = relations.map((r, i) => ({
    id: `edge-${i}`,
    source: r.sourceTable,
    sourceHandle: `${r.sourceColumn}-out`,
    target: r.targetTable,
    targetHandle: `${r.targetColumn}-in`,
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 2 },
  }));

  return (
    <div className="w-full h-[85vh] border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}


