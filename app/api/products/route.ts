import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { cachedRequest, CACHE_TTL, clearCache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20')); // Max 50 items per page
    const skip = (page - 1) * limit;
    const category = searchParams.get('category') || '';

    // Create cache key based on query params
    const cacheKey = `products_list_p${page}_l${limit}${category ? '_c' + category : ''}`;

    const result = await cachedRequest(
      cacheKey,
      CACHE_TTL.PRODUCTS,
      async () => {
        await dbConnect();
        
        // Build query filter
        const query = category ? { category: { $regex: category, $options: 'i' } } : {};

        // Fetch paginated products with optimized fields
        const [products, total] = await Promise.all([
          Product.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('name category price mrp description images tag createdAt _id')
            .lean(), // Use lean() for faster queries when not modifying
          Product.countDocuments(query),
        ]);

        return {
          products,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        };
      }
    );

    // Set cache headers for HTTP caching (browser + CDN)
    const response = NextResponse.json(result);
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

    // Clear all product list caches when new product is created
    clearCache('products_list');

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}


