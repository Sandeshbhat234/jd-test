"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A5 = "/About%20page/Animation%205";

const PRODUCTS = [
  { name: "Flower", img: "3d_flower_1_5x.webp" },
  { name: "Pre-Rolls", img: "3d_preroll_1_5x.webp" },
  { name: "Vapes", img: "3d_vapes_1_5x.webp" },
  { name: "Edibles", img: "3d_edibles_1_5x.webp" },
  { name: "Concentrates", img: "3d_concentrates_1_5x.webp" },
  { name: "Tinctures", img: "3d_tinctures_1_5x.webp" },
  { name: "Oils", img: "3d_oils_1_5x.webp" },
  { name: "Topicals", img: "3d_topicals_1_5x.webp" },
  { name: "Accessories", img: "3d_accessories_1_5x.webp" },
];
const N = PRODUCTS.length;

// Depth keyframes for a product, keyed by `rel` = its index minus the active
// progress. rel 0 is centre/active (big); 1 and 2 recede to the right and
// shrink (further "behind"); past items (rel < 0) dissolve in place.
type Anchor = { rel: number; x: number; y: number; s: number; o: number };
const ANCHORS: Anchor[] = [
  { rel: -1, x: 50, y: 54, s: 1.16, o: 0 }, // just left (dissolved out)
  { rel: 0, x: 50, y: 57, s: 1.0, o: 1 }, // active, centred
  { rel: 1, x: 82.5, y: 61, s: 0.52, o: 1 }, // next, right
  { rel: 2, x: 95.5, y: 61, s: 0.36, o: 1 }, // next-next, further right
  { rel: 3, x: 104, y: 61, s: 0.3, o: 0 }, // off-stage right
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

function stateForRel(rel: number): Omit<Anchor, "rel"> {
  const first = ANCHORS[0];
  const last = ANCHORS[ANCHORS.length - 1];
  if (rel <= first.rel) return { x: first.x, y: first.y, s: first.s, o: 0 };
  if (rel >= last.rel) return { x: last.x, y: last.y, s: last.s, o: 0 };
  for (let k = 0; k < ANCHORS.length - 1; k++) {
    const a = ANCHORS[k];
    const b = ANCHORS[k + 1];
    if (rel >= a.rel && rel <= b.rel) {
      const t = smooth((rel - a.rel) / (b.rel - a.rel));
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        s: lerp(a.s, b.s, t),
        o: lerp(a.o, b.o, t),
      };
    }
  }
  return { x: ANCHORS[1].x, y: ANCHORS[1].y, s: ANCHORS[1].s, o: ANCHORS[1].o };
}

