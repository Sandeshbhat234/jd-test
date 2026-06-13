import { twMerge } from "tailwind-merge";

/**
 * Join class names and resolve Tailwind conflicts so the last one wins.
 *
 * Plain string concatenation keeps both `px-5` and a caller's `px-8` in the
 * list, leaving the winner up to stylesheet order (usually the wrong one).
 * `twMerge` dedupes conflicting utilities, so a `className` prop reliably
 * overrides the component's defaults.
 */
export function cn(...parts: Array<string | undefined | null | false>): string {
  return twMerge(parts.filter(Boolean).join(" "));
}
