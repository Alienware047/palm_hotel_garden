"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type RoomCardProps = {
  slug: string;
  name: string;
  image: string;
  short: string;
  price: string;
};

export function RoomCard({ slug, name, image, short, price }: RoomCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 12px 28px rgba(234,179,8,0.35)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="glass rounded-2xl border border-glass-border overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {name}
        </h3>

        <p className="text-foreground/80 text-sm mb-2 flex-grow">
          {short}
        </p>

        {/* Price */}
        <p className="text-primary font-semibold text-lg mb-3">
          {price}
        </p>

        {/* Book Now Button */}
        <Link href={`/rooms/${slug}`} className="w-full">
          <motion.div
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgb(234 179 8)",
              color: "#ffffff",
              boxShadow: "0 12px 30px rgba(234,179,8,0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            className="text-center py-2 rounded-xl text-yellow-400 border border-primary
                       bg-gradient-to-r from-yellow-400/10 to-yellow-400/20
                       transition-all duration-300 ease-in-out font-semibold"
          >
            Book Now
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
