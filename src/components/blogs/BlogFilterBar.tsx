"use client";

import { useState } from "react";
import { BLOG_CATEGORIES } from "@/data/blogs";
import SearchBar from "@/components/ui/SearchBar";

const chip =
  "flex shrink-0 items-start gap-1 rounded-full border border-[#1e1e1e] px-5 py-2 font-cy transition-colors";

export interface BlogFilterBarProps {
  selected: string;
  onSelect: (label: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export default function BlogFilterBar({
  selected,
  onSelect,
  query,
  onQueryChange,
}: BlogFilterBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = () => {
    setSearchOpen(false);
    onQueryChange("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto">
          {BLOG_CATEGORIES.map((cat) => {
            const active = cat.label === selected;
            return (
              <button
                key={cat.label}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(cat.label)}
                className={`${chip} ${
                  active
                    ? "bg-[#1e1e1e] text-[#fffef8]"
                    : "bg-[rgba(234,233,228,0.2)] text-[#1e1e1e] hover:bg-[rgba(234,233,228,0.6)]"
                }`}
              >
                <span className="text-[clamp(14px,1vw,18px)] leading-[1.5] whitespace-nowrap">
                  {cat.label}
                </span>
                <span className="text-[10px] leading-[1.5]">{cat.count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={searchOpen ? "Close search" : "Search blogs"}
          aria-expanded={searchOpen}
          onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
          className="flex shrink-0 items-center justify-center rounded-full border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] px-5 py-2.5 text-[#1e1e1e] transition-colors hover:bg-[rgba(234,233,228,0.6)]"
        >
          {searchOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {searchOpen && (
        <SearchBar
          value={query}
          onChange={onQueryChange}
          onClose={closeSearch}
          autoFocus
          placeholder="Search articles…"
          ariaLabel="Search articles"
        />
      )}
    </div>
  );
}
