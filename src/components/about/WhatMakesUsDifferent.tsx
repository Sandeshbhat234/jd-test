"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STAND_FOR_VALUES } from "./standForValues";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A2 = "/About%20page/Animation%202";
const OVAL_IMAGE = "/About%20page/Animation%203/Rectangle%20-%20Image.webp";

// How far a "What We Stand For" value card drifts as it leaves / enters (px).
const RISE = 64;

// Jungle story reveal: how far (% of own height) the city / cannabis settle up.
const STORY_LIFT = -20;

type Card = { img: string; alt: string; title: string; sub: string };

const CARDS: Card[] = [
  {
    img: `${A2}/Cannabis.webp`,
    alt: "Cannabis leaf against a blue sky",
    title: "Licensed by NY State",
    sub: "Proudly licensed by the New York Office of Cannabis Management.",
  },
  {
    img: `${A2}/Lab%20Testing.webp`,
    alt: "Cannabis oil being dropped onto a leaf in a petri dish",
    title: "State-Mandated Lab Testing",
    sub: "Every product passes required lab testing before it reaches you.",
  },
  {
    img: `${A2}/Team.webp`,
    alt: "Silhouettes of the JD's Jungle team",
    title: "Knowledgeable Team",
    sub: "We cut through the noise and help you find what works.",
  },
];

