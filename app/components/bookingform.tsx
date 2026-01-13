"use client";

import { useState } from "react";

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
    <form onSubmit={submitBooking} className="space-y-4 mt-6">
      <input name="name" required placeholder="Full Name" className="input" />
      <input name="email" required type="email" className="input" />
      <input name="phone" required className="input" />

      <input type="date" name="checkIn" required className="input" />
      <input type="date" name="checkOut" required className="input" />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Processing..." : "Book & Pay"}
      </button>
    </form>
  );
}
