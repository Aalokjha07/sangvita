"use client";

import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminProductForm from "@/components/admin/AdminProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSave = () => {
    // Redirect to products page after saving
    router.push("/admin/products");
  };

  return (
    <AdminShell title="Add New Product" active="products">
      <div className="max-w-4xl">
        <AdminProductForm submitLabel="Save Product" onSave={handleSave} />
      </div>
    </AdminShell>
  );
}
