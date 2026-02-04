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
        y: -4,
        boxShadow: "0 18px 40px rgba(234,179,8,0.35)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="
        group
        glass no-hover
        rounded-2xl
        border border-glass-border
        overflow-hidden
        flex flex-col
        h-full
      "
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />

        {/* Image overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/40 via-black/10 to-transparent
          opacity-80
          pointer-events-none
        " />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="
          text-lg font-semibold
          text-foreground
          mb-2
          transition-colors
          group-hover:text-primary
        ">
          {name}
        </h3>

        {/* Description */}
        <p className="
          text-sm
          text-foreground/70
          leading-relaxed
          line-clamp-3
          mb-4
        ">
          {short}
        </p>

        {/* Price */}
        <div className="mt-auto">
          <p className="
            text-primary
            font-semibold
            text-lg
            mb-4
          ">
            {price}
          </p>

          {/* CTA */}
          <Link href={`/rooms/${slug}`}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="
                glass no-hover
                text-center
                py-2.5
                rounded-xl
                border border-primary
                text-primary
                font-semibold
                tracking-wide
                transition-all duration-300
                hover:bg-secondary
                hover:text-white
                hover:border-secondary
              "
            >
              Book Now
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
