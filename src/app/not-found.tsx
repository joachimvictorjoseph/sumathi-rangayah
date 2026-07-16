import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="category-tag">404</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">This page slipped away.</h1>
      <p className="mt-3 text-muted">
        The story you&apos;re looking for may have moved or never existed.
      </p>
      <Link href="/" className="btn-plum mt-6">
        Back home
      </Link>
    </div>
  );
}
