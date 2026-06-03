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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const phone = body.phone?.trim();
  const subject = body.subject?.trim();
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
