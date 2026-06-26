# OwlRoadmap Development Roadmap

This document outlines the current project status, completed milestones, and future plans for OwlRoadmap.

---

## 🏁 Completed Milestones

### v0.1.0 - Core Builders MVP
- [x] Initial React-Next.js application workspace scaffold.
- [x] Basic profile README editor with template selection.
- [x] Step-based roadmap curriculum generator.
- [x] Live raw markdown compilation preview.
- [x] Minimal text downloads.

### v0.5.0 - Workspace Suite & Security (Current Release)
- [x] **Secure AI Integration**: Routed Gemini calls through next.js route handler to keep api keys server-side.
- [x] **Zustand Workspace Hub**: Saved, cloned, renamed, and auto-restored multiple local project workspace caches.
- [x] **SVG Analytics Panel**: Built dynamic languages, export frequency, and scheduling timeline charts.
- [x] **Polished Landing Page**: Designed SaaS visual showcase, feature grid, tab previews, and FAQ accordions.
- [x] **Export Studio Improvements**: Multi-file JSZip packaging, styled print PDFs, and clipboard operations.
- [x] **W3C Semantic a11y**: Coupled label structures, group selectors, and ARIA properties.

---

## 📍 Current Status

OwlRoadmap is fully client-side operational. It leverages local caches (`localStorage`) to auto-save and restore states, guaranteeing complete privacy and zero hosting requirements. Dynamic AI features are securely routed to protect credentials.

---

## 🔮 Future Plans

### v1.0.0 - Production Readiness & Auth
- **GitHub OAuth Login**: Switch from simple public query fetching to official login, allowing access to private repositories and higher API rate limits.
- **Relational Cloud Sync**: Integrate PostgreSQL or Firebase Firestore database tables to support account-based workspace sync across devices.
- **Sitemap Indexing & Shared Preview SEO**: Generate static prerendered share pages to index roadmaps on search engines.

### v2.0.0 - Collaboration & Advanced Visuals
- **Interactive Node Editor**: Switch the simple list-based roadmap builder to a visual canvas with nodes, dependencies, and drag-and-drop connections.
- **Team Workspaces**: Support shared organizations where multiple developers can view, comment on, and edit roadmaps together.
- **Import/Export Extensions**: Integrate direct publication to GitHub Profile repositories (`/username/username/README.md`) via API commits.
