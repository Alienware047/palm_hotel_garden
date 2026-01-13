"use client";

export function Highlights() {
  const highlights = [
    "Beautiful garden & serene environment",
    "Comfortable rooms",
    "Great customer reviews",
    "Easy access to major areas in Kumasi",
  ];

  return (
    <section className="max-w-6xl mx-auto my-12 px-6">
      {/* <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
        Highlights
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 border border-glass-border text-center hover:scale-105 transition-transform"
          >
            <p className="text-foreground font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
