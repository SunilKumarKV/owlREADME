/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { AIProvider, AIResponse } from '../types';
import { DynamicLocalAIService } from '@/utils/ai/ai-service';

export class MockProvider implements AIProvider {
  id = 'mock';
  name = 'Local Rule Mock Synth';
  private localService = new DynamicLocalAIService();

  /**
   * Generates mock structured outputs corresponding to prompt action requests.
   */
  async generate(prompt: string, options?: any): Promise<AIResponse> {
    const action = options?.action;
    const payload = options?.payload || {};

    let text = '';
    if (action === 'readme') {
      const result = await this.localService.generateReadmeSuggestions(payload.profileData, payload.repoData);
      text = JSON.stringify(result);
    } else if (action === 'roadmap') {
      const result = await this.localService.generateRoadmapSuggestions(payload.roadmapTitle, payload.currentSteps);
      text = JSON.stringify(result);
    } else if (action === 'profile') {
      const result = await this.localService.generateProfileSuggestions(payload.profileData, payload.repoData);
      text = JSON.stringify(result);
    } else if (action === 'improve') {
      const result = await this.localService.improveText(payload.text, payload.tone, payload.type);
      text = JSON.stringify(result);
    } else {
      // Default fallback JSON for unspecified prompts
      text = JSON.stringify({ message: 'Fallback dynamic simulation complete.', promptLength: prompt.length });
    }

    return {
      text,
      tokenUsage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
      providerId: this.id,
    };
  }

  /**
   * Mock provider is always healthy.
   */
  async healthCheck(): Promise<boolean> {
    return true;
  }
}
export default MockProvider;
