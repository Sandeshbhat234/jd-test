"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Card = {
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
  /** Section background revealed while this card is hovered/focused. */
  bgImage: string;
};

const CARDS: Card[] = [
  {
    title: "Read Blogs",
    description:
      "Deep dives into terpene profiles, brand narratives, and the future of retail — curated for the modern enthusiast.",
    image: "/home/Final section cards/read_blogs_1_5x.webp",
    cta: "Start Reading Here",
    href: "/blogs",
    bgImage: "/home/Final section cards/read_blogs_bg_1_5x.webp",
  },
  {
    title: "Beginner's Guide",
    description:
      'Move past the noise. Understand delivery methods, onset times, and the science of "Start Low, Go Slow" through a clear, no-fluff lens.',
    image: "/home/Final section cards/beginners_guide_1_5x.webp",
    cta: "Start Your Journey",
    href: "/guide",
    bgImage: "/home/Final section cards/beginner_s_guide_bg_1_5x.webp",
  },
  {
    title: "Dosage Calculator",
    description:
      "Dial in onset, potency, and timing with a guided calculator — for a precise, comfortable experience every single time.",
    image: "/home/Final section cards/dosage_calculator_1_5x.webp",
    cta: "Calculate Your Dose",
    href: "/dosage-calculator",
    bgImage: "/home/Final section cards/dosage_calculator_bg_1_5x.webp",
  },
];

/**
 * Desktop: glass cards that grow and reveal their body on hover/focus.
 * Mobile: a swipeable, scroll-snap carousel where every card is permanently in
 * its expanded (solid) state, with pagination dots tracking the active card.
 */
export default function GetStartedCards({
  onActiveBgChange,
}: {
  /** Reports the hovered card's background (or null on leave) to the section. */
  onActiveBgChange?: (src: string | null) => void;
}) {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const frame = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (frame.current != null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const el = scrollerRef.current;
      if (!el) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const node = child as HTMLElement;
        const mid = node.offsetLeft + node.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    });
  }, []);

  useEffect(
    () => () => {
      if (frame.current != null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const goTo = (i: number) => {
    const child = scrollerRef.current?.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="w-full">
      <ul
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex w-full snap-x snap-mandatory items-stretch gap-[clamp(16px,3vw,40px)] overflow-x-auto scroll-px-[6%] px-[6%] pb-2 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0">
        {CARDS.map((card) => (
          <li
            key={card.title}
            className="flex shrink-0 grow-0 basis-[86%] snap-center sm:basis-[58%] lg:shrink lg:grow lg:basis-0">
            <ExpandingCard {...card} onActivate={onActiveBgChange} />
          </li>
        ))}
      </ul>

      {/* Pagination dots — mobile only. */}
      <div className="mt-[clamp(20px,4vw,28px)] flex justify-center gap-3 lg:hidden">
        {CARDS.map((card, i) => (
          <button
            key={card.title}
            type="button"
            aria-label={`Go to ${card.title}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`size-3 rounded-full transition-colors duration-300 ${
              active === i ? "bg-black" : "bg-[#d9d9d9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Collapsible body block: open on mobile, revealed on hover/focus on desktop. */
function Collapsible({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-700 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-6 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandingCard({
  title,
  description,
  image,
  cta,
  href,
  bgImage,
  onActivate,
}: Card & { onActivate?: (src: string | null) => void }) {
  return (
    <Link
      href={href}
      onMouseEnter={() => onActivate?.(bgImage)}
      onMouseLeave={() => onActivate?.(null)}
      onFocusCapture={() => onActivate?.(bgImage)}
      onBlurCapture={() => onActivate?.(null)}
      className="group relative z-0 flex h-[clamp(480px,122vw,560px)] w-full flex-col gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-4 text-black backdrop-blur-[14px] transition-[background-color,border-color,color,transform] duration-700 ease-out lg:h-[clamp(440px,40vw,500px)] lg:origin-center lg:transform-gpu lg:will-change-transform lg:backface-hidden lg:border-white/20 lg:bg-white/20 lg:text-white lg:backdrop-blur-[50px] lg:hover:z-20 lg:hover:scale-x-[1.1] lg:hover:scale-y-[1.2] lg:hover:border-black/10 lg:hover:bg-white/90 lg:hover:text-black lg:hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] lg:focus-visible:z-20 lg:focus-visible:scale-x-[1.1] lg:focus-visible:scale-y-[1.2] lg:focus-visible:border-black/10 lg:focus-visible:bg-white/90 lg:focus-visible:text-black">
      <h3 className="font-serif text-[clamp(22px,2.4vw,32px)] capitalize leading-[1.25]">
        {title}
      </h3>

      <Collapsible>
        <p className="pb-1 font-cy text-[clamp(15px,1.5vw,20px)] leading-[1.5]">
          {description}
        </p>
      </Collapsible>

      <div className="relative w-full min-h-0 flex-1 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 86vw, 40vw"
          className="select-none object-cover object-top"
        />
      </div>

      <Collapsible>
        <div className="flex flex-col gap-3 pt-2">
          <span
            aria-hidden
            className="h-px w-full bg-black/15 transition-colors duration-500 ease-out lg:bg-white/30 lg:group-hover:bg-black/15 lg:group-focus-visible:bg-black/15"
          />
          <div className="flex items-center justify-between">
            <span className="font-cy text-[clamp(13px,1.3vw,18px)] uppercase leading-tight">
              {cta}
            </span>
            <Arrow />
          </div>
        </div>
      </Collapsible>
    </Link>
  );
}
