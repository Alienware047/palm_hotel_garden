"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function Highlights() {
  const highlights = [
    "Beautiful garden & serene environment",
    "Comfortable rooms",
    "Great customer reviews",
    "Easy access to major areas in Kumasi",
  ];

  return (
    <section className="max-w-6xl mx-auto my-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 drop-shadow-lg">
        Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(30,120,80,0.3)",
            }}
            className="
              glass group rounded-2xl p-6 border border-glass-border
              text-center flex flex-col items-center justify-center
              transition-all duration-300
            "
          >
            <CheckCircle className="w-8 h-8 mb-3 text-secondary transition-colors duration-300 group-hover:text-white" />
            <p className="text-foreground font-medium text-lg transition-colors duration-300 group-hover:text-white">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
