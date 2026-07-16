import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

/**
 * Sanity Studio configuration (embedded in the Next.js app).
 * basePath must match the route the Studio is mounted at: /admin/studio.
 */
export default defineConfig({
  name: "sumathi-rangayah",
  title: "Sumathi Rangayah — Editor",
  basePath: "/admin/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
