# Sanity CMS — activation kit

The site ships running on local **seed data** so it works with zero setup.
This folder contains everything needed to switch on the **Sanity CMS**, giving
the writer a no-code editor to upload and publish stories.

> These files are excluded from the Next.js build (`tsconfig.json → exclude`)
> until you activate the CMS, so Phase 1 compiles without the Sanity packages.

## What you get

- A **Story** editor (title, language, section, category, cover image, excerpt,
  rich-text body, author, publish date, reading time, template).
- An **Author** document.
- An **embedded Studio** at `/admin/studio` with Sanity's own login, so only
  invited editors can publish.

## Steps

1. **Create a project** at <https://www.sanity.io/manage> and note the project ID.

2. **Install the CMS packages:**
   ```bash
   npm i next-sanity@9 sanity@3 @sanity/vision@3 @sanity/image-url@1 styled-components@6
   ```

3. **Set env** in `.env.local`:
   ```
   NEXT_PUBLIC_CONTENT_SOURCE=sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Wire up the Studio:**
   - Move `sanity.config.ts` to the project root and change its schema import
     from `./schemas` to `./sanity/schemas`.
   - Copy `studio-route.tsx` to `src/app/admin/studio/[[...tool]]/page.tsx`.
   - Remove `"sanity"` from the `exclude` array in `tsconfig.json`.

5. **Add the CORS origin** for your dev/prod URLs in the Sanity project settings.

6. Run `npm run dev`, open `/admin`, and click **Open Sanity Studio**.

## Notes

- The app reads content through `src/lib/content/sanity-provider.ts`, which maps
  Sanity documents (Portable Text, image refs) onto the same neutral model the
  seed provider uses — so the UI is identical regardless of the backend.
- To auto-calculate **reading time** on publish, add a Sanity document action or
  a small `onPublish` script that runs `calcReadingTime()` — or simply let the
  editor type it (the field is editable).
