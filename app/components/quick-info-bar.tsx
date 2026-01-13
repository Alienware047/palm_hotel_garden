"use client";

import { Star, MapPin, Phone } from "lucide-react";

export function QuickInfoBar() {
  return (
    <section className="glass max-w-7xl mx-auto my-8 px-6 py-4 rounded-2xl border border-glass-border backdrop-blur-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
        {/* Rating */}
        <div className="flex flex-col items-center justify-center">
          <Star className="w-6 h-6 text-primary mb-1" />
          <span className="text-foreground font-medium">
            4.3 Rating (134 Reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center justify-center">
          <MapPin className="w-6 h-6 text-primary mb-1" />
          <span className="text-foreground font-medium">
            Kaase (BOST), Kumasi
          </span>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center justify-center">
          <Phone className="w-6 h-6 text-primary mb-1" />
          <a
            href="tel:0539795100"
            className="text-foreground font-medium hover:text-primary transition"
          >
            053 979 5100
          </a>
        </div>
      </div>
    </section>
  );
}
