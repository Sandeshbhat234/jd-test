import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HideFooter from "@/components/HideFooter";

export const metadata: Metadata = {
  title: "Coming Soon — JD's Jungle",
  description:
    "This experience is on its way. In the meantime, explore our hand-selected menu of premium cannabis products.",
};

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      <HideFooter />

      <Image
        src="/coming-soon/coming-soon.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 select-none object-cover object-center"
      />

      <div className="flex w-full max-w-[1237px] flex-col items-center gap-[clamp(20px,3vw,36px)] px-6 py-[clamp(40px,8vh,80px)] text-center">
        <div className="flex flex-col items-center gap-[clamp(10px,1.4vw,16px)]">
          <h1 className="font-serif text-[clamp(44px,9vw,100px)] font-semibold leading-[1.15] text-[#1e1e1e] [text-shadow:3px_6px_7.3px_rgba(0,0,0,0.15)]">
            Coming Soon
          </h1>
          <p className="max-w-[1089px] font-cy text-[clamp(16px,3vw,32px)] leading-[1.5] text-[#1e1e1e]">
            In the meantime, explore our hand-selected menu of premium cannabis
            products.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-[#0c1e46] px-[clamp(24px,3.2vw,40px)] py-[10px] font-cy text-[clamp(15px,1.9vw,26px)] font-medium uppercase leading-[1.27] tracking-wide text-white transition-transform duration-200 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          style={{
            backgroundImage:
              "linear-gradient(178.88deg, #160581 9.14%, #04103F 47.57%, #011F45 85.99%)",
          }}
        >
          Shop Now
        </Link>
      </div>
    </main>
  );
}
