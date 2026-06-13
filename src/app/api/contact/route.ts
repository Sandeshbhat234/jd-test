import { Resend } from "resend";
import { getLocation } from "@/data/locations";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  location?: string;
  storeSlug?: string;
  phone?: string;
  subject?: string;
  /** Honeypot — real users leave this empty; bots tend to fill every field. */
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length caps to reject oversized/abusive payloads before sending email.
const MAX = { name: 100, email: 200, message: 5000, phone: 40, subject: 120 };

// Lightweight in-memory rate limiter: max N requests per IP per window.
// NOTE: per-instance only (resets on cold start, not shared across serverless
// instances). For hard guarantees back this with a shared store (Upstash/Redis).
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Silently accept honeypot hits so bots don't learn they were filtered.
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const phone = body.phone?.trim();
  const subject = body.subject?.trim();

  if (
    (name && name.length > MAX.name) ||
    (email && email.length > MAX.email) ||
    (message && message.length > MAX.message) ||
    (phone && phone.length > MAX.phone) ||
    (subject && subject.length > MAX.subject)
  ) {
    return Response.json(
      { ok: false, error: "One or more fields are too long." },
      { status: 400 },
    );
  }
  // Resolve the store server-side so we control which address email is sent to.
  const store = body.storeSlug ? getLocation(body.storeSlug) : undefined;
  const location = store?.name ?? body.location?.trim() ?? "JD's Jungle";

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Please fill in your name, email and message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return Response.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  // `from` must be a Resend-verified domain (or onboarding@resend.dev while testing).
  const from = process.env.CONTACT_FROM_EMAIL ?? "JD's Jungle <onboarding@resend.dev>";
  // Route to the selected store's inbox; fall back to a configured catch-all.
  const to = store?.email ?? process.env.CONTACT_TO_EMAIL ?? "hello@jdsjungle.com";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: subject ? `${subject} — ${location}` : `New enquiry — ${location}`,
    text: [
      `Store: ${location}`,
      subject ? `Regarding: ${subject}` : null,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
