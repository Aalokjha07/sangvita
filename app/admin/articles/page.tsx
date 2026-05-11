"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this article permanently?")) return;
    
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete article');
      
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    }
  };

  if (loading) {
    return (
      <AdminShell title="Article Management" active="articles">
        <div className="text-center py-12">
          <p className="text-slate-300 text-lg">Loading articles...</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Article Management" active="articles">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Articles</p>
          <h2 className="text-3xl font-bold text-white mt-2">Edit and manage article listings</h2>
        </div>
        <Link
          href="/admin/articles/create"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
        >
          Add Article
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {articles.map((article) => (
          <div key={article._id} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {article.images && article.images.length > 0 && (
                  <img
                    src={article.images[0]}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-2xl border border-slate-700 mb-4"
                  />
                )}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{article.category}</p>
                    <h3 className="text-xl font-semibold text-white line-clamp-2">{article.title}</h3>
                  </div>
                </div>
                <p className="text-slate-300 text-sm line-clamp-2">{article.description}</p>
                <p className="text-xs text-slate-500 mt-3">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`/admin/articles/${article._id}`}
                className="rounded-full border border-blue-500 px-5 py-2 text-sm text-blue-200 transition hover:bg-blue-500/10"
              >
                Edit
              </a>
              <button
                onClick={() => handleDelete(article._id)}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-300">
          No articles found yet. Use the Add Article button to create your first article.
        </div>
      )}
    </AdminShell>
  );
}
