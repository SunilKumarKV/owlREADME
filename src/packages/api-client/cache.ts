/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from './logger';

interface CacheEntry<T = any> {
  data: T;
  expiry: number;
}

class ResponseCache {
  private cache = new Map<string, CacheEntry>();

  /**
   * Generates a deterministic cache key based on query configuration contents.
   */
  generateKey(method: string, url: string, headers?: any, body?: any): string {
    const serializedHeaders = headers ? JSON.stringify(headers) : '';
    const serializedBody = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : '';
    return `${method}:${url}:${serializedHeaders}:${serializedBody}`;
  }

  /**
   * Looks up a valid non-expired entry from the cache.
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      logger.debug(`Cache expired for key: ${key}`);
      this.cache.delete(key);
      return null;
    }

    logger.debug(`Cache hit for key: ${key}`);
    return entry.data as T;
  }

  /**
   * Stores a parsed response in the cache with a defined TTL.
   */
  set<T>(key: string, data: T, ttlMs: number): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
    logger.debug(`Cached entry for key: ${key} with TTL: ${ttlMs}ms`);

    // Prevent map memory leak
    if (this.cache.size > 200) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }
  }

  /**
   * Clears all cache entries.
   */
  clear(): void {
    this.cache.clear();
    logger.debug('Response cache cleared.');
  }

  /**
   * Invalidates a single cache entry.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
    logger.debug(`Invalidated cache entry for key: ${key}`);
  }
}

export const responseCache = new ResponseCache();
