"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/scrollLock";

/** Height of the fixed navbar plus a little breathing room. */
const SCROLL_OFFSET = 110;

export interface TocItem {
  id: string;
  label: string;
}

/**
 * "In this blog" sidebar: a live reading-progress percentage plus a table of
 * contents that highlights the section currently in view. Reads the article
 * by the heading `id`s passed in `items`, so it stays in sync with the body.
 */
export default function BlogContents({
  items,
  targetId = "article-body",
}: {
  items: TocItem[];
  targetId?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      const scrolled = total > 0 ? (-rect.top) / total : 1;
      setProgress(Math.min(100, Math.max(0, Math.round(scrolled * 100))));

      // Active heading = the last one whose top has scrolled past ~30% down.
      const marker = viewport * 0.3;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= marker) current = item.id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, targetId]);

  function handleJump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    // Lenis hijacks native scrolling, so `scrollIntoView` is ignored while it
    // runs — drive it through Lenis when present, otherwise fall back.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -SCROLL_OFFSET });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] p-6 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between font-cy text-[clamp(15px,1vw,18px)] text-black">
        <span>IN THIS BLOG</span>
        <span>{progress}%</span>
      </div>
      <hr className="my-5 border-0 border-t border-black/15" />
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className="flex items-start gap-2.5">
              <span
                aria-hidden
                className={`mt-1 h-5 w-0.5 shrink-0 rounded-full transition-colors ${
                  active ? "bg-[#1e1e1e]" : "bg-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => handleJump(item.id)}
                className={`text-left font-cy text-[clamp(15px,1vw,18px)] leading-snug tracking-[0.18px] transition-colors hover:text-[#1e1e1e] focus-visible:outline-none ${
                  active
                    ? "font-medium text-[#1e1e1e]"
                    : "text-[rgba(30,30,30,0.7)]"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
