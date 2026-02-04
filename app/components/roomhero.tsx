"use client";

export function RoomsHero() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] overflow-hidden rounded-2xl">
      {/* Background Image */}
      <img
        src="/rooms/rooms-hero.png"
        alt="Hotel Rooms"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70"></div>

      {/* Glass text content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="glass rounded-2xl p-8 md:p-12 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground drop-shadow-lg mb-4">
            Discover Our Rooms
          </h1>
          <p className="text-foreground/70 dark:text-foreground/80 text-lg sm:text-xl leading-relaxed drop-shadow-sm">
            Experience refined comfort, thoughtful design, and warm hospitality. 
            Each room at <span className="text-primary font-medium">Palm Garden Hotel</span> is crafted to give you rest, privacy, and a touch of luxury.
          </p>
        </div>
      </div>
    </section>


  );
}
