"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

type Testimonial = {
  quote: string;
  body: string;
  name: string;
  rating: number;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "JD's Jungle support turned this first-time buyer into a loyal customer.",
    body: "They answered every question about THC, dosing, and onset times with no pressure. Genuinely knowledgeable and genuinely helpful throughout.",
    name: "Elena R. – Upper East Side",
    rating: 4.5,
    avatar: "/home/Testimonials/1_1_5x.webp",
  },
  {
    quote: "The Midnight Dream Indica exceeded every expectation I had.",
    body: "Rich terpenes, perfect cure & consistently relaxing effects without being overwhelming. Lab-tested purity shines through every single session.",
    name: "Marcus T. – Brooklyn",
    rating: 4,
    avatar: "/home/Testimonials/2_1_5x.webp",
  },
  {
    quote:
      "Same-day delivery arrived quickly – discreet, professional, and perfectly packaged.",
    body: "ID verification was seamless. Product arrived sealed with lab results included. This is exactly how legal cannabis should feel.",
    name: "David K. – Astoria, Queens",
    rating: 4,
    avatar: "/home/Testimonials/3_1_5x.webp",
  },
];

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((nextIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(TESTIMONIALS.length - 1, nextIndex));
    setIndex(clamped);
    gsap.to(el, {
      scrollLeft: el.clientWidth * clamped,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth || 1;
      const i = Math.round(el.scrollLeft / w);
      setIndex((prev) => (prev === i ? prev : i));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-label="From Our Community"
      className="bg-[#fffef8] py-[clamp(56px,7vw,100px)]"
      style={{ paddingInline: "clamp(24px,4vw,80px)" }}>
      <div className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(32px,6vw,124px)] lg:flex-row lg:items-start">
        <header className="flex w-full max-w-[483px] shrink-0 flex-col gap-4 text-[#1e1e1e]">
          <h2 className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.5] tracking-[0.2px]">
            From Our Community
          </h2>
          <p className="font-cy text-[clamp(16px,1.6vw,22px)] leading-[1.5] tracking-[0.2px]">
            Feedback from New Yorkers – no filters, just honest experiences
          </p>
        </header>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            ref={trackRef}
            className="no-scrollbar flex w-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain touch-pan-x">
            {TESTIMONIALS.map((t, i) => (
              <article
                key={t.name}
                className="flex w-full shrink-0  snap-start flex-col gap-8"
                aria-hidden={i !== index || undefined}>
                <div className="flex gap-3 ">
                  <Image
                    src="/home/Icons/quote.svg"
                    alt=""
                    width={95}
                    height={103}
                    className="h-[clamp(56px,7vw,103px)] w-fit select-none"
                  />{" "}
                  <Image
                    src="/home/Icons/quote.svg"
                    alt=""
                    width={95}
                    height={103}
                    className="h-[clamp(56px,7vw,103px)] w-fit select-none"
                  />{" "}
                </div>
                <p className="font-serif font-light text-black text-[clamp(28px,3.5vw,48px)] leading-[1.18]">
                  {t.quote}
                </p>
                <span className="h-px w-full bg-black/15" aria-hidden />
                <p className="font-cy text-[clamp(16px,1.8vw,26px)] leading-[1.5] text-black/75">
                  {t.body}
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={100}
                      height={100}
                      className="size-[clamp(56px,6vw,100px)] shrink-0 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2 font-cy text-black">
                      <Stars rating={t.rating} />
                      <span className="text-[clamp(14px,1.2vw,18px)] leading-[27px] opacity-75">
                        {t.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <ArrowButton
                      direction="left"
                      onClick={() => goTo(index - 1)}
                      disabled={index <= 0}
                    />
                    <ArrowButton
                      direction="right"
                      onClick={() => goTo(index + 1)}
                      disabled={index >= TESTIMONIALS.length - 1}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  return (
    <span
      aria-label={`${rating} out of 5`}
      className="text-[clamp(18px,1.6vw,22px)] leading-[27px]">
      <span className="mr-2">{rating}/5</span>
      {Array.from({ length: 5 }).map((_, i) => {
        const opacity = i < full ? 1 : i === full && hasHalf ? 0.6 : 0.3;
        return (
          <span key={i} style={{ opacity }} aria-hidden>
            ★
          </span>
        );
      })}
    </span>
  );
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
      aria-label={
        direction === "left" ? "Previous testimonial" : "Next testimonial"
      }
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-[50px] items-center justify-center rounded-full border border-black/15 bg-gradient-to-b from-[rgba(241,237,237,0.2)] to-[rgba(244,244,244,0.2)] shadow-[0_5px_6.8px_rgba(0,0,0,0.18)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30">
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
