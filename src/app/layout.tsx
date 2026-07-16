import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/nav";

/**
 * Fonts are loaded via next/font (self-hosted, no layout shift, GDPR-friendly).
 * Each exposes a CSS variable consumed by tailwind.config.ts:
 *   Playfair Display → serif headings
 *   Inter            → sans body
 *   Noto Serif Tamil → Tamil text (correct rendering of the Tamil script)
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Stories, Essays & Reflections`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoTamil.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
