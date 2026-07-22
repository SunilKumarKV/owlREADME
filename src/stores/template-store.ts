/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionId } from './readme-store';
import { validateTemplateSchema } from '@/utils/template-validator';

export type TemplateCategory =
  | 'Developer'
  | 'Frontend'
  | 'Backend'
  | 'Full Stack'
  | 'Mobile'
  | 'Game Development'
  | 'AI/ML'
  | 'Data Science'
  | 'DevOps'
  | 'Cloud'
  | 'Cyber Security'
  | 'Student'
  | 'Open Source'
  | 'Designer'
  | 'Freelancer'
  | 'Startup'
  | 'Company'
  | 'Creator'
  | 'Streamer'
  | 'YouTuber'
  | 'Educator'
  | 'minimal'
  | 'modern'
  | 'open-source'
  | 'full-stack'
  | 'frontend'
  | 'ai'
  | 'terminal'
  | 'gprm'
  | 'anime';

export interface CommunityTemplate {
  id: string;
  version: string;
  name: string;
  description: string;
  author: string;
  category: TemplateCategory;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  likes: number;
  downloads: number;
  sections: SectionId[];
  theme: 'minimal' | 'dark' | 'gradient' | 'terminal';
  config: any; // Serialized useREADMEStore properties
  createdAt: string;
  visibility: 'public' | 'private' | 'draft';
  isCustom?: boolean; // User created or imported
  isLiked?: boolean; // Locally liked status
  isFavorited?: boolean; // Locally favorited status
}

interface TemplateStore {
  templates: CommunityTemplate[];
  favorites: string[]; // List of template IDs
  recentlyUsed: string[]; // List of template IDs
  
  // CRUD Actions
  createTemplate: (name: string, category: TemplateCategory) => string;
  publishTemplate: (template: Omit<CommunityTemplate, 'id' | 'likes' | 'downloads' | 'createdAt' | 'isCustom' | 'version'>) => void;
  updateTemplate: (id: string, updates: Partial<Omit<CommunityTemplate, 'id' | 'likes' | 'downloads' | 'createdAt' | 'isCustom'>>) => void;
  duplicateTemplate: (id: string) => string;
  deleteTemplate: (id: string) => void;
  
  // Actions
  toggleLike: (id: string) => void;
  incrementDownloads: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addRecentlyUsed: (id: string) => void;
  importTemplate: (jsonContent: string) => { success: boolean; error?: string };
}

