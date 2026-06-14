import type { Metadata } from "next";
import BlogsExplorer from "@/components/blogs/BlogsExplorer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Read Blogs — JD's Jungle",
  description:
    "Early drops, curated moods, brand culture and the standards behind JD's Jungle.",
};

export default function BlogsPage() {
  return (
    <main className="w-full bg-[#fffff8] text-[#1e1e1e]">
      <section className="mx-auto w-full max-w-[1601px] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        <Reveal direction="up">
          <BlogsExplorer />
        </Reveal>
      </section>
    </main>
  );
}
