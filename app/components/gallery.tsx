"use client";

import { useState, useRef, useEffect } from "react";
import { X, Video } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

const galleryItems: GalleryItem[] = [
  { type: "image", src: "/gallery/room1.jpg", alt: "Luxury Room" },
  { type: "image", src: "/gallery/room2.jpg", alt: "Executive Suite" },
  { type: "image", src: "/gallery/garden.jpg", alt: "Garden View" },
  { type: "image", src: "/gallery/restaurant.jpg", alt: "Fine Dining" },
];

const videoItem: GalleryItem = { type: "video", src: "/gallery/tour.mp4" };

export function Gallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    const totalWidth = carouselRef.current.scrollWidth / 2;

    const controls = animate(x, [-0, -totalWidth], {
      ease: "linear",
      duration: 30, // ⏱ speed (lower = faster)
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [x]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 relative">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-semibold text-foreground">
          Discover Palm Garden
        </h2>
        <p className="text-muted mt-3 max-w-xl mx-auto">
          A visual journey through comfort, elegance, and refined hospitality
        </p>
      </div>

      {/* Swipeable + Auto Infinite Carousel */}
      <div className="overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex gap-6 cursor-grab"
          style={{ x }}
          drag="x"
          dragElastic={0.08}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
        >
          {[...galleryItems, ...galleryItems].map((item, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelected(item)}
              className="group flex-shrink-0 w-[280px] h-[180px] rounded-3xl overflow-hidden glass border border-glass-border cursor-pointer relative"
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* View More */}
      <div className="mt-12 flex justify-center">
        <motion.a
          href="/gallery"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="
            inline-flex items-center gap-3
            px-8 py-3 rounded-full
            glass border border-glass-border
            text-primary font-medium
            hover:border-primary
            shadow-lg
          "
        >
          View More Gallery →
        </motion.a>
      </div>

      {/* Video Preview */}
      <div className="mt-20 flex justify-center">
        <motion.div
          onClick={() => setSelected(videoItem)}
          className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass border border-glass-border cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <video
            src={videoItem.src}
            autoPlay
            muted
            loop
            className="w-full h-[520px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="glass p-4 rounded-full border border-glass-border">
              <Video className="w-10 h-10 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 glass p-2 rounded-full border border-glass-border hover:border-primary"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            {selected.type === "image" ? (
              <motion.img
                src={selected.src}
                className="max-h-[85vh] rounded-3xl shadow-2xl"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
              />
            ) : (
              <motion.video
                src={selected.src}
                controls
                autoPlay
                className="max-h-[85vh] rounded-3xl shadow-2xl"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
