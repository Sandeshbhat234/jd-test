import Image from "next/image";

export interface StatCardProps {
  value: string;
  label: string;
  bgImage: string;
  activeIndex: number;
  total: number;
}

export default function StatCard({
  value,
  label,
  bgImage,
  activeIndex,
  total,
}: StatCardProps) {
  return (
    <div className="relative aspect-[466/418] w-[clamp(220px,22vw,320px)] shrink-0 overflow-hidden rounded-2xl p-4">
      <Image
        src={bgImage}
        alt=""
        fill
        preload
        sizes="(max-width: 768px) 80vw, 320px"
        className="select-none object-cover"
      />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-serif font-normal leading-none text-white text-[clamp(1.5rem,2.4vw,3rem)]">
              {value}
            </span>
            <span className="h-7 w-px bg-white/50" />
            <span className="text-white/95 text-[clamp(0.75rem,1vw,1.25rem)]">
              {label}
            </span>
          </div>
          <div className="flex shrink-0 gap-[3px] pt-2">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`block size-[8px] rounded-[2px] ${
                  i === activeIndex ? "bg-[#d9d9d9]" : "bg-[#393939]"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-white/35" />
      </div>
    </div>
  );
}
