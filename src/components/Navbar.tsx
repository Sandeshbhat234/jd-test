"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import StoreSelector from "@/components/StoreSelector";
import Button from "@/components/ui/Button";
import { NAV_ITEMS, matchActiveNavItem } from "./navbar/data";
import { useIsoLayoutEffect } from "./navbar/hooks";
import { NavDropdown } from "./navbar/NavDropdown";
import { MobileMenu } from "./navbar/MobileMenu";

export interface NavbarProps {
  activeHref?: string;
}

export default function Navbar({ activeHref }: NavbarProps) {
  const pathname = usePathname();
  const active = activeHref ?? matchActiveNavItem(pathname);
  const contactActive = pathname.startsWith("/contact");

  // Always-black foreground: text, borders and the (white-source) logo SVGs.
  const textColor = "text-[#1e1e1e]";
  const underlineColor = "bg-[#1e1e1e]";
  // White source SVGs become black under brightness(0).
  const invertOnDark = "[filter:brightness(0)]";

  const [menuOpen, setMenuOpen] = useState(false);
  // Stays mounted while the close animation plays, then unmounts (see onClosed).
  const [menuRender, setMenuRender] = useState(false);
  const openMenu = useCallback(() => {
    setMenuRender(true);
    setMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handleMenuClosed = useCallback(() => setMenuRender(false), []);
  const navRef = useRef<HTMLElement | null>(null);

  // Sliding "magic line": one underline that animates to the hovered nav item,
  // falling back to the active item when nothing is hovered.
  const listRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  // While a mega menu is open, keep the line on its trigger even after the
  // pointer leaves the bar (the panel is portalled outside the <ul>).
  const [openHref, setOpenHref] = useState<string | null>(null);
  const handleDropdownOpenChange = useCallback(
    (href: string, open: boolean) => {
      setOpenHref((prev) => (open ? href : prev === href ? null : prev));
    },
    [],
  );
  // Hovered wins, then any open dropdown, then the active route.
  const indicatorTarget = hoveredHref ?? openHref ?? active;

  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const move = () => {
      const el = list.querySelector<HTMLElement>(
        `[data-nav="${indicatorTarget}"]`,
      );
      if (!el) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.left = `${el.offsetLeft}px`;
      indicator.style.width = `${el.offsetWidth}px`;
    };

    move();
    // Re-measure when item widths change (font swap, viewport resize).
    const ro = new ResizeObserver(move);
    ro.observe(list);
    return () => ro.disconnect();
  }, [indicatorTarget]);

  // Transparent over the hero by default; a light glassmorphic bar fades in once
  // the page is scrolled past the top.
  const [scrolled, setScrolled] = useState(false);
  // Hide the bar while scrolling down, reveal it on scroll up (and near the top).
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const delta = y - lastY;
      // Small deadzone so jitter doesn't toggle it; always show near the top.
      if (y < 80 || delta < -4) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the bar out of view (up) and back in (down) with GSAP easing — a
  // quicker ease-in on the way up, a softer ease-out as it returns.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const shouldHide = hidden && !menuOpen;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(nav, { yPercent: shouldHide ? -100 : 0 });
      return;
    }
    gsap.to(nav, {
      yPercent: shouldHide ? -100 : 0,
      duration: shouldHide ? 0.4 : 0.55,
      ease: shouldHide ? "power2.in" : "power3.out",
      overwrite: true,
    });
  }, [hidden, menuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 flex h-[77px] w-full items-center justify-between border-b border-[#1e1e1e]/85 px-[clamp(16px,5vw,80px)] py-4 pb-2 transition-colors duration-300 will-change-transform ${
        scrolled || menuOpen
          ? "bg-linear-to-r from-white/[0.18] to-[#eee]/20 backdrop-blur-md"
          : "bg-transparent"
      }`}>
      <div className="flex items-center gap-[clamp(24px,5vw,64px)]">
        <Link
          href="/"
          aria-label="JD's Jungle home"
          className="flex h-[37.838px] items-center gap-[6px] shrink-0 md:w-[201.967px] md:justify-between md:gap-0">
          <Image
            src="/home/Logos/jd-jungle-mark.svg"
            alt=""
            width={38}
            height={38}
            preload
            className="size-[30px] select-none md:size-[37.838px]"
          />
          <Image
            src="/home/Logos/jd-jungle-wordmark.svg"
            alt="JD's Jungle"
            width={159}
            height={26}
            preload
            className={`h-[20px] w-[121.6px] select-none md:h-[26.164px] md:w-[159.051px] ${invertOnDark}`}
          />
        </Link>

        <ul
          ref={listRef}
          onMouseLeave={() => setHoveredHref(null)}
          onMouseOver={(e) => {
            const el = (e.target as HTMLElement).closest("[data-nav]");
            const href = el?.getAttribute("data-nav");
            if (href) setHoveredHref(href);
          }}
          className="relative hidden items-center gap-[clamp(20px,2.5vw,32px)] md:flex">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <NavDropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  textColor={textColor}
                  onOpenChange={handleDropdownOpenChange}
                />
              );
            }
            return (
              <li key={item.href} data-nav={item.href}>
                <Link
                  href={item.href}
                  className={`font-cy text-[18px] font-medium leading-[27px] transition-opacity hover:opacity-80 ${textColor}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Shared sliding underline; positioned in the measuring effect. */}
          <span
            ref={indicatorRef}
            aria-hidden
            className={`pointer-events-none absolute -bottom-[22px] left-0 h-[6px] w-0 rounded-t-[5px] opacity-0 transition-[left,width,opacity] duration-300 ease-out motion-reduce:transition-none ${underlineColor}`}
          />
        </ul>
      </div>

      <div className="flex items-center gap-[clamp(16px,2vw,32px)]">
        <StoreSelector dark />

        <Button
          href="/contact"
          variant="primary"
          size="sm"
          aria-current={contactActive ? "page" : undefined}
          className="hidden md:inline-flex">
          Contact
        </Button>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          className={`inline-flex size-10 items-center justify-center md:hidden ${textColor}`}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-7">
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuRender ? (
        <MobileMenu
          open={menuOpen}
          active={active}
          pathname={pathname}
          onClose={closeMenu}
          onClosed={handleMenuClosed}
        />
      ) : null}
    </nav>
  );
}
