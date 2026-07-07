/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { AIProvider, AIResponse } from '../types';
import { apiClient } from '@/packages/api-client';

export class AnthropicProvider implements AIProvider {
  id = 'anthropic';
  name = 'Anthropic Claude';

  /**
   * Generates chat completion text from Anthropic Claude messages API.
   */
  async generate(prompt: string, options?: any): Promise<AIResponse> {
    const apiKey = process.env.ANTHROPIC_API_KEY || '';
    if (!apiKey) {
      throw new Error('Anthropic API Key is not configured on the server.');
    }

    const modelName = options?.model || 'claude-3-5-sonnet-20241022';

    const result = await apiClient.post<any>(
      'https://api.anthropic.com/v1/messages',
      {
        model: modelName,
        max_tokens: options?.maxTokens || 4096,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    if (!result.success) {
      throw new Error(`Anthropic API call failed: ${result.error.message}`);
    }

    const text = result.data.content?.[0]?.text || '';
    const usage = result.data.usage;
    const tokenUsage = usage ? {
      promptTokens: usage.input_tokens || 0,
      completionTokens: usage.output_tokens || 0,
      totalTokens: (usage.input_tokens || 0) + (usage.output_tokens || 0),
    } : undefined;

    return {
      text,
      tokenUsage,
      providerId: this.id,
    };
  }

  /**
   * Health check passes if the Anthropic API key is set.
   */
  async healthCheck(): Promise<boolean> {
    return !!process.env.ANTHROPIC_API_KEY;
  }
}
export default AnthropicProvider;
