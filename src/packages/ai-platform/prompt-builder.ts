/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */

export const PromptTemplates = {
  readme: {
    version: '1.1.0',
    template: 'Analyze this profile: {{profileData}} and repo stats: {{repoData}}. Write developer README suggestions. Output strictly a JSON object with keys: introduction, aboutMe, skills, projects. Do not include markdown wraps or backticks outside of the JSON syntax itself.',
  },
  roadmap: {
    version: '1.1.0',
    template: 'Based on roadmap title "{{roadmapTitle}}" and current items: {{currentSteps}}, suggest learning roadmap improvements. Return strictly a JSON object matching keys: nextTopics (array of strings), technologies (array of strings), roadmapSteps (array of strings). Do not include markdown wraps or backticks outside of the JSON syntax itself.',
  },
  profile: {
    version: '1.1.0',
    template: 'Analyze this profile: {{profileData}} and repo stats: {{repoData}}. Write profile optimization advice. Return strictly a JSON object matching keys: improvedBio, portfolioDescription, githubImprovements (array of strings). Do not include markdown wraps or backticks outside of the JSON syntax itself.',
  },
  improve: {
    version: '1.1.0',
    template: 'Rewrite the following text: "{{text}}". Make it fit the tone "{{tone}}". It belongs to the "{{type}}" section of a developer GitHub profile README. Output strictly a JSON object with a single key "alternatives" which is an array of 3 distinct, high-quality rephrased alternatives. Do not include markdown wraps or backticks outside of the JSON syntax itself.',
  },
};

export class PromptBuilder {
  /**
   * Compiles prompt templates by replacing placeholders with structured variables.
   */
  static build(templateId: keyof typeof PromptTemplates, variables: Record<string, any>): string {
    const templateConfig = PromptTemplates[templateId];
    if (!templateConfig) {
      throw new Error(`Template ${templateId} not found`);
    }

    let prompt = templateConfig.template;
    Object.entries(variables).forEach(([key, value]) => {
      const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
      prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), valStr);
    });

    return prompt;
  }
}
