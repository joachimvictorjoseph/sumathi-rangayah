import type { StoryBlock } from "@/lib/content/types";

/** Flatten story blocks into one plain-text string (for TTS / metadata). */
export function blocksToPlainText(body: StoryBlock[]): string {
  return body
    .map((b) => ("text" in b ? b.text : ""))
    .filter(Boolean)
    .join("\n\n");
}
