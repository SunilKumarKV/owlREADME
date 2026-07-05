# 🌱 Good First Issues — Contribution Guide

Welcome! This document lists well-scoped, beginner-friendly tasks that are perfect for your first contribution to OwlREADME.

Each task includes an estimated difficulty level, the affected area, and a hint to get you started. For full setup instructions, see [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## 🚀 How to Claim an Issue

1. Find an issue below that interests you.
2. Go to its linked GitHub issue (or open a new one referencing this doc).
3. Comment: **"I'd like to work on this!"** — a maintainer will assign it to you.
4. Open a branch following the naming convention: `feat/<short-description>` or `fix/<short-description>`.
5. Submit a Draft PR early — we love seeing work in progress!

---

## 🟢 Beginner — No prior codebase knowledge needed

These tasks require only basic HTML, CSS, or Markdown knowledge.

| # | Task | Area | Hint |
| --- | --- | --- | --- |
| 1 | Fix a typo or grammar issue in `README.md`, `CONTRIBUTING.md`, or `docs/` | Documentation | Read through the docs and open a PR with corrections |
| 2 | Add a missing `alt` attribute to an `<img>` element across any component | Accessibility | Search for `<img` without `alt=` in `src/` |
| 3 | Improve the placeholder text in any input or textarea field | UI / UX | Search for `placeholder="` in `src/features/` |
| 4 | Add a `title` tooltip to any icon-only button that is missing one | Accessibility | Look for `<button>` tags that contain only a Lucide `<Icon />` with no visible text |
| 5 | Add a missing heading tag or semantic landmark to a page | Accessibility | Use browser DevTools to inspect heading hierarchy on any page |

---

## 🟡 Intermediate — Requires TypeScript or React knowledge

| # | Task | Area | Hint |
| --- | --- | --- | --- |
| 6 | Add a "Clear All" button to the Export History log in the Export Studio | Export Studio | The export history is stored in `readme-store.ts` as `exportHistory[]`; add a `clearExportHistory()` action and wire a button in `ExportCenterPage.tsx` |
| 7 | Add a character counter below the `About Me` textarea in the README Builder | README Builder | Read the `about` field length from the Zustand `useReadmeStore` hook and display `X / 300 characters` beneath the textarea |
| 8 | Add a "Reset to Default" button to the Theme selector page | Themes | Call `setTheme('minimal')` from `useReadmeStore` when the button is clicked |
| 9 | Add a `word count` stat to the Preview page sidebar | Preview | Count words in the generated markdown string and display the result |
| 10 | Add keyboard shortcut (`Ctrl+S`) to manually trigger workspace save | Workspace | Listen for `keydown` events inside a `useEffect` hook and call the Zustand workspace save action |

---

## 🔴 Advanced — Requires deeper architecture understanding

| # | Task | Area | Hint |
| --- | --- | --- | --- |
| 11 | Add support for a new README section: "Open Source Contributions" | README Builder | Add a new optional field to the README data model in `readme-store.ts`, a corresponding form field in `READMEBuilderPage.tsx`, and update `generateReadmeMarkdown()` in `markdown.ts` |
| 12 | Implement a dark/light mode toggle button in the navigation header | Themes | Add a `<button>` that toggles a `dark` class on `<html>` using a new Zustand theme action |
| 13 | Add a roadmap step reordering UI with drag handles | Roadmap Builder | Implement a pure CSS/JS drag-and-drop reorder (no libraries) or integrate `@dnd-kit/core` |
| 14 | Write a custom `useDebounce` hook and replace the inline debounce in the workspace store | Workspace | Create `src/utils/hooks/useDebounce.ts` and refactor the auto-save subscription to use it |
| 15 | Implement a shareable workspace URL (encode entire workspace into a query param) | Share Pages | Reuse the existing `encodeShareData` / `decodeShareData` utilities in `share-utils.ts` |

---

## 📌 Notes for Maintainers

- When a task above is claimed and in progress, open a corresponding GitHub issue and apply the `good first issue` + `in-progress` labels.
- When completed, link the PR to this doc's issue to keep the list up to date.
- New tasks can be added to this document as the codebase grows.
