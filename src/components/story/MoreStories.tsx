import Image from "next/image";
import Link from "next/link";
import type { StorySummary } from "@/lib/content/types";
import { formatDate } from "@/lib/utils/format";

/** Sidebar "More Stories" list on the reading page. */
export function MoreStories({ stories }: { stories: StorySummary[] }) {
  if (stories.length === 0) return null;

  return (
    <div className="rounded-xl border border-plum/10 bg-white/60 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
        More Stories
      </h3>

      <ul className="mt-4 space-y-4">
        {stories.map((story) => (
          <li key={story.slug}>
            <Link
              href={`/stories/${story.slug}`}
              className="group flex items-center gap-3"
            >
              <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={story.coverImageUrl}
                  alt={story.coverImageAlt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span
                  className="block truncate font-serif text-sm font-semibold text-ink transition-colors group-hover:text-plum"
                  lang={story.language === "ta" ? "ta" : undefined}
                >
                  {story.title}
                </span>
                <time className="text-xs text-muted" dateTime={story.publishedAt}>
                  {formatDate(story.publishedAt)}
                </time>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
