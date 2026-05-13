"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});
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

  const handleEnquiry = (product: Product) => {
    const productUrl = `${window.location.origin}/user/products/${product._id}`;
    const message = `*Hi! I'm interested in this product:* 
🛍️ *${product.name.toUpperCase()}*
---------------------------
📁 *Category:* ${product.category}
💰 *Price:* ₹${product.price.toLocaleString()}

I would like to know more details about this. Could you please help me?

*Product Link:* ${productUrl}`;

    const whatsappUrl = `https://wa.me/919204665654?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

if (loading) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-28">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-6 md:p-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-80 bg-white/20 rounded-xl animate-pulse mb-3"></div>
          <div className="h-6 w-96 bg-white/20 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Skeleton Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="relative w-full aspect-square bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"></div>
              </div>

              {/* Content Skeleton */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="h-3 w-20 bg-slate-200 rounded mb-3"></div>
                <div className="h-5 bg-slate-200 rounded mb-4"></div>
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-6"></div>

                {/* Price Skeleton */}
                <div className="bg-slate-100 p-3.5 rounded-xl mb-6">
                  <div className="h-8 w-28 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-slate-200 rounded"></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <div className="flex-1 h-12 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1 h-12 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 ">
      {/* Header */}
      <div className="mx-auto max-w-7xl pt-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 md:p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Pharmaceutical Products</h1>
          <p className="text-blue-100 text-base md:text-lg">
            Premium Quality Medicines & Health Supplements
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => {
            const currentImgIndex = selectedImageIndex[product._id] || 0;
            const hasImages = product.images && product.images.length > 0;

            return (
              <div
                key={product._id}
                className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* ==================== IMAGE SECTION ==================== */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  {hasImages ? (
                    <img
                      src={product.images[currentImgIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50">
                      <Image
                        src="/logo.jpeg"
                        alt="Logo"
                        width={160}
                        height={160}
                        className="object-contain opacity-60"
                      />
                    </div>
                  )}

                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-lg z-10">
                      {product.tag}
                    </span>
                  )}

                  {/* Image Indicators */}
                  {hasImages && product.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setSelectedImageIndex((prev) => ({
                              ...prev,
                              [product._id]: idx,
                            }))
                          }
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImgIndex ? 'bg-blue-600 w-6' : 'bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* ==================== DETAILS SECTION ==================== */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest">
                      {product.category}
                    </p>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 leading-tight line-clamp-2 mt-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="bg-slate-50 border border-slate-100 p-1 rounded-xl mb-0">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl md:text-3xl font-black text-blue-600">
                          ₹{product.price.toLocaleString()}
                        </span>

                        {product.mrp && product.mrp > product.price && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                          </span>
                        )}
                      </div>

                      {product.mrp && (
                        <p className="text-xs text-slate-400 ">
                          M.R.P:{" "}
                          <span className="line-through">₹{product.mrp.toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 ">
                    <button
                      onClick={() => router.push(`/user/products/${product._id}`)}
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-xl text-sm font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEnquiry(product)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Image src="/whatsapp.png" alt="WA" width={20} height={20} />
                      Enquiry
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;