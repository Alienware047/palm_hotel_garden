"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Room = {
  name: string;
  image: string;
  slug: string;
  description: string;
};

const rooms: Room[] = [
  {
    name: "Garden View Suite",
    slug: "garden-view-suite",
    image: "/rooms/garden-suite.jpg",
    description: "Relax with serene garden views and elegant interiors.",
  },
  {
    name: "Luxury Double Room",
    slug: "luxury-double-room",
    image: "/rooms/luxury-double.jpg",
    description: "Spacious double room with modern amenities and comfort.",
  },
  {
    name: "Premium Family Room",
    slug: "premium-family-room",
    image: "/rooms/family-room.jpg",
    description: "Perfect for families, spacious and fully equipped.",
  },
  {
    name: "Romantic Suite",
    slug: "romantic-suite",
    image: "/rooms/romantic-suite.jpg",
    description: "Ideal for couples seeking luxury and intimacy.",
  },
];

export function RoomHighlights() {
  return (
    <section className="max-w-7xl mx-auto my-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground drop-shadow-lg mb-12">
        Room Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {rooms.map((room, idx) => (
          <Link key={idx} href={`/rooms/${room.slug}`} className="h-full">
            <motion.div
              className="
                relative
                glass
                rounded-2xl
                overflow-hidden
                border border-glass-border
                cursor-pointer
                flex flex-col
                h-full
                transition-all duration-300
                group
              "
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 10px 30px rgba(234,179,8,0.35)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Room Image (fixed height) */}
              <motion.img
                src={room.image}
                alt={room.name}
                className="
                  w-full
                  h-56
                  object-cover
                  rounded-t-2xl
                  transition-all duration-500
                  group-hover:brightness-110
                "
              />

              {/* Text Content (flex-grow) */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
                  {room.name}
                </h3>

                <p className="
                  mt-2
                  text-foreground/70 dark:text-foreground/80
                  text-sm
                  leading-relaxed
                  transition-colors duration-300
                  group-hover:text-white/90
                  line-clamp-3
                ">
                  {room.description}
                </p>
              </div>

              {/* Glow border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ boxShadow: "none" }}
                whileHover={{
                  boxShadow:
                    "0 0 0 2px rgba(30,120,80,0.7), 0 20px 40px rgba(30,120,80,0.25)",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </Link>
        ))}
      </div>

    </section>
  );
}
