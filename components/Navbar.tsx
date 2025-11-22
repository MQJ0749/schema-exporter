"use client";

import Link from "next/link";
import { Database } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-gray-800 flex items-center px-6">
      
      {/* LEFT: Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <Database className="text-blue-500 group-hover:text-blue-400 transition" size={24} />
        <span className="font-semibold text-lg text-white group-hover:text-blue-400 transition">
          Schema Viewer
        </span>
      </Link>

      {/* RIGHT: Navigation */}
      <div className="ml-auto flex items-center gap-6">
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition text-sm font-medium"
        >
          Home
        </Link>

        <Link
          href="/postgres-schema-view"
          className="text-gray-300 hover:text-white transition text-sm font-medium"
        >
          PostgreSQL
        </Link>
      </div>
    </nav>
  );
}
