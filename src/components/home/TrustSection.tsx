import Image from "next/image";

type TrustBadge = {
  icon: string;
  title: string;
  subtitle: string;
};

const BADGES: TrustBadge[] = [
  {
    icon: "/home/Icons/trust-support.svg",
    title: "Expert Support",
    subtitle: "Available 7 days a week.",
  },
  {
    icon: "/home/Icons/trust-delivery.svg",
    title: "Discreet",
    subtitle: "Same-day NYC delivery.",
  },
  {
    icon: "/home/Icons/trust-lab.svg",
    title: "Lab-Tested",
    subtitle: "Every batch, every time.",
  },
];

export default function TrustSection() {
  return (
    <section
      aria-label="Why shop with JD's Jungle"
      className="relative flex h-svh w-full items-center justify-center overflow-hidden px-[clamp(24px,8vw,200px)] py-[clamp(32px,4vw,56px)] text-white md:h-auto md:aspect-2642/1553">
      {/* Full-cover skyline — anchored to the top so any crop falls at the bottom. */}
      <Image
        src="/home/trust/skyline.webp"
        alt=""
        fill
        sizes="100vw"
        className="select-none object-cover object-top"
      />
      {/* Neutral scrim to keep the white text legible over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45"
      />

      <div className="relative z-10 flex mt-auto w-full max-w-[1361px] flex-col items-center gap-[clamp(16px,2.2vw,28px)]">
        <h2 className="text-center font-serif font-light text-[clamp(22px,3.2vw,44px)] leading-[1.3] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
          Get the right product, fast and safe – with expert help when you need
          it.
        </h2>

        <ul className="flex w-full flex-col items-stretch gap-[clamp(12px,2vw,28px)] md:flex-row md:items-center md:justify-center">
          {BADGES.map((badge) => (
            <li
              key={badge.title}
              className="flex flex-1 items-center justify-center gap-[clamp(12px,1.8vw,28px)] rounded-[10px]  bg-white/15 p-[clamp(12px,1.4vw,18px)] backdrop-blur-2xl">
              <Image
                src={badge.icon}
                alt=""
                width={65}
                height={65}
                className="size-[clamp(32px,3.5vw,52px)] shrink-0 select-none"
              />
              <div className="flex flex-col items-start font-cy text-white">
                <span className="text-[clamp(15px,1.4vw,22px)] uppercase leading-[1.4]">
                  {badge.title}
                </span>
                <span className="text-[clamp(12px,1.1vw,18px)] text-white/90 leading-[1.4]">
                  {badge.subtitle}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
