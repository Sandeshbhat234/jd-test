"use client";

import Link from "next/link";
import { useStoredValue } from "@/lib/useStoredValue";

const STORAGE_KEY = "jd-cookie-consent";
// Keeps the banner out of the server HTML so consented visitors never see a
// flash; the real consent value is read right after hydration.
const SSR_HIDDEN = "__ssr__";

type Consent = "all" | "essentials" | "rejected";

// Shared button base — matches the pill buttons in the Figma design.
const pillBase =
  "flex h-9 items-center justify-center rounded-full border px-4 py-2 " +
  "font-cy text-[14px] leading-none whitespace-nowrap " +
  "transition-[filter,background-color] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffef8]";

const primaryPill =
  pillBase +
  " border-[#0c1e46] font-medium text-white hover:brightness-110 " +
  "bg-[linear-gradient(178.51deg,#173067_9.14%,#06122F_47.57%,#05102A_85.99%)]";

const ghostPill =
  pillBase +
  " border-black bg-[#fffef8] font-medium text-black hover:bg-black/5";

export default function CookieBanner() {
  const [consent, setConsent] = useStoredValue(STORAGE_KEY, SSR_HIDDEN);

  const decide = (value: Consent) => setConsent(value);

  // Hidden during SSR/hydration (SSR_HIDDEN) and once a choice is stored.
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:w-[360px]"
    >
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(30,30,30,0.5)] bg-[#fffef8] p-5 drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)]">
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-4">
              <h2 className="font-serif text-[20px] leading-tight text-black">
                We collect cookies.
              </h2>
              <button
                type="button"
                onClick={() => decide("essentials")}
                aria-label="Close and accept essential cookies"
                className="shrink-0 rounded-full p-1 text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <p
              id="cookie-banner-desc"
              className="font-cy text-[14px] leading-relaxed text-black"
            >
              We use cookies to enhance your browsing experience and analyze our
              traffic. Read our{" "}
              <Link href="/cookie-policy" className="underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full flex-wrap content-center items-center gap-2">
            <button type="button" onClick={() => decide("all")} className={primaryPill}>
              Accept all
            </button>
            <button
              type="button"
              onClick={() => decide("essentials")}
              className={ghostPill}
            >
              Accept Essentials
            </button>
            <button
              type="button"
              onClick={() => decide("rejected")}
              className={ghostPill}
            >
              Reject All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
