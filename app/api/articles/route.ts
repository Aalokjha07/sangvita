import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { cachedRequest, CACHE_TTL, clearCache } from '@/lib/cache';

export async function GET() {
  try {
    const articles = await cachedRequest(
      'articles_list',
      CACHE_TTL.ARTICLES,
      async () => {
        await dbConnect();
        return await Article.find({}).sort({ createdAt: -1 });
      }
    );

    // Set cache headers for HTTP caching (browser + CDN)
    const response = NextResponse.json(articles);
    response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    response.headers.set('Content-Type', 'application/json');
    return response;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    const article = await Article.create({
      title: data.title,
      description: data.description,
      category: data.category,
      images: data.images || [],
    });

    // Clear cache when new article is created
    clearCache('articles_list');

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}


