"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelectedStore } from "@/lib/useSelectedStore";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { NAV_ITEMS } from "./data";
import type { NavItem } from "./types";

export function MobileMenu({
  open,
  active,
  pathname,
  onClose,
  onClosed,
}: {
  open: boolean;
  active: string;
  pathname: string;
  onClose: () => void;
  /** Called once the close animation has finished, so the parent can unmount. */
  onClosed: () => void;
}) {
  const { store, setStore, stores } = useSelectedStore();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const storeRef = useRef<HTMLDivElement | null>(null);

  // Lock page scroll while the menu is open (Lenis-aware — see `lockScroll`).
  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  // Drop the panel in and stagger the rows up on open; reverse on close, then
  // signal the parent to unmount. Each top-level link/group and the store block
  // is one stagger target.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const rows = [
      ...(navRef.current ? Array.from(navRef.current.children) : []),
      ...(storeRef.current ? [storeRef.current] : []),
    ];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (open) {
      if (reduce) {
        gsap.set(panel, { autoAlpha: 1, clearProps: "transform" });
        gsap.set(rows, { autoAlpha: 1, clearProps: "transform" });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" },
      ).fromTo(
        rows,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.16",
      );
      return () => {
        tl.kill();
      };
    }

    if (reduce) {
      onClosed();
      return;
    }
    const tl = gsap.timeline({ onComplete: onClosed });
    tl.to(rows, {
      autoAlpha: 0,
      y: 8,
      duration: 0.14,
      stagger: 0.03,
      ease: "power2.in",
    }).to(
      panel,
      { autoAlpha: 0, y: -10, duration: 0.18, ease: "power2.in" },
      "-=0.06",
    );
    return () => {
      tl.kill();
    };
  }, [open, onClosed]);

  return (
    <div
      ref={panelRef}
      className="invisible absolute inset-x-0 top-[77px] z-40 max-h-[calc(100svh-77px)] overflow-y-auto border-t border-black/10 bg-[#fffff8] px-[clamp(16px,5vw,40px)] py-6 opacity-0 shadow-[0px_12px_30px_rgba(0,0,0,0.18)] md:hidden">
      <nav ref={navRef} className="flex flex-col gap-1" aria-label="Mobile">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <MobileNavGroup
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onClose}
            />
          ) : (
            <MobileNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.href === active}
              onNavigate={onClose}
            />
          ),
        )}
        <MobileNavLink
          href="/contact"
          label="Contact"
          active={pathname.startsWith("/contact")}
          onNavigate={onClose}
        />
      </nav>

      <div ref={storeRef} className="mt-4 border-t border-black/10 pt-4">
        <p className="px-3 pb-2 font-cy text-[13px] font-medium uppercase tracking-[0.5px] text-[#1e1e1e]/50">
          Store
        </p>
        <div className="flex flex-col gap-1">
          {stores.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setStore(s.slug)}
              aria-pressed={s.slug === store.slug}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left font-cy text-[16px] text-[#1e1e1e] transition-colors hover:bg-black/5 ${
                s.slug === store.slug ? "bg-black/5 font-medium" : ""
              }`}>
              {s.name}
              {s.slug === store.slug ? <span aria-hidden>✓</span> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Desktop-style active underline: a rounded bar that sits under the label. */
function MobileUnderline({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-block w-fit pb-1">
      {children}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#1e1e1e] transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  onNavigate,
  className = "px-3 py-2.5 text-[17px]",
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`block rounded-lg font-cy leading-tight text-[#1e1e1e] transition-colors hover:bg-black/5 ${className}`}>
      <MobileUnderline active={active}>{label}</MobileUnderline>
    </Link>
  );
}

/** Collapsible group of sub-links — opens the one matching the current route. */
function MobileNavGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const children = item.children!;
  const hasActiveChild = children.some((child) =>
    pathname.startsWith(child.href),
  );
  const [open, setOpen] = useState(hasActiveChild);
  // Keeps the sub-links mounted while the collapse animation plays.
  const [render, setRender] = useState(hasActiveChild);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setRender(true);
      setOpen(true);
    }
  };

  // Expand by animating height while the sub-links stagger in; reverse on close,
  // then unmount.
  useEffect(() => {
    if (!render) return;
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;
    const items = Array.from(list.children);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (open) {
      if (reduce) {
        gsap.set(wrap, { height: "auto", clearProps: "height" });
        gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(
        wrap,
        { height: 0 },
        { height: "auto", duration: 0.3, ease: "power3.out", clearProps: "height" },
      ).fromTo(
        items,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.18",
      );
      return () => {
        tl.kill();
      };
    }

    if (reduce) {
      // Unmount on the next frame rather than synchronously inside the effect
      // (a synchronous setState here triggers a cascading render).
      const raf = requestAnimationFrame(() => setRender(false));
      return () => cancelAnimationFrame(raf);
    }
    const tl = gsap.timeline({ onComplete: () => setRender(false) });
    tl.to(items, {
      autoAlpha: 0,
      y: 6,
      duration: 0.12,
      stagger: 0.03,
      ease: "power2.in",
    }).to(wrap, { height: 0, duration: 0.2, ease: "power2.in" }, "-=0.05");
    return () => {
      tl.kill();
    };
  }, [open, render]);

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-cy text-[17px] leading-tight text-[#1e1e1e] transition-colors hover:bg-black/5">
        <MobileUnderline active={hasActiveChild}>{item.label}</MobileUnderline>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className={`size-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {render ? (
        <div ref={wrapRef} className="overflow-hidden">
          <div ref={listRef} className="mt-1 flex flex-col gap-0.5 pl-3">
            {children.map((child) => (
              <MobileNavLink
                key={child.href}
                href={child.href}
                label={child.label}
                active={pathname.startsWith(child.href)}
                onNavigate={onNavigate}
                className="px-3 py-2 text-[15px] text-[#1e1e1e]/80"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
