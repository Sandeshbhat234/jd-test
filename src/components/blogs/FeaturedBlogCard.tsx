import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";
import ArrowButton from "./ArrowButton";

const metaText =
  "font-cy text-[clamp(13px,1vw,15px)] leading-tight tracking-[0.4px] text-[#1e1e1e]";

export default function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col gap-8 rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] p-[clamp(20px,2vw,32px)] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0px_6px_18px_0px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1e46]/40"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[5px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {post.darken && <div className="absolute inset-0 bg-black/30" />}
      </div>

      <div className="flex flex-col gap-6">
        {/* Category + meta */}
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] px-4 py-1.5 font-cy text-[clamp(13px,1vw,15px)] leading-tight text-[rgba(30,30,30,0.7)]">
            {post.category}
          </span>
          <div className="flex items-center gap-3">
            <span className={metaText}>{post.readTime}</span>
            <span className="size-[5px] rounded-full bg-[#1e1e1e]" />
            <span className={metaText}>{post.date}</span>
          </div>
        </div>

        <hr className="border-0 border-t border-black/15" />

        {/* Title + excerpt + arrow */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-[clamp(20px,2.2vw,30px)] leading-[1.25] tracking-[0.5px] text-[#1e1e1e]">
            {post.title}
          </h3>
          <div className="flex items-end justify-between gap-4">
            <p className="font-cy text-[clamp(14px,1.4vw,18px)] leading-[1.5] tracking-[0.4px] text-[#1e1e1e]">
              {post.excerpt}
            </p>
            <ArrowButton className="size-[clamp(38px,3.5vw,50px)] group-hover:bg-[#1e1e1e] group-hover:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
