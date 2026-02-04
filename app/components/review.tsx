"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  name: string;
  image: string;
  review: string;
};

const reviews: Review[] = [
  { name: "Ama K.", image: "/reviews/ama.jpg", review: "Lovely garden. Just in touch with nature." },
  { name: "Kwame O.", image: "/reviews/kwame.jpg", review: "Comfortable rooms and peaceful environment." },
  { name: "Abena T.", image: "/reviews/abena.jpg", review: "The staff were amazing and helpful throughout our stay." },
  { name: "Kojo B.", image: "/reviews/kojo.jpg", review: "A perfect place to relax and reconnect with nature." },
];

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const length = reviews.length;

  // Auto slide every 4s
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, length]);

  const prevSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrent((prev) => (prev + 1) % length);
  };

  return (
    <section className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground drop-shadow-lg mb-10">
        Customer Reviews
      </h2>

      <div className="relative overflow-hidden h-64">
        <AnimatePresence mode="wait">
          {reviews.map(
            (review, idx) =>
              idx === current && (
                <motion.div
                  key={idx}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="
                    absolute inset-0
                    flex flex-col items-center justify-center
                    text-center
                    p-6
                    glass
                    border border-glass-border
                    rounded-2xl
                    shadow-lg
                    cursor-grab
                    select-none
                    transition-all
                    hover:text-white
                  "
                  // Enable dragging for mobile
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -50) nextSlide();
                    if (info.offset.x > 50) prevSlide();
                  }}
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="
                      w-20 h-20 rounded-full object-cover mb-4 border-2 border-secondary
                      transition-colors duration-300 group-hover:border-white
                    "
                  />
                  <p className="text-foreground/90 dark:text-foreground/80 italic mb-2 group-hover:text-white transition-colors duration-300">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <span className="text-secondary font-semibold dark:text-secondary/90 group-hover:text-white transition-colors duration-300">
                    {review.name}
                  </span>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="
            absolute left-2 top-1/2 transform -translate-y-1/2
            glass p-2 rounded-full border border-glass-border
            hover:bg-secondary hover:text-white
            transition-colors
          "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="
            absolute right-2 top-1/2 transform -translate-y-1/2
            glass p-2 rounded-full border border-glass-border
            hover:bg-secondary hover:text-white
            transition-colors
          "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
