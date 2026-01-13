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
  {
    name: "Ama K.",
    image: "/reviews/ama.jpg",
    review: "Lovely Garden. Just in touch with nature.",
  },
  {
    name: "Kwame O.",
    image: "/reviews/kwame.jpg",
    review: "Comfortable rooms and peaceful environment.",
  },
  {
    name: "Abena T.",
    image: "/reviews/abena.jpg",
    review: "The staff were amazing and helpful throughout our stay.",
  },
  {
    name: "Kojo B.",
    image: "/reviews/kojo.jpg",
    review: "A perfect place to relax and reconnect with nature.",
  },
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
    <section className="max-w-3xl mx-auto my-12 px-6 relative">
      <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
        Customer Reviews
      </h2>

      <div className="relative overflow-hidden rounded-2xl h-56">
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
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 glass border border-glass-border text-center"
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary"
                  />
                  <p className="text-foreground italic mb-2">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <span className="text-primary font-medium">
                    {review.name}
                  </span>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 glass p-2 rounded-full border border-glass-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 glass p-2 rounded-full border border-glass-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
