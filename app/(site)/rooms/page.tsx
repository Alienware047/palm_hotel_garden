"use client";

import { RoomsHero } from "../../components/roomhero";
import { RoomCard } from "../../components/roomcard";
import { BedDouble, Sparkles, ConciergeBell } from "lucide-react";

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
    slug: "pool-side-cabin",
    name: "Pool Side Cabin",
    image: "/rooms/pool-side-cabin.jpg",
    short: "Private cabin with direct pool access.",
    price: "$20 / day",
  },
];

export default function RoomsPage() {
  return (
    <main className="pb-20">
      <RoomsHero />

      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-14">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Our Rooms & Suites
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Experience refined comfort, thoughtful design, and warm hospitality.
            Each space at <span className="text-primary font-medium">Palm Garden Hotel</span> is
            crafted to give you rest, privacy, and a touch of luxury — whether
            you’re here for business, family, or romance.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BedDouble,
              title: "Exceptional Comfort",
              text: "Plush bedding, spacious layouts, and tranquil surroundings for restful nights.",
            },
            {
              icon: Sparkles,
              title: "Luxury Details",
              text: "Elegant interiors, modern finishes, and premium amenities in every room.",
            },
            {
              icon: ConciergeBell,
              title: "Personalized Service",
              text: "Attentive hospitality designed to make every stay effortless and memorable.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="
                glass
                rounded-2xl
                p-6
                border border-glass-border
                text-center
                flex flex-col items-center
                gap-3
              "
            >
              <item.icon className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Rooms Grid */}
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
