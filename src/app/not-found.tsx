import Image from "next/image";
import HideFooter from "@/components/HideFooter";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      <HideFooter />

      <Image
        src="/404/404.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 select-none object-cover object-center"
      />

      <Reveal
        direction="up"
        className="flex w-full max-w-[1237px] flex-col items-center gap-[clamp(4px,0.8vw,10px)] px-6 py-[clamp(40px,8vh,80px)] text-center"
      >
        {/* Decorative oversized status number (heading conveys the meaning) */}
        <span
          aria-hidden
          className="bg-clip-text font-serif text-[clamp(120px,30vw,280px)] font-semibold leading-[1.05] text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(187.64deg, rgba(255,255,255,0.5) 30%, rgba(170,220,233,0.5) 78%, rgba(104,152,222,0.5) 118%, rgba(17,83,142,0.5) 150%)",
            filter: "drop-shadow(0px 4px 17.3px rgba(0,0,0,0.2))",
          }}
        >
          404
        </span>

        <div className="flex flex-col items-center gap-[clamp(20px,3vw,36px)]">
          <div className="flex flex-col items-center gap-[clamp(6px,0.8vw,8px)]">
            <h1 className="font-serif text-[clamp(22px,3.4vw,36px)] font-semibold leading-[1.5] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
              This path doesn&apos;t go anywhere.
            </h1>
            <p className="font-cy text-[clamp(15px,2.2vw,24px)] leading-[1.5] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]">
              We&apos;ll help you find another way.
            </p>
          </div>

          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
