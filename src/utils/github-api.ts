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
  const encoded = encodeURIComponent(username.trim());
  const res = await fetch(`https://api.github.com/users/${encoded}`);
  if (!res.ok) {
    const err = await handleApiError(
      res,
      `Could not load GitHub profile for "${username}". Please try again.`
    );
    throw err;
  }
  return res.json() as Promise<GitHubProfile>;
}

/**
 * Fetches repositories from the public GitHub API.
 * Validates the username before making any network request.
 * Fetches up to 100 most-recently-updated repos.
 */
export async function fetchGithubRepos(username: string): Promise<GitHubRepo[]> {
  validateGithubUsername(username);
  const encoded = encodeURIComponent(username.trim());
  const res = await fetch(
    `https://api.github.com/users/${encoded}/repos?sort=updated&per_page=100`
  );
  if (!res.ok) {
    const err = await handleApiError(res, 'Failed to fetch GitHub repositories. Please try again.');
    throw err;
  }
  return res.json() as Promise<GitHubRepo[]>;
}
