import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Home hero: headline + plum CTA on the left, notebook/coffee photo on the
 * right. Stacks to a single column on mobile.
 */
export function Hero({ latestSlug }: { latestSlug?: string }) {
  return (
    <section className="container-page grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
      <div className="max-w-xl">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          Stories have the power to stay with us{" "}
          <span className="italic text-plum">forever.</span>
        </h1>
        <p className="mt-6 text-base leading-7 text-muted sm:text-lg">
          A quiet corner for stories, thoughts and reflections inspired by life,
          books, and everything in between.
        </p>
        <Link href={latestSlug ? `/stories/${latestSlug}` : "/stories"} className="btn-plum mt-8">
          Read Latest Story
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-card">
        <Image
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
          alt="An open notebook and a cup of coffee on a wooden desk"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
