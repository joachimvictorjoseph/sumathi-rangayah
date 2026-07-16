import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";
import { AUTHOR } from "@/lib/content/seed/author";

export const metadata: Metadata = {
  title: "About",
  description: "About Sumathi Rangayah.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About" subtitle="The writer behind the words." />

      <div className="container-page grid items-start gap-10 py-14 md:grid-cols-[240px_1fr]">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl shadow-card md:w-full">
          <Image
            src={AUTHOR.avatarUrl}
            alt={AUTHOR.name}
            fill
            sizes="240px"
            className="object-cover"
          />
        </div>

        <div className="prose-story">
          <h2 className="!mt-0 font-serif text-2xl text-ink">
            Hello, I&apos;m {AUTHOR.name}.
          </h2>
          <p>{AUTHOR.bio}</p>
          <p>
            I write short stories, essays and reflections in both Tamil and
            English. Some pieces are fiction; many are simply attempts to make
            sense of ordinary life — a rainy morning, an old letter, a quiet
            platform at dusk.
          </p>
          <p>
            This site is a quiet corner for readers who like to slow down. Every
            story can also be <em>listened</em> to, so you can carry these words
            with you wherever you go.
          </p>
          <blockquote className="my-8 border-l-4 border-plum/40 pl-5 font-serif text-xl italic text-plum">
            Writing is my way of making sense of everything.
          </blockquote>
          <p>Thank you for reading. I hope something here stays with you.</p>
        </div>
      </div>
    </>
  );
}
