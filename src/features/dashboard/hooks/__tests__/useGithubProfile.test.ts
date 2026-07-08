import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGithubProfile } from '../../hooks/useGithubProfile';
import useReadmeStore from '@/stores/readme-store';
import useWorkspaceStore from '@/stores/workspace-store';

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockProfile = {
  login: 'octocat',
  name: 'The Octocat',
  company: '@github',
  bio: 'A misterious cat.',
  location: 'San Francisco, CA',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  html_url: 'https://github.com/octocat',
  followers: 9000,
  following: 9,
  public_repos: 8,
  blog: 'https://github.blog',
  twitter_username: 'github',
};

const mockRepos = [
  {
    id: 1, name: 'linguist', full_name: 'octocat/linguist',
    description: 'Language Savant', html_url: 'https://github.com/octocat/linguist',
    language: 'Ruby', stargazers_count: 50, forks_count: 10, fork: false,
    topics: ['ruby', 'github'], updated_at: '2024-01-01T00:00:00Z', pushed_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2, name: 'Hello-World', full_name: 'octocat/Hello-World',
    description: 'My first repository!', html_url: 'https://github.com/octocat/Hello-World',
    language: 'Python', stargazers_count: 1800, forks_count: 300, fork: false,
    topics: ['python'], updated_at: '2024-02-01T00:00:00Z', pushed_at: '2024-02-01T00:00:00Z',
  },
];

const mockFetchGithubProfile = vi.fn().mockResolvedValue(mockProfile);
const mockFetchGithubRepos = vi.fn().mockResolvedValue(mockRepos);
const mockAnalyzeRepositories = vi.fn().mockReturnValue({
  languages: [{ name: 'Python', count: 1 }],
  topStarred: [],
  topActive: [],
  suggestedSkills: ['Python', 'Ruby'],
  suggestedTechStack: ['Python'],
  suggestedReadmeSections: [],
  totalStars: 1850,
  totalForks: 310,
});

vi.mock('@/utils/github-api', () => ({
  fetchGithubProfile: (...args: unknown[]) => mockFetchGithubProfile(...args),
  fetchGithubRepos: (...args: unknown[]) => mockFetchGithubRepos(...args),
}));

vi.mock('@/utils/repo-analyzer', () => ({
  analyzeRepositories: (...args: unknown[]) => mockAnalyzeRepositories(...args),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeOptions(overrides: Partial<{ username: string | null; setLoading: (v: boolean) => void; setError: (v: string | null) => void }> = {}) {
  return {
    username: 'octocat',
    setLoading: vi.fn(),
    setError: vi.fn(),
    ...overrides,
  };
}

describe('useGithubProfile', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
    useWorkspaceStore.setState({ workspaces: [], activeWorkspaceId: null });
    vi.clearAllMocks();
  });

  it('does not fire the effect when username is null', () => {
    const opts = makeOptions({ username: null });
    renderHook(() => useGithubProfile(opts));
    expect(mockFetchGithubProfile).not.toHaveBeenCalled();
  });

  it('calls setLoading(true) then setLoading(false) on success', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(opts.setLoading).toHaveBeenCalledWith(false);
    });

    expect(opts.setLoading).toHaveBeenNthCalledWith(1, true);
    expect(opts.setLoading).toHaveBeenLastCalledWith(false);
  });

  it('sets name from profile.name', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useReadmeStore.getState().name).toBe('The Octocat');
    });
  });

  it('uses profile.login when profile.name is absent', async () => {
    mockFetchGithubProfile.mockResolvedValueOnce({ ...mockProfile, name: null });
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useReadmeStore.getState().name).toBe('octocat');
    });
  });

  it('infers role from company with @ prefix', async () => {
    // mockProfile.company is '@github'
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useReadmeStore.getState().role).toBe('Developer at github');
    });
  });

  it('infers role from company without @ prefix', async () => {
    mockFetchGithubProfile.mockResolvedValueOnce({ ...mockProfile, company: 'Acme Corp' });
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useReadmeStore.getState().role).toBe('Developer at Acme Corp');
    });
  });

  it('defaults role to "Software Developer" when company is absent', async () => {
    mockFetchGithubProfile.mockResolvedValueOnce({ ...mockProfile, company: null });
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useReadmeStore.getState().role).toBe('Software Developer');
    });
  });

  it('sets about from bio and location', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      const about = useReadmeStore.getState().about;
      expect(about).toContain('A misterious cat.');
      expect(about).toContain('San Francisco, CA');
    });
  });

  it('sets avatarUrl, followers, following, publicRepos', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      const state = useReadmeStore.getState();
      expect(state.avatarUrl).toBe(mockProfile.avatar_url);
      expect(state.followers).toBe(9000);
      expect(state.following).toBe(9);
      expect(state.publicRepos).toBe(8);
    });
  });

  it('calls analyzeRepositories and sets repoAnalysis', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(mockAnalyzeRepositories).toHaveBeenCalledWith(mockRepos);
      expect(useReadmeStore.getState().repoAnalysis).not.toBeNull();
    });
  });

  it('formats project list from top non-fork repos', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      const projects = useReadmeStore.getState().projects;
      expect(projects).toContain('Hello-World');
      expect(projects).toContain('⭐ 1800');
    });
  });

  it('builds socials list with blog and twitter when available', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      const socials = useReadmeStore.getState().socials;
      expect(socials).toContain('octocat');
      expect(socials).toContain('github.blog');
      expect(socials).toContain('github');
    });
  });

  it('calls setError with message on API failure', async () => {
    mockFetchGithubProfile.mockRejectedValueOnce(new Error('GitHub rate limit exceeded'));
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(opts.setError).toHaveBeenCalledWith('GitHub rate limit exceeded');
    });

    expect(opts.setLoading).toHaveBeenLastCalledWith(false);
  });

  it('sets generic error message when error has no message', async () => {
    mockFetchGithubProfile.mockRejectedValueOnce('unknown error');
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(opts.setError).toHaveBeenCalledWith('Failed to import GitHub data.');
    });
  });

  it('creates a workspace if none exists', async () => {
    const opts = makeOptions();
    renderHook(() => useGithubProfile(opts));

    await waitFor(() => {
      expect(useWorkspaceStore.getState().workspaces.length).toBeGreaterThan(0);
    });
  });
});
