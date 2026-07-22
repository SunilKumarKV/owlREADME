import { describe, it, expect } from 'vitest';
import { validateTemplateSchema } from '../template-validator';

describe('validateTemplateSchema', () => {
  it('should validate a valid schema with no errors', () => {
    const validJson = {
      version: '1.0',
      name: 'Modern Developer Profile',
      sections: ['header', 'about', 'custom-1'],
      config: {
        header: { enabled: true, name: 'Alice' },
        about: { enabled: true, text: 'Hello' },
        customMarkdown: { 'custom-1': { markdown: 'Custom stuff' } },
      },
      metadata: {
        description: 'A great profile',
        category: 'Developer',
        difficulty: 'Beginner',
        tags: ['Minimal', 'Modern'],
      },
    };

    const res = validateTemplateSchema(validJson);
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
    expect(res.warnings).toHaveLength(0);
  });

  it('should detect missing root properties', () => {
    const invalidJson = {};
    const res = validateTemplateSchema(invalidJson);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('Missing required root property: "version".');
    expect(res.errors).toContain('Missing required root property: "name".');
    expect(res.errors).toContain('Missing required root property: "sections".');
    expect(res.errors).toContain('Missing required root property: "config".');
  });

  it('should detect duplicate IDs in sections', () => {
    const duplicateJson = {
      version: '1.0',
      name: 'Dup Template',
      sections: ['header', 'header'],
      config: {
        header: { enabled: true },
      },
    };
    const res = validateTemplateSchema(duplicateJson);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('Duplicate section ID found in sections array: "header".');
  });

  it('should detect broken section configurations', () => {
    const brokenJson = {
      version: '1.0',
      name: 'Broken Config',
      sections: ['header', 'about'],
      config: {
        header: { enabled: true },
      },
    };
    const res = validateTemplateSchema(brokenJson);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('Broken section: "about" is declared in sections but its config block "about" is missing.');
  });

  it('should produce warnings for missing metadata', () => {
    const warningsJson = {
      version: '1.0',
      name: 'No Meta Profile',
      sections: ['header'],
      config: {
        header: { enabled: true },
      },
    };
    const res = validateTemplateSchema(warningsJson);
    expect(res.valid).toBe(true); // Warnings don't make it invalid
    expect(res.warnings).toContain('Metadata block is missing. Default values will be applied.');
  });
});
