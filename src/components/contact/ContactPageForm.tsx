"use client";

import { useState } from "react";
import { CONTACT_SUBJECTS } from "@/data/contact";
import { useContactForm } from "@/lib/useContactForm";
import { useSelectedStore } from "@/lib/useSelectedStore";

const field =
  "w-full rounded-[5px] border border-black bg-transparent p-4 font-cy text-[clamp(15px,1.1vw,18px)] tracking-[0.5px] text-black/80 placeholder:text-black/80 focus:outline-none focus:ring-2 focus:ring-[#0c1e46]/40 disabled:opacity-60";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPageForm() {
  const { store } = useSelectedStore();
  const { status, error, submit } = useContactForm();
  const [form, setForm] = useState(EMPTY);

  const submitting = status === "submitting";

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ ...form, storeSlug: store.slug, location: store.name });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="flex flex-col gap-8">
        <input
          name="name"
          required
          value={form.name}
          onChange={set("name")}
          disabled={submitting}
          aria-label="Name"
          placeholder="Name*"
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          disabled={submitting}
          aria-label="Email"
          placeholder="Email*"
          className={field}
        />
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          disabled={submitting}
          aria-label="Contact Number"
          placeholder="Contact Number"
          className={field}
        />

        <div className="relative">
          <select
            name="subject"
            required
            value={form.subject}
            onChange={set("subject")}
            disabled={submitting}
            aria-label="What's this regarding?"
            className={`${field} cursor-pointer appearance-none pr-12 ${
              form.subject === "" ? "text-black/80" : "text-black"
            }`}
          >
            <option value="" disabled>
              What&apos;s this regarding?*
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-black/70"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8.5 11l3.5 3.5L15.5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          disabled={submitting}
          aria-label="Your message"
          placeholder="Your message*"
          className={`${field} min-h-[172px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting || status === "success"}
        className="flex h-[47px] w-fit items-center justify-center whitespace-nowrap rounded-full border border-[#0c1e46] bg-[linear-gradient(179deg,#173067_9%,#06122F_48%,#05102A_86%)] px-[clamp(28px,3vw,50px)] py-2.5 font-cy text-[clamp(16px,1.4vw,26px)] font-medium text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 disabled:opacity-70"
      >
        {status === "success" ? "Message sent ✓" : submitting ? "Sending…" : "SUBMIT"}
      </button>

      <div aria-live="polite" className="font-cy text-[15px]">
        {status === "success" && (
          <p className="text-[#1e7a3c]">
            Thanks for reaching out — {store.name} will be in touch shortly.
          </p>
        )}
        {status === "error" && error && <p className="text-[#b3261e]">{error}</p>}
      </div>
    </form>
  );
}
