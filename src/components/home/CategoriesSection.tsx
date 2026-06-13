import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import { shopCategory } from "@/lib/links";

type Category = {
  label: string;
  image: string;
  href: string;
};

const CATEGORIES: Category[] = [
  { label: "Flower", image: "/home/Categories/flower_1_5x.webp", href: shopCategory("flower") },
  { label: "Pre-Rolls", image: "/home/Categories/pre_rolls_1_5x.webp", href: shopCategory("pre-rolls") },
  { label: "Vapes", image: "/home/Categories/vapes_1_5x.webp", href: shopCategory("vapes") },
  { label: "Edibles", image: "/home/Categories/edibles_1_5x.webp", href: shopCategory("edibles") },
  { label: "Concentrate", image: "/home/Categories/extracts_1_5x.webp", href: shopCategory("concentrate") },
  { label: "Tinctures", image: "/home/Categories/tinctures_1_5x.webp", href: shopCategory("tinctures") },
  { label: "Oil", image: "/home/Categories/oil.webp", href: shopCategory("oil") },
  { label: "Topicals", image: "/home/Categories/topicals_1_5x.webp", href: shopCategory("topicals") },
  { label: "Accessories", image: "/home/Categories/accessories.webp", href: shopCategory("accessories") },
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
      className="group flex w-[clamp(220px,22vw,303px)] shrink-0 snap-start flex-col items-center gap-2 rounded-[20px] border border-transparent bg-white p-2 transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:border-[#160581] hover:bg-[#0c1e46] hover:shadow-[0px_6.645px_12px_rgba(0,0,0,0.2)]"
    >
      <div className="relative aspect-[363/392] w-full overflow-hidden rounded-[19px] border-2 border-transparent transition-colors duration-300 ease-out group-hover:border-white">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 60vw, 303px"
          className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 py-2">
        <span className="font-cy text-[clamp(20px,2.2vw,36px)] uppercase leading-tight text-black transition-colors duration-300 ease-out group-hover:text-white">
          {label}
        </span>
      </div>
    </Link>
  );
}
