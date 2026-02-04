"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Facility = {
  name: string;
  description: string;
  images: { src: string; alt?: string; detailed?: string }[];
};


const facilities: Facility[] = [
  {
    name: "Private Dining",
    description: "Fine dining with local and international cuisine.",
    images: [
      { src: "/facilities/restaurant.jpg", alt: "Restaurant Hall", detailed: "Elegant setup with ambient lighting and premium tableware." },
      { src: "/facilities/restaurant2.jpg", alt: "Chef's Special", detailed: "Our chef prepares exquisite dishes with fresh local ingredients." },
      { src: "/facilities/restaurant3.jpg", alt: "Private Booths", detailed: "Private booths for intimate dining experiences." },
    ],
  },
  {
    name: "Tree House",
    description: "Relaxing tree house to refresh and enjoy nature.",
    images: [
      { src: "/facilities/tree_house.jpg", alt: "Tree House View", detailed: "Overlooking lush greenery with serene surroundings." },
      { src: "/facilities/tree_house2.jpg", alt: "Interior", detailed: "Cozy interiors with luxurious wooden furnishings." },
    ],
  },
  {
    name: "Weddings & Events",
    description: "Elegant spaces for weddings & celebrations.",
    images: [
      { src: "/facilities/weddings.jpg", alt: "Wedding Hall", detailed: "Decorated with premium flowers and chandeliers." },
      { src: "/facilities/weddings2.jpg", alt: "Outdoor Setup", detailed: "Beautiful outdoor arrangements for memorable events." },
      { src: "/facilities/weddings3.jpg", alt: "Banquet Table", detailed: "Exquisite banquet tables with fine linens and glassware." },
    ],
  },
  {
    name: "Outdoor Pool",
    description: "Enjoy a refreshing swim in our outdoor pool.",
    images: [
      { src: "/facilities/pool.jpg", alt: "Pool View", detailed: "Crystal-clear waters surrounded by sun loungers." },
      { src: "/facilities/pool2.jpg", alt: " Pool Time", detailed: "Illuminated pool area for day relaxation." },
    ],
  },
  {
    name: "Fishing",
    description: "Enjoy a peaceful day of fishing in serene surroundings.",
    images: [
      { src: "/facilities/fishing.jpg", alt: "Fishing Dock", detailed: "Private dock surrounded by calm waters." },
      { src: "/facilities/fishing2.jpg", alt: "Catch of the Day", detailed: "Freshly caught fish ready to enjoy." },
    ],
  },
  {
    name: "Brunch Parties",
    description: "Sip cocktails in our stylish lounge bar.",
    images: [
      { src: "/facilities/lounge.jpg", alt: "Lounge View", detailed: "Relax in elegant lounge seating with premium drinks." },
      { src: "/facilities/lounge2.jpg", alt: "Cocktail Bar", detailed: "Enjoy signature cocktails crafted by our mixologists." },
    ],
  },
];

