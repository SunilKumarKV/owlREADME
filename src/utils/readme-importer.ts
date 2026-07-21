/* eslint-disable @typescript-eslint/no-explicit-any -- AST node structures and legacy state configurations utilize explicit any */
import { SectionId } from '@/stores/readme-store';
import { TECHNOLOGY_REGISTRY } from '@/utils/tech-registry';
import { SOCIAL_PLATFORM_REGISTRY } from '@/utils/social-registry';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toString } from 'mdast-util-to-string';

export interface DetectedSectionInfo {
  id: string; // Display name of the detected section
  sectionId: SectionId;
  name: string; // Mapped section display name
  confidence: number; // 0 to 100
  lines: [number, number]; // Source line numbers [start, end]
  status: 'Imported' | 'Unsupported' | 'Partial';
  details?: string;
}

export interface ParsedReadmeResult {
  detectedSections: (SectionId | string)[];
  analysis: {
    sections: DetectedSectionInfo[];
    totalDetected: number;
  };
  data: {
    name: string;
    role: string;
    about: string;
    skills: string;
    header: {
      enabled: boolean;
      name: string;
      title: string;
      intro: string;
      pronouns: string;
      location: string;
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
    };
    githubStats: {
      enabled: boolean;
      username: string;
      theme: string;
      hideBorder: boolean;
      showIcons: boolean;
      compactMode: boolean;
      layout: 'default' | 'compact' | 'languages';
    };
    techStack: {
      enabled: boolean;
      style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
      iconOnly: boolean;
      groupByCategory: boolean;
      selectedIds: string[];
    };
    socialLinks: {
      enabled: boolean;
      style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
      iconOnly: boolean;
      platforms: Record<string, { enabled: boolean; value: string }>;
    };
    achievements: {
      enabled: boolean;
      username: string;
      widgets: Record<
        string,
        {
          enabled: boolean;
          theme?: string;
          color?: string;
          style?: string;
          hideBorder?: boolean;
          noFrame?: boolean;
          noBg?: boolean;
        }
      >;
    };
    featuredProjects: {
      enabled: boolean;
      projects: Array<{
        id: string;
        source: 'github' | 'manual';
        repoName?: string;
        title?: string;
        description?: string;
        language?: string;
        stars?: number;
        forks?: number;
        repoUrl?: string;
        demoUrl?: string;
        technologies?: string[];
      }>;
      cardStyle: 'minimal' | 'modern' | 'compact' | 'grid' | 'gprm';
      layout: '1-col' | '2-col' | 'grid';
      sortMode: 'stars' | 'updated' | 'manual';
      badgeStyle: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
      showStars: boolean;
      showForks: boolean;
      showLanguage: boolean;
      showTopics: boolean;
    };
    standaloneVisitor: {
      enabled: boolean;
      username: string;
      color: string;
      style: string;
    };
    support: {
      enabled: boolean;
      buyMeACoffeeUsername: string;
      kofiUsername: string;
      style: 'flat' | 'flat-square' | 'for-the-badge';
    };
    quotes: {
      enabled: boolean;
      theme: string;
      quoteType: 'programming' | 'funny' | 'motivational';
    };
    customMarkdown: {
      enabled: boolean;
      content: string;
      blocks: any[];
    };
    animatedComponents: {
      enabled: boolean;
      items: any[];
    };
  };
}

/** Recursively gathers all AST nodes under a parent matching specified types */
function findNodes(node: any, types: string[]): any[] {
  const results: any[] = [];
  if (!node) return results;
  if (types.includes(node.type)) {
    results.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      results.push(...findNodes(child, types));
    }
  }
  return results;
}

/** Helper to extract a query parameter from both relative and absolute URLs */
function getQueryParam(url: string, param: string): string | null {
  try {
    const urlObj = new URL(url, 'https://dummy.com');
    return urlObj.searchParams.get(param);
  } catch {
    const regex = new RegExp(`[?&]${param}=([^&#]*)`, 'i');
    const match = url.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
  }
}

