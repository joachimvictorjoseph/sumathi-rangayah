import { defineType, defineField } from "sanity";

/**
 * Story document — the writer's main content type.
 * Fields match the app's content model (see src/lib/content/types.ts):
 * title, language, section, category, cover image, excerpt, body (rich text),
 * author, publish date, reading time (auto-calculated on save), template.
 */
export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Tamil", value: "ta" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Stories", value: "stories" },
          { title: "Essays", value: "essays" },
          { title: "Journal", value: "journal" },
          { title: "Reading Corner", value: "reading-corner" },
        ],
      },
      initialValue: "stories",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Tamil Stories", value: "tamil-stories" },
          { title: "English Stories", value: "english-stories" },
          { title: "Flash Fiction", value: "flash-fiction" },
          { title: "Mystery", value: "mystery" },
          { title: "Family", value: "family" },
          { title: "Romance", value: "romance" },
          { title: "Slice of Life", value: "slice-of-life" },
          { title: "Essays", value: "essays" },
          { title: "Reading Journal", value: "reading-journal" },
          { title: "Poetry", value: "poetry" },
          { title: "Life Notes", value: "life-notes" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (one line)",
      type: "text",
      rows: 2,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }], // Portable Text rich text
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readingTimeMinutes",
      title: "Reading time (minutes)",
      type: "number",
      description: "Auto-calculated from the body on save; you can override.",
      readOnly: false,
    }),
    defineField({
      name: "template",
      title: "Template",
      type: "string",
      description: "Standard reading layout, or (Phase 3) the visual story layout.",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Visual (Phase 3)", value: "visual" },
        ],
      },
      initialValue: "standard",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "language", media: "coverImage" },
  },
});
