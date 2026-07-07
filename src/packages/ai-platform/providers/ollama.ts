/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { AIProvider, AIResponse } from '../types';
import { apiClient } from '@/packages/api-client';

export class OllamaProvider implements AIProvider {
  id = 'ollama';
  name = 'Ollama Local';

  /**
   * Generates chat completion text from a local Ollama instance API.
   */
  async generate(prompt: string, options?: any): Promise<AIResponse> {
    const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
    const modelName = options?.model || 'llama3';
    const formatType = options?.jsonMode !== false ? 'json' : undefined;

    const result = await apiClient.post<any>(
      `${host}/api/chat`,
      {
        model: modelName,
        messages: [{ role: 'user', content: prompt }],
        stream: false,
        format: formatType,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!result.success) {
      throw new Error(`Ollama API call failed: ${result.error.message}`);
    }

    const text = result.data.message?.content || '';

    return {
      text,
      providerId: this.id,
    };
  }

  /**
   * Checks if the local Ollama endpoint is running and responding.
   */
  async healthCheck(): Promise<boolean> {
    const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
    const res = await apiClient.get<any>(`${host}/api/tags`, {
      timeout: 2000,
      retry: 0,
      useCache: false,
    });
    return res.success;
  }
}
export default OllamaProvider;
