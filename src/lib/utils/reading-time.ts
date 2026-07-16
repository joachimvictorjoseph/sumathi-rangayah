import type { StoryBlock } from "@/lib/content/types";

/**
 * Auto-calculate reading time.
 * Tamil is counted by characters (~300 chars/min for Tamil script reading),
 * English by words (~200 wpm). Minimum of 1 minute.
 */
export function calcReadingTime(body: StoryBlock[], language: "ta" | "en"): number {
  const text = body
    .map((b) => ("text" in b ? b.text : ""))
    .join(" ")
    .trim();

  if (language === "ta") {
    const chars = text.replace(/\s/g, "").length;
    return Math.max(1, Math.round(chars / 300));
  }

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
