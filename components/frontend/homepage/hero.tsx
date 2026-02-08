"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Palm Garden Hotel"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-28">
        <div className="text-center max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-lg transition-all duration-500 ease-in-out">
            Palm Garden Hotel
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 transition-all duration-500 ease-in-out">
            Relax in Nature, Comfort in Kumasi
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {/* Book a Room Button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                y: -4,
                scale: 1.04,
                boxShadow: "0px 16px 32px rgba(30,120,80,0.35)",
              }}
              whileTap={{ scale: 0.95 }}
              className="
                glass px-8 py-3 rounded-xl font-semibold
                text-foreground border border-glass-border
                bg-gradient-to-r from-glass/60 to-glass/30
                hover:bg-secondary hover:text-white
                transition-colors duration-300
              "
            >
              Book a Room
            </motion.button>

            {/* Call Now Button */}
            <motion.a
              href="tel:0539795100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              whileHover={{
                y: -6,
                scale: 1.06,
                boxShadow: "0px 20px 40px rgba(30,120,80,0.45)",
              }}
              whileTap={{ scale: 0.94 }}
              className="
                glass px-8 py-3 rounded-xl font-semibold
                text-foreground border border-glass-border
                flex items-center justify-center gap-2
                bg-gradient-to-r from-glass/60 to-glass/30
                hover:bg-secondary hover:text-white
                transition-colors duration-300
              "
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
