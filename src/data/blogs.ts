/**
 * Blog content for the /blogs page.
 *
 * Everything the page renders lives here — to swap in real content, edit the
 * values below (and drop replacement images into `public/blogs/`, keeping the
 * same path you set in `image`). No page/component changes required.
 */

export type BlogCategory =
  | "JD's Jungle"
  | "Brand Culture"
  | "Standards"
  | "Curated Moods"
  | "Legal Rules";

export interface BlogPost {
  /** Used for the post URL: /blogs/<slug> */
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** e.g. "5 min read" */
  readTime: string;
  /** Pre-formatted display date, e.g. "May 12, 2026" */
  date: string;
  /** Path under /public, e.g. "/blogs/expert-curation.webp" */
  image: string;
  /** Darken the image with an overlay (used in the design for some cards). */
  darken?: boolean;
}

/**
 * Order the category chips appear in the filter bar. "All" is always first;
 * the rest follow this list. Post counts are computed from the data below,
 * so they always stay in sync — see `BLOG_CATEGORIES`.
 */
export const BLOG_CATEGORY_ORDER: BlogCategory[] = [
  "JD's Jungle",
  "Brand Culture",
  "Standards",
  "Curated Moods",
  "Legal Rules",
];

/** The three highlighted posts shown as cards at the top. */
export const FEATURED_POSTS: BlogPost[] = [
  {
    slug: "expert-curation-made-simple",
    title: "Expert curation made simple",
    excerpt:
      "How we build community and define modern excellence behind the scenes.",
    category: "Brand Culture",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/expert-curation.webp",
    darken: true,
  },
  {
    slug: "pure-quality-zero-confusion",
    title: "Pure quality zero confusion",
    excerpt: "Our strict process to ensure you always get top-quality products.",
    category: "Standards",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/pure-quality.webp",
    darken: true,
  },
  {
    slug: "pure-quality-vapor-selections",
    title: "Pure Quality Vapor Selections",
    excerpt:
      "Expertly vetted vape selections engineered for absolute quality and consistency.",
    category: "Legal Rules",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/vapor-selections.webp",
  },
];

/**
 * The remaining posts shown as a vertical list below the featured cards.
 * (When a filter or search is active, featured/list are derived from the
 * combined `ALL_POSTS` pool instead — see `BlogsExplorer`.)
 */
export const LIST_POSTS: BlogPost[] = [
  {
    slug: "beyond-the-everyday-horizon",
    title: "Beyond The Everyday Horizon",
    excerpt:
      "Explore curated botanical blends crafted to expand your evening routine.",
    category: "JD's Jungle",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/everyday-horizon.webp",
    darken: true,
  },
  {
    slug: "beyond-the-fruit-profile",
    title: "Beyond the Fruit Profile",
    excerpt:
      "Discover how curated taste combinations seamlessly elevate your modern lifestyle.",
    category: "Curated Moods",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/fruit-profile.webp",
  },
  {
    slug: "staying-within-the-rules",
    title: "Staying Within The Rules",
    excerpt:
      "Clear and straightforward age limits and regional guidelines made simple.",
    category: "Legal Rules",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/within-the-rules.webp",
  },
  {
    slug: "the-evening-drop-routine",
    title: "The Evening Drop Routine",
    excerpt:
      "Handpicked liquid selections curated perfectly to match your evening schedule.",
    category: "JD's Jungle",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/evening-drop.webp",
    darken: true,
  },
  {
    slug: "inside-the-new-showroom",
    title: "Inside The New Showroom",
    excerpt:
      "Discover how our physical storefront elevates your modern lifestyle daily.",
    category: "JD's Jungle",
    readTime: "5 min read",
    date: "May 12, 2026",
    image: "/blogs/new-showroom.webp",
  },
];

/** All posts, in display order — used for filtering and search. */
export const ALL_POSTS: BlogPost[] = [...FEATURED_POSTS, ...LIST_POSTS];

/**
 * Category chips for the filter bar, with counts derived from `ALL_POSTS`.
 * "All" counts every post; each category counts its own. Add/remove posts
 * and these numbers update automatically.
 */
export const BLOG_CATEGORIES: { label: BlogCategory | "All"; count: number }[] = [
  { label: "All", count: ALL_POSTS.length },
  ...BLOG_CATEGORY_ORDER.map((label) => ({
    label,
    count: ALL_POSTS.filter((post) => post.category === label).length,
  })),
];
