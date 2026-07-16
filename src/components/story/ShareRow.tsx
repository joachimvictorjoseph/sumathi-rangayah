"use client";

import { useState } from "react";
import { FacebookIcon, TwitterIcon, LinkIcon } from "@/components/ui/icons";

/** Share icons for the story meta row. "Copy link" gives quick feedback. */
export function ShareRow({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "") + `/stories/${slug}`;

  const copyLink = async () => {
    try {
      // On the client, prefer the live origin over the env fallback.
      const href =
        typeof window !== "undefined"
          ? `${window.location.origin}/stories/${slug}`
          : url;
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const iconClass =
    "flex h-8 w-8 items-center justify-center rounded-full border border-plum/20 text-plum transition-colors hover:bg-plum hover:text-cream";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs text-muted">Share:</span>
      <a
        className={iconClass}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a
        className={iconClass}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
      >
        <TwitterIcon className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={iconClass}
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      {copied && <span className="text-xs text-plum">Link copied!</span>}
    </div>
  );
}
