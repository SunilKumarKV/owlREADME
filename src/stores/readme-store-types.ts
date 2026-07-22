/* eslint-disable @typescript-eslint/no-explicit-any -- Legacy codebase types rely on explicit any, refactoring would require major architecture changes */
import { DEFAULT_FEATURED_PROJECTS } from '@/types/featured-projects';
export type { FeaturedProject, FeaturedProjectsConfig, ProjectCardStyle, ProjectLayout, ProjectSortMode } from '@/types/featured-projects';
export { DEFAULT_FEATURED_PROJECTS } from '@/types/featured-projects';

export type READMEStyleTemplate = 'minimal' | 'professional' | 'developer' | 'open-source' | 'portfolio';

export interface ExportHistoryItem {
  id: string;
  timestamp: string;
  format: string;
  projectName: string;
}

export interface RepoAnalysisResult {
  languages: { name: string; count: number }[];
  topStarred: { name: string; stars: number; description: string; url: string }[];
  topActive: { name: string; lastUpdated: string; description: string; url: string }[];
  suggestedSkills: string[];
  suggestedTechStack: string[];
  suggestedReadmeSections: { title: string; content: string }[];
  totalStars: number;
  totalForks: number;
}

export interface AISuggestions {
  readme: {
    aboutMe: string;
    introduction: string;
    skills: string;
    projects: string;
  } | null;
  roadmap: {
    nextTopics: string[];
    technologies: string[];
    roadmapSteps: string[];
  } | null;
  profile: {
    improvedBio: string;
    portfolioDescription: string;
    githubImprovements: string[];
  } | null;
}

export interface GitHubStatsConfig {
  enabled: boolean;
  username: string;
  theme: string;
  hideBorder: boolean;
  showIcons: boolean;
  compactMode: boolean;
  layout: 'default' | 'compact';
  cardOrder: ('stats' | 'languages' | 'streak')[];
  cardConfigs: Record<'stats' | 'languages' | 'streak', { enabled: boolean }>;
}

export const DEFAULT_GITHUB_STATS: GitHubStatsConfig = {
  enabled: false,
  username: '',
  theme: 'default',
  hideBorder: false,
  showIcons: true,
  compactMode: false,
  layout: 'default',
  cardOrder: ['stats', 'languages', 'streak'],
  cardConfigs: {
    stats: { enabled: true },
    languages: { enabled: true },
    streak: { enabled: true },
  },
};

export interface TechStackConfig {
  enabled: boolean;
  style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
  iconOnly: boolean;
  groupByCategory: boolean;
  hideEmptyCategories: boolean;
  selectedIds: string[];
}

export const DEFAULT_TECH_STACK: TechStackConfig = {
  enabled: false,
  style: 'for-the-badge',
  iconOnly: false,
  groupByCategory: true,
  hideEmptyCategories: false,
  selectedIds: [],
};

export interface SocialPlatformConfig {
  enabled: boolean;
  value: string;
}

export interface SocialLinksConfig {
  enabled: boolean;
  style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
  iconOnly: boolean;
  platforms: Record<string, SocialPlatformConfig>;
  order: string[];
}

export const DEFAULT_SOCIAL_LINKS: SocialLinksConfig = {
  enabled: false,
  style: 'for-the-badge',
  iconOnly: false,
  platforms: {},
  order: [
    'linkedin', 'portfolio', 'github', 'gitlab',
    'x', 'instagram', 'youtube', 'twitch', 'discord',
    'stackoverflow', 'devto', 'hashnode', 'medium',
    'email', 'gmail', 'buymeacoffee', 'kofi'
  ],
};

export interface AchievementWidgetConfig {
  enabled: boolean;
  theme?: string;
  color?: string;
  style?: string;
  hideBorder?: boolean;
  noFrame?: boolean;
  noBg?: boolean;
  rows?: number;
  columns?: number;
}

export interface AchievementsConfig {
  enabled: boolean;
  username: string;
  widgets: Record<'trophy' | 'visitor' | 'snake' | 'graph', AchievementWidgetConfig>;
  order: ('trophy' | 'visitor' | 'snake' | 'graph')[];
}