// ── Seed Templates Definitions ──────────────────────────────────────────────
const SEED_TEMPLATES: CommunityTemplate[] = [
  {
    id: 'comm-ai-engineer',
    version: '1.0',
    name: 'Neural Architect Profile',
    description: 'Designed for AI & ML engineers. Features animated typing vectors and model showcase stats.',
    author: 'alt_brain_42',
    category: 'ai',
    tags: ['ai', 'python', 'pytorch', 'llm'],
    difficulty: 'Advanced',
    technologies: ['python', 'pytorch', 'tensorflow'],
    likes: 142,
    downloads: 512,
    sections: ['header', 'about', 'techStack', 'stats', 'projects'],
    theme: 'dark',
    createdAt: '2026-06-25T12:00:00Z',
    visibility: 'public',
    config: {
      header: {
        enabled: true,
        name: 'Dr. Evelyn Carter',
        title: 'Principal AI Researcher',
        intro: 'Building large language models and cognitive agents at the intersection of reasoning and control.',
        pronouns: 'she/her',
        location: 'Boston, MA',
        alignment: 'center',
        bannerType: 'gradient',
        bannerTheme: 'tokyonight',
        bannerText: '✨ Neural Engineering Lab',
        typingEnabled: true,
        typingLines: ['PyTorch Architect', 'Agent Orchestration Expert', 'Generative AI Specialist'],
        typingSpeed: 120,
        typingDelay: 800,
        typingColor: 'a855f7',
        typingCenter: true,
        badges: { openToWork: true, freelance: false, learning: 'Quantum ML', building: 'Cognitive-OS v2' },
        visitorPlacement: 'hidden',
      },
      githubStats: { enabled: true, theme: 'tokyonight', hideBorder: false, showIcons: true, compactMode: true, layout: 'compact' },
      techStack: { enabled: true, style: 'flat-square', iconOnly: false, groupByCategory: true, selectedIds: ['python', 'pytorch', 'tensorflow', 'fastapi', 'docker', 'huggingface'] },
      socialLinks: { enabled: true, style: 'for-the-badge', iconOnly: true, platforms: { github: { enabled: true, value: 'evelyncarter' } } },
      achievements: {
        enabled: false,
        widgets: {
          trophy: { enabled: false, theme: 'tokyonight', noFrame: false, noBg: false },
          visitor: { enabled: false, color: 'purple', style: 'flat' },
          snake: { enabled: false },
          graph: { enabled: false, theme: 'tokyonight', hideBorder: false },
        },
      },
      quotes: { enabled: true, theme: 'tokyonight', quoteType: 'programming' },
    }
  },
  {
    id: 'comm-minimal-dev',
    version: '1.0',
    name: 'Clean Typer Profile',
    description: 'Clean typographic layout for backend engineers, systems architects, and CLI authors.',
    author: 'bash_champion',
    category: 'minimal',
    tags: ['minimalist', 'clean', 'simple'],
    difficulty: 'Beginner',
    technologies: ['go', 'rust', 'c'],
    likes: 89,
    downloads: 310,
    sections: ['header', 'about', 'techStack', 'socials'],
    theme: 'minimal',
    createdAt: '2026-06-20T14:30:00Z',
    visibility: 'public',
    config: {
      header: {
        enabled: true,
        name: 'John Doe',
        title: 'Systems Engineer',
        intro: 'Writing memory-safe code and container orchestrators.',
        pronouns: 'he/him',
        location: 'Seattle, WA',
        alignment: 'left',
        bannerType: 'none',
        typingEnabled: false,
      },
      techStack: { enabled: true, style: 'flat', iconOnly: false, selectedIds: ['rust', 'go', 'docker', 'linux'] },
      socialLinks: { enabled: true, style: 'flat', iconOnly: false, platforms: { github: { enabled: true, value: 'johndoe' } } },
    }
  },
  {
    id: 'comm-gprm-dash',
    version: '1.0',
    name: 'Modern Web Stack',
    description: 'Perfect for Next.js developers, Jamstack creators, and modern serverless architects.',
    author: 'next_wizard',
    category: 'gprm',
    tags: ['react', 'nextjs', 'vercel'],
    difficulty: 'Intermediate',
    technologies: ['react', 'nextjs', 'tailwind'],
    likes: 210,
    downloads: 875,
    sections: ['header', 'about', 'techStack', 'stats', 'projects', 'socials'],
    theme: 'gradient',
    createdAt: '2026-07-01T09:15:00Z',
    visibility: 'public',
    config: {
      header: {
        enabled: true,
        name: 'Sarah Connor',
        title: 'Full Stack React Engineer',
        intro: 'Building hyper-interactive web apps using Next.js 15, Tailwind CSS, and Server Actions.',
        pronouns: 'she/her',
        location: 'Los Angeles, CA',
        alignment: 'center',
        bannerType: 'capsule',
        bannerTheme: 'radical',
        bannerText: 'Full Stack React Wizard',
        typingEnabled: true,
        typingLines: ['Next.js Specialist', 'Tailwind Expert', 'React Native Developer'],
        typingSpeed: 100,
        typingDelay: 1000,
        typingColor: 'f43f5e',
      },
      techStack: { enabled: true, style: 'for-the-badge', iconOnly: false, selectedIds: ['typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'supabase'] },
      githubStats: { enabled: true, theme: 'radical', hideBorder: false, showIcons: true },
      socialLinks: { enabled: true, style: 'for-the-badge', platforms: { github: { enabled: true, value: 'sarahconnor' } } },
    }
  }
];

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      templates: SEED_TEMPLATES,
      favorites: [],
      recentlyUsed: [],

      createTemplate: (name, category) => {
        const id = `comm-${Math.random().toString(36).substring(2, 9)}`;
        const newTemplate: CommunityTemplate = {
          id,
          version: '1.0',
          name,
          description: 'A custom README template.',
          author: 'Me',
          category,
          tags: [category.toLowerCase()],
          difficulty: 'Beginner',
          technologies: [],
          likes: 0,
          downloads: 0,
          sections: ['header', 'about', 'techStack', 'socials'],
          theme: 'minimal',
          createdAt: new Date().toISOString(),
          visibility: 'private',
          config: {
            header: { enabled: true, name: 'My Profile', title: 'Developer', intro: 'Short bio here...' },
            techStack: { enabled: true, selectedIds: [] },
            socialLinks: { enabled: true, platforms: {} },
          },
          isCustom: true,
        };

        set((state) => ({
          templates: [newTemplate, ...state.templates],
        }));

        return id;
      },

      publishTemplate: (tpl) => {
        const newTemplate: CommunityTemplate = {
          ...tpl,
          id: `comm-${Math.random().toString(36).substring(2, 9)}`,
          version: '1.0',
          likes: 0,
          downloads: 0,
          createdAt: new Date().toISOString(),
          isCustom: true,
        };
        set((state) => ({
          templates: [newTemplate, ...state.templates],
        }));
      },

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((tpl) =>
            tpl.id === id ? { ...tpl, ...updates } : tpl
          ),
        }));
      },

      duplicateTemplate: (id) => {
        const target = get().templates.find((tpl) => tpl.id === id);
        if (!target) return '';

        const newId = `comm-${Math.random().toString(36).substring(2, 9)}`;
        const dup: CommunityTemplate = {
          ...target,
          id: newId,
          name: `${target.name} (Copy)`,
          createdAt: new Date().toISOString(),
          isCustom: true,
          likes: 0,
          downloads: 0,
          isLiked: false,
          isFavorited: false,
        };

        set((state) => ({
          templates: [dup, ...state.templates],
        }));

        return newId;
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((tpl) => tpl.id !== id || !tpl.isCustom),
          favorites: state.favorites.filter((fid) => fid !== id),
          recentlyUsed: state.recentlyUsed.filter((rid) => rid !== id),
        }));
      },

      toggleLike: (id) => {
        set((state) => ({
          templates: state.templates.map((tpl) => {
            if (tpl.id !== id) return tpl;
            const isLiked = !tpl.isLiked;
            return {
              ...tpl,
              isLiked,
              likes: isLiked ? tpl.likes + 1 : Math.max(0, tpl.likes - 1),
            };
          }),
        }));
      },

      incrementDownloads: (id) => {
        set((state) => ({
          templates: state.templates.map((tpl) => {
            if (tpl.id !== id) return tpl;
            return {
              ...tpl,
              downloads: tpl.downloads + 1,
            };
          }),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => {
          const isFav = state.favorites.includes(id);
          const updatedFavorites = isFav
            ? state.favorites.filter((fid) => fid !== id)
            : [...state.favorites, id];

          return {
            favorites: updatedFavorites,
            templates: state.templates.map((tpl) => {
              if (tpl.id !== id) return tpl;
              return {
                ...tpl,
                isFavorited: !isFav,
              };
            }),
          };
        });
      },

      addRecentlyUsed: (id) => {
        set((state) => {
          const filtered = state.recentlyUsed.filter((rid) => rid !== id);
          return {
            recentlyUsed: [id, ...filtered].slice(0, 8),
          };
        });
      },

      importTemplate: (jsonContent) => {
        try {
          const parsed = JSON.parse(jsonContent);
          const val = validateTemplateSchema(parsed);
          if (!val.valid) {
            return { success: false, error: `Invalid Schema: ${val.errors.join(' ')}` };
          }

          const meta = parsed.metadata || {};
          const newTemplate: CommunityTemplate = {
            id: parsed.id || `comm-${Math.random().toString(36).substring(2, 9)}`,
            version: parsed.version || '1.0',
            name: parsed.name,
            description: meta.description || 'Imported Template',
            author: meta.author || 'Anonymous',
            category: parsed.category || meta.category || 'Developer',
            tags: Array.isArray(meta.tags) ? meta.tags : [],
            difficulty: meta.difficulty || 'Beginner',
            technologies: Array.isArray(meta.technologies) ? meta.technologies : [],
            likes: parsed.likes || 0,
            downloads: parsed.downloads || 0,
            sections: parsed.sections,
            theme: parsed.theme || 'minimal',
            config: parsed.config,
            createdAt: parsed.createdAt || new Date().toISOString(),
            visibility: meta.visibility || 'public',
            isCustom: true,
          };

          set((state) => {
            const filtered = state.templates.filter((tpl) => tpl.id !== newTemplate.id);
            return {
              templates: [newTemplate, ...filtered],
            };
          });

          return { success: true };
        } catch (e: any) {
          return { success: false, error: e.message || 'JSON parsing failed' };
        }
      },
    }),
    {
      name: 'community-template-store',
    }
  )
);
