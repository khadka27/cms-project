import type { MetadataRoute } from "next";

// Ensure sitemap is dynamically generated so deleted or updated products immediately update
export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

const staticPages = [
  "",
  "/about",
  "/contact",
  "/products",
  "/article",
  "/legal",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
  "/legal/shipping",
  "/legal/cookies",
  "/legal/advertising",
  "/legal/affiliate",
  "/legal/corrections",
  "/legal/disclaimer",
  "/legal/editorial",
  "/legal/external-links",
  "/legal/how-we-review",
];

function getQuantizedDate(intervalDays: number = 5): Date {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);

  const startDate = new Date("2026-01-01T00:00:00Z");
  const diffTime = now.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const currentIntervalStart = Math.floor(diffDays / intervalDays) * intervalDays;

  return new Date(startDate.getTime() + currentIntervalStart * 24 * 60 * 60 * 1000);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultDate = getQuantizedDate(5);

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: defaultDate,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  // Skip database queries if DATABASE_URL is not available (build-time without DB)
  if (!process.env.DATABASE_URL) {
    return staticEntries;
  }

  try {
    const prisma = (await import("@/lib/db")).default;

    // Fetch ONLY published products, published articles, active subcategories, and authors
    const [subcategories, products, articles, authors] = await Promise.all([
      prisma.subcategory.findMany({
        select: { slug: true, updatedAt: true, createdAt: true },
      }),
      prisma.product.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, createdAt: true },
      }),
      (prisma as any).article.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
      (prisma as any).author.findMany({
        select: { slug: true, updatedAt: true, createdAt: true },
      }),
    ]);

    const subcategoryEntries: MetadataRoute.Sitemap = subcategories.map(
      (sub: { slug: string; updatedAt: Date | null; createdAt: Date }) => ({
        url: `${baseUrl}/subcategory/${sub.slug}`,
        lastModified: sub.updatedAt || sub.createdAt || defaultDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    );

    // Only active, published products appear in sitemap (deleted or draft items are excluded)
    const productEntries: MetadataRoute.Sitemap = products.map(
      (prod: { slug: string; updatedAt: Date | null; createdAt: Date }) => ({
        url: `${baseUrl}/${prod.slug}`,
        lastModified: prod.updatedAt || prod.createdAt || defaultDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    );

    const articleEntries: MetadataRoute.Sitemap = articles.map(
      (art: { slug: string; updatedAt: Date; publishedAt: Date | null }) => ({
        url: `${baseUrl}/article/${art.slug}`,
        lastModified: art.updatedAt || art.publishedAt || defaultDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    );

    const authorEntries: MetadataRoute.Sitemap = authors.map(
      (aut: { slug: string; updatedAt: Date | null; createdAt: Date }) => ({
        url: `${baseUrl}/author/${aut.slug}`,
        lastModified: aut.updatedAt || aut.createdAt || defaultDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    );

    return [
      ...staticEntries,
      ...subcategoryEntries,
      ...productEntries,
      ...articleEntries,
      ...authorEntries,
    ];
  } catch (error) {
    console.warn("Database query during sitemap generation failed, falling back to static:", error);
    return staticEntries;
  }
}
