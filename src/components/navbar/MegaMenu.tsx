"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { SHOP_URL } from "@/lib/links";
import {
  EXPLORE_LINKS,
  FEATURED_EVENT,
  SHOP_CATEGORIES,
  SHOP_PROMO,
} from "./data";
import { HoverArrow } from "./HoverArrow";
import { useIsClient } from "./hooks";

export function MegaMenu({
  kind,
  open,
  pathname,
  onEnter,
  onLeave,
  onNavigate,
  onClosed,
}: {
  kind: "shop" | "explore";
  open: boolean;
  pathname: string;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
  /** Called once the close animation has finished, so the parent can unmount. */
  onClosed: () => void;
}) {
  const portalReady = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Lock page scroll while open. Lenis drives scrolling via JS, so this stops
  // Lenis itself (a plain overflow:hidden wouldn't) — keeping the page still and
  // the navbar from hiding on scroll while the panel is open. The lock is
  // ref-counted so crossfading between panels never drops it. (See `lockScroll`.)
  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  // Drop the panel down with a fade while its columns rise in with a stagger;
  // closing reverses it, then signals the parent to unmount. Because the Shop
  // and Explore panels share this animation, moving between them crossfades.
  useEffect(() => {
    const panel = panelRef.current;
    if (!portalReady || !panel) return;

    const cols = innerRef.current ? Array.from(innerRef.current.children) : [];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (open) {
      if (reduce) {
        gsap.set(panel, { autoAlpha: 1 });
        gsap.set(cols, { autoAlpha: 1, clearProps: "transform" });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" },
      ).fromTo(
        cols,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          stagger: 0.06,
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
    tl.to(cols, {
      autoAlpha: 0,
      y: 10,
      duration: 0.16,
      stagger: 0.04,
      ease: "power2.in",
    }).to(
      panel,
      { autoAlpha: 0, y: -10, duration: 0.2, ease: "power2.in" },
      "-=0.1",
    );
    return () => {
      tl.kill();
    };
  }, [open, portalReady, onClosed]);

  if (!portalReady) return null;

  // Portalled to <body> so it's truly viewport-fixed. (The navbar's
  // backdrop-blur creates a containing block, which would otherwise trap a
  // `fixed` child and make it add to the page's scroll height.) It starts
  // hidden in CSS so there's no flash before GSAP's `autoAlpha` takes over.
  return createPortal(
    <div
      ref={panelRef}
      role="menu"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="invisible fixed inset-x-0 bottom-0 top-[77px] z-40 overflow-y-auto border-t border-black/10 bg-[#fffef8] text-[#1e1e1e] opacity-0 shadow-[0px_12px_30px_rgba(0,0,0,0.18)]">
      <div
        ref={innerRef}
        className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(20px,2.5vw,32px)] py-[clamp(16px,2vw,28px)] lg:flex-row lg:items-stretch"
        style={{ paddingInline: "clamp(24px,4vw,80px)" }}>
        {kind === "explore" ? (
          <ExploreMegaContent pathname={pathname} onNavigate={onNavigate} />
        ) : (
          <ShopMegaContent pathname={pathname} onNavigate={onNavigate} />
        )}
      </div>
    </div>,
    document.body,
  );
}

function ExploreMegaContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <>
      <ul className="flex flex-1 flex-col gap-[clamp(8px,1vw,16px)]">
        {EXPLORE_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                role="menuitem"
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className="group flex w-fit items-center gap-[clamp(12px,1.5vw,16px)]">
                <span className="relative aspect-[241/172.5] w-[clamp(96px,10vw,160px)] shrink-0 overflow-hidden rounded-[10px]">
                  <Image
                    src={link.image}
                    alt=""
                    fill
                    sizes="160px"
                    className="select-none object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="font-serif font-light leading-[1.1] text-[clamp(20px,2.2vw,40px)]">
                  {link.label}
                </span>
                <HoverArrow className="ml-auto size-[clamp(22px,2vw,34px)]" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex w-full flex-col gap-[clamp(12px,1.2vw,20px)] rounded-2xl border border-[#636363] bg-[#f7f4e9]/90 p-[clamp(14px,1.2vw,20px)] backdrop-blur-[14px] lg:w-[clamp(360px,34vw,560px)]">
        <h3 className="font-serif text-[clamp(22px,2.2vw,32px)] capitalize leading-[1.1] text-black">
          Upcoming Events
        </h3>

        <div className="relative flex min-h-[clamp(150px,20vh,260px)] flex-1 flex-col justify-between overflow-hidden rounded-2xl p-[clamp(12px,1.2vw,16px)] text-[#f7f4e9]">
          <Image
            src={FEATURED_EVENT.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="select-none object-cover object-bottom"
          />
          <span aria-hidden className="absolute inset-0 bg-black/55" />

          <p className="relative font-cy text-[clamp(18px,1.6vw,26px)] capitalize leading-[1.4]">
            {FEATURED_EVENT.title}
          </p>

          <div className="relative flex flex-col gap-1.5 font-cy tracking-[0.2px]">
            <div className="flex items-end gap-2">
              <span className="text-[clamp(28px,3vw,44px)] leading-none">
                {FEATURED_EVENT.day}
              </span>
              <span className="pb-1 text-[clamp(15px,1.4vw,20px)] leading-none">
                {FEATURED_EVENT.month}
              </span>
            </div>
            <span className="text-[clamp(15px,1.4vw,20px)] leading-[1.4]">
              {FEATURED_EVENT.time}
            </span>
            <span className="text-[clamp(13px,1.1vw,17px)] leading-[1.4]">
              {FEATURED_EVENT.address}
            </span>
          </div>
        </div>

        <Button
          href={FEATURED_EVENT.registerHref}
          variant="primary"
          onClick={onNavigate}
          className="w-full">
          Register
        </Button>
      </div>
    </>
  );
}

function ShopMegaContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-[clamp(16px,2vw,32px)]">
        <ul className="grid grid-cols-2 gap-x-[clamp(24px,4vw,80px)] gap-y-[clamp(6px,1vw,20px)] lg:flex lg:flex-col">
          {SHOP_CATEGORIES.map((cat) => {
            const isActive = pathname.startsWith(cat.href);
            return (
              <li key={cat.href} role="none">
                <Link
                  href={cat.href}
                  role="menuitem"
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex w-fit items-center gap-2 font-cy text-[clamp(18px,1.25vw,26px)] leading-[1.5] ${
                    isActive ? "opacity-60" : ""
                  }`}>
                  {cat.label}
                  <HoverArrow className="size-[clamp(15px,1vw,20px)]" />
                </Link>
              </li>
            );
          })}
        </ul>

        <span aria-hidden className="h-px w-full bg-black/15" />

        <Link
          href={SHOP_URL}
          role="menuitem"
          onClick={onNavigate}
          className="group flex w-fit items-center gap-[clamp(12px,1.5vw,16px)] font-serif font-light leading-[1.1] text-[clamp(28px,3.2vw,48px)] text-[#1e1e1e]">
          Shop all products
          <HoverArrow className="size-[clamp(22px,2vw,34px)]" />
        </Link>
      </div>

      <Link
        href={SHOP_PROMO.href}
        role="menuitem"
        onClick={onNavigate}
        className="group flex w-full flex-col gap-[clamp(12px,1.4vw,24px)] rounded-2xl border border-[#636363] bg-[#f7f4e9] p-[clamp(14px,1.2vw,16px)] lg:w-[clamp(340px,30vw,473px)]">
        <div className="flex flex-col gap-2">
          <p className="font-cy text-[clamp(18px,1.6vw,26px)] leading-[1.4] text-[#1e1e1e]">
            {SHOP_PROMO.title}
          </p>
          <p className="font-cy text-[clamp(15px,1.4vw,22px)] leading-[1.4] text-[#7c7c7c]">
            {SHOP_PROMO.subtitle}
          </p>
        </div>

        <div className="relative aspect-[441/365] border-b border-black/75 max-h-[35vh] w-full overflow-hidden">
          <Image
            src={SHOP_PROMO.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 473px"
            className="select-none object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <span className="font-cy text-[clamp(15px,1.2vw,18px)] uppercase leading-[1.5] text-[#1e1e1e]">
          {SHOP_PROMO.cta}
        </span>
      </Link>
    </>
  );
}
