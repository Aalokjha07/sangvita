/**
 * In-Memory Caching System
 * Stores frequently accessed data in memory with TTL (time-to-live)
 * Perfect for products and articles that don't change frequently
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // milliseconds
}

interface CacheStore {
  [key: string]: CacheEntry<any>;
}

const cache: CacheStore = {};

/**
 * Get cache TTLs (in milliseconds)
 */
export const CACHE_TTL = {
  PRODUCTS: 5 * 60 * 1000, // 5 minutes
  ARTICLES: 10 * 60 * 1000, // 10 minutes
  MARQUEE: 15 * 60 * 1000, // 15 minutes
  SHORT: 1 * 60 * 1000, // 1 minute
  LONG: 30 * 60 * 1000, // 30 minutes
};

/**
 * Set data in cache with TTL
 */
export function setCacheData<T>(key: string, data: T, ttl: number = CACHE_TTL.PRODUCTS): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
    ttl,
  };
}

/**
 * Get data from cache if not expired
 */
export function getCacheData<T>(key: string): T | null {
  const entry = cache[key];

  if (!entry) return null;

  // Check if cache has expired
  const age = Date.now() - entry.timestamp;
  if (age > entry.ttl) {
    delete cache[key];
    return null;
  }

  return entry.data as T;
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  delete cache[key];
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  for (const key in cache) {
    delete cache[key];
  }
}

/**
 * Get cache age in milliseconds
 */
export function getCacheAge(key: string): number | null {
  const entry = cache[key];
  if (!entry) return null;
  return Date.now() - entry.timestamp;
}

/**
 * Check if cache exists and is valid
 */
export function isCacheValid(key: string): boolean {
  const entry = cache[key];
  if (!entry) return false;

  const age = Date.now() - entry.timestamp;
  return age <= entry.ttl;
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  const stats: { [key: string]: { age: number; ttl: number; valid: boolean } } = {};

  for (const key in cache) {
    const entry = cache[key];
    const age = Date.now() - entry.timestamp;
    stats[key] = {
      age,
      ttl: entry.ttl,
      valid: age <= entry.ttl,
    };
  }

  return stats;
}

/**
 * Request deduplication - prevent multiple simultaneous requests
 * Returns a promise that all requests share
 */
const pendingRequests: { [key: string]: Promise<any> | undefined } = {};

export function dedupRequest<T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> {
  // Return existing promise if request is already in flight
  if (key in pendingRequests && pendingRequests[key]) {
    return pendingRequests[key] as Promise<T>;
  }

  // Create new promise and store it
  const promise = requestFn()
    .then((result) => {
      delete pendingRequests[key];
      return result;
    })
    .catch((error) => {
      delete pendingRequests[key];
      throw error;
    });

  pendingRequests[key] = promise;
  return promise;
}

/**
 * Combined cache + dedup strategy
 * First tries cache, then deduplicates DB requests
 */
export function cachedRequest<T>(
  cacheKey: string,
  ttl: number,
  requestFn: () => Promise<T>
): Promise<T> {
  // Check if data is in cache
  const cached = getCacheData<T>(cacheKey);
  if (cached !== null) {
    return Promise.resolve(cached);
  }

  // Use deduplication to prevent multiple DB calls
  return dedupRequest(cacheKey, async () => {
    const data = await requestFn();
    setCacheData(cacheKey, data, ttl);
    return data;
  });
}
