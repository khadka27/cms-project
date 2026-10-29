import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Productos y Reseñas | NutritionalReviews",
  description:
    "Explore nuestro catálogo completo de análisis independientes de suplementos, vitaminas, nutrición y productos de bienestar.",
  alternates: {
    canonical: "https://nutritionalreviews.org/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

