"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getStoredMarqueeItems } from "@/lib/adminStorage";

export default function AdminDashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [marqueeCount, setMarqueeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch product count
        const productsResponse = await fetch('/api/products');
        if (productsResponse.ok) {
          const products = await productsResponse.json();
          setProductCount(products.length);
        }

        // Fetch article count
        const articlesResponse = await fetch('/api/articles');
        if (articlesResponse.ok) {
          const articles = await articlesResponse.json();
          setArticleCount(articles.length);
        }

        // Get marquee count from local storage
        setMarqueeCount(getStoredMarqueeItems().length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <AdminShell title="Dashboard" active="dashboard">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Products</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{productCount}</h2>
          <p className="mt-3 text-slate-400">Live products currently available in the store catalog.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/admin/products" className="rounded-full border border-blue-500 px-5 py-3 text-sm text-blue-200 hover:bg-blue-500/10 transition">
              Manage Products
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Articles</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{articleCount}</h2>
          <p className="mt-3 text-slate-400">Published articles and blog posts.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/admin/articles" className="rounded-full border border-blue-500 px-5 py-3 text-sm text-blue-200 hover:bg-blue-500/10 transition">
              Manage Articles
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Marquee</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{marqueeCount}</h2>
          <p className="mt-3 text-slate-400">Active marquee announcements shown on the home page.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/admin/marquee" className="rounded-full border border-blue-500 px-5 py-3 text-sm text-blue-200 hover:bg-blue-500/10 transition">
              Manage Marquee
            </a>
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl">
        <h3 className="text-xl font-semibold text-white">Admin guidance</h3>
        <p className="mt-3 text-slate-400 leading-relaxed">
          Use the Products section to add, edit, or remove items. The Articles section manages your blog content and posts. The Marquee section controls the scrolling text that appears on the homepage. All admin functions are protected by authentication.
        </p>
      </section>
    </AdminShell>
  );
}
