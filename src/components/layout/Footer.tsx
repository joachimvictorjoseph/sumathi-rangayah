import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/nav";
import { QuillIcon } from "@/components/ui/icons";

/** Site footer — brand blurb, quick links, and copyright. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-plum/10 bg-lavender/40">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 text-ink">
            <span className="font-serif text-xl font-bold">{SITE_NAME}</span>
            <QuillIcon className="h-5 w-5 -rotate-12 text-plum" />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{SITE_TAGLINE}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Explore</h4>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-plum"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Connect</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/about" className="text-sm text-muted hover:text-plum">
                About the writer
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted hover:text-plum">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-plum/10 py-5">
        <p className="container-page text-center text-xs text-muted">
          © {year} {SITE_NAME}. Written with care.
        </p>
      </div>
    </footer>
  );
}
