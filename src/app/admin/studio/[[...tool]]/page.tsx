/**
 * Embedded Sanity Studio — the writer's no-code publishing UI.
 * Mounted at /admin/studio; Sanity handles its own login, so only invited
 * editors can publish. The catch-all [[...tool]] segment lets the Studio own
 * all of its internal sub-routes.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

// The Studio is a client app; don't try to statically pre-render its internals.
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
