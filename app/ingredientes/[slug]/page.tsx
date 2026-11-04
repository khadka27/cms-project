import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `${SITE_URL}/ingredients/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function IngredientesSlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/ingredients/${slug}`);
}
