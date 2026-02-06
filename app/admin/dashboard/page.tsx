"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react"; 
import { Home, Calendar, DollarSign, Clock, BarChart2 } from "lucide-react";

type DashboardData = {
  admin: {
    id: number;
    name: string;
    email: string;
  };
  stats: {
    total_rooms: number;
    total_bookings: number;
    paid_bookings: number;
    pending_bookings?: number;
  };
  recent_bookings?: {
    id: number;
    guest: string;
    room: string;
    status: "paid" | "pending" | "cancelled";
  }[];
};


export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);

useEffect(() => {
  fetch("/api/admin/dashboard")
    .then(async (res) => {
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }

      const json = await res.json();
      setData(json);
    })
    .catch(() => setError("Network error"))
    .finally(() => setLoading(false));

  fetch("/api/admin/alerts")
    .then((res) => res.json())
    .then((json) => setAlerts(json.alerts || []))
    .catch(() => setAlerts([]));

}, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--muted))]">
        <p>Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data || !data.admin) return null;

  return (
    <div className="md:pt-8 max-w-7xl mx-auto bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[rgb(var(--primary))]">
        Welcome back, {data.admin.name}
      </h1>
      <p className="text-[rgb(var(--muted))] mb-8">
        Hotel performance overview
      </p>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <StatCard 
          label="Total Rooms" 
          value={data.stats.total_rooms} 
          Icon={Home} 
        />
        <StatCard 
          label="Total Bookings" 
          value={data.stats.total_bookings} 
          Icon={Calendar} 
        />
        <StatCard 
          label="Paid Bookings" 
          value={data.stats.paid_bookings} 
          Icon={DollarSign} 
        />
        <StatCard
          label="Pending Payments"
          value={data.stats.pending_bookings || 0}
          Icon={Clock}
        />
        <StatCard
          label="Occupancy"
          value={`${Math.round(
            (data.stats.total_bookings / data.stats.total_rooms) * 100
          )}%`}
          Icon={BarChart2}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <AdminButton href="/admin/rooms">Manage Rooms</AdminButton>
        <AdminButton href="/admin/bookings">Bookings</AdminButton>
        <AdminButton href="/admin/checkins">Check-ins</AdminButton>
        <AdminButton href="/admin/reports">Reports</AdminButton>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="rounded-xl p-6 lg:col-span-2 border"
            style={{ borderColor: "rgb(var(--glass-border))" }}>
          <h2 className="font-semibold text-lg mb-4">Recent Bookings</h2>

          <table className="w-full text-sm">
            <thead className="text-[rgb(var(--muted))] border-b">
              <tr>
                <th className="text-left py-2">Guest</th>
                <th className="text-left">Room</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {(data.recent_bookings || []).map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="py-3">{b.guest}</td>
                  <td>{b.room}</td>
                  <td>
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="glass no-hover rounded-xl p-6 border">
          <h2 className="font-semibold text-lg mb-4">Alerts</h2>
          <ul className="space-y-3 text-sm">
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => <li key={idx}>{alert}</li>)
            ) : (
              <li className="rounded-lg p-2 glass hover:text-white text-gray-400">No alerts</li>
            )}
          </ul>
        </div>

      </div>

      {/* LOGOUT */}
      {/* <div className="mt-10 flex justify-end">
        <LogoutButton />
      </div> */}
    </div>
  );


}

// =========================
// Components
// =========================

function StatCard({
    label,
    value,
    Icon,
  }: {
    label: string;
    value: number | string;
    Icon?: LucideIcon; // optional icon
  }) {
    return (
      <div
        className="glass rounded-xl p-6 border shadow flex flex-col items-center w-full sm:w-auto gap-2 hover:text-white transition-colors duration-300"
      >
        {Icon && <Icon className="w-6 h-6" />}
        <p className="text-sm md:text-base">{label}</p>
        <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
      </div>
    );
  }

function AdminButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="hover-glow rounded-lg px-6 py-3 font-semibold text-center min-w-[160px] sm:min-w-[180px]"
      style={{ background: "rgb(var(--primary))", color: "rgb(var(--primary-foreground))" }}
    >
      {children}
    </a>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin-logout", {
      method: "POST",
    });

    router.push("/admin-login");
  }

  return (
    <button
      onClick={logout}
      className="glass rounded-lg border px-6 py-3 font-semibold hover-glow min-w-[160px] sm:min-w-[180px]"
      style={{
        borderColor: "rgb(var(--glass-border))",
        color: "rgb(var(--foreground))",
        background: "rgb(var(--card))",
      }}
    >
      Logout
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    paid: "bg-emerald-500/20 text-emerald-600",
    pending: "bg-yellow-500/20 text-yellow-600",
    cancelled: "bg-red-500/20 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}

