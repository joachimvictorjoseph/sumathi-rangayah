import type { Metadata } from "next";
import { SectionListing } from "@/components/story/SectionListing";

export const metadata: Metadata = {
  title: "Reading Corner",
  description: "Books, poems and quotes worth returning to.",
};

export default function ReadingCornerPage() {
  return (
    <SectionListing
      section="reading-corner"
      title="Reading Corner"
      subtitle="Books, poems and quotes worth returning to."
    />
  );
}
