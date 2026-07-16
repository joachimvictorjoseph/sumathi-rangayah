import type { Metadata } from "next";
import { SectionListing } from "@/components/story/SectionListing";

export const metadata: Metadata = {
  title: "Stories",
  description: "Fictional worlds, real emotions.",
};

export default function StoriesPage() {
  return (
    <SectionListing
      section="stories"
      title="Stories"
      subtitle="Fictional worlds, real emotions."
    />
  );
}
