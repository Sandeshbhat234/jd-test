import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      aria-label="Navigate The Highs"
      className="relative w-full min-h-[100svh] overflow-hidden"
    >
      <Image
        src="/home/home.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="select-none object-cover object-bottom"
      />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col items-center justify-center px-[clamp(24px,4vw,58px)] py-[clamp(48px,5vw,72px)] text-center">
        <div className="flex flex-col items-center gap-[clamp(24px,2.5vw,36px)] pt-[clamp(40px,6vw,91px)]">
          <div className="flex flex-col items-center gap-4">
            <h1
              className="font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-[#e8e8e8]/80 to-[#d1d1d1]/80 text-[clamp(2.75rem,9vw,124px)] leading-[1.05] tracking-tight [text-shadow:3px_6px_7.3px_rgba(0,0,0,0.15)]"
            >
              Navigate The Highs
            </h1>
            <p
              className="font-cy text-white/70 text-[clamp(1rem,2.4vw,36px)] leading-[1.33] [text-shadow:3px_6px_12.8px_rgba(0,0,0,0.2)]"
            >
              Premium cannabis for every moment
            </p>
          </div>

          <Button href="/shop" variant="primary">
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
