"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MIN_SCALE = 0.25;

type ScrollScaleImageProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[943/480]". */
  aspect: string;
  priority?: boolean;
};

/**
 * Section image that scales with scroll position: full size when the card is
 * centered in the viewport, easing down to 25% as it moves toward either edge.
 * The outer wrapper holds the layout box (never transformed) so the scroll
 * measurements stay stable; only the inner card is scaled.
 */
export default function ScrollScaleImage({
  src,
  alt,
  aspect,
  priority,
}: ScrollScaleImageProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const card = cardRef.current;
      if (!wrap || !card) return;

      // Honor reduced-motion: keep every image at full size.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(card, { scale: 1 });
        return;
      }

      // scale = 1 when the card's centre sits on the viewport centre, falling
      // to MIN_SCALE once the card has travelled half a viewport (+ half its
      // own height) away — i.e. fully off screen.
      const update = () => {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const cardCentre = rect.top + rect.height / 2;
        const dist = Math.abs(cardCentre - vh / 2);
        const maxDist = vh / 2 + rect.height / 2;
        const t = gsap.utils.clamp(0, 1, 1 - dist / maxDist);
        gsap.set(card, { scale: MIN_SCALE + (1 - MIN_SCALE) * t });
      };

      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: update,
      });

      // Runs inside useLayoutEffect (pre-paint) so there's no full-size flash.
      update();

      return () => trigger.kill();
    },
    { scope: wrapRef },
  );

  return (
    <div className={`relative w-full shrink-0 lg:w-[42%] ${aspect}`} ref={wrapRef}>
      <div
        ref={cardRef}
        className="absolute inset-0 origin-center overflow-hidden rounded-2xl bg-[#edece8] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
