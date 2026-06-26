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
  fork: boolean;
}

/**
 * Fetches user profile from public GitHub API.
 */
export async function fetchGithubProfile(username: string): Promise<GitHubProfile> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`GitHub user "${username}" not found.`);
    }
    throw new Error('Failed to fetch GitHub profile. Rate limit exceeded or API error.');
  }
  return res.json();
}

/**
 * Fetches repositories from public GitHub API.
 */
export async function fetchGithubRepos(username: string): Promise<GitHubRepo[]> {
  // Fetch up to 100 repositories to find top ones
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  if (!res.ok) {
    throw new Error('Failed to fetch GitHub repositories.');
  }
  return res.json();
}
