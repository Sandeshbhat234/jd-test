"use client";

import { useState } from "react";

export type ContactStatus = "idle" | "submitting" | "success" | "error";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  /** Optional store slug — the API routes the email to that store. */
  storeSlug?: string;
  /** Display label (store name) included in the email. */
  location?: string;
  phone?: string;
  subject?: string;
  /** Honeypot — must stay empty; submitted to the API for bot filtering. */
  company?: string;
}

/**
 * Submits the contact form to /api/contact (which sends via Resend) and
 * tracks the request state for the UI.
 */
export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(input: ContactInput) {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return { status, error, submit };
}
