"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLocation } from "@/data/locations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A4 = "/About%20page/Animation%204";

type Location = {
  city: string;
  address: string[];
  className: string;
};

// City label + addresses come from the shared locations data; only the
// per-card position is set here (the order doubles as the card stacking order).
const LOCATIONS: Location[] = [
  { slug: "manhattan", className: "left-[clamp(16px,3vw,48px)] top-[64%]" },
  { slug: "queens", className: "right-[clamp(16px,3vw,48px)] top-[46%]" },
  { slug: "brooklyn", className: "right-[clamp(16px,3vw,48px)] top-[74%]" },
].map(({ slug, className }) => {
  const loc = getLocation(slug);
  return {
    city: loc?.shortName ?? slug,
    address: loc?.address ?? [],
    className,
  };
});

// White location-pin badge (entypo:location) used inside each card.
function LocationIcon() {
  return (
    <svg
      viewBox="0 0 108 108"
      fill="none"
      className="size-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="107" height="107" rx="53.5" stroke="white" />
      <path
        d="M76.9498 73.8499L73.6007 63.8H69.9257L71.9665 73.6H36.0348L38.0757 63.8H34.4007L31.0491 73.8499C30.1989 76.4077 31.7057 78.5 34.4007 78.5H73.6007C76.2957 78.5 77.8024 76.4077 76.9498 73.8499ZM66.2507 41.75C66.2507 38.5011 64.96 35.3853 62.6627 33.0879C60.3654 30.7906 57.2496 29.5 54.0007 29.5C50.7518 29.5 47.6359 30.7906 45.3386 33.0879C43.0413 35.3853 41.7507 38.5011 41.7507 41.75C41.7507 53.4488 54.0007 66.25 54.0007 66.25C54.0007 66.25 66.2507 53.4488 66.2507 41.75ZM47.3857 41.897C47.3863 40.143 48.0835 38.4611 49.324 37.2211C50.5645 35.981 52.2467 35.2844 54.0007 35.2845C55.7547 35.2845 57.437 35.9813 58.6773 37.2216C59.9176 38.4619 60.6144 40.1441 60.6144 41.8982C60.6144 43.6523 59.9176 45.3345 58.6773 46.5749C57.437 47.8152 55.7547 48.512 54.0007 48.512C52.2462 48.512 50.5637 47.8151 49.3231 46.5745C48.0826 45.334 47.3857 43.6514 47.3857 41.897Z"
        fill="white"
      />
    </svg>
  );
}

