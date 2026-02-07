"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { CheckCircle, Clock, Users, LogIn } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CheckInBooking {
  id: number;
  booking_ref?: string;
  name?: string;
  email?: string;
  room?: {
    name: string;
  };
  check_in: string;
  check_out: string;
  status: "pending" | "confirmed" | "cancelled";
  is_checked_in?: boolean;
}

export default function AdminCheckInPage() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [bookings, setBookings] = useState<CheckInBooking[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("today");

  // ======================
  // Fetch Check-Ins
  // ======================
  const fetchCheckIns = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const res = await fetch(
        `/api/admin/checkins?page=${page}&filter=${filter}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      const items = data.bookings.data || [];

      setBookings((prev) => [...prev, ...items]);
      setHasMore(data.bookings.current_page < data.bookings.last_page);
      setPage((p) => p + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setBookings([]);
    setPage(1);
    setHasMore(true);
    fetchCheckIns();
  }, [filter]);

  // ======================
  // Infinite Scroll
  // ======================
  useEffect(() => {
    if (!loaderRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchCheckIns();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  // ======================
  // Check-In Action
  // ======================
  const handleCheckIn = async (bookingId: number) => {
    try {
      await fetch(
        `/api/admin/bookings/${bookingId}/checkin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, is_checked_in: true } : b
        )
      );
    } catch (err) {
      console.error("Check-in failed", err);
    }
  };

  // ======================
  // Filters
  // ======================
  const filtered = bookings.filter((b) => {
    const term = search.toLowerCase();
    return (
      (b.name ?? "").toLowerCase().includes(term) ||
      (b.email ?? "").toLowerCase().includes(term) ||
      (b.booking_ref ?? "").toLowerCase().includes(term)
    );
  });

  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading check-ins…
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Guest Check-In</h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          className="input"
          placeholder="Search guest / booking ref…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input bg-background"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
          <option value="checked-in">Checked-In</option>
        </select>
      </div>

      {/* LIST */}
      <div className="rounded-lg border bg-card">
        <div
          ref={containerRef}
          className="max-h-[65vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-3 p-3">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="glass p-4 rounded flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* DETAILS */}
                <div className="flex-1">
                  <p className="font-semibold text-lg">{b.name}</p>
                  <p className="text-sm text-muted">{b.email}</p>
                  <p className="text-sm">
                    Room: <span className="font-medium">{b.room?.name}</span>
                  </p>
                  <p className="text-sm">
                    {format(new Date(b.check_in), "MMM dd")} →{" "}
                    {format(new Date(b.check_out), "MMM dd")}
                  </p>
                </div>

                {/* STATUS */}
                <div className="flex items-center gap-2">
                  {b.is_checked_in ? (
                    <StatusBadge
                      label="Checked-In"
                      Icon={CheckCircle}
                      color="green"
                    />
                  ) : (
                    <StatusBadge
                      label="Pending"
                      Icon={Clock}
                      color="yellow"
                    />
                  )}
                </div>

                {/* ACTION */}
                {!b.is_checked_in && (
                  <button
                    onClick={() => handleCheckIn(b.id)}
                    className="glass px-4 py-2 rounded hover-glow flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Check-In
                  </button>
                )}
              </div>
            ))}

            <div
              ref={loaderRef}
              className="h-20 flex items-center justify-center text-muted"
            >
              {loadingMore && "Loading more…"}
              {!hasMore && "No more check-ins"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Components
====================== */

function StatusBadge({
  label,
  Icon,
  color,
}: {
  label: string;
  Icon: LucideIcon;
  color: "green" | "yellow";
}) {
  const colors = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${colors[color]}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
