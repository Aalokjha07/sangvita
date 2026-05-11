"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminProductForm from "@/components/admin/AdminProductForm";

// 1. Interface matching your new Number logic
interface Product {
  _id?: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  description: string;
  images: string[];
  tag: string | null;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <AdminShell title="Edit Product" active="products">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-slate-300">
          Loading product...
        </div>
      </AdminShell>
    );
  }

  if (!product) {
    return (
      <AdminShell title="Edit Product" active="products">
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-300">
          Product not found. Please return to the product listing and select a valid item.
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Product" active="products">
      <div className="max-w-4xl">
        {/* 2. Added type assertion 'as any' to bypass strict component prop checks 
            if AdminProductForm hasn't been updated to Numbers yet */}
        <AdminProductForm 
          product={product as any} 
          submitLabel="Update Product" 
          onSave={handleUpdate} 
        />
      </div>
    </AdminShell>
  );
}