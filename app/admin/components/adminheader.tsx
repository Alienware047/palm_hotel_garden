"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemesToggleButton from "./themetoogle";
import AdminUserModal from "./adminusermodal";
import AddAdminUserModal from "./addadminusermodal";

import { LogOut, UserCog, UserPlus } from "lucide-react";

interface AdminHeaderProps {
  toggleSidebar: () => void;
  pageTitle?: string;
  admin?: {
    id: number;
    name: string;
    email: string;
  };
  onAdminUpdate?: (updatedAdmin: { id: number; name: string; email: string }) => void;
}

export default function AdminHeader({
  toggleSidebar,
  pageTitle,
  admin,
  onAdminUpdate,
}: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const pathname = usePathname();

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);


  function handleLogout() {
    // clear server cookie via API then redirect
    fetch("/api/admin-logout", { method: "POST" }).finally(() => {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin-login";
    });
  }

  /* -------------------------
     ROUTE → TITLE MAPPING
  -------------------------- */
  const routeTitles: Record<string, string> = {
    "/admin/dashboard": "Admin Dashboard",
    "/admin/rooms": "Admin Rooms",
    "/admin/bookings": "Admin Bookings",
    "/admin/checkins": "Admin Check-ins",
    "/admin/reports": "Admin Reports",
  };

  const computedTitle =
    pageTitle || routeTitles[pathname] || "Admin Panel";

  return (
    <>
      <header
        className="flex items-center justify-between px-4 sm:px-6 py-3 glass border-b w-full"
        style={{
          background: "rgb(var(--glass))",
          borderColor: "rgb(var(--glass-border))",
          color: "rgb(var(--foreground))",
        }}
      >
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded hover:bg-[rgb(var(--glass-border))]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-lg sm:text-xl font-semibold truncate">
            {computedTitle}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <ThemesToggleButton />

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 rounded bg-background"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {admin?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="hidden sm:inline truncate">
                {admin?.name || "Admin"}
              </span>
            </button>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-background border rounded-lg shadow-lg z-50"
                
              >
                {/* Manage Admin */}
                <button
                  onClick={() => {
                    setShowAdminModal(true);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover-glow"
                >
                  <UserCog size={16} />
                  Manage Admin
                </button>

                {/* Add Admin (NEW – AT THE END) */}
                <button
                  onClick={() => {
                    setShowAddAdminModal(true);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover-glow"
                >
                  <UserPlus size={16} />
                  Add Admin
                </button>

                <div className="border-t my-1" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-500 hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* ADMIN MODAL */}
      {showAdminModal && admin && (
        <AdminUserModal
          admin={admin}
          onClose={() => setShowAdminModal(false)}
          onUpdated={(updatedAdmin) => {
            setShowAdminModal(false);
            if (onAdminUpdate) onAdminUpdate(updatedAdmin); // update dashboard state
          }}
        />
      )}
      {/* ADD ADMIN MODAL */}
      {showAddAdminModal && (
        <AddAdminUserModal
          onClose={() => setShowAddAdminModal(false)}
          onCreated={(newAdmin) => {
            console.log("Admin created:", newAdmin);
            setShowAddAdminModal(false);
            // optionally refresh admins list here
          }}
        />
      )}

      
    </>
  );
}
