"use client";

import { useState } from "react";

/**
 * Simple contact form. Phase 1 has no backend, so on submit it opens the
 * visitor's mail client (mailto) and shows a confirmation. To collect messages
 * server-side later, swap `handleSubmit` for a POST to an API route / form
 * service (Formspree, Resend, a Sanity mutation, etc.).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Hello from ${name || "a reader"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    // TODO: replace with the writer's real address or a form backend.
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-md border border-plum/20 bg-white/70 px-3 py-2.5 text-sm text-ink " +
    "placeholder:text-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-light";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field}
          placeholder="Say hello, share a thought, or ask a question…"
        />
      </div>

      <button type="submit" className="btn-plum">
        Send message
      </button>

      {sent && (
        <p className="text-sm text-plum" role="status">
          Thank you! Your mail app should have opened — if not, write to us directly.
        </p>
      )}
    </form>
  );
}
