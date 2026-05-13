"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminArticleForm from "@/components/admin/AdminArticleForm";

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt?: string;
}

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const articleId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    if (!articleId) {
      setError("Invalid article ID");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`, {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const data = await response.json();
        setArticle(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  const handleUpdate = () => {
    router.push("/admin/articles");
  };

  if (loading) {
    return (
      <AdminShell title="Edit Article" active="articles">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
          </div>
          <p className="text-slate-300">Loading article...</p>
        </div>
      </AdminShell>
    );
  }

  if (error || !article) {
    return (
      <AdminShell title="Edit Article" active="articles">
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center">
          <p className="text-slate-300 mb-4">{error || "Article not found"}</p>
          <a 
            href="/admin/articles"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Back to Articles
          </a>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Article" active="articles">
      <div className="max-w-4xl">
        <AdminArticleForm 
          article={article} 
          submitLabel="Update Article" 
          onSave={handleUpdate} 
        />
      </div>
    </AdminShell>
  );
}
