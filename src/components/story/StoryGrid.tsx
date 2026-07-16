import type { StorySummary } from "@/lib/content/types";
import { StoryCard } from "./StoryCard";

/** Responsive card grid: 1 col mobile → 2 → 4 on wide screens. */
export function StoryGrid({ stories }: { stories: StorySummary[] }) {
  if (stories.length === 0) {
    return (
      <p className="py-16 text-center text-muted">
        No stories here yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stories.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </div>
  );
}
