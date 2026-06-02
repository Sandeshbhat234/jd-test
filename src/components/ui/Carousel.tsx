"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

gsap.registerPlugin(useGSAP);

export interface CarouselProps {
  title: string;
  description?: string;
  children: ReactNode;
  /** Optional class to override the section background / vertical rhythm. */
  className?: string;
  /** Total visual gutter (px) used as horizontal scroll-padding so cards align with the heading. Falls back to a fluid value. */
  edgePadding?: string;
  /** Optional centered slot rendered below the carousel track (e.g. a "View all" CTA). */
  footer?: ReactNode;
}

const EDGE_PADDING = "clamp(24px,4vw,80px)";

export default function Carousel({
  title,
  description,
  children,
  className,
  edgePadding = EDGE_PADDING,
  footer,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    const ro = new ResizeObserver(updateBounds);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      ro.disconnect();
    };
  }, [updateBounds]);

  const scrollByDirection = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + getGap(el)
      : el.clientWidth * 0.8;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.max(
      0,
      Math.min(maxScroll, el.scrollLeft + step * direction),
    );
    gsap.to(el, {
      scrollLeft: target,
      duration: 0.65,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  return (
    <section
      className={[
        "bg-[#fffef8] py-[clamp(60px,10vw,150px)] overflow-hidden",
        className ?? "",
      ].join(" ")}
    >
      <header
        className="mb-[clamp(40px,7vw,125px)] flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        style={{ paddingInline: edgePadding }}
      >
        <h2 className="font-serif font-light text-black text-[clamp(32px,4.5vw,64px)] leading-[1.2]">
          {title}
        </h2>

        <div className="flex items-center justify-between gap-6 md:gap-8">
          {description ? (
            <p className="font-serif text-[clamp(14px,1.4vw,22px)] leading-[1.36] text-black/50 max-w-[710px]">
              {description}
            </p>
          ) : (
            <span aria-hidden />
          )}

          <div className="flex shrink-0 items-start gap-4">
            <ArrowButton
              direction="left"
              onClick={() => scrollByDirection(-1)}
              disabled={!canPrev}
            />
            <ArrowButton
              direction="right"
              onClick={() => scrollByDirection(1)}
              disabled={!canNext}
            />
          </div>
        </div>
      </header>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-[clamp(16px,1.5vw,24px)] overflow-x-auto snap-x snap-mandatory [scroll-behavior:auto] overscroll-x-contain touch-pan-x"
        style={{
          paddingInline: edgePadding,
          scrollPaddingInline: edgePadding,
        }}
      >
        {children}
      </div>

      {footer ? (
        <div
          className="mt-[clamp(40px,5vw,80px)] flex justify-center"
          style={{ paddingInline: edgePadding }}
        >
          {footer}
        </div>
      ) : null}
    </section>
  );
}

function getGap(el: HTMLElement): number {
  const value = getComputedStyle(el).columnGap || getComputedStyle(el).gap;
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 24;
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous" : "Next"}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-[50px] items-center justify-center rounded-full border border-black/15 bg-gradient-to-b from-[rgba(241,237,237,0.2)] to-[rgba(244,244,244,0.2)] shadow-[0_5px_6.8px_rgba(0,0,0,0.18)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Image
        src="/home/Icons/arrow-right.svg"
        alt=""
        width={20}
        height={20}
        className={`size-5 select-none ${direction === "left" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
