"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RichTextDisplay from '@/components/RichTextDisplay';

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

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
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

  const handleEnquiry = () => {
    if (!product) return;
    
    const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/user/products/${product._id}`;
   const message = `*Hi! I'm interested in this product:* ---------------------------
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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-4xl text-blue-500">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-red-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/user/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : null;

  return (
    <main className="min-h-screen mb-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-10 pb-0 px-1 md:px-6">
      <div className="max-w-6xl p-[0px] height:auto mx-auto">
      
        {/* Product Detail Card */}
       {/* Main Container: Removed p-[0px] (redundant) and kept overflow-hidden */}
<div className="bg-white border border-blue-200 rounded-xl shadow-xl overflow-hidden relative">
  
  {/* Back Button: Changed to absolute positioning to sit OVER the content without pushing it down */}
  <Link 
    href="/user/products" 
    className="absolute top-0 left-0 z-10 group inline-flex items-center justify-center w-12 h-12 rounded-br-xl bg-slate-900 text-white hover:bg-black transition-all duration-200 shadow-md"
    aria-label="Go back"
  >
    <span className="text-xl group-hover:-translate-x-1 transition-transform duration-200">
      ←
    </span>
  </Link>

  {/* Content Grid: Reduced padding significantly (p-4 md:p-6) and removed large gap-12 */}
  <div className="grid md:grid-cols-2 gap-4 p-4 md:p-6">
    
    {/* Left: Image Section */}
    <div className="flex flex-col justify-center">
      {/* Main Image: Reduced margin-bottom from mb-6 to mb-3 */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center border border-blue-200">
        {productImages ? (
          <img
            src={productImages[selectedImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-8xl md:text-9xl">💊</div>
        )}

        {product.tag && (
          <span className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg">
            {product.tag}
          </span>
        )}
      </div>

      {/* Image Gallery Thumbnails: Reduced mb-4 to mb-2 */}
      {productImages && productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                idx === selectedImageIndex ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Right: Details Section - REMOVED bg-blue-100 to make it blend with the white card */}
    <div className="flex flex-col justify-start py-2">
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
        {product.category}
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
        {product.name}
      </h1>
      {/* Pricing Section: Reduced padding and margin */}
      <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
          <p className="line-through text-gray-400 text-sm">MRP ₹{product.mrp.toLocaleString()}</p>
        </div>
        
        {product.price < product.mrp && (
          <div className="mt-2 pt-2 border-t border-blue-200 flex items-center gap-2">
            <img src="/dis.png" className="w-5 h-5 object-contain" alt="discount" />
            <p className="text-green-600 font-bold text-sm">
              You are saving  ₹{Math.round(product.mrp - product.price)} on this purchase!
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleEnquiry}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
      >
        <span>Enquire on WhatsApp</span>
      </button>

      {/* Description: Reduced mb-8 to mb-4 */}
     <div className="mb-4 pt-2">
  <h3 className="text-base font-semibold text-gray-700 mb-2">Description</h3>
  
  {/* Rich Text Display */}
  <div className="h-70 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 hover:scrollbar-thumb-blue-400">
    <RichTextDisplay 
      content={product.description}
      className="prose-sm text-gray-600 leading-relaxed text-sm prose-p:my-2 prose-strong:font-bold prose-em:italic prose-ol:list-decimal prose-ul:list-disc"
    />
  </div>
</div>

      
    </div>
  </div>
</div>

        {/* Related Products Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Explore More</h2>
          <p className="text-gray-600 mb-6">Discover our complete range of pharmaceutical products</p>
          <Link href="/user/products" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold transition-all duration-200 hover:shadow-lg active:scale-95">
            View All Products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
