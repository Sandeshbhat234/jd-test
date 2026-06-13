/**
 * Right-arrow that slides + fades in when its parent `group` (a menu link) is
 * hovered/focused. The link's label colour is left untouched — the arrow is the
 * only hover affordance. Place it inside a `flex` link; it reserves its own slot
 * so revealing it never shifts the text.
 */
export function HoverArrow({ className = "" }: { className?: string }) {
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
