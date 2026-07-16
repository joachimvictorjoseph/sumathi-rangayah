import type {
  ContentProvider,
  Section,
  Story,
  StorySummary,
  StoryBlock,
} from "./types";

/**
 * Sanity CMS content provider.
 *
 * This is the Phase-1 "publish without code" backend. It implements the same
 * ContentProvider interface as the seed provider, so switching is a one-line
 * change in provider.ts (driven by NEXT_PUBLIC_CONTENT_SOURCE=sanity).
 *
 * The `next-sanity`/`@sanity/image-url` packages are OPTIONAL dependencies --
 * install them only when you enable the CMS (see package.json comment_sanity).
 * We load them via *variable-specifier* dynamic imports so the project still
 * type-checks and builds when they are absent and the seed provider is used.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

async function loadDep(name: string): Promise<any> {
  // Variable specifier keeps TypeScript/webpack from resolving at build time.
  return import(/* webpackIgnore: true */ name);
}

let _client: any | null = null;

async function getClient(): Promise<any> {
  if (_client) return _client;
  if (!PROJECT_ID) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Configure Sanity or set NEXT_PUBLIC_CONTENT_SOURCE=seed.",
    );
  }
  const { createClient } = await loadDep("next-sanity");
  _client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: true,
    perspective: "published",
  });
  return _client;
}

/** Resolve a Sanity image asset ref to a CDN URL. */
async function imageUrl(source: any): Promise<string> {
  if (!source) return "";
  const { default: imageUrlBuilder } = await loadDep("@sanity/image-url");
  return imageUrlBuilder({ projectId: PROJECT_ID, dataset: DATASET })
    .image(source)
    .width(1200)
    .fit("crop")
    .url();
}

/** Convert Sanity Portable Text into our neutral StoryBlock[] model. */
function toBlocks(portableText: any[]): StoryBlock[] {
  if (!Array.isArray(portableText)) return [];
  return portableText
    .filter((b) => b?._type === "block")
    .map((b): StoryBlock => {
      const text = (b.children || []).map((c: any) => c.text).join("");
      if (b.style === "h2" || b.style === "h3") return { _type: "heading", text };
      if (b.style === "blockquote") return { _type: "pullquote", text };
      return { _type: "paragraph", text };
    });
}

// GROQ projections ------------------------------------------------------------
const SUMMARY_FIELDS = `
  "slug": slug.current,
  title,
  language,
  section,
  "categories": categories,
  coverImage,
  "coverImageAlt": coverImage.alt,
  excerpt,
  publishedAt,
  readingTimeMinutes
`;

async function mapSummary(doc: any): Promise<StorySummary> {
  return {
    slug: doc.slug,
    title: doc.title,
    language: doc.language,
    section: doc.section,
    categories: doc.categories ?? [],
    coverImageUrl: await imageUrl(doc.coverImage),
    coverImageAlt: doc.coverImageAlt ?? doc.title,
    excerpt: doc.excerpt ?? "",
    publishedAt: doc.publishedAt,
    readingTimeMinutes: doc.readingTimeMinutes ?? 1,
  };
}

export const sanityProvider: ContentProvider = {
  async getAllStories() {
    const client = await getClient();
    const docs = await client.fetch(
      `*[_type == "story"] | order(publishedAt desc){${SUMMARY_FIELDS}}`,
    );
    return Promise.all(docs.map(mapSummary));
  },

  async getStoriesBySection(section: Section) {
    const client = await getClient();
    const docs = await client.fetch(
      `*[_type == "story" && section == $section] | order(publishedAt desc){${SUMMARY_FIELDS}}`,
      { section },
    );
    return Promise.all(docs.map(mapSummary));
  },

  async getStoryBySlug(slug: string): Promise<Story | null> {
    const client = await getClient();
    const doc = await client.fetch(
      `*[_type == "story" && slug.current == $slug][0]{
        ${SUMMARY_FIELDS},
        body,
        template,
        "author": author->{name, bio, "avatarUrl": avatar.asset->url}
      }`,
      { slug },
    );
    if (!doc) return null;
    const summary = await mapSummary(doc);
    return {
      ...summary,
      body: toBlocks(doc.body),
      template: doc.template ?? "standard",
      author: doc.author ?? { name: "Sumathi Rangayah", bio: "", avatarUrl: "" },
    };
  },

  async getMoreStories(excludeSlug: string, limit = 3) {
    const client = await getClient();
    const docs = await client.fetch(
      `*[_type == "story" && slug.current != $slug] | order(publishedAt desc)[0...$limit]{${SUMMARY_FIELDS}}`,
      { slug: excludeSlug, limit },
    );
    return Promise.all(docs.map(mapSummary));
  },

  async getLatestStories(limit = 4) {
    const client = await getClient();
    const docs = await client.fetch(
      `*[_type == "story"] | order(publishedAt desc)[0...$limit]{${SUMMARY_FIELDS}}`,
      { limit },
    );
    return Promise.all(docs.map(mapSummary));
  },
};
