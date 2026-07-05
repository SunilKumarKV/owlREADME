/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  READMEStyleTemplate,
  GitHubStatsConfig,
  TechStackConfig,
  SocialLinksConfig,
  AchievementsConfig,
  HeaderConfig,
  SectionOrderConfig,
  SupportConfig,
  QuotesConfig,
  CustomMarkdownConfig,
  StandaloneVisitorConfig,
  AnimatedComponentsConfig,
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
  DEFAULT_ANIMATED_COMPONENTS,
  DEFAULT_FEATURED_PROJECTS,
  PRESETS,
  ExportHistoryItem,
  RepoAnalysisResult,
  AISuggestions,
  AnimatedComponentItem,
  READMEField,
  SectionId,
  FeaturedProjectsConfig
} from './readme-store-types';

export * from './readme-store-types';


interface READMEState {
  name: string;
  role: string;
  about: string;
  skills: string;
  projects: string;
  socials: string;
  avatarUrl: string;
  followers: number | undefined;
  following: number | undefined;
  publicRepos: number | undefined;
  template: READMEStyleTemplate;
  readmeExportsCount: number;
  templatesUsedCount: number;
  exportHistory: ExportHistoryItem[];
  repoAnalysis: RepoAnalysisResult | null;
  aiSuggestions: AISuggestions | null;
  aiGenerationsCount: number;
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
  setField: (field: READMEField, value: any) => void;
  setName: (value: string) => void;
  setRole: (value: string) => void;
  setAbout: (value: string) => void;
  setSkills: (value: string) => void;
  setProjects: (value: string) => void;
  setSocials: (value: string) => void;
  setAvatarUrl: (value: string) => void;
  setFollowers: (value: number | undefined) => void;
  setFollowing: (value: number | undefined) => void;
  setPublicRepos: (value: number | undefined) => void;
  setTemplate: (value: READMEStyleTemplate) => void;
  setAnimatedComponents: (config: Partial<AnimatedComponentsConfig>) => void;
  updateAnimatedComponentItem: (id: string, updates: Partial<AnimatedComponentItem>) => void;
  reorderAnimatedComponents: (items: AnimatedComponentItem[]) => void;
  incrementReadmeExports: () => void;
  incrementTemplatesUsed: () => void;
  incrementAiGenerations: () => void;
  addExportHistoryItem: (format: string, projectName: string) => void;
  setRepoAnalysis: (analysis: RepoAnalysisResult | null) => void;
  setAiSuggestions: (suggestions: AISuggestions | null) => void;
  setGithubStats: (stats: Partial<GitHubStatsConfig>) => void;
  setTechStack: (stack: Partial<TechStackConfig>) => void;
  setSocialLinks: (links: Partial<SocialLinksConfig>) => void;
  setAchievements: (achievements: Partial<AchievementsConfig>) => void;
  setHeader: (header: Partial<HeaderConfig>) => void;
  setSections: (sections: Partial<SectionOrderConfig>) => void;
  setSupport: (support: Partial<SupportConfig>) => void;
  setQuotes: (quotes: Partial<QuotesConfig>) => void;
  setCustomMarkdown: (custom: Partial<CustomMarkdownConfig>) => void;
  setStandaloneVisitor: (visitor: Partial<StandaloneVisitorConfig>) => void;
  setFeaturedProjects: (projects: Partial<FeaturedProjectsConfig>) => void;
  applyPreset: (presetName: string) => void;
  applyTemplate: (template: any) => void;
  importReadmeData: (importedData: any, selectedSectionIds: SectionId[]) => void;
  reset: () => void;
}

