import Link from "next/link";
import {
  BookIcon,
  PenIcon,
  JournalIcon,
  FeatherIcon,
  HeartIcon,
} from "@/components/ui/icons";
import type { ComponentType, SVGProps } from "react";

interface CategoryItem {
  label: string;
  description: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** The five explore-by-category tiles shown on the lavender strip. */
const CATEGORIES: CategoryItem[] = [
  { label: "Stories", description: "Short stories in Tamil & English", href: "/stories", Icon: BookIcon },
  { label: "Essays", description: "Thoughts on life, career & more", href: "/essays", Icon: PenIcon },
  { label: "Reading Journal", description: "Books, lessons & favourite quotes", href: "/journal", Icon: JournalIcon },
  { label: "Poetry", description: "Poems that speak to the heart", href: "/reading-corner", Icon: FeatherIcon },
  { label: "Life Notes", description: "Little moments, big memories", href: "/journal", Icon: HeartIcon },
];

/** Lavender "Explore by category" strip with icon tiles. */
export function CategoryStrip() {
  return (
    <section className="bg-lavender py-14">
      <div className="container-page">
        <h2 className="mb-10 text-center font-serif text-2xl text-ink sm:text-3xl">
          Explore by category
        </h2>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ label, description, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-plum shadow-sm transition-transform group-hover:-translate-y-1">
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-3 font-serif text-base font-semibold text-ink">
                {label}
              </span>
              <span className="mt-1 text-xs leading-5 text-muted">{description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
