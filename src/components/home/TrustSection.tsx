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
      className="relative w-full overflow-hidden bg-[#143952] text-white"
    >
      <div className="relative aspect-[1761/686] w-full">
        <Image
          src="/home/trust/skyline.png"
          alt=""
          fill
          sizes="100vw"
          className="select-none object-cover object-bottom"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-[clamp(24px,3vw,32px)] bg-gradient-to-b from-[#143952] to-[#0a2235] px-[clamp(24px,8vw,200px)] py-[clamp(48px,7vw,80px)]">
        <h2 className="max-w-[1361px] text-center font-serif font-light text-[clamp(28px,4.5vw,60px)] leading-[1.4]">
          Get the right product, fast and safe – with expert help when you need it.
        </h2>

        <ul className="flex w-full max-w-[1361px] flex-col items-stretch gap-[clamp(16px,3vw,42px)] md:flex-row md:items-center md:justify-center">
          {BADGES.map((badge) => (
            <li
              key={badge.title}
              className="flex flex-1 items-center justify-center gap-[clamp(16px,2.5vw,42px)] rounded-[10px] border border-white/15 bg-white/15 p-[clamp(16px,2vw,21px)] backdrop-blur-2xl"
            >
              <Image
                src={badge.icon}
                alt=""
                width={65}
                height={65}
                className="size-[clamp(40px,5vw,65px)] shrink-0 select-none"
              />
              <div className="flex flex-col items-start font-[var(--font-cy-grotesk)] text-white">
                <span className="text-[clamp(18px,2vw,28px)] uppercase leading-[1.4]">
                  {badge.title}
                </span>
                <span className="text-[clamp(14px,1.6vw,24px)] leading-[1.4]">
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
