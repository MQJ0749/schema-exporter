"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Database, Lock, Clock } from "lucide-react"; // icons for future DBs
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] animate-pulse opacity-40"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: 0.15,
            }}
            animate={{
              y: ["0%", "-20%", "0%"],
              x: ["0%", "10%", "0%"],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-20">
        <motion.h1
          className="text-5xl font-extrabold tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Schema Viewer
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-400 max-w-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Visualize, explore, and understand your database schemas.
        </motion.p>

        {/* Database cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          
          {/* PostgreSQL */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/postgres-schema-view")}
            className="cursor-pointer bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                alt="Postgres Icon"
                width={48}
                height={48}
              />
              <h2 className="text-xl font-semibold">PostgreSQL</h2>
            </div>
            <p className="text-gray-400 mt-3 text-sm">
              Visualize tables, relationships, references, and more.
            </p>
          </motion.div>

          {/* MongoDB */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/mongo-schema-view")}
            className="
              cursor-pointer bg-[#1a1a1a] border border-gray-700 
              rounded-xl p-6 shadow-lg hover:shadow-green-500/30 
              transition-all
            "
          >
            <div className="flex items-center gap-4">
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                alt="MongoDB Icon"
                width={48}
                height={48}
              />
              <h2 className="text-xl font-semibold">MongoDB</h2>
            </div>
            <p className="text-gray-400 mt-3 text-sm">
              Visualize collections, fields, references, and embedded documents.
            </p>
          </motion.div>


          {/* MySQL (Coming Soon) */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-lg opacity-40 cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <Database size={48} className="text-gray-500" />
              <h2 className="text-xl font-semibold">MySQL</h2>
            </div>
            <p className="text-gray-500 mt-3 text-sm">Coming soon</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
