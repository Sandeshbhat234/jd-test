"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/scrollLock";

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating "back to top" button shown on every page once the reader has
 * scrolled down. A navy pill with a yellow scroll-progress ring and an up
 * arrow that gently bounces on hover. Tap glides smoothly back to the top.
 *
 * Progress is sampled every frame in a rAF loop and eased toward the live
 * scroll position, so the ring follows the scroll continuously (no lag that
 * only catches up when you stop) with a smooth feel. We read Lenis's own
 * `progress` when it's running — it stays accurate even while GSAP pins change
 * the document height (which broke the raw `window.scrollY` math on the
 * pin-heavy About page) — and fall back to native scroll under reduced-motion.
 */
export default function ScrollToTopButton() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fromWindow = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - window.innerHeight;
      return total > 0 ? window.scrollY / total : 0;
    };

    let current = 0;
    let raf = 0;
    const tick = () => {
      const lenis = getLenis();
      const target = Math.min(1, Math.max(0, (lenis ? lenis.progress : fromWindow()) || 0));
      // Ease toward the live position; once close enough, snap and stop the loop
      // so it doesn't spin every frame for the page's whole lifetime. It restarts
      // on the next scroll/resize (see `wake`).
      if (Math.abs(target - current) < 0.0005) {
        current = target;
        setProgress(current);
        raf = 0;
        return;
      }
      current += (target - current) * 0.12;
      setProgress(current);
      raf = requestAnimationFrame(tick);
    };

    // Kick the loop only when it isn't already running. Lenis drives the native
    // scroll position, so a plain `scroll` listener fires during smooth scrolling
    // too — no separate Lenis subscription needed.
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);

  function scrollToTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Reveal once the reader is meaningfully into the page.
  const visible = progress > 0.06;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 grid size-15 place-items-center overflow-hidden rounded-full shadow-[0_10px_30px_rgba(4,16,63,0.28)] transition-[transform,opacity] duration-500 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{
        background: "linear-gradient(179deg,#160581 9%,#04103F 48%,#011F45 86%)",
      }}
    >
      {/* Scroll-progress ring. */}
      <svg
        viewBox="0 0 60 60"
        className="pointer-events-none absolute inset-0 size-full -rotate-90"
      >
        <defs>
          <linearGradient id="scroll-top-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC700" />
            <stop offset="100%" stopColor="#FFF0AB" />
          </linearGradient>
        </defs>
        <circle
          cx="30"
          cy="30"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="2.5"
        />
        <circle
          cx="30"
          cy="30"
          r={RADIUS}
          fill="none"
          stroke="url(#scroll-top-ring)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>

      {/* Up arrow: gently bounces on hover. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 size-5 text-[#FFC700] group-hover:animate-slow-bounce motion-reduce:animate-none"
      >
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
