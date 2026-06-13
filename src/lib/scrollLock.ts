import type Lenis from "lenis";

/**
 * Page scroll lock that cooperates with Lenis smooth-scrolling.
 *
 * Lenis drives the page by intercepting wheel/touch input and scrolling the
 * native position itself, so a plain `body { overflow: hidden }` does NOT stop
 * it — the wheel keeps moving the page (and firing the navbar's scroll
 * listener). The only reliable lock is Lenis's own `stop()`/`start()`.
 *
 * `SmoothScroll` registers its instance here via `setLenis`; when reduced-motion
 * is on, no Lenis is created and we fall back to locking the document element.
 *
 * The lock is ref-counted so overlapping lockers (e.g. crossfading from the Shop
 * mega menu to Explore, or a menu open during a modal) never drop it early.
 */
let lenis: Lenis | null = null;
let lockCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

/** The active Lenis instance, if smooth-scrolling is running (null otherwise). */
export function getLenis(): Lenis | null {
  return lenis;
}

export function lockScroll(): void {
  if (lockCount === 0) {
    const el = document.documentElement;
    // Compensate for the disappearing scrollbar to avoid a layout shift.
    const scrollbar = window.innerWidth - el.clientWidth;
    savedPaddingRight = el.style.paddingRight;
    if (scrollbar > 0) el.style.paddingRight = `${scrollbar}px`;

    if (lenis) {
      // Adds Lenis's `lenis-stopped` class (overflow:hidden) and halts its
      // virtual scroll, so wheel/touch input no longer moves the page.
      lenis.stop();
    } else {
      savedOverflow = el.style.overflow;
      el.style.overflow = "hidden";
    }
  }
  lockCount += 1;
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    const el = document.documentElement;
    el.style.paddingRight = savedPaddingRight;
    if (lenis) {
      lenis.start();
    } else {
      el.style.overflow = savedOverflow;
    }
  }
}
