"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "../../../components/backend/bookingmodal";
import { LucideIcon, Users, CheckCircle, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: number;
  booking_ref?: string;
  name?: string;
  email?: string;
  phone?: string;
  guests?: number;
  status: "pending" | "confirmed" | "cancelled";
  payment_status: "paid" | "pending" | "failed";
  total_price?: number;
  check_in: string;
  check_out: string;
  created_at: string;
  room?: {
    id: number;
    name: string;
  };
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const loaderRef = useRef<HTMLTableCellElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    paid: 0,
    pending: 0,
  });

  // ------------------------
  // Fetch bookings via API route
  // ------------------------
  const fetchBookings = async (reset = false) => {
    if (!hasMore && !reset) return;
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const query = new URLSearchParams();
      query.set("page", reset ? "1" : page.toString());
      if (search) query.set("search", search);
      if (statusFilter !== "all") query.set("status", statusFilter);
      if (paymentFilter !== "all") query.set("payment", paymentFilter);

      const res = await fetch(`/api/admin/bookings?${query.toString()}`, {
        cache: "no-store",
      });

      if (res.status === 401) {
        router.replace("/admin-login");
        return;
      }

      const data = await res.json();
      const bookingsData = data.bookings?.data || [];
      const currentPage = data.bookings?.current_page || 1;
      const lastPage = data.bookings?.last_page || 1;

      setBookings(prev =>
        reset ? bookingsData : [...prev, ...bookingsData]
      );
      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  // ------------------------
  // Fetch stats via API route
  // ------------------------
  const fetchBookingStats = async () => {
    try {
      const res = await fetch("/api/admin/bookings/stats", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin-login");
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to load booking stats", err);
    }
  };

  // ------------------------
  // Initial load
  // ------------------------
  useEffect(() => {
    fetchBookingStats();
    fetchBookings(true);
  }, [search, statusFilter, paymentFilter]);

  // ------------------------
  // Infinite scroll observer
  // ------------------------
  useEffect(() => {
    if (!loaderRef.current || !tableContainerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchBookings();
        }
      },
      { root: tableContainerRef.current, rootMargin: "50px", threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  // ------------------------
  // Render
  // ------------------------
  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading bookings…
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={stats.total} Icon={Users} />
        <StatCard label="Confirmed" value={stats.confirmed} Icon={CheckCircle} />
        <StatCard label="Paid" value={stats.paid} Icon={DollarSign} />
        <StatCard label="Pending" value={stats.pending} Icon={Clock} />
      </div>

      {/* Filters */}
      <div className="flex flex-row gap-4 mb-4">
        <input
          className="input bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] placeholder:text-[rgb(var(--muted))] focus:ring-[rgb(var(--primary))]"
          placeholder="Search bookings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="input bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] focus:ring-[rgb(var(--primary))]"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="input bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] focus:ring-[rgb(var(--primary))]"
          value={paymentFilter}
          onChange={e => setPaymentFilter(e.target.value)}
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-md">
        <div
          className="overflow-y-auto max-h-[600px] overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[rgb(var(--primary))] scrollbar-track-[rgb(var(--card))]"
          ref={tableContainerRef}
        >
          <table className="w-full text-[rgb(var(--card-foreground))] border-collapse">
            <thead className="sticky top-0 bg-[rgb(var(--card))] z-10">
              <tr className="border-b border-[rgb(var(--border))]">
                <th className="p-3 text-left">Guest</th>
                <th className="p-3 text-left">Room</th>
                <th className="p-3 text-left">Dates</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b border-[rgb(var(--border))] hover:bg-[rgb(var(--glass))] transition-colors duration-200">
                  <td className="p-3">
                    {b.name}<br/>
                    <span className="text-sm text-[rgb(var(--muted))]">{b.email}</span>
                  </td>
                  <td className="p-3">{b.room?.name ?? "-"}</td>
                  <td className="p-3">
                    {format(new Date(b.check_in), "MMM dd")} → {format(new Date(b.check_out), "MMM dd")}
                  </td>
                  <td className="p-3"><Badge status={b.status} /></td>
                  <td className="p-3"><Badge status={b.payment_status} type="payment" /></td>
                  <td className="p-3">${b.total_price ?? 0}</td>
                  <td className="p-3">
                    <button
                      className="px-3 py-1 rounded glass hover-glow text-[rgb(var(--primary))] font-semibold"
                      onClick={() => {
                        setEditBooking(b);
                        setModalOpen(true);
                      }}
                    >View</button>
                  </td>
                </tr>
              ))}

              {/* Infinite scroll loader */}
              <tr>
                <td colSpan={7} ref={loaderRef} className="h-24 flex items-center justify-center text-sm text-[rgb(var(--muted))]">
                  {loadingMore && "Loading more bookings…"}
                  {!hasMore && "No more bookings"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && editBooking && (
        <BookingModal
          open={modalOpen}
          booking={editBooking}
          onClose={() => setModalOpen(false)}
          onSave={() => {
            setBookings([]);
            setPage(1);
            setHasMore(true);
            fetchBookings(true);
            fetchBookingStats();
          }}
        />
      )}
    </div>
  );

  // ------------------------
  // Components
  // ------------------------
  function StatCard({ label, value, Icon }: { label: string; value: number; Icon: LucideIcon }) {
    return (
      <div className="p-4 rounded glass hover:text-white flex flex-col items-center gap-2">
        <Icon className="w-6 h-6"/>
        <p className="text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }

  function Badge({ status, type = "booking" }: { status: string; type?: "booking" | "payment" }) {
    const colors: Record<string, string> = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return <span className={`px-2 py-1 rounded text-xs ${colors[status]}`}>{status}</span>;
  }
}
