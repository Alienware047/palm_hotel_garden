"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid credentials");
      setLoading(false);
      return;
    }

    setSuccess("Login successful. Redirecting…");

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1200);

  } catch (err) {
    console.error(err);
    setError("Network error. Please try again.");
    setLoading(false);
  }
}


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="glass no-hover w-full max-w-md rounded-2xl p-8 shadow-xl border border-border">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
          <p className="mt-2 text-muted">Palm Garden Hotel Control Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ❌ Error Message */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* ✅ Success Message */}
          {success && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-sm text-green-500">
              {success}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm text-foreground">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="glass w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              placeholder="admin@palmgarden.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm text-foreground">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="glass w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="hover-glow w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Authorized personnel only
        </div>
      </div>
    </div>
  );
}
