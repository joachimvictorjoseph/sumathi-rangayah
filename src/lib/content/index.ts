import type { ContentProvider } from "./types";
import { seedProvider } from "./seed-provider";
import { sanityProvider } from "./sanity-provider";

/**
 * Single source of truth for "where does content come from?".
 *
 * The whole UI imports `content` from here and never touches a specific
 * backend. Switch backends with one env var — no component changes.
 *
 *   NEXT_PUBLIC_CONTENT_SOURCE=seed    (default, local data)
 *   NEXT_PUBLIC_CONTENT_SOURCE=sanity  (requires Sanity setup)
 */
const source = process.env.NEXT_PUBLIC_CONTENT_SOURCE ?? "seed";

export const content: ContentProvider =
  source === "sanity" ? sanityProvider : seedProvider;

export * from "./types";
export { CATEGORY_LABELS, SECTION_FILTERS, categoryLabel } from "./categories";
