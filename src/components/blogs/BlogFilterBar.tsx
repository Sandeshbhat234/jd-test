"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BLOG_CATEGORIES } from "@/data/blogs";
import CategoryIcon from "./CategoryIcon";

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface BlogFilterBarProps {
  selected: string;
  onSelect: (label: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export default function BlogFilterBar({
  selected,
  onSelect,
  query,
  onQueryChange,
}: BlogFilterBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Kept in the DOM while the close animation plays, then unmounted.
  const [menuMounted, setMenuMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the inline search field once it has expanded open.
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const current =
    BLOG_CATEGORIES.find((c) => c.label === selected) ?? BLOG_CATEGORIES[0];

  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  // Animate the dropdown in/out. The panel scales and fades from the top while
  // its items rise in with a gentle stagger; closing reverses it, then unmounts.
  useEffect(() => {
    const panel = panelRef.current;
    if (!menuMounted || !panel) return;

    const items = panel.querySelectorAll<HTMLElement>("[data-menu-item]");
    // Reduced motion → zero durations: same flow, no movement. Unmount on close
    // is always driven by GSAP's onComplete (never a setState in this effect).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (menuOpen) {
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { autoAlpha: 0, y: -12, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: reduce ? 0 : 0.34,
          ease: "power3.out",
        },
      ).fromTo(
        items,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduce ? 0 : 0.3,
          stagger: reduce ? 0 : 0.045,
          ease: "power3.out",
        },
        reduce ? 0 : "-=0.18",
      );
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.timeline({ onComplete: () => setMenuMounted(false) });
    tl.to(items, {
      autoAlpha: 0,
      y: reduce ? 0 : 6,
      duration: reduce ? 0 : 0.16,
      stagger: reduce ? 0 : 0.025,
      ease: "power2.in",
    }).to(
      panel,
      {
        autoAlpha: 0,
        y: reduce ? 0 : -8,
        scale: reduce ? 1 : 0.97,
        duration: reduce ? 0 : 0.18,
        ease: "power2.in",
      },
      reduce ? 0 : "-=0.08",
    );
    return () => {
      tl.kill();
    };
  }, [menuOpen, menuMounted]);

  const closeSearch = () => {
    setSearchOpen(false);
    onQueryChange("");
  };

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-4">
        {/* Mobile: category dropdown */}
        <div ref={menuRef} className="relative lg:hidden">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] py-2 pr-4 pl-5 font-cy text-[#1e1e1e] transition-colors hover:bg-[rgba(234,233,228,0.6)]"
          >
            <CategoryIcon
              category={current.label}
              className="size-[18px] shrink-0"
            />
            <span className="text-[clamp(14px,1vw,18px)] leading-[1.5] whitespace-nowrap">
              {current.label}
            </span>
            <span className="text-[10px] leading-[1.5]">{current.count}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className={`size-4 shrink-0 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {menuMounted && (
            <ul
              ref={panelRef}
              role="listbox"
              aria-label="Filter blogs by category"
              style={{ transformOrigin: "top" }}
              className="invisible absolute left-0 top-[calc(100%+8px)] z-20 min-w-60 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#fffff8] py-2 opacity-0 shadow-[0_12px_32px_rgba(1,1,1,0.12)]"
            >
              {BLOG_CATEGORIES.map((cat) => {
                const active = cat.label === selected;
                return (
                  <li
                    key={cat.label}
                    role="option"
                    aria-selected={active}
                    data-menu-item
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(cat.label);
                        closeMenu();
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left font-cy transition-colors ${
                        active
                          ? "bg-[#1e1e1e] text-[#fffff8]"
                          : "text-[#1e1e1e] hover:bg-[rgba(234,233,228,0.6)]"
                      }`}
                    >
                      <CategoryIcon
                        category={cat.label}
                        className="size-[18px] shrink-0"
                      />
                      <span className="flex-1 text-[clamp(14px,1vw,16px)] leading-[1.5] whitespace-nowrap">
                        {cat.label}
                      </span>
                      <span className="text-[11px] leading-[1.5] opacity-70">
                        {cat.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Desktop: inline category chips — always visible, no popup. */}
        <div className="hidden flex-1 flex-wrap items-center gap-2.5 lg:flex">
          {BLOG_CATEGORIES.map((cat) => {
            const active = cat.label === selected;
            return (
              <button
                key={cat.label}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(cat.label)}
                className={`flex items-center gap-2 rounded-full border border-[#1e1e1e] px-4 py-2 font-cy transition-colors ${
                  active
                    ? "bg-[#1e1e1e] text-[#fffff8]"
                    : "bg-[rgba(234,233,228,0.2)] text-[#1e1e1e] hover:bg-[rgba(234,233,228,0.6)]"
                }`}
              >
                <CategoryIcon
                  category={cat.label}
                  className="size-[18px] shrink-0"
                />
                <span className="text-[clamp(13px,0.95vw,16px)] leading-[1.5] whitespace-nowrap">
                  {cat.label}
                </span>
                <span className="text-[10px] leading-[1.5] opacity-70">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile spacer (on desktop the chip row above is flex-1 instead). */}
        <div className="flex-1 lg:hidden" />

        {/* Search icon that expands into an input on click (all breakpoints). */}
        <div
          className={`flex h-10 shrink-0 items-center overflow-hidden rounded-full border border-[#1e1e1e] text-[#1e1e1e] transition-[width,background-color] duration-300 ease-out ${
            searchOpen
              ? "w-[clamp(180px,55vw,320px)] bg-white lg:w-[clamp(220px,26vw,320px)]"
              : "w-10 bg-[rgba(234,233,228,0.2)] hover:bg-[rgba(234,233,228,0.6)]"
          }`}
        >
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search blogs"}
            aria-expanded={searchOpen}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            className="grid size-10 shrink-0 place-items-center"
          >
            <SearchGlyph className="size-[18px]" />
          </button>
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && closeSearch()}
            placeholder="Search articles…"
            aria-label="Search articles"
            tabIndex={searchOpen ? 0 : -1}
            className={`min-w-0 flex-1 bg-transparent pr-4 font-cy text-[14px] tracking-[0.3px] text-[#1e1e1e] transition-opacity duration-200 placeholder:text-[#888] focus:outline-none [&::-webkit-search-cancel-button]:hidden ${
              searchOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

      </div>
    </div>
  );
}
