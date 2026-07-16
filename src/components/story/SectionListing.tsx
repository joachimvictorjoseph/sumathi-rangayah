import { content } from "@/lib/content";
import type { Section } from "@/lib/content/types";
import { SECTION_FILTERS } from "@/lib/content/categories";
import { PageBanner } from "@/components/layout/PageBanner";
import { FilterableStories } from "@/components/story/FilterableStories";

/**
 * Server component that powers every section listing page (Stories, Essays,
 * Journal, Reading Corner). Fetches the section's stories and hands them to the
 * client-side FilterableStories for instant pill filtering.
 */
export async function SectionListing({
  section,
  title,
  subtitle,
}: {
  section: Section;
  title: string;
  subtitle: string;
}) {
  const stories = await content.getStoriesBySection(section);
  const filters = SECTION_FILTERS[section];

  return (
    <>
      <PageBanner title={title} subtitle={subtitle} />
      <div className="container-page py-12">
        <FilterableStories stories={stories} filters={filters} />
      </div>
    </>
  );
}
