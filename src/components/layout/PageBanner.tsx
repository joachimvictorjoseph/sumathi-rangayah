/**
 * Reusable page banner (soft lavender). Used by listing pages like Stories,
 * Essays, Journal. Title + subtitle only — keeps listing pages consistent.
 */
export function PageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-lavender to-cream">
      <div className="container-page py-14 text-center sm:py-16">
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
