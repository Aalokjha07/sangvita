"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStoredMarqueeItems } from '@/lib/adminStorage';
import SungvitaLoader from '@/components/SangvitaLoader';
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

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      const startTime = Date.now();

      await Promise.all([fetchProducts(), fetchArticles()]);
      setMarqueeItems(getStoredMarqueeItems());

      // Minimum loading time for premium feel (Screen opening effect)
      const elapsed = Date.now() - startTime;
      const minLoadingTime = 2800; // ~2.8 seconds

      if (elapsed < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
      }

      setLoading(false);
    };

    initializePage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setFeaturedProducts(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts([]);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    }
  };

  // Show Loader while page is loading (gives nice opening feel)
  // if (loading) {
  //   return <SungvitaLoader />;
  // }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative h-[85vh] min-h-[815px] flex items-center justify-center text-white overflow-hidden">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-blue-950/60 z-10"></div>
            <Image
              src="/hero.webp"
              alt="Pharmaceutical Research"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Main Content */}
          <div className="relative z-20 text-center px-6 max-w-4xl">
            {/* Modern Badge */}
            <div className="mb-6 inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-100 text-xs font-bold uppercase tracking-[0.2em]">
                Science of Better Living
              </span>
            </div>

            {/* Brand Name */}
            <h1 className="text-5xl md:text-4xl font-black mb-7 tracking-tighter leading-none">
              SANGVITA
              <span className="block text-2xl md:text-4xl font-light tracking-[0.3em] text-blue-400 mt-2 uppercase">
                Nutri Pharma
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Bridging the gap between <span className="text-white font-semibold">modern science</span> and 
              <span className="text-white font-semibold"> daily wellness</span>. <br/>
              Premium nutraceuticals crafted for a healthier, stronger tomorrow.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-95"
              >
                View Our Range
              </button>
              <button 
                onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold transition-all active:scale-95 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Marquee Bar */}
          {marqueeItems.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-blue-600/80 backdrop-blur-sm py-4 border-t border-blue-400">
              <div className="overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee" style={{
                  animationDuration: `${Math.max(20, marqueeItems.join(' ').length / 5)}s`
                }}>
                  {/* Set 1 */}
                  <div className="flex gap-8 px-6 items-center">
                    {marqueeItems.map((item, index) => (
                      <span key={`set1-${index}`} className="text-white font-semibold text-base md:text-lg flex-shrink-0">
                        {item}
                      </span>
                    ))}
                  </div>
                  {/* Set 2 for seamless loop */}
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

        {/* 2. ARTICLES SECTION */}
        <section id="articles" className="py-24 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 py-5">Latest Insights & Research</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <article key={article._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group">
                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                      {article.images && article.images.length > 0 ? (
                        <img
                          src={article.images[0]}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-6">
                      <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">{article.category}</span>
                      <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{article.title}</h3>
                 <div className="mb-4">
  <RichTextDisplay 
    content={article.description}
    className="text-gray-600 text-sm leading-relaxed line-clamp-2"
  />
</div>
                      <a href="#" className="text-blue-700 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                        Read Article <span>→</span>
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-slate-500 text-lg">No articles available yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. LATEST PRODUCTS SECTION */}
        <section id="products" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Featured Products</h2>
                <p className="text-slate-500 mt-2 text-lg">Pharmaceutical grade solutions for diverse medical needs.</p>
              </div>
              <Link href="/user/products" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-800 hover:border-blue-800 transition-all">
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-blue-100 rounded-3xl p-8 border border-blue-400 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all text-center">
                  <div className="w-full h-32 mb-6 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    {product.images?.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">📦</span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h4>
                  <p className="text-slate-500 text-sm mb-6">{product.category}</p>
                  <Link href={`/user/products/${product._id}`}>
                    <button className="w-full py-3 bg-white-600 border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white rounded-2xl font-semibold transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION */}
        <section className="bg-blue-600 py-20 text-center text-white px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to partner with Sangvita?</h2>
            <p className="text-lg opacity-90 mb-10">
              Whether you are a medical professional or a distributor, we offer competitive pharmaceutical solutions tailored to your requirements.
            </p>
            <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-extrabold shadow-xl hover:scale-105 transition-transform cursor-pointer">
              Inquire Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}