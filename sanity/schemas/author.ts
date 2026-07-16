import { defineType, defineField } from "sanity";

/** Author document — one per writer. */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 3 }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", media: "avatar" } },
});
