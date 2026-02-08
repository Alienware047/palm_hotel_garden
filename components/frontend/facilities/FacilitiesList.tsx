"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingGrid from "../../ui/LoadingGrid";
import ErrorState from "../../ui/ErrorState";
import EmptyState from "../../ui/EmptyState";
import { fetchWithTimeout, mediaUrl } from "@/lib/api";

type Facility = {
  slug: string;
  name: string;
  short: string;
  image: string;
  price_range: { min: number; max: number };
  capacity: { min: number; max: number };
};

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchWithTimeout("/facilities");
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

  if (loading) return <LoadingGrid />;
  if (error) return <ErrorState message={error} onRetry={loadFacilities} />;
  if (!facilities.length) return <EmptyState label="No facilities found." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilities.map((f) => (
        <motion.div
          key={f.slug}
          whileHover={{ y: -4 }}
          className="glass rounded-2xl border border-glass-border overflow-hidden"
        >
          <img
            src={mediaUrl(f.image)}
            className="w-full h-52 object-cover"
          />

          <div className="p-5 space-y-2">
            <h4 className="font-semibold text-lg">{f.name}</h4>
            <p className="text-sm text-foreground/70">{f.short}</p>

            <p className="text-primary font-semibold">
              From ${f.price_range.min}
            </p>

            <p className="text-xs text-foreground/60">
              Capacity: {f.capacity.min} – {f.capacity.max}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
