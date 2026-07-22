/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { StateCreator } from 'zustand';
import { READMEState } from '../readme-store';
import {
  GitHubStatsConfig,
  TechStackConfig,
  SocialLinksConfig,
  AchievementsConfig,
  HeaderConfig,
  SectionOrderConfig,
  SupportConfig,
  QuotesConfig,
  CustomMarkdownConfig,
  CustomMarkdownBlock,
  StandaloneVisitorConfig,
  AnimatedComponentsConfig,
  FeaturedProjectsConfig,
  SectionId,
  AnimatedComponentItem,
  DEFAULT_GITHUB_STATS,
  DEFAULT_TECH_STACK,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_HEADER,
  DEFAULT_SECTIONS,
  DEFAULT_SUPPORT,
  DEFAULT_QUOTES,
  DEFAULT_CUSTOM_MARKDOWN,
  DEFAULT_STANDALONE_VISITOR,
  DEFAULT_FEATURED_PROJECTS,
  DEFAULT_ANIMATED_COMPONENTS,
  PRESETS,
  createDefaultReadmeData,
} from '../readme-store-types';

export interface SectionsSlice {
  githubStats: GitHubStatsConfig;
  techStack: TechStackConfig;
  socialLinks: SocialLinksConfig;
  achievements: AchievementsConfig;
  header: HeaderConfig;
  sections: SectionOrderConfig;
  support: SupportConfig;
  quotes: QuotesConfig;
  customMarkdown: CustomMarkdownConfig;
  standaloneVisitor: StandaloneVisitorConfig;
  featuredProjects: FeaturedProjectsConfig;
  animatedComponents: AnimatedComponentsConfig;

  setGithubStats: (config: Partial<GitHubStatsConfig>) => void;
  setTechStack: (config: Partial<TechStackConfig>) => void;
  setSocialLinks: (config: Partial<SocialLinksConfig>) => void;
  setAchievements: (config: Partial<AchievementsConfig>) => void;
  setHeader: (config: Partial<HeaderConfig>) => void;
  setSections: (config: Partial<SectionOrderConfig>) => void;
  setSupport: (config: Partial<SupportConfig>) => void;
  setQuotes: (config: Partial<QuotesConfig>) => void;
  setCustomMarkdown: (config: Partial<CustomMarkdownConfig>) => void;
  setStandaloneVisitor: (config: Partial<StandaloneVisitorConfig>) => void;
  setFeaturedProjects: (config: Partial<FeaturedProjectsConfig>) => void;
  setAnimatedComponents: (config: Partial<AnimatedComponentsConfig>) => void;
  updateAnimatedComponentItem: (id: string, updates: Partial<AnimatedComponentItem>) => void;
  reorderAnimatedComponents: (items: AnimatedComponentItem[]) => void;
  applyPreset: (presetName: string) => void;
  applyTemplate: (template: any) => void;
  importReadmeData: (importedData: any, selectedSectionIds: (SectionId | string)[], mode?: 'replace' | 'merge') => void;
  addCustomMarkdownBlock: (title?: string, content?: string) => void;
  updateCustomMarkdownBlock: (id: string, updates: Partial<CustomMarkdownBlock>) => void;
  duplicateCustomMarkdownBlock: (id: string) => void;
  deleteCustomMarkdownBlock: (id: string) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
}

export const createSectionsSlice: StateCreator<
  READMEState,
  [],
  [],
  SectionsSlice
