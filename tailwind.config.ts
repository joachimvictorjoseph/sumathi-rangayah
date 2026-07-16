import type { Config } from "tailwindcss";

/**
 * Design tokens for the "warm, literary" aesthetic.
 * Colours and fonts are centralised here so the whole site stays consistent
 * and future phases can re-theme without hunting through components.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f6f0e8", // page background
        plum: {
          DEFAULT: "#5a2a52", // primary accent
          dark: "#43203d",
          light: "#7a4372",
        },
        lavender: "#e9e2f0", // soft section background
        ink: "#2b2530", // body text
        muted: "#6f6875", // secondary text
      },
      fontFamily: {
        // Wired to the next/font CSS variables set in app/layout.tsx
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        tamil: ["var(--font-noto-tamil)", "serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 6px 24px -12px rgba(43, 37, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
