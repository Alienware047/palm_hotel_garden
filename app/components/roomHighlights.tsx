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
    <section className="max-w-6xl mx-auto my-12 px-6">
      <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
        Room Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room, idx) => (
          <Link key={idx} href={`/rooms/${room.slug}`}>
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 10px 30px rgba(234,179,8,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-2xl overflow-hidden border border-glass-border cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Room Image */}
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              {/* Text Content */}
              <div className="p-4 flex flex-col">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {room.name}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {room.description}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
