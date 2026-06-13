"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/blog-articles";

export default function BlogFaqList({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.question}
            className="rounded-[5px] border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-6 p-[clamp(16px,1.6vw,20px)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/40"
            >
              <span className="flex-1 font-cy text-[clamp(16px,1.5vw,22px)] font-medium leading-snug tracking-[0.5px] text-[#1e1e1e]">
                {faq.question}
              </span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className={`size-[clamp(24px,2.4vw,32px)] shrink-0 text-[#1e1e1e] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-[clamp(16px,1.6vw,20px)] pb-[clamp(16px,1.6vw,20px)] font-cy text-[clamp(14px,1.3vw,18px)] leading-relaxed tracking-[0.4px] text-[rgba(30,30,30,0.75)]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
