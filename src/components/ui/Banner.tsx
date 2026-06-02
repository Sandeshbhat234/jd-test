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

export default function Banner({
  message,
  separator = DefaultSeparator,
  durationSec = 28,
  repeat = 6,
  className,
}: BannerProps) {
  const segments = Array.from({ length: repeat });

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {segments.map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <span className="font-[var(--font-cy-grotesk)] text-[16px] leading-6 tracking-[0.2px] text-[#1e1e1e] whitespace-nowrap">
            {message}
          </span>
          {separator}
        </div>
      ))}
    </div>
  );

  return (
    <div
      role="marquee"
      aria-label={message}
      className={[
        "relative w-full overflow-hidden border-y border-black bg-[#fffef8] py-4",
        className ?? "",
      ].join(" ")}
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
