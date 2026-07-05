# Release Notes: OwlREADME v1.1.0 (July 2026)

We are thrilled to announce the release of **OwlREADME v1.1.0**! This milestone version introduces a beautiful community showcase gallery for profile README inspiration and a robust version control snapshots system that lets developers manage workspace versions easily. 

We have also performed a rigorous stabilization sprint to resolve P0 and P1 issues, bringing ESLint error counts to **0** and introducing security hardening layers for our sharing and PDF exporting modules.

---

## 🚀 Key Highlights

### 1. README Showcase Gallery
Browse, search, inspect, and clone beautiful profile README designs!
- **Grid Gallery View**: Under `/gallery`, explore responsive profile cards showing developer info, tech tags, and theme preview styles.
- **Inspiration Overlay Modal**: Click any card to preview compiled markdown templates live, inspect raw Markdown code, or check layout statistics.
- **Instant Duplication**: Click **"Duplicate into Editor"** to instantly clone any template configurations directly into your active workspace session.

### 2. Client-Side Version History & Snapshots
Never lose your work! Track historical edits, compare changes, and restore specific fields.
- **Undo / Redo Stack**: Multiple undo/redo levels managed automatically, including full support for standard **Ctrl+Z** / **Ctrl+Y** shortcuts in all textareas/inputs.
- **Automatic Snapshots**: Automatically saves current configurations on major state modifications (style template switches and GitHub profile imports).
- **Manual Backups**: Create custom snapshots with titles and descriptions.
- **Side-by-Side Diff Modal**: Compare any snapshot version with active editor state using visual, code diff, or modified fields summary logs.
- **Granular Restores**: Load full configs or choose to overwrite only selected sections (e.g. name/role, skills list, tech badges, etc.).

---

## 🔒 Security Hardening

- **Share Payload Validation**: Enforced a size cap (256KB rejection) on sharing payloads and passed decoded data through strict `validateREADMEData`/`validateRoadmapData` schema checks.
- **Export Sanitization**: Integrated native DOMParser HTML sanitization inside the PDF generation stream to strip script injections, invalid tags, and event listener vectors.
- **Iframe Sandboxing**: Enabled strict iframe sandboxing policies inside the PDF print flow.

---

## 🛠️ Performance & Stability Improvements
- **ESLint Zero Errors**: Cleared all 179 linter errors across the codebase.
- **TypeScript Strict Safety**: Full compiler type-safety achieved.
- **Next.js Production Readiness**: The application bundle compiles successfully with static prerendering optimizing load speeds.
- **Test Coverage**: Expanded vitest test coverage, ensuring store stability and validation accuracy.

---

## 📦 Upgrading & Migration
If upgrading from a previous version, local workspace schemas persisted in your browser's local storage will remain intact. If you experience schema mismatches or missing fields on old profiles, you can click **"Clear All"** at the bottom of the Version Timeline panel to re-initialize your local database schema cleanly.

---

## 🗺️ What's Next?
In v1.2.0, we plan to release **GitHub OAuth sign-in integration** and **relational cloud syncing** with PostgreSQL/Firestore to support user accounts!
