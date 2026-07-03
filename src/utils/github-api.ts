/**
 * Valid GitHub username pattern.
 * Rules: 1–39 characters, alphanumeric or hyphens only,
 * cannot start or end with a hyphen, no consecutive hyphens.
 * Source: https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-user-account-settings/changing-your-github-username
 */
const GITHUB_USERNAME_RE = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$|^[a-zA-Z0-9]$/;

/**
 * Validates a GitHub username string.
 * Throws a user-friendly Error if the username is invalid.
 */
export function validateGithubUsername(username: string): void {
  if (!username || typeof username !== 'string') {
    throw new Error('Please enter a GitHub username.');
  }

  const trimmed = username.trim();

  if (trimmed.length === 0) {
    throw new Error('Please enter a GitHub username.');
  }

  if (trimmed.length > 39) {
    throw new Error(
      `GitHub usernames can be at most 39 characters. "${trimmed}" is ${trimmed.length} characters.`
    );
  }

  if (!/^[a-zA-Z0-9-]+$/.test(trimmed)) {
    throw new Error(
      `Invalid GitHub username "${trimmed}". Usernames can only contain letters, numbers, and hyphens.`
    );
  }

  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    throw new Error(
      `Invalid GitHub username "${trimmed}". Usernames cannot start or end with a hyphen.`
    );
  }

  if (/--/.test(trimmed)) {
    throw new Error(
      `Invalid GitHub username "${trimmed}". Usernames cannot contain consecutive hyphens.`
    );
  }
}

interface GitHubCacheEntry<T> {
  value: T;
  expiresAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const githubProfileCache = new Map<string, GitHubCacheEntry<GitHubProfile>>();
const githubReposCache = new Map<string, GitHubCacheEntry<GitHubRepo[]>>();
const githubReadmeCache = new Map<string, GitHubCacheEntry<string>>();

function normalizeGithubKey(value: string): string {
  return value.trim().toLowerCase();
}

function getCachedValue<T>(cache: Map<string, GitHubCacheEntry<T>>, key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }
  return entry.value;
}

function setCachedValue<T>(cache: Map<string, GitHubCacheEntry<T>>, key: string, value: T) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function createCacheKey(prefix: string, value: string) {
  return `${prefix}:${normalizeGithubKey(value)}`;
}

function validateGithubRepoName(repo: string): void {
  if (!repo || typeof repo !== 'string') {
    throw new Error('Invalid GitHub repository name. Please provide a valid repository name.');
  }

  const cleaned = repo.trim().replace(/\.git$/, '');

  if (cleaned.length === 0) {
    throw new Error('Invalid GitHub repository name. Please provide a valid repository name.');
  }

  if (!/^[A-Za-z0-9_.-]+$/.test(cleaned)) {
    throw new Error(
      `Invalid repository name "${repo}". Repository names can only contain letters, numbers, hyphens, underscores, and periods.`
    );
  }
}

export function parseGithubRepositoryUrl(url: string): { owner: string; repo: string } {
  if (!url || typeof url !== 'string') {
    throw new Error('Please enter a valid GitHub repository URL.');
  }

  const trimmed = url.trim();
  const match = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/.*)?$/i);
  if (!match) {
    throw new Error('Invalid GitHub repository URL format. Expected https://github.com/owner/repo');
  }

  const owner = match[1].trim();
  const repo = match[2].replace(/\.git$/, '').trim();

  validateGithubUsername(owner);
  validateGithubRepoName(repo);

  return { owner, repo };
}

