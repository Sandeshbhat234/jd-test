import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The storefront and account areas aren't built yet. Until they ship, route
  // their placeholder links to the Coming Soon page instead of 404ing.
  // `permanent: false` (307) so search engines don't cache these once the real
  // pages go live.
  async redirects() {
    return [
      { source: "/shop", destination: "/coming-soon", permanent: false },
      { source: "/shop/:path*", destination: "/coming-soon", permanent: false },
      { source: "/explore", destination: "/coming-soon", permanent: false },
      { source: "/explore/:path*", destination: "/coming-soon", permanent: false },
      { source: "/signup", destination: "/coming-soon", permanent: false },
      { source: "/events", destination: "/coming-soon", permanent: false },
      { source: "/events/:path*", destination: "/coming-soon", permanent: false },
    ];
  },
};

export default nextConfig;
