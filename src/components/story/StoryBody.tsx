import type { Language, StoryBlock } from "@/lib/content/types";

/**
 * Renders the neutral StoryBlock[] model as long-form prose.
 * Tamil stories get lang="ta" so the Noto Serif Tamil font + spacing apply.
 */
export function StoryBody({
  body,
  language,
}: {
  body: StoryBlock[];
  language: Language;
}) {
  const langAttr = language === "ta" ? "ta" : undefined;

  return (
    <div className="prose-story mt-8" lang={langAttr}>
      {body.map((block, i) => {
        switch (block._type) {
          case "heading":
            return <h2 key={i}>{block.text}</h2>;
          case "pullquote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-4 border-plum/40 pl-5 font-serif text-xl italic text-plum"
              >
                {block.text}
              </blockquote>
            );
          case "paragraph":
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
