/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { AIProvider, AIResponse } from '../types';
import { apiClient } from '@/packages/api-client';

export class OpenAIProvider implements AIProvider {
  id = 'openai';
  name = 'OpenAI Chat';

  /**
   * Generates chat completion text from OpenAI API.
   */
  async generate(prompt: string, options?: any): Promise<AIResponse> {
    const apiKey = process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
      throw new Error('OpenAI API Key is not configured on the server.');
    }

    const modelName = options?.model || 'gpt-4o-mini';
    const responseFormat = options?.jsonMode !== false ? { type: 'json_object' } : undefined;

    const result = await apiClient.post<any>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: modelName,
        messages: [{ role: 'user', content: prompt }],
        response_format: responseFormat,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!result.success) {
      throw new Error(`OpenAI API call failed: ${result.error.message}`);
    }

    const text = result.data.choices?.[0]?.message?.content || '';
    const usage = result.data.usage;
    const tokenUsage = usage ? {
      promptTokens: usage.prompt_tokens || 0,
      completionTokens: usage.completion_tokens || 0,
      totalTokens: usage.total_tokens || 0,
    } : undefined;

    return {
      text,
      tokenUsage,
      providerId: this.id,
    };
  }

  /**
   * Health check passes if the OpenAI api key is set.
   */
  async healthCheck(): Promise<boolean> {
    return !!process.env.OPENAI_API_KEY;
  }
}
export default OpenAIProvider;