export default function JungleLocations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const leafRef = useRef<SVGPathElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const waveRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Desktop only — on mobile this renders as a static image banner with the
      // location cards stacked vertically (see the `md:hidden` block below).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const mask = maskRef.current;
        const leaf = leafRef.current;
        const overlay = overlayRef.current;
        const wave = waveRef.current;
        const cards = cardRefs.current;
        if (
          !section ||
          !mask ||
          !leaf ||
          !overlay ||
          !wave ||
          cards.length < LOCATIONS.length ||
          cards.some((c) => !c)
        )
          return;

        gsap.set(mask, { opacity: 1 });
        gsap.set(overlay, { opacity: 0 });
        gsap.set(cards, { autoAlpha: 0, y: 48 });
        // The closing wave starts just below the viewport.
        gsap.set(wave, { yPercent: 100 });

        // The leaf hole is scaled by writing the SVG transform attribute directly
        // (translate → scale → translate) so it always grows around the leaf's
        // centre and stays crisp. GSAP's transform-origin can't be used here
        // because the path lives inside <mask>, where it has no measurable box.
        const LEAF_CX = 880.5;
        const LEAF_CY = 540;
        const leafState = { s: 1 };
        const applyLeaf = () =>
          leaf.setAttribute(
            "transform",
            `translate(${LEAF_CX} ${LEAF_CY}) scale(${leafState.s}) translate(${-LEAF_CX} ${-LEAF_CY})`,
          );
        applyLeaf();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=460%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // The leaf-shaped hole grows to uncover the interior, then the white
        // layer fades out so the wedges between the leaflets disappear and the
        // image is fully revealed.
        tl.to(
          leafState,
          { s: 16, duration: 0.58, ease: "power1.in", onUpdate: applyLeaf },
          0,
        )
          .to(mask, { opacity: 0, duration: 0.16 }, 0.46)

          // Darken the image for legibility, then reveal the cards in sequence.
          .to(overlay, { opacity: 1, duration: 0.2 }, 0.5)
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.14,
              ease: "power2.out",
            },
            0.62,
          )
          .to({}, { duration: 0.2 })

          // Closing transition: the cards leave, then the white wave rises to
          // cover the bottom of the image. After this the pin releases, so the
          // next scroll carries the whole section (and wave) up into the next
          // section.
          .to(
            cards,
            {
              autoAlpha: 0,
              y: -40,
              duration: 0.25,
              stagger: 0.08,
              ease: "power2.in",
            },
            ">",
          )
          // Wave rises only once the cards have fully gone.
          .to(wave, { yPercent: 0, duration: 0.4, ease: "power2.out" }, ">")
          .to({}, { duration: 0.2 });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="JD's Jungle locations"
      className="relative h-screen w-full overflow-hidden bg-[#fffef8] max-md:h-auto max-md:overflow-visible">
      {/* ---------- mobile: image banner + stacked location cards ---------- */}
      <div className="relative hidden min-h-[86vh] w-full overflow-hidden max-md:block">
        <Image
          src={`${A4}/interior.webp`}
          alt="JD's Jungle interior"
          fill
          preload
          sizes="100vw"
          className="select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />
        <div className="relative z-10 flex min-h-[86vh] flex-col justify-end gap-3 px-4 pb-12">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="flex items-center gap-3 rounded-[14px] bg-white/20 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] backdrop-blur-[20px]">
              <div className="relative size-12 shrink-0">
                <LocationIcon />
              </div>
              <div className="flex flex-col gap-1 text-white">
                <h3 className="font-[family-name:var(--font-cy-grotesk)] font-semibold capitalize leading-tight text-[17px]">
                  {loc.city}
                </h3>
                <p className="font-cy capitalize leading-snug text-[12px]">
                  {loc.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- desktop: leaf-reveal animation ---------- */}
      {/* interior background image */}
      <Image
        src={`${A4}/interior.webp`}
        alt="JD's Jungle interior"
        fill
        preload
        sizes="100vw"
        className="select-none object-cover max-md:hidden"
      />

      {/* dark overlay — fades in with the cards for text legibility */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-black/25 max-md:hidden"
      />

      {/* White layer with a leaf-shaped hole the interior shows through. The
          hole is an SVG mask: a huge backing rect (always covers the viewport,
          so no edges ever leak) minus the leaf, which is scaled as a vector so
          it never rasterises into seams. */}
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-20 will-change-[opacity] max-md:hidden">
        <svg
          viewBox="0 0 1761 1080"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <defs>
            <mask
              id="jungleLeafMask"
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              x="-6000"
              y="-6000"
              width="13761"
              height="13080">
              {/* white = keep (visible white), black = punch hole */}
              <rect
                x="-6000"
                y="-6000"
                width="13761"
                height="13080"
                fill="white"
              />
              <path
                ref={leafRef}
                d="M712.994 834.342L625.59 921.377L748.195 907.784L835.6 820.749L712.994 834.342ZM1013.51 907.784L1136.11 921.377L1048.71 834.342L926.149 820.749L1013.51 907.784ZM477.82 712.356L646.686 818.743L844.991 796.674L676.172 690.333L477.82 712.356ZM916.741 796.674L1115.09 818.743L1283.91 712.356L1085.61 690.333L916.741 796.674ZM619.399 627.233L862.628 780.295L767.76 509.006L524.531 355.991L619.399 627.233ZM994 509.006L899.178 780.295L1142.41 627.233L1237.23 355.991L994 509.006ZM774.802 460.389L880.544 762.733L986.286 460.389L880.544 158L774.802 460.389Z"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="-6000"
            y="-6000"
            width="13761"
            height="13080"
            fill="#FFFEF8"
            mask="url(#jungleLeafMask)"
          />
        </svg>
      </div>

      {/* location cards */}
      {LOCATIONS.map((loc, i) => (
        <div
          key={loc.city}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`absolute z-30 flex w-[clamp(300px,34vw,440px)] items-center gap-[clamp(12px,1.6vw,24px)] rounded-[16px] bg-white/20 p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] backdrop-blur-[20px] will-change-transform max-md:hidden ${loc.className}`}>
          <div className="relative size-[clamp(64px,7vw,108px)] shrink-0">
            <LocationIcon />
          </div>
          <div className="flex flex-col gap-2 text-white">
            <h3 className="font-[family-name:var(--font-cy-grotesk)] font-medium capitalize leading-tight text-[clamp(20px,2.25vw,26px)]">
              {loc.city}
            </h3>
            <p className="font-cy capitalize leading-snug text-[clamp(14px,1.5vw,18px)]">
              {loc.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}

      {/* Closing white wave — rises to cover the bottom ~25% of the image as a
          transition into the next section. Smooth curve, touches the sides. */}
      <div
        ref={waveRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[28vh] w-full will-change-transform max-md:hidden">
        <svg
          preserveAspectRatio="none"
          viewBox="16.5 0 1764.5 446.505"
          fill="none"
          className="block h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M269.5 106.401C177.105 14.0047 53.5 21.0041 16.5 37.5045V446.505H1781V148.005C1749.5 181.505 1721.33 199.275 1702 210.108C1473 322.4 1154 312.505 1027.5 186.4C916.76 76.005 716.5 106.401 643.5 153.401C570.5 200.401 409.045 245.948 269.5 106.401Z"
            fill="#FFFEF8"
          />
        </svg>
      </div>
    </section>
  );
}
