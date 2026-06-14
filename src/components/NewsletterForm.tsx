"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Footer newsletter signup. Client-side only for now: it validates the address
 * and confirms locally instead of reloading the page (the old bare <form> did a
 * native submit). Wire `submit()` to a real provider (Resend audience, Mailchimp,
 * etc.) when one is available.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
    // TODO: POST to a newsletter provider here.
  };

  if (done) {
    return (
      <p
        aria-live="polite"
        className="font-cy text-[clamp(15px,1.4vw,18px)] leading-[27px] text-[#1e7a3c]">
        Thanks for subscribing — keep an eye on your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
      noValidate>
      <label className="flex flex-1 flex-col gap-2">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          placeholder="Email"
          className="w-full border-b border-black bg-transparent pb-2 font-cy text-[clamp(15px,1.4vw,17.293px)] text-black focus:outline-none"
        />
        {error ? (
          <span role="alert" className="font-cy text-[13px] text-[#b3261e]">
            {error}
          </span>
        ) : null}
      </label>
      <Button
        type="submit"
        variant="primary"
        className="w-full sm:max-w-fit py-2 text-[clamp(15px,1.4vw,20px)]"
        size="md">
        Subscribe
      </Button>
    </form>
  );
}
