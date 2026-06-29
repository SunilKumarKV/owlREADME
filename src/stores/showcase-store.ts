import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionId } from './readme-store';

export type ShowcaseCategory =
  | 'minimal'
  | 'modern'
  | 'open-source'
  | 'frontend'
  | 'full-stack'
  | 'ai'
  | 'anime'
  | 'terminal'
  | 'gprm';

export interface Showcase {
  id: string;
  name: string;
  description: string;
  author: string;
  category: ShowcaseCategory;
  technologies: string[];
  likes: number;
  views: number;
  sections: SectionId[];
  theme: 'minimal' | 'dark' | 'gradient' | 'terminal';
  config: any; // Serialized READMEState config
  createdAt: string;
  isCustom?: boolean; // Toggled true if user created or imported it
  isLiked?: boolean;
}

interface ShowcaseStore {
  showcases: Showcase[];
  addShowcase: (showcase: Omit<Showcase, 'id' | 'likes' | 'views' | 'createdAt' | 'isCustom'>) => void;
  deleteShowcase: (id: string) => void;
  likeShowcase: (id: string) => void;
  viewShowcase: (id: string) => void;
  importShowcases: (jsonContent: string) => { success: boolean; error?: string };
}

// ── Seed Showcase Profiles ──────────────────────────────────────────────────
const SEED_SHOWCASES: Showcase[] = [
  {
    id: 'show-ai-researcher',
    name: 'Neural Labs Profile',
    description: 'A deep-tech showcase layout for AI researchers featuring large typing cards, PyTorch setups, and dark visual aesthetics.',
    author: 'evelyn_carter',
    category: 'ai',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'HuggingFace'],
    likes: 245,
    views: 890,
    sections: ['header', 'about', 'techStack', 'stats', 'projects', 'animatedComponents'],
    theme: 'dark',
    createdAt: '2026-06-20T10:00:00Z',
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
      socialLinks: { enabled: true, style: 'for-the-badge', iconOnly: true, platforms: { github: 'https://github.com', linkedin: 'https://linkedin.com' } },
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
      animatedComponents: {
        enabled: true,
        components: [
          {
            id: 'typing-svg',
            type: 'typing',
            enabled: true,
            title: 'Model Focus Typing',
            config: { lines: ['Running Inference...', 'Optimizing Hyperparameters...', 'Aligning Policy Gradients...'], speed: 12, delay: 1000, color: 'a855f7' }
          }
        ]
      }
    }
  },
  {
    id: 'show-webgl-creative',
    name: 'Neon Interactive Studio',
    description: 'Designed for front-end developers focusing on visual excellence, Three.js grids, and neon elements.',
    author: 'visual_wizard',
    category: 'gprm',
    technologies: ['React', 'TypeScript', 'Three.js', 'WebGL', 'TailwindCSS'],
    likes: 189,
    views: 654,
    sections: ['header', 'about', 'socials', 'techStack', 'stats', 'achievements'],
    theme: 'gradient',
    createdAt: '2026-06-22T08:30:00Z',
    config: {
      header: {
        enabled: true,
        name: 'Leon Vance',
        title: 'Creative Web Developer',
        intro: 'Translating WebGL canvas structures into high-impact interactive profile sections.',
        pronouns: 'they/them',
        location: 'Berlin, DE',
        alignment: 'left',
        bannerType: 'capsule',
        bannerTheme: 'radical',
        bannerText: 'Canvas & Animation Studio',
        typingEnabled: false,
        typingLines: [],
        typingSpeed: 200,
        typingDelay: 1000,
        typingColor: '36BCF7',
        typingCenter: false,
        badges: { openToWork: false, freelance: true, learning: 'WebXR', building: 'Fluid Engine' },
        visitorPlacement: 'hidden',
      },
      githubStats: { enabled: true, theme: 'radical', hideBorder: true, showIcons: true, compactMode: false, layout: 'default' },
      techStack: { enabled: true, style: 'for-the-badge', iconOnly: true, groupByCategory: false, selectedIds: ['javascript', 'typescript', 'react', 'nextjs', 'tailwindcss', 'threejs'] },
      socialLinks: { enabled: true, style: 'flat-square', iconOnly: false, platforms: { github: 'https://github.com', devto: 'https://dev.to' } },
      achievements: {
        enabled: true,
        widgets: {
          trophy: { enabled: true, theme: 'radical', noFrame: true, noBg: true },
          visitor: { enabled: true, color: '0078d7', style: 'flat' },
          snake: { enabled: true },
          graph: { enabled: true, theme: 'radical', hideBorder: true },
        },
        order: ['trophy', 'visitor', 'graph', 'snake']
      },
      quotes: { enabled: false, theme: 'radical', quoteType: 'programming' }
    }
  },
  {
    id: 'show-minimal-engineer',
    name: 'Minimal Systems Profile',
    description: 'Clean design using typography. Excellent layout alignment for kernel and infrastructure engineers.',
    author: 'kernel_coder',
    category: 'minimal',
    technologies: ['Rust', 'Go', 'C++', 'Linux', 'WebAssembly'],
    likes: 312,
    views: 1204,
    sections: ['header', 'about', 'socials'],
    theme: 'minimal',
    createdAt: '2026-06-18T14:20:00Z',
    config: {
      header: {
        enabled: true,
        name: 'Alex Sterling',
        title: 'Systems Architect',
        intro: 'Crafting slim operating frameworks and microsecond-latency APIs.',
        pronouns: 'he/him',
        location: 'London, UK',
        alignment: 'left',
        bannerType: 'none',
        bannerTheme: 'default',
        bannerText: '',
        typingEnabled: false,
        typingLines: [],
        typingSpeed: 200,
        typingDelay: 1000,
        typingColor: '36BCF7',
        typingCenter: false,
        badges: { openToWork: false, freelance: false, learning: 'eBPF Filters', building: 'AeroFS' },
        visitorPlacement: 'hidden',
      },
      githubStats: { enabled: false, theme: 'default', hideBorder: false, showIcons: true, compactMode: false, layout: 'default' },
      techStack: { enabled: false, style: 'flat', iconOnly: false, groupByCategory: true, selectedIds: [] },
      socialLinks: { enabled: true, style: 'flat', iconOnly: false, platforms: { github: 'https://github.com', linkedin: 'https://linkedin.com' } },
      achievements: {
        enabled: false,
        widgets: {
          trophy: { enabled: false, theme: 'flat', noFrame: false, noBg: false },
          visitor: { enabled: false, color: 'green', style: 'flat' },
          snake: { enabled: false },
          graph: { enabled: false, theme: 'github', hideBorder: false },
        },
      },
      quotes: { enabled: false, theme: 'default', quoteType: 'programming' }
    }
  }
];

