import { defineCliConfig } from "sanity/cli";

/** Config for the `sanity` CLI (e.g. managing datasets, CORS, deploys). */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
