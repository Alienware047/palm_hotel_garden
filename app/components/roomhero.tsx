"use client";

export function RoomsHero() {
  return (
    <section className="relative w-full min-h-[300px] bg-[url('/rooms/hero.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70" />

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-lg">
          Discover Our Rooms
        </h1>
      </div>
    </section>
  );
}
