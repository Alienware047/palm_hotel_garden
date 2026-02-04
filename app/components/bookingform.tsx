"use client";

import { useState } from "react";
import { Calendar, User, Mail, Phone } from "lucide-react";

export default function BookingForm({
  roomId,
  price,
}: {
  roomId: number;
  price: number;
}) {
  const [loading, setLoading] = useState(false);

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({ ...data, roomId, price }),
    });

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <form
      onSubmit={submitBooking}
      className="glass rounded-3xl p-6 md:p-8 mt-8 space-y-6 shadow-2xl"
    >
      {/* HEADER */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground">
          Reserve Your Stay
        </h3>
        <p className="text-muted text-sm mt-1">
          Secure your room with a quick payment
        </p>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-5 w-5 text-primary/70" />
          <input
            name="name"
            required
            placeholder="Full Name"
            className="input pl-10 glass"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-primary/70" />
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="input pl-10 glass"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-primary/70" />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="input pl-10 glass"
          />
        </div>

        {/* DATES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-primary/70" />
            <input
              type="date"
              name="checkIn"
              required
              className="input pl-10 glass"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-primary/70" />
            <input
              type="date"
              name="checkOut"
              required
              className="input pl-10 glass"
            />
          </div>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex items-center justify-between text-sm border-t border-glass-border pt-4">
        <span className="text-muted">Total Price</span>
        <span className="text-lg font-semibold text-primary">
          GHS {price.toFixed(2)}
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={loading}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition
          ${
            loading
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-secondary text-secondary-foreground hover:scale-[1.04] gold-glow"
          }`}
      >
        {loading ? "Processing Payment..." : "Book & Pay Securely"}
      </button>

      {/* TRUST TEXT */}
      <p className="text-xs text-center text-muted">
        🔒 Secure payment • Instant confirmation • Trusted hospitality
      </p>
    </form>
  );
}
