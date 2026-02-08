"use client";

import { useState } from "react";
import BookingForm from "./bookingform";

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: number;
  image?: string;
  is_available?: boolean;
}

interface RoomBookingClientProps {
  rooms?: Room[]; // optional to prevent undefined
  apiUrl?: string;
}

export default function RoomBookingClient({ rooms = [], apiUrl = "" }: RoomBookingClientProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (!rooms || rooms.length === 0) {
    return <p className="text-center text-muted-foreground py-6">No rooms available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rooms.map((room) => {
        const img =
          room.image && String(room.image).startsWith("http")
            ? room.image
            : `${apiUrl}${room.image ?? "/images/rooms/placeholder.jpg"}`;

        return (
          <div
            key={room.id}
            className="rounded-2xl shadow-lg overflow-hidden glass transition-transform hover:-translate-y-1"
          >
            <img src={img} alt={room.name} className="w-full h-48 object-cover" />

            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg capitalize text-foreground">{room.name}</h2>
              <p className="text-sm text-foreground/70 mb-2">
                {room.capacity} guests • ${room.price}/night
              </p>
              <p className="text-sm mb-3">
                {room.is_available ? "Available" : "Not available"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpenId(openId === room.id ? null : room.id)}
                  disabled={!room.is_available}
                  className={`py-2 px-4 rounded-lg font-semibold transition 
                    ${room.is_available
                      ? "bg-secondary text-secondary-foreground hover:scale-[1.02] hover-glow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                >
                  {room.is_available ? (openId === room.id ? "Close" : "Book") : "Unavailable"}
                </button>
              </div>

              {openId === room.id && <BookingForm roomId={room.id} price={room.price} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
