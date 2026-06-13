/**
 * Blog content for the /blogs page.
 *
 * Everything the page renders lives here — to swap in real content, edit the
 * values below (and drop replacement images into `public/blogs/`, keeping the
 * same path you set in `image`). No page/component changes required.
 */

export type BlogCategory =
  | "Wellness"
  | "Formats"
  | "Cannabinoids"
  | "Terpenes";

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
  "Wellness",
  "Formats",
  "Cannabinoids",
  "Terpenes",
];

/** The highlighted posts shown as cards at the top. */
export const FEATURED_POSTS: BlogPost[] = [
  {
    slug: "edibles-for-energy-and-focus",
    title: "The Modern New Yorker's Guide to Edibles for Energy and Focus",
    excerpt:
      "Skip the coffee jitters — how low-dose, targeted edibles keep you sharp and locked into a smooth, productive focus.",
    category: "Wellness",
    readTime: "6 min read",
    date: "May 12, 2026",
    image:
      "/blog/B1-The Modern New Yorker_s Guide to Edibles for Energy and Focus/im0-hero.webp",
  },
  {
    slug: "cannabis-for-sleep-guide",
    title: "A New Yorker's Guide to Using Cannabis for Sleep the Right Way",
    excerpt:
      "Most New Yorkers pick the wrong product. Here's how to make cannabis for sleep a designed ritual, not an afterthought.",
    category: "Wellness",
    readTime: "7 min read",
    date: "May 8, 2026",
    image:
      "/blog/B2-A New Yorker_s Guide to Using Cannabis for Sleep the Right Way/im0-blog_2_1_5x.webp",
  },
  {
    slug: "live-resin-vs-distillate-cart",
    title: "Live Resin vs Distillate: Which One Belongs in Your Evening Ritual",
    excerpt:
      "The real difference isn't strength — it's the experience each one is built for. Choose the right cart for your evening.",
    category: "Formats",
    readTime: "8 min read",
    date: "April 28, 2026",
    image:
      "/blog/B3-Live Resin vs Distillate Which One Belongs in Your Evening Ritual/im0-hero-wmremd.webp",
  },
];

/**
 * The remaining posts shown as a vertical list below the featured cards.
 * (When a filter or search is active, featured/list are derived from the
 * combined `ALL_POSTS` pool instead — see `BlogsExplorer`.)
 */
export const LIST_POSTS: BlogPost[] = [
  {
    slug: "cbd-vs-thc-guide",
    title: "CBD vs THC: What Each Cannabinoid Does and How to Choose What You Need",
    excerpt:
      "THC and CBD work through completely different pathways. Know what each does and use that to choose with clarity.",
    category: "Cannabinoids",
    readTime: "8 min read",
    date: "April 20, 2026",
    image:
      "/blog/B4-CBD vs THC What Each Cannabinoid Does and How to Choose What You Need/im0-hero-wmremd.webp",
  },
  {
    slug: "edibles-vs-smoking",
    title: "Edibles vs. Smoking: How to Choose the Right Format",
    excerpt:
      "One takes five minutes, the other ninety. Compare onset, duration, and control to find your format.",
    category: "Formats",
    readTime: "8 min read",
    date: "April 12, 2026",
    image:
      "/blog/B5-Edibles vs. Smoking_ Which One Is Right for You/im0-hero-wmremd.webp",
  },
  {
    slug: "what-is-cbn-sleep-gummies",
    title: "What Is CBN and Why Does It Keep Showing Up in Sleep Products",
    excerpt:
      "The cannabinoid showing up in every sleep gummy across New York — what it is, what the science says, and what to look for.",
    category: "Cannabinoids",
    readTime: "7 min read",
    date: "April 4, 2026",
    image:
      "/blog/B6-What Is CBN — and Why It Keeps Showing Up in Sleep Products/im0-hero-wmremd.webp",
  },
  {
    slug: "limonene-myrcene-linalool-terpene-effects",
    title: "Limonene, Myrcene, Linalool: What These Terpene Effects Mean",
    excerpt:
      "Stop shopping by THC percentage. These three terpenes predict your experience far better.",
    category: "Terpenes",
    readTime: "9 min read",
    date: "March 27, 2026",
    image:
      "/blog/B7-Limonene, Myrcene, Linalool_ The Three Terpenes Worth Knowing Before You Buy/im0-hero-wmremd.webp",
  },
  {
    slug: "tincture-vs-edible-guide",
    title: "Tinctures vs. Edibles: How to Pick the Right Format for Your Goal",
    excerpt:
      "Tinctures and edibles work differently. Match the format to your timing, tolerance, and goal.",
    category: "Formats",
    readTime: "7 min read",
    date: "March 18, 2026",
    image:
      "/blog/B8-Tincture vs. Edible_ Which One Is Right for What You_re Trying to Do/im0-hero-wmremd.webp",
  },
  {
    slug: "cannabis-for-inflammation-strains-research",
    title: "Cannabis for Inflammation: Strains, Compounds, and What to Look For",
    excerpt:
      "What the research actually shows about cannabis, inflammation, and the compounds and formats that matter.",
    category: "Wellness",
    readTime: "7 min read",
    date: "March 10, 2026",
    image: "/blog/Enchanced images/Blog 9/flower_bud_1_5x.webp",
  },
  {
    slug: "what-is-cbg-cannabinoid-explained",
    title: "CBG Explained: The Minor Cannabinoid That Is Showing Up Everywhere",
    excerpt:
      "CBG is appearing on more labels in New York. Here's what the 'mother cannabinoid' is and what it's good for.",
    category: "Cannabinoids",
    readTime: "7 min read",
    date: "March 2, 2026",
    image:
      "/blog/B10-CBG Explained_ The Minor Cannabinoid That Is Showing Up Everywhere/im0-hero-wmremd.webp",
  },
];

/** All posts, in display order — used for filtering and search. */
export const ALL_POSTS: BlogPost[] = [...FEATURED_POSTS, ...LIST_POSTS];

/** Look up a single card by slug (used to resolve "Related Blogs"). */
export function getPost(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((post) => post.slug === slug);
}

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
