"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Booking {
  id: number;
  booking_ref?: string;
  name?: string;
  email?: string;
  phone?: string;
  guests?: number;
  check_in: string;
  check_out: string;
  status: "pending" | "confirmed" | "cancelled";
  payment_status: "paid" | "pending" | "failed";
  total_price?: number;
  room?: {
    id: number;
    name: string;
  };
}

interface BookingModalProps {
  open: boolean;
  booking: Booking;
  onClose: () => void;
  onSave: () => void;
}

export default function BookingModal({
  open,
  booking,
  onClose,
  onSave,
}: BookingModalProps) {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Booking["status"]>("pending");
  const [paymentStatus, setPaymentStatus] =
    useState<Booking["payment_status"]>("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* ======================
     Sync state when booking changes
  ====================== */
  useEffect(() => {
    if (!booking) return;

    setGuestName(booking.name ?? "");
    setEmail(booking.email ?? "");
    setPhone(booking.phone ?? "");
    setStatus(booking.status);
    setPaymentStatus(booking.payment_status);
  }, [booking]);

  /* ======================
     Save booking
  ====================== */
  const handleSave = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/bookings/${booking.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: guestName,
            email,
            phone,
            status,
            payment_status: paymentStatus,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update booking");
      }

      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))]"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--primary))]">
          Booking #{booking.booking_ref ?? booking.id}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Guest Info */}
        <section className="mb-5">
          <h3 className="font-semibold mb-2">Guest Info</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Guest Name"
              className="input"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="input sm:col-span-2"
            />
          </div>
        </section>

        {/* Booking Info */}
        <section className="mb-5">
          <h3 className="font-semibold mb-2">Booking Info</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              disabled
              value={booking.room?.name ?? "—"}
              className="input"
            />
            <input
              disabled
              value={`${booking.guests ?? 0} Guests`}
              className="input"
            />
            <input
              disabled
              value={new Date(booking.check_in).toLocaleDateString()}
              className="input"
            />
            <input
              disabled
              value={new Date(booking.check_out).toLocaleDateString()}
              className="input"
            />
          </div>
        </section>

        {/* Status */}
        <section className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block mb-1">Booking Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Booking["status"])
              }
              className="input"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value as Booking["payment_status"]
                )
              }
              className="input"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </section>

        {/* Total */}
        <section className="mb-6">
          <label className="block mb-1">Total Price</label>
          <input
            disabled
            value={`$${booking.total_price ?? 0}`}
            className="input"
          />
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="glass px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded bg-[rgb(var(--primary))] text-white"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Reusable input style
====================== */
const inputClass =
  "border border-[rgb(var(--border))] rounded px-3 py-2 bg-[rgb(var(--card))] text-[rgb(var(--foreground))] w-full";

