"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  BarChart3,
  DollarSign,
  Calendar,
  Users,
  BedDouble,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ReportStats {
  total_bookings: number;
  total_revenue: number;
  confirmed: number;
  cancelled: number;
  paid: number;
  pending: number;
  failed: number;
}

interface RevenueByDay {
  date: string;
  revenue: number;
}

interface TopRoom {
  room_name: string;
  bookings: number;
}

export default function AdminReportsPage() {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [revenue, setRevenue] = useState<RevenueByDay[]>([]);
  const [topRooms, setTopRooms] = useState<TopRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // ======================
  // Fetch Reports
  // ======================
  const fetchReports = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();
      if (from) query.append("from", from);
      if (to) query.append("to", to);

      const res = await fetch(
        `/api/admin/reports?${query.toString()}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setStats(data.stats);
      setRevenue(data.revenue_by_day);
      setTopRooms(data.top_rooms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading reports…
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      {/* DATE FILTER */}
      <div className="flex flex-row gap-4 mb-6">
        <input
          type="date"
          className="input"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="date"
          className="input"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button
          onClick={fetchReports}
          className="glass px-4 py-2 rounded hover-glow"
        >
          Apply
        </button>
      </div>

      {/* STATS */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Bookings"
            value={stats.total_bookings}
            Icon={Users}
          />
          <StatCard
            label="Revenue"
            value={`$${stats.total_revenue}`}
            Icon={DollarSign}
          />
          <StatCard
            label="Confirmed"
            value={stats.confirmed}
            Icon={Calendar}
          />
          <StatCard
            label="Paid"
            value={stats.paid}
            Icon={DollarSign}
          />
        </div>
      )}

      {/* REVENUE TABLE */}
      <Section title="Revenue by Day">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((r) => (
              <tr key={r.date} className="border-b">
                <td className="p-3">
                  {format(new Date(r.date), "MMM dd, yyyy")}
                </td>
                <td className="p-3 text-right font-semibold">
                  ${r.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* TOP ROOMS */}
      <Section title="Top Rooms">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-right">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {topRooms.map((room) => (
              <tr key={room.room_name} className="border-b">
                <td className="p-3">{room.room_name}</td>
                <td className="p-3 text-right font-semibold">
                  {room.bookings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

/* ======================
   Components
====================== */

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string | number;
  Icon: LucideIcon;
}) {
  return (
    <div className="glass p-4 rounded flex flex-col items-center gap-2">
      <Icon className="w-6 h-6" />
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded p-4 mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