export default function TheLineup() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const listWrapRef = useRef<HTMLDivElement | null>(null);
  const productRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Current (animated) carousel progress and the imperative tween-to helper,
  // wired up inside useGSAP so the click handlers below can drive it.
  const progressRef = useRef({ p: 0 });
  const animateToRef = useRef<(target: number) => void>(() => {});

  useGSAP(
    () => {
      // Desktop only — the depth carousel, category list and arrows are a
      // desktop experience. On mobile a simple swipeable carousel renders
      // instead (see the `md:hidden` block below).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        if (!section) return;
        const products = productRefs.current;
        const items = listRefs.current;
        const dots = dotRefs.current;
        if (products.some((p) => !p)) return;

        let activeShown = -1;

        // Position every product for a continuous active progress `p`, and sync
        // the left list + dots to the nearest product.
        const render = (p: number) => {
          const w = section.clientWidth;
          const h = section.clientHeight;
          const active = gsap.utils.clamp(0, N - 1, Math.round(p));
          for (let i = 0; i < N; i++) {
            const st = stateForRel(i - p);
            // Only the visible upcoming images (right side) are clickable.
            const clickable = st.o > 0.05 && i !== active;
            gsap.set(products[i], {
              x: (st.x / 100 - 0.5) * w,
              y: (st.y / 100 - 0.5) * h,
              xPercent: -50,
              yPercent: -50,
              scale: st.s,
              autoAlpha: st.o,
              zIndex: Math.round(st.s * 100),
              pointerEvents: clickable ? "auto" : "none",
              cursor: clickable ? "pointer" : "default",
            });
          }

          if (active !== activeShown) {
            activeShown = active;
            items.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, {
                color: i === active ? "#1e1e1e" : "rgba(30,30,30,0.4)",
                fontWeight: i === active ? 500 : 400,
                duration: 0.3,
                ease: "power2.out",
              });
            });
            dots.forEach((el, i) => {
              if (!el) return;
              gsap.to(el, {
                backgroundColor: i === active ? "#898989" : "#d9d9d9",
                duration: 0.3,
                ease: "power2.out",
              });
            });
          }
        };

        render(progressRef.current.p);

        // The carousel is click-driven (categories / arrows) — not scroll-driven.
        // Each navigation smoothly tweens the progress between products.
        animateToRef.current = (target: number) => {
          const clamped = gsap.utils.clamp(0, N - 1, target);
          gsap.to(progressRef.current, {
            p: clamped,
            duration: 0.8,
            ease: "power3.inOut",
            overwrite: true,
            onUpdate: () => render(progressRef.current.p),
          });
        };

        // Keep positions correct across resizes (no pin/scrub — just a refresh
        // hook). The ScrollTrigger is reverted with the useGSAP context.
        ScrollTrigger.create({
          trigger: section,
          onRefresh: () => render(progressRef.current.p),
        });

        // Intro — header and list ease in as the section arrives.
        gsap.from([headerRef.current, listWrapRef.current], {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 65%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  // Navigation shared by the list, the dots and the arrows (desktop).
  const goTo = (target: number) => animateToRef.current(target);
  const go = (dir: number) =>
    animateToRef.current(Math.round(progressRef.current.p) + dir);

  // --- mobile swipeable carousel state ---
  const [mActive, setMActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };
  const onTouchEnd = () => {
    const d = touchDeltaX.current;
    if (Math.abs(d) > 40) {
      setMActive((a) => gsap.utils.clamp(0, N - 1, a + (d < 0 ? 1 : -1)));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section
      ref={sectionRef}
      aria-label="The Lineup"
      className="relative h-screen w-full overflow-hidden bg-[#ffffff] max-md:h-auto max-md:overflow-visible">
      {/* ---------- mobile: simple swipeable carousel, no arrows ---------- */}
      <div className="hidden flex-col items-center px-5 py-14 max-md:flex">
        <div className="text-center">
          <h2 className="font-serif font-light leading-[1.1] text-[#1e1e1e] text-[38px] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
            The Lineup
          </h2>
          <p className="mx-auto mt-3 max-w-[300px] font-[family-name:var(--font-cy-grotesk)] font-light leading-[1.5] text-[#1e1e1e] text-[15px]">
            From morning energy to midnight relaxation – find yours.
          </p>
        </div>

        <div
          className="mt-4 w-full touch-pan-y overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${mActive * 100}%)` }}>
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="flex w-full shrink-0 flex-col items-center">
                <div className="relative h-[300px] w-full">
                  <Image
                    src={`${A5}/${p.img}`}
                    alt={p.name}
                    fill
                    sizes="100vw"
                    className="pointer-events-none select-none object-contain"
                  />
                </div>
                <p className="mt-3 font-[family-name:var(--font-cy-grotesk)] font-medium capitalize text-[#1e1e1e] text-[24px]">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {PRODUCTS.map((p, i) => (
            <button
              type="button"
              key={p.name}
              aria-label={p.name}
              onClick={() => setMActive(i)}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                i === mActive ? "w-7 bg-[#898989]" : "w-5 bg-[#d9d9d9]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- desktop: depth carousel ---------- */}
      {/* heading */}
      <div
        ref={headerRef}
        className="absolute left-[clamp(20px,5.5vw,98px)] top-[clamp(48px,12vh,126px)] z-20 w-[min(86vw,681px)] max-md:hidden">
        <h2 className="font-serif font-light leading-[1.1] text-[#1e1e1e] text-[clamp(38px,5vw,64px)] [text-shadow:0px_0px_50px_rgba(0,0,0,0.05)]">
          The Lineup
        </h2>
        <p className="mt-3 font-[family-name:var(--font-cy-grotesk)] font-light leading-[1.5] text-[#1e1e1e] text-[clamp(15px,1.6vw,22px)]">
          From morning energy to midnight relaxation – find yours.
        </p>
      </div>

      {/* category list */}
      <div
        ref={listWrapRef}
        className="absolute left-[clamp(20px,5.5vw,98px)] top-[clamp(200px,34vh,371px)] z-20 flex flex-col gap-[clamp(6px,1.5vh,16px)] max-md:hidden">
        {PRODUCTS.map((p, i) => (
          <button
            type="button"
            key={p.name}
            ref={(el) => {
              listRefs.current[i] = el;
            }}
            onClick={() => goTo(i)}
            className="w-fit cursor-pointer font-[family-name:var(--font-cy-grotesk)] capitalize leading-[1.2] text-[clamp(20px,2.4vw,32px)] text-[rgba(30,30,30,0.4)] text-left transition-transform duration-300 hover:translate-x-1">
            {p.name}
          </button>
        ))}
      </div>

      {/* product images (depth carousel) — upcoming ones are clickable */}
      {PRODUCTS.map((p, i) => (
        <button
          type="button"
          key={p.name}
          ref={(el) => {
            productRefs.current[i] = el;
          }}
          onClick={() => goTo(i)}
          aria-label={p.name}
          className="absolute left-1/2 top-1/2 h-[clamp(240px,44vh,460px)] w-[clamp(220px,26vw,420px)] will-change-transform max-md:hidden">
          <Image
            src={`${A5}/${p.img}`}
            alt={p.name}
            fill
            preload={i < 3}
            sizes="420px"
            className="pointer-events-none select-none object-contain"
          />
        </button>
      ))}

      {/* pagination dots */}
      <div className="absolute bottom-[clamp(40px,9vh,105px)] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[clamp(8px,1.3vw,19px)] max-md:hidden">
        {PRODUCTS.map((p, i) => (
          <span
            key={p.name}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="h-[9px] w-[clamp(20px,3.4vw,60px)] rounded-full bg-[#d9d9d9]"
          />
        ))}
      </div>

      {/* prev / next arrows */}
      <div className="absolute bottom-[clamp(36px,8vh,96px)] right-[clamp(20px,5vw,90px)] z-20 flex items-center gap-[15px] max-md:hidden">
        <button
          type="button"
          aria-label="Previous product"
          onClick={() => go(-1)}
          className="grid size-[clamp(40px,3.4vw,50px)] cursor-pointer place-items-center rounded-full border border-[rgba(30,30,30,0.3)] transition-colors hover:bg-black/5">
          <Image src={`${A5}/Left.svg`} alt="" width={20} height={18} />
        </button>
        <button
          type="button"
          aria-label="Next product"
          onClick={() => go(1)}
          className="grid size-[clamp(40px,3.4vw,50px)] cursor-pointer place-items-center rounded-full border border-[rgba(30,30,30,0.3)] transition-colors hover:bg-black/5">
          <Image src={`${A5}/Right.svg`} alt="" width={20} height={18} />
        </button>
      </div>
    </section>
  );
}
