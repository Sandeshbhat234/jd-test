"use client";

import { useState } from "react";
import type { FaqGroup } from "@/data/contact";

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[5px] border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-8 p-5 text-left"
      >
        <span className="flex-1 font-cy text-[clamp(16px,1.4vw,22px)] font-medium leading-snug tracking-[0.5px] text-[#1e1e1e]">
          {question}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className={`size-7 shrink-0 text-[#1e1e1e] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-5 pb-5 font-cy text-[clamp(14px,1.2vw,18px)] leading-relaxed tracking-[0.3px] text-[#1e1e1e]/80 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-4">
          <h3 className="text-[clamp(18px,1.8vw,26px)] font-medium text-[#1e1e1e]">
            {group.title}
          </h3>
          <div className="flex flex-col gap-3">
            {group.items.map((item) => (
              <FaqRow key={item.question} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
