import Image from "next/image";
import type { ReactNode } from "react";

export interface BannerProps {
  message: string;
  separator?: ReactNode;
  /** Marquee loop duration; lower = faster. */
  durationSec?: number;
  /** How many copies to render in each track. The track is duplicated for a seamless loop. */
  repeat?: number;
  className?: string;
}

const DefaultSeparator = (
  <Image
    src="/home/Icons/banner-separator.svg"
    alt=""
    width={20}
    height={20}
    className="size-5 select-none shrink-0"
  />
);

function Track({
  message,
  separator,
  repeat,
  ariaHidden = false,
}: {
  message: string;
  separator: ReactNode;
  repeat: number;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <span className="font-cy text-[16px] leading-6 tracking-[0.2px] text-[#1e1e1e] whitespace-nowrap">
            {message}
          </span>
          {separator}
        </div>
      ))}
    </div>
  );
}

export default function Banner({
  message,
  separator = DefaultSeparator,
  durationSec = 28,
  repeat = 6,
  className,
}: BannerProps) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden border-y border-black bg-[#fffef8] py-4",
        className ?? "",
      ].join(" ")}
    >
      {/* Announce the promo once to assistive tech; the repeated visible copies
          below are hidden from the accessibility tree to avoid duplicate reads.
          ("marquee" is not a valid ARIA role, so it isn't used here.) */}
      <span className="sr-only">{message}</span>
      <div
        aria-hidden
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        <Track message={message} separator={separator} repeat={repeat} />
        <Track message={message} separator={separator} repeat={repeat} ariaHidden />
      </div>
    </div>
  );
}
