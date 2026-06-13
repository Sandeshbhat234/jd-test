"use client";

import { useState } from "react";
import { useContactForm } from "@/lib/useContactForm";
import Button from "@/components/ui/Button";

// Border-radius is applied per field (pill inputs, rounded textarea), so it is
// deliberately NOT part of the shared base.
const fieldBase =
  "w-full border border-[#251915] bg-[#ffffff] px-4 py-2 font-cy text-[16px] text-[#1e1e1e] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#0c1e46]/40 disabled:opacity-60";
const labelBase = "font-cy text-[clamp(15px,1.2vw,18px)] text-[#1e1e1e]";

export default function ContactForm({
  locationName,
  storeSlug,
}: {
  locationName: string;
  storeSlug?: string;
}) {
  const { status, error, submit } = useContactForm();
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const submitting = status === "submitting";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ ...form, location: locationName, storeSlug });
  };

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot: hidden from users + assistive tech; bots that fill it are dropped. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={set("company")}
          />
        </label>
      </div>

      <h2 className="font-serif text-[clamp(24px,2.4vw,32px)] leading-tight text-[#1e1e1e]">
        Contact Us
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className={labelBase}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            value={form.name}
            onChange={set("name")}
            disabled={submitting}
            placeholder="Jane Doe"
            className={`h-10 rounded-full ${fieldBase}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className={labelBase}>
            E-mail
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            disabled={submitting}
            placeholder="janedoe@gmail.com"
            className={`h-10 rounded-full ${fieldBase}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-message" className={labelBase}>
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={set("message")}
            disabled={submitting}
            placeholder="How can we help you?"
            className={`min-h-[160px] resize-y rounded-2xl ${fieldBase}`}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={submitting || status === "success"}
        className="w-fit">
        {status === "success"
          ? "Message sent ✓"
          : submitting
            ? "Sending…"
            : "SEND MESSAGE"}
      </Button>

      <div aria-live="polite" className="font-cy text-[15px]">
        {status === "success" && (
          <p className="text-[#1e7a3c]">
            Thanks for reaching out — we&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && error && (
          <p className="text-[#b3261e]">{error}</p>
        )}
      </div>
    </form>
  );
}
