"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStoredMarqueeItems } from '@/lib/adminStorage';
import RichTextDisplay from '@/components/RichTextDisplay';

interface Product {
  _id?: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  description: string;
  images: string[];
  tag: string | null;
}

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: string;
}

// Skeleton Loading Components
const ProductSkeleton = () => (
  <div className="bg-blue-100 rounded-3xl p-6 sm:p-8 border border-blue-400 animate-pulse">
    <div className="w-full h-32 mb-6 bg-gray-300 rounded-2xl"></div>
    <div className="h-6 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-6 w-2/3 mx-auto"></div>
    <div className="h-10 bg-gray-300 rounded-2xl"></div>
  </div>
);

const ArticleSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-3 bg-gray-300 rounded w-1/4 mb-3"></div>
      <div className="h-5 bg-gray-300 rounded mb-2"></div>
      <div className="h-5 bg-gray-300 rounded mb-6 w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([fetchProducts(), fetchArticles()]);
      setMarqueeItems(getStoredMarqueeItems());
    };
    initializePage();
  }, []);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await fetch('/api/products', {
        headers: { 'Cache-Control': 'max-age=300' },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setFeaturedProducts(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchArticles = async () => {
    setArticlesLoading(true);
    try {
      const response = await fetch('/api/articles', {
        headers: { 'Cache-Control': 'max-age=600' },
      });
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setArticlesLoading(false);
    }
  };

  return (
    <div className=" flex flex-col font-sans text-slate-900" 
   >
      <main className="flex-grow" >
        {/* ==================== HERO SECTION ==================== */}
        <section
className="relative min-h-[1000px] lg:min-h-[850px] flex items-center justify-center text-white overflow-hidden"
  style={{
    backgroundImage: `url('/hero.jpeg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
  }}
>
  {/* Background Overlay */}
  <div className="absolute inset-0 z-0 bg-black/50 lg:bg-black/40" />

  {/* Main Content */}
  <div className="relative z-20 w-full max-w-9xl mx-auto px-6 lg:px-12 pt-24 pb-32 lg:py-0">
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* 1. TOP: Brand & Text (Order 1 on Mobile) */}
      <div className="text-center lg:text-left order-1">
        {/* Tagline Badge */}
        <div className="mb-8 inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            Science of Better Living
          </span>
        </div>

        {/* Brand Logo & Title */}
        <div className="mb-6 flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6"> 
          <img
            src="/logo.jpeg"
            alt="Sangvita Nutri Pharma Logo"
            className="rounded-full border-2 border-blue-400 drop-shadow-2xl w-[100px] lg:w-[180px] h-auto object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
              SANGVITA
              <span className="block text-xl md:text-2xl lg:text-4xl font-light tracking-[0.2em] lg:tracking-[0.3em] text-blue-400 mt-1 uppercase">
                Nutri Pharma
              </span>
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl mb-10 text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
          Bridging the gap between{" "}
          <span className="text-white font-semibold">modern science</span> and
          <span className="text-white font-semibold"> daily wellness</span>.
          <br className="hidden sm:block" />
          Premium nutraceuticals crafted for a healthier, stronger tomorrow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95"
          onClick ={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            View Our Products
          </button>
          <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all active:scale-95"
          onClick ={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}>
          
            R&D Insights
          </button>
        </div>
      </div>

      {/* 2. BOTTOM: Director Section (Order 2 on Mobile) */}
      <div className="flex justify-center lg:justify-end order-2 mt-8 lg:mt-0">
        <div className="relative max-w-[280px] sm:max-w-sm w-full">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6 shadow-2xl">
            <div className="flex justify-center mb-3">
              <img
                src="/image-removebg-preview (1).png"
                alt="Director Prince Kumar Pandey"
                className="h-[280px] sm:h-[400px] lg:h-[500px] w-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="text-center">
              <p className="text-blue-300 text-[10px] lg:text-xs uppercase tracking-[0.2em] font-semibold mb-1">
                Director
              </p>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Prince Kumar Pandey
              </h3>
              <blockquote className="text-slate-300 text-xs lg:text-sm italic leading-relaxed border-t border-white/10 pt-3">
                “Building trust through innovation in nutraceutical healthcare.”
              </blockquote>
            </div>
          </div>
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl -z-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>

          {/* Marquee */}
          {marqueeItems.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-blue-600/80 backdrop-blur-sm py-4 border-t border-blue-400">
              <div className="overflow-hidden">
                <div
                  className="flex whitespace-nowrap animate-marquee"
                  style={{ animationDuration: `${Math.max(20, marqueeItems.join(' ').length / 5)}s` }}
                >
                  <div className="flex gap-8 px-6 items-center">
                    {marqueeItems.map((item, index) => (
                      <span key={`set1-${index}`} className="text-white font-semibold text-base md:text-lg flex-shrink-0">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-8 px-6 items-center">
                    {marqueeItems.map((item, index) => (
                      <span key={`set2-${index}`} className="text-white font-semibold text-base md:text-lg flex-shrink-0">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        

        {/* ==================== PRODUCTS SECTION ==================== */}
        <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Featured Products</h2>
                <p className="text-slate-500 mt-2 text-lg">
                  Pharmaceutical grade solutions for diverse medical needs.
                </p>
              </div>
              <Link
                href="/user/products"
                className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-800 hover:border-blue-800 transition-all"
              >
                View Catalog ⬩➤
              </Link>
            </div>

            <div className="grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {productsLoading ? (
                <>
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </>
              ) : featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                 <div
  key={product._id}
  /* 1. Removed fixed h-70 (use h-full for consistency)
     2. Changed p-6 to p-3 for mobile, scaling up to p-8 for desktop
     3. Added flex flex-col to keep buttons aligned
  */
  className="bg-white-100 rounded-2xl p-3 sm:p-8 border border-blue-400 hover:bg-blue-100 hover:border-blue-200 hover:shadow-lg transition-all text-center flex flex-col h-full"
>
  {/* 1. Image Container: reduced margin on mobile */}
  <div className="w-full aspect-square mb-3 sm:mb-6 bg-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
    {product.images?.length > 0 ? (
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-3xl sm:text-5xl">📦</span>
    )}
  </div>

  {/* 2. Text Content: Reduced sizes for mobile */}
  <h4 className="text-sm sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2 line-clamp-1">
    {product.name}
  </h4>
  
  <p className="text-[10px] sm:text-sm text-slate-500 mb-4 sm:mb-6 uppercase tracking-wider">
    {product.category}
  </p>

  {/* 3. Button: Pushed to the bottom, smaller padding on mobile */}
  <div className="mt-auto">
    <Link href={`/user/products/${product._id}`}>
      <button className="w-full py-2 sm:py-3 text-xs sm:text-base bg-white border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white rounded-xl sm:rounded-2xl font-semibold transition-all">
        View Details
      </button>
    </Link>
  </div>
</div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 text-lg">No products available yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== ARTICLES SECTION ==================== */}
        <section id="articles" className="py-16 sm:py-24 bg-cover bg-center px-4 sm:px-6 " 
        style={{ backgroundImage: `url('/article2.jpg')`,
          
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          backgroundAttachment: 'fixed'
         }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-4">Latest Insights & Research</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {articlesLoading ? (
                <>
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                </>
              ) : articles.length > 0 ? (
                articles.map((article) => (
                  <article
                    key={article._id}
                    className="bg-white   overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group"
                  >
                    <div className="aspect-square w-full  sm:h-50 bg-slate-200 relative overflow-hidden">
                      {article.images?.length > 0 ? (
                        <img
                          src={article.images[0]}
                          alt={article.title}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors" />
                    </div>

                    <div className="p-2 h-30">
                      <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mt-0 mb-0 group-hover:text-blue-600 transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                      <div className="mb-1 h-5">
                        <RichTextDisplay
                          content={article.description}
                          className="text-gray-600 text-sm leading-relaxed line-clamp-1"
                        />
                      </div>
                      <Link href={`/user/articles/${article._id}`} className="text-blue-700 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all ">
                        Read Article <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 text-lg">No articles available yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== CALL TO ACTION ==================== */}
        <section className="bg-blue-600 py-20 text-center text-white px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to partner with Sangvita?</h2>
            <p className="text-lg opacity-90 mb-10">
              Whether you are a medical professional or a distributor, we offer competitive pharmaceutical solutions tailored to your requirements.
            </p>
            <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-extrabold shadow-xl hover:scale-105 transition-transform">
              Inquire Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}