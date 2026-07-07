/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { getAuthHeaders } from '../auth';
import { apiClient } from '../../api-client';

const GITHUB_REST_API_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_API_URL = 'https://api.github.com/graphql';

/**
 * Calls the GitHub REST API using the unified ApiClient infrastructure.
 */
export async function callGithubApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_REST_API_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string>),
  };

  const result = await apiClient.request<T>(url, {
    ...options,
    headers,
    timeout: 10000,
  });

  if (!result.success) {
    const error = result.error;
    if (error.code === 'TIMEOUT_ERROR') {
      throw new Error('GitHub API request timed out after 10 seconds. Please check your network connection and try again.');
    }
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error: Failed to connect to GitHub. Please check your internet connection.');
    }
    throw new Error(error.message);
  }

  return result.data;
}

/**
 * Calls the GitHub GraphQL API using the unified ApiClient infrastructure.
 */
export async function callGithubGraphQL<T>(query: string, variables: any = {}): Promise<T> {
  const headers = {
    ...getAuthHeaders(),
    'Content-Type': 'application/json',
  };

  const result = await apiClient.post<any>(GITHUB_GRAPHQL_API_URL, { query, variables }, {
    headers,
    timeout: 10000,
  });

  if (!result.success) {
    const error = result.error;
    if (error.code === 'TIMEOUT_ERROR') {
      throw new Error('GitHub API request timed out after 10 seconds. Please check your network connection and try again.');
    }
    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error: Failed to connect to GitHub. Please check your internet connection.');
    }
    throw new Error(error.message);
  }

  const resultData = result.data;
  if (resultData.errors) {
    throw new Error(`GitHub GraphQL error: ${resultData.errors.map((e: any) => e.message).join(', ')}`);
  }

  return resultData.data as T;
}
