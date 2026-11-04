import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = ["/admin/", "/api/", "/*.json$"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
