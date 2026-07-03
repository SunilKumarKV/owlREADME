/**
 * Shared TypeScript types for the README Builder feature.
 *
 * Centralises all narrow union types so they can be imported consistently
 * across components, hooks, and utilities without re-declaration.
 */

/** The five top-level tabs in the builder sidebar. */
export type BuilderTabId = 'editor' | 'marketplace' | 'community' | 'analyzer' | 'improver';

/** Methods available in the README import wizard. */
export type ImportMethod = 'username' | 'repoUrl' | 'rawUrl' | 'paste' | 'upload';

/** Tabs inside the snapshot diff/compare view. */
export type DiffVisualTab = 'visual' | 'code' | 'summary';

/** Strategy for resolving README import conflicts with the active workspace. */
export type ConflictResolution = 'new' | 'overwrite' | 'merge';

/** Which panel is currently in fullscreen mode (null = none). */
export type FullscreenPanel = 'builder' | 'preview' | 'markdown' | null;

/** Active view on mobile where only one panel is shown at a time. */
export type MobileViewMode = 'builder' | 'preview' | 'markdown';

/** Animated component filter categories. */
export type AnimatedCategory = 'all' | 'headers' | 'dividers' | 'widgets';

/** Technology stack filter categories. */
export type TechCategory = 'All' | 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Tools';

/** Preview theme options, matching the theme-store union. */
export type Theme = 'minimal' | 'dark' | 'gradient' | 'terminal';

/** An entry in the AI Improver undo history. */
export interface ImproverHistoryEntry {
  section: string;
  originalText: string;
  improvedText: string;
}
