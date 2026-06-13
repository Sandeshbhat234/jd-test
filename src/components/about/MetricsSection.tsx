"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StatCard from "./StatCard";
import Button from "@/components/ui/Button";
import { SHOP_URL } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  { value: "2026", label: "Licensed Since", bgImage: "/about-us/metrics_image_1_1_5x.webp" },
  { value: "2,500+", label: "5-Star Reviews", bgImage: "/about-us/metrics_image_2_1_5x.webp" },
  { value: "5 NYC", label: "Boroughs Served", bgImage: "/about-us/metrics_image_3_1_5x.webp" },
  { value: "100%", label: "Lab-Tested", bgImage: "/about-us/metrics_image_4_1_5x.webp" },
];

const EDGE_MARGIN = 48;

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const leafRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const cards = cardsRef.current;
      const leaf = leafRef.current;
      const cta = ctaRef.current;
      if (!section || !title || !cards || !leaf || !cta) return;

      gsap.set(leaf, { rotation: -23.66, transformOrigin: "50% 50%" });
      gsap.set(cta, { opacity: 0, y: 24 });

      const bottomLeftDelta = () => ({
        x: -(section.offsetWidth - leaf.offsetWidth - 2 * EDGE_MARGIN),
        y: section.offsetHeight - leaf.offsetHeight - 2 * EDGE_MARGIN,
      });
      const centerDelta = () => ({
        x: -((section.offsetWidth - leaf.offsetWidth) / 2 - EDGE_MARGIN),
        y: section.offsetHeight * 0.32 - leaf.offsetHeight / 2 - EDGE_MARGIN,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=380%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        leaf,
        {
          x: () => bottomLeftDelta().x,
          y: () => bottomLeftDelta().y,
          rotation: 336.34,
          duration: 2,
        },
        0
      )
        .to({}, { duration: 0.3 })
        .to(title, { opacity: 0, duration: 1 }, ">")
        .to(cards, { opacity: 0, duration: 1 }, "<")
        .to(
          leaf,
          {
            x: () => centerDelta().x,
            y: () => centerDelta().y,
            rotation: 606.34,
            duration: 1.5,
          },
          "<"
        )
        .to({}, { duration: 0.2 })
        .to(cta, { opacity: 1, y: 0, duration: 1.2 }, ">")
        .to({}, { duration: 0.4 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#fffef8]"
      aria-label="No noise. No guesswork."
    >
      <div className="absolute inset-0 flex flex-col items-start justify-center gap-[clamp(32px,5vw,96px)] px-[clamp(24px,5vw,80px)] py-12">
        <div
          ref={titleRef}
          className="font-serif w-full max-w-400 font-light leading-[1.23] tracking-tight text-black text-[clamp(1.75rem,3.2vw,56px)] will-change-[opacity]"
        >
          <p>No noise. No guesswork.</p>
          <p>
            Just premium quality, transparent details, and absolute trust.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex w-full max-w-400 gap-6 overflow-x-auto pb-2 will-change-[opacity]"
        >
          {CARDS.map((card, i) => (
            <StatCard
              key={card.value}
              value={card.value}
              label={card.label}
              bgImage={card.bgImage}
              activeIndex={i}
              total={CARDS.length}
            />
          ))}
        </div>
      </div>

      <div
        ref={leafRef}
        className="pointer-events-none absolute top-12 right-12 z-40 aspect-square w-[clamp(220px,28vw,400px)] will-change-transform"
      >
        <Image
          src="/about-us/leaf_left_1_5x.webp"
          alt=""
          fill
          preload
          sizes="(max-width: 768px) 50vw, 400px"
          className="select-none object-contain"
        />
      </div>

      <div
        ref={ctaRef}
        className="absolute left-1/2 top-[64%] z-30 flex w-full max-w-238 -translate-x-1/2 flex-col items-center gap-[clamp(20px,2.2vw,40px)] px-6 will-change-[opacity]"
      >
        <h3 className="font-serif text-center font-light leading-[1.3] tracking-tight text-black text-[clamp(1.5rem,3.2vw,56px)]">
          Are you ready to navigate your next incredible high today?
        </h3>
        <Button href={SHOP_URL} variant="primary">
          SHOP NOW
        </Button>
      </div>
    </section>
  );
}
