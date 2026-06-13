import {
  SHOP_URL,
  SHOP_CATEGORIES as SHOP_CATEGORY_DEFS,
  shopCategory,
} from "@/lib/links";
import type { NavItem } from "./types";

export const SHOP_CATEGORIES = SHOP_CATEGORY_DEFS.map((cat) => ({
  label: cat.label,
  href: shopCategory(cat.slug),
}));

export const SHOP_PROMO = {
  title:
    "Join our loyalty program and start earning 10% cashback on every purchase.",
  subtitle: "The more you shop, the more you get back.",
  image: "/home/shop/loyalty-gift.png",
  cta: "Join for free",
  href: "/loyalty",
};

export const EXPLORE_LINKS = [
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

export const FEATURED_EVENT = {
  title: "Cannabis & Wellness",
  day: "18",
  month: "MAY",
  time: "6:00 PM – 8:00 PM",
  address: "Unit A, New York, NY 10036",
  image: "/home/image.png",
  registerHref: "/events/cannabis-wellness/register",
};

export const NAV_ITEMS: NavItem[] = [
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

export function matchActiveNavItem(pathname: string): string {
  if (pathname === "/") return "/";
  const match = NAV_ITEMS.find(
    (item) =>
      (item.href !== "/" && pathname.startsWith(item.href)) ||
      item.children?.some((child) => pathname.startsWith(child.href)),
  );
  return match?.href ?? "/";
}
