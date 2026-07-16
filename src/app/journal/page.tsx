import type { Metadata } from "next";
import { SectionListing } from "@/components/story/SectionListing";

export const metadata: Metadata = {
  title: "Journal",
  description: "Reading notes, lessons and little moments of life.",
};

export default function JournalPage() {
  return (
    <SectionListing
      section="journal"
      title="Journal"
      subtitle="Reading notes, lessons and little moments of life."
    />
  );
}
