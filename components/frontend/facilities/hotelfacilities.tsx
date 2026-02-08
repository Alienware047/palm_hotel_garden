"use client";

import { motion } from "framer-motion";

type Facility = {
  name: string;
  image: string;
  description: string;
};

const facilities: Facility[] = [
  {
    name: "Private Dining",
    image: "/facilities/restaurant.jpg",
    description: "Fine dining with local and international cuisine.",
  },
  {
    name: "Tree House",
    image: "/facilities/tree_house.jpg",
    description: "Relaxing tree house to relax and resfesh.",
  },
  {
    name: "Weddings & Events",
    image: "/facilities/weddings.jpg",
    description: "Elegant spaces for weddings & celebrations.",
  },
  {
    name: "Outdoor Pool",
    image: "/facilities/pool.jpg",
    description: "Enjoy a refreshing swim in our outdoor pool.",
  },
  {
    name: "Fishing",
    image: "/facilities/fishing.jpg",
    description: "Enjoy a peaceful day of fishing in our serene surroundings.",
  },
  {
    name: "Brunch Parties",
    image: "/facilities/lounge.jpg",
    description: "Sip cocktails in our stylish lounge bar.",
  },
];

export function HotelFacilities() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 drop-shadow-lg">
        Our Top Facilities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {facilities.map((facility, idx) => (
          <motion.div
            key={idx}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate="rest"
            className="glass relative h-72 rounded-2xl overflow-hidden cursor-pointer group border border-glass-border shadow-lg transition-all"
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${facility.image})` }}
              variants={{
                rest: { scale: 1, filter: "brightness(0.7)" },
                hover: { scale: 1.05, filter: "brightness(1)" },
                tap: { scale: 0.98 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Frosted Overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
              }}
              variants={{
                rest: { opacity: 0.6 },
                hover: { opacity: 0.2 },
                tap: { opacity: 0.6 },
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Text Content */}
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
              variants={{
                rest: { y: 0 },
                hover: { y: 60 }, // slide text down
                tap: { y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-white transition-colors">
                {facility.name}
              </h3>
              <p className="mt-2 text-sm text-white/90 drop-shadow-md max-w-xs group-hover:text-white/95 transition-colors">
                {facility.description}
              </p>
            </motion.div>

            {/* Glow Border on Hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              variants={{
                rest: { boxShadow: "none" },
                hover: {
                  boxShadow:
                    "0 0 0 2px rgba(30,120,80,0.7), 0 20px 40px rgba(30,120,80,0.25)",
                },
                tap: { boxShadow: "0 0 0 2px rgba(30,120,80,0.5)" },
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
