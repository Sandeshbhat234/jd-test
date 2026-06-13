"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/scrollLock";

/**
 * Land at the top of the page on every client-side route change.
 *
 * Next.js scrolls to the top on navigation, but Lenis drives the scroll
 * position itself and keeps its own internal target, so the new page can stay
 * at the previous offset. We force Lenis (or the native scroll, under
 * reduced-motion) back to 0 immediately whenever the pathname changes.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
