import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * robots.txt served at /robots.txt. Allows crawling of public content while
 * keeping the API and placeholder routes out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/shop", "/explore", "/signup", "/events"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
