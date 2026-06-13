"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// lottie-react pulls in lottie-web, which touches `window`, so keep it client-only.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const HERO_IMAGE = "/About%20page/hero/hero.webp";
const BG_GRADIENT = "/About%20page/hero/Bg%20gradient/Frame%201.svg";
const LOGO_MARK = "/About%20page/hero/Coloured%20logo.svg";
const LOGO_FORMATION = "/About%20page/Logo%20formation.json";
// Frame count of Logo formation.json (op - ip); used as a fallback before the
// animation has reported its own duration.
const LOGO_FORMATION_FRAMES = 480;

// Shared gradient fill for the display words (from the Figma design).
const WORD_GRADIENT =
  "linear-gradient(172.8deg, rgba(17,83,142,0.5) 23.66%, rgba(104,152,222,0.5) 55.57%, rgba(170,220,233,0.5) 85.88%, rgba(255,255,255,0.5) 120.18%, rgba(255,255,255,0.5) 168.04%)";

const wordClass =
  "font-serif font-semibold leading-[1.05] whitespace-nowrap text-transparent bg-clip-text " +
  "text-[clamp(56px,15vw,300px)] [text-shadow:0px_4px_5px_rgba(0,0,0,0.1)] will-change-transform";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const word1OuterRef = useRef<HTMLDivElement | null>(null);
  const word1InnerRef = useRef<HTMLHeadingElement | null>(null);
  const word2OuterRef = useRef<HTMLDivElement | null>(null);
  const word2InnerRef = useRef<HTMLHeadingElement | null>(null);

  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const whiteFadeRef = useRef<HTMLDivElement | null>(null);

  // Final text screen (revealed when the image scrolls up).
  const textScreenRef = useRef<HTMLDivElement | null>(null);
  const textGroupRef = useRef<HTMLDivElement | null>(null);
  const textHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const textSubRef = useRef<HTMLParagraphElement | null>(null);

  // Scroll-driven logo formation Lottie that plays after the text reveal.
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const lottieBoxRef = useRef<HTMLDivElement | null>(null);
  const [logoFormation, setLogoFormation] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    fetch(LOGO_FORMATION)
      .then((res) => res.json())
      .then((data) => {
        if (active) setLogoFormation(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      const word1Outer = word1OuterRef.current;
      const word1Inner = word1InnerRef.current;
      const word2Outer = word2OuterRef.current;
      const word2Inner = word2InnerRef.current;
      const imageBox = imageBoxRef.current;
      const caption = captionRef.current;
      const line = lineRef.current;
      const logo = logoRef.current;
      const whiteFade = whiteFadeRef.current;
      const textScreen = textScreenRef.current;
      const textGroup = textGroupRef.current;
      const textHeading = textHeadingRef.current;
      const textSub = textSubRef.current;
      const lottieBox = lottieBoxRef.current;
      if (
        !section ||
        !bg ||
        !word1Outer ||
        !word1Inner ||
        !word2Outer ||
        !word2Inner ||
        !imageBox ||
        !caption ||
        !line ||
        !logo ||
        !whiteFade ||
        !textScreen ||
        !textGroup ||
        !textHeading ||
        !textSub ||
        !lottieBox
      )
        return;

      // Geometry helpers (recomputed on ScrollTrigger refresh / resize).
      const gap = () => Math.max(20, window.innerWidth * 0.036);
      const imgLeft = () => word1Outer.getBoundingClientRect().right + gap();
      // Box stays at a fixed height while it grows horizontally, until its
      // aspect ratio matches the screen — at 42vh that target width is 42vw.
      const heightB = () => window.innerHeight * 0.42;
      const growW = () => window.innerWidth * 0.42;

      // --- initial state ---
      gsap.set([word1Outer, word2Outer], { top: "50%", yPercent: -50 });
      gsap.set(imageBox, {
        top: "50%",
        yPercent: -50,
        left: imgLeft,
        width: 0,
        height: heightB,
        borderRadius: 16,
      });
      gsap.set(word2Outer, { left: () => imgLeft() + gap() });

      // Word masks hidden before the intro reveal.
      gsap.set([word1Inner, word2Inner], { yPercent: 115 });
      // Background fades in on load; everything else waits for scroll.
      gsap.set(bg, { autoAlpha: 0 });
      gsap.set([caption, logo], { autoAlpha: 0, y: 28 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(whiteFade, { autoAlpha: 0 });

      // Final text screen + its reveal masks.
      gsap.set(textScreen, { autoAlpha: 0 });
      gsap.set(textHeading, { yPercent: 110 });
      gsap.set(textSub, { autoAlpha: 0, y: 24 });
      // Logo formation Lottie sits below the text, hidden until its turn.
      gsap.set(lottieBox, { autoAlpha: 0, y: 28 });

      // Proxy GSAP scrubs to drive the Lottie playhead frame-by-frame.
      const lottieProxy = { frame: 0 };
      const lastFrame = () =>
        (lottieRef.current?.getDuration(true) ?? LOGO_FORMATION_FRAMES) - 1;

      // --- intro reveal (plays on load): only the display words + bg ---
      const intro = gsap.timeline({ delay: 0.15 });
      intro
        .to(bg, { autoAlpha: 1, duration: 1.4, ease: "power1.out" }, 0)
        .to(word1Inner, { yPercent: 0, duration: 1.1, ease: "power3.out" }, 0.1)
        .to(
          word2Inner,
          { yPercent: 0, duration: 1.1, ease: "power3.out" },
          0.24,
        );

      // --- scroll-driven sequence (pinned) ---
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450%",
          pin: true,
          pinSpacing: true,
          // Lower scrub = the playhead tracks the scroll closely (little lag),
          // so the logo lands on 100% right at the unpin instead of needing a
          // long catch-up hold afterwards.
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        // Phase B — grow horizontally only. JD's stays put, the image widens
        // between the words and pushes JUNGLE off the right edge. The caption
        // and the bottom logo rise in at the same time.
        .to(imageBox, { width: growW, duration: 1 }, 0)
        .to(word2Outer, { x: growW, duration: 1 }, 0)
        .to([caption, logo], { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
        .to(line, { scaleX: 1, duration: 0.8 }, 0.1)

        .to({}, { duration: 0.15 })

        // Phase C — grow both ways to fill the screen. As it takes over the
        // screen the words, caption and logo all vanish, and the white bottom
        // fade ramps in.
        .to(
          imageBox,
          {
            left: 0,
            top: 0,
            yPercent: 0,
            width: () => window.innerWidth,
            height: () => window.innerHeight,
            borderRadius: 0,
            duration: 1.3,
          },
          ">",
        )
        .to(
          [word1Outer, word2Outer, caption, line, logo, bg],
          { autoAlpha: 0, duration: 0.5 },
          "<",
        )
        .to(whiteFade, { autoAlpha: 1, duration: 0.8 }, "<+0.45")

        .to({}, { duration: 0.15 })

        // Phase D — the full image scrolls up and out, revealing the text
        // screen beneath, which then reveals with its own animation.
        .set(textScreen, { autoAlpha: 1 }, ">")
        .to(imageBox, { yPercent: -100, duration: 1.2 }, "<")
        .to(
          textHeading,
          { yPercent: 0, duration: 1, ease: "power3.out" },
          "<+0.5",
        )
        .to(
          textSub,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "<+0.25",
        )

        .to({}, { duration: 0.3 })

        // Phase E — the text nudges up to make room, and the logo formation
        // Lottie plays below it, scrubbed frame-by-frame with the scroll.
        // When it finishes the section unpins into the next section.
        .to(
          textGroup,
          {
            y: () => -window.innerHeight * 0.07,
            duration: 0.7,
            ease: "power2.out",
          },
          ">",
        )
        .to(
          lottieBox,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<",
        )
        .to(
          lottieProxy,
          {
            frame: lastFrame,
            duration: 2.4,
            ease: "none",
            onUpdate: () =>
              lottieRef.current?.goToAndStop(lottieProxy.frame, true),
          },
          ">-0.2",
        )

        // Short buffer so the logo settles on its final frame before the
        // section unpins. With the lower scrub above this only needs to be
        // brief — no long dead-scroll once the logo has formed.
        .to({}, { duration: 0.4 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="JD's Jungle — Rooted in New York. Rising for everyone."
      // `md:z-20` keeps this section (its white text screen included) above the
      // next one, which tucks underneath via `md:-mt-[100vh]`. The next section
      // stays hidden behind the white until this one unpins — so its content is
      // only revealed once the screen is fully covered.
      className="relative z-0 h-screen w-full overflow-hidden bg-[#fffef8] md:z-20">
      {/* soft gradient wash */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={BG_GRADIENT}
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
      </div>

      {/* final text screen — sits behind the image until it scrolls up */}
      <div
        ref={textScreenRef}
        className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-[clamp(24px,5vh,72px)] bg-[#ffffff] px-6 text-center">
        <div
          ref={textGroupRef}
          className="mx-auto flex w-full max-w-[1322px] flex-col items-center gap-4 will-change-transform">
          <div className="overflow-hidden">
            <h2
              ref={textHeadingRef}
              className="font-serif font-light leading-[1.5] text-[#1e1e1e] text-[clamp(28px,4.5vw,64px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)] will-change-transform">
              A licensed adult-use dispensary.
              <br aria-hidden />
              Rooted in New York, built for New Yorkers.
            </h2>
          </div>
          <p
            ref={textSubRef}
            className="font-cy font-light leading-[1.5] text-[rgba(30,30,30,0.5)] text-[clamp(16px,2.4vw,32px)] will-change-transform">
            We bring together quality, community, and honest guidance.
            JD&rsquo;s Jungle is a space where every customer, from the curious
            first-timer to the seasoned connoisseur, feels at home.
          </p>
        </div>

        {/* logo formation — plays frame-by-frame as you scroll past the text */}
        <div
          ref={lottieBoxRef}
          className="aspect-[640/360] w-[clamp(240px,40vw,560px)] will-change-transform">
          {logoFormation ? (
            <Lottie
              lottieRef={lottieRef}
              animationData={logoFormation}
              autoplay={false}
              loop={false}
              className="h-full w-full"
            />
          ) : null}
        </div>
      </div>

      {/* JD's (stays anchored at the left) */}
      <div
        ref={word1OuterRef}
        className="absolute left-[clamp(24px,4vw,58px)] z-10 overflow-hidden">
        <h1
          ref={word1InnerRef}
          className={wordClass}
          style={{ backgroundImage: WORD_GRADIENT }}>
          JD&rsquo;s
        </h1>
      </div>

      {/* the image that grows out from the middle */}
      <div
        ref={imageBoxRef}
        className="absolute left-0 z-20 overflow-hidden will-change-[width,height,transform]">
        <Image
          src={HERO_IMAGE}
          alt="Cannabis plant against a blue sky"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
        {/* white bottom fade, revealed once the image fills the screen */}
        <div
          ref={whiteFadeRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[42vh] bg-gradient-to-t from-white via-white/85 to-transparent"
        />
      </div>

      {/* JUNGLE (pushed off the right edge as the image grows) */}
      <div ref={word2OuterRef} className="absolute z-10 overflow-hidden">
        <h2
          ref={word2InnerRef}
          className={wordClass}
          style={{ backgroundImage: WORD_GRADIENT }}>
          JUNGLE
        </h2>
      </div>

      {/* caption + rule (rise in on scroll) */}
      <div
        ref={captionRef}
        className="absolute bottom-[clamp(24px,5vh,56px)] left-[clamp(24px,4vw,58px)] right-[clamp(96px,9vw,160px)] z-10 flex items-center gap-[clamp(16px,2vw,32px)]">
        <p className="whitespace-nowrap font-cy text-[clamp(15px,1.8vw,32px)] leading-[1.5] text-[rgba(30,30,30,0.9)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
          Rooted in New York. Rising for everyone.
        </p>
        <span ref={lineRef} className="h-px flex-1 bg-[rgba(30,30,30,0.3)]" />
      </div>

      {/* logo mark (rises in on scroll) */}
      <div
        ref={logoRef}
        className="absolute bottom-[clamp(20px,4vh,44px)] right-[clamp(24px,3vw,58px)] z-10 size-[clamp(40px,4vw,64px)]">
        <Image
          src={LOGO_MARK}
          alt=""
          fill
          sizes="64px"
          className="select-none object-contain"
        />
      </div>
    </section>
  );
}
