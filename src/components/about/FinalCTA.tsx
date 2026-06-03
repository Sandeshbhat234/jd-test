"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A6 = "/About%20page/Animation%206";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leafRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const leaf = leafRef.current;
      const heading = headingRef.current;
      const button = buttonRef.current;
      if (!section || !leaf || !heading || !button) return;

      // Image drops in from above; the content rises from below.
      gsap.set(leaf, { yPercent: -70, autoAlpha: 0 });
      gsap.set([heading, button], { yPercent: 80, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 65%", once: true },
        })
        .to(leaf, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" })
        .to(
          heading,
          { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          "<0.2",
        )
        .to(
          button,
          { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
          "<0.15",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Ready to navigate your next high"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#fffff8] px-6">
      <div
        ref={leafRef}
        className="relative aspect-[1811/988] w-[min(72vw,760px)] will-change-transform">
        <Image
          src={`${A6}/cannabis_leaf_green_3d_.webp`}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 80vw, 760px"
          className="pointer-events-none select-none object-contain"
        />
      </div>

      <h2
        ref={headingRef}
        className="mt-[clamp(8px,2vh,24px)] max-w-[min(90vw,953px)] text-center font-serif font-light leading-[1.25] text-black text-[clamp(26px,4.4vw,56px)] will-change-transform">
        Are you ready to navigate your next incredible high today?
      </h2>

      <div ref={buttonRef} className="mt-[clamp(20px,4vh,40px)] will-change-transform">
        <button
          type="button"
          className="cursor-pointer rounded-full border border-[#0c1e46] bg-[linear-gradient(179deg,#173067_9%,#06122f_48%,#05102a_86%)] px-[clamp(32px,3.4vw,50px)] py-[clamp(8px,1.1vh,12px)] font-[family-name:var(--font-cy-grotesk)] font-medium uppercase text-white text-[clamp(16px,1.6vw,26px)] leading-none transition-transform hover:scale-[1.03]">
          Shop Now
        </button>
      </div>
    </section>
  );
}
