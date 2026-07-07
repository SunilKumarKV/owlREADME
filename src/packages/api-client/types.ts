/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */

export interface RequestConfig extends Omit<RequestInit, 'signal'> {
  timeout?: number; // timeout duration in ms
  useCache?: boolean; // look up / store responses in cache
  cacheTtl?: number; // cache TTL duration in ms
  retry?: number; // max retry attempts
  retryDelay?: number; // initial retry delay in ms
  validator?: (data: any) => boolean; // custom validation check
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export interface ApiError {
  code: string; // 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'VALIDATION_ERROR' | 'HTTP_ERROR_XXX' | 'UNKNOWN_ERROR'
  message: string;
  status?: number;
  data?: any; // Rich error response payload
  originalError?: any;
}
