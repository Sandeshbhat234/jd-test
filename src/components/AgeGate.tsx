"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStoredValue } from "@/lib/useStoredValue";

const STORAGE_KEY = "jd-age-verified";

// Routes reachable without age verification — chiefly the legal pages the gate
// itself links to, so visitors can read them before clicking "Yes".
const GATE_EXEMPT = ["/privacy"];

// Brand-reveal intro that plays once before the verification card.
const WORDMARK = "JD's Jungle";

// Animation timeline (ms). Each entry is the start time of a phase relative to
// mount; tweak these (and the scale/size constants below) to retune the motion.
const T_EXPAND = 500; // navy hold, then white circle bursts open + logo grows
const T_SHRINK = 2000; // logo settles down into the wordmark lockup
const T_REVEAL = 2700; // "JD's Jungle" slides open beside the logo
const T_RISE = 4200; // curtain lifts up, its curved hem revealing the card
const T_DONE = 5500; // overlay unmounts

type IntroPhase = "navy" | "expand" | "shrink" | "reveal" | "rise";

const pillBase =
  "flex h-[50px] items-center justify-center rounded-full border " +
  "font-cy whitespace-nowrap " +
  "transition-[filter,background-color] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffff8]";

const yesPill =
  pillBase +
  " border-[#0c1e46] px-[clamp(28px,4vw,50px)] py-2.5 font-medium text-[clamp(18px,1.4vw,26px)] leading-[33px] text-white hover:brightness-110 " +
  "bg-[linear-gradient(178.23deg,#173067_9.14%,#06122F_47.57%,#05102A_85.99%)]";

const noPill =
  pillBase +
  " border-black bg-[#fffff8] px-4 py-2 text-[clamp(16px,1.2vw,22px)] text-black hover:bg-black/5";

