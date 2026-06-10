"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A2 = "/About%20page/Animation%202";
const OVAL_IMAGE = "/About%20page/Animation%203/Rectangle%20-%20Image.webp";

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

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const leftColumn = leftColumnRef.current;
      const cardStack = cardStackRef.current;
      const cards = cardRefs.current;
      const texts = textRefs.current;
      const ovalImage = ovalImageRef.current;
      const whiteOval = whiteOvalRef.current;
      if (
        !section ||
        !heading ||
        !leftColumn ||
        !cardStack ||
        !ovalImage ||
        !whiteOval ||
        cards.length < 3 ||
        texts.length < 3 ||
        cards.some((c) => !c) ||
        texts.some((t) => !t)
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

      gsap.set(texts[0], { autoAlpha: 1, y: 0 });
      gsap.set([texts[1], texts[2]], { autoAlpha: 0, y: 20 });

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

      // Hidden until the section pins. This section sits one viewport higher
      // than normal (negative margin below) so it is tucked directly behind
      // the hero's white end screen; the moment the hero unpins and the white
      // is "covering", this section is already at the top and reveals in place.
      gsap.set([heading, cardStack], { autoAlpha: 0, scale: 0.94 });

      // --- pinned scroll sequence ---
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=760%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        // reveal in place — first thing that happens once the section pins,
        // i.e. right as the hero's white cover lifts. No slide-up hand-off.
        .to(
          [heading, cardStack],
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          0,
        )
        .to({}, { duration: 0.25 })
        .addLabel("cards")

        // card 0 -> 1: front card flies out, the rest straighten one step,
        // and the left text swaps to card 1.
        .to(cards[0], { ...exitVars }, "cards")
        .to(cards[1], { rotate: 0, duration: 1, ease: "power2.out" }, "cards")
        .to(cards[2], { rotate: -10, duration: 1, ease: "power2.out" }, "cards")
        .to(texts[0], { autoAlpha: 0, y: -20, duration: 0.5 }, "cards")
        .to(texts[1], { autoAlpha: 1, y: 0, duration: 0.6 }, "cards+=0.35")

        .to({}, { duration: 0.2 })

        // card 1 -> 2
        .to(cards[1], { ...exitVars }, ">")
        .to(cards[2], { rotate: 0, duration: 1, ease: "power2.out" }, "<")
        .to(texts[1], { autoAlpha: 0, y: -20, duration: 0.5 }, "<")
        .to(texts[2], { autoAlpha: 1, y: 0, duration: 0.6 }, "<+0.35")

        .to({}, { duration: 0.2 })

        // last card flies out while the whole left column rises out the top.
        .to(cards[2], { ...exitVars }, ">")
        .to(
          leftColumn,
          { yPercent: -130, autoAlpha: 0, duration: 1, ease: "power2.in" },
          "<",
        )

        .to({}, { duration: 0.15 })

        // oval image appears in the centre
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

        // white capsule grows to fill the screen -> fully white.
        .to(whiteOval, {
          width: overW,
          height: overH,
          duration: 1.1,
          ease: "power2.inOut",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="What Makes Us Different"
      className="relative -mt-[100vh] h-screen w-full overflow-hidden bg-[#fffef8]"
    >
      {/* left column: section heading + swapping card copy */}
      <div ref={leftColumnRef} className="pointer-events-none absolute inset-0 z-10">
        <div
          ref={headingRef}
          className="absolute left-[clamp(24px,8vw,132px)] top-[clamp(72px,16vh,170px)] w-[clamp(300px,50vw,760px)]"
        >
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
            className="absolute left-[clamp(24px,8vw,132px)] top-[clamp(420px,60vh,620px)] w-[clamp(300px,42vw,620px)] will-change-transform"
          >
            <h3 className="font-cy leading-[1.2] text-[#1e1e1e] text-[clamp(24px,3vw,36px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
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
        className="absolute right-[clamp(16px,7vw,150px)] z-20 h-[clamp(360px,58vh,586px)] aspect-[501/586]"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden rounded-[16px] shadow-[0px_4px_100px_0px_rgba(0,0,0,0.2)] will-change-transform"
          >
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
        className="absolute z-40 h-[60vh] overflow-hidden rounded-full aspect-[2855/3826] will-change-[width,height,transform]"
      >
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

      {/* white capsule that finally fills the screen */}
      <div
        ref={whiteOvalRef}
        className="absolute z-[45] h-[12vh] w-[12vw] rounded-full bg-white will-change-[width,height,transform]"
      />
    </section>
  );
}
