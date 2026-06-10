import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import Button from "@/components/ui/Button";

type Product = {
  name: string;
  price: string;
  image: string;
  href: string;
  tags: string[];
};

const PRODUCTS: Product[] = [
  {
    name: "Blue Ridge Pre Roll - 1g",
    price: "$70",
    image: "/home/products/product_1_1_5x.webp",
    href: "/shop/blue-ridge-pre-roll",
    tags: ["Sativa", "Pre-Roll", "23.12% TAC", "19.85% THC"],
  },
  {
    name: "Verdant Tincture - 1oz",
    price: "$12",
    image: "/home/products/product_2_1_5x.webp",
    href: "/shop/verdant-tincture",
    tags: ["Indica", "Dropper", "THC 300MG", "CBD 20.70MG"],
  },
  {
    name: "Apex Dry Herb Vaporizer",
    price: "$73",
    image: "/home/products/product_3_1_5x.webp",
    href: "/shop/apex-vaporizer",
    tags: ["4.3 inch long", "320-430F", "2100mAh"],
  },
];

export default function BestSellersSection() {
  return (
    <Carousel
      title="Best Sellers"
      description="Only the most trusted, lab-tested names in cannabis – all vetted, all NYC-approved."
      footer={
        <Button href="/shop" variant="secondary">
          View All
        </Button>
      }
    >
      {PRODUCTS.map((p) => (
        <ProductCard key={p.name} {...p} />
      ))}
    </Carousel>
  );
}

function ProductCard({ name, price, image, href, tags }: Product) {
  return (
    <Link
      href={href}
      className="group flex w-[clamp(280px,32vw,510px)] shrink-0 snap-start flex-col gap-8"
    >
      <div className="relative aspect-[510/650] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 80vw, 510px"
          className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 font-serif text-[clamp(22px,2.4vw,36px)] leading-[1.5] text-black">
          <span className="truncate">{name}</span>
          <span className="shrink-0">{price}</span>
        </div>
        <ul className="flex flex-wrap items-start gap-x-4 gap-y-1 font-cy text-[clamp(13px,1vw,16px)] leading-[27px] text-black">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
