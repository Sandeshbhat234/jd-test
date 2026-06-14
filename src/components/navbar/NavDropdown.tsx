"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MegaMenu } from "./MegaMenu";
import type { NavItem } from "./types";

export function NavDropdown({
  item,
  pathname,
  textColor,
  onOpenChange,
}: {
  item: NavItem;
  pathname: string;
  textColor: string;
  onOpenChange: (href: string, open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  // Tell the navbar when this dropdown opens/closes so the sliding underline
  // can stay on this trigger while its (portalled) panel is open.
  useEffect(() => {
    onOpenChange(item.href, open);
  }, [open, item.href, onOpenChange]);
  // Stays true while the close animation plays, then the menu unmounts.
  const [render, setRender] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover intent: keep the panel open while the pointer travels across the gap
  // between the trigger and the (full-width) mega menu below the bar.
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openNow = () => {
    cancelClose();
    setRender(true);
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  // The panel mounts when opening (see `openNow`); unmounting waits for the
  // close animation to finish (see `handleClosed`).
  const handleClosed = useCallback(() => setRender(false), []);

  useEffect(() => () => cancelClose(), []);

  // Close on scroll intent. The open mega menu stops Lenis (see `lockScroll`),
  // so the page can't actually move — but wheel/touch input still fires here,
  // letting us dismiss the dropdown and hand scrolling back to the page.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });
    return () => {
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchmove", close);
    };
  }, [open]);

  return (
    <li
      data-nav={item.href}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openNow())}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={`flex items-center gap-1 font-cy text-[18px] font-medium leading-[27px] transition-opacity hover:opacity-80 ${textColor}`}>
        {item.label}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {render && item.mega ? (
        <MegaMenu
          kind={item.mega}
          open={open}
          pathname={pathname}
          onEnter={openNow}
          onLeave={closeSoon}
          onNavigate={() => setOpen(false)}
          onClosed={handleClosed}
        />
      ) : open ? (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
          <ul
            role="menu"
            className="flex min-w-[210px] flex-col rounded-2xl border border-black/10 bg-[#fffff8] p-2 shadow-[0px_10px_30px_rgba(0,0,0,0.15)]">
            {item.children!.map((child) => {
              const childActive = pathname.startsWith(child.href);
              return (
                <li key={child.href} role="none">
                  <Link
                    href={child.href}
                    role="menuitem"
                    aria-current={childActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-2.5 font-cy text-[15px] leading-tight text-[#1e1e1e] transition-colors hover:bg-black/5 ${
                      childActive ? "bg-black/5 font-medium" : ""
                    }`}>
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}
