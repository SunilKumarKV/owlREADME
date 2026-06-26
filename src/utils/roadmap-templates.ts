export interface RoadmapTemplate {
  name: string;
  title: string;
  steps: string[];
}

export const ROADMAP_TEMPLATES: Record<string, RoadmapTemplate> = {
  frontend: {
    name: 'Frontend Developer',
    title: 'Frontend Developer Roadmap',
    steps: [
      'HTML & CSS: Web structures, accessibility (a11y), and modern layouts (Flexbox/Grid)',
      'JavaScript Fundamentals: DOM manipulation, Fetch API, async/await, and ES6+ features',
      'Version Control: Git workflows, commits, branch management, and GitHub collaboration',
      'Frontend Frameworks: React, Vue, or Angular single-page architectures',
      'Build Tools: Vite, npm/pnpm package managers, and bundler configurations',
      'CSS Frameworks: Styling with TailwindCSS, CSS Modules, or Sass preprocessors',
      'Testing & Deployment: Unit tests with Jest/Vitest, deploying on Vercel or Netlify',
    ],
  },
  backend: {
    name: 'Backend Developer',
    title: 'Backend Developer Roadmap',
    steps: [
      'Internet Basics: HTTP/HTTPS, URLs, DNS routing, and RESTful API structures',
      'Programming Language: Node.js (JavaScript/TypeScript), Python, Go, or Java',
      'Relational Databases: Database schemas, SQL queries, index optimization in PostgreSQL or MySQL',
      'NoSQL Databases: Schema-less storage with MongoDB and Redis key-value caching',
      'APIs & Middleware: Designing RESTful endpoints, API gateways, and GraphQL resolvers',
      'Authentication & Security: Implementing JWT, OAuth2, session cookies, and password hashing',
      'Testing & CI/CD: Unit testing backend endpoints, Docker containerization, and GitHub Actions',
    ],
  },
  fullstack: {
    name: 'Full Stack Developer',
    title: 'Full Stack Developer Roadmap',
    steps: [
      'Frontend Foundations: Responsive web layouts with HTML5, CSS3, and TailwindCSS',
      'Frontend Application Logic: Client-side logic in React/Next.js and client state management',
      'Backend Application Logic: Building server nodes using Node.js, Express, or NestJS',
      'Database Integrations: Connecting server models to PostgreSQL and MongoDB databases',
      'API Client-Server Bridges: CORS configuration, JSON payloads, and cookies transfer',
      'Authentication Strategy: Secure JSON Web Token routing across client headers and server verification',
      'Deployment & CI/CD: Deploying client to Vercel, server to Render/AWS, and Docker orchestration',
    ],
  },
  react: {
    name: 'React Developer',
    title: 'React Developer Roadmap',
    steps: [
      'React Fundamentals: JSX syntax, components, functional props, and state lifecycle',
      'React Hooks: Managing states and side effects with useState, useEffect, and custom hooks',
      'Global State Management: Managing global stores using Zustand, Redux Toolkit, or React Context',
      'Client Routing: URL routing and page layouts using React Router or Next.js App Router',
      'Component Styling: Advanced responsive styling with TailwindCSS or CSS-in-JS (styled-components)',
      'React Component Testing: Writing tests using React Testing Library and Jest/Vitest',
      'SSR & Meta Frameworks: Server-Side Rendering (SSR) and SSG optimization in Next.js',
    ],
  },
  nodejs: {
    name: 'Node.js Developer',
    title: 'Node.js Developer Roadmap',
    steps: [
      'NodeJS Architecture: Understanding Event Loop, asynchronous non-blocking I/O, and V8 engine',
      'Package Managers & CLI: Managing dependencies with npm/yarn/pnpm and writing Node CLI scripts',
      'Web Server Frameworks: Developing HTTP servers and middleware in Express.js or NestJS',
      'ORM/ODM Integrations: Typesafe database migrations using Prisma ORM or Mongoose ODM',
      'API Security: Protecting routes with Helmet, CORS security policies, and JSON Web Tokens',
      'Asynchronous Processing: Event processing queues using BullMQ, Redis, and workers',
      'Logging & Deployment: Standard logging with Winston, process monitoring with PM2, and Docker',
    ],
  },
  uiux: {
    name: 'UI/UX Designer',
    title: 'UI/UX Designer Roadmap',
    steps: [
      'Design Fundamentals: Typography scale, layout grids, visual hierarchy, and color theory',
      'UX Research & Flows: Creating user personas, information architecture, and wireframe layouts',
      'UI Vector Graphics: Vector shapes, layout layers, components, and auto-layout inside Figma',
      'Figma Design Systems: Crafting reusable UI components, type systems, and library styling tokens',
      'Interactive Prototyping: Micro-interactions, slide transitions, smart animate flows',
      'Usability Testing: Conducting user reviews, analyzing screen recordings, and heatmaps',
      'Developer Handoff: Documenting spec measurements, asset export formats (SVG/PNG), and CSS variables',
    ],
  },
  devops: {
    name: 'DevOps Engineer',
    title: 'DevOps Engineer Roadmap',
    steps: [
      'Linux Administration: Managing file layouts, SSH authentication, bash scripts, and systemd',
      'Networking & Encryption: DNS records, SSH keys, SSL/TLS certificates, reverse proxies, and firewalls',
      'Containerization: Packaging systems, directories, and dependencies inside Docker containers',
      'Container Orchestration: Scaling cluster states, pods, and load balancers inside Kubernetes',
      'Automated Pipelines: Automating build, test, and release flows in GitHub Actions or GitLab CI',
      'Infrastructure as Code (IaC): Provisioning cloud nodes using Terraform and managing configs with Ansible',
      'Monitoring & Alerting: Querying system metrics with Prometheus and visualizing data inside Grafana',
    ],
  },
};
