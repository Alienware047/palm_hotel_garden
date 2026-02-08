"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Bed, Calendar, TicketsPlane, Flag } from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
    { label: "Rooms", href: "/admin/rooms", icon: <Bed size={20} /> },
    { label: "Bookings", href: "/admin/bookings", icon: <Calendar size={20} /> },
    { label: "Checkins", href: "/admin/checkins", icon: <TicketsPlane size={20} /> },
    { label: "Reports", href: "/admin/reports", icon: <Flag size={20} /> },
  ];

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`
          fixed z-30 h-screen flex flex-col
          transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:relative
        `}
        style={{
          width: collapsed ? "4.5rem" : "16rem",
          background: "rgb(var(--glass))",
          borderRight: "1px solid rgb(var(--glass-border))",
          color: "rgb(var(--foreground))",
        }}
      >
        {/* HEADER */}
        <div className="h-14 flex items-center justify-between px-3">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* EXPANDED */}
            {!collapsed && (
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center glass no-hover rounded-xl border border-glass-border">
                  <img
                    src="/logo-light.png"
                    alt="Palm Garden Hotel Logo"
                    className="block dark:hidden w-7 h-7 rounded-md"
                  />
                  <img
                    src="/logo-dark.png"
                    alt="Palm Garden Hotel Logo"
                    className="hidden dark:block w-7 h-7 rounded-md"
                  />
                </div>

                <span className="text-sm font-semibold tracking-wide text-primary whitespace-nowrap">
                  Palm Garden Hotel
                </span>
              </Link>
            )}

            {/* COLLAPSED */}
            {collapsed && (
              <div className="relative group mx-auto w-9 h-9">
                {/* LOGO */}
                <div
                  className="
                    absolute inset-0 flex items-center justify-center
                    glass no-hover rounded-xl border border-glass-border
                    transition-opacity duration-200
                    group-hover:opacity-0
                  "
                >
                  <img
                    src="/logo-light.png"
                    alt="Palm Garden Hotel Logo"
                    className="block dark:hidden w-7 h-7 rounded-md"
                  />
                  <img
                    src="/logo-dark.png"
                    alt="Palm Garden Hotel Logo"
                    className="hidden dark:block w-7 h-7 rounded-md"
                  />
                </div>

                {/* EXPAND BUTTON */}
                <button
                  onClick={() => setCollapsed(false)}
                  aria-label="Expand sidebar"
                  className="
                    absolute inset-0 flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    rounded-xl
                  "
                >
                  <svg
                    className="w-4 h-4 text-primary drop-shadow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* COLLAPSE BUTTON */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              className="p-1 rounded hover:bg-[rgb(var(--glass-border))] transition"
            >
              <svg
                className="w-4 h-4 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3
                  ${collapsed ? "justify-center px-2" : "px-4"}
                  py-2 rounded-lg transition
                  hover-glow
                  ${isActive ? "bg-[rgb(var(--primary))]" : ""}
                `}
                style={{
                  color: isActive
                    ? "rgb(var(--primary-foreground))"
                    : "rgb(var(--foreground))",
                }}
              >
                {link.icon}
                {!collapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 sm:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
