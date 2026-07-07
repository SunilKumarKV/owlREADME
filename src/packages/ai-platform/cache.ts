import { AIResponse } from './types';

class AICache {
  private cache = new Map<string, { response: AIResponse; expiry: number }>();
  private defaultTtl = 600000; // 10 minutes default

  /**
   * Retrieves a non-expired cached prompt response.
   */
  get(prompt: string): AIResponse | null {
    const entry = this.cache.get(prompt);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(prompt);
      return null;
    }

    return entry.response;
  }

  /**
   * Stores a prompt response in the cache.
   */
  set(prompt: string, response: AIResponse, ttlMs?: number): void {
    const expiry = Date.now() + (ttlMs || this.defaultTtl);
    this.cache.set(prompt, { response, expiry });

    // Limit cache size to prevent memory leaks
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }
  }

  /**
   * Clears the entire prompt cache.
   */
  clear(): void {
    this.cache.clear();
  }
}

export const aiCache = new AICache();
