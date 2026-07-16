import { content } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { LatestStories } from "@/components/home/LatestStories";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { QuoteBanner } from "@/components/home/QuoteBanner";

/**
 * Home page. Server component — fetches content at request/build time via the
 * active content provider (seed or Sanity), so the sections stay presentational.
 */
export default async function HomePage() {
  const latest = await content.getLatestStories(4);

  return (
    <>
      <Hero latestSlug={latest[0]?.slug} />
      <LatestStories stories={latest} />
      <CategoryStrip />
      <QuoteBanner />
    </>
  );
}
