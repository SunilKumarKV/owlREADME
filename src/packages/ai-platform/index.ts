/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { registerProvider } from './registry';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { OllamaProvider } from './providers/ollama';
import { MockProvider } from './providers/mock';
import { executeWithFallback } from './fallback';
import { aiCache } from './cache';
import { PromptBuilder, PromptTemplates } from './prompt-builder';

// Register standard provider adapters by default
registerProvider(new GeminiProvider());
registerProvider(new OpenAIProvider());
registerProvider(new AnthropicProvider());
registerProvider(new OllamaProvider());
registerProvider(new MockProvider());

export * from './types';
export * from './registry';
export * from './prompt-builder';
export * from './cache';
export * from './fallback';

export class AIPlatform {
  /**
   * Main entry point to compile prompts, retrieve cached hits, execute fallbacks, and validate outputs.
   */
  static async generate(
    templateId: keyof typeof PromptTemplates,
    variables: Record<string, any>,
    options?: {
      providers?: string[];
      retry?: number;
      useCache?: boolean;
      ttlMs?: number;
      model?: string;
    }
  ): Promise<any> {
    const prompt = PromptBuilder.build(templateId, variables);

    const useCache = options?.useCache !== false;
    if (useCache) {
      const cached = aiCache.get(prompt);
      if (cached) {
        try {
          return JSON.parse(cached.text.trim());
        } catch {
          // If cached value fails to parse, ignore and query providers
        }
      }
    }

    // Fallback chain priority: Gemini first, rule-based Mock synthesis second
    const chain = options?.providers || ['gemini', 'mock'];
    
    // Execute fallback runner
    const response = await executeWithFallback(chain, prompt, {
      ...options,
      action: templateId,
      payload: variables,
    });

    const textTrimmed = response.text.trim();
    let parsedResult: any;
    try {
      parsedResult = JSON.parse(textTrimmed);
    } catch {
      throw new Error(`AI Platform Validation Error: Structured response is not valid JSON. Raw output: ${textTrimmed}`);
    }

    if (useCache) {
      aiCache.set(prompt, response, options?.ttlMs);
    }

    return parsedResult;
  }
}
