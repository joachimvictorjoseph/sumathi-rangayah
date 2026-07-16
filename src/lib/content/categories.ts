import type { CategorySlug, Section } from "./types";

/** Human-readable labels for every category slug. */
export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  "tamil-stories": "Tamil Stories",
  "english-stories": "English Stories",
  "flash-fiction": "Flash Fiction",
  mystery: "Mystery",
  family: "Family",
  romance: "Romance",
  "slice-of-life": "Slice of Life",
  essays: "Essays",
  "reading-journal": "Reading Journal",
  poetry: "Poetry",
  "life-notes": "Life Notes",
};

/**
 * Filter pills shown on each listing page, in display order.
 * "All" is handled by the UI as a special reset state.
 */
export const SECTION_FILTERS: Record<Section, CategorySlug[]> = {
  stories: [
    "tamil-stories",
    "english-stories",
    "flash-fiction",
    "mystery",
    "family",
    "romance",
    "slice-of-life",
  ],
  essays: ["essays", "life-notes"],
  journal: ["reading-journal", "life-notes"],
  "reading-corner": ["reading-journal", "poetry"],
};

export function categoryLabel(slug: CategorySlug): string {
  return CATEGORY_LABELS[slug] ?? slug;
}