export const DEFAULT_ACHIEVEMENTS: AchievementsConfig = {
  enabled: false,
  username: '',
  widgets: {
    trophy: { enabled: true, theme: 'flat', noFrame: false, noBg: false, rows: 1, columns: 6 },
    visitor: { enabled: true, color: '0078d7', style: 'flat' },
    snake: { enabled: true },
    graph: { enabled: true, theme: 'github', hideBorder: false },
  },
  order: ['trophy', 'visitor', 'graph', 'snake'],
};

export interface HeaderConfig {
  enabled: boolean;
  name: string;
  pronouns: string;
  location: string;
  title: string;
  intro: string;
  alignment: 'left' | 'center' | 'right';
  bannerType: 'none' | 'capsule' | 'wave' | 'gradient';
  bannerTheme: string;
  bannerText: string;
  typingEnabled: boolean;
  typingLines: string[];
  typingSpeed: number;
  typingDelay: number;
  typingColor: string;
  typingCenter: boolean;
  badges: {
    openToWork: boolean;
    freelance: boolean;
    learning: string;
    building: string;
  };
  visitorPlacement: 'top' | 'bottom' | 'hidden';
}

export const DEFAULT_HEADER: HeaderConfig = {
  enabled: false,
  name: '',
  pronouns: '',
  location: '',
  title: '',
  intro: '',
  alignment: 'center',
  bannerType: 'none',
  bannerTheme: 'gradient',
  bannerText: '',
  typingEnabled: false,
  typingLines: [],
  typingSpeed: 200,
  typingDelay: 1000,
  typingColor: '36BCF7',
  typingCenter: true,
  badges: {
    openToWork: false,
    freelance: false,
    learning: '',
    building: '',
  },
  visitorPlacement: 'hidden',
};

export type SectionId =
  | 'header'
  | 'about'
  | 'socials'
  | 'techStack'
  | 'stats'
  | 'achievements'
  | 'projects'
  | 'support'
  | 'quotes'
  | 'visitor'
  | 'custom'
  | 'animatedComponents';

export interface SectionConfig {
  id: SectionId;
  name: string;
  enabled: boolean;
  collapsed: boolean;
}

export interface SectionOrderConfig {
  sections: Record<SectionId, SectionConfig>;
  order: (SectionId | string)[];
}

export const DEFAULT_SECTIONS: SectionOrderConfig = {
  order: [
    'header',
    'about',
    'socials',
    'techStack',
    'stats',
    'achievements',
    'projects',
    'animatedComponents',
    'support',
    'quotes',
    'visitor',
    'custom',
  ],
  sections: {
    header: { id: 'header', name: 'Profile Header', enabled: true, collapsed: false },
    about: { id: 'about', name: 'About Me', enabled: true, collapsed: false },
    socials: { id: 'socials', name: 'Social Links', enabled: true, collapsed: false },
    techStack: { id: 'techStack', name: 'Tech Stack', enabled: true, collapsed: false },
    stats: { id: 'stats', name: 'GitHub Stats', enabled: true, collapsed: false },
    achievements: { id: 'achievements', name: 'Achievements', enabled: true, collapsed: false },
    projects: { id: 'projects', name: 'Featured Projects', enabled: true, collapsed: false },
    animatedComponents: { id: 'animatedComponents', name: 'Animated Components', enabled: false, collapsed: false },
    support: { id: 'support', name: 'Support Me', enabled: false, collapsed: false },
    quotes: { id: 'quotes', name: 'Quotes', enabled: false, collapsed: false },
    visitor: { id: 'visitor', name: 'Visitor Counter', enabled: false, collapsed: false },
    custom: { id: 'custom', name: 'Custom Markdown', enabled: false, collapsed: false },
  },
};

export interface SupportConfig {
  enabled: boolean;
  buyMeACoffeeUsername: string;
  kofiUsername: string;
  style: 'flat' | 'flat-square' | 'for-the-badge';
}

export const DEFAULT_SUPPORT: SupportConfig = {
  enabled: false,
  buyMeACoffeeUsername: '',
  kofiUsername: '',
  style: 'for-the-badge',
};

export interface QuotesConfig {
  enabled: boolean;
  theme: string;
  quoteType: 'programming' | 'funny' | 'motivational';
}

export const DEFAULT_QUOTES: QuotesConfig = {
  enabled: false,
  theme: 'radical',
  quoteType: 'programming',
};

export interface CustomMarkdownBlock {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  collapsed: boolean;
}

