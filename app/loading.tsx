"use client";

import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { motion } from "framer-motion";

export default function LoadingPage() {
  const palms = Array.from({ length: 6 }).map(() => ({
    top: `${Math.random() * 70 + 10}%`,
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 2}s`,
    scale: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground">
      

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
            width="50"
            height="70"
            viewBox="0 0 60 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Trunk */}
            <rect
              x="28"
              y="40"
              width="4"
              height="40"
              className="fill-primary dark:fill-secondary"
            />
            {/* Leaves */}
            <path
              d="M30 40 C10 30, 10 10, 30 20 C50 10, 50 30, 30 40"
              className="fill-secondary dark:fill-primary"
            />
          </svg>
        </div>
      ))}

      {/* Soft Golden Glow Circles */}
      <div className="absolute top-24 left-10 w-24 h-24 rounded-full bg-primary/20 dark:bg-secondary/25 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-primary/25 dark:bg-secondary/30 blur-3xl animate-pulse-slower" />

      {/* Loading Indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="glass rounded-full p-6 border border-glass-border w-20 h-20 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 rounded-full bg-primary dark:bg-secondary"
            animate={{ y: [0, -15, 0], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-6 text-foreground/80 dark:text-foreground/70 text-lg font-medium text-center max-w-xs">
          Loading your luxury stay...
        </p>
      </motion.div>

      

      {/* Animations */}
      <style jsx>{`
        @keyframes sway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(6px) rotate(1.5deg); }
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
  );
}