export const useShowcaseStore = create<ShowcaseStore>()(
  persist(
    (set, get) => ({
      showcases: SEED_SHOWCASES,

      addShowcase: (showcaseData) => {
        const newShowcase: Showcase = {
          ...showcaseData,
          id: `show-${Math.random().toString(36).substring(2, 9)}`,
          likes: 0,
          views: 0,
          createdAt: new Date().toISOString(),
          isCustom: true,
        };
        set((state) => ({
          showcases: [newShowcase, ...state.showcases],
        }));
      },

      deleteShowcase: (id) => {
        set((state) => ({
          showcases: state.showcases.filter((show) => show.id !== id || !show.isCustom),
        }));
      },

      likeShowcase: (id) => {
        set((state) => ({
          showcases: state.showcases.map((show) => {
            if (show.id !== id) return show;
            const isLiked = !show.isLiked;
            return {
              ...show,
              isLiked,
              likes: isLiked ? show.likes + 1 : Math.max(0, show.likes - 1),
            };
          }),
        }));
      },

      viewShowcase: (id) => {
        set((state) => ({
          showcases: state.showcases.map((show) => {
            if (show.id !== id) return show;
            return {
              ...show,
              views: show.views + 1,
            };
          }),
        }));
      },

      importShowcases: (jsonContent) => {
        try {
          const parsed = JSON.parse(jsonContent);
          const list = Array.isArray(parsed) ? parsed : [parsed];

          const importedShowcases: Showcase[] = [];

          for (const item of list) {
            if (!item.name || !item.category || !item.config) {
              return { success: false, error: 'Invalid schema. Missing name, category, or config.' };
            }

            const allowedCategories: ShowcaseCategory[] = [
              'minimal', 'modern', 'open-source', 'frontend', 'full-stack', 'ai', 'anime', 'terminal', 'gprm'
            ];
            if (!allowedCategories.includes(item.category)) {
              return { success: false, error: `Invalid category: ${item.category}` };
            }

            importedShowcases.push({
              id: item.id || `show-${Math.random().toString(36).substring(2, 9)}`,
              name: item.name,
              description: item.description || 'Imported Showcase',
              author: item.author || 'Anonymous',
              category: item.category,
              technologies: Array.isArray(item.technologies) ? item.technologies : [],
              likes: item.likes || 0,
              views: item.views || 0,
              sections: Array.isArray(item.sections) ? item.sections : ['header', 'about'],
              theme: item.theme || 'minimal',
              config: item.config,
              createdAt: item.createdAt || new Date().toISOString(),
              isCustom: true,
            });
          }

          set((state) => {
            const importedIds = importedShowcases.map((s) => s.id);
            const filtered = state.showcases.filter((s) => !importedIds.includes(s.id));
            return {
              showcases: [...importedShowcases, ...filtered],
            };
          });

          return { success: true };
        } catch (e: any) {
          return { success: false, error: e.message || 'JSON parsing failed' };
        }
      },
    }),
    {
      name: 'readme-showcase-store',
    }
  )
);
