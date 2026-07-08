import { describe, it, expect, beforeEach } from 'vitest';
import { useTemplateStore } from '../template-store';

describe('useTemplateStore state management', () => {
  beforeEach(() => {
    // Reset state before each test if necessary
    // Re-initialize with standard state
  });

  it('should initialize with default seed templates', () => {
    const state = useTemplateStore.getState();
    expect(state.templates.length).toBeGreaterThanOrEqual(3);
    const aiTemplate = state.templates.find(t => t.id === 'comm-ai-engineer');
    expect(aiTemplate).toBeDefined();
    expect(aiTemplate?.author).toBe('alt_brain_42');
  });

  it('should allow publishing a new community template', () => {
    const store = useTemplateStore.getState();
    store.publishTemplate({
      name: 'Custom User Template',
      description: 'A test custom template',
      author: 'dev_user',
      category: 'modern',
      tags: ['test', 'react'],
      sections: ['header', 'about'],
      theme: 'dark',
      config: { header: { name: 'Dr. Evelyn Carter' } },
    });

    const state = useTemplateStore.getState();
    const published = state.templates.find(t => t.author === 'dev_user');
    expect(published).toBeDefined();
    expect(published?.name).toBe('Custom User Template');
    expect(published?.isCustom).toBe(true);
    expect(published?.likes).toBe(0);
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
      name: 'Imported Web Portfolio',
      description: 'Fully customized template',
      author: 'imported_coder',
      category: 'frontend',
      tags: ['import', 'react'],
      sections: ['header'],
      theme: 'gradient',
      config: { header: { name: 'Alice' } }
    });

    const res = store.importTemplate(validJson);
    expect(res.success).toBe(true);

    const state = useTemplateStore.getState();
    const imported = state.templates.find(t => t.id === 'comm-imported-test');
    expect(imported).toBeDefined();
    expect(imported?.author).toBe('imported_coder');
  });

  it('should reject importing invalid template categories or schema', () => {
    const store = useTemplateStore.getState();
    const invalidJson = JSON.stringify({
      name: 'Invalid Template',
      category: 'non-existent-category',
      config: {}
    });

    const res = store.importTemplate(invalidJson);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Invalid category');
  });

  it('should reject importing when required fields are missing', () => {
    const store = useTemplateStore.getState();
    const missingName = JSON.stringify({ category: 'ai', config: {} });
    const res = store.importTemplate(missingName);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Invalid schema');
  });

  it('should return an error for malformed JSON', () => {
    const store = useTemplateStore.getState();
    const res = store.importTemplate('{ this is not json }');
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });

  it('should increment downloads on a template', () => {
    const store = useTemplateStore.getState();
    const targetId = 'comm-ai-engineer';
    const initialDownloads = store.templates.find((t) => t.id === targetId)?.downloads || 0;

    store.incrementDownloads(targetId);
    const updated = useTemplateStore.getState().templates.find((t) => t.id === targetId);
    expect(updated?.downloads).toBe(initialDownloads + 1);
  });

  it('should cap recentlyUsed list at 8 entries', () => {
    const store = useTemplateStore.getState();
    for (let i = 0; i < 10; i++) {
      store.addRecentlyUsed(`template-${i}`);
    }
    expect(useTemplateStore.getState().recentlyUsed.length).toBeLessThanOrEqual(8);
  });

  it('should not duplicate entries in recentlyUsed when adding same id', () => {
    const store = useTemplateStore.getState();
    store.addRecentlyUsed('comm-ai-engineer');
    store.addRecentlyUsed('comm-ai-engineer');
    const recents = useTemplateStore.getState().recentlyUsed;
    const count = recents.filter((id) => id === 'comm-ai-engineer').length;
    expect(count).toBe(1);
  });
});
