"use client";

import { useState } from "react";
import { X, Trash2, Save } from "lucide-react";

type Admin = {
  id: number;
  name: string;
  email: string;
};

export default function AdminUserModal({
  admin,
  onClose,
  onUpdated,
}: {
  admin: Admin;
  onClose: () => void;
  onUpdated: (admin: Admin) => void;
}) {
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined"
    ? localStorage.getItem("adminToken")
    : null;

  async function saveAdmin() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            ...(password ? { password } : {}),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const json = await res.json();
      onUpdated(json.admin);
      onClose();
    } catch {
      setError("Failed to update admin");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAdmin() {
    if (!confirm("This will delete the admin account. Continue?")) return;

    setLoading(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl p-6 w-full max-w-md border">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Admin Profile</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="New Password (optional)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={deleteAdmin}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <Trash2 size={16} /> Delete
          </button>

          <button
            onClick={saveAdmin}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover-glow"
            style={{
              background: "rgb(var(--primary))",
              color: "rgb(var(--primary-foreground))",
            }}
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
