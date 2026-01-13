"use client";

import { useState, useEffect, useRef } from "react";
import { X, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

const galleryItems: GalleryItem[] = [
  { type: "image", src: "/gallery/room1.jpg", alt: "Luxury Room 1" },
  { type: "image", src: "/gallery/room2.jpg", alt: "Luxury Room 2" },
  { type: "image", src: "/gallery/garden.jpg", alt: "Garden View" },
  { type: "image", src: "/gallery/restaurant.jpg", alt: "Restaurant" },
];

const videoItem: GalleryItem = { type: "video", src: "/gallery/tour.mp4" };

export function Gallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState(0.5); // pixels per frame

  // Adjust speed based on screen width
  useEffect(() => {
    const updateSpeed = () => {
      const width = window.innerWidth;
      if (width < 640) setSpeed(0.25); // mobile slower
      else if (width < 1024) setSpeed(0.4); // tablet
      else setSpeed(0.5); // desktop faster
    };
    updateSpeed();
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  // Marquee-style infinite animation using transform
  useEffect(() => {
    let animationFrame: number;
    let x = 0;

    const animate = () => {
      if (!isHovered && containerRef.current) {
        const container = containerRef.current;
        const width = container.scrollWidth / 2; // half because items are duplicated
        x -= speed;
        if (Math.abs(x) >= width) x = 0;
        container.style.transform = `translateX(${x}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed, isHovered]);

  // Manual scroll buttons (move by one item width)
  const scrollBy = (distance: number) => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `translateX(${
      parseFloat(containerRef.current.style.transform.replace("translateX(", "").replace("px)", "")) + distance
    }px)`;
  };

  return (
    <section className="max-w-6xl mx-auto my-12 px-6 relative">
      <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
        Experience Palm Garden Hotel
      </h2>

      {/* Carousel */}
      <div className="relative overflow-hidden mb-12">
        {/* Buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 -translate-y-1/2 z-20">
          <button
            onClick={() => scrollBy(300)}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollBy(-300)}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div
          className="flex gap-4 select-none cursor-grab relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* containerRef will hold duplicated items for infinite scroll */}
          <div
            ref={containerRef}
            className="flex gap-4"
            style={{ display: "flex", willChange: "transform" }}
          >
            {[...galleryItems, ...galleryItems].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-64 h-40 relative cursor-pointer rounded-2xl glass border border-glass-border overflow-hidden"
                onClick={() => setSelected(item)}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 15px 40px rgba(234,179,8,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex justify-center">
        <motion.div
          className="w-full max-w-3xl relative rounded-2xl overflow-hidden glass border border-glass-border cursor-pointer"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 12px 35px rgba(234,179,8,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected(videoItem)}
        >
          <video
            src={videoItem.src}
            className="w-full h-60 object-cover rounded-2xl"
            muted
            loop
            autoPlay
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Video className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.src}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {selected.type === "image" ? (
              <motion.img
                src={selected.src}
                alt={selected.alt}
                className="max-h-[80vh] rounded-2xl object-contain shadow-xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ) : (
              <motion.video
                src={selected.src}
                className="max-h-[80vh] rounded-2xl shadow-xl"
                controls
                autoPlay
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
