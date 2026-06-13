import type { BlogCategory } from "@/data/blogs";

type IconKey = BlogCategory | "All";

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Outline line-icons matching the hand-rolled SVG style used across the blogs UI. */
const PATHS: Record<IconKey, React.ReactNode> = {
  // Grid of swatches → "everything"
  All: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" />
    </>
  ),
  // Leaf → wellness
  Wellness: (
    <>
      <path d="M5 19c0-8 6-14 15-14 0 9-6 14-15 14Z" stroke="currentColor" />
      <path d="M5 19c4-6 8-9 13-11" stroke="currentColor" />
    </>
  ),
  // Stacked layers → formats / consumption methods
  Formats: (
    <>
      <path d="M12 3.5 4 8l8 4.5L20 8 12 3.5Z" stroke="currentColor" />
      <path d="M4 12l8 4.5L20 12" stroke="currentColor" />
      <path d="M4 16l8 4.5L20 16" stroke="currentColor" />
    </>
  ),
  // Hexagon (molecule) → cannabinoids
  Cannabinoids: (
    <>
      <path d="M12 4 19 8v8l-7 4-7-4V8l7-4Z" stroke="currentColor" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" />
    </>
  ),
  // Droplet (aroma) → terpenes
  Terpenes: (
    <path
      d="M12 3.5c3.5 4 5.5 6.8 5.5 9.5a5.5 5.5 0 0 1-11 0c0-2.7 2-5.5 5.5-9.5Z"
      stroke="currentColor"
    />
  ),
};

export default function CategoryIcon({
  category,
  className,
}: {
  category: IconKey;
  className?: string;
}) {
  return (
    <svg {...base} aria-hidden className={className}>
      {PATHS[category]}
    </svg>
  );
}
