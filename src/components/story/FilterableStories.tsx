"use client";

import { useMemo, useState } from "react";
import type { CategorySlug, StorySummary } from "@/lib/content/types";
import { categoryLabel } from "@/lib/content/categories";
import { StoryGrid } from "./StoryGrid";

/**
 * Client-side filterable listing: pill tabs (All + categories) that filter the
 * card grid without a page reload. Filtering happens in the browser over the
 * already-loaded summaries, so it's instant.
 */
export function FilterableStories({
  stories,
  filters,
}: {
  stories: StorySummary[];
  filters: CategorySlug[];
}) {
  // `null` = "All".
  const [active, setActive] = useState<CategorySlug | null>(null);

  const visible = useMemo(() => {
    if (!active) return stories;
    return stories.filter((s) => s.categories.includes(active));
  }, [stories, active]);

  const pill = (isActive: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      isActive
        ? "border-plum bg-plum text-cream"
        : "border-plum/25 bg-transparent text-ink/70 hover:border-plum hover:text-plum"
    }`;

  return (
    <div>
      {/* Pill filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={pill(active === null)}
          aria-pressed={active === null}
        >
          All
        </button>
        {filters.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setActive(slug)}
            className={pill(active === slug)}
            aria-pressed={active === slug}
          >
            {categoryLabel(slug)}
          </button>
        ))}
      </div>

      <StoryGrid stories={visible} />
    </div>
  );
}
