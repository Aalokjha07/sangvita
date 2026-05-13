"use client";
import React, { useEffect, useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import RichTextDisplay from '@/components/RichTextDisplay';

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: string;
}

const ArticleSkeleton = () => (
  <div className="max-w-7xl mx-auto animate-pulse px-4">
    <div className="h-64 sm:h-96 bg-gray-300 rounded-2xl mb-8"></div>
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
  </div>
);

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${id}`, {
          headers: { 'Cache-Control': 'max-age=600' },
        });

        if (!response.ok) throw new Error('Article not found');

        const data = await response.json();
        setArticle(data);
        setError(null);
        setCurrentImageIndex(0);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  const handleBackToArticles = () => {
    if (window.location.pathname === '/') {
      const element = document.getElementById('articles');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#articles');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const nextImage = () => {
    if (!article?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % article.images.length);
  };

  const prevImage = () => {
    if (!article?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + article.images.length) % article.images.length);
  };

  const goToImage = (index: number) => setCurrentImageIndex(index);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={handleBackToArticles}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Articles
          </button>
          <div className="bg-red-50 p-8 rounded-lg border border-red-200">
            <h1 className="text-2xl font-bold text-red-800 mb-2">Article Not Found</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button - Prominent on Mobile */}
       

        {loading ? (
          <ArticleSkeleton />
        ) : article ? (
          <article>
            {/* Header */}
            <div className="mb-8 sm:mb-10 py-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-slate-500 text-sm">
                  {formatDate(article.createdAt)}
                </span>
              </div>
               <button
          onClick={handleBackToArticles}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 sm:mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Articles</span>
        </button>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                {article.title}
              </h1>

              <div className="flex items-center text-slate-600 text-sm gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadTime(article.description)}</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 m-0">
              {/* LEFT - Image Slider */}
              <div className="lg:col-span-7 my-0">
                {article.images?.length > 0 && (
                  <div className="space-y-3">
                    {/* Main Image */}
                    <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-black">
                      <img
                        src={article.images[currentImageIndex]}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />

                      {article.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full transition-all active:scale-95"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full transition-all active:scale-95"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {article.images.length > 1 && (
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-3 px-1">More Images</h3>
                        <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-hide">
                          {article.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => goToImage(index)}
                              className={`flex-shrink-0 snap-start w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all active:scale-95 ${
                                index === currentImageIndex
                                  ? 'border-blue-600 scale-105'
                                  : 'border-transparent hover:border-slate-300'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT - Content */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 lg:sticky lg:top-8">
                  <div className="prose prose-lg max-w-none">
                    <RichTextDisplay
                      content={article.description}
                      className="text-slate-700 leading-relaxed text-[17px] sm:text-[17.5px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="border-t border-slate-200 mt-16 pt-8">
              <button
                onClick={handleBackToArticles}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                View All Articles
              </button>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}