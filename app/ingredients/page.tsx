import prisma from "@/lib/db";
import type { Metadata } from "next";
import {
  FlaskConical,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Microscope,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import IngredientsDirectoryClient, {
  type IngredientItem,
} from "@/components/IngredientsDirectoryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const metadata: Metadata = {
  title: "Directorio Científico de Ingredientes y Principios Activos | NutritionalReviews",
  description:
    "Guía científica de ingredientes, extractos botánicos y nutrientes activos utilizados en suplementos dietéticos. Conozca su evidencia clínica, dosificación y perfil de seguridad.",
  alternates: {
    canonical: `${SITE_URL}/ingredients`,
  },
  openGraph: {
    title: "Directorio Científico de Ingredientes y Principios Activos | NutritionalReviews",
    description:
      "Guía científica de ingredientes y principios activos evaluados en seguridad, eficacia y pureza.",
    url: `${SITE_URL}/ingredients`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Directorio Científico de Ingredientes | NutritionalReviews",
    description:
      "Evidencia clínica, beneficios y dosificación de ingredientes en suplementos.",
  },
};

export default async function IngredientsPage() {
  const rawIngredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          products: {
            where: { status: "PUBLISHED" },
          },
        },
      },
    },
  });

  const ingredients: IngredientItem[] = rawIngredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    slug: ing.slug,
    description: ing.description,
    keyFeatures: ing.keyFeatures,
    image: ing.image,
    imageAlt: ing.imageAlt,
    productCount: ing._count.products,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24">
      {/* Schema.org Structured Data */}
      <CollectionPageSchema
        name="Directorio Científico de Ingredientes y Principios Activos — NutritionalReviews"
        description="Guía científica de ingredientes, extractos botánicos y nutrientes activos utilizados en suplementos dietéticos. Conozca su evidencia clínica, dosificación y perfil de seguridad."
        url={`${SITE_URL}/ingredients`}
        items={ingredients.map((ing) => ({
          name: ing.name,
          url: `${SITE_URL}/ingredients/${ing.slug}`,
          image: ing.image || undefined,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Ingredientes", url: `${SITE_URL}/ingredients` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative bg-[#010226] py-16 sm:py-24 overflow-hidden border-b border-french_blue/30 text-white">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-1.5 text-xs text-light_cyan/70 font-medium">
              <a href="/" className="hover:text-white transition-colors">
                Inicio
              </a>
              <span>/</span>
              <span className="text-white font-bold">Ingredientes</span>
            </nav>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-bright_teal_blue/40 text-xs font-black tracking-widest text-light_cyan uppercase shadow-sm">
              <FlaskConical className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Base de Datos Científica</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Directorio Científico de{" "}
              <span className="bg-gradient-to-r from-light_cyan via-white to-frosted_blue bg-clip-text text-transparent">
                Ingredientes y Principios Activos
              </span>
            </h1>

            <p className="text-sm sm:text-base text-light_cyan/90 leading-relaxed font-normal">
              Consulte la evidencia clínica, dosificación de referencia, estándares de pureza y mecanismos
              fisiológicos de los principales compuestos botánicos, vitaminas, minerales y extractos presentes en
              suplementos dietéticos.
            </p>

            {/* Editorial Standard Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-light_cyan/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bright_teal_blue shrink-0" />
                <span>Ensayos Clínicos</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-bright_teal_blue shrink-0" />
                <span>Pureza y Potencia</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bright_teal_blue shrink-0" />
                <span>Seguridad Toxicológica</span>
              </div>
              <div className="flex items-center gap-2">
                <Microscope className="w-4 h-4 text-bright_teal_blue shrink-0" />
                <span>Revisión Científica</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <IngredientsDirectoryClient initialIngredients={ingredients} />
      </div>
    </main>
  );
}

