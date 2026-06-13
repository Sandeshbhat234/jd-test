import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import { shopFeeling } from "@/lib/links";

type Feeling = {
  label: string;
  image: string;
  icon: string;
  href: string;
};

const FEELINGS: Feeling[] = [
  {
    label: "Energizing",
    image: "/home/Choose your feeling/energizing_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/energizing.svg",
    href: shopFeeling("energizing"),
  },
  {
    label: "Relaxing",
    image: "/home/Choose your feeling/relaxing_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/relaxing.svg",
    href: shopFeeling("relaxing"),
  },
  {
    label: "Creative",
    image: "/home/Choose your feeling/creative_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/creative.svg",
    href: shopFeeling("creative"),
  },
  {
    label: "Sleepy",
    image: "/home/Choose your feeling/sleepy_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/sleepy.svg",
    href: shopFeeling("sleepy"),
  },
  {
    label: "Pain Relief",
    image: "/home/Choose your feeling/pain_relief_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/pain-relief.svg",
    href: shopFeeling("pain-relief"),
  },
  {
    label: "Uplifting",
    image: "/home/Choose your feeling/uplifting_1_5x (1).webp",
    icon: "/home/Choose your feeling/icons/uplifting.svg",
    href: shopFeeling("uplifting"),
  },
];

export default function ChooseYourFeelingSection() {
  return (
    <Carousel
      title="Choose Your Feeling"
      description="Not sure where to start? Begin with the outcome you're after – we'll handle the rest."
    >
      {FEELINGS.map((f) => (
        <FeelingCard key={f.label} {...f} />
      ))}
    </Carousel>
  );
}

function FeelingCard({ label, image, icon, href }: Feeling) {
  return (
    <Link
      href={href}
      className="group relative flex h-[clamp(220px,22vw,300px)] w-[clamp(260px,32vw,512px)] shrink-0 snap-start flex-col items-start justify-end overflow-hidden rounded-2xl p-8 text-white"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 80vw, 512px"
        className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
      />

      <div className="relative z-10 flex flex-col items-start gap-4">
        <Image
          src={icon}
          alt=""
          width={50}
          height={50}
          className="size-[clamp(36px,3vw,50px)] select-none"
        />
        <span className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.5] tracking-[0.2px] text-white">
          {label}
        </span>
      </div>
    </Link>
  );
}
