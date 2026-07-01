# 🦉 OwlREADME

OwlREADME is a professional, visual developer workspace that allows you to instantly generate GitHub Profile READMEs, customize step-by-step learning roadmaps, consult AI assistants for resume and timeline suggestions, and track repository metrics in dynamic, interactive dashboards.

Built with Next.js, React, and Tailwind CSS, OwlREADME runs entirely in the browser with offline-first local storage, allowing you to manage multiple project workspaces seamlessly.

---

## 🚀 Features

- **GitHub Repository Analyzer**: Automatically scans public repositories to calculate language frequencies, identify top starred/active repos, and suggest tech skills.
- **Sleek Profile README Editor**: Build professional markdown profiles with live preview, social badges, location pins, and custom section overlays.
- **Milestone Roadmap Designer**: Map learning curriculums with timeline flows, using built-in pre-fills or blank custom templates.
- **Secure Server-Routed Owl AI**: Get smart bio taglines, portfolio write-ups, and next-topic recommendations. Calls are proxied through a secure server-side API to protect credentials.
- **Interactive SVG Analytics Charts**: View data distributions for programming languages, exports history, and push schedules.
- **Multi-Workspace Hub**: Manage, rename, duplicate, and swap between multiple project workspaces with debounced local auto-saving.
- **Export Studio**: Download files (`README.md`, `roadmap.md`), package workspaces into ZIP archives, print PDF summaries, or copy public share URLs.

---

## 📸 Screenshots & Showcase

| Product Dashboard | Interactive Workspace Builder |
| --- | --- |
| ![Dashboard Screenshot Placeholder](https://raw.githubusercontent.com/SunilKumarKV/owlroadmap/main/public/og-image.jpg) | ![Builder Screenshot Placeholder](https://raw.githubusercontent.com/SunilKumarKV/owlroadmap/main/public/og-image.jpg) |
| *View repository statistics, language graphs, and recent work* | *Build and customize live markdown profiles and milestones* |

| SVG Analytics Console | Owl AI Assistant |
| --- | --- |
| ![Analytics Screenshot Placeholder](https://raw.githubusercontent.com/SunilKumarKV/owlroadmap/main/public/og-image.jpg) | ![AI Assistant Screenshot Placeholder](https://raw.githubusercontent.com/SunilKumarKV/owlroadmap/main/public/og-image.jpg) |
| *Visualize commit activities, repo breakdown, and export logs* | *Get smart bio recommendations and next-step guides* |

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router, Turbopack)
- **Library**: React (v19)
- **Styling**: Tailwind CSS & Vanilla CSS variable overrides
- **State Management**: Zustand (with Persist localStorage middleware)
- **Icons**: Lucide React
- **Markdown Editor**: `@uiw/react-md-editor` (dynamic SSR-disabled load)
- **ZIP Compression**: `jszip`

---

## 📦 Installation & Setup

To run OwlREADME locally, ensure you have Node.js (v18+) and `pnpm` installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SunilKumarKV/owlroadmap.git
   cd owlroadmap
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory. You can copy the template provided in [.env.example](file:///Users/sunilkumarkv/Desktop/Projects/owlroadmap/.env.example):
   ```bash
   cp .env.example .env.local
   ```
   Add your keys:
   ```env
   # Secure Server-Side Gemini API Key (Optional, for AI Assistant)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Public App URL for Sitemap / Share Links
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   pnpm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the SaaS landing page.

---

## 📖 Usage Guide

1. **Onboarding**: Type your GitHub username on the landing page and click **Get Started** (or click **Open Dashboard** to start a blank custom workspace).
2. **Dashboard**: Navigate your workspace card modules:
   - **Apply Suggestions**: Apply repository languages and starred projects to your README profile immediately.
   - **Consult Owl AI**: Generate AI-powered descriptions and roadmap steps.
3. **Builders**: Click **Create / Edit README** or **Roadmap** to modify content.
4. **Themes**: Toggle visual theme modes (*Minimal*, *Dark*, *Gradient*, *Terminal*) in the Theme page.
5. **Exporting**: Go to **Export Studio** to download, copy, print, or generate encoded sharing links.

---

## 🚀 Production Deployment

OwlREADME is optimized for zero-config deployment on Vercel or modern container hosts. For detailed hosting instructions, custom domains setup, and analytics integration, refer to the [Deployment Guide](file:///Users/sunilkumarkv/Desktop/Projects/owlroadmap/docs/deployment.md).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSunilKumarKV%2Fowlroadmap)

---

## 🗺️ Roadmap & Plans

See the full roadmap in [ROADMAP.md](file:///Users/sunilkumarkv/Desktop/Projects/owlroadmap/ROADMAP.md).
- [x] v0.1.0: Core markdown generators & template pre-fills.
- [x] v0.5.0: Zustand workspaces, secure API route, SVG analytics, and SaaS landing.
- [ ] v1.0.0: Public database sync, OAuth GitHub login, and team collaboration mode.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on commit conventions, setup flows, and the pull request process.

### 🌱 New to Open Source?

Browse our curated [Good First Issues](docs/good-first-issues.md) — every task includes a clear hint and the exact files to look at. Maintainers are available to mentor first-time contributors.

### 📣 Community

| Resource | Link |
| --- | --- |
| 💬 Discussions | [GitHub Discussions](https://github.com/SunilKumarKV/owlroadmap/discussions) |
| 🏷️ Labels Reference | [docs/labels.md](docs/labels.md) |
| 🤝 Community Guidelines | [docs/community-guidelines.md](docs/community-guidelines.md) |
| 📋 Release Notes | [docs/release-notes.md](docs/release-notes.md) |
| ⚖️ Code of Conduct | [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
