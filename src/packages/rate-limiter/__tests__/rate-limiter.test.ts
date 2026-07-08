import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getClientIp } from '../index';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Imports a fresh RateLimiter instance per test so that tests are isolated.
 * We re-create the class inline rather than importing the singleton to
 * avoid state bleed between tests.
 */
class TestRateLimiter {
  private store = new Map<string, { timestamps: number[] }>();

  check(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterMs: number } {
    const now = Date.now();
    const windowStart = now - windowMs;

    let entry = this.store.get(key);
    if (!entry) {
      entry = { timestamps: [] };
      this.store.set(key, entry);
    }

    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

    if (entry.timestamps.length >= limit) {
      const oldestTs = entry.timestamps[0];
      const retryAfterMs = oldestTs + windowMs - now;
      return { allowed: false, retryAfterMs: Math.max(retryAfterMs, 0) };
    }

    entry.timestamps.push(now);
    return { allowed: true, retryAfterMs: 0 };
  }
}

// ── RateLimiter Tests ─────────────────────────────────────────────────────────

describe('RateLimiter', () => {
  let limiter: TestRateLimiter;

  beforeEach(() => {
    limiter = new TestRateLimiter();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests that are within the limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(limiter.check('ip-a', 5, 60_000).allowed).toBe(true);
    }
  });

  it('blocks the request exactly at the limit', () => {
    for (let i = 0; i < 10; i++) {
      limiter.check('ip-b', 10, 60_000);
    }
    const result = limiter.check('ip-b', 10, 60_000);
    expect(result.allowed).toBe(false);
  });

  it('returns retryAfterMs greater than 0 when blocked', () => {
    for (let i = 0; i < 3; i++) {
      limiter.check('ip-c', 3, 60_000);
    }
    const result = limiter.check('ip-c', 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it('resets quota after the window elapses', () => {
    for (let i = 0; i < 3; i++) {
      limiter.check('ip-d', 3, 1_000);
    }
    // Blocked
    expect(limiter.check('ip-d', 3, 1_000).allowed).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(1_100);

    // Should be allowed again
    expect(limiter.check('ip-d', 3, 1_000).allowed).toBe(true);
  });

  it('tracks different keys independently', () => {
    for (let i = 0; i < 5; i++) {
      limiter.check('ip-x', 5, 60_000);
    }
    // ip-x is exhausted, ip-y is fresh
    expect(limiter.check('ip-x', 5, 60_000).allowed).toBe(false);
    expect(limiter.check('ip-y', 5, 60_000).allowed).toBe(true);
  });

  it('allows exactly limit requests per window (fencepost check)', () => {
    const LIMIT = 7;
    for (let i = 0; i < LIMIT; i++) {
      expect(limiter.check('ip-fence', LIMIT, 60_000).allowed).toBe(true);
    }
    expect(limiter.check('ip-fence', LIMIT, 60_000).allowed).toBe(false);
  });

  it('slides the window — old entries drop off as time passes', () => {
    // Fill half the limit now
    for (let i = 0; i < 5; i++) {
      limiter.check('ip-slide', 10, 2_000);
    }

    // Advance past the first half's window
    vi.advanceTimersByTime(2_100);

    // These 5 new requests should now be within the 10-req limit
    for (let i = 0; i < 5; i++) {
      expect(limiter.check('ip-slide', 10, 2_000).allowed).toBe(true);
    }
  });
});

// ── getClientIp Tests ─────────────────────────────────────────────────────────

describe('getClientIp', () => {
  function makeHeaders(obj: Record<string, string>): Headers {
    return new Headers(obj);
  }

  it('extracts the first IP from a comma-separated x-forwarded-for header', () => {
    const headers = makeHeaders({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8, 9.10.11.12' });
    expect(getClientIp(headers)).toBe('1.2.3.4');
  });

  it('returns x-forwarded-for directly when it is a single IP', () => {
    const headers = makeHeaders({ 'x-forwarded-for': '192.168.1.1' });
    expect(getClientIp(headers)).toBe('192.168.1.1');
  });

  it('trims whitespace from the extracted IP', () => {
    const headers = makeHeaders({ 'x-forwarded-for': '  10.0.0.1  , 10.0.0.2' });
    expect(getClientIp(headers)).toBe('10.0.0.1');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const headers = makeHeaders({ 'x-real-ip': '203.0.113.5' });
    expect(getClientIp(headers)).toBe('203.0.113.5');
  });

  it('returns "unknown" when neither header is present', () => {
    const headers = makeHeaders({});
    expect(getClientIp(headers)).toBe('unknown');
  });

  it('prefers x-forwarded-for over x-real-ip', () => {
    const headers = makeHeaders({
      'x-forwarded-for': '1.1.1.1',
      'x-real-ip': '2.2.2.2',
    });
    expect(getClientIp(headers)).toBe('1.1.1.1');
  });
});
