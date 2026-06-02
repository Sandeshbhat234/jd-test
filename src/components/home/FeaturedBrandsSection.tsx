import Image from "next/image";
import { Fragment } from "react";
import Carousel from "@/components/ui/Carousel";

type Brand = { name: string; image: string };

const BRANDS: Brand[] = [
  { name: "Grön", image: "/home/Logos/gron_1_5x.webp" },
  { name: "PAX", image: "/home/Logos/pax_1_5x.webp" },
  { name: "Fernway", image: "/home/Logos/fernway_1_5x.webp" },
  { name: "Jeeter", image: "/home/Logos/jeeter_1_5x.webp" },
  { name: "Ayrloom", image: "/home/Logos/ayrloom_1_5x.webp" },
];

export default function FeaturedBrandsSection() {
  return (
    <Carousel
      title="Featured Brands"
      description="Discover the growers and makers behind your favorite products – all in one place."
    >
      {BRANDS.map((brand, i) => (
        <Fragment key={brand.name}>
          <BrandCard {...brand} />
          {i < BRANDS.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </Carousel>
  );
}

function BrandCard({ name, image }: Brand) {
  return (
    <div className="relative flex h-[100px] w-[clamp(180px,18vw,295px)] shrink-0 snap-start items-center justify-center">
      <Image
        src={image}
        alt={name}
        width={180}
        height={80}
        sizes="(max-width: 768px) 40vw, 180px"
        className="h-auto max-h-[80px] w-auto max-w-[80%] select-none object-contain"
      />
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      className="h-[70px] w-px shrink-0 self-center bg-black/15"
    />
  );
}
