"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useStoredValue } from "@/lib/useStoredValue";

const STORAGE_KEY = "jd-age-verified";

const pillBase =
  "flex h-[50px] items-center justify-center rounded-full border " +
  "font-cy whitespace-nowrap " +
  "transition-[filter,background-color] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffef8]";

const yesPill =
  pillBase +
  " border-[#0c1e46] px-[clamp(28px,4vw,50px)] py-2.5 font-medium text-[clamp(18px,1.4vw,26px)] leading-[33px] text-white hover:brightness-110 " +
  "bg-[linear-gradient(178.23deg,#173067_9.14%,#06122F_47.57%,#05102A_85.99%)]";

const noPill =
  pillBase +
  " border-black bg-[#fffef8] px-4 py-2 text-[clamp(16px,1.2vw,22px)] text-black hover:bg-black/5";

export default function AgeGate() {
  // serverValue null → the gate renders on first paint so content stays blocked
  // until we can confirm a prior verification from localStorage.
  const [verified, setVerified] = useStoredValue(STORAGE_KEY, null);
  const [denied, setDenied] = useState(false);
  const isVerified = verified === "true";

  // Lock body scroll while the gate is visible.
  useEffect(() => {
    if (isVerified) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isVerified]);

  if (isVerified) return null;

  const confirm = () => setVerified("true");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
      data-age-gate=""
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <Image
        src="/Age Gate/Age gate.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Glass frame */}
      <div className="relative flex w-full max-w-[621px] flex-col items-center justify-center rounded-[20px] bg-white/[0.17] p-4 backdrop-blur-[52px]">
        <div className="flex w-full flex-col items-center justify-center rounded-[20px] border border-[rgba(30,30,30,0.5)] bg-[#fffef8] p-[clamp(24px,4vw,40px)] drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)]">
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
                {denied ? "Come back when you're 21." : "Are you 21 or older?"}
              </h2>
              <p className="font-cy text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-[rgba(30,30,30,0.5)]">
                {denied
                  ? "You must be of legal age to enter this site."
                  : 'By clicking "Yes", you agree to our Terms & Conditions and Privacy Policy.'}
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
                  className={`${noPill} w-[157px]`}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
