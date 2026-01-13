"use client";

export function IntroSection() {
  return (
    <section className="max-w-full mx-auto my-12  text-center">
      <div
        className="
          p-10
          bg-primary
          dark:bg-primary/90
          border border-glass-border
          shadow-xl
          transition-all duration-500
        "
      >
        <h2
          className="
            text-3xl md:text-4xl font-semibold mb-4
            text-white
            dark:text-foreground
            drop-shadow-lg
          "
        >
          Welcome to Palm Garden Hotel
        </h2>

        <p
          className="
            text-lg md:text-xl leading-relaxed
            text-white/90
            dark:text-foreground/90
          "
        >
          Palm Garden Hotel offers a peaceful, nature-inspired stay in Kumasi,
          combining comfort, hospitality, and a relaxing garden environment.
        </p>
      </div>
    </section>
  );
}
