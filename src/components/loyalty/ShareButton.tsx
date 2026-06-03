"use client";

import Image from "next/image";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = {
      title: "JD's Jungle — Jungle Rewards",
      text: "Join JD's Jungle loyalty program and earn 10% cashback on every purchase.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet or clipboard was blocked */
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className="flex items-center gap-2 px-3 font-[var(--font-cy-grotesk)] text-[15px] font-medium tracking-[0.4px] text-[#1e1e1e] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/40 rounded-full"
    >
      <span>{copied ? "Copied!" : "Share"}</span>
      <Image
        src="/Loyalty Program/solar_link-bold.svg"
        alt=""
        width={24}
        height={24}
        className="size-5"
      />
    </button>
  );
}
