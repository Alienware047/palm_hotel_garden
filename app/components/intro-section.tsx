"use client";

export function IntroSection() {
  return (
    <section className="w-full bg-secondary dark:bg-secondary/90 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-yellow-300 drop-shadow-lg">
          Welcome to Palm Garden Hotel
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-white/90 dark:text-yellow-200/90">
          Experience a peaceful, nature-inspired stay in Kumasi, combining
          comfort, hospitality, and a luxurious garden environment.
        </p>
      </div>
    </section>
  );
}