export interface CustomMarkdownConfig {
  enabled: boolean;
  content: string;
  blocks: CustomMarkdownBlock[];
}

export const DEFAULT_CUSTOM_MARKDOWN: CustomMarkdownConfig = {
  enabled: false,
  content: '',
  blocks: [],
};

export interface StandaloneVisitorConfig {
  enabled: boolean;
  username: string;
  color: string;
  style: string;
}

export const DEFAULT_STANDALONE_VISITOR: StandaloneVisitorConfig = {
  enabled: false,
  username: '',
  color: 'green',
  style: 'flat',
};

export interface AnimatedComponentItem {
  id: string;
  type: 'typing' | 'waveHeader' | 'divider' | 'snake' | 'decorative' | 'badge' | 'footer';
  enabled: boolean;
  title: string;
  config: Record<string, any>;
}

export interface AnimatedComponentsConfig {
  enabled: boolean;
  components: AnimatedComponentItem[];
}

export const DEFAULT_ANIMATED_COMPONENTS: AnimatedComponentsConfig = {
  enabled: false,
  components: [
    {
      id: 'typing-svg',
      type: 'typing',
      enabled: true,
      title: 'Typing SVG Display',
      config: {
        lines: ["Hi, I'm a Software Engineer!", "Specializing in React & TypeScript.", "Passionate about open-source & clean code."],
        speed: 10,
        delay: 1000,
        color: '36BCF7',
        cursor: 'pipe',
      },
    },
    {
      id: 'wave-header',
      type: 'waveHeader',
      enabled: false,
      title: 'Capsule Wave Header',
      config: {
        theme: 'auto',
        height: 120,
        text: 'Welcome to my Profile!',
        animation: 'wave',
      },
    },
    {
      id: 'neon-divider',
      type: 'divider',
      enabled: false,
      title: 'Neon Gradient Divider',
      config: {
        style: 'gradient-line',
        color1: '#0078d7',
        color2: '#36BCF7',
        height: 4,
      },
    },
    {
      id: 'snake-grid',
      type: 'snake',
      enabled: false,
      title: 'Contribution Grid Snake',
      config: {
        theme: 'github-dark',
        colorPoint: '#39ff14',
      },
    },
    {
      id: 'stars-deco',
      type: 'decorative',
      enabled: false,
      title: 'Decorative Star Clusters',
      config: {
        type: 'stars',
        color: '#eab308',
      },
    },
    {
      id: 'pulsing-badge',
      type: 'badge',
      enabled: false,
      title: 'Pulsing Hiring Indicator',
      config: {
        label: 'Open To Work',
        color: '#10b981',
        pulse: true,
      },
    },
    {
      id: 'footer-banner',
      type: 'footer',
      enabled: false,
      title: 'Waving Footer Wave',
      config: {
        text: 'Thanks for stopping by! ❤️',
        theme: 'auto',
      },
    },
  ],
};

export const PRESETS: Record<string, SectionId[]> = {
  minimal: ['header', 'about', 'socials'],
  modern: ['header', 'about', 'techStack', 'stats', 'achievements', 'socials'],
  developer: ['header', 'about', 'techStack', 'projects', 'stats', 'visitor'],
  'open-source': ['header', 'about', 'projects', 'techStack', 'achievements'],
  'gprm-style': ['header', 'about', 'socials', 'techStack', 'stats', 'achievements', 'visitor'],
};

export type READMEField =
  | 'name'
  | 'role'
  | 'about'
  | 'skills'
  | 'projects'
  | 'socials'
  | 'avatarUrl'
  | 'followers'
  | 'following'
  | 'publicRepos'
  | 'template'
  | 'readmeExportsCount'
  | 'templatesUsedCount'
  | 'githubStats'
  | 'techStack'
  | 'socialLinks'
  | 'achievements'
  | 'header'
  | 'sections'
  | 'support'
  | 'quotes'
  | 'customMarkdown'
  | 'standaloneVisitor'
  | 'featuredProjects';

export function createDefaultReadmeData() {
  return {
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
    template: 'minimal' as READMEStyleTemplate,
    repoAnalysis: null as any,
    aiSuggestions: null as any,
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
    animatedComponents: { ...DEFAULT_ANIMATED_COMPONENTS },
    featuredProjects: { ...DEFAULT_FEATURED_PROJECTS }
  };
}
