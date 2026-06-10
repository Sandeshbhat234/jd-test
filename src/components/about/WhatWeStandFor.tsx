"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A4 = "/About%20page/Animation%204";

// How far a card drifts up as it leaves / starts below as it enters (px).
const RISE = 64;

type Side = "right" | "left";
type Value = { icon: string; title: string; sub: string; side: Side };

const VALUES: Value[] = [
  {
    icon: `${A4}/Legitimacy.svg`,
    title: "Legitimacy",
    sub: "Proudly licensed by the New York Office of Cannabis Management.",
    side: "right",
  },
  {
    icon: `${A4}/Quality.svg`,
    title: "Quality",
    sub: "Every product meets our standard – lab tested and hand-selected.",
    side: "left",
  },
  {
    icon: `${A4}/Community.svg`,
    title: "Community",
    sub: "We exist at the intersection of cannabis culture and New York.",
    side: "right",
  },
  {
    icon: `${A4}/Clarity.svg`,
    title: "Clarity",
    sub: "We cut through the noise so you feel confident every time.",
    side: "left",
  },
];

export default function WhatWeStandFor() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const line = lineRef.current;
      const dot = dotRef.current;
      const cards = cardRefs.current;
      if (
        !section ||
        !heading ||
        !title ||
        !subtitle ||
        !line ||
        !dot ||
        cards.length < VALUES.length ||
        cards.some((c) => !c)
      )
        return;

      // --- rest state ---
      gsap.set(heading, { xPercent: -50 });
      gsap.set([title, subtitle], { autoAlpha: 0 });
      gsap.set(line, { xPercent: -50, scaleY: 0, transformOrigin: "top center" });
      gsap.set(dot, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0 });
      gsap.set(cards, { top: "57vh", yPercent: -50, autoAlpha: 0 });

      // --- intro: reveal text *in place* (opacity only), then line/dot/card ---
      const intro = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", once: true },
      });
      intro
        .to(title, { autoAlpha: 1, duration: 0.9, ease: "power2.out" })
        .to(subtitle, { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, "<+0.15")
        .to(line, { scaleY: 1, duration: 0.9, ease: "power2.out" }, "+=0.15")
        .to(
          dot,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          "<+0.35",
        )
        .fromTo(
          cards[0],
          { y: RISE * 0.5, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
          "<+0.1",
        );

      // --- pinned scroll: one card at a time. Each fully fades out (drifting
      // up a touch) BEFORE the next fades in from just below, so only a single
      // card is ever on screen. Cards never travel past the heading. ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=560%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const mkOut = () => ({
        y: -RISE,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.in",
      });
      const mkInFrom = () => ({ y: RISE, autoAlpha: 0 });
      const mkInTo = () => ({
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
      });

      tl.to({}, { duration: 0.55 }) // let the intro settle before the first exit
        // cards[0] is also revealed by the autoplay intro, so it has two
        // timelines touching it. Force a clean fully-visible start and
        // `overwrite` to kill any in-flight intro tween — otherwise it can get
        // stuck visible (and the next card slides in over it) or never render.
        .fromTo(
          cards[0],
          { y: 0, autoAlpha: 1 },
          {
            y: -RISE,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.in",
            immediateRender: false,
            overwrite: true,
          },
        )
        .fromTo(cards[1], mkInFrom(), mkInTo())
        .to({}, { duration: 0.4 })
        .to(cards[1], mkOut())
        .fromTo(cards[2], mkInFrom(), mkInTo())
        .to({}, { duration: 0.4 })
        .to(cards[2], mkOut())
        .fromTo(cards[3], mkInFrom(), mkInTo())
        .to({}, { duration: 0.4 })
        // last card fades out; all text vanishes -> blank white.
        .to(cards[3], mkOut())
        .to(
          [heading, line, dot],
          { autoAlpha: 0, y: -20, duration: 0.7, ease: "power2.in" },
          "<",
        )
        .to({}, { duration: 0.3 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="What We Stand For"
      className="relative h-screen w-full overflow-hidden bg-[#fffff8]"
    >
      {/* title + subtitle */}
      <div
        ref={headingRef}
        className="absolute left-1/2 top-[clamp(56px,12vh,130px)] z-10 w-[min(92vw,760px)] text-center"
      >
        <h2
          ref={titleRef}
          className="font-serif font-light leading-[1.2] text-[#1e1e1e] text-[clamp(34px,4.6vw,64px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]"
        >
          What We Stand For
        </h2>
        <p
          ref={subtitleRef}
          className="mt-2 font-cy font-light leading-[1.5] text-[#1e1e1e] text-[clamp(15px,1.5vw,22px)]"
        >
          The values that guide every product and every conversation
        </p>
      </div>

      {/* timeline line + milestone dot */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-[38vh] z-10 h-[46vh] w-px bg-[rgba(30,30,30,0.3)]"
      />
      <div
        ref={dotRef}
        className="absolute left-1/2 top-[57vh] z-10 size-3 rounded-full bg-[#0C1E46]"
      />

      {/* value cards (one shown at a time, alternating sides, centred) */}
      {VALUES.map((value, i) => (
        <div
          key={value.title}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`absolute z-20 flex w-[clamp(340px,44vw,620px)] items-center gap-4 rounded-[5px] border border-[#CEDCE2] bg-gradient-to-r from-[rgba(112,208,233,0.12)] to-[rgba(0,142,208,0.12)] p-5 shadow-[0px_14px_40px_0px_rgba(0,0,0,0.16)] will-change-transform ${
            value.side === "right"
              ? "left-[calc(50%+clamp(16px,2vw,40px))]"
              : "right-[calc(50%+clamp(16px,2vw,40px))]"
          }`}
        >
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-cy capitalize leading-[1.3] text-black text-[clamp(22px,2.4vw,32px)]">
              {value.title}
            </h3>
            <p className="font-cy leading-[1.45] text-[rgba(0,0,0,0.7)] text-[clamp(15px,1.7vw,26px)]">
              {value.sub}
            </p>
          </div>
          <div className="relative size-[clamp(88px,9vw,148px)] shrink-0">
            <Image
              src={value.icon}
              alt=""
              fill
              sizes="148px"
              className="select-none object-contain"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
