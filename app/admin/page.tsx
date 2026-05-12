"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          // User is already authenticated, redirect to dashboard
          router.replace("/admin/dashboard");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Invalid credentials. Please try again.");
        setSubmitting(false);
        return;
      }

      // Login successful, redirect to dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 text-slate-100 flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900/95 shadow-2xl p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Admin Sign In</p>
          <h1 className="mt-4 text-3xl font-bold">Sangvita Admin</h1>
          <p className="mt-3 text-slate-400">Enter your admin credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sangvita.com"
              required
              disabled={submitting}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              disabled={submitting}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </label>

          {error && (
            <div className="rounded-2xl bg-red-950/50 border border-red-800 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in as Admin"}
          </button>
        </form>

        <div className="mt-8 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 text-sm text-slate-400">
          <p className="font-semibold text-slate-300 mb-2">🔐 Security Notice:</p>
          <p>Your credentials are securely transmitted and verified on the server. No sensitive data is stored on the client.</p>
        </div>
      </div>
    </main>
  );
}
