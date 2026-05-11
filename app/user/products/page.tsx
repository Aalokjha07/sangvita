"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 1. Updated Interface to match Mongoose _id
interface Product {
  _id: string; // Changed from id?: number to match Mongo
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
  // This state is correctly placed at the top level
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

// URL Encode the message to handle spaces and special characters
const encodedMsg = encodeURIComponent(message);
const whatsappUrl = `https://wa.me/919204665654?text=${encodeURIComponent(message)}`;
    // const whatsappUrl = `https://wa.me/919204665654?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-28 px-8 flex items-center justify-center">
        <div className="text-3xl text-blue-500 font-semibold animate-pulse">Loading products...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-0 pb-28 px-0">
      <div className=" mx-auto man-w-7xl">
        <div className="mb-7 ">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5  shadow-lg">
            <h1 className="text-4xl font-bold mb-2">Pharmaceutical Products</h1>
            <p className="text-blue-100 text-lg">Premium Quality Medicines & Health Supplements</p>
          </div>
        </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
  {products.map((product) => {
    const currentImgIndex = selectedImageIndex[product._id] || 0;
    const hasImages = product.images && product.images.length > 0;

    return (
      <div key={product._id} className="bg-white border-2 border-blue-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        
        {/* ==================== IMAGE SECTION ==================== */}
        <div className="relative w-full h-80 bg-gray-200 rounded-t overflow-hidden">
          
          {hasImages ? (
            <img
              src={product.images[currentImgIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image src="/logo.jpeg" alt="Logo" width={200} height={200} className="object-contain opacity-50" />
            </div>
          )}

          {/* Custom Shape Tag */}
          {product.tag && (
            <span className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl  shadow-lg z-10">
              {product.tag}
            </span>
          )}

          {/* Dot Indicators */}
          {hasImages && product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(prev => ({ ...prev, [product._id]: idx }))}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImgIndex ? 'bg-blue-600 w-6' : 'bg-blue-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ==================== DETAILS SECTION ==================== */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.15em]">
              {product.category}
            </p>
            <h3 className="text-xl font-extrabold text-slate-900 line-clamp-2 leading-tight mb-3">
              {product.name}
            </h3>
          </div>

          {/* Pricing Section */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-blue-600">₹{product.price.toLocaleString()}</span>
                  
                  {product.mrp && product.price && product.mrp > product.price && (
                    <span className="bg-green-100 text-green-700 text-[15px] font-bold px-2 py-0.5 rounded-md">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </span>
                  )}
                </div>

                {product.mrp && (
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    M.R.P: <span className="line-through decoration-slate-300">₹{product.mrp.toLocaleString()}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => router.push(`/user/products/${product._id}`)}
              className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => handleEnquiry(product)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Image src="/whatsapp.png" alt="WA" width={18} height={18} />
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