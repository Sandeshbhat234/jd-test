import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import { LOCATIONS } from "@/data/locations";

/**
 * XML sitemap served at /sitemap.xml. Lists the public content routes plus the
 * statically-generated blog articles and location pages. Placeholder routes
 * (/shop, /signup, …) are intentionally excluded — they redirect to
 * /coming-soon until the storefront ships.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/blogs",
    "/contact",
    "/guide",
    "/locations",
    "/loyalty",
    "/privacy",
    "/cookie-policy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${SITE_URL}/blogs/${article.slug}`,
    lastModified: now,
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...blogEntries, ...locationEntries];
}
