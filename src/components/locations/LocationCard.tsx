"use client";

import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/data/locations";
import { getOpenState } from "@/lib/hours";
import { useMounted } from "@/lib/useMounted";

export default function LocationCard({ location }: { location: Location }) {
  // Time-dependent — only compute on the client to avoid hydration mismatch.
  const mounted = useMounted();
  const openState = mounted ? getOpenState(location.hours) : null;

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group relative flex min-h-[clamp(240px,28vw,290px)] flex-col justify-end overflow-hidden rounded-2xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]"
    >
      <Image
        src={location.image}
        alt={location.name}
        fill
        sizes="(min-width: 1024px) 500px, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(34,25,20,0.92)] via-[rgba(34,25,20,0.45)] to-transparent" />

      <div className="relative flex flex-col gap-2 text-white">
        <h3 className="font-[var(--font-cy-grotesk)] text-[clamp(20px,1.8vw,24px)] font-medium leading-tight">
          {location.name}
        </h3>
        <p className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1.1vw,16px)] leading-snug">
          {location.phone}
        </p>
        <p className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1.1vw,16px)] leading-snug">
          {location.address.join(", ")}
        </p>
        <div className="mt-1 flex items-center gap-2" suppressHydrationWarning>
          {openState && (
            <>
              <span className="rounded-full bg-[#d7cbb1] px-2 py-0.5 font-[var(--font-cy-grotesk)] text-[clamp(13px,1vw,16px)] text-[#1e1e1e]">
                {openState.open ? "Open" : "Closed"}
              </span>
              {openState.open && openState.closesAt && (
                <span className="font-[var(--font-cy-grotesk)] text-[clamp(13px,1vw,16px)]">
                  until {openState.closesAt}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
