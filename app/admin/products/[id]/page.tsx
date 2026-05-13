"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminProductForm from "@/components/admin/AdminProductForm";

interface Product {
  _id: string;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    if (!productId) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleUpdate = () => {
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <AdminShell title="Edit Product" active="products">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
          </div>
          <p className="text-slate-300">Loading product...</p>
        </div>
      </AdminShell>
    );
  }

  if (error || !product) {
    return (
      <AdminShell title="Edit Product" active="products">
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center">
          <p className="text-slate-300 mb-4">{error || "Product not found"}</p>
          <a 
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            Back to Products
          </a>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Product" active="products">
      <div className="max-w-4xl">
        <AdminProductForm 
          product={product} 
          submitLabel="Update Product" 
          onSave={handleUpdate} 
        />
      </div>
    </AdminShell>
  );
}