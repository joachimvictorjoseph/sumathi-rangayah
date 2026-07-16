import type { Language } from "@/lib/content/types";

/** Format an ISO date as e.g. "May 12, 2025". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "5 min read" */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function languageLabel(language: Language): string {
  return language === "ta" ? "தமிழ்" : "English";
}
