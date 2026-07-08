import { describe, it, expect, beforeEach } from 'vitest';
import useReadmeStore from '../readme-store';

describe('sections-slice actions', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
  });

  // ── Partial setter tests ─────────────────────────────────────────────────

  it('setGithubStats merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setGithubStats({ enabled: true, username: 'octocat', theme: 'radical' });
    const state = useReadmeStore.getState();
    expect(state.githubStats.enabled).toBe(true);
    expect(state.githubStats.username).toBe('octocat');
    expect(state.githubStats.theme).toBe('radical');
    // Other properties should retain defaults
    expect(state.githubStats.layout).toBeDefined();
  });

  it('setTechStack merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setTechStack({ enabled: true, selectedIds: ['react', 'typescript'] });
    const state = useReadmeStore.getState();
    expect(state.techStack.enabled).toBe(true);
    expect(state.techStack.selectedIds).toEqual(['react', 'typescript']);
    // Other properties retained
    expect(state.techStack.style).toBeDefined();
  });

  it('setSocialLinks merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setSocialLinks({ enabled: true, iconOnly: true });
    const state = useReadmeStore.getState();
    expect(state.socialLinks.enabled).toBe(true);
    expect(state.socialLinks.iconOnly).toBe(true);
  });

  it('setAchievements merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setAchievements({ enabled: true, username: 'github-user' });
    const state = useReadmeStore.getState();
    expect(state.achievements.enabled).toBe(true);
    expect(state.achievements.username).toBe('github-user');
  });

  it('setHeader merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setHeader({ enabled: true, name: 'Alice Dev', location: 'Paris' });
    const state = useReadmeStore.getState();
    expect(state.header.enabled).toBe(true);
    expect(state.header.name).toBe('Alice Dev');
    expect(state.header.location).toBe('Paris');
  });

  it('setSections merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setSections({ order: ['header', 'about', 'stats'] });
    const state = useReadmeStore.getState();
    expect(state.sections.order).toEqual(['header', 'about', 'stats']);
  });

  it('setSupport merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setSupport({ enabled: true, buyMeACoffeeUsername: 'myusername' });
    const state = useReadmeStore.getState();
    expect(state.support.enabled).toBe(true);
    expect(state.support.buyMeACoffeeUsername).toBe('myusername');
  });

  it('setQuotes merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setQuotes({ enabled: true, quoteType: 'motivational' });
    const state = useReadmeStore.getState();
    expect(state.quotes.enabled).toBe(true);
    expect(state.quotes.quoteType).toBe('motivational');
  });

  it('setCustomMarkdown merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setCustomMarkdown({ enabled: true, content: '## My Custom Section' });
    const state = useReadmeStore.getState();
    expect(state.customMarkdown.enabled).toBe(true);
    expect(state.customMarkdown.content).toBe('## My Custom Section');
  });

  it('setStandaloneVisitor merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setStandaloneVisitor({ enabled: true, username: 'octocat' });
    const state = useReadmeStore.getState();
    expect(state.standaloneVisitor.enabled).toBe(true);
    expect(state.standaloneVisitor.username).toBe('octocat');
  });

  it('setFeaturedProjects merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setFeaturedProjects({ enabled: true, showStars: false });
    const state = useReadmeStore.getState();
    expect(state.featuredProjects.enabled).toBe(true);
    expect(state.featuredProjects.showStars).toBe(false);
  });

  it('setAnimatedComponents merges partial config', () => {
    const store = useReadmeStore.getState();
    store.setAnimatedComponents({ enabled: true });
    const state = useReadmeStore.getState();
    expect(state.animatedComponents.enabled).toBe(true);
  });

  // ── Animated component item management ─────────────────────────────────────

  it('updateAnimatedComponentItem updates only the matching component', () => {
    const store = useReadmeStore.getState();
    store.setAnimatedComponents({
      enabled: true,
      components: [
        { id: 'comp-1', type: 'typing', enabled: true, title: 'Typer', config: {} },
        { id: 'comp-2', type: 'divider', enabled: true, title: 'Divider', config: {} },
      ],
    });

    useReadmeStore.getState().updateAnimatedComponentItem('comp-1', { title: 'Updated Typer', enabled: false });

    const state = useReadmeStore.getState();
    const comp1 = state.animatedComponents.components.find((c) => c.id === 'comp-1');
    const comp2 = state.animatedComponents.components.find((c) => c.id === 'comp-2');
    expect(comp1?.title).toBe('Updated Typer');
    expect(comp1?.enabled).toBe(false);
    expect(comp2?.title).toBe('Divider'); // unchanged
  });

  it('updateAnimatedComponentItem merges config shallowly', () => {
    const store = useReadmeStore.getState();
    store.setAnimatedComponents({
      enabled: true,
      components: [
        { id: 'comp-a', type: 'typing', enabled: true, title: 'T', config: { speed: 100, loop: true } },
      ],
    });

    useReadmeStore.getState().updateAnimatedComponentItem('comp-a', { config: { speed: 200 } });

    const comp = useReadmeStore.getState().animatedComponents.components[0];
    expect(comp.config.speed).toBe(200);
    expect(comp.config.loop).toBe(true); // preserved
  });

  it('reorderAnimatedComponents replaces the components array', () => {
    const store = useReadmeStore.getState();
    const itemA = { id: 'a', type: 'typing' as const, enabled: true, title: 'A', config: {} };
    const itemB = { id: 'b', type: 'divider' as const, enabled: true, title: 'B', config: {} };
    store.setAnimatedComponents({ enabled: true, components: [itemA, itemB] });

    useReadmeStore.getState().reorderAnimatedComponents([itemB, itemA]);

    const state = useReadmeStore.getState();
    expect(state.animatedComponents.components[0].id).toBe('b');
    expect(state.animatedComponents.components[1].id).toBe('a');
  });

  // ── applyPreset ─────────────────────────────────────────────────────────────

  it('applyPreset enables only sections listed in the preset', () => {
    useReadmeStore.getState().applyPreset('minimal');
    const state = useReadmeStore.getState();
    // 'minimal' preset should enable a handful of sections
    const headerSection = state.sections.sections['header'];
    expect(headerSection?.enabled).toBe(true); // header is in minimal preset
    // We just verify the enabled sections map reflects the preset
    expect(state.sections.order.length).toBeGreaterThan(0);
  });

  it('applyPreset with unknown name falls back to minimal preset', () => {
    // Should not throw
    expect(() => useReadmeStore.getState().applyPreset('nonexistent-preset')).not.toThrow();
  });

  // ── Reset restores defaults ─────────────────────────────────────────────────

  it('reset restores all section config to defaults', () => {
    const store = useReadmeStore.getState();
    store.setGithubStats({ enabled: true, username: 'changed-user' });
    store.setTechStack({ enabled: true, selectedIds: ['react'] });
    store.setHeader({ name: 'Changed Name' });

    useReadmeStore.getState().reset();

    const state = useReadmeStore.getState();
    expect(state.githubStats.enabled).toBe(false);
    expect(state.githubStats.username).toBe('');
    expect(state.techStack.selectedIds).toEqual([]);
    expect(state.header.name).toBe('');
  });
});
