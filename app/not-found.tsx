"use client";

import Link from "next/link";

export default function NotFound() {
  // More palms for fuller look
  const palms = Array.from({ length: 14 }).map(() => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 2}s`,
    scale: 0.7 + Math.random() * 0.5,
  }));

  return (
    <>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground">
        
        {/* Water Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 via-blue-50/40 to-blue-50/10 dark:from-black/60 dark:via-black/50 dark:to-black/30 overflow-hidden" />

        {/* Floating Palm Trees */}
        {palms.map((palm, i) => (
          <div
            key={i}
            className="absolute transition-transform duration-1000 ease-in-out animate-sway"
            style={{
              top: palm.top,
              left: palm.left,
              transform: `scale(${palm.scale})`,
              animationDelay: palm.delay,
            }}
          >
            <svg
              width="60"
              height="80"
              viewBox="0 0 60 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {/* Trunk: gold in light, darker gold in dark */}
              <rect
                x="28"
                y="40"
                width="4"
                height="40"
                className="fill-primary dark:fill-secondary"
              />
              {/* Leaves: emerald green in light, softer green in dark */}
              <path
                d="M30 40 C10 30, 10 10, 30 20 C50 10, 50 30, 30 40"
                className="fill-secondary dark:fill-primary"
              />
            </svg>
          </div>
        ))}

        {/* Luxury Glow Circles */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/20 dark:bg-secondary/25 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-primary/25 dark:bg-secondary/30 blur-3xl animate-pulse-slower" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-xl">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 text-primary drop-shadow-lg animate-pulse-slow">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            Lost in Paradise
          </h2>
          <p className="mb-8 text-foreground/70 dark:text-foreground/80 leading-relaxed">
            The page you’re looking for drifted beyond the palms and golden sands.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full font-semibold glass hover:text-white transition-colors"
          >
            Return Home 🌴
          </Link>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes sway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(8px) rotate(2deg); }
          }
          .animate-sway { animation: sway 4s ease-in-out infinite; }

          @keyframes pulse-slow {
            0%,100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          .animate-pulse-slower { animation: pulse-slow 5s ease-in-out infinite; }
        `}</style>
      </div>
      
    </>
  );
}
