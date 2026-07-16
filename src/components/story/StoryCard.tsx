import Image from "next/image";
import Link from "next/link";
import type { StorySummary } from "@/lib/content/types";
import { categoryLabel } from "@/lib/content/categories";
import { formatDate, formatReadingTime } from "@/lib/utils/format";

/**
 * Story card: cover image, uppercase category tag, serif title, one-line
 * excerpt, date + reading time. Used on the home grid and all listing pages.
 * Fully responsive — the parent grid controls columns.
 */
export function StoryCard({ story }: { story: StorySummary }) {
  const href = `/stories/${story.slug}`;
  const primaryCategory = story.categories[0];
  const isTamil = story.language === "ta";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-plum/10 bg-white/60 shadow-card transition-transform duration-200 hover:-translate-y-1">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={story.coverImageUrl}
          alt={story.coverImageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {primaryCategory && (
          <span className="category-tag">{categoryLabel(primaryCategory)}</span>
        )}

        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-plum">
            <span lang={isTamil ? "ta" : undefined}>{story.title}</span>
          </Link>
        </h3>

        <p
          className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted"
          lang={isTamil ? "ta" : undefined}
        >
          {story.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted">
          <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{formatReadingTime(story.readingTimeMinutes)}</span>
        </div>
      </div>
    </article>
  );
}
