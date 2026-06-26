import { GitHubRepo } from './github-api';
import { RepoAnalysisResult } from '@/stores/readme-store';

/**
 * Maps all topics and languages found in the repositories to cleaner, user-friendly skills.
 */
const SKILL_MAP: { [key: string]: string } = {
  react: 'React',
  vue: 'Vue.js',
  angular: 'Angular',
  svelte: 'Svelte',
  'next.js': 'Next.js',
  nextjs: 'Next.js',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  node: 'Node.js',
  nodejs: 'Node.js',
  express: 'Express.js',
  python: 'Python',
  django: 'Django',
  flask: 'Flask',
  fastapi: 'FastAPI',
  'spring-boot': 'Spring Boot',
  spring: 'Spring Boot',
  laravel: 'Laravel',
  rails: 'Ruby on Rails',
  ruby: 'Ruby',
  rust: 'Rust',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  aws: 'AWS',
  gcp: 'Google Cloud',
  firebase: 'Firebase',
  supabase: 'Supabase',
  postgresql: 'PostgreSQL',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
  redis: 'Redis',
  graphql: 'GraphQL',
  tailwind: 'Tailwind CSS',
  flutter: 'Flutter',
  'react-native': 'React Native',
  html: 'HTML5',
  css: 'CSS3',
  sass: 'Sass',
  go: 'Go',
  golang: 'Go',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  'c++': 'C++',
  rustlang: 'Rust',
};

/**
 * Analyzes the list of GitHub repositories to extract development statistics and generate recommendations.
 */
export function analyzeRepositories(repos: GitHubRepo[]): RepoAnalysisResult {
  // Filter out forks for more precise personal statistics, unless user has only forks
  let ownRepos = repos.filter((r) => !r.fork);
  if (ownRepos.length === 0) {
    ownRepos = repos;
  }

  const totalStars = ownRepos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = ownRepos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  // 1. Language Breakdown
  const languageCounts: { [key: string]: number } = {};
  ownRepos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // 2. Most Starred Repositories (Top 5)
  const topStarred = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((r) => ({
      name: r.name,
      stars: r.stargazers_count,
      description: r.description || 'No description provided.',
      url: r.html_url,
    }));

  // 3. Most Active Repositories (Top 5 by pushed_at or updated_at)
  const topActive = [...ownRepos]
    .sort((a, b) => {
      const dateA = new Date(a.pushed_at || a.updated_at || 0).getTime();
      const dateB = new Date(b.pushed_at || b.updated_at || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5)
    .map((r) => {
      const lastDate = r.pushed_at || r.updated_at || new Date().toISOString();
      return {
        name: r.name,
        lastUpdated: lastDate,
        description: r.description || 'No description provided.',
        url: r.html_url,
      };
    });

  // 4. Skills & Tech Stack Extraction
  const allIdentifiers = new Set<string>();
  repos.forEach((repo) => {
    if (repo.topics) {
      repo.topics.forEach((t) => allIdentifiers.add(t.toLowerCase()));
    }
    if (repo.language) {
      allIdentifiers.add(repo.language.toLowerCase());
    }
  });

  const suggestedSkills: string[] = [];
  allIdentifiers.forEach((id) => {
    if (SKILL_MAP[id]) {
      suggestedSkills.push(SKILL_MAP[id]);
    }
  });

  // Fallback to primary languages if topics list is small
  languages.forEach((lang) => {
    const key = lang.name.toLowerCase();
    const prettyName = SKILL_MAP[key] || lang.name;
    if (!suggestedSkills.includes(prettyName)) {
      suggestedSkills.push(prettyName);
    }
  });

  const finalSkills = Array.from(new Set(suggestedSkills)).slice(0, 12);
  const finalTechStack = Array.from(new Set([...languages.map((l) => l.name), ...finalSkills])).slice(0, 10);

  // 5. Suggested README Sections
  const suggestedReadmeSections = [
    {
      title: '🛠️ Core Tech Stack',
      content: `Frontend Development: ${finalSkills
        .filter((s) => ['React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'].includes(s))
        .join(', ') || 'TypeScript, React'}\nBackend / DevOps: ${finalSkills
        .filter((s) => ['Node.js', 'Python', 'Go', 'Express.js', 'FastAPI', 'Docker', 'PostgreSQL'].includes(s))
        .join(', ') || 'Node.js'}`,
    },
    {
      title: '📊 Repository Insights',
      content: `A quantitative look at my public repositories:\n\n${
        languages.length
          ? languages.map((l) => `- **${l.name}**: ${l.count} project${l.count > 1 ? 's' : ''}`).join('\n')
          : '- No public project languages indexed'
      }`,
    },
    {
      title: '📂 Featured Contributions',
      content:
        topStarred.length > 0
          ? topStarred
              .map((r) => `- [${r.name}](${r.url}) - ${r.description} (⭐ ${r.stars})`)
              .join('\n')
          : '- No featured repositories loaded.',
    },
  ];

  return {
    languages,
    topStarred,
    topActive,
    suggestedSkills: finalSkills,
    suggestedTechStack: finalTechStack,
    suggestedReadmeSections,
    totalStars,
    totalForks,
  };
}
