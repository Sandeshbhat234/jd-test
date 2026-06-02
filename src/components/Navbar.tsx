"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Explore", href: "/explore" },
  { label: "Contact", href: "/contact" },
];

export interface NavbarProps {
  activeHref?: string;
}

export default function Navbar({ activeHref }: NavbarProps) {
  const pathname = usePathname();
  const active = activeHref ?? matchActiveNavItem(pathname);
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
            className="h-[26.164px] w-[159.051px] select-none"
          />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === active;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="font-[var(--font-cy-grotesk)] text-[16px] font-medium leading-[17.293px] text-white transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-[27px] left-0 h-[6px] w-full rounded-t-[5px] bg-white"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-[clamp(16px,2vw,32px)]">
        <label className="hidden h-[36px] w-[190px] items-center gap-2 rounded-full border border-white px-4 py-2 text-white/90 md:flex">
          <Image
            src="/home/Icons/search.svg"
            alt=""
            width={17}
            height={17}
            className="size-[17.293px] select-none"
          />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="w-full bg-transparent font-[var(--font-cy-grotesk)] text-[12px] leading-[18px] tracking-[0.2018px] text-white placeholder:text-white/80 focus:outline-none"
          />
        </label>

        <div className="hidden items-center gap-2 font-[var(--font-cy-grotesk)] text-[16px] leading-[17.293px] sm:flex">
          <Link
            href="/login"
            className="text-white transition-opacity hover:opacity-80"
          >
            Login
          </Link>
          <span className="text-white/50">or</span>
          <Link
            href="/signup"
            className="text-white transition-opacity hover:opacity-80"
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
            className="size-full select-none"
          />
        </Link>
      </div>
    </nav>
  );
}

function matchActiveNavItem(pathname: string): string {
  if (pathname === "/") return "/";
  const match = NAV_ITEMS.find(
    (item) => item.href !== "/" && pathname.startsWith(item.href),
  );
  return match?.href ?? "/";
}
