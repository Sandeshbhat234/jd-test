import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";

type Category = {
  label: string;
  image: string;
  href: string;
};

const CATEGORIES: Category[] = [
  { label: "Pre-Rolls", image: "/home/Categories/pre_rolls_1_5x.webp", href: "/shop/pre-rolls" },
  { label: "Drinks", image: "/home/Categories/drinks_1_5x.webp", href: "/shop/drinks" },
  { label: "Vapes", image: "/home/Categories/vapes_1_5x.webp", href: "/shop/vapes" },
  { label: "Tinctures", image: "/home/Categories/tinctures_1_5x.webp", href: "/shop/tinctures" },
  { label: "Topicals", image: "/home/Categories/topicals_1_5x.webp", href: "/shop/topicals" },
  { label: "Capsules", image: "/home/Categories/capsules_1_5x.webp", href: "/shop/capsules" },
  { label: "Edibles", image: "/home/Categories/edibles_1_5x.webp", href: "/shop/edibles" },
  { label: "Flower", image: "/home/Categories/flower_1_5x.webp", href: "/shop/flower" },
  { label: "Extracts", image: "/home/Categories/extracts_1_5x.webp", href: "/shop/extracts" },
];

export default function CategoriesSection() {
  return (
    <Carousel
      title="Explore by Category"
      description="Our most-loved strains – trusted by thousands of New Yorkers navigating their perfect high."
    >
      {CATEGORIES.map((cat) => (
        <CategoryCard key={cat.label} {...cat} />
      ))}
    </Carousel>
  );
}

function CategoryCard({ label, image, href }: Category) {
  return (
    <Link
      href={href}
      className="group flex w-[clamp(220px,22vw,303px)] shrink-0 snap-start flex-col items-center gap-2 rounded-[20px] bg-white p-2"
    >
      <div className="relative aspect-[363/392] w-full overflow-hidden rounded-[19px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 60vw, 303px"
          className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 py-2">
        <span className="font-cy text-[clamp(20px,2.2vw,36px)] uppercase leading-tight text-black">
          {label}
        </span>
      </div>
    </Link>
  );
}
