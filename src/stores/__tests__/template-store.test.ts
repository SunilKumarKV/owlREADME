import { describe, it, expect, beforeEach } from 'vitest';
import { useTemplateStore } from '../template-store';

describe('useTemplateStore state management', () => {
  beforeEach(() => {
    // Reset templates to SEED_TEMPLATES before each test to prevent test cross-pollution
    useTemplateStore.setState({
      templates: [
        {
          id: 'comm-ai-engineer',
          version: '1.0',
          name: 'Neural Architect Profile',
          description: 'Designed for AI & ML engineers.',
          author: 'alt_brain_42',
          category: 'ai',
          tags: ['ai', 'python'],
          difficulty: 'Advanced',
          technologies: ['python'],
          likes: 142,
          downloads: 512,
          sections: ['header', 'about'],
          theme: 'dark',
          createdAt: '2026-06-25T12:00:00Z',
          visibility: 'public',
          config: { header: { enabled: true } },
        },
        {
          id: 'comm-minimal-dev',
          version: '1.0',
          name: 'Clean Typer Profile',
          description: 'Clean typographic layout.',
          author: 'bash_champion',
          category: 'minimal',
          tags: ['minimalist'],
          difficulty: 'Beginner',
          technologies: ['go'],
          likes: 89,
          downloads: 310,
          sections: ['header', 'about'],
          theme: 'minimal',
          createdAt: '2026-06-20T14:30:00Z',
          visibility: 'public',
          config: { header: { enabled: true } },
        },
        {
          id: 'comm-gprm-dash',
          version: '1.0',
          name: 'Modern Web Stack',
          description: 'Next.js developers.',
          author: 'next_wizard',
          category: 'gprm',
          tags: ['react'],
          difficulty: 'Intermediate',
          technologies: ['react'],
          likes: 210,
          downloads: 875,
          sections: ['header', 'about'],
          theme: 'gradient',
          createdAt: '2026-07-01T09:15:00Z',
          visibility: 'public',
          config: { header: { enabled: true } },
        }
      ],
      favorites: [],
      recentlyUsed: []
    });
  });

  it('should initialize with default seed templates', () => {
    const state = useTemplateStore.getState();
    expect(state.templates.length).toBeGreaterThanOrEqual(3);
    const aiTemplate = state.templates.find(t => t.id === 'comm-ai-engineer');
    expect(aiTemplate).toBeDefined();
    expect(aiTemplate?.author).toBe('alt_brain_42');
  });

  it('should allow creating a blank template', () => {
    const store = useTemplateStore.getState();
    const newId = store.createTemplate('New Custom Template', 'Developer');
    expect(newId).toBeDefined();

    const state = useTemplateStore.getState();
    const created = state.templates.find((t) => t.id === newId);
    expect(created).toBeDefined();
    expect(created?.name).toBe('New Custom Template');
    expect(created?.visibility).toBe('private');
  });

  it('should allow duplicating a template', () => {
    const store = useTemplateStore.getState();
    const dupId = store.duplicateTemplate('comm-ai-engineer');
    expect(dupId).toBeDefined();

    const state = useTemplateStore.getState();
    const dup = state.templates.find((t) => t.id === dupId);
    expect(dup).toBeDefined();
    expect(dup?.name).toBe('Neural Architect Profile (Copy)');
    expect(dup?.likes).toBe(0);
  });

  it('should allow updating an existing template', () => {
    const store = useTemplateStore.getState();
    store.updateTemplate('comm-ai-engineer', {
      name: 'Updated AI Profile Name',
      visibility: 'draft',
    });

    const state = useTemplateStore.getState();
    const updated = state.templates.find((t) => t.id === 'comm-ai-engineer');
    expect(updated?.name).toBe('Updated AI Profile Name');
    expect(updated?.visibility).toBe('draft');
  });

  it('should support toggling likes on templates', () => {
    const store = useTemplateStore.getState();
    const targetId = 'comm-gprm-dash';
    
    // Get initial likes
    const initialLikes = store.templates.find(t => t.id === targetId)?.likes || 0;
    
    // Like
    store.toggleLike(targetId);
    let updated = useTemplateStore.getState().templates.find(t => t.id === targetId);
    expect(updated?.likes).toBe(initialLikes + 1);
    expect(updated?.isLiked).toBe(true);

    // Unlike
    store.toggleLike(targetId);
    updated = useTemplateStore.getState().templates.find(t => t.id === targetId);
    expect(updated?.likes).toBe(initialLikes);
    expect(updated?.isLiked).toBe(false);
  });

  it('should support favoriting and adding recently used templates', () => {
    const store = useTemplateStore.getState();
    const targetId = 'comm-minimal-dev';

    store.toggleFavorite(targetId);
    let state = useTemplateStore.getState();
    expect(state.favorites).toContain(targetId);

    store.addRecentlyUsed(targetId);
    state = useTemplateStore.getState();
    expect(state.recentlyUsed).toContain(targetId);
  });

  it('should validate and import a template JSON string successfully', () => {
    const store = useTemplateStore.getState();
    const validJson = JSON.stringify({
      id: 'comm-imported-test',
      version: '1.0',
      name: 'Imported Web Portfolio',
      category: 'frontend',
      sections: ['header'],
      theme: 'gradient',
      config: { header: { enabled: true } },
      metadata: {
        description: 'Fully customized template',
        author: 'imported_coder',
        difficulty: 'Intermediate',
        tags: ['import', 'react'],
        technologies: ['react'],
      }
    });

    const res = store.importTemplate(validJson);
    expect(res.success).toBe(true);

    const state = useTemplateStore.getState();
    const imported = state.templates.find(t => t.id === 'comm-imported-test');
    expect(imported).toBeDefined();
    expect(imported?.author).toBe('imported_coder');
  });

  it('should reject importing when required fields are missing', () => {
    const store = useTemplateStore.getState();
    const missingName = JSON.stringify({ category: 'ai', config: {} });
    const res = store.importTemplate(missingName);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Invalid Schema');
  });

  it('should return an error for malformed JSON', () => {
    const store = useTemplateStore.getState();
    const res = store.importTemplate('{ this is not json }');
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});
