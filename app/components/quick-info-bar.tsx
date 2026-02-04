"use client";

import { Star, MapPin, Phone } from "lucide-react";

export function QuickInfoBar() {
  return (
    <section className="glass no-hover w-full max-w-7xl mx-auto my-12 px-6 py-6 border border-glass-border rounded-none shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
        {/* Rating */}
        <div className="flex flex-col items-center justify-center">
          <Star className="w-6 h-6 text-secondary mb-2 transition-colors" />
          <span className="text-foreground dark:text-foreground/90 font-medium transition-colors">
            4.3 Rating (134 Reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center justify-center">
          <MapPin className="w-6 h-6 text-secondary mb-2 transition-colors" />
          <span className="text-foreground dark:text-foreground/90 font-medium transition-colors">
            Kaase (BOST), Kumasi
          </span>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center justify-center">
          <Phone className="w-6 h-6 text-secondary mb-2 transition-colors" />
          <a
            href="tel:0539795100"
            className="text-foreground dark:text-foreground/90 font-medium hover:text-secondary transition-colors"
          >
            053 979 5100
          </a>
        </div>
      </div>
    </section>
  );
}
