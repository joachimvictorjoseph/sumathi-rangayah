/**
 * Core content model — shared by every content provider (seed, Sanity, …).
 * Keep this framework-agnostic: no React, no Next imports here.
 */

export type Language = "ta" | "en";

/** Section the piece belongs to — drives which top-nav listing it appears under. */
export type Section = "stories" | "essays" | "journal" | "reading-corner";

/**
 * Free-form category used for the pill filters on listing pages.
 * Slugs are stable; labels live in `categories.ts`.
 */
export type CategorySlug =
  | "tamil-stories"
  | "english-stories"
  | "flash-fiction"
  | "mystery"
  | "family"
  | "romance"
  | "slice-of-life"
  | "essays"
  | "reading-journal"
  | "poetry"
  | "life-notes";

/**
 * Story body is an ordered list of blocks. Today we only need paragraphs and
 * headings, but the discriminated union lets Phase 3 ("visual story") add
 * `image`, `pullquote`, `scene`, etc. without breaking existing renderers.
 */
export type StoryBlock =
  | { _type: "paragraph"; text: string }
  | { _type: "heading"; text: string }
  | { _type: "pullquote"; text: string };

/**
 * Template controls how the reading page renders a story.
 * Phase 1 ships "standard". Phase 3 adds "visual" (illustrated / scrollytelling)
 * as a new branch in <StoryRenderer/> — no changes needed to existing stories.
 */
export type StoryTemplate = "standard" | "visual";

export interface Author {
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface Story {
  /** URL slug, unique across the site. */
  slug: string;
  title: string;
  language: Language;
  section: Section;
  categories: CategorySlug[];
  coverImageUrl: string;
  coverImageAlt: string;
  excerpt: string;
  body: StoryBlock[];
  author: Author;
  /** ISO date string (publish date). */
  publishedAt: string;
  /** Minutes; auto-calculated at author time or on ingest. */
  readingTimeMinutes: number;
  template: StoryTemplate;
}

/** Lightweight shape for cards / lists (avoids shipping full bodies to listing pages). */
export interface StorySummary {
  slug: string;
  title: string;
  language: Language;
  section: Section;
  categories: CategorySlug[];
  coverImageUrl: string;
  coverImageAlt: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
}

/**
 * Every content backend implements this interface. Swapping seed → Sanity is a
 * one-line change in `provider.ts`; nothing in the UI layer needs to know.
 */
export interface ContentProvider {
  getAllStories(): Promise<StorySummary[]>;
  getStoriesBySection(section: Section): Promise<StorySummary[]>;
  getStoryBySlug(slug: string): Promise<Story | null>;
  /** Related items for the sidebar (excludes the current slug). */
  getMoreStories(excludeSlug: string, limit?: number): Promise<StorySummary[]>;
  getLatestStories(limit?: number): Promise<StorySummary[]>;
}
