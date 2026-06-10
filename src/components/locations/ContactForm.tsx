"use client";

import { useState } from "react";
import { useContactForm } from "@/lib/useContactForm";

// Border-radius is applied per field (pill inputs, rounded textarea), so it is
// deliberately NOT part of the shared base.
const fieldBase =
  "w-full border border-[#251915] bg-[#fffff8] px-4 py-2 font-cy text-[16px] text-[#1e1e1e] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#0c1e46]/40 disabled:opacity-60";
const labelBase =
  "font-cy text-[clamp(15px,1.2vw,18px)] text-[#1e1e1e]";

export default function ContactForm({
  locationName,
  storeSlug,
}: {
  locationName: string;
  storeSlug?: string;
}) {
  const { status, error, submit } = useContactForm();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

      <button
        type="submit"
        disabled={submitting || status === "success"}
        className="flex h-[50px] w-fit items-center justify-center whitespace-nowrap rounded-full border border-[#0c1e46] bg-[linear-gradient(179deg,#173067_9%,#06122F_48%,#05102A_86%)] px-[clamp(28px,3vw,50px)] py-2.5 font-cy text-[clamp(16px,1.4vw,26px)] font-medium text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "success"
          ? "Message sent ✓"
          : submitting
            ? "Sending…"
            : "SEND MESSAGE"}
      </button>

      <div aria-live="polite" className="font-cy text-[15px]">
        {status === "success" && (
          <p className="text-[#1e7a3c]">
            Thanks for reaching out — we&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && error && <p className="text-[#b3261e]">{error}</p>}
      </div>
    </form>
  );
}