> = (set) => ({
  githubStats: { ...DEFAULT_GITHUB_STATS },
  techStack: { ...DEFAULT_TECH_STACK },
  socialLinks: { ...DEFAULT_SOCIAL_LINKS },
  achievements: { ...DEFAULT_ACHIEVEMENTS },
  header: { ...DEFAULT_HEADER },
  sections: { ...DEFAULT_SECTIONS },
  support: { ...DEFAULT_SUPPORT },
  quotes: { ...DEFAULT_QUOTES },
  customMarkdown: { ...DEFAULT_CUSTOM_MARKDOWN },
  standaloneVisitor: { ...DEFAULT_STANDALONE_VISITOR },
  featuredProjects: { ...DEFAULT_FEATURED_PROJECTS },
  animatedComponents: { ...DEFAULT_ANIMATED_COMPONENTS },

  setGithubStats: (config) =>
    set((state) => ({
      githubStats: {
        ...state.githubStats,
        ...config,
      },
    }) as Partial<READMEState>),

  setTechStack: (config) =>
    set((state) => ({
      techStack: {
        ...state.techStack,
        ...config,
      },
    }) as Partial<READMEState>),

  setSocialLinks: (config) =>
    set((state) => ({
      socialLinks: {
        ...state.socialLinks,
        ...config,
      },
    }) as Partial<READMEState>),

  setAchievements: (config) =>
    set((state) => ({
      achievements: {
        ...state.achievements,
        ...config,
      },
    }) as Partial<READMEState>),

  setHeader: (config) =>
    set((state) => ({
      header: {
        ...state.header,
        ...config,
      },
    }) as Partial<READMEState>),

  setSections: (config) =>
    set((state) => ({
      sections: {
        ...state.sections,
        ...config,
        order: config.order ? Array.from(new Set(config.order)) : state.sections.order,
      },
    }) as Partial<READMEState>),

  setSupport: (config) =>
    set((state) => ({
      support: {
        ...state.support,
        ...config,
      },
    }) as Partial<READMEState>),

  setQuotes: (config) =>
    set((state) => ({
      quotes: {
        ...state.quotes,
        ...config,
      },
    }) as Partial<READMEState>),

  setCustomMarkdown: (config) =>
    set((state) => ({
      customMarkdown: {
        ...state.customMarkdown,
        ...config,
      },
    }) as Partial<READMEState>),

  setStandaloneVisitor: (config) =>
    set((state) => ({
      standaloneVisitor: {
        ...state.standaloneVisitor,
        ...config,
      },
    }) as Partial<READMEState>),

  setFeaturedProjects: (config) =>
    set((state) => ({
      featuredProjects: {
        ...state.featuredProjects,
        ...config,
      },
    }) as Partial<READMEState>),

  setAnimatedComponents: (config) =>
    set((state) => ({
      animatedComponents: {
        ...state.animatedComponents,
        ...config,
      },
    }) as Partial<READMEState>),

  updateAnimatedComponentItem: (id, updates) =>
    set((state) => ({
      animatedComponents: {
        ...state.animatedComponents,
        components: state.animatedComponents.components.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updates,
                config: {
                  ...item.config,
                  ...(updates.config || {}),
                },
              }
            : item
        ),
      },
    }) as Partial<READMEState>),

  reorderAnimatedComponents: (items) =>
    set((state) => ({
      animatedComponents: {
        ...state.animatedComponents,
        components: items,
      },
    }) as Partial<READMEState>),

  applyPreset: (presetName) =>
    set((state) => {
      const activeIds = PRESETS[presetName] || PRESETS.minimal;
      const updatedSections: Record<string, any> = { ...state.sections.sections };

      Object.keys(updatedSections).forEach((key) => {
        updatedSections[key] = {
          ...updatedSections[key],
          enabled: activeIds.includes(key as any),
        };
      });

      const newOrder = Array.from(new Set([
        ...activeIds,
        ...state.sections.order.filter((id) => !activeIds.includes(id as any)),
      ]));

      return {
        sections: {
          sections: updatedSections,
          order: newOrder,
        },
      } as Partial<READMEState>;
    }),

  applyTemplate: (template) =>
    set((state) => {
      const activeIds = template.sections || ['header', 'about', 'socials'];
      const updatedSections = { ...state.sections.sections };

      Object.keys(updatedSections).forEach((key) => {
        const sectionId = key as SectionId;
        updatedSections[sectionId] = {
          ...updatedSections[sectionId],
          enabled: activeIds.includes(sectionId),
        };
      });

      const newOrder = Array.from(new Set([
        ...activeIds,
        ...state.sections.order.filter((id) => !activeIds.includes(id)),
      ]));

      return {
        sections: {
          sections: updatedSections,
          order: newOrder,
        },
        name: template.config.header.name || state.name,
        role: template.config.header.title || state.role,
        about: template.config.header.intro || state.about,
        header: {
          ...state.header,
          ...template.config.header,
          enabled: template.config.header.enabled,
        },
        githubStats: {
          ...state.githubStats,
          ...template.config.githubStats,
          enabled: template.config.githubStats.enabled,
        },
        techStack: {
          ...state.techStack,
          ...template.config.techStack,
          enabled: template.config.techStack.enabled,
        },
        socialLinks: {
          ...state.socialLinks,
          ...template.config.socialLinks,
          enabled: template.config.socialLinks.enabled,
        },
        achievements: {
          ...state.achievements,
          ...template.config.achievements,
          enabled: template.config.achievements.enabled,
        },
        quotes: {
          ...state.quotes,
          ...template.config.quotes,
          enabled: template.config.quotes?.enabled || false,
        },
        customMarkdown: template.config.customMarkdown ? {
          ...state.customMarkdown,
          ...template.config.customMarkdown,
        } : state.customMarkdown,
        support: template.config.support ? {
          ...state.support,
          ...template.config.support,
        } : state.support,
        standaloneVisitor: template.config.standaloneVisitor ? {
          ...state.standaloneVisitor,
          ...template.config.standaloneVisitor,
        } : state.standaloneVisitor,
        featuredProjects: template.config.featuredProjects ? {
          ...state.featuredProjects,
          ...template.config.featuredProjects,
        } : state.featuredProjects,
        animatedComponents: template.config.animatedComponents ? {
          ...state.animatedComponents,
          ...template.config.animatedComponents,
        } : state.animatedComponents,
      } as Partial<READMEState>;
    }),

  importReadmeData: (importedData, selectedSectionIds, mode = 'replace') =>
    set((state) => {
      const activeIds = Array.from(new Set(selectedSectionIds));

      if (mode === 'replace') {
        const defaultData = createDefaultReadmeData();
        const updatedSections: Record<string, any> = { ...defaultData.sections.sections };

        activeIds.forEach((id) => {
          if ((id.startsWith('custom_') || id.startsWith('custom-')) && !updatedSections[id]) {
            const block = importedData.customMarkdown?.blocks?.find((b: any) => b.id === id);
            const title = block ? block.title : 'Custom Markdown Section';
            updatedSections[id] = { id: id as any, name: title, enabled: true, collapsed: false };
          }
        });

        Object.keys(updatedSections).forEach((key) => {
          updatedSections[key] = {
            ...updatedSections[key],
            enabled: activeIds.includes(key),
          };
        });

        const newOrder = Array.from(new Set([
          ...activeIds,
          ...defaultData.sections.order.filter((id) => !activeIds.includes(id)),
        ]));

        const importedBlocks = importedData.customMarkdown?.blocks || [];

        const updates: any = {
          name: activeIds.includes('header') ? (importedData.name || importedData.header?.name || '') : defaultData.name,
          role: activeIds.includes('header') ? (importedData.role || importedData.header?.title || '') : defaultData.role,
          about: (activeIds.includes('header') || activeIds.includes('about')) ? (importedData.about || importedData.header?.intro || '') : defaultData.about,
          skills: activeIds.includes('about') ? (importedData.skills || '') : defaultData.skills,
          header: activeIds.includes('header') ? {
            ...DEFAULT_HEADER,
            name: importedData.name || importedData.header?.name || '',
            title: importedData.role || importedData.header?.title || '',
            intro: importedData.about || importedData.header?.intro || '',
            ...importedData.header,
            enabled: true,
          } : { ...DEFAULT_HEADER, enabled: false },
          socialLinks: activeIds.includes('socials') ? { ...DEFAULT_SOCIAL_LINKS, ...importedData.socialLinks, enabled: true } : { ...DEFAULT_SOCIAL_LINKS, enabled: false },
          techStack: activeIds.includes('techStack') ? { ...DEFAULT_TECH_STACK, ...importedData.techStack, enabled: true } : { ...DEFAULT_TECH_STACK, enabled: false },
          githubStats: activeIds.includes('stats') ? { ...DEFAULT_GITHUB_STATS, ...importedData.githubStats, enabled: true } : { ...DEFAULT_GITHUB_STATS, enabled: false },
          achievements: activeIds.includes('achievements') ? { ...DEFAULT_ACHIEVEMENTS, ...importedData.achievements, enabled: true } : { ...DEFAULT_ACHIEVEMENTS, enabled: false },
          featuredProjects: activeIds.includes('projects') ? { ...DEFAULT_FEATURED_PROJECTS, ...importedData.featuredProjects, enabled: true } : { ...DEFAULT_FEATURED_PROJECTS, enabled: false },
          standaloneVisitor: activeIds.includes('visitor') ? { ...DEFAULT_STANDALONE_VISITOR, ...importedData.standaloneVisitor, enabled: true } : { ...DEFAULT_STANDALONE_VISITOR, enabled: false },
          support: activeIds.includes('support') ? { ...DEFAULT_SUPPORT, ...importedData.support, enabled: true } : { ...DEFAULT_SUPPORT, enabled: false },
          quotes: activeIds.includes('quotes') ? { ...DEFAULT_QUOTES, ...importedData.quotes, enabled: true } : { ...DEFAULT_QUOTES, enabled: false },
          animatedComponents: activeIds.includes('animatedComponents') ? { ...DEFAULT_ANIMATED_COMPONENTS, ...importedData.animatedComponents, enabled: true } : { ...DEFAULT_ANIMATED_COMPONENTS, enabled: false },
          customMarkdown: {
            ...DEFAULT_CUSTOM_MARKDOWN,
            ...(importedData.customMarkdown || {}),
            blocks: importedBlocks,
            enabled: importedBlocks.length > 0 || activeIds.includes('custom'),
          },
          sections: {
            sections: updatedSections,
            order: newOrder,
          },
        };

        importedBlocks.forEach((block: any) => {
          updates[block.id] = { enabled: block.enabled, content: block.content };
        });

        return updates as Partial<READMEState>;
      } else {
        // MERGE MODE
        const updatedSections: Record<string, any> = { ...state.sections.sections };

        activeIds.forEach((id) => {
          if ((id.startsWith('custom_') || id.startsWith('custom-')) && !updatedSections[id]) {
            const block = importedData.customMarkdown?.blocks?.find((b: any) => b.id === id);
            const title = block ? block.title : 'Custom Section';
            updatedSections[id] = { id: id as any, name: title, enabled: true, collapsed: false };
          }
        });

        activeIds.forEach((id) => {
          if (updatedSections[id]) {
            updatedSections[id] = { ...updatedSections[id], enabled: true };
          }
        });

        const newOrder = Array.from(new Set([
          ...activeIds,
          ...state.sections.order,
        ]));

        const updates: any = {
          sections: {
            sections: updatedSections,
            order: newOrder,
          },
        };

        if (activeIds.includes('header')) {
          updates.name = importedData.name || state.name;
          updates.role = importedData.role || state.role;
          updates.about = importedData.about || state.about;
          updates.header = {
            ...state.header,
            ...importedData.header,
            enabled: true,
          };
        }

        if (activeIds.includes('about')) {
          updates.about = importedData.about || state.about;
          updates.skills = importedData.skills || state.skills;
        }

        if (activeIds.includes('socials')) {
          const mergedPlatforms = { ...state.socialLinks.platforms };
          if (importedData.socialLinks?.platforms) {
            Object.keys(importedData.socialLinks.platforms).forEach((key) => {
              mergedPlatforms[key] = {
                enabled: true,
                value: importedData.socialLinks.platforms[key].value,
              };
            });
          }
          updates.socialLinks = {
            ...state.socialLinks,
            ...importedData.socialLinks,
            platforms: mergedPlatforms,
            enabled: true,
          };
        }

        if (activeIds.includes('techStack')) {
          const existingTech = state.techStack.selectedIds || [];
          const incomingTech = importedData.techStack?.selectedIds || [];
          const mergedTech = Array.from(new Set([...existingTech, ...incomingTech]));
          updates.techStack = {
            ...state.techStack,
            ...importedData.techStack,
            selectedIds: mergedTech,
            enabled: true,
          };
        }

        if (activeIds.includes('stats')) {
          updates.githubStats = {
            ...state.githubStats,
            ...importedData.githubStats,
            enabled: true,
          };
        }

        if (activeIds.includes('achievements')) {
          updates.achievements = {
            ...state.achievements,
            ...importedData.achievements,
            enabled: true,
          };
        }

        if (activeIds.includes('projects')) {
          const existingProjects = state.featuredProjects?.projects || [];
          const incomingProjects = importedData.featuredProjects?.projects || [];
          const mergedProjects = [...existingProjects];
          incomingProjects.forEach((p: any) => {
            if (!mergedProjects.some((ep) => ep.repoName === p.repoName)) {
              mergedProjects.push(p);
            }
          });
          updates.featuredProjects = {
            ...state.featuredProjects,
            ...importedData.featuredProjects,
            projects: mergedProjects,
            enabled: true,
          };
        }

        if (activeIds.includes('visitor')) {
          updates.standaloneVisitor = {
            ...state.standaloneVisitor,
            ...importedData.standaloneVisitor,
            enabled: true,
          };
        }

        if (activeIds.includes('support')) {
          updates.support = {
            ...state.support,
            ...importedData.support,
            enabled: true,
          };
        }

        if (activeIds.includes('quotes')) {
          updates.quotes = {
            ...state.quotes,
            ...importedData.quotes,
            enabled: true,
          };
        }

        if (activeIds.includes('custom') || activeIds.some((id) => id.startsWith('custom_') || id.startsWith('custom-'))) {
          const existingBlocks = state.customMarkdown?.blocks || [];
          const incomingBlocks = importedData.customMarkdown?.blocks || [];
          const mergedBlocks = [...existingBlocks];
          incomingBlocks.forEach((ib: any) => {
            if (!mergedBlocks.some((eb) => eb.id === ib.id)) {
              mergedBlocks.push(ib);
            }
          });
          updates.customMarkdown = {
            ...state.customMarkdown,
            ...importedData.customMarkdown,
            blocks: mergedBlocks,
            enabled: true,
          };

          incomingBlocks.forEach((block: any) => {
            updates[block.id] = { enabled: block.enabled, content: block.content };
          });
        }

        if (activeIds.includes('animatedComponents')) {
          updates.animatedComponents = {
            ...state.animatedComponents,
            ...importedData.animatedComponents,
            enabled: true,
          };
        }

        return updates as Partial<READMEState>;
      }
    }),

  addCustomMarkdownBlock: (title, content) =>
    set((state) => {
      const newId = `custom_${Math.random().toString(36).substr(2, 9)}`;
      const newBlock: CustomMarkdownBlock = {
        id: newId,
        title: title || 'Custom Markdown Section',
        content: content || '',
        enabled: true,
        collapsed: false,
      };

      const updatedBlocks = [...(state.customMarkdown?.blocks || []), newBlock];
      const updatedSections = {
        ...state.sections.sections,
        [newId]: { id: newId as any, name: newBlock.title, enabled: true, collapsed: false },
      };
      const updatedOrder = Array.from(new Set([...state.sections.order, newId]));

      const updates: any = {
        customMarkdown: {
          ...state.customMarkdown,
          blocks: updatedBlocks,
        },
        sections: {
          ...state.sections,
          sections: updatedSections,
          order: updatedOrder,
        },
      };
      // Inject to state
      updates[newId] = { enabled: true, content: newBlock.content };

      return updates as Partial<READMEState>;
    }),

  updateCustomMarkdownBlock: (id, updates) =>
    set((state) => {
      const blocks = state.customMarkdown?.blocks || [];
      const updatedBlocks = blocks.map((b) => (b.id === id ? { ...b, ...updates } : b));

      const updatedSections: Record<string, any> = { ...state.sections.sections };
      if (updates.title && updatedSections[id]) {
        updatedSections[id] = {
          ...updatedSections[id],
          name: updates.title,
        };
      }
      if (updates.enabled !== undefined && updatedSections[id]) {
        updatedSections[id] = {
          ...updatedSections[id],
          enabled: updates.enabled,
        };
      }
      if (updates.collapsed !== undefined && updatedSections[id]) {
        updatedSections[id] = {
          ...updatedSections[id],
          collapsed: updates.collapsed,
        };
      }

      const storeUpdates: any = {
        customMarkdown: {
          ...state.customMarkdown,
          blocks: updatedBlocks,
        },
        sections: {
          ...state.sections,
          sections: updatedSections,
        },
      };

      if (updates.content !== undefined) {
        storeUpdates[id] = { enabled: updates.enabled !== undefined ? updates.enabled : true, content: updates.content };
      }

      return storeUpdates as Partial<READMEState>;
    }),

  duplicateCustomMarkdownBlock: (id) =>
    set((state) => {
      const block = state.customMarkdown?.blocks?.find((b) => b.id === id);
      if (!block) return {};

      const newId = `custom_${Math.random().toString(36).substr(2, 9)}`;
      const newBlock: CustomMarkdownBlock = {
        ...block,
        id: newId,
        title: `${block.title} (Copy)`,
      };

      const updatedBlocks = [...(state.customMarkdown?.blocks || [])];
      const index = updatedBlocks.findIndex((b) => b.id === id);
      if (index !== -1) {
        updatedBlocks.splice(index + 1, 0, newBlock);
      } else {
        updatedBlocks.push(newBlock);
      }

      const updatedSections = {
        ...state.sections.sections,
        [newId]: { id: newId as any, name: newBlock.title, enabled: true, collapsed: false },
      };

      const updatedOrder = [...state.sections.order];
      const orderIndex = updatedOrder.indexOf(id);
      if (orderIndex !== -1) {
        updatedOrder.splice(orderIndex + 1, 0, newId);
      } else {
        updatedOrder.push(newId);
      }

      const updates: any = {
        customMarkdown: {
          ...state.customMarkdown,
          blocks: updatedBlocks,
        },
        sections: {
          ...state.sections,
          sections: updatedSections,
          order: Array.from(new Set(updatedOrder)),
        },
      };
      updates[newId] = { enabled: true, content: newBlock.content };

      return updates as Partial<READMEState>;
    }),

  deleteCustomMarkdownBlock: (id) =>
    set((state) => {
      const updatedBlocks = (state.customMarkdown?.blocks || []).filter((b) => b.id !== id);
      const updatedSections: Record<string, any> = { ...state.sections.sections };
      delete updatedSections[id];
      const updatedOrder = state.sections.order.filter((sId) => sId !== id);

      const updates: any = {
        customMarkdown: {
          ...state.customMarkdown,
          blocks: updatedBlocks,
        },
        sections: {
          ...state.sections,
          sections: updatedSections,
          order: updatedOrder,
        },
      };
      // delete dynamic block state
      delete updates[id];

      return updates as Partial<READMEState>;
    }),

  moveSection: (id, direction) =>
    set((state) => {
      const order = Array.from(new Set(state.sections.order));
      const index = order.indexOf(id);
      if (index === -1) return {};

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= order.length) return {};

      // Swap elements
      order[index] = order[targetIndex];
      order[targetIndex] = id;

      return {
        sections: {
          ...state.sections,
          order,
        },
      } as Partial<READMEState>;
    }),
});
