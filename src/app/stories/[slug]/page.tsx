import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { categoryLabel } from "@/lib/content/categories";
import { formatDate, formatReadingTime, languageLabel } from "@/lib/utils/format";
import { blocksToPlainText } from "@/lib/utils/blocks";
import { ListenBar } from "@/components/story/ListenBar";
import { StoryRenderer } from "@/components/story/StoryRenderer";
import { AuthorCard } from "@/components/story/AuthorCard";
import { MoreStories } from "@/components/story/MoreStories";
import { ShareRow } from "@/components/story/ShareRow";

interface Params {
  params: { slug: string };
}

/** Pre-render a page for every story at build time. */
export async function generateStaticParams() {
  const stories = await content.getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const story = await content.getStoryBySlug(params.slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [story.coverImageUrl],
      type: "article",
    },
  };
}

export default async function StoryPage({ params }: Params) {
  const story = await content.getStoryBySlug(params.slug);
  if (!story) notFound();

  const moreStories = await content.getMoreStories(story.slug, 3);
  const isTamil = story.language === "ta";
  const primaryCategory = story.categories[0];
  const listenText = `${story.title}. ${blocksToPlainText(story.body)}`;

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* ---------------- Article ---------------- */}
      <article className="min-w-0">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/stories" className="hover:text-plum">
            Stories
          </Link>
          {primaryCategory && (
            <>
              <span className="mx-1.5">/</span>
              <span className="category-tag">{categoryLabel(primaryCategory)}</span>
            </>
          )}
        </nav>

        <h1
          className="font-serif text-3xl leading-tight text-ink sm:text-4xl"
          lang={isTamil ? "ta" : undefined}
        >
          {story.title}
        </h1>

        {/* Meta row: date · reading time · language + share */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-plum/10 pb-5">
          <div className="flex items-center gap-2 text-sm text-muted">
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
            <span aria-hidden="true">•</span>
            <span>{formatReadingTime(story.readingTimeMinutes)}</span>
            <span aria-hidden="true">•</span>
            <span>{languageLabel(story.language)}</span>
          </div>
          <ShareRow title={story.title} slug={story.slug} />
        </div>

        {/* LISTEN bar — isolated, engine-swappable (Phase 2) */}
        <div className="mt-6">
          <ListenBar text={listenText} language={story.language} />
        </div>

        {/* Cover image */}
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={story.coverImageUrl}
            alt={story.coverImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover"
          />
        </div>

        {/* Body (template-aware renderer) */}
        <StoryRenderer story={story} />
      </article>

      {/* ---------------- Sidebar ---------------- */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
        <AuthorCard author={story.author} />
        <MoreStories stories={moreStories} />
      </aside>
    </div>
  );
}
