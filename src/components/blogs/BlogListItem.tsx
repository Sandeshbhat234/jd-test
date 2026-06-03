import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";
import ArrowButton from "./ArrowButton";

const metaText =
  "font-[var(--font-cy-grotesk)] text-[clamp(13px,1vw,16px)] leading-tight tracking-[0.4px] text-[#1e1e1e]";

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3">
      <span className={metaText}>{post.readTime}</span>
      <span className="size-[5px] shrink-0 rounded-full bg-[#1e1e1e]" />
      <span className={metaText}>{post.date}</span>
    </div>
  );
}

export default function BlogListItem({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  const number = `/${String(index + 1).padStart(2, "0")}`;

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col gap-6 border-t border-black/15 pt-8 focus-visible:outline-none lg:grid lg:grid-cols-[minmax(140px,176px)_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-9"
    >
      {/* Meta — top on mobile, left column on desktop */}
      <div className="lg:pt-1">
        <Meta post={post} />
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg lg:aspect-auto lg:h-[clamp(240px,22vw,320px)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {post.darken && <div className="absolute inset-0 bg-black/30" />}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-6 lg:h-[clamp(240px,22vw,320px)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <span className="font-[var(--font-cy-grotesk)] text-[clamp(14px,1vw,18px)] font-medium leading-tight text-[#1e1e1e]">
              {number}
            </span>
            <span className="rounded-full border border-[#1e1e1e] bg-[rgba(234,233,228,0.2)] px-4 py-1.5 font-[var(--font-cy-grotesk)] text-[clamp(13px,1vw,15px)] leading-tight text-[rgba(30,30,30,0.5)]">
              {post.category}
            </span>
          </div>
          <h3 className="font-serif text-[clamp(26px,3.2vw,44px)] leading-[1.2] tracking-[1px] text-[#1e1e1e]">
            {post.title}
          </h3>
          <p className="font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,20px)] leading-[1.5] tracking-[0.5px] text-[#1e1e1e]">
            {post.excerpt}
          </p>
        </div>
        <div className="flex justify-end">
          <ArrowButton className="size-[clamp(40px,3.5vw,50px)] group-hover:bg-[#1e1e1e] group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
