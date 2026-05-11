"use client";

import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminArticleForm from "@/components/admin/AdminArticleForm";

export default function CreateArticlePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/admin/articles");
  };

  return (
    <AdminShell title="Add New Article" active="articles">
      <div className="max-w-4xl">
        <AdminArticleForm submitLabel="Save Article" onSave={handleSave} />
      </div>
    </AdminShell>
  );
}