/** Analyzes raw HTML text to extract image sources or anchor tags */
function parseHtmlTags(html: string): { images: string[]; links: string[] } {
  const images: string[] = [];
  const links: string[] = [];

  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
  }

  const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  return { images, links };
}

/** Robustly verifies if a URL represents a specific technology or social platform without false positive substring matches (like 'go' matching inside 'logo') */
function matchesTechOrSocial(url: string, key: string, logo: string): boolean {
  const urlLower = url.toLowerCase();
  const keyLower = key.toLowerCase();
  const logoLower = logo.toLowerCase();

  const checkMatch = (val: string) => {
    if (!val) return false;
    
    // 1. Exact match for Shields.io logo query param
    const logoParam = getQueryParam(urlLower, 'logo');
    if (logoParam === val) return true;

    // 2. Exact match for path parameter in Shields.io URL, e.g., /badge/React-20232A
    const badgeMatch = urlLower.match(/\/badge\/([a-z0-9_#+.-]+)/i);
    if (badgeMatch) {
      const badgeName = badgeMatch[1].split('-')[0];
      if (badgeName === val) return true;
    }

    // 3. Exact word boundary match for direct paths or subdomain structures
    const regex = new RegExp(`(?:[/._-]|^)${val}(?:[/._-]|$|\\?)`, 'i');
    if (regex.test(urlLower)) return true;

    return false;
  };

  return checkMatch(keyLower) || checkMatch(logoLower);
}

// Helper to test if a URL represents a specific widget
const isWidgetUrl = (url: string) => {
  return (
    url.includes('github-readme-stats') ||
    url.includes('github-readme-streak-stats') ||
    url.includes('github-profile-trophy') ||
    url.includes('github-readme-activity-graph') ||
    url.includes('github-contribution-grid-snake') ||
    url.includes('readme-typing-svg') ||
    url.includes('komarev.com/ghpvc') ||
    url.includes('visitor-badge') ||
    url.includes('github-readme-quotes') ||
    url.includes('buymeacoffee.com') ||
    url.includes('ko-fi.com')
  );
};

const isSocialUrl = (url: string) => {
  const urlLower = url.toLowerCase();
  return SOCIAL_PLATFORM_REGISTRY.some((p) => {
    const isTwitter = p.id === 'x' && (urlLower.includes('twitter.com') || urlLower.includes('logo=twitter') || urlLower.includes('x.com'));
    return isTwitter || matchesTechOrSocial(url, p.id, p.logo);
  });
};

const isTechUrl = (url: string) => {
  return TECHNOLOGY_REGISTRY.some((t) => matchesTechOrSocial(url, t.id, t.logo || ''));
};

function detectBlockType(node: any, isFirst: boolean, inAbout: boolean, inHeader: boolean): string | 'unsupported' {
  const images = findNodes(node, ['image']);
  const links = findNodes(node, ['link']);
  const htmls = findNodes(node, ['html']);

  const imageUrls: string[] = [];
  const linkUrls: string[] = [];

  for (const img of images) if (img.url) imageUrls.push(img.url);
  for (const lnk of links) if (lnk.url) linkUrls.push(lnk.url);
  for (const html of htmls) {
    const parsed = parseHtmlTags(html.value);
    imageUrls.push(...parsed.images);
    linkUrls.push(...parsed.links);
  }

  // 1. Quotes
  if (imageUrls.some((u) => u.includes('github-readme-quotes'))) {
    return 'quotes';
  }

  // 2. Visitor
  if (imageUrls.some((u) => u.includes('komarev.com/ghpvc') || u.includes('visitor-badge'))) {
    return 'visitor';
  }

  // 3. Support
  if (linkUrls.some((u) => u.includes('buymeacoffee.com') || u.includes('ko-fi.com'))) {
    return 'support';
  }

  // 4. Stats
  if (imageUrls.some((u) => u.includes('github-readme-stats') || u.includes('github-readme-streak-stats'))) {
    return 'stats';
  }

  // 5. Achievements
  if (imageUrls.some((u) => u.includes('github-profile-trophy') || u.includes('github-readme-activity-graph') || u.includes('github-contribution-grid-snake'))) {
    return 'achievements';
  }

  // 6. Header
  if (
    imageUrls.some((u) => u.includes('capsule-render') || u.includes('readme-typing-svg')) ||
    (node.type === 'heading' && /hi\s|hello|welcome/i.test(toString(node))) ||
    (isFirst && /hi\s|hello|welcome|i'm|i am/i.test(toString(node))) ||
    (inHeader && (node.type === 'heading' || node.type === 'paragraph'))
  ) {
    return 'header';
  }

  // 7. Projects
  if (node.type === 'heading' && /project|portfolio|repos/i.test(toString(node))) {
    return 'projects';
  }
  if (node.type === 'list') {
    const listItems = findNodes(node, ['listItem']);
    const hasGithubLinks = listItems.some((item) => findNodes(item, ['link']).some((l) => l.url?.includes('github.com/')));
    if (hasGithubLinks) {
      return 'projects';
    }
  }
  if (imageUrls.some((u) => u.includes('github-readme-stats') && u.includes('pin/'))) {
    return 'projects';
  }

  // 8. Socials
  const hasSocials = linkUrls.some(isSocialUrl);
  const allLinksAreSocials = linkUrls.length > 0 && linkUrls.every((u) => isSocialUrl(u) || isWidgetUrl(u));
  if (hasSocials && allLinksAreSocials) {
    return 'socials';
  }

  // 9. Tech Stack
  const hasTech = imageUrls.some(isTechUrl);
  const allImagesAreTech = imageUrls.length > 0 && imageUrls.every((u) => isTechUrl(u) || isWidgetUrl(u));
  if (hasTech && allImagesAreTech) {
    return 'techStack';
  }

  // 10. About Me
  if (node.type === 'heading' && /about|bio|introduction|who\s+i\s+am/i.test(toString(node))) {
    return 'about';
  }
  if (inAbout && node.type === 'paragraph') {
    return 'about';
  }

  return 'unsupported';
}

export function parseReadmeMarkdown(markdown: string): ParsedReadmeResult {
  // 1. Initialize MDAST Parser
  const processor = unified().use(remarkParse);
  const ast = processor.parse(markdown);

  // 2. Initialize default output builder state
  const resultData: ParsedReadmeResult['data'] = {
    name: '',
    role: '',
    about: '',
    skills: '',
    header: {
      enabled: false,
      name: '',
      title: '',
      intro: '',
      pronouns: '',
      location: '',
      alignment: 'center',
      bannerType: 'none',
      bannerTheme: 'default',
      bannerText: '',
      typingEnabled: false,
      typingLines: [],
      typingSpeed: 200,
      typingDelay: 1000,
      typingColor: '36BCF7',
      typingCenter: true,
      badges: { openToWork: false, freelance: false, learning: '', building: '' },
      visitorPlacement: 'hidden',
    },
    githubStats: {
      enabled: false,
      username: '',
      theme: 'default',
      hideBorder: false,
      showIcons: true,
      compactMode: false,
      layout: 'default',
    },
    techStack: {
      enabled: false,
      style: 'flat-square',
      iconOnly: false,
      groupByCategory: true,
      selectedIds: [],
    },
    socialLinks: {
      enabled: false,
      style: 'flat-square',
      iconOnly: false,
      platforms: {},
    },
    achievements: {
      enabled: false,
      username: '',
      widgets: {
        trophy: { enabled: false, theme: 'flat' },
        visitor: { enabled: false, color: 'green', style: 'flat' },
        snake: { enabled: false },
        graph: { enabled: false, theme: 'github' },
      },
    },
    featuredProjects: {
      enabled: false,
      projects: [],
      cardStyle: 'modern',
      layout: '2-col',
      sortMode: 'manual',
      badgeStyle: 'flat-square',
      showStars: true,
      showForks: true,
      showLanguage: true,
      showTopics: true,
    },
    standaloneVisitor: {
      enabled: false,
      username: '',
      color: 'green',
      style: 'flat',
    },
    support: {
      enabled: false,
      buyMeACoffeeUsername: '',
      kofiUsername: '',
      style: 'for-the-badge',
    },
    quotes: {
      enabled: false,
      theme: 'radical',
      quoteType: 'programming',
    },
    customMarkdown: {
      enabled: false,
      content: '',
      blocks: [],
    },
    animatedComponents: {
      enabled: false,
      items: [],
    },
  };

  const detectedSectionsSet = new Set<string>();

  // --- GLOBAL CONFIG EXTRACTORS ---
  // Scan globally to populate settings like usernames, styles, platforms, selected tech stack IDs, support links, etc.
  const allLinkNodes = findNodes(ast, ['link']);
  const allHtmlNodes = findNodes(ast, ['html']);
  const allImageNodes = findNodes(ast, ['image']);

  const extractedLinks: { url: string }[] = [];
  for (const node of allLinkNodes) if (node.url) extractedLinks.push({ url: node.url });
  for (const node of allHtmlNodes) {
    const parsed = parseHtmlTags(node.value);
    for (const link of parsed.links) extractedLinks.push({ url: link });
  }

  for (const { url } of extractedLinks) {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('buymeacoffee.com') || urlLower.includes('ko-fi.com')) {
      detectedSectionsSet.add('support');
      resultData.support.enabled = true;
      if (urlLower.includes('buymeacoffee.com')) {
        const match = url.match(/buymeacoffee\.com\/([^/?#]+)/);
        if (match) resultData.support.buyMeACoffeeUsername = match[1];
      }
      if (urlLower.includes('ko-fi.com')) {
        const match = url.match(/ko-fi\.com\/([^/?#]+)/);
        if (match) resultData.support.kofiUsername = match[1];
      }
      continue;
    }
    if (isWidgetUrl(url)) continue;

    const platform = SOCIAL_PLATFORM_REGISTRY.find((p) => {
      const isTwitter = p.id === 'x' && (urlLower.includes('twitter.com') || urlLower.includes('logo=twitter'));
      return isTwitter || matchesTechOrSocial(url, p.id, p.logo);
    });

    if (platform) {
      detectedSectionsSet.add('socials');
      resultData.socialLinks.enabled = true;
      let val = url;
      if (platform.urlTemplate.includes('{value}')) {
        const prefix = platform.urlTemplate.split('{value}')[0];
        if (url.startsWith(prefix)) {
          val = url.replace(prefix, '');
        } else if (platform.id === 'x' && url.startsWith('https://twitter.com/')) {
          val = url.replace('https://twitter.com/', '');
        }
      }
      resultData.socialLinks.platforms[platform.id] = { enabled: true, value: val };
    }
  }

  const extractedImages: { url: string }[] = [];
  for (const node of allImageNodes) if (node.url) extractedImages.push({ url: node.url });
  for (const node of allHtmlNodes) {
    const parsed = parseHtmlTags(node.value);
    for (const img of parsed.images) extractedImages.push({ url: img });
  }

  for (const { url } of extractedImages) {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('github-readme-stats') || urlLower.includes('github-readme-streak-stats')) {
      detectedSectionsSet.add('stats');
      resultData.githubStats.enabled = true;
      if (urlLower.includes('github-readme-stats')) {
        const uName = getQueryParam(url, 'username');
        if (uName) resultData.githubStats.username = uName;
        resultData.githubStats.theme = getQueryParam(url, 'theme') || 'default';
        resultData.githubStats.hideBorder = getQueryParam(url, 'hide_border') === 'true';
        resultData.githubStats.showIcons = getQueryParam(url, 'show_icons') === 'true';
        if (urlLower.includes('top-langs')) {
          resultData.githubStats.layout = 'languages';
        } else if (getQueryParam(url, 'layout') === 'compact') {
          resultData.githubStats.layout = 'compact';
        }
      }
      if (urlLower.includes('github-readme-streak-stats')) {
        const uName = getQueryParam(url, 'user');
        if (uName && !resultData.githubStats.username) {
          resultData.githubStats.username = uName;
        }
      }
    } else if (urlLower.includes('komarev.com/ghpvc') || urlLower.includes('visitor-badge')) {
      detectedSectionsSet.add('visitor');
      resultData.standaloneVisitor.enabled = true;
      resultData.standaloneVisitor.username = getQueryParam(url, 'username') || '';
      resultData.standaloneVisitor.color = getQueryParam(url, 'color') || 'green';
      resultData.standaloneVisitor.style = getQueryParam(url, 'style') || 'flat';
    } else if (
      urlLower.includes('github-profile-trophy') ||
      urlLower.includes('github-readme-activity-graph') ||
      urlLower.includes('github-contribution-grid-snake.svg')
    ) {
      detectedSectionsSet.add('achievements');
      resultData.achievements.enabled = true;
      if (urlLower.includes('github-profile-trophy')) {
        resultData.achievements.widgets.trophy.enabled = true;
        resultData.achievements.widgets.trophy.theme = getQueryParam(url, 'theme') || 'flat';
        const uName = getQueryParam(url, 'username');
        if (uName) resultData.achievements.username = uName;
      }
      if (urlLower.includes('github-readme-activity-graph')) {
        resultData.achievements.widgets.graph.enabled = true;
        resultData.achievements.widgets.graph.theme = getQueryParam(url, 'theme') || 'github';
        const uName = getQueryParam(url, 'username');
        if (uName && !resultData.achievements.username) {
          resultData.achievements.username = uName;
        }
      }
      if (urlLower.includes('github-contribution-grid-snake')) {
        resultData.achievements.widgets.snake.enabled = true;
      }
    } else if (urlLower.includes('github-readme-quotes')) {
      detectedSectionsSet.add('quotes');
      resultData.quotes.enabled = true;
      resultData.quotes.theme = getQueryParam(url, 'theme') || 'radical';
    } else if (!isWidgetUrl(url) && TECHNOLOGY_REGISTRY.some((t) => matchesTechOrSocial(url, t.id, t.logo || ''))) {
      const tech = TECHNOLOGY_REGISTRY.find((t) => matchesTechOrSocial(url, t.id, t.logo || ''));
      if (tech) {
        detectedSectionsSet.add('techStack');
        resultData.techStack.enabled = true;
        if (!resultData.techStack.selectedIds.includes(tech.id)) {
          resultData.techStack.selectedIds.push(tech.id);
        }
        const style = getQueryParam(url, 'style');
        if (style) {
          resultData.techStack.style = style as any;
        }
      }
    } else if (!isWidgetUrl(url) && SOCIAL_PLATFORM_REGISTRY.some((p) => matchesTechOrSocial(url, p.id, p.logo))) {
      const style = getQueryParam(url, 'style');
      if (style) {
        resultData.socialLinks.style = style as any;
      }
    }
  }

  // --- SEQUENTIAL LAYOUT FLOW SCANNER ---
  const order: string[] = [];
  const customBlocks: any[] = [];

  let inAbout = false;
  let inHeader = false;
  let isFirst = true;
  let unsupportedStartOffset = -1;
  let unsupportedEndOffset = -1;

  const pushCustomBlock = () => {
    if (unsupportedStartOffset !== -1) {
      const rawContent = markdown.slice(unsupportedStartOffset, unsupportedEndOffset).trim();
      if (rawContent) {
        const newId = `custom_${Math.random().toString(36).substr(2, 9)}`;
        const headingMatch = rawContent.match(/^#+\s+(.+)$/m);
        const title = headingMatch ? headingMatch[1].trim() : 'Custom Section';

        customBlocks.push({
          id: newId,
          title,
          content: rawContent,
          enabled: true,
          collapsed: false,
        });
        order.push(newId);
      }
      unsupportedStartOffset = -1;
      unsupportedEndOffset = -1;
    }
  };

  for (const child of ast.children) {
    const start = child.position?.start?.offset ?? 0;
    const end = child.position?.end?.offset ?? markdown.length;

    if (child.type === 'heading') {
      const headingText = toString(child).trim().toLowerCase();
      const depth = child.depth || 1;

      if (headingText.includes('hi ') || headingText.includes('hello') || headingText.includes('welcome')) {
        inHeader = true;
        inAbout = false;
      } else if (headingText.includes('about') || headingText.includes('bio') || headingText.includes('introduction') || headingText.includes('who i am')) {
        inAbout = true;
        inHeader = false;
      } else if (
        headingText.includes('project') ||
        headingText.includes('portfolio') ||
        headingText.includes('repos') ||
        headingText.includes('social') ||
        headingText.includes('contact') ||
        headingText.includes('tech') ||
        headingText.includes('stack') ||
        headingText.includes('stats') ||
        headingText.includes('achievements') ||
        depth <= 2
      ) {
        inAbout = false;
        inHeader = false;
      }
    }

    const blockType = detectBlockType(child, isFirst, inAbout, inHeader);
    isFirst = false;

    if (blockType === 'header') {
      inHeader = true;
    }

    if (blockType === 'unsupported') {
      if (unsupportedStartOffset === -1) {
        unsupportedStartOffset = start;
      }
      unsupportedEndOffset = end;
    } else {
      pushCustomBlock();

      const STRUCTURED_SECTIONS = new Set([
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
      ]);

      if (STRUCTURED_SECTIONS.has(blockType)) {
        if (!order.includes(blockType)) {
          order.push(blockType);
        }
      } else if (order[order.length - 1] !== blockType) {
        order.push(blockType);
      }

      if (blockType === 'about') {
        detectedSectionsSet.add('about');
        if (child.type === 'paragraph') {
          const pText = toString(child).trim();
          if (pText) {
            resultData.about = resultData.about ? `${resultData.about}\n\n${pText}` : pText;
          }
        }
      } else if (blockType === 'header') {
        detectedSectionsSet.add('header');
        resultData.header.enabled = true;

        const blockText = toString(child);
        const greetingMatch = blockText.match(/(?:Hi 👋, I'm|Hello, I'm|I am|I'm)\s+([^<\n\r]+)/i);
        if (greetingMatch) {
          let rawName = greetingMatch[1].trim().replace(/^#+\s+/, '');
          const pronounsMatch = rawName.match(/\(([^)]+)\)/);
          if (pronounsMatch) {
            resultData.header.pronouns = pronounsMatch[1];
            rawName = rawName.replace(/\(([^)]+)\)/, '').trim();
          }
          resultData.header.name = rawName;
          resultData.name = rawName;
        }

        const locationMatch = blockText.match(/(?:based in|Based in)\s+([^<\n\r]+)/i);
        if (locationMatch) {
          resultData.header.location = locationMatch[1].trim();
        }

        const titleMatch = blockText.match(/(?:Software Engineer|Frontend Architect|Backend Engineer|Full Stack Developer|Developer|Architect|Designer|Student)/i);
        if (titleMatch) {
          resultData.header.title = titleMatch[0].trim();
          resultData.role = titleMatch[0].trim();
        }

        // Search child images inside header block for banners
        const childImages = findNodes(child, ['image', 'html']);
        for (const img of childImages) {
          const urls = img.type === 'image' ? [img.url] : parseHtmlTags(img.value).images;
          for (const u of urls) {
            if (u.includes('capsule-render')) {
              const type = getQueryParam(u, 'type');
              resultData.header.bannerType = type === 'waving' ? 'capsule' : type === 'soft' ? 'wave' : 'gradient';
              resultData.header.bannerTheme = getQueryParam(u, 'color') || 'default';
              resultData.header.bannerText = getQueryParam(u, 'text') || '';
            }
            if (u.includes('readme-typing-svg')) {
              resultData.header.typingEnabled = true;
              const linesStr = getQueryParam(u, 'lines');
              if (linesStr) {
                resultData.header.typingLines = linesStr.split(';').map((line) => decodeURIComponent(line));
              }
              resultData.header.typingColor = getQueryParam(u, 'color') || '36BCF7';
              resultData.header.typingCenter = getQueryParam(u, 'center') === 'true';
              resultData.header.typingSpeed = parseInt(getQueryParam(u, 'speed') || '200', 10);
              resultData.header.typingDelay = parseInt(getQueryParam(u, 'pause') || '1000', 10);
            }
          }
        }
      } else if (blockType === 'projects') {
        detectedSectionsSet.add('projects');
        resultData.featuredProjects.enabled = true;

        if (child.type === 'list') {
          const listItems = findNodes(child, ['listItem']);
          for (const item of listItems) {
            const links = findNodes(item, ['link']);
            const ghLink = links.find((l) => l.url?.includes('github.com/'));
            if (ghLink) {
              const match = ghLink.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
              if (match) {
                const rName = match[2].replace(/\/$/, '');
                const fullText = toString(item).trim();
                const linkText = toString(ghLink);
                const desc = fullText.replace(linkText, '').replace(/^[\s—\-:]+/, '').trim();
                resultData.featuredProjects.projects.push({
                  id: Math.random().toString(36).substr(2, 9),
                  source: 'github',
                  repoName: rName,
                  title: linkText || rName,
                  repoUrl: ghLink.url,
                  description: desc,
                  stars: 0,
                  forks: 0,
                });
              }
            }
          }
        }

        const images = findNodes(child, ['image', 'html']);
        for (const imgNode of images) {
          const urls = imgNode.type === 'image' ? [imgNode.url] : parseHtmlTags(imgNode.value).images;
          for (const u of urls) {
            if (u.includes('github-readme-stats') && u.includes('pin/')) {
              const repoParam = getQueryParam(u, 'repo');
              const usernameParam = getQueryParam(u, 'username');
              if (repoParam && usernameParam) {
                resultData.featuredProjects.projects.push({
                  id: Math.random().toString(36).substr(2, 9),
                  source: 'github',
                  repoName: repoParam,
                  title: repoParam,
                  repoUrl: `https://github.com/${usernameParam}/${repoParam}`,
                  stars: 0,
                  forks: 0,
                });
              }
            }
          }
        }
      }
    }
  }

  // Push final custom block if any
  pushCustomBlock();

  resultData.customMarkdown.blocks = customBlocks;
  if (customBlocks.length > 0) {
    resultData.customMarkdown.enabled = true;
  }

  // 5. Build final analysis reports
  const sectionNameMap: Record<string, string> = {
    header: 'Profile Header',
    about: 'About Me & Skills',
    socials: 'Social Links',
    techStack: 'Tech Stack & Badges',
    stats: 'GitHub Stats',
    achievements: 'GitHub Achievements',
    projects: 'Featured Projects',
    visitor: 'Visitor Counter',
    support: 'Support Me',
    quotes: 'Quotes Card',
    animatedComponents: 'Animated Components',
  };

  const analysisSections: DetectedSectionInfo[] = [];
  for (const secId of order) {
    const isCustom = secId.startsWith('custom_');
    const name = isCustom
      ? (customBlocks.find((b) => b.id === secId)?.title || 'Custom Section')
      : (sectionNameMap[secId] || secId);

    analysisSections.push({
      id: secId,
      sectionId: (isCustom ? 'custom' : secId) as SectionId,
      name,
      confidence: 100,
      lines: [1, ast.children[ast.children.length - 1]?.position?.end?.line || 1],
      status: 'Imported',
      details: isCustom ? 'Preserved custom layout markup.' : undefined,
    });
  }

  return {
    detectedSections: Array.from(new Set(order)),
    analysis: {
      sections: analysisSections,
      totalDetected: analysisSections.length,
    },
    data: resultData,
  };
}
