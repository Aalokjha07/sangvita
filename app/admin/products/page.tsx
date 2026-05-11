"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      // Get the actual error message from the API
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }

    setProducts(products.filter(p => p._id !== id));
  } catch (error: any) {
    console.error('Delete Error:', error.message);
    alert(error.message); // Show the user the actual reason
  }
};

  if (loading) {
    return (
      <AdminShell title="Product Management" active="products">
        <div className="text-center py-12">
          <p className="text-slate-300 text-lg">Loading products...</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Product Management" active="products">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Products</p>
          <h2 className="text-3xl font-bold text-white mt-2">Edit and manage live product listings</h2>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
        >
          Add Product
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <div key={product._id} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-slate-700 mb-4"
                  />
                )}
                <p className="text-sm text-slate-400">{product.category}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{product.name}</h3>
                <p className="mt-3 text-slate-300 text-sm line-clamp-2">{product.description}</p>
                {product.tag && <p className="mt-2 text-blue-400 text-sm font-semibold">{product.tag}</p>}
              </div>
              <div className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-right">
                <p className="text-sm text-slate-400">Price</p>
                <p className="text-2xl font-bold text-white">{product.price.toLocaleString()}</p>
                <p className="text-xs text-slate-500 line-through">{product.mrp.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`/admin/products/${product._id}`}
                className="rounded-full border border-blue-500 px-5 py-2 text-sm text-blue-200 transition hover:bg-blue-500/10"
              >
                Edit
              </a>
              <button
                onClick={() => handleDelete(product._id)}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-300">
          No products found yet. Use the Add Product button to create your first listing.
        </div>
      )}
    </AdminShell>
  );
}
