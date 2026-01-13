"use client";

import { RoomsHero } from "../components/roomhero";
import { RoomCard } from "../components/roomcard";

const roomsList = [
  {
    slug: "garden-view-suite",
    name: "Garden View Suite",
    image: "/rooms/garden-suite.jpg",
    short: "Relax with serene garden views and elegant interiors.",
    price: "$120 / night",
  },
  {
    slug: "luxury-double-room",
    name: "Luxury Double Room",
    image: "/rooms/luxury-double.jpg",
    short: "Spacious double room with modern comforts.",
    price: "$90 / night",
  },
  {
    slug: "executive-room",
    name: "Executive Room",
    image: "/rooms/executive-room.jpg",
    short: "Elegant executive room with premium amenities.",
    price: "$100 / night",
  },
  {
    slug: "premium-family-room",
    name: "Premium Family Room",
    image: "/rooms/family-room.jpg",
    short: "Perfect for families, more space & comfort.",
    price: "$150 / night",
  },
  {
    slug: "romantic-suite",
    name: "Romantic Suite",
    image: "/rooms/romantic-suite.jpg",
    short: "Ideal for couples seeking luxury & intimacy.",
    price: "$200 / night",
  },
   {
    slug: "conference-hall",
    name: "Conference Hall",
    image: "/rooms/conference-hall.jpg",
    short: "Spacious hall for meetings and events.",
    price: "$300 / night",
  },
   {
    slug: "pool-side-cabin",
    name: "Pool Side Cabin",
    image: "/rooms/pool-side-cabin.jpg",
    short: "Private cabin with direct pool access.",
    price: "$20 / day",
  },
];

export default function RoomsPage() {
  return (
    <main className="pb-16">
      <RoomsHero />

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
          Our Rooms & Suites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsList.map((room) => (
            <RoomCard
              key={room.slug}
              slug={room.slug}
              name={room.name}
              image={room.image}
              short={room.short}
              price={room.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