export default function AgeGate() {
  // serverValue null → the gate renders on first paint so content stays blocked
  // until we can confirm a prior verification from localStorage.
  const [verified, setVerified] = useStoredValue(STORAGE_KEY, null);
  const [denied, setDenied] = useState(false);
  const pathname = usePathname();
  const isExempt = GATE_EXEMPT.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const isVerified = verified === "true";

  // Intro animation state. `introDone` flips to true once the brand reveal has
  // played (or immediately under reduced-motion), unveiling the card.
  const [phase, setPhase] = useState<IntroPhase>("navy");
  const [introDone, setIntroDone] = useState(false);
  // Uniform scale that shrinks the lockup to fit narrow screens while keeping
  // it horizontally centred (1 = natural size, i.e. it already fits).
  const [fitScale, setFitScale] = useState(1);
  const startedRef = useRef(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Once the wordmark is revealed, measure the lockup's natural width and scale
  // it down to fit the viewport. Re-runs on resize/orientation change.
  const textIn = phase === "reveal" || phase === "rise";
  useEffect(() => {
    if (!textIn) return;
    const measure = () => {
      const natural =
        (logoRef.current?.offsetWidth ?? 0) +
        (textRef.current?.scrollWidth ?? 0);
      if (!natural) return;
      setFitScale(Math.min(1, (window.innerWidth * 0.92) / natural));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [textIn]);

  // Lock body scroll while the gate is visible.
  useEffect(() => {
    if (isVerified || isExempt) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isVerified, isExempt]);

  // Drive the intro timeline. Runs once; respects reduced-motion by skipping
  // straight to the card.
  useEffect(() => {
    if (isVerified || isExempt || introDone || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setIntroDone(true);
      return;
    }

    const timeouts: number[] = [];
    const at = (fn: () => void, ms: number) =>
      timeouts.push(window.setTimeout(fn, ms));

    at(() => setPhase("expand"), T_EXPAND);
    at(() => setPhase("shrink"), T_SHRINK);
    at(() => setPhase("reveal"), T_REVEAL);
    at(() => setPhase("rise"), T_RISE);
    at(() => setIntroDone(true), T_DONE);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [isVerified, isExempt, introDone]);

  if (isVerified || isExempt) return null;

  const confirm = () => {
    // Mark the document so CSS reveals the navbar immediately (no reload),
    // mirroring the pre-paint attribute the layout sets for return visits.
    document.documentElement.setAttribute("data-age-verified", "1");
    setVerified("true");
  };

  // Logo: pops to 130% as the circle bursts open, then settles to its lockup
  // size. Box size (not transform) shrinks so the wordmark can sit beside it.
  // clamp() keeps the lockup from overflowing narrow phones.
  const logoSize =
    phase === "navy" || phase === "expand"
      ? "clamp(120px, 32vw, 190px)"
      : "clamp(60px, 15vw, 112px)";
  const logoScale = phase === "expand" ? 1.3 : 1;
  const circleScale = phase === "navy" ? 1 : 60;
  // The whole curtain lifts up, its curved hem sweeping the card into view.
  const riseUp = phase === "rise";

  return (
    <>
      {!introDone && (
        // The overlay IS the curtain: taller than the viewport so its curved
        // hem starts off-screen, then it lifts straight up to reveal the card
        // (and its background) already rendered underneath.
        <div
          aria-hidden
          data-age-gate=""
          className="fixed inset-x-0 top-0 z-[110] h-[145vh] overflow-hidden bg-[#0c1e46]"
          style={{
            borderBottomLeftRadius: "50% clamp(100px, 16vh, 180px)",
            borderBottomRightRadius: "50% clamp(100px, 16vh, 180px)",
            transform: riseUp ? "translateY(-155vh)" : "translateY(0)",
            transition: "transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)",
            boxShadow: "0 24px 60px rgba(12, 30, 70, 0.22)",
          }}>
          {/* White circle that bursts out from behind the logo to flood the
              screen, turning the navy backdrop white. Sized to tuck behind the
              logo's own circle so no white ring shows before it expands. */}
          <div
            className="absolute left-1/2 top-[50vh] size-[clamp(92px,26vw,150px)] rounded-full bg-[#fffef8]"
            style={{
              transform: `translate(-50%, -50%) scale(${circleScale})`,
              transition: "transform 1400ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
          {/* Logo + wordmark lockup, always centred on the viewport. Spans the
              full width (so the wordmark is never width-constrained / clipped),
              and scales down uniformly (fitScale) to fit narrow screens while
              staying horizontally centred. */}
          <div
            className="absolute inset-x-0 top-[50vh] flex items-center justify-center"
            style={{
              transform: `translateY(-50%) scale(${fitScale})`,
              transition: "transform 500ms ease",
            }}>
            <div
              ref={logoRef}
              className="relative shrink-0"
              style={{
                width: logoSize,
                height: logoSize,
                transform: `scale(${logoScale})`,
                transition:
                  "width 600ms ease, height 600ms ease, transform 1400ms ease",
              }}>
              <Image
                src="/Age Gate/logoblue.svg"
                alt=""
                fill
                priority
                sizes="190px"
                className="object-contain"
              />
            </div>
            {/* grid 0fr → 1fr animates the text width, sliding it open. */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: textIn ? "1fr" : "0fr",
                transition:
                  "grid-template-columns 800ms cubic-bezier(0.65, 0, 0.35, 1)",
              }}>
              {/* py + relaxed leading keep the "J" descender from being clipped
                  by the overflow-hidden used for the slide. */}
              <span
                ref={textRef}
                className="overflow-hidden whitespace-nowrap py-[0.12em] pl-[clamp(12px,2vw,28px)] font-serif text-[clamp(36px,9vw,76px)] leading-[1.25] text-[#0c1e46]"
                style={{
                  opacity: textIn ? 1 : 0,
                  transition: "opacity 600ms ease 150ms",
                }}>
                {WORDMARK}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Age verification"
        data-age-gate=""
        className="fixed inset-0 z-[100] overflow-y-auto">
        {/* Background sits behind and never intercepts taps (key on mobile). */}
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <Image
            src="/Age Gate/Age gate.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Centering wrapper that can scroll when the card is taller than a short
          (mobile) viewport, so the Yes/No buttons are always reachable. */}
        <div className="relative flex min-h-full items-center justify-center p-4">
          {/* Glass frame */}
          <div className="relative z-10 flex w-full max-w-[621px] flex-col items-center justify-center rounded-[20px] bg-white/[0.17] p-4 backdrop-blur-[52px]">
            <div className="flex w-full flex-col items-center justify-center rounded-[20px] border border-[rgba(30,30,30,0.5)] bg-[#fffff8] p-[clamp(24px,4vw,40px)] drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)]">
              <div className="flex w-full flex-col items-center gap-6">
                <Image
                  src="/Age Gate/Logo Age gate .svg"
                  alt="JD's Jungle"
                  width={117}
                  height={117}
                  className="size-[clamp(88px,10vw,117px)]"
                />
                <div className="flex w-full flex-col items-center gap-2 text-center">
                  <h2 className="font-serif text-[clamp(26px,3vw,32px)] leading-[1.5] text-black">
                    {denied
                      ? "Come back when you're 21."
                      : "Are you 21 or older?"}
                  </h2>
                  <p className="font-cy text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-[rgba(30,30,30,0.5)]">
                    {denied ? (
                      "You must be of legal age to enter this site."
                    ) : (
                      <>
                        By clicking &quot;Yes&quot;, you agree to our Terms
                        &amp; Conditions and{" "}
                        <Link
                          href="/privacy"
                          className="underline transition-colors hover:text-black">
                          Privacy Policy
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
                {!denied && (
                  <div className="flex items-start justify-center gap-6">
                    <button type="button" onClick={confirm} className={yesPill}>
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setDenied(true)}
                      className={`${noPill} w-[157px]`}>
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
