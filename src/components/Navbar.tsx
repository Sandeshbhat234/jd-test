"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StoreSelector from "@/components/StoreSelector";
import Button from "@/components/ui/Button";
import { useSelectedStore } from "@/lib/useSelectedStore";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  /** Render the children as a full-width mega menu (desktop). */
  mega?: "shop" | "explore";
};

const SHOP_CATEGORIES = [
  { label: "Pre-Rolls", href: "/shop/pre-rolls" },
  { label: "Drinks", href: "/shop/drinks" },
  { label: "Vapes", href: "/shop/vapes" },
  { label: "Tinctures", href: "/shop/tinctures" },
  { label: "Topicals", href: "/shop/topicals" },
  { label: "Capsules", href: "/shop/capsules" },
  { label: "Edibles", href: "/shop/edibles" },
  { label: "Flower", href: "/shop/flower" },
  { label: "Extracts", href: "/shop/extracts" },
];

const SHOP_PROMO = {
  title: "Join our loyalty program and start earning 10% cashback on every purchase.",
  subtitle: "The more you shop, the more you get back.",
  image: "/home/shop/loyalty-gift.png",
  cta: "Join for free",
  href: "/loyalty",
};

const EXPLORE_LINKS = [
  { label: "Read Blogs", href: "/blogs", image: "/home/explore/read-blogs.png" },
  {
    label: "Dosage Calculator",
    href: "/dosage-calculator",
    image: "/home/explore/dosage-calculator.png",
  },
  { label: "Beginner's Guide", href: "/guide", image: "/home/explore/beginners-guide.png" },
  { label: "Locations", href: "/locations", image: "/home/explore/locations.png" },
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
  { label: "Shop", href: "/shop", mega: "shop", children: SHOP_CATEGORIES },
  { label: "About", href: "/about" },
  {
    label: "Explore",
    href: "/explore",
    mega: "explore",
    children: EXPLORE_LINKS.map(({ label, href }) => ({ label, href })),
  },
  { label: "Contact", href: "/contact" },
];

export interface NavbarProps {
  activeHref?: string;
  /** Force the colour scheme. By default it's derived from the route. */
  theme?: "light" | "dark";
}

