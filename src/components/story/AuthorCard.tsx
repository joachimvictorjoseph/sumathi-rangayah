import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Sidebar "About the Author" card on the reading page. */
export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="rounded-xl border border-plum/10 bg-white/60 p-5 text-center">
      <h3 className="text-left text-sm font-semibold uppercase tracking-wide text-muted">
        About the Author
      </h3>

      <div className="mt-4 flex flex-col items-center">
        {author.avatarUrl && (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover ring-2 ring-lavender"
          />
        )}
        <p className="mt-3 font-serif text-lg font-semibold text-ink">{author.name}</p>
        <p className="mt-1 text-sm leading-6 text-muted">{author.bio}</p>

        <Link
          href="/about"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-plum hover:underline"
        >
          More about me <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
