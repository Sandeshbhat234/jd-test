"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function JungleStorySequence() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const builtSceneRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const skylineRef = useRef<HTMLDivElement | null>(null);
  const cannabisRef = useRef<HTMLDivElement | null>(null);

  const logoSceneRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);

  const exteriorSceneRef = useRef<HTMLDivElement | null>(null);
  const interiorSceneRef = useRef<HTMLDivElement | null>(null);

  const groupSceneRef = useRef<HTMLDivElement | null>(null);
  const groupImageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const builtScene = builtSceneRef.current;
      const heading = headingRef.current;
      const skyline = skylineRef.current;
      const cannabis = cannabisRef.current;
      const logoScene = logoSceneRef.current;
      const ring = ringRef.current;
      const logo = logoRef.current;
      const caption = captionRef.current;
      const exteriorScene = exteriorSceneRef.current;
      const interiorScene = interiorSceneRef.current;
      const groupScene = groupSceneRef.current;
      const groupImage = groupImageRef.current;
      if (
        !section ||
        !builtScene ||
        !heading ||
        !skyline ||
        !cannabis ||
        !logoScene ||
        !ring ||
        !logo ||
        !caption ||
        !exteriorScene ||
        !interiorScene ||
        !groupScene ||
        !groupImage
      )
        return;

      gsap.set(builtScene, { opacity: 1 });
      gsap.set(heading, { opacity: 0, y: -80, filter: "blur(8px)" });
      gsap.set(skyline, { opacity: 0, y: 40 });
      gsap.set(cannabis, { opacity: 0, y: 80, scale: 0.92 });

      gsap.set(logoScene, { opacity: 0 });
      gsap.set([logo, caption], { opacity: 0, y: 24 });
      gsap.set(ring, { opacity: 0, rotation: 0, transformOrigin: "50% 50%" });

      gsap.set(exteriorScene, { opacity: 1, yPercent: 100 });
      gsap.set(interiorScene, { opacity: 0 });

      gsap.set(groupScene, { opacity: 0 });
      gsap.set(groupImage, {
        opacity: 0,
        scale: 0.2,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=850%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(heading, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, 0)
        .to(skyline, { opacity: 1, y: 0, duration: 1 }, 0.15)
        .to(cannabis, { opacity: 1, y: 0, scale: 1, duration: 1 }, 1.05)

        .to({}, { duration: 0.4 })

        .to(cannabis, { y: -220, scale: 1.08, duration: 2 }, ">")

        .to({}, { duration: 0.3 })

        .to(builtScene, { opacity: 0, duration: 1.2 }, ">")
        .to(logoScene, { opacity: 1, duration: 1.2 }, "<")
        .to(logo, { opacity: 1, y: 0, duration: 1.0 }, "<+0.1")
        .to(ring, { opacity: 1, duration: 1.0 }, "<+0.1")
        .to(caption, { opacity: 1, y: 0, duration: 1.0 }, "<+0.2")

        .to({}, { duration: 0.3 })

        .to(ring, { rotation: 10, duration: 2.0 }, ">")

        .to({}, { duration: 0.4 })

        .to(exteriorScene, { yPercent: 0, duration: 1.5 }, ">")
        .set(logoScene, { opacity: 0 })

        .to({}, { duration: 0.6 })

        .to(exteriorScene, { opacity: 0, duration: 2.4 }, ">")
        .to(interiorScene, { opacity: 1, duration: 2.4 }, "<")

        .to({}, { duration: 0.6 })

        .to(interiorScene, { opacity: 0, duration: 2.4 }, ">")
        .to(groupScene, { opacity: 1, duration: 2.4 }, "<")
        .to(groupImage, { opacity: 1, scale: 1, duration: 2.0 }, "<+0.3")

        .to({}, { duration: 0.4 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#fafaf7]"
      aria-label="So we built JD's Jungle">
      <div
        ref={builtSceneRef}
        className="absolute inset-0 z-10 will-change-[opacity]">
        <h2
          ref={headingRef}
          className="font-serif absolute left-1/2 top-[18%] z-30 -translate-x-1/2 px-6 text-center font-bold leading-[1.1] tracking-tight text-[clamp(2rem,6vw,4rem)] bg-linear-to-b from-[#45739D] to-[#182837] bg-clip-text text-transparent filter-[drop-shadow(0_2px_30px_rgba(24,40,55,0.18))] will-change-transform">
          So we built JD&rsquo;s Jungle
        </h2>

        <div
          ref={cannabisRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex h-[85%] w-full max-w-275 items-end justify-center will-change-transform">
          <div className="relative h-full w-full">
            <Image
              src="/about-us/cannabis.webp"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full will-change-[opacity]">
          <div className="relative h-[55vh] w-full sm:h-[60vh]">
            <Image
              src="/about-us/sky_line_with_sea_1_5x.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="select-none object-cover object-bottom"
            />
          </div>
        </div>
      </div>

      <div
        ref={logoSceneRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 will-change-[opacity]">
        <div className="relative aspect-square w-[clamp(260px,38vw,460px)]">
          <div ref={ringRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/about-us/Ring.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 80vw, 460px"
              className="select-none object-contain"
            />
          </div>

          <div
            ref={logoRef}
            className="absolute inset-[12%] will-change-transform">
            <Image
              src="/about-us/Logo without ring.svg"
              alt="JD's Jungle logo"
              fill
              priority
              sizes="(max-width: 768px) 64vw, 360px"
              className="select-none object-contain"
            />
          </div>
        </div>

        <p
          ref={captionRef}
          className="mt-10 text-center text-base font-medium tracking-wide text-[#182837]/70 will-change-transform">
          NYC skyline x Abstract leaf
        </p>
      </div>

      <div
        ref={exteriorSceneRef}
        className="absolute inset-0 z-30 will-change-transform">
        <Image
          src="/about-us/exterior_1_5x.webp"
          alt="JD's Jungle exterior"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
      </div>

      <div
        ref={interiorSceneRef}
        className="absolute inset-0 z-40 will-change-[opacity]">
        <Image
          src="/about-us/interior_1_5x.webp"
          alt="JD's Jungle interior"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
      </div>

      <div
        ref={groupSceneRef}
        className="absolute inset-0 z-50 flex items-center justify-center bg-white will-change-[opacity]">
        <div
          ref={groupImageRef}
          className="relative aspect-square w-[clamp(280px,55vw,720px)] will-change-transform">
          <Image
            src="/about-us/group_1321322168_1_5x.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 80vw, 720px"
            className="select-none object-contain"
          />
        </div>
      </div>
    </section>
  );
}
