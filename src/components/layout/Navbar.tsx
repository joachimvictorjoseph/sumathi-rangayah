"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/nav";
import { QuillIcon, SearchIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";

/**
 * Sticky top navigation.
 * - Desktop: brand + inline links + search.
 * - Mobile: brand + hamburger that opens a full-width menu panel.
 * Highlights the active section based on the current path.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-plum/10 bg-cream/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-plum">
          <span className="font-serif text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {SITE_NAME.split(" ")[0]}{" "}
            <span className="font-normal italic text-plum">
              {SITE_NAME.split(" ")[1]}
            </span>
          </span>
          <QuillIcon className="h-5 w-5 -rotate-12 text-plum" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-plum ${
                isActive(link.href)
                  ? "font-semibold text-plum"
                  : "font-medium text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Search"
            className="text-ink/70 transition-colors hover:text-plum"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Search"
            className="text-ink/70 hover:text-plum"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-ink hover:text-plum"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-plum/10 bg-cream lg:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-plum/5 py-3 text-sm ${
                  isActive(link.href)
                    ? "font-semibold text-plum"
                    : "font-medium text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
