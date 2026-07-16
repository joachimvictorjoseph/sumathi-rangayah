/** Top-nav links, single source of truth for header + footer + mobile menu. */
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Essays", href: "/essays" },
  { label: "Journal", href: "/journal" },
  { label: "Reading Corner", href: "/reading-corner" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SITE_NAME = "Sumathi Rangayah";
export const SITE_TAGLINE = "A quiet corner for stories, thoughts and reflections.";
