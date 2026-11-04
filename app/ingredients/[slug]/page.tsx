import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Package,
  Star,
  Check,
  Zap,
  Info,
  Clock,
  ExternalLink,
  Layers,
  Award,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  IngredientDetailSchema,
  BreadcrumbSchema,
} from "@/components/SEOSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface IngredientPageProps {
  params: Promise<{ slug: string }>;
}

async function getIngredient(slug: string) {
  try {
    return await prisma.ingredient.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          include: {
            subcategory: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch {
    return null;
  }
}

async function getRelatedArticles(ingredientName: string) {
  try {
    // 1. Try finding articles mentioning this ingredient
    const articles = await (prisma as any).article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: ingredientName, mode: "insensitive" } },
          { excerpt: { contains: ingredientName, mode: "insensitive" } },
          { content: { contains: ingredientName, mode: "insensitive" } },
        ],
      },
      take: 3,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        readTime: true,
      },
    });

    if (articles.length >= 2) return articles;

    // Fallback to latest published articles
    const fallbacks = await (prisma as any).article.findMany({
      where: { status: "PUBLISHED" },
      take: 3,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        readTime: true,
      },
    });

    return fallbacks;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: IngredientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = await getIngredient(slug);

  if (!ingredient) {
    return {
      title: "Ingrediente no encontrado | NutritionalReviews",
      description: "El ingrediente solicitado no se encuentra en nuestra base de datos.",
    };
  }

  const url = `${SITE_URL}/ingredients/${slug}`;
  const title = `${ingredient.name} — Guía Científica, Dosis y Beneficios | NutritionalReviews`;
  const description =
    ingredient.description ||
    `Análisis científico de ${ingredient.name}: evidencia clínica, beneficios comprobados, perfil de seguridad y suplementos analizados que lo contienen.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "NutritionalReviews",
      images: ingredient.image
        ? [{ url: ingredient.image, alt: ingredient.imageAlt || ingredient.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function IngredientDetailPage({ params }: IngredientPageProps) {
  const { slug } = await params;
  const ingredient = await getIngredient(slug);

  if (!ingredient) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(ingredient.name);

  const features = ingredient.keyFeatures
    ? ingredient.keyFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24 text-slate-800">
      {/* Schema.org Structured Data */}
      <IngredientDetailSchema
        name={ingredient.name}
        slug={ingredient.slug}
        description={ingredient.description}
        image={ingredient.image}
        keyFeatures={ingredient.keyFeatures}
        products={ingredient.products.map((p) => ({
          name: p.name,
          url: `${SITE_URL}/${p.slug}`,
          image: p.featuredImage || p.image || undefined,
          price: p.price,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Ingredientes", url: `${SITE_URL}/ingredients` },
          { name: ingredient.name, url: `${SITE_URL}/ingredients/${ingredient.slug}` },
        ]}
      />

      {/* Top Hero Section */}
      <section className="relative bg-[#010226] text-white pt-10 pb-16 sm:pb-24 overflow-hidden border-b border-french_blue/30">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-bright_teal_blue/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs text-light_cyan/70 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/ingredients" className="hover:text-white transition-colors">
                Ingredientes
              </Link>
              <span>/</span>
              <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
                {ingredient.name}
              </span>
            </nav>

            <Link
              href="/ingredients"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-light_cyan hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Todos los Ingredientes</span>
            </Link>
          </div>

          {/* Hero Grid: Left Content + Right Visual Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center pt-2">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bright_teal_blue text-white text-[11px] font-black tracking-wider uppercase shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Principio Activo Verificado
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-light_cyan">
                  <FlaskConical className="w-3 h-3 text-turquoise_surf" />
                  Grado de Suplemento
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {ingredient.name}
              </h1>

              <p className="text-base sm:text-lg text-light_cyan/90 leading-relaxed font-normal">
                {ingredient.description ||
                  `Análisis científico de ${ingredient.name}: propiedades biológicas, mecanismos de absorción y criterios de calidad para evaluar suplementos nutricionales.`}
              </p>

              {/* Metrics Strip */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-light_cyan/70 uppercase tracking-widest block">
                    Evidencia
                  </span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">
                    Ensayos Clínicos
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-light_cyan/70 uppercase tracking-widest block">
                    Pureza
                  </span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">
                    Grado Estandarizado
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-light_cyan/70 uppercase tracking-widest block">
                    Seguridad
                  </span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">
                    Perfil Evaluado
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-light_cyan/70 uppercase tracking-widest block">
                    Fórmulas
                  </span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">
                    {ingredient.products.length}{" "}
                    {ingredient.products.length === 1 ? "Producto" : "Productos"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#023e8a] to-[#010226] p-6 border-2 border-white/20 shadow-2xl flex flex-col justify-between group">
                <div className="absolute top-0 right-0 w-60 h-60 bg-turquoise_surf/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-light_cyan">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold text-light_cyan bg-white/10 px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                    Monografía Científica
                  </span>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center my-4">
                  {ingredient.image ? (
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5">
                      <Image
                        src={ingredient.image}
                        alt={ingredient.imageAlt || ingredient.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-3xl bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-4">
                      <Sparkles className="w-10 h-10 text-turquoise_surf mb-2" />
                      <span className="text-xs font-bold text-white">
                        {ingredient.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 text-center pt-2 border-t border-white/15">
                  <span className="text-xs font-semibold text-light_cyan/90">
                    Criterio de Evaluación Editorial Independiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-14">
        {/* Section 1: Key Features & Scientific Highlights */}
        {features.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-light_cyan/60 flex items-center justify-center text-french_blue">
                <Sparkles className="w-5 h-5 text-bright_teal_blue" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Propiedades y Beneficios Clínicos Destacados
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Puntos clave evaluados en literatura científica y ensayos clínicos indexados
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-bright_teal_blue/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-bright_teal_blue/10 text-bright_teal_blue flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-bright_teal_blue group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {feature}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Products Containing This Ingredient */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-2 border border-frosted_blue/60">
                <Package className="w-3 h-3 text-french_blue" />
                <span>Formulaciones Analizadas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Suplementos Evaluados que Contienen {ingredient.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Reseñas editoriales independientes con etiqueta, dosis, evidencia y precio verificados.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-french_blue hover:text-bright_teal_blue transition-colors px-4 py-2.5 rounded-xl border border-french_blue/20 bg-white hover:bg-slate-50 shadow-xs shrink-0"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {ingredient.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredient.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/80 hover:border-bright_teal_blue/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative w-full h-52 bg-gradient-to-b from-[#f0f9fb] to-[#e6f4f8] p-4 flex items-center justify-center border-b border-slate-100">
                    <Image
                      src={
                        product.featuredImage ||
                        product.image ||
                        "/placeholder-image.png"
                      }
                      alt={product.imageAlt || product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.subcategory && (
                      <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-french_blue border border-light_cyan shadow-xs">
                        {product.subcategory.name}
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-french_blue transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.shortDescription ||
                          "Especificaciones de fórmula, dosis verificadas y comparativa de valor."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                          Precio Verificado
                        </span>
                        <span className="text-lg font-black text-deep_twilight">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <Link
                        href={`/${product.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-xs"
                      >
                        <span>Leer Análisis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-sm space-y-4 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-light_cyan/50 text-french_blue mx-auto flex items-center justify-center">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Próximamente más productos con {ingredient.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Nuestro equipo editorial está evaluando nuevos lotes y formulaciones comerciales que incorporan{" "}
                <strong>{ingredient.name}</strong> para verificar pureza y relación calidad-precio.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-french_blue text-white text-xs font-bold hover:bg-deep_twilight transition-all"
              >
                <span>Explorar Todos los Suplementos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>

        {/* Section 3: Scientific Safety, Tolerability & Editorial Guidance */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-light_cyan/60 flex items-center justify-center text-french_blue">
              <ShieldCheck className="w-5 h-5 text-bright_teal_blue" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Criterios de Seguridad, Dosificación y Buenas Prácticas
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Consideraciones esenciales antes de incorporar este principio activo a su pauta
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-bright_teal_blue" />
                Dosificación de Referencia
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Los rangos eficaces deben contrastarse con los ensayos clínicos de referencia. Evite formulaciones con "mezclas propietarias" que oculten la cantidad exacta del principio activo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-bright_teal_blue" />
                Estandarización y Pureza
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Priorice extractos con porcentaje de principios activos garantizado (ej. extractos estandarizados en HPLC) y análisis microbiológicos por terceros.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-bright_teal_blue" />
                Interacciones y Precauciones
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consulte con un profesional de la salud antes de combinar suplementos si está bajo tratamiento farmacológico, en periodo de gestación o lactancia.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-light_cyan/20 border border-light_cyan/60 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-french_blue shrink-0 mt-0.5" />
            <span>
              <strong>Descargo de Responsabilidad:</strong> La información expuesta en este perfil científico tiene fines exclusivamente informativos y educativos. No constituye asesoramiento médico, diagnóstico ni tratamiento profesional.
            </span>
          </div>
        </section>

        {/* Section 4: Related Articles and Guides */}
        {relatedArticles.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-2 border border-frosted_blue/60">
                  <BookOpen className="w-3 h-3 text-french_blue" />
                  <span>Lecturas Recomendadas</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Guías y Artículos Relacionados
                </h2>
              </div>
              <Link
                href="/article"
                className="text-xs font-bold text-french_blue hover:text-bright_teal_blue transition-colors flex items-center gap-1"
              >
                <span>Ver Todos los Artículos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art: any) => (
                <Link
                  key={art.id}
                  href={`/article/${art.slug}`}
                  className="group bg-white rounded-3xl border border-slate-200/80 hover:border-bright_teal_blue/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={art.featuredImage || "/article-placeholder.png"}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {art.readTime && (
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-bright_teal_blue" />
                        <span>{art.readTime}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-french_blue transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    {art.excerpt && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    )}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-french_blue group-hover:text-bright_teal_blue">
                      <span>Leer Guía</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation Strip */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/ingredients"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-french_blue font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Directorio de Ingredientes</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>Explorar Catálogo Completo de Productos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

