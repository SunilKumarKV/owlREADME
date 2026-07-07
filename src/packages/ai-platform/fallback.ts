/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { AIResponse, ProviderMetrics } from './types';
import { getProvider } from './registry';

const isDev = process.env.NODE_ENV === 'development';

const logMetrics = (metrics: ProviderMetrics): void => {
  if (isDev) {
    console.info('[AI PLATFORM METRICS]', JSON.stringify(metrics, null, 2));
  }
};

/**
 * Executes content generation across a chain of fallback providers with configured retries.
 */
export async function executeWithFallback(
  providers: string[],
  prompt: string,
  options?: any
): Promise<AIResponse> {
  let lastError: any = null;

  for (const providerId of providers) {
    const provider = getProvider(providerId);
    if (!provider) {
      continue;
    }

    // Verify provider configured health check status
    const isHealthy = await provider.healthCheck().catch(() => false);
    if (!isHealthy) {
      if (isDev) {
        console.warn(`[AI PLATFORM WARN] Provider ${providerId} failed health check. Skipping...`);
      }
      continue;
    }

    let attempt = 0;
    const maxRetries = options?.retry || 1; // default to 1 execution attempt
    while (attempt < maxRetries) {
      try {
        const start = Date.now();
        const response = await provider.generate(prompt, options);
        const latencyMs = Date.now() - start;

        const metrics: ProviderMetrics = {
          providerId,
          latencyMs,
          success: true,
          retryCount: attempt,
          tokenUsage: response.tokenUsage,
          timestamp: new Date().toISOString(),
        };
        logMetrics(metrics);

        return {
          ...response,
          latencyMs,
        };
      } catch (err: any) {
        attempt++;
        lastError = err;
        if (isDev) {
          console.warn(`[AI PLATFORM WARN] Provider ${providerId} failed attempt ${attempt}/${maxRetries}:`, err);
        }
      }
    }
  }

  // Record total pipeline failure metrics
  const failureMetrics: ProviderMetrics = {
    providerId: providers.join('->'),
    latencyMs: 0,
    success: false,
    retryCount: 0,
    timestamp: new Date().toISOString(),
  };
  logMetrics(failureMetrics);

  throw lastError || new Error('All registered AI providers in fallback chain failed to generate content.');
}
