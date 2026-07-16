import type {
  ContentProvider,
  Section,
  Story,
  StorySummary,
} from "./types";
import { SEED_STORIES, type RawStory } from "./seed/stories";
import { AUTHOR } from "./seed/author";
import { calcReadingTime } from "@/lib/utils/reading-time";

/**
 * Local, zero-dependency content provider. Powers the site out of the box so it
 * is viewable immediately. Implements the same interface as the Sanity provider.
 */

function hydrate(raw: RawStory): Story {
  return {
    ...raw,
    template: raw.template ?? "standard",
    author: AUTHOR,
    readingTimeMinutes: calcReadingTime(raw.body, raw.language),
  };
}

function toSummary(s: Story): StorySummary {
  const { body: _body, author: _author, template: _template, ...summary } = s;
  return summary;
}

// Build once at module load, newest first.
const STORIES: Story[] = SEED_STORIES.map(hydrate).sort(
  (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
);

export const seedProvider: ContentProvider = {
  async getAllStories() {
    return STORIES.map(toSummary);
  },

  async getStoriesBySection(section: Section) {
    return STORIES.filter((s) => s.section === section).map(toSummary);
  },

  async getStoryBySlug(slug: string) {
    return STORIES.find((s) => s.slug === slug) ?? null;
  },

  async getMoreStories(excludeSlug: string, limit = 3) {
    return STORIES.filter((s) => s.slug !== excludeSlug)
      .slice(0, limit)
      .map(toSummary);
  },

  async getLatestStories(limit = 4) {
    return STORIES.slice(0, limit).map(toSummary);
  },
};
