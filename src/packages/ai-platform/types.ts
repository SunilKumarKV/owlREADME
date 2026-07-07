/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */

export interface AIResponse {
  text: string;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs?: number;
  providerId: string;
}

export interface AIProvider {
  id: string;
  name: string;
  generate(prompt: string, options?: any): Promise<AIResponse>;
  healthCheck(): Promise<boolean>;
}

export interface ProviderMetrics {
  providerId: string;
  latencyMs: number;
  success: boolean;
  retryCount: number;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  timestamp: string;
}
