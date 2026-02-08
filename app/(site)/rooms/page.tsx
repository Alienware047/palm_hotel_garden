"use client";

import { useEffect, useState } from "react";
import { RoomsHero } from "../../components/roomhero";
import { RoomCard } from "../../components/roomcard";
import { BedDouble, Sparkles, ConciergeBell, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const API = "http://localhost:8000";

/* ---------------- TYPES ---------------- */

type Room = {
  slug: string;
  name: string;
  description: string;
  image: string;
  price_range: { min: number; max: number };
};

type Facility = {
  slug: string;
  name: string;
  short: string;
  image: string;
  price_range: { min: number; max: number };
  capacity: { min: number; max: number };
};

/* ---------------- FETCH HELPER ---------------- */

async function fetchWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error("Server Error");
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/* ========================================================= */
/* MAIN PAGE */
/* ========================================================= */

export default function RoomsPage() {
  return (
    <main className="pb-20">
      <RoomsHero />

      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-16">
        <HeaderBlock />
        <Highlights />

        <RoomsSection />
        <FacilitiesSection />
      </section>
    </main>
  );
}

/* ========================================================= */
/* HEADER */
/* ========================================================= */

function HeaderBlock() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">
        Our Rooms & Suites
      </h2>

      <p className="text-foreground/70 text-lg">
        Experience refined comfort and warm hospitality at{" "}
        <span className="text-primary font-medium">
          Palm Garden Hotel
        </span>
      </p>
    </div>
  );
}

/* ========================================================= */
/* HIGHLIGHTS */
/* ========================================================= */

function Highlights() {
  const items = [
    {
      icon: BedDouble,
      title: "Exceptional Comfort",
      text: "Plush bedding and tranquil surroundings.",
    },
    {
      icon: Sparkles,
      title: "Luxury Details",
      text: "Modern finishes and premium amenities.",
    },
    {
      icon: ConciergeBell,
      title: "Personalized Service",
      text: "Warm hospitality for every guest.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="glass rounded-2xl p-6 border border-glass-border text-center flex flex-col items-center gap-3"
        >
          <item.icon className="w-8 h-8 text-primary" />
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-foreground/70">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ========================================================= */
/* ROOMS SECTION */
/* ========================================================= */

function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchWithTimeout(`${API}/api/rooms/slugs`);
      setRooms(res);
    } catch {
      setError("Unable to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <SectionWrapper title="Rooms">
      {loading && <SkeletonGrid />}

      {error && <ErrorState message={error} onRetry={loadRooms} />}

      {!loading && !error && rooms.length === 0 && (
        <EmptyState label="No rooms available." />
      )}

      {!loading && !error && rooms.length > 0 && (
        <Grid>
          {rooms.map((room) => (
            <RoomCard
              key={room.slug}
              slug={room.slug}
              name={room.name}
              image={`${API}${room.image}`}
              short={room.description}
              price={room.price_range}
            />
          ))}
        </Grid>
      )}
    </SectionWrapper>
  );
}

/* ========================================================= */
/* FACILITIES SECTION */
/* ========================================================= */

function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchWithTimeout(`${API}/api/facilities`);
      setFacilities(res);
    } catch {
      setError("Unable to load facilities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  return (
    <SectionWrapper title="Facilities">
      {loading && <SkeletonGrid />}

      {error && <ErrorState message={error} onRetry={loadFacilities} />}

      {!loading && !error && facilities.length > 0 && (
        <Grid>
          {facilities.map((f) => (
            <FacilityCard key={f.slug} facility={f} />
          ))}
        </Grid>
      )}
    </SectionWrapper>
  );
}

/* ========================================================= */
/* FACILITY CARD */
/* ========================================================= */

function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl border border-glass-border overflow-hidden"
    >
      <img
        src={`${API}${facility.image}`}
        className="w-full h-52 object-cover"
      />

      <div className="p-5 space-y-2">
        <h4 className="font-semibold text-lg">{facility.name}</h4>

        <p className="text-sm text-foreground/70">
          {facility.short}
        </p>

        <p className="text-primary font-semibold">
          From ${facility.price_range.min}
        </p>

        <p className="text-xs text-foreground/60">
          Capacity: {facility.capacity.min} - {facility.capacity.max}
        </p>
      </div>
    </motion.div>
  );
}

/* ========================================================= */
/* REUSABLE UI */
/* ========================================================= */

function SectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-8 text-center">
        {title}
      </h3>

      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {children}
    </motion.div>
  );
}

/* ========================================================= */
/* PREMIUM STATES */
/* ========================================================= */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-72 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="text-red-500 font-medium">{message}</p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition"
      >
        <RefreshCcw size={16} />
        Retry
      </button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12 text-foreground/60">
      {label}
    </div>
  );
}