// Curved exit toward the top-right, reused for each card.
const exitVars: gsap.TweenVars = {
  keyframes: [
    { xPercent: 35, yPercent: -12, rotate: 12, duration: 0.4 },
    { xPercent: 220, yPercent: -48, rotate: 30, autoAlpha: 0, duration: 0.6 },
  ],
  ease: "power1.in",
};

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ovalImageRef = useRef<HTMLDivElement | null>(null);
  const whiteOvalRef = useRef<HTMLDivElement | null>(null);
  // "What We Stand For" content, revealed inside the white capsule.
  const sfHeadingRef = useRef<HTMLDivElement | null>(null);
  const sfLineRef = useRef<HTMLDivElement | null>(null);
  const sfDotRef = useRef<HTMLDivElement | null>(null);
  const sfCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Jungle story reveal (city skyline + cannabis), played after the values.
  const storySkylineRef = useRef<HTMLDivElement | null>(null);
  const storyCurveRef = useRef<HTMLDivElement | null>(null);
  const storyCannabisRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Desktop only — on mobile this renders as a static vertical stack of
      // cards (see the `max-md:block` mobile block below), no pinned animation.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const leftColumn = leftColumnRef.current;
        const cardStack = cardStackRef.current;
        const cards = cardRefs.current;
        const texts = textRefs.current;
        const ovalImage = ovalImageRef.current;
        const whiteOval = whiteOvalRef.current;
        const sfHeading = sfHeadingRef.current;
        const sfLine = sfLineRef.current;
        const sfDot = sfDotRef.current;
        const sfCards = sfCardRefs.current;
        const storySkyline = storySkylineRef.current;
        const storyCurve = storyCurveRef.current;
        const storyCannabis = storyCannabisRef.current;
        if (
          !section ||
          !heading ||
          !leftColumn ||
          !cardStack ||
          !ovalImage ||
          !whiteOval ||
          !sfHeading ||
          !sfLine ||
          !sfDot ||
          !storySkyline ||
          !storyCurve ||
          !storyCannabis ||
          cards.length < 3 ||
          texts.length < 3 ||
          sfCards.length < STAND_FOR_VALUES.length ||
          cards.some((c) => !c) ||
          texts.some((t) => !t) ||
          sfCards.some((c) => !c)
        )
          return;

        // Grow the ovals well past the viewport so their straight middle covers
        // the whole screen while the capsule shape itself never changes.
        const overW = () => window.innerWidth * 2.6;
        const overH = () => window.innerHeight * 2.6;

        // --- rest state ---
        gsap.set(cardStack, { top: "50%", yPercent: -50 });
        gsap.set(cards, { transformOrigin: "50% 100%" });
        gsap.set(cards[0], { rotate: 0, zIndex: 30 });
        gsap.set(cards[1], { rotate: -10, zIndex: 20 });
        gsap.set(cards[2], { rotate: -20, zIndex: 10 });

        // All card copy is vertically centred (yPercent -50, paired with the
        // `top-1/2` class) so it lines up with the centred card stack. It starts
        // hidden; card 0's copy is revealed together with the stack below.
        gsap.set(texts, { yPercent: -50, autoAlpha: 0, y: 20 });

        gsap.set(ovalImage, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 0.92,
          autoAlpha: 0,
        });
        gsap.set(whiteOval, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
        });

        // "What We Stand For" content stays hidden while the capsule grows, then
        // fades in once it fully covers the screen (see the reveal in the
        // timeline below). Cards 2-4 then swap in one at a time.
        gsap.set(sfHeading, { xPercent: -50, autoAlpha: 0 });
        gsap.set(sfLine, {
          xPercent: -50,
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(sfDot, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0 });
        gsap.set(sfCards, { top: "57vh", yPercent: -50, autoAlpha: 0 });

        // Jungle story images start just below the viewport / tiny, revealed at
        // the very end (after the values) by sliding up like the mobile section.
        gsap.set([storySkyline, storyCurve], { yPercent: 100 });
        gsap.set(storyCannabis, {
          opacity: 0,
          scale: 0.16,
          transformOrigin: "50% 100%",
        });

        // The card stack is hidden until the section pins. This section sits one
        // viewport higher than normal (negative margin below) so it is tucked
        // directly behind the hero's white end screen; the moment the hero unpins
        // the stack reveals in place. The heading stays visible by default.
        gsap.set(cardStack, { autoAlpha: 0, scale: 0.94 });

        // Card in/out helpers for the "What We Stand For" values (one at a time;
        // each fully out before the next fades in from just below).
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

        // --- pinned scroll sequence ---
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Longer now: this section plays its own cards, reveals "What We
            // Stand For" inside the white capsule and runs its value cards, then
            // finishes with the jungle-story skyline + cannabis reveal.
            end: "+=1450%",
            pin: true,
            pinSpacing: true,
            // Low lag so the white capsule reaches full coverage right at the
            // unpin — no cream/image edges showing through at the handoff.
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          // reveal in place — the card stack and its copy appear together, right
          // as the hero's white cover lifts. No slide-up hand-off.
          .to(
            cardStack,
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
            0,
          )
          .to(
            texts[0],
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0,
          )
          .to({}, { duration: 0.25 })
          .addLabel("cards")

          // card 0 -> 1: front card flies out, the rest straighten one step,
          // and the left text swaps to card 1.
          .to(cards[0], { ...exitVars }, "cards")
          .to(cards[1], { rotate: 0, duration: 1, ease: "power2.out" }, "cards")
          .to(
            cards[2],
            { rotate: -10, duration: 1, ease: "power2.out" },
            "cards",
          )
          .to(texts[0], { autoAlpha: 0, y: -20, duration: 0.5 }, "cards")
          .to(texts[1], { autoAlpha: 1, y: 0, duration: 0.6 }, "cards+=0.35")

          .to({}, { duration: 0.2 })

          // card 1 -> 2
          .to(cards[1], { ...exitVars }, ">")
          .to(cards[2], { rotate: 0, duration: 1, ease: "power2.out" }, "<")
          .to(texts[1], { autoAlpha: 0, y: -20, duration: 0.5 }, "<")
          .to(texts[2], { autoAlpha: 1, y: 0, duration: 0.6 }, "<+0.35")

          .to({}, { duration: 0.2 })
          .addLabel("lastCardOut")

          // last card flies out while the whole left column rises out the top.
          .to(cards[2], { ...exitVars }, "lastCardOut")
          .to(
            leftColumn,
            { yPercent: -130, autoAlpha: 0, duration: 1, ease: "power2.in" },
            "lastCardOut",
          )

          // capsule window appears in the centre once the last card has fully
          // vanished (appended after its exit completes — no overlap).
          .to(ovalImage, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          })

          .to({}, { duration: 0.2 })

          // the capsule window grows (image stays put) until it covers the
          // screen; the white capsule (screen ratio) fades in at the centre at
          // the same time.
          .to(
            ovalImage,
            {
              width: overW,
              height: overH,
              duration: 1.3,
              ease: "power2.inOut",
            },
            ">",
          )
          .to(whiteOval, { autoAlpha: 1, duration: 0.5 }, "<+0.4")

          .to({}, { duration: 0.2 })

          // white capsule grows until it fully covers the screen (blank white —
          // the content inside stays hidden during the grow).
          .to(whiteOval, {
            width: overW,
            height: overH,
            duration: 1.1,
            ease: "power2.inOut",
          })

          // once it's covering, fade "What We Stand For" in (heading, then the
          // timeline line, dot and first card, lightly staggered).
          .to({}, { duration: 0.15 })
          .to(sfHeading, { autoAlpha: 1, duration: 0.6, ease: "power2.out" })
          .to(sfLine, { scaleY: 1, duration: 0.6, ease: "power2.out" }, "<+0.15")
          .to(
            sfDot,
            { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
            "<+0.2",
          )
          .fromTo(
            sfCards[0],
            { y: RISE * 0.5, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
              immediateRender: false,
            },
            "<+0.1",
          )

          // then run its value cards one at a time, just like the rest of the
          // page — each fully out before the next fades in from just below.
          .to({}, { duration: 0.4 })
          .to(sfCards[0], {
            y: -RISE,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.in",
          })
          .fromTo(sfCards[1], mkInFrom(), mkInTo())
          .to({}, { duration: 0.4 })
          .to(sfCards[1], mkOut())
          .fromTo(sfCards[2], mkInFrom(), mkInTo())
          .to({}, { duration: 0.4 })
          .to(sfCards[2], mkOut())
          .fromTo(sfCards[3], mkInFrom(), mkInTo())
          .to({}, { duration: 0.4 })
          .to(sfCards[3], mkOut())
          .to(
            [sfHeading, sfLine, sfDot],
            { autoAlpha: 0, y: -20, duration: 0.7, ease: "power2.in" },
            "<",
          )
          .to({}, { duration: 0.3 })

          // ---- Jungle story: once the values have gone, the city skyline +
          // white curve slide up and the cannabis grows from its base. ----
          .addLabel("story")
          .to(
            storySkyline,
            { yPercent: STORY_LIFT, duration: 0.5, ease: "power2.out" },
            "story",
          )
          .to(
            storyCurve,
            { yPercent: 0, duration: 1.2, ease: "power2.out" },
            "story",
          )
          .to(storyCannabis, { opacity: 1, duration: 0.1 }, "story+=1")
          .to(
            storyCannabis,
            {
              scale: 1.04,
              yPercent: STORY_LIFT,
              duration: 1.8,
              ease: "power2.out",
            },
            "story+=1",
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="What Makes Us Different"
      // Sits above AboutHero (which is z-20 over the hero handoff) but BELOW the
      // next section: What We Stand For grows itself in over this one through a
      // capsule iris, so it needs to paint on top.
      className="relative z-0 h-screen w-full overflow-hidden bg-[#fffff8] md:-mt-[100vh] max-md:h-auto max-md:overflow-visible">
      {/* ---------- mobile: heading + cards stacked one below another ---------- */}
      <div className="hidden px-5 py-14 max-md:block">
        <div className="text-center">
          <h2 className="font-serif font-light leading-[1.1] text-[#1e1e1e] text-[34px] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
            What Makes Us Different
          </h2>
          <p className="mx-auto mt-3 max-w-[330px] font-cy font-light leading-[1.5] text-[#1e1e1e] text-[14px]">
            Three reasons New Yorkers keep coming back – no guesswork, no hype.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-9">
          {CARDS.map((card) => (
            <div key={card.title} className="flex flex-col gap-4">
              <div className="relative aspect-[501/586] w-full overflow-hidden rounded-[16px] shadow-[0px_4px_60px_0px_rgba(0,0,0,0.2)]">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  sizes="90vw"
                  className="select-none object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="leading-[1.2] text-[#1e1e1e] text-[24px] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
                  {card.title}
                </h3>
                <p className="mt-3 font-cy font-light leading-[1.5] text-[#1e1e1e] text-[15px]">
                  {card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- desktop: pinned card-stack animation ---------- */}
      {/* left column: section heading + swapping card copy */}
      <div
        ref={leftColumnRef}
        className="pointer-events-none absolute inset-0 z-10 max-md:hidden">
        <div
          ref={headingRef}
          className="absolute left-[clamp(24px,8vw,132px)] top-[clamp(100px,16vh,170px)] w-[clamp(300px,50vw,760px)]">
          <h2 className="font-serif font-light leading-[1.1] text-[#1e1e1e] text-[clamp(34px,4.6vw,64px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
            What Makes Us Different
          </h2>
          <p className="mt-2 font-cy font-light leading-[1.5] text-[#1e1e1e] text-[clamp(14px,1.3vw,18px)]">
            Three reasons New Yorkers keep coming back – no guesswork, no hype.
          </p>
        </div>

        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute left-[clamp(24px,8vw,132px)] top-1/2 w-[clamp(300px,42vw,620px)] will-change-transform">
            <h3 className="leading-[1.2] text-[#1e1e1e] text-[clamp(24px,3vw,36px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
              {card.title}
            </h3>
            <p className="mt-4 font-cy font-light leading-[1.5] text-[#1e1e1e] text-[clamp(15px,1.6vw,26px)]">
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* right: stacked, tilted cards */}
      <div
        ref={cardStackRef}
        className="absolute right-[clamp(16px,7vw,150px)] z-20 h-[clamp(360px,58vh,586px)] aspect-[501/586] max-md:hidden">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden rounded-[16px] shadow-[0px_4px_100px_0px_rgba(0,0,0,0.2)] will-change-transform">
            <Image
              src={card.img}
              alt={card.alt}
              fill
              sizes="(max-width: 768px) 80vw, 501px"
              className="select-none object-cover"
            />
          </div>
        ))}
      </div>

      {/* capsule window onto a screen-filling image: the image never rescales,
          only the window grows. Inner is viewport-sized and centred, so while
          the window is screen-centred it always lines up with the full screen. */}
      <div
        ref={ovalImageRef}
        className="absolute z-40 h-[60vh] overflow-hidden rounded-full aspect-[2855/3826] will-change-[width,height,transform] max-md:hidden">
        <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
          <Image
            src={OVAL_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="select-none object-cover"
          />
        </div>
      </div>

      {/* White capsule that fills the screen — a window (overflow hidden) onto
          the whole "What We Stand For" section. The inner is viewport-sized and
          centred, so as the capsule grows it reveals the real section in place;
          its value cards then swap one at a time (driven above). */}
      <div
        ref={whiteOvalRef}
        className="absolute z-[45] h-[12vh] w-[12vw] overflow-hidden rounded-full bg-[#fffff8] will-change-[width,height,transform] max-md:hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
          {/* title + subtitle */}
          <div
            ref={sfHeadingRef}
            className="absolute left-1/2 top-[clamp(56px,12vh,130px)] z-10 w-[min(92vw,760px)] text-center">
            <h2 className="font-serif font-light leading-[1.2] text-[#1e1e1e] text-[clamp(34px,4.6vw,64px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
              What We Stand For
            </h2>
            <p className="mt-2 font-cy font-light leading-[1.5] text-[#1e1e1e] text-[clamp(15px,1.5vw,22px)]">
              The values that guide every product and every conversation
            </p>
          </div>

          {/* timeline line + milestone dot */}
          {/* Centred on the dot/cards (57vh): top = 57vh − height/2 so the
              dot sits at the line's midpoint. */}
          <div
            ref={sfLineRef}
            className="absolute left-1/2 top-[34vh] z-10 h-[46vh] w-px bg-[rgba(30,30,30,0.3)]"
          />
          <div
            ref={sfDotRef}
            className="absolute left-1/2 top-[57vh] z-10 size-3 rounded-full bg-[#0C1E46]"
          />

          {/* value cards (one shown at a time, alternating sides, centred) */}
          {STAND_FOR_VALUES.map((value, i) => (
            <div
              key={value.title}
              ref={(el) => {
                sfCardRefs.current[i] = el;
              }}
              className={`absolute z-20 flex w-[clamp(340px,44vw,620px)] items-center gap-4 rounded-[5px] border border-[#CEDCE2] bg-gradient-to-r from-[rgba(112,208,233,0.12)] to-[rgba(0,142,208,0.12)] p-5 shadow-[0px_14px_40px_0px_rgba(0,0,0,0.16)] will-change-transform ${
                value.side === "right"
                  ? "left-[calc(50%+clamp(16px,2vw,40px))]"
                  : "right-[calc(50%+clamp(16px,2vw,40px))]"
              }`}>
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="capitalize leading-[1.3] text-black text-[clamp(19px,2vw,27px)]">
                  {value.title}
                </h3>
                <p className="font-cy leading-[1.45] text-[rgba(0,0,0,0.7)] text-[clamp(13px,1.3vw,20px)]">
                  {value.sub}
                </p>
              </div>
              <div className="relative size-[clamp(56px,5.5vw,96px)] shrink-0">
                <Image
                  src={value.icon}
                  alt=""
                  fill
                  sizes="96px"
                  className="select-none object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jungle story reveal — city skyline + cannabis that rise in over the
          white capsule once the values have finished. (Desktop only; the mobile
          version is the standalone JungleStorySequence section.) */}
      <div
        ref={storyCannabisRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 mx-auto flex h-[85%] w-full max-w-275 items-end justify-center will-change-transform max-md:hidden">
        <div className="relative h-full w-full">
          <Image
            src="/abt/cannabis.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className="select-none object-contain object-bottom"
          />
        </div>
      </div>

      <div
        ref={storySkylineRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-55 w-full will-change-transform max-md:hidden">
        <div className="relative h-[55vh] w-full sm:h-[60vh]">
          <Image
            src="/abt/sky_line_with_sea_1_5x.webp"
            alt=""
            fill
            sizes="100vw"
            className="select-none object-cover object-bottom"
          />
        </div>
      </div>

      <div
        ref={storyCurveRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-60 h-[42vh] w-full will-change-transform max-md:hidden">
        <svg
          preserveAspectRatio="none"
          viewBox="16.5 0 1764.5 446.505"
          fill="none"
          className="block h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M269.5 122.481C177.105 57.803 53.5 62.703 16.5 74.253L16.5 446.505L1781 446.505L1781 151.603C1749.5 175.053 1721.33 187.493 1702 195.076C1473 273.68 1154 266.753 1027.5 178.48C916.76 101.203 716.5 122.481 643.5 155.381C570.5 188.281 409.045 220.164 269.5 122.481Z"
            fill="#FFFFF8"
          />
        </svg>
      </div>
    </section>
  );
}
