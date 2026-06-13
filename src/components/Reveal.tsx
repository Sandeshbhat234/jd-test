"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Direction = "up" | "down" | "left" | "right";

const DISTANCE = 44;

const FROM: Record<Direction, { x?: number; y?: number }> = {
  up: { y: DISTANCE },
  down: { y: -DISTANCE },
  left: { x: -DISTANCE },
  right: { x: DISTANCE },
};

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels in from (based on its placement). */
  direction?: Direction;
  /** Seconds of delay, handy for staggering siblings. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Wraps server-rendered content and reveals it once it scrolls into view.
 *
 * The wrapper is rendered with `visibility: hidden` on the server so there is
 * no flash before hydration; a `<noscript>` rule in the root layout makes the
 * content visible when JavaScript is unavailable. GSAP's `autoAlpha` then
 * drives both opacity and visibility, so the element never occupies a "blank
 * but interactive" state. ScrollTrigger fires once with no pin/scrub, which is
 * the pattern that behaves reliably on Safari and iOS.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Respect reduced-motion: show immediately, no movement.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, ...FROM[direction] },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            // Reveal a little before the element is fully on screen.
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [direction, delay] },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ visibility: "hidden", ...style }}
      data-reveal
    >
      {children}
    </div>
  );
}
