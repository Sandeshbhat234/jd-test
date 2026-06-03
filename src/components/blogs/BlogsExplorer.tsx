"use client";

import { useMemo, useState } from "react";
import { ALL_POSTS } from "@/data/blogs";
import { matchesAny } from "@/lib/search";
import BlogFilterBar from "./BlogFilterBar";
import FeaturedBlogCard from "./FeaturedBlogCard";
import BlogListItem from "./BlogListItem";

export default function BlogsExplorer() {
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_POSTS.filter((post) => {
      const matchesCategory = selected === "All" || post.category === selected;
      return (
        matchesCategory &&
        matchesAny(query, [post.title, post.excerpt, post.category])
      );
    });
  }, [selected, query]);

  const featured = filtered.slice(0, 3);
  const list = filtered.slice(3);

  return (
    <div className="flex flex-col gap-[clamp(40px,6vw,64px)]">
      {/* Header: title + filters */}
      <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
        <h1 className="font-serif text-[clamp(34px,5vw,56px)] leading-tight text-[rgba(1,1,1,0.8)]">
          Read Blogs
        </h1>
        <BlogFilterBar
          selected={selected}
          onSelect={setSelected}
          query={query}
          onQueryChange={setQuery}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center font-[var(--font-cy-grotesk)] text-[clamp(15px,1.5vw,20px)] text-[rgba(30,30,30,0.6)]">
          No articles found. Try a different category or search term.
        </p>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <FeaturedBlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {list.length > 0 && (
            <div className="flex flex-col gap-[clamp(40px,5vw,64px)]">
              {list.map((post, i) => (
                <BlogListItem key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
