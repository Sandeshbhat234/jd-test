"use client";

import { useEffect, useRef } from "react";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Focus the input on mount (useful when revealed by a toggle). */
  autoFocus?: boolean;
  /** When provided, a trailing clear/close button is shown. */
  onClose?: () => void;
  /** Accessible label for the input. */
  ariaLabel?: string;
  className?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Shared search input used by the blogs and locations pages.
 * Controlled: the parent owns `value` and reacts to `onChange`.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  autoFocus = false,
  onClose,
  ariaLabel = "Search",
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div
      className={`flex h-10 items-center gap-2.5 rounded-full border border-black bg-white px-4 text-[#1e1e1e] ${
        className ?? ""
      }`}
    >
      <SearchIcon className="size-[18px] shrink-0 text-[#1e1e1e]" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onClose?.()}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-transparent font-cy text-[14px] tracking-[0.3px] text-[#1e1e1e] placeholder:text-[#888] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Clear search"
          className="shrink-0 rounded-full p-0.5 text-[#888] transition-colors hover:text-[#1e1e1e]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="size-4">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
