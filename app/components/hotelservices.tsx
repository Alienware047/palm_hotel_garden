"use client";

import { motion } from "framer-motion";
import { Wifi, Coffee, Droplets, Bubbles, Dumbbell, HandPlatter } from "lucide-react";

type Facility = {
  name: string;
  icon: React.ReactNode;
  description: string;
};

const facilities: Facility[] = [
  {
    name: "Free Wi‑Fi",
    icon: <Wifi className="w-8 h-8 text-yellow-400" />,
    description: "Stay connected with our high‑speed wireless internet.",
  },
  {
    name: "Gourmet Dining",
    icon: <HandPlatter className="w-8 h-8 text-yellow-400" />,
    description: "Indulge in fine dining with local and international cuisine.",
  },
  {
    name: "Outdoor Pool",
    icon: <Droplets className="w-8 h-8 text-yellow-400" />,
    description: "Relax in our luxurious pool surrounded by greenery.",
  },
  {
    name: "Spa & Wellness",
    icon: <Bubbles className="w-8 h-8 text-yellow-400" />,
    description: "Rejuvenate with premium spa treatments and massages.",
  },
  {
    name: "Fitness Center",
    icon: <Dumbbell className="w-8 h-8 text-yellow-400" />,
    description: "Fully equipped gym with modern fitness machines.",
  },
  {
    name: "Coffee & Lounge",
    icon: <Coffee className="w-8 h-8 text-yellow-400" />,
    description: "Enjoy artisan coffee in our stylish lounge area.",
  },
];

export function HotelServices() {
  return (
    <section className="max-w-6xl mx-auto px-6 my-16">
      <h2 className="text-3xl font-semibold text-center text-foreground dark:text-foreground mb-10">
        Hotel Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility, idx) => (
          <motion.div
            key={idx}
            className="
              glass p-6 rounded-2xl flex flex-col items-center text-center
              border border-glass-border
              transition-colors duration-300
              hover:bg-primary/10 dark:hover:bg-primary/20
              cursor-pointer
            "
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(234,179,8,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="mb-4">{facility.icon}</div>

            <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
              {facility.name}
            </h3>

            <p className="text-foreground/80 dark:text-foreground/80 text-sm">
              {facility.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
