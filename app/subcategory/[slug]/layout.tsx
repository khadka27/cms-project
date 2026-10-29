import type { Metadata } from "next";
import prisma from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const sub = await prisma.subcategory.findFirst({
      where: { slug },
      select: { name: true, description: true },
    });
    if (sub) {
      return {
        title: `${sub.name} - Análisis y Suplementos | NutritionalReviews`,
        description:
          sub.description ||
          `Descubra comparativas y análisis detallados de productos en la categoría ${sub.name}.`,
        alternates: {
          canonical: `https://nutritionalreviews.org/subcategory/${slug}`,
        },
      };
    }
  } catch {}
  return {
    title: "Categoría de Suplementos | NutritionalReviews",
    alternates: {
      canonical: `https://nutritionalreviews.org/subcategory/${slug}`,
    },
  };
}

export default function SubcategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

