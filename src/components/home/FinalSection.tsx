"use client";

import Image from "next/image";
import { useState } from "react";
import GetStartedCards from "./GetStartedCards";

const DEFAULT_BG = "/home/Final section cards/beginner_s_guide_bg_1_5x.webp";

// All backgrounds that a card can reveal on hover. Rendered as stacked layers
// so switching between them crossfades instead of hard-cutting.
const HOVER_BGS = [
  "/home/Final section cards/read_blogs_bg_1_5x.webp",
  "/home/Final section cards/beginner_s_guide_bg_1_5x.webp",
  "/home/Final section cards/dosage_calculator_bg_1_5x.webp",
];

export default function FinalSection() {
  const [activeBg, setActiveBg] = useState<string | null>(null);

  return (
    <section aria-label="Get started" className="relative w-full overflow-hidden">
      {/* Base layer: shown when no card is hovered. */}
      <Image
        src={DEFAULT_BG}
        alt=""
        fill
        sizes="100vw"
        className="select-none object-cover object-center"
        priority={false}
      />

      {/* Hover layers crossfade in over the base. */}
      {HOVER_BGS.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className={`select-none object-cover object-center transition-opacity duration-700 ease-out ${
            activeBg === src ? "opacity-100" : "opacity-0"
          }`}
          priority={false}
        />
      ))}

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-[#1a3a52]/30 via-transparent to-[#1a3a52]/30"
      />

      <div
        className="relative mx-auto flex w-full max-w-[1601px] items-center justify-center py-[clamp(56px,8vw,100px)]"
        style={{ paddingInline: "clamp(24px,4vw,80px)" }}>
        <GetStartedCards onActiveBgChange={setActiveBg} />
      </div>
    </section>
  );
}
