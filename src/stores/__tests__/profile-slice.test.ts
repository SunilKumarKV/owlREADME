import { describe, it, expect, beforeEach } from 'vitest';
import useReadmeStore from '../readme-store';

describe('profile-slice actions', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
  });

  // ── Basic setters ──────────────────────────────────────────────────────────

  it('setName updates name field', () => {
    useReadmeStore.getState().setName('Alice');
    expect(useReadmeStore.getState().name).toBe('Alice');
  });

  it('setRole updates role field', () => {
    useReadmeStore.getState().setRole('Staff Engineer');
    expect(useReadmeStore.getState().role).toBe('Staff Engineer');
  });

  it('setAbout updates about field', () => {
    useReadmeStore.getState().setAbout('I build things.');
    expect(useReadmeStore.getState().about).toBe('I build things.');
  });

  it('setSkills updates skills field', () => {
    useReadmeStore.getState().setSkills('TypeScript, React, Node.js');
    expect(useReadmeStore.getState().skills).toBe('TypeScript, React, Node.js');
  });

  it('setProjects updates projects field', () => {
    useReadmeStore.getState().setProjects('- [MyApp](https://github.com/user/myapp)');
    expect(useReadmeStore.getState().projects).toBe('- [MyApp](https://github.com/user/myapp)');
  });

  it('setSocials updates socials field', () => {
    useReadmeStore.getState().setSocials('- GitHub: @alice');
    expect(useReadmeStore.getState().socials).toBe('- GitHub: @alice');
  });

  it('setAvatarUrl updates avatarUrl field', () => {
    useReadmeStore.getState().setAvatarUrl('https://avatars.githubusercontent.com/u/1234?v=4');
    expect(useReadmeStore.getState().avatarUrl).toBe('https://avatars.githubusercontent.com/u/1234?v=4');
  });

  it('setFollowers updates followers field', () => {
    useReadmeStore.getState().setFollowers(1024);
    expect(useReadmeStore.getState().followers).toBe(1024);
  });

  it('setFollowing updates following field', () => {
    useReadmeStore.getState().setFollowing(512);
    expect(useReadmeStore.getState().following).toBe(512);
  });

  it('setPublicRepos updates publicRepos field', () => {
    useReadmeStore.getState().setPublicRepos(42);
    expect(useReadmeStore.getState().publicRepos).toBe(42);
  });

  it('setFollowers / setFollowing / setPublicRepos accept undefined', () => {
    useReadmeStore.getState().setFollowers(100);
    useReadmeStore.getState().setFollowers(undefined);
    expect(useReadmeStore.getState().followers).toBeUndefined();

    useReadmeStore.getState().setFollowing(50);
    useReadmeStore.getState().setFollowing(undefined);
    expect(useReadmeStore.getState().following).toBeUndefined();

    useReadmeStore.getState().setPublicRepos(10);
    useReadmeStore.getState().setPublicRepos(undefined);
    expect(useReadmeStore.getState().publicRepos).toBeUndefined();
  });

  // ── Template + counter ─────────────────────────────────────────────────────

  it('setTemplate updates the template field', () => {
    useReadmeStore.getState().setTemplate('developer');
    expect(useReadmeStore.getState().template).toBe('developer');
  });

  it('setTemplate increments templatesUsedCount on each call', () => {
    const initialCount = useReadmeStore.getState().templatesUsedCount;
    useReadmeStore.getState().setTemplate('professional');
    expect(useReadmeStore.getState().templatesUsedCount).toBe(initialCount + 1);
    useReadmeStore.getState().setTemplate('open-source');
    expect(useReadmeStore.getState().templatesUsedCount).toBe(initialCount + 2);
  });

  it('setTemplate to the same value still increments the counter', () => {
    const initialCount = useReadmeStore.getState().templatesUsedCount;
    useReadmeStore.getState().setTemplate('minimal');
    useReadmeStore.getState().setTemplate('minimal');
    expect(useReadmeStore.getState().templatesUsedCount).toBe(initialCount + 2);
  });

  // ── Reset ──────────────────────────────────────────────────────────────────

  it('reset clears all profile fields to defaults', () => {
    const store = useReadmeStore.getState();
    store.setName('Bob');
    store.setRole('Architect');
    store.setAbout('About Bob');
    store.setSkills('Rust');
    store.setProjects('- myproject');
    store.setSocials('- GitHub');
    store.setAvatarUrl('https://example.com/avatar.png');
    store.setFollowers(200);
    store.setFollowing(100);
    store.setPublicRepos(30);
    store.setTemplate('portfolio');

    useReadmeStore.getState().reset();

    const state = useReadmeStore.getState();
    expect(state.name).toBe('');
    expect(state.role).toBe('');
    expect(state.about).toBe('');
    expect(state.skills).toBe('');
    expect(state.projects).toBe('');
    expect(state.socials).toBe('');
    expect(state.avatarUrl).toBe('');
    expect(state.followers).toBeUndefined();
    expect(state.following).toBeUndefined();
    expect(state.publicRepos).toBeUndefined();
    expect(state.template).toBe('minimal');
  });
});
