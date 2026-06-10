"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fraction of the timeline (and of scroll progress) used by the city/overlay
// reveal. The remainder is the cannabis growth. Kept in one place so the snap
// points and the tween positions stay in sync.
const REVEAL = 0.4;

// How far (in % of their own height) the city and cannabis settle up from the
// bottom once revealed.
const LIFT = -20;

export default function JungleStorySequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const skylineRef = useRef<HTMLDivElement | null>(null);
  const curveRef = useRef<HTMLDivElement | null>(null);
  const cannabisRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const skyline = skylineRef.current;
      const curve = curveRef.current;
      const cannabis = cannabisRef.current;
      if (!section || !skyline || !curve || !cannabis) return;

      // Image and overlay start just below the viewport, fully opaque — they
      // are revealed by sliding up, not by fading.
      gsap.set([skyline, curve], { yPercent: 100 });
      gsap.set(cannabis, { opacity: 0, scale: 0.16, transformOrigin: "50% 100%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Two snap stops: one scroll commits the city + overlay reveal, the
          // very next scroll commits the cannabis growth.
          snap: {
            snapTo: [0, REVEAL, 1],
            duration: { min: 0.15, max: 0.5 },
            ease: "power2.out",
          },
        },
      });

      // Reveal — the city image leads and lifts up, the white overlay trails a
      // touch behind (slower) and settles at the bottom for a parallax feel.
      // Total timeline duration is 1 so timeline time maps directly onto
      // ScrollTrigger progress (and the snap points).
      tl.to(skyline, { yPercent: LIFT, duration: 0.18, ease: "power2.out" }, 0)
        .to(curve, { yPercent: 0, duration: REVEAL, ease: "power2.out" }, 0)

        // Cannabis appears and grows quickly from its base, lifting up with the
        // city, on the next scroll.
        .to(cannabis, { opacity: 1, duration: 0.05 }, REVEAL)
        .to(
          cannabis,
          { scale: 1.04, yPercent: LIFT, duration: 1 - REVEAL, ease: "power2.out" },
          REVEAL,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#fffff8]"
      aria-label="JD's Jungle skyline">
      <div
        ref={cannabisRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex h-[85%] w-full max-w-275 items-end justify-center will-change-transform">
        <div className="relative h-full w-full">
          <Image
            src="/abt/cannabis.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1100px"
            className="select-none object-contain object-bottom"
          />
        </div>
      </div>

      <div
        ref={skylineRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full will-change-transform">
        <div className="relative h-[55vh] w-full sm:h-[60vh]">
          <Image
            src="/abt/sky_line_with_sea_1_5x.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="select-none object-cover object-bottom"
          />
        </div>
      </div>

      {/* Smooth white curve — touches the left/right edges and the bottom,
          no shadow. Stretched edge-to-edge with preserveAspectRatio="none". */}
      <div
        ref={curveRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[42vh] w-full will-change-transform">
        <svg
          preserveAspectRatio="none"
          viewBox="16.5 0 1764.5 446.505"
          fill="none"
          className="block h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M269.5 122.481C177.105 57.803 53.5 62.703 16.5 74.253L16.5 446.505L1781 446.505L1781 151.603C1749.5 175.053 1721.33 187.493 1702 195.076C1473 273.68 1154 266.753 1027.5 178.48C916.76 101.203 716.5 122.481 643.5 155.381C570.5 188.281 409.045 220.164 269.5 122.481Z"
            fill="#FFFEF8"
          />
        </svg>
      </div>
    </section>
  );
}
