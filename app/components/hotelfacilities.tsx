"use client";

import { motion } from "framer-motion";

type Facility = {
  name: string;
  image: string;
  description: string;
};

const facilities: Facility[] = [
  {
    name: "Restaurant",
    image: "/facilities/restaurant.jpg",
    description: "Fine dining with local and international cuisine.",
  },
  {
    name: "Spa & Wellness",
    image: "/facilities/spa.jpg",
    description: "Relaxing spa treatments to keep you refreshed.",
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
    name: "Fitness Center",
    image: "/facilities/gym.jpg",
    description: "Modern gym with the latest equipment.",
  },
  {
    name: "Lounge & Bar",
    image: "/facilities/lounge.jpg",
    description: "Sip cocktails in our stylish lounge bar.",
  },
];

export function HotelFacilities() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-20">
      <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
        Our Top Facilities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {facilities.map((facility, idx) => (
          <motion.div
            key={idx}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group border border-glass-border shadow-lg"
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${facility.image})` }}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.08 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Golden Overlay */}
            <motion.div
              className="absolute inset-0 bg-yellow-400/60 dark:bg-yellow-500/50"
              variants={{
                rest: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{ duration: 0.4 }}
            />

            {/* TEXT (center → bottom) */}
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
              variants={{
                rest: {
                  y: 0,
                },
                hover: {
                  y: 80,
                },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {facility.name}
              </h3>
              <p className="mt-2 text-sm text-white/90 drop-shadow-md max-w-xs">
                {facility.description}
              </p>
            </motion.div>

            {/* Gold Glow Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              variants={{
                rest: { boxShadow: "none" },
                hover: {
                  boxShadow:
                    "0 0 0 2px rgb(234 179 8), 0 20px 40px rgba(234,179,8,0.35)",
                },
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
