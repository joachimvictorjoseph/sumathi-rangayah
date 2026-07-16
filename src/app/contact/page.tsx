import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sumathi Rangayah.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact" subtitle="I'd love to hear from you." />

      <div className="container-page grid gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">Say hello</h2>
          <p className="mt-3 max-w-md leading-7 text-muted">
            Whether it&apos;s a thought about a story, a book recommendation, or
            just a hello — messages from readers make my day. Fill in the form
            and I&apos;ll get back to you.
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
