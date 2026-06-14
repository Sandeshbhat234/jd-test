import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, getArticle } from "@/data/blog-articles";
import { getPost } from "@/data/blogs";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import BlogListItem from "@/components/blogs/BlogListItem";
import BlogHero from "@/components/blogs/article/BlogHero";
import ArticleBody from "@/components/blogs/article/ArticleBody";
import BlogFaqList from "@/components/blogs/article/BlogFaqList";
import BlogContents, {
  type TocItem,
} from "@/components/blogs/article/BlogContents";
import ShareButton from "@/components/blogs/article/ShareButton";
import ReadingProgress from "@/components/blogs/article/ReadingProgress";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Blog — JD's Jungle" };
  return {
    title: `${article.title} — JD's Jungle`,
    description: article.takeaway,
  };
}

const bodyText =
  "font-cy text-[clamp(16px,1.5vw,22px)] leading-[1.6] tracking-[0.4px] text-[#1e1e1e]";

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc: TocItem[] = [
    ...article.blocks.flatMap((b) =>
      b.kind === "heading" ? [{ id: b.id, label: b.toc }] : [],
    ),
    { id: "faqs", label: "FAQs" },
  ];

  const related = article.relatedSlugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="w-full overflow-x-clip bg-[#fffef8] text-[#1e1e1e]">
      <section className="mx-auto flex w-full max-w-[1601px] flex-col gap-[clamp(56px,8vw,128px)] px-[clamp(24px,5vw,80px)] pb-[clamp(64px,8vw,100px)] pt-[clamp(120px,16vw,160px)]">
        <Reveal direction="up">
          <BlogHero
            title={article.title}
            category={article.category}
            number={article.number}
            readTime={article.readTime}
            date={article.date}
            image={article.hero.src}
            imageAlt={article.hero.alt}
          />
        </Reveal>

        {/* Body + sidebar */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-[clamp(40px,5vw,80px)]">
          {/* Article */}
          <Reveal direction="up">
            <div
              id="article-body"
              className="flex flex-col gap-[clamp(40px,5vw,64px)]"
            >
            <div className="flex flex-col gap-[clamp(20px,2.5vw,28px)]">
              <p className="font-cy text-[clamp(17px,1.7vw,24px)] leading-[1.6] tracking-[0.4px] text-[#1e1e1e]">
                {article.lead}
              </p>

              <div className="rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.35)] p-[clamp(20px,2vw,28px)]">
                <p className="mb-2 font-cy text-[clamp(13px,1vw,15px)] font-medium uppercase tracking-[1px] text-[#0c1e46]">
                  TL;DR
                </p>
                <p className={bodyText}>{article.takeaway}</p>
              </div>

              <div className="border-l-2 border-[#0c1e46] pl-[clamp(16px,1.6vw,24px)]">
                <p className={bodyText}>{article.keyAnswer}</p>
              </div>
            </div>

            <ArticleBody blocks={article.blocks} />

            {/* FAQs */}
            <div className="flex flex-col gap-[clamp(16px,1.6vw,24px)]">
              <h2
                id="faqs"
                className="scroll-mt-28 font-serif text-[clamp(24px,3vw,36px)] leading-tight text-[#1e1e1e]"
              >
                FAQs
              </h2>
              <BlogFaqList faqs={article.faqs} />
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-[#1e1e1e] bg-[rgba(234,233,228,0.35)] p-[clamp(24px,3vw,40px)]">
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] leading-tight text-[#1e1e1e]">
                {article.cta.heading}
              </h2>
              <p className={bodyText}>{article.cta.text}</p>
              <Button href={article.cta.href} size="sm">
                {article.cta.label}
              </Button>
            </div>

            {/* References */}
            {article.references.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-black/15 pt-[clamp(20px,2vw,28px)]">
                <h2 className="text-[clamp(15px,1.1vw,18px)] font-medium uppercase tracking-[1px] text-[#1e1e1e]">
                  References
                </h2>
                <ol className="flex flex-col gap-2">
                  {article.references.map((ref) => (
                    <li
                      key={ref.href}
                      className="font-cy text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[rgba(30,30,30,0.7)]"
                    >
                      {ref.text}{" "}
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words underline underline-offset-2 transition-opacity hover:opacity-70"
                      >
                        {ref.href}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            </div>
          </Reveal>

          {/* Sidebar — desktop only; on smaller screens the article reads
              full-width and the in-hero Share button is used instead. */}
          <aside className="hidden lg:sticky lg:top-28 lg:flex lg:flex-col lg:gap-8">
            <BlogContents items={toc} />
            <ShareButton className="px-0 hover:bg-transparent" />
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <Reveal direction="up" className="flex flex-col gap-[clamp(36px,4vw,64px)]">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h2 className="font-serif text-[clamp(30px,4vw,48px)] leading-tight text-[#1e1e1e]">
                Related Blogs
              </h2>
              <Button href="/blogs" size="sm">
                View all blogs
              </Button>
            </div>
            <div className="flex flex-col gap-[clamp(40px,5vw,64px)]">
              {related.map((post, i) => (
                <BlogListItem key={post.slug} post={post} index={i} />
              ))}
            </div>
          </Reveal>
        )}

        <p className="text-center font-cy text-[clamp(13px,1.1vw,16px)] text-[rgba(30,30,30,0.55)]">
          <Link href="/blogs" className="underline underline-offset-2 hover:opacity-70">
            ← Back to all blogs
          </Link>
        </p>
      </section>

      {/* Mobile-only reading-progress badge (desktop uses the sidebar). */}
      <ReadingProgress />
    </main>
  );
}
