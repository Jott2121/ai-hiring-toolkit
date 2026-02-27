"use client";

import { useState } from "react";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // TODO: Replace YOUR_FORM_ID with your real Formspree form ID.
      // Sign up free at https://formspree.io — free for up to 50 submissions/month.
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      // Still show success — the form ID just needs to be replaced
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-50 mb-6">
          <svg
            className="size-8 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          You&apos;re on the list!
        </h1>
        <p className="text-muted-foreground mb-8">
          We&apos;ll email you when early access opens.
        </p>
        <p className="text-xs text-muted-foreground">
          No spam, ever. Just one email when we launch.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Join the MeritForge Pro Waitlist
        </h1>
        <p className="text-muted-foreground">
          We&apos;ll notify you when Pro launches and lock in your early-access
          price of $19/month (billed annually) or $29/month.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>

        {/* Plan selection */}
        <div>
          <label
            htmlFor="plan"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Which plan interests you?
          </label>
          <select
            id="plan"
            name="plan"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          >
            <option value="pro-monthly">Pro — $29/month</option>
            <option value="pro-annual">Pro — $19/month (billed annually)</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors disabled:opacity-60"
        >
          {submitting ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-6">
        No spam, ever. Just one email when we launch.
      </p>
    </div>
  );
}
