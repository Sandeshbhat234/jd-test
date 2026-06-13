"use client";

import { useState } from "react";

/**
 * Copies the current article URL to the clipboard and briefly confirms.
 * Falls back to the Web Share sheet on devices that support it.
 */
export default function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`group inline-flex items-center gap-2.5 rounded-full px-5 py-2 font-cy text-[clamp(15px,1.1vw,18px)] font-medium tracking-[0.5px] text-[#1e1e1e] transition-colors hover:bg-[rgba(234,233,228,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/40 ${className ?? ""}`}
    >
      <span>{copied ? "Copied" : "Share"}</span>
      {copied ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M5 12.5l4 4 10-10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M9.5 14.5l5-5M8 10.5l-1.6 1.6a3.4 3.4 0 104.8 4.8l1.6-1.6M16 13.5l1.6-1.6a3.4 3.4 0 10-4.8-4.8l-1.6 1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
