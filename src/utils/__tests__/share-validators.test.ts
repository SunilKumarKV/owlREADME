import { describe, it, expect } from 'vitest';
import {
  safeString,
  safeNumber,
  safeTemplate,
  validateREADMEData,
  validateRoadmapData,
} from '../share-validators';

// ── safeString ────────────────────────────────────────────────────────────────
describe('safeString', () => {
  it('returns the string unchanged when under max length', () => {
    expect(safeString('hello', 100)).toBe('hello');
  });

  it('truncates strings exceeding maxLength', () => {
    const long = 'a'.repeat(200);
    expect(safeString(long, 50)).toHaveLength(50);
  });

  it('returns empty string for non-string inputs', () => {
    expect(safeString(42)).toBe('');
    expect(safeString(null)).toBe('');
    expect(safeString(undefined)).toBe('');
    expect(safeString({})).toBe('');
    expect(safeString([])).toBe('');
    expect(safeString(true)).toBe('');
  });

  it('uses default maxLength of 1000', () => {
    const long = 'x'.repeat(1500);
    expect(safeString(long)).toHaveLength(1000);
  });
});

// ── safeNumber ────────────────────────────────────────────────────────────────
describe('safeNumber', () => {
  it('returns valid non-negative numbers', () => {
    expect(safeNumber(0)).toBe(0);
    expect(safeNumber(42)).toBe(42);
    expect(safeNumber(3.14)).toBe(3.14);
  });

  it('returns undefined for negative numbers', () => {
    expect(safeNumber(-1)).toBeUndefined();
  });

  it('returns undefined for NaN', () => {
    expect(safeNumber(NaN)).toBeUndefined();
  });

  it('returns undefined for non-numeric types', () => {
    expect(safeNumber('42')).toBeUndefined();
    expect(safeNumber(null)).toBeUndefined();
    expect(safeNumber(undefined)).toBeUndefined();
    expect(safeNumber({})).toBeUndefined();
  });
});

// ── safeTemplate ──────────────────────────────────────────────────────────────
describe('safeTemplate', () => {
  it('accepts valid template names', () => {
    expect(safeTemplate('minimal')).toBe('minimal');
    expect(safeTemplate('professional')).toBe('professional');
    expect(safeTemplate('developer')).toBe('developer');
    expect(safeTemplate('open-source')).toBe('open-source');
    expect(safeTemplate('portfolio')).toBe('portfolio');
  });

  it('returns undefined for invalid template names', () => {
    expect(safeTemplate('evil-template')).toBeUndefined();
    expect(safeTemplate('')).toBeUndefined();
    expect(safeTemplate(42)).toBeUndefined();
    expect(safeTemplate(null)).toBeUndefined();
  });
});

