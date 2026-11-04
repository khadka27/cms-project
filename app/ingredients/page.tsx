import prisma from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FlaskConical,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Microscope,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
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

  const featuredIngredient =
    ingredients.find((i) => i.image) || ingredients[0] || null;

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

      {/* Hero Header: Two-Column Hero with Title/Description on Left & Spotlight Card on Right */}
      <section className="relative bg-[#010226] py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-french_blue/30 text-white">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-1.5 text-xs text-light_cyan/70 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Ingredientes</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <FlaskConical className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Base de Datos Científica</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Directorio Científico de{" "}
                <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                  Ingredientes Activos
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Consulte la evidencia clínica, dosificación de referencia, estándares de pureza y mecanismos
                fisiológicos de los principales compuestos botánicos, vitaminas, minerales y extractos presentes en
                suplementos dietéticos.
              </p>

              {/* Editorial Standard Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Ensayos Clínicos Indexados</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Dosis y Pureza Contrastadas</span>
                </span>
              </div>
            </div>

            {/* Right Box: Featured Ingredient Spotlight Card */}
            {featuredIngredient && (
              <div className="lg:col-span-5">
                <Link
                  href={`/ingredients/${featuredIngredient.slug}`}
                  className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                  <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                    {/* Circular Ingredient Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-slate-800 ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all">
                      {featuredIngredient.image ? (
                        <Image
                          src={featuredIngredient.image}
                          alt={featuredIngredient.imageAlt || featuredIngredient.name}
                          fill
                          sizes="112px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-sky_aqua">
                          <FlaskConical className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Right text lines */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                          Monografía Destacada
                        </span>
                        {featuredIngredient.productCount > 0 && (
                          <span className="text-[11px] text-slate-300 font-medium">
                            {featuredIngredient.productCount} productos vinculados
                          </span>
                        )}
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors line-clamp-2 leading-snug">
                        {featuredIngredient.name}
                      </h2>

                      {featuredIngredient.description && (
                        <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                          {featuredIngredient.description}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                        <span>Ver monografía clínica</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
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