export async function fetchGithubReadmeByRepo(owner: string, repo: string): Promise<string> {
  validateGithubUsername(owner);
  validateGithubRepoName(repo);

  const cacheKey = `readme:${normalizeGithubKey(owner)}/${normalizeGithubKey(repo)}`;
  const cached = getCachedValue(githubReadmeCache, cacheKey);
  if (cached) return cached;

  const tryRawUrl = async (branch: 'main' | 'master') => {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.text();
    }
    return null;
  };

  const mainReadme = await tryRawUrl('main');
  if (mainReadme !== null) {
    setCachedValue(githubReadmeCache, cacheKey, mainReadme);
    return mainReadme;
  }

  const masterReadme = await tryRawUrl('master');
  if (masterReadme !== null) {
    setCachedValue(githubReadmeCache, cacheKey, masterReadme);
    return masterReadme;
  }

  const apiRes = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/README.md`, {
    headers: { Accept: 'application/vnd.github.v3.raw' },
  });

  if (!apiRes.ok) {
    if (apiRes.status === 404) {
      throw new Error(
        `Could not find README.md in repository "${owner}/${repo}". Please verify the repository name and try again.`
      );
    }
    throw await handleApiError(apiRes, `Failed to fetch README from repository "${owner}/${repo}".`);
  }

  const readmeText = await apiRes.text();
  setCachedValue(githubReadmeCache, cacheKey, readmeText);
  return readmeText;
}

export async function fetchGithubReadmeFromRawUrl(rawUrl: string): Promise<string> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new Error('Please enter a valid raw URL.');
  }

  const trimmed = rawUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error('Please enter a valid raw URL starting with https:// or http://.');
  }

  const res = await fetch(trimmed);
  if (!res.ok) {
    throw new Error('Failed to fetch content from the specified URL. Please check the URL and try again.');
  }

  return res.text();
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count?: number;
  fork: boolean;
  language?: string | null;
  topics?: string[];
  updated_at?: string;
  pushed_at?: string;
}

/**
 * Helper to generate descriptive error messages based on response status and rate limits.
 */
async function handleApiError(res: Response, defaultMsg: string): Promise<Error> {
  if (res.status === 404) {
    return new Error('GitHub user not found. Please check the username and try again.');
  }

  const rateLimitRemaining = res.headers.get('x-ratelimit-remaining');
  const rateLimitReset = res.headers.get('x-ratelimit-reset');

  if (res.status === 403 && rateLimitRemaining === '0' && rateLimitReset) {
    try {
      const resetEpoch = Number(rateLimitReset) * 1000;
      const waitMinutes = Math.max(1, Math.ceil((resetEpoch - Date.now()) / 60000));
      return new Error(
        `GitHub API rate limit reached. Please try again in ${waitMinutes} minute${waitMinutes === 1 ? '' : 's'}.`
      );
    } catch (e) {
      return new Error('GitHub API rate limit reached. Please try again in about an hour.');
    }
  }

  try {
    const errorBody = await res.json();
    if (errorBody?.message) {
      return new Error(`GitHub API error: ${errorBody.message}`);
    }
  } catch (e) {
    // Body not parseable — fall through to default
  }

  return new Error(defaultMsg);
}

/**
 * Fetches a user profile from the public GitHub API.
 * Validates the username before making any network request.
 */
export async function fetchGithubProfile(username: string): Promise<GitHubProfile> {
  validateGithubUsername(username);
  const cacheKey = createCacheKey('profile', username);
  const cached = getCachedValue(githubProfileCache, cacheKey);
  if (cached) return cached;

  const encoded = encodeURIComponent(username.trim());
  const res = await fetch(`https://api.github.com/users/${encoded}`);
  if (!res.ok) {
    const err = await handleApiError(
      res,
      `Could not load GitHub profile for "${username}". Please try again.`
    );
    throw err;
  }

  const profile = (await res.json()) as GitHubProfile;
  setCachedValue(githubProfileCache, cacheKey, profile);
  return profile;
}

/**
 * Fetches repositories from the public GitHub API.
 * Validates the username before making any network request.
 * Fetches up to 100 most-recently-updated repos.
 */
export async function fetchGithubRepos(username: string): Promise<GitHubRepo[]> {
  validateGithubUsername(username);
  const cacheKey = createCacheKey('repos', username);
  const cached = getCachedValue(githubReposCache, cacheKey);
  if (cached) return cached;

  const encoded = encodeURIComponent(username.trim());
  const res = await fetch(
    `https://api.github.com/users/${encoded}/repos?sort=updated&per_page=100`
  );
  if (!res.ok) {
    const err = await handleApiError(res, 'Failed to fetch GitHub repositories. Please try again.');
    throw err;
  }

  const repos = (await res.json()) as GitHubRepo[];
  setCachedValue(githubReposCache, cacheKey, repos);
  return repos;
}
