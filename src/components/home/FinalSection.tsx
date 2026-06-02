import Image from "next/image";
import Link from "next/link";

const SECTION_BG = "/home/Final section cards/beginner_s_guide_bg_1_5x.webp";

export default function FinalSection() {
  return (
    <section
      aria-label="Get started"
      className="relative w-full overflow-hidden">
      <Image
        src={SECTION_BG}
        alt=""
        fill
        sizes="100vw"
        className="select-none object-cover object-center"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#1a3a52]/30 via-transparent to-[#1a3a52]/30"
      />

      <div
        className="relative mx-auto flex w-full max-w-[1601px] items-center justify-center py-[clamp(56px,8vw,100px)]"
        style={{ paddingInline: "clamp(24px,4vw,80px)" }}>
        <ul className="flex w-full flex-col items-stretch justify-center gap-[clamp(24px,8vw,124px)] lg:flex-row lg:items-stretch">
          <li className="flex">
            <GlassCard
              title="Read Blogs"
              image="/home/Final section cards/read_blogs_1_5x.webp"
              href="/blogs"
            />
          </li>
          <li className="flex">
            <SolidCard
              title="Beginner's Guide"
              description={`Move past the noise. Understand delivery methods, onset times, and the science of "Start Low, Go Slow" through a clear, no-fluff lens.`}
              image="/home/Final section cards/beginners_guide_1_5x.webp"
              cta="Start Your Journey"
              href="/beginners-guide"
            />
          </li>
          <li className="flex">
            <GlassCard
              title="Dosage Calculator"
              image="/home/Final section cards/dosage_calculator_1_5x.webp"
              href="/dosage-calculator"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

function GlassCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-[clamp(380px,32vw,465px)] w-full flex-col gap-8 rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-[50px] transition-transform duration-300 ease-out hover:-translate-y-1 sm:w-[clamp(280px,28vw,361px)]">
      <div className="relative flex-1 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 361px"
          className="select-none object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="font-serif text-[clamp(24px,2.6vw,36px)] capitalize leading-[1.5] text-white">
        {title}
      </h3>
    </Link>
  );
}

function SolidCard({
  title,
  description,
  image,
  cta,
  href,
}: {
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/90 p-4 backdrop-blur-[14px] transition-transform duration-300 ease-out hover:-translate-y-1 sm:w-[clamp(360px,32vw,457px)]">
      <div className="flex flex-col gap-6">
        <h3 className="font-serif text-[clamp(22px,2.4vw,32px)] capitalize leading-[1.2] text-black">
          {title}
        </h3>
        <p className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.6vw,22px)] leading-[1.5] text-black">
          {description}
        </p>
      </div>

      <div className="relative h-[clamp(160px,16vw,214px)] w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 80vw, 425px"
          className="select-none object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-4">
        <span aria-hidden className="h-px w-full bg-black/15" />
        <div className="flex items-center justify-between">
          <span className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1.4vw,18px)] uppercase leading-[27px] text-black">
            {cta}
          </span>
          <Image
            src="/home/Icons/arrow-right.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 select-none transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