export default function Navbar({ activeHref, theme }: NavbarProps) {
  const pathname = usePathname();
  const active = activeHref ?? matchActiveNavItem(pathname);

  // "dark" = dark foreground (for use over light backgrounds, e.g. /about, /loyalty).
  const LIGHT_BG_ROUTES = ["/about", "/loyalty", "/blogs", "/locations", "/contact"];
  const resolvedTheme =
    theme ??
    (LIGHT_BG_ROUTES.some((route) => pathname.startsWith(route)) ? "dark" : "light");
  const dark = resolvedTheme === "dark";

  const textColor = dark ? "text-[#1e1e1e]" : "text-white";
  const mutedColor = dark ? "text-[#1e1e1e]/50" : "text-white/50";
  const underlineColor = dark ? "bg-[#1e1e1e]" : "bg-white";
  const borderColor = dark ? "border-[#1e1e1e]" : "border-white";
  // White source SVGs become black under brightness(0) so they read on light.
  const invertOnDark = dark ? "[filter:brightness(0)]" : "";

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 top-0 z-50 flex h-[77px] w-full items-center justify-between px-[clamp(16px,5vw,80px)] py-4 bg-linear-to-r from-white/[0.18] to-[#eee]/20 backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-[clamp(24px,5vw,64px)]">
        <Link
          href="/"
          aria-label="JD's Jungle home"
          className="flex h-[37.838px] w-[201.967px] items-center justify-between shrink-0"
        >
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

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === active;
            if (item.children) {
              return (
                <NavDropdown
                  key={item.href}
                  item={item}
                  isActive={isActive}
                  pathname={pathname}
                  textColor={textColor}
                  underlineColor={underlineColor}
                />
              );
            }
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`font-cy text-[16px] font-medium leading-[17.293px] transition-opacity hover:opacity-80 ${textColor}`}
                >
                  {item.label}
                </Link>
                {isActive ? (
                  <span
                    aria-hidden
                    className={`absolute -bottom-[27px] left-0 h-[6px] w-full rounded-t-[5px] ${underlineColor}`}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-[clamp(16px,2vw,32px)]">
        <StoreSelector dark={dark} />

        <label
          className={`hidden h-[36px] w-[190px] items-center gap-2 rounded-full border px-4 py-2 lg:flex ${borderColor} ${dark ? "text-[#1e1e1e]/90" : "text-white/90"}`}
        >
          <Image
            src="/home/Icons/search.svg"
            alt=""
            width={17}
            height={17}
            className={`size-[17.293px] select-none ${invertOnDark}`}
          />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className={`w-full bg-transparent font-cy text-[12px] leading-[18px] tracking-[0.2018px] focus:outline-none ${textColor} ${dark ? "placeholder:text-[#1e1e1e]/70" : "placeholder:text-white/80"}`}
          />
        </label>

        <div className="hidden items-center gap-2 font-cy text-[16px] leading-[17.293px] sm:flex">
          <Link
            href="/login"
            className={`transition-opacity hover:opacity-80 ${textColor}`}
          >
            Login
          </Link>
          <span className={mutedColor}>or</span>
          <Link
            href="/signup"
            className={`transition-opacity hover:opacity-80 ${textColor}`}
          >
            Sign Up
          </Link>
        </div>

        <Link
          href="/cart"
          aria-label="Open shopping cart"
          className="relative inline-flex size-[56px] items-center justify-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/home/Icons/cart.svg"
            alt=""
            width={56}
            height={56}
            className={`size-full select-none ${invertOnDark}`}
          />
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className={`inline-flex size-10 items-center justify-center md:hidden ${textColor}`}
        >
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

  // Lock body scroll while the menu is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
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
                  aria-current={pathname.startsWith(child.href) ? "page" : undefined}
                  className={`${linkBase} ${pathname.startsWith(child.href) ? "bg-black/5 font-medium" : ""}`}
                >
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
              className={`${linkBase} ${item.href === active ? "bg-black/5 font-medium" : ""}`}
            >
              {item.label}
            </Link>
          ),
        )}
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
              }`}
            >
              {s.name}
              {s.slug === store.slug ? <span aria-hidden>✓</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-black/10 px-3 pt-4 font-cy text-[16px] text-[#1e1e1e]">
        <Link href="/login" onClick={onClose} className="hover:opacity-70">
          Login
        </Link>
        <span className="text-[#1e1e1e]/50">or</span>
        <Link href="/signup" onClick={onClose} className="hover:opacity-70">
          Sign Up
        </Link>
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
  isActive,
  pathname,
  textColor,
  underlineColor,
}: {
  item: NavItem;
  isActive: boolean;
  pathname: string;
  textColor: string;
  underlineColor: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover intent: keep the panel open while the pointer travels across the gap
  // between the trigger and the (full-width) mega menu below the bar.
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <li
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
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
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={`flex items-center gap-1 font-cy text-[16px] font-medium leading-[17.293px] transition-opacity hover:opacity-80 ${textColor}`}
      >
        {item.label}
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

      {isActive ? (
        <span
          aria-hidden
          className={`absolute -bottom-[27px] left-0 h-[6px] w-full rounded-t-[5px] ${underlineColor}`}
        />
      ) : null}

      {open && item.mega ? (
        <MegaMenu
          kind={item.mega}
          pathname={pathname}
          onEnter={openNow}
          onLeave={closeSoon}
          onNavigate={() => setOpen(false)}
        />
      ) : open ? (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
          <ul
            role="menu"
            className="flex min-w-[210px] flex-col rounded-2xl border border-black/10 bg-[#fffef8] p-2 shadow-[0px_10px_30px_rgba(0,0,0,0.15)]"
          >
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
                    }`}
                  >
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
  pathname,
  onEnter,
  onLeave,
  onNavigate,
}: {
  kind: "shop" | "explore";
  pathname: string;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock page scroll while open. The navbar is absolutely positioned (it
  // scrolls with the page) whereas this panel is viewport-fixed, so without
  // the lock the two would drift apart on scroll. Pad by the scrollbar width
  // so removing the scrollbar doesn't shift the page sideways on (hover) open.
  useEffect(() => {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, []);

  if (!mounted) return null;

  // Portalled to <body> so it's truly viewport-fixed. (The navbar's
  // backdrop-blur creates a containing block, which would otherwise trap a
  // `fixed` child and make it add to the page's scroll height.)
  return createPortal(
    <div
      role="menu"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed inset-x-0 top-[77px] z-40 max-h-[calc(100svh-77px)] overflow-y-auto border-t border-black/10 bg-[#fffef8] text-[#1e1e1e] shadow-[0px_12px_30px_rgba(0,0,0,0.18)]"
    >
      <div
        className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(20px,2.5vw,32px)] py-[clamp(16px,2vw,28px)] lg:flex-row lg:items-stretch"
        style={{ paddingInline: "clamp(24px,4vw,80px)" }}
      >
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
                className="group flex items-center gap-[clamp(12px,1.5vw,16px)]"
              >
                <span className="relative aspect-[241/172.5] w-[clamp(96px,10vw,160px)] shrink-0 overflow-hidden rounded-[10px]">
                  <Image
                    src={link.image}
                    alt=""
                    fill
                    sizes="160px"
                    className="select-none object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span
                  className={`font-serif font-light leading-[1.1] text-[clamp(20px,2.2vw,40px)] transition-opacity group-hover:opacity-70 ${
                    isActive ? "opacity-70" : ""
                  }`}
                >
                  {link.label}
                </span>
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
          variant="secondary"
          onClick={onNavigate}
          className="w-full"
        >
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
                  className={`font-cy text-[clamp(18px,1.7vw,26px)] leading-[1.5] transition-opacity hover:opacity-60 ${
                    isActive ? "opacity-60" : ""
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <span aria-hidden className="h-px w-full bg-black/15" />

        <Link
          href="/shop"
          role="menuitem"
          onClick={onNavigate}
          className="font-serif font-light leading-[1.1] text-[clamp(28px,3.2vw,48px)] text-[#1e1e1e] transition-opacity hover:opacity-70"
        >
          Shop all products
        </Link>
      </div>

      <Link
        href={SHOP_PROMO.href}
        role="menuitem"
        onClick={onNavigate}
        className="group flex w-full flex-col gap-[clamp(12px,1.4vw,24px)] rounded-2xl border border-[#636363] bg-[#f7f4e9] p-[clamp(14px,1.2vw,16px)] lg:w-[clamp(340px,30vw,473px)]"
      >
        <div className="flex flex-col gap-2">
          <p className="font-cy text-[clamp(18px,1.6vw,26px)] leading-[1.4] text-[#1e1e1e]">
            {SHOP_PROMO.title}
          </p>
          <p className="font-cy text-[clamp(15px,1.4vw,22px)] leading-[1.4] text-[#7c7c7c]">
            {SHOP_PROMO.subtitle}
          </p>
        </div>

        <div className="relative aspect-[441/365] w-full overflow-hidden">
          <Image
            src={SHOP_PROMO.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 473px"
            className="select-none object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <span aria-hidden className="h-px w-full bg-black/15" />

        <span className="font-cy text-[clamp(15px,1.2vw,18px)] uppercase leading-[1.5] text-[#1e1e1e]">
          {SHOP_PROMO.cta}
        </span>
      </Link>
    </>
  );
}
