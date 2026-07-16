import type { Story } from "@/lib/content/types";
import { StoryBody } from "./StoryBody";

/**
 * Chooses how a story is rendered based on `story.template`.
 *
 * PHASE EXTENSION POINT:
 *   "standard" → normal reading layout (Phase 1, shipping now).
 *   "visual"   → illustrated / scrollytelling layout (Phase 3). Add the branch
 *                below and a <VisualStory/> component; nothing else changes.
 *
 * Keeping this switch here means the reading page never needs to know about
 * template variants — it just renders <StoryRenderer story={story} />.
 */
export function StoryRenderer({ story }: { story: Story }) {
  switch (story.template) {
    // case "visual":
    //   return <VisualStory story={story} />; // Phase 3
    case "standard":
    default:
      return <StoryBody body={story.body} language={story.language} />;
  }
}
