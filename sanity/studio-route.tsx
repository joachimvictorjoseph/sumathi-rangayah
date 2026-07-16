/**
 * EMBEDDED SANITY STUDIO ROUTE (activation template).
 *
 * This file is intentionally kept OUT of the Next.js app during Phase 1 so the
 * site builds without the Sanity packages. To turn on the embedded Studio:
 *
 *   1. Install the CMS packages (see package.json → comment_sanity).
 *   2. Copy this file to:  src/app/admin/studio/[[...tool]]/page.tsx
 *   3. Copy sanity/sanity.config.ts to the project ROOT as sanity.config.ts
 *      (adjust the "./schemas" import path to "./sanity/schemas").
 *   4. Remove the "sanity" entry from tsconfig.json "exclude".
 *   5. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_CONTENT_SOURCE=sanity.
 *
 * The writer then logs in at /admin/studio to publish — no code required.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config"; // adjust depth to your location

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
