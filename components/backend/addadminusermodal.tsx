"use client";

import { useState } from "react";
import { X, UserPlus } from "lucide-react";


export default function AddAdminUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (admin: { id: number; name: string; email: string }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createAdmin() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/newadmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Failed to create admin");
      }

      const json = await res.json();
      onCreated(json.admin);
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl p-6 w-full max-w-md border">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UserPlus size={18} />
            Add Admin User
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-lg px-4 py-2 bg-transparent border"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg glass"
          >
            Cancel
          </button>

          <button
            onClick={createAdmin}
            disabled={loading || !name || !email || !password}
            className="px-4 py-2 rounded-lg font-semibold hover-glow"
            style={{
              background: "rgb(var(--primary))",
              color: "rgb(var(--primary-foreground))",
            }}
          >
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );

}
