"use client";

import { Handle, Position } from "reactflow";

export default function TableNode({ data }) {
  const { table, onColumnClick, selectedEdge } = data;

  let selectedCols = [];

  if (selectedEdge) {
    selectedCols.push(
      selectedEdge.sourceHandle?.replace("-out", ""),
      selectedEdge.targetHandle?.replace("-in", "")
    );
  }

  return (
    <div
      className={`rounded-xl border shadow-md bg-white min-w-[260px] ${
        selectedEdge ? "transition-all duration-200" : ""
      }`}
    >
      <div className="bg-gray-900 text-white p-2 rounded-t-xl font-bold text-center">
        {table.name}
      </div>

      <div className="p-3">
        {table.columns.map((col) => {
          const isHighlighted = selectedCols.includes(col.name);

          return (
            <div
              key={col.name}
              onClick={() => onColumnClick(table.name, col.name)}
              className={`relative flex justify-between py-1 border-b last:border-b-0 cursor-pointer ${
                isHighlighted ? "bg-yellow-200" : ""
              }`}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={`${col.name}-in`}
                style={{
                  top: "50%",
                  background: isHighlighted ? "#d97706" : "#10b981",
                  height: 10,
                  width: 10,
                }}
              />

              <span
                className={`font-medium ml-3 ${
                  isHighlighted ? "text-black" : "text-black"
                }`}
              >
                {col.name}
              </span>

              <span className="text-gray-400 mr-3">{col.dataType}</span>

              <Handle
                type="source"
                position={Position.Right}
                id={`${col.name}-out`}
                style={{
                  top: "50%",
                  background: isHighlighted ? "#d97706" : "#3b82f6",
                  height: 10,
                  width: 10,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
