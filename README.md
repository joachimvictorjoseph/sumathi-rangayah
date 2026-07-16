# Sumathi Rangayah — Story-Reading Website

A warm, literary, **bilingual (Tamil + English)** reading site for the writer
Sumathi Rangayah. Readers browse, read and **listen** to short stories, essays
and reflections; the writer publishes without touching code.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**. Runs out of the
box on local seed content, with a clean path to the **Sanity CMS**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it — the site is fully viewable immediately with placeholder stories in
both Tamil and English. No account or API key required for Phase 1.

```bash
npm run build      # production build (all pages statically generated)
npm run start      # serve the production build
npm run lint       # eslint
```

---

## Phased architecture

The code is structured so future phases slot in **without rewrites**:

| Phase | Feature | Where it plugs in |
|------|----------|-------------------|
| **1 (now)** | Public reading site + admin publishing | This repo |
| **2 (later)** | "AI reading mode" — AI voices for Listen | New engine in [`src/lib/tts`](src/lib/tts) behind the existing `TTSEngine` interface — **no UI changes** |
| **3 (later)** | "Visual story" — illustrated / scrollytelling template | New branch in [`StoryRenderer`](src/components/story/StoryRenderer.tsx) keyed off `story.template` |

### Key extension points

- **Content source** — everything reads from one `ContentProvider` interface
  ([`src/lib/content`](src/lib/content)). Swap seed ↔ Sanity with a single env
  var; the UI never changes.
- **Text-to-speech** — [`ListenBar`](src/components/story/ListenBar.tsx) talks
  only to `getTTSEngine()`. Phase 1 uses the browser Web Speech API
  ([`web-speech-engine.ts`](src/lib/tts/web-speech-engine.ts)); Phase 2 returns a
  different engine.
- **Story template** — `StoryRenderer` switches on `story.template`
  (`standard` today, `visual` in Phase 3).

---

## Content: seed → Sanity CMS

By default the site uses **local seed data** (`src/lib/content/seed/`) so it runs
instantly. To let the writer publish **without code**, switch on the Sanity CMS:

- Full step-by-step guide: [`sanity/README.md`](sanity/README.md)
- In short: create a free Sanity project, install the CMS packages
  (see `package.json → comment_sanity`), set `NEXT_PUBLIC_CONTENT_SOURCE=sanity`
  + your project ID, and copy in the embedded Studio route.

The writer then logs in at **`/admin` → Sanity Studio** to upload cover images
and publish stories. Story fields: title, language, category, cover image,
excerpt, rich-text body, author, publish date, reading time (auto-calculated),
template.

---

## Project structure

```
src/
  app/                     # App Router pages
    page.tsx               # Home (hero, latest, categories, quote)
    stories/               # Listing + [slug] reading page
    essays/ journal/ reading-corner/
    about/ contact/
    admin/                 # Publishing gate → Sanity Studio
  components/
    layout/                # Navbar (sticky, mobile menu), Footer, PageBanner
    home/                  # Hero, LatestStories, CategoryStrip, QuoteBanner
    story/                 # StoryCard, StoryGrid, FilterableStories,
                           # StoryRenderer, ListenBar, AuthorCard, MoreStories…
    ui/icons.tsx           # Inline SVG icon set (quill, controls, categories)
  lib/
    content/               # ContentProvider interface + seed & Sanity providers
    tts/                   # TTS engine abstraction (Phase 2 swap point)
    utils/                 # reading-time, date/format, block helpers
    nav.ts                 # Nav links (single source of truth)
sanity/                    # CMS activation kit (excluded from the Next build)
```

---

## Design system

Centralised in [`tailwind.config.ts`](tailwind.config.ts) and
[`globals.css`](src/app/globals.css):

- **Colours** — cream `#f6f0e8` background, plum `#5a2a52` accent, soft lavender
  `#e9e2f0` sections.
- **Fonts** (via `next/font`, self-hosted) — Playfair Display (serif headings),
  Inter (sans body), **Noto Serif Tamil** (Tamil text). Tamil renders correctly
  by setting `lang="ta"`, which applies the Tamil font + line spacing.
- Fully responsive nav (sticky, mobile hamburger), hero, card grid and reading
  layout.

---

## Listen feature (Phase 1)

Each story has a **Listen bar** using the browser `SpeechSynthesis` API:

- Auto-selects a Tamil or English voice based on the story's language.
- Voice selector (matching-language voices float to the top).
- Play / Pause / Resume / Stop, with graceful fallback when TTS is unavailable.
- Voice availability depends on the reader's OS. Phase 2 replaces this with
  high-quality AI voices — same UI.

---

## Deployment

- **Vercel** — import the repo; zero config. Set env vars in the dashboard.
- **Netlify** — `netlify.toml` is included; the Next.js plugin is auto-added.

Both run on the free tier with a global CDN. Set the env vars from
[`.env.example`](.env.example) (only `NEXT_PUBLIC_SITE_URL` is needed for the
Phase-1 seed site; the rest are for Sanity).
