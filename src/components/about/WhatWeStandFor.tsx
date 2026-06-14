"use client";

import Image from "next/image";
import { STAND_FOR_VALUES } from "./standForValues";

/**
 * On desktop, "What We Stand For" is revealed inside the What Makes Us Different
 * capsule (its content + card animation live there — see WhatMakesUsDifferent).
 * This component now only renders the mobile static list.
 */
export default function WhatWeStandFor() {
  return (
    <section
      aria-label="What We Stand For"
      className="w-full border-b-2 border-black bg-[#ffffff] px-5 py-14 md:hidden">
      <div className="text-center">
        <h2 className="font-serif font-light leading-[1.2] text-[#1e1e1e] text-[34px]">
          What We Stand For
        </h2>
        <p className="mx-auto mt-2 max-w-[320px] font-cy font-light leading-[1.5] text-[#1e1e1e] text-[15px]">
          The values that guide every product and every conversation
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {STAND_FOR_VALUES.map((value) => (
          <div
            key={value.title}
            className="flex flex-col items-center gap-3 rounded-[5px] border border-[#CEDCE2] bg-gradient-to-r from-[rgba(112,208,233,0.12)] to-[rgba(0,142,208,0.12)] px-5 py-7 text-center">
            <div className="relative size-[88px] shrink-0">
              <Image
                src={value.icon}
                alt=""
                fill
                sizes="88px"
                className="select-none object-contain"
              />
            </div>
            <h3 className="capitalize leading-[1.3] text-black text-[22px]">
              {value.title}
            </h3>
            <p className="font-cy leading-[1.45] text-[rgba(0,0,0,0.7)] text-[15px]">
              {value.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
