"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, logout } from "@/lib/adminStorage";

type AdminShellProps = {
  title: string;
  active?: "dashboard" | "products" | "marquee" | "articles";
  children: React.ReactNode;
};

const AdminShell = ({ title, active = "dashboard", children }: AdminShellProps) => {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
    router.push("/admin");
  };

  if (!auth) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full bg-slate-900/95 border border-slate-700 shadow-2xl rounded-3xl p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-slate-300 mb-8">Please sign in using the admin credentials to continue.</p>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Go to Admin Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 px-5 py-5">
          <div>
           
            <h1 className="text-3xl font-bold mt-2">{title}</h1>
           
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <nav className="flex flex-wrap gap-2">
              <Link
                href="/admin/dashboard"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === "dashboard" ? "bg-blue-600 text-white" : "bg-slate-800/90 text-slate-200 hover:bg-slate-700"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === "products" ? "bg-blue-600 text-white" : "bg-slate-800/90 text-slate-200 hover:bg-slate-700"}`}
              >
                Products
              </Link>
              <Link
                href="/admin/articles"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === "articles" ? "bg-blue-600 text-white" : "bg-slate-800/90 text-slate-200 hover:bg-slate-700"}`}
              >
                Articles
              </Link>
              <Link
                href="/admin/marquee"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === "marquee" ? "bg-blue-600 text-white" : "bg-slate-800/90 text-slate-200 hover:bg-slate-700"}`}
              >
                Marquee
              </Link>
            </nav>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10">{children}</main>
    </div>
  );
};

export default AdminShell;
