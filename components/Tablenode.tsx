"use client";

import { Handle, Position } from "reactflow";

export default function TableNode({ data }) {
  const table = data.table;

  return (
    <div className="rounded-xl border border-gray-300 shadow-md bg-white min-w-[260px]">
      <div className="bg-gray-900 text-white p-2 rounded-t-xl font-bold text-center">
        {table.name}
      </div>

      <div className="p-3">
        {table.columns.map((col, idx) => (
          <div key={col.name} className="relative flex justify-between py-1 border-b last:border-b-0">
            
            {/* Left handle = incoming FK */}
            <Handle
              type="target"
              position={Position.Left}
              id={`${col.name}-in`}
              style={{
                top: "50%",
                background: "#10b981",
                height: 10,
                width: 10,
              }}
            />

            <span className="font-medium text-black ml-3">{col.name}</span>
            <span className="text-gray-400 mr-3">{col.dataType}</span>

            {/* Right handle = outgoing FK */}
            <Handle
              type="source"
              position={Position.Right}
              id={`${col.name}-out`}
              style={{
                top: "50%",
                background: "#3b82f6",
                height: 10,
                width: 10,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


