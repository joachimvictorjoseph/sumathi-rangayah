import Image from "next/image";

/** Full-width quote banner over a dark photo. */
export function QuoteBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80"
        alt="A vintage fountain pen resting on handwritten pages"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Dark overlay for legibility */}
      <div className="-z-10 absolute inset-0 bg-plum-dark/75" />

      <div className="container-page flex min-h-[280px] flex-col items-start justify-center py-16 text-cream sm:min-h-[340px]">
        <span className="mb-4 font-serif text-5xl leading-none text-cream/60">“</span>
        <blockquote className="max-w-2xl font-serif text-2xl italic leading-snug sm:text-3xl">
          Writing is my way of making sense of everything.
        </blockquote>
        <p className="mt-4 font-serif text-lg text-cream/80">— Sumathi</p>
      </div>
    </section>
  );
}
