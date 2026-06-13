import Image from "next/image";
import ShareButton from "./ShareButton";

const metaText =
  "font-cy text-[clamp(14px,1.1vw,18px)] leading-tight tracking-[0.5px] text-[#1e1e1e]";

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="size-[clamp(18px,1.5vw,22px)]">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="size-[clamp(18px,1.5vw,22px)]">
      <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 9.75h16.5M8 3.75v3M16 3.75v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BlogHero({
  title,
  category,
  number,
  readTime,
  date,
  image,
  imageAlt,
}: {
  title: string;
  category: string;
  number: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="flex flex-col gap-[clamp(20px,2.5vw,32px)]">
      {/* Meta + share */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[clamp(20px,2.5vw,34px)] text-[#1e1e1e]">
          <span className="flex items-center gap-2">
            <ClockIcon />
            <span className={metaText}>{readTime}</span>
          </span>
          <span className="flex items-center gap-2">
            <CalendarIcon />
            <span className={metaText}>{date}</span>
          </span>
        </div>
        <ShareButton />
      </div>

      {/* Hero image with title overlay */}
      <div className="relative overflow-hidden rounded-[5px] border border-[#1e1e1e]">
        <div className="relative h-[clamp(320px,42vw,567px)] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1601px) 1568px, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[clamp(14px,1.5vw,19px)] p-[clamp(20px,3vw,40px)]">
          <div className="flex items-center justify-between gap-4">
            <span
              className="rounded-full px-4 py-1.5 font-cy text-[clamp(15px,1.1vw,18px)] font-medium leading-none text-white"
              style={{
                backgroundImage:
                  "linear-gradient(179deg,#160581 9%,#04103F 48%,#011F45 86%)",
              }}
            >
              {number}
            </span>
            <span className="rounded-full bg-[rgba(250,250,250,0.66)] px-5 py-2 font-cy text-[clamp(14px,1.1vw,18px)] font-medium leading-none text-black backdrop-blur-sm">
              {category}
            </span>
          </div>
          <hr className="border-0 border-t border-white/40" />
          <h1 className="font-serif text-[clamp(28px,5vw,64px)] leading-[1.15] text-white">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