const useREADMEStore = create<READMEState>()(
  persist(
    (set) => ({
      name: '',
      role: '',
      about: '',
      skills: '',
      projects: '',
      socials: '',
      avatarUrl: '',
      followers: undefined,
      following: undefined,
      publicRepos: undefined,
      template: 'minimal',
      readmeExportsCount: 0,
      templatesUsedCount: 0,
      exportHistory: [],
      repoAnalysis: null,
      aiSuggestions: null,
      aiGenerationsCount: 0,
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
      setField: (field, value) => set({ [field]: value } as Partial<READMEState>),
      setName: (value) => set({ name: value }),
      setRole: (value) => set({ role: value }),
      setAbout: (value) => set({ about: value }),
      setSkills: (value) => set({ skills: value }),
      setProjects: (value) => set({ projects: value }),
      setSocials: (value) => set({ socials: value }),
      setAvatarUrl: (value) => set({ avatarUrl: value }),
      setFollowers: (value) => set({ followers: value }),
      setFollowing: (value) => set({ following: value }),
      setPublicRepos: (value) => set({ publicRepos: value }),
      setTemplate: (value) => {
        set((state) => ({
          template: value,
          templatesUsedCount: state.templatesUsedCount + 1,
        }));
      },
      incrementReadmeExports: () => set((state) => ({ readmeExportsCount: state.readmeExportsCount + 1 })),
      incrementTemplatesUsed: () => set((state) => ({ templatesUsedCount: state.templatesUsedCount + 1 })),
      incrementAiGenerations: () => set((state) => ({ aiGenerationsCount: state.aiGenerationsCount + 1 })),
      addExportHistoryItem: (format, projectName) =>
        set((state) => ({
          exportHistory: [
            {
              id: Math.random().toString(36).substring(2, 9),
              timestamp: new Date().toISOString(),
              format,
              projectName: projectName || 'Untitled Project',
            },
            ...(state.exportHistory || []),
          ].slice(0, 50),
        })),
      setRepoAnalysis: (analysis) => set({ repoAnalysis: analysis }),
      setAiSuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
      setGithubStats: (stats) =>
        set((state) => ({
          githubStats: {
            ...state.githubStats,
            ...stats,
          },
        })),
      setTechStack: (stack) =>
        set((state) => ({
          techStack: {
            ...state.techStack,
            ...stack,
          },
        })),
      setSocialLinks: (links) =>
        set((state) => ({
          socialLinks: {
            ...state.socialLinks,
            ...links,
          },
        })),
      setAchievements: (achievements) =>
        set((state) => ({
          achievements: {
            ...state.achievements,
            ...achievements,
          },
        })),
      setHeader: (header) =>
        set((state) => ({
          header: {
            ...state.header,
            ...header,
          },
        })),
      setSections: (sections) =>
        set((state) => ({
          sections: {
            ...state.sections,
            ...sections,
          },
        })),
      setSupport: (support) =>
        set((state) => ({
          support: {
            ...state.support,
            ...support,
          },
        })),
      setQuotes: (quotes) =>
        set((state) => ({
          quotes: {
            ...state.quotes,
            ...quotes,
          },
        })),
      setCustomMarkdown: (custom) =>
        set((state) => ({
          customMarkdown: {
            ...state.customMarkdown,
            ...custom,
          },
        })),
      setStandaloneVisitor: (visitor) =>
        set((state) => ({
          standaloneVisitor: {
            ...state.standaloneVisitor,
            ...visitor,
          },
        })),
      setFeaturedProjects: (projects) =>
        set((state) => ({
          featuredProjects: {
            ...state.featuredProjects,
            ...projects,
          },
        })),
      setAnimatedComponents: (config) =>
        set((state) => ({
          animatedComponents: {
            ...state.animatedComponents,
            ...config,
          },
        })),
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
        })),
      reorderAnimatedComponents: (items) =>
        set((state) => ({
          animatedComponents: {
            ...state.animatedComponents,
            components: items,
          },
        })),
      applyPreset: (presetName) =>
        set((state) => {
          const activeIds = PRESETS[presetName] || PRESETS.minimal;
          const updatedSections = { ...state.sections.sections };

          Object.keys(updatedSections).forEach((key) => {
            const sectionId = key as SectionId;
            updatedSections[sectionId] = {
              ...updatedSections[sectionId],
              enabled: activeIds.includes(sectionId),
            };
          });

          // Order active ids first, then inactive ones
          const newOrder = [
            ...activeIds,
            ...state.sections.order.filter((id) => !activeIds.includes(id)),
          ];

          return {
            sections: {
              sections: updatedSections,
              order: newOrder,
            },
          };
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

          const newOrder = [
            ...activeIds,
            ...state.sections.order.filter((id) => !activeIds.includes(id)),
          ];

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
          };
        }),
      importReadmeData: (importedData, selectedSectionIds) =>
        set((state) => {
          const updatedSections = { ...state.sections.sections };
          const activeIds = [...selectedSectionIds];

          // Enable/disable sections based on selection
          Object.keys(updatedSections).forEach((key) => {
            const sectionId = key as SectionId;
            updatedSections[sectionId] = {
              ...updatedSections[sectionId],
              enabled: activeIds.includes(sectionId),
            };
          });

          // Order selected ones first
          const newOrder = [
            ...activeIds,
            ...state.sections.order.filter((id) => !activeIds.includes(id)),
          ];

          const updates: any = {
            sections: {
              sections: updatedSections,
              order: newOrder,
            },
          };

          if (selectedSectionIds.includes('header')) {
            updates.name = importedData.name || state.name;
            updates.role = importedData.role || state.role;
            updates.about = importedData.about || state.about;
            updates.header = {
              ...state.header,
              ...importedData.header,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('about')) {
            updates.about = importedData.about || state.about;
          }

          if (selectedSectionIds.includes('socials')) {
            // Convert imported platforms format { enabled: true, value: '' } to matches
            const mergedPlatforms = { ...state.socialLinks.platforms };
            Object.keys(importedData.socialLinks.platforms).forEach((key) => {
              mergedPlatforms[key] = {
                enabled: true,
                value: importedData.socialLinks.platforms[key].value,
              };
            });
            updates.socialLinks = {
              ...state.socialLinks,
              ...importedData.socialLinks,
              platforms: mergedPlatforms,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('techStack')) {
            updates.techStack = {
              ...state.techStack,
              ...importedData.techStack,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('stats')) {
            updates.githubStats = {
              ...state.githubStats,
              ...importedData.githubStats,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('achievements')) {
            updates.achievements = {
              ...state.achievements,
              ...importedData.achievements,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('quotes')) {
            updates.quotes = {
              ...state.quotes,
              ...importedData.quotes,
              enabled: true,
            };
          }

          if (selectedSectionIds.includes('custom')) {
            updates.customMarkdown = {
              ...state.customMarkdown,
              ...importedData.customMarkdown,
              enabled: true,
            };
          }

          return updates;
        }),
      reset: () =>
        set({
          name: '',
          role: '',
          about: '',
          skills: '',
          projects: '',
          socials: '',
          avatarUrl: '',
          followers: undefined,
          following: undefined,
          publicRepos: undefined,
          template: 'minimal',
          readmeExportsCount: 0,
          templatesUsedCount: 0,
          exportHistory: [],
          repoAnalysis: null,
          aiSuggestions: null,
          aiGenerationsCount: 0,
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
        }),
    }),
    { name: 'readme-store' }
  )
);

export default useREADMEStore;