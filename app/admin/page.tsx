"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/adminStorage";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError("Invalid admin credentials. Please use the registered admin email and password.");
      return;
    }
    setRedirecting(true);
    router.push("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900/95 shadow-2xl p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Admin Sign In</p>
         
          <p className="mt-3 text-slate-400">Enter the approved admin email and password to access the product dashboard.</p>
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
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin@1234"
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={redirecting}
            className="w-full rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {redirecting ? "Signing in..." : "Sign in as Admin"}
          </button>
        </form>

        <div className="mt-8 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 text-sm text-slate-400">
          <p className="font-semibold text-slate-100">Admin login details</p>
          <p>Email: <span className="text-white">admin@sangvita.com</span></p>
          <p>Password: <span className="text-white">Admin@1234</span></p>
        </div>
      </div>
    </main>
  );
}
