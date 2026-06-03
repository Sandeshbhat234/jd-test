/** Decorative circular "open" affordance (↗) shown on each blog card. */
export default function ArrowButton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#1e1e1e] text-[#1e1e1e] transition-colors ${
        className ?? "size-[clamp(40px,4vw,50px)]"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="size-[45%]"
      >
        <path
          d="M7 17L17 7M17 7H8M17 7V16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
