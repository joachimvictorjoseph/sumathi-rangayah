import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }, // keep the admin area out of search
};

/**
 * Admin landing / gate.
 *
 * Phase-1 publishing is done in Sanity Studio — the writer's no-code UI to
 * upload, edit and publish stories. The Studio has its OWN login (Sanity
 * accounts), so only invited editors can publish.
 *
 * This page renders WITHOUT importing any Sanity packages, so the site builds
 * and runs on seed data out of the box. It detects whether Sanity is configured
 * and points the writer at the embedded Studio once it is switched on
 * (see /sanity/README.md for the one-file activation step).
 */
export default function AdminPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const usingSanity = process.env.NEXT_PUBLIC_CONTENT_SOURCE === "sanity";
  const configured = Boolean(projectId) && usingSanity;

  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl text-ink">Admin &amp; Publishing</h1>

      {configured ? (
        <div className="mt-6 rounded-xl border border-plum/15 bg-white/60 p-6">
          <p className="text-ink">
            Sanity is configured. Open the Studio to write and publish stories.
          </p>
          <Link href="/admin/studio" className="btn-plum mt-4">
            Open Sanity Studio
          </Link>
          <p className="mt-3 text-xs text-muted">
            You&apos;ll sign in with your Sanity account. Only invited editors can
            publish.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-plum/15 bg-lavender/40 p-6">
            <p className="font-medium text-ink">
              The site is currently running on built-in seed content.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              To let the writer publish without touching code, switch on the
              Sanity CMS. It gives a friendly editor for titles, cover images,
              rich-text bodies, language, category and publish date — reading
              time is calculated automatically.
            </p>
          </div>

          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>
              Create a free project at{" "}
              <a
                href="https://www.sanity.io/manage"
                className="text-plum hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                sanity.io/manage
              </a>
              .
            </li>
            <li>
              Install the CMS packages (see <code>package.json → comment_sanity</code>).
            </li>
            <li>
              Copy your project ID into <code>.env.local</code> and set{" "}
              <code>NEXT_PUBLIC_CONTENT_SOURCE=sanity</code>.
            </li>
            <li>
              Activate the embedded Studio by following{" "}
              <code>/sanity/README.md</code>.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
