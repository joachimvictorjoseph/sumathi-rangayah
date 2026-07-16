import Link from "next/link";
import type { StorySummary } from "@/lib/content/types";
import { StoryGrid } from "@/components/story/StoryGrid";
import { ArrowRightIcon } from "@/components/ui/icons";

/** "Latest from the blog" — heading + view-all link + 4-card grid. */
export function LatestStories({ stories }: { stories: StorySummary[] }) {
  return (
    <section className="container-page py-12">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">
          Latest from the blog
        </h2>
        <Link
          href="/stories"
          className="inline-flex items-center gap-1 text-sm font-medium text-plum hover:underline"
        >
          View all stories <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <StoryGrid stories={stories} />
    </section>
  );
}
