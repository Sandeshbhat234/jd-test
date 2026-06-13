"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/scrollLock";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Mobile-only reading-progress badge: a circular ring that fills as you read,
 * with the percentage in the centre. Hidden on desktop (the sidebar's "In this
 * blog" card carries the progress there). Tap to glide back to the top.
 */
export default function ReadingProgress({
  targetId = "article-body",
}: {
  targetId?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = total > 0 ? -rect.top / total : 1;
      setProgress(Math.min(100, Math.max(0, Math.round(scrolled * 100))));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  function scrollToTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Stay out of the way until the reader has actually started.
  const visible = progress > 1;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`Reading progress ${progress}%. Back to top.`}
      className={`fixed bottom-5 right-5 z-40 grid size-[58px] place-items-center rounded-full border border-[#0c1e46]/15 bg-[#fffef8]/90 shadow-[0px_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 lg:hidden ${
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <defs>
          <linearGradient id="reading-progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#160581" />
            <stop offset="55%" stopColor="#04103F" />
            <stop offset="100%" stopColor="#011F45" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="rgba(12,30,70,0.12)"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="url(#reading-progress-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <span className="font-cy text-[13px] font-medium leading-none text-[#0c1e46]">
        {progress}
        <span className="text-[9px]">%</span>
      </span>
    </button>
  );
}