export default function FacilitiesGallery() {
  const [selected, setSelected] = useState<{ src: string; alt?: string; detailed?: string } | null>(null);
  const [hoveredFacility, setHoveredFacility] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgb(var(--background))", transition: "background-color 0.3s ease" }}
    >
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "rgb(var(--foreground))" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Facilities
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgb(var(--muted))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Experience the luxury and comfort of Palm Garden Hotel's amenities.
          </motion.p>
        </div>

        {/* Facilities */}
        {facilities.map((facility, fIdx) => (
          <div key={fIdx} className="mb-32">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-semibold mb-3"
                style={{ color: "rgb(var(--foreground))" }}
              >
                {facility.name}
              </h2>
              <p
                className="text-base md:text-lg max-w-3xl mx-auto"
                style={{ color: "rgb(var(--muted))" }}
              >
                {facility.description}
              </p>
            </div>

            {/* Desktop */}
            <div
              className="hidden md:flex relative justify-center items-center h-96"
              onMouseEnter={() => setHoveredFacility(fIdx)}
              onMouseLeave={() => {
                setHoveredFacility(null);
                setHoveredCard(null);
              }}
            >
              {facility.images.map((img, idx) => {
                const totalCards = facility.images.length;
                const isHovered = hoveredFacility === fIdx;
                const isCardHovered = hoveredCard === idx;

                let rotation = 0;
                let translateX = 0;
                let translateY = 0;
                let scale = 1;
                let zIndex = idx;

                if (!isHovered) {
                  rotation = (idx - Math.floor(totalCards / 2)) * 3;
                  translateY = idx * 8;
                  zIndex = totalCards - idx;
                } else {
                  const spacing = 280;
                  const offset = (totalCards - 1) / 2;
                  translateX = (idx - offset) * spacing;

                  if (isCardHovered) {
                    scale = 1.15;
                    translateY = -20;
                    zIndex = 100;
                  } else {
                    scale = 0.95;
                    zIndex = idx;
                  }
                }

                return (
                  <motion.div
                    key={idx}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    animate={{ x: translateX, y: translateY, rotate: rotation, scale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelected(img)}
                  >
                    <div
                      className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl border-4"
                      style={{
                        backgroundColor: "rgb(var(--card))",
                        borderColor: "rgb(var(--border))",
                        color: "rgb(var(--card-foreground))",
                      }}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-semibold mb-1">{img.alt}</h3>
                        {img.detailed && <p className="text-sm">{img.detailed}</p>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile */}
            <div className="md:hidden relative h-auto pb-8">
              <div className="relative flex justify-center items-center h-96 mb-4">
                {facility.images.map((img, idx) => {
                  const totalCards = facility.images.length;
                  const isExpanded = expandedMobile === fIdx;

                  let rotation = 0;
                  let translateY = 0;
                  let scale = 1;
                  let zIndex = idx;

                  if (!isExpanded) {
                    rotation = (idx - Math.floor(totalCards / 2)) * 4;
                    translateY = idx * 10;
                    zIndex = totalCards - idx;
                  } else {
                    translateY = idx * 120;
                    zIndex = idx;
                    scale = 0.9;
                  }

                  return (
                    <motion.div
                      key={idx}
                      className="absolute cursor-pointer"
                      style={{ zIndex }}
                      animate={{ y: translateY, rotate: rotation, scale }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={() => {
                        if (expandedMobile === fIdx) setSelected(img);
                        else setExpandedMobile(fIdx);
                      }}
                    >
                      <div
                        className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4"
                        style={{
                          backgroundColor: "rgb(var(--card))",
                          borderColor: "rgb(var(--border))",
                          color: "rgb(var(--card-foreground))",
                        }}
                      >
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-semibold mb-1">{img.alt}</h3>
                          {img.detailed && <p className="text-xs line-clamp-2">{img.detailed}</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {!expandedMobile && (
                <div className="text-center">
                  <button
                    onClick={() => setExpandedMobile(fIdx)}
                    className="backdrop-blur-sm px-6 py-3 rounded-full border text-sm font-medium transition"
                    style={{
                      backgroundColor: "rgb(var(--glass))",
                      borderColor: "rgb(var(--glass-border))",
                      color: "rgb(var(--foreground))",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--glass-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgb(var(--glass))")
                    }
                  >
                    Tap to View All
                  </button>
                </div>
              )}

              {expandedMobile === fIdx && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setExpandedMobile(null)}
                    className="backdrop-blur-sm px-6 py-3 rounded-full border text-sm font-medium transition"
                    style={{
                      backgroundColor: "rgb(var(--glass))",
                      borderColor: "rgb(var(--glass-border))",
                      color: "rgb(var(--foreground))",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--glass-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgb(var(--glass))")
                    }
                  >
                    Collapse Cards
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
              style={{ backgroundColor: "rgba(var(--background)/0.9)", color: "rgb(var(--foreground))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-3 rounded-full border transition"
                style={{
                  backgroundColor: "rgb(var(--glass))",
                  borderColor: "rgb(var(--glass-border))",
                  color: "rgb(var(--foreground))",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--glass-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(var(--glass))")
                }
              >
                <X className="w-6 h-6" />
              </button>

              <motion.img
                src={selected.src}
                alt={selected.alt}
                className="max-h-[70vh] max-w-[90vw] rounded-2xl shadow-2xl mb-6"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                onClick={(e) => e.stopPropagation()}
              />

              {selected.detailed && (
                <div
                  className="px-6 py-4 rounded-xl max-w-2xl text-center border"
                  style={{
                    backgroundColor: "rgb(var(--glass))",
                    borderColor: "rgb(var(--glass-border))",
                    color: "rgb(var(--foreground))",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">{selected.alt}</h3>
                  <p>{selected.detailed}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

