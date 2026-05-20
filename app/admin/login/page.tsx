"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Invalid password.");
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-serif text-ivory mb-2 text-center">Admin Panel</h1>
        <p className="text-[12px] text-warm-gray/70 font-sans text-center mb-8">
          The Orient Gates Product Management
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoFocus
          autoComplete="current-password"
          className="w-full bg-transparent border border-white/15 px-4 py-3 text-ivory text-center text-sm font-sans focus:border-brass outline-none mb-4"
        />
        {error && (
          <p className="text-red-400/80 text-xs text-center font-sans mb-4">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-brass text-midnight py-3 text-[11px] tracking-[0.2em] uppercase font-sans disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Access"}
        </button>
        <p className="text-[10px] text-warm-gray/40 text-center font-sans mt-6">
          Password is read from the <code>ADMIN_PASSWORD</code> env var on the server.
        </p>
      </form>
    </div>
  );
}
