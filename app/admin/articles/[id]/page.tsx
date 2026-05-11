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
}

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`);
      if (!response.ok) {
        throw new Error('Article not found');
      }
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    router.push("/admin/articles");
  };

  if (loading) {
    return (
      <AdminShell title="Edit Article" active="articles">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-slate-300">Loading article...</div>
      </AdminShell>
    );
  }

  if (!article) {
    return (
      <AdminShell title="Edit Article" active="articles">
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-300">
          Article not found. Please return to the article listing and select a valid item.
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Article" active="articles">
      <div className="max-w-4xl">
        <AdminArticleForm article={article} submitLabel="Update Article" onSave={handleUpdate} />
      </div>
    </AdminShell>
  );
}
