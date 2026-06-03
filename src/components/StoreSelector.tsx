"use client";

import { useState } from "react";
import { useSelectedStore } from "@/lib/useSelectedStore";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function StoreSelector({ dark }: { dark: boolean }) {
  const { store, setStore, stores } = useSelectedStore();
  const [open, setOpen] = useState(false);

  const text = dark ? "text-[#1e1e1e]" : "text-white";
  const border = dark ? "border-[#1e1e1e]" : "border-white";

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Selected store: ${store.name}. Change store`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={`flex h-[36px] items-center gap-2 rounded-full border px-3 font-[var(--font-cy-grotesk)] text-[14px] font-medium leading-none transition-opacity hover:opacity-80 ${text} ${border}`}
      >
        <PinIcon className="size-[16px] shrink-0" />
        <span className="whitespace-nowrap">{store.shortName}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 pt-3">
          <ul
            role="menu"
            className="flex min-w-[230px] flex-col rounded-2xl border border-black/10 bg-[#fffef8] p-2 shadow-[0px_10px_30px_rgba(0,0,0,0.15)]"
          >
            {stores.map((s) => {
              const active = s.slug === store.slug;
              return (
                <li key={s.slug} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      setStore(s.slug);
                      setOpen(false);
                    }}
                    className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left font-[var(--font-cy-grotesk)] text-[#1e1e1e] transition-colors hover:bg-black/5 ${
                      active ? "bg-black/5" : ""
                    }`}
                  >
                    <PinIcon className="mt-0.5 size-[16px] shrink-0 text-[#0c1e46]" />
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium leading-tight">
                        {s.name}
                      </span>
                      <span className="text-[12px] leading-snug text-[#1e1e1e]/60">
                        {s.address[0]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
