"use client";

import { useEffect, useState } from "react";
import { RoomCard } from "./roomcard";
import LoadingGrid from "../../ui/LoadingGrid";
import ErrorState from "../../ui/ErrorState";
import EmptyState from "../../ui/EmptyState";
import { fetchWithTimeout, mediaUrl } from "@/lib/api";

type Room = {
  slug: string;
  name: string;
  description: string;
  image: string;
  price_range: { min: number; max: number };
};

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchWithTimeout("/rooms/slugs");
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

  if (loading) return <LoadingGrid />;
  if (error) return <ErrorState message={error} onRetry={loadRooms} />;
  if (!rooms.length) return <EmptyState label="No rooms available." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <RoomCard
          key={room.slug}
          slug={room.slug}
          name={room.name}
          image={mediaUrl(room.image)}
          short={room.description}
          price={room.price_range}
        />
      ))}
    </div>
  );
}
