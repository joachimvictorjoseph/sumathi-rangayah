import type { Metadata } from "next";
import { SectionListing } from "@/components/story/SectionListing";

export const metadata: Metadata = {
  title: "Essays",
  description: "Thoughts on life, career and everything in between.",
};

export default function EssaysPage() {
  return (
    <SectionListing
      section="essays"
      title="Essays"
      subtitle="Thoughts on life, career and everything in between."
    />
  );
}
