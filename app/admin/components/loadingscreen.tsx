"use client";

import Image from "next/image";

type LoadingScreenProps = {
  logoSrc: string; // URL or /path/to/logo.png
  size?: number; // optional logo size
};

export default function LoadingScreen({ logoSrc, size = 120 }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[rgb(var(--background))] z-50">
      {/* Animated Logo */}
      <div className="animate-pulse">
        <Image
          src={logoSrc}
          alt="Hotel Logo"
          width={size}
          height={size}
          className="rounded-md shadow-lg"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-[rgb(var(--muted))] text-lg font-medium animate-pulse">
        Loading Palm Garden Hotel…
      </p>
    </div>
  );
}
