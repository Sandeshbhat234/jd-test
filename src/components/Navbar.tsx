"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import StoreSelector from "@/components/StoreSelector";

type NavItem = { label: string; href: string; children?: NavItem[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  {
    label: "Explore",
    href: "/explore",
    children: [
      { label: "Loyalty Program", href: "/loyalty" },
      { label: "Blogs", href: "/blogs" },
      { label: "Locations", href: "/locations" },
    ],
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
                  className={`font-[var(--font-cy-grotesk)] text-[16px] font-medium leading-[17.293px] transition-opacity hover:opacity-80 ${textColor}`}
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
            className={`w-full bg-transparent font-[var(--font-cy-grotesk)] text-[12px] leading-[18px] tracking-[0.2018px] focus:outline-none ${textColor} ${dark ? "placeholder:text-[#1e1e1e]/70" : "placeholder:text-white/80"}`}
          />
        </label>

        <div className="hidden items-center gap-2 font-[var(--font-cy-grotesk)] text-[16px] leading-[17.293px] sm:flex">
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
      </div>
    </nav>
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

  return (
    <li
      className="relative"
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
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={`flex items-center gap-1 font-[var(--font-cy-grotesk)] text-[16px] font-medium leading-[17.293px] transition-opacity hover:opacity-80 ${textColor}`}
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

      {open ? (
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
                    className={`block rounded-xl px-4 py-2.5 font-[var(--font-cy-grotesk)] text-[15px] leading-tight text-[#1e1e1e] transition-colors hover:bg-black/5 ${
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
