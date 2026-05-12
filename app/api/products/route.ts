import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { cachedRequest, CACHE_TTL, clearCache } from '@/lib/cache';

export async function GET() {
  try {
    const products = await cachedRequest(
      'products_list',
      CACHE_TTL.PRODUCTS,
      async () => {
        await dbConnect();
        return await Product.find({}).sort({ createdAt: -1 });
      }
    );

    // Set cache headers for HTTP caching (browser + CDN)
    const response = NextResponse.json(products);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    response.headers.set('Content-Type', 'application/json');
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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

    const product = await Product.create({
      name: data.name,
      category: data.category,
      price: data.price,
      mrp: data.mrp,
      description: data.description,
      images: data.images || [],
      tag: data.tag || null,
    });

    // Clear cache when new product is created
    clearCache('products_list');

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}


