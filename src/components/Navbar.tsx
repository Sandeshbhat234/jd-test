"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import StoreSelector from "@/components/StoreSelector";
import Button from "@/components/ui/Button";
import { useSelectedStore } from "@/lib/useSelectedStore";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import {
  SHOP_URL,
  SHOP_CATEGORIES as SHOP_CATEGORY_DEFS,
  shopCategory,
} from "@/lib/links";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  /** Render the children as a full-width mega menu (desktop). */
  mega?: "shop" | "explore";
};

// `useLayoutEffect` measures DOM synchronously before paint (so the sliding
// underline never flashes at the wrong spot), but warns during SSR — fall back
// to `useEffect` on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Effect-free "are we on the client?" check, for SSR-safe portal rendering.
const subscribeNoop = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

const SHOP_CATEGORIES = SHOP_CATEGORY_DEFS.map((cat) => ({
  label: cat.label,
  href: shopCategory(cat.slug),
}));

const SHOP_PROMO = {
  title:
    "Join our loyalty program and start earning 10% cashback on every purchase.",
  subtitle: "The more you shop, the more you get back.",
  image: "/home/shop/loyalty-gift.png",
  cta: "Join for free",
  href: "/loyalty",
};

const EXPLORE_LINKS = [
  {
    label: "Read Blogs",
    href: "/blogs",
    image: "/home/explore/read-blogs.png",
  },
  // {
  //   label: "Dosage Calculator",
  //   href: "/dosage-calculator",
  //   image: "/home/explore/dosage-calculator.png",
  // },
  {
    label: "Beginner's Guide",
    href: "/guide",
    image: "/home/explore/beginners-guide.png",
  },
  {
    label: "Locations",
    href: "/locations",
    image: "/home/explore/locations.png",
  },
  {
    label: "Loyalty Program",
    href: "/loyalty",
    image: "/home/shop/loyalty-gift.png",
  },
];

const FEATURED_EVENT = {
  title: "Cannabis & Wellness",
  day: "18",
  month: "MAY",
  time: "6:00 PM – 8:00 PM",
  address: "Unit A, New York, NY 10036",
  image: "/home/image.png",
  registerHref: "/events/cannabis-wellness/register",
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: SHOP_URL, mega: "shop", children: SHOP_CATEGORIES },
  {
    label: "Explore",
    href: "/explore",
    mega: "explore",
    children: EXPLORE_LINKS.map(({ label, href }) => ({ label, href })),
  },
];

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
  const navRef = useRef<HTMLElement | null>(null);

  // Sliding "magic line": one underline that animates to the hovered nav item,
  // falling back to the active item when nothing is hovered.
  const listRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  // While a mega menu is open, keep the line on its trigger even after the
  // pointer leaves the bar (the panel is portalled outside the <ul>).
  const [openHref, setOpenHref] = useState<string | null>(null);
  const handleDropdownOpenChange = useCallback((href: string, open: boolean) => {
    setOpenHref((prev) => (open ? href : prev === href ? null : prev));
  }, []);
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
      className={`fixed inset-x-0 bgr top-0 z-50 flex h-[77px] w-full items-center justify-between border-b border-[#1e1e1e]/85 px-[clamp(16px,5vw,80px)] py-4 pb-2 transition-colors duration-300 will-change-transform ${
        scrolled || menuOpen
          ? "bg-linear-to-r from-white/[0.18] to-[#eee]/20 backdrop-blur-md"
          : "bg-transparent"
      }`}>
      <div className="flex items-center gap-[clamp(24px,5vw,64px)]">
        <Link
          href="/"
          aria-label="JD's Jungle home"
          className="flex h-[37.838px] w-[201.967px] items-center justify-between shrink-0">
          <Image
            src="/home/Logos/jd-jungle-mark.svg"
            alt=""
            width={38}
            height={38}
            preload
            className="size-[37.838px] select-none"
          />
          <Image
            src="/home/Logos/jd-jungle-wordmark.svg"
            alt="JD's Jungle"
            width={159}
            height={26}
            preload
            className={`h-[26.164px] w-[159.051px] select-none ${invertOnDark}`}
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
          onClick={() => setMenuOpen((o) => !o)}
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

      {menuOpen ? (
        <MobileMenu
          active={active}
          pathname={pathname}
          onClose={() => setMenuOpen(false)}
        />
      ) : null}
    </nav>
  );
}

function MobileMenu({
  active,
  pathname,
  onClose,
}: {
  active: string;
  pathname: string;
  onClose: () => void;
}) {
  const { store, setStore, stores } = useSelectedStore();

  // Lock page scroll while the menu is open (Lenis-aware — see `lockScroll`).
  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  const linkBase =
    "block rounded-lg px-3 py-2.5 font-cy text-[17px] leading-tight text-[#1e1e1e] transition-colors hover:bg-black/5";

  return (
    <div className="absolute inset-x-0 top-[77px] z-40 max-h-[calc(100svh-77px)] overflow-y-auto border-t border-black/10 bg-[#fffef8] px-[clamp(16px,5vw,40px)] py-6 shadow-[0px_12px_30px_rgba(0,0,0,0.18)] md:hidden">
      <nav className="flex flex-col gap-1" aria-label="Mobile">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.href} className="py-1">
              <p className="px-3 pb-1 pt-2 font-cy text-[13px] font-medium uppercase tracking-[0.5px] text-[#1e1e1e]/50">
                {item.label}
              </p>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  aria-current={
                    pathname.startsWith(child.href) ? "page" : undefined
                  }
                  className={`${linkBase} ${pathname.startsWith(child.href) ? "bg-black/5 font-medium" : ""}`}>
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={item.href === active ? "page" : undefined}
              className={`${linkBase} ${item.href === active ? "bg-black/5 font-medium" : ""}`}>
              {item.label}
            </Link>
          ),
        )}
        <Link
          href="/contact"
          onClick={onClose}
          aria-current={pathname.startsWith("/contact") ? "page" : undefined}
          className={`${linkBase} ${pathname.startsWith("/contact") ? "bg-black/5 font-medium" : ""}`}>
          Contact
        </Link>
      </nav>

      <div className="mt-4 border-t border-black/10 pt-4">
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

function matchActiveNavItem(pathname: string): string {
  if (pathname === "/") return "/";
  const match = NAV_ITEMS.find(
    (item) =>
      (item.href !== "/" && pathname.startsWith(item.href)) ||
      item.children?.some((child) => pathname.startsWith(child.href)),
  );
  return match?.href ?? "/";
}

function NavDropdown({
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
            className="flex min-w-[210px] flex-col rounded-2xl border border-black/10 bg-[#fffef8] p-2 shadow-[0px_10px_30px_rgba(0,0,0,0.15)]">
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

function MegaMenu({
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

/**
 * Right-arrow that slides + fades in when its parent `group` (a menu link) is
 * hovered/focused. The link's label colour is left untouched — the arrow is the
 * only hover affordance. Place it inside a `flex` link; it reserves its own slot
 * so revealing it never shifts the text.
 */
function HoverArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 -translate-x-2 text-[#1e1e1e] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${className}`}>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
          className="font-serif font-light leading-[1.1] text-[clamp(28px,3.2vw,48px)] text-[#1e1e1e] transition-opacity hover:opacity-70">
          Shop all products
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