// ── validateREADMEData ────────────────────────────────────────────────────────
describe('validateREADMEData', () => {
  it('returns null for non-object inputs', () => {
    expect(validateREADMEData(null)).toBeNull();
    expect(validateREADMEData(undefined)).toBeNull();
    expect(validateREADMEData('string')).toBeNull();
    expect(validateREADMEData(42)).toBeNull();
    expect(validateREADMEData([])).toBeNull();
  });

  it('returns an empty object for an empty input object', () => {
    const result = validateREADMEData({});
    expect(result).not.toBeNull();
    expect(result?.name).toBeUndefined();
    expect(result?.role).toBeUndefined();
  });

  it('validates and returns scalar profile fields', () => {
    const result = validateREADMEData({
      name: 'Alice',
      role: 'Engineer',
      about: 'About me',
      followers: 100,
      following: 50,
      publicRepos: 20,
      template: 'developer',
    });
    expect(result?.name).toBe('Alice');
    expect(result?.role).toBe('Engineer');
    expect(result?.followers).toBe(100);
    expect(result?.following).toBe(50);
    expect(result?.publicRepos).toBe(20);
    expect(result?.template).toBe('developer');
  });

  it('truncates name to 100 characters max', () => {
    const long = 'a'.repeat(200);
    const result = validateREADMEData({ name: long });
    expect(result?.name).toHaveLength(100);
  });

  it('rejects invalid template names', () => {
    const result = validateREADMEData({ template: 'hacker-template' });
    expect(result?.template).toBeUndefined();
  });

  it('rejects negative numbers for follower counts', () => {
    const result = validateREADMEData({ followers: -5 });
    expect(result?.followers).toBeUndefined();
  });

  it('validates techStack nested config', () => {
    const result = validateREADMEData({
      techStack: {
        enabled: true,
        style: 'for-the-badge',
        iconOnly: false,
        groupByCategory: true,
        hideEmptyCategories: false,
        selectedIds: ['react', 'typescript', 42], // 42 should be filtered out
      },
    });
    expect(result?.techStack?.enabled).toBe(true);
    expect(result?.techStack?.style).toBe('for-the-badge');
    expect(result?.techStack?.selectedIds).toEqual(['react', 'typescript']);
  });

  it('rejects invalid badge style in techStack, defaults to "flat"', () => {
    const result = validateREADMEData({
      techStack: { enabled: true, style: 'evil-style', selectedIds: [] },
    });
    expect(result?.techStack?.style).toBe('flat');
  });

  it('validates githubStats nested config', () => {
    const result = validateREADMEData({
      githubStats: {
        enabled: true,
        username: 'octocat',
        theme: 'radical',
        hideBorder: false,
        showIcons: true,
        compactMode: false,
        layout: 'compact',
        cardOrder: ['stats', 'languages', 'invalid-card'],
        cardConfigs: {
          stats: { enabled: true },
          languages: { enabled: false },
          streak: { enabled: true },
        },
      },
    });
    expect(result?.githubStats?.username).toBe('octocat');
    expect(result?.githubStats?.layout).toBe('compact');
    // 'invalid-card' should be filtered from cardOrder
    expect(result?.githubStats?.cardOrder).not.toContain('invalid-card');
    expect(result?.githubStats?.cardOrder).toContain('stats');
  });

  it('validates socialLinks nested config', () => {
    const result = validateREADMEData({
      socialLinks: {
        enabled: true,
        style: 'flat',
        iconOnly: false,
        platforms: {
          linkedin: { enabled: true, value: 'alice' },
          toolong: { enabled: false, value: 'x' },
        },
        order: ['linkedin'],
      },
    });
    expect(result?.socialLinks?.enabled).toBe(true);
    expect(result?.socialLinks?.platforms?.linkedin?.value).toBe('alice');
  });

  it('blocks prototype pollution attempts (__proto__, constructor)', () => {
    const payload = JSON.parse('{"__proto__": {"polluted": true}, "name": "Safe"}');
    const result = validateREADMEData(payload);
    // Should not throw; polluted key should not propagate
    expect(result?.name).toBe('Safe');
    expect((Object.prototype as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('validates sections order allowlist', () => {
    const result = validateREADMEData({
      sections: {
        order: ['header', 'about', 'evilSection', 'stats'],
        sections: {
          header: { id: 'header', name: 'Header', enabled: true, collapsed: false },
        },
      },
    });
    expect(result?.sections?.order).toContain('header');
    expect(result?.sections?.order).toContain('about');
    expect(result?.sections?.order).not.toContain('evilSection');
  });

  it('validates animated component config types', () => {
    const result = validateREADMEData({
      animatedComponents: {
        enabled: true,
        components: [
          {
            id: 'comp-1',
            type: 'typing',
            enabled: true,
            title: 'My Typer',
            config: {
              text: 'hello world',
              speed: 100,
              loop: true,
              injected: '<script>alert(1)</script>', // should be sanitized
            },
          },
        ],
      },
    });
    expect(result?.animatedComponents?.enabled).toBe(true);
    const comp = result?.animatedComponents?.components[0];
    expect(comp?.type).toBe('typing');
    expect(comp?.config?.text).toBe('hello world');
    // Script string passes through as a string (rendering safety is separate)
    expect(typeof comp?.config?.injected).toBe('string');
  });
});

// ── validateRoadmapData ───────────────────────────────────────────────────────
describe('validateRoadmapData', () => {
  it('returns null for non-object inputs', () => {
    expect(validateRoadmapData(null)).toBeNull();
    expect(validateRoadmapData([])).toBeNull();
    expect(validateRoadmapData('string')).toBeNull();
  });

  it('returns empty object for empty input', () => {
    const result = validateRoadmapData({});
    expect(result).not.toBeNull();
    expect(result?.title).toBeUndefined();
    expect(result?.steps).toBeUndefined();
  });

  it('validates title and steps', () => {
    const result = validateRoadmapData({
      title: 'Full Stack Dev Path',
      steps: ['Learn HTML', 'Learn CSS', 'Learn JavaScript'],
    });
    expect(result?.title).toBe('Full Stack Dev Path');
    expect(result?.steps).toEqual(['Learn HTML', 'Learn CSS', 'Learn JavaScript']);
  });

  it('filters non-string items from steps array', () => {
    const result = validateRoadmapData({
      steps: ['Step 1', 42, null, 'Step 2', { evil: true }],
    });
    expect(result?.steps).toEqual(['Step 1', 'Step 2']);
  });

  it('returns empty steps array when steps is not an array', () => {
    const result = validateRoadmapData({ steps: 'not-an-array' });
    expect(result?.steps).toEqual([]);
  });

  it('truncates title to 200 characters max', () => {
    const longTitle = 'T'.repeat(300);
    const result = validateRoadmapData({ title: longTitle });
    expect(result?.title).toHaveLength(200);
  });

  it('truncates each step to 1000 characters max', () => {
    const longStep = 'S'.repeat(1500);
    const result = validateRoadmapData({ steps: [longStep] });
    expect(result?.steps?.[0]).toHaveLength(1000);
  });
});
