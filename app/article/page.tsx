import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ArrowRight, User, CheckCircle2, Sparkles } from "lucide-react";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Guías y Artículos | NutritionalReviews",
  description: "Lea nuestras últimas guías, consejos de salud y análisis de productos.",
  alternates: {
    canonical: "https://nutritionalreviews.org/article",
  },
};

export default async function ArticlesIndexPage() {
  const allArticles = await (prisma.article as any).findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      featuredImage: true,
      featuredImageAlt: true,
      publishedAt: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          slug: true,
          avatar: true,
          title: true,
        },
      },
    },
    orderBy: [
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  const heroArticle = allArticles[0] ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6]">
      {/* Schema.org CollectionPage & BreadcrumbList */}
      <CollectionPageSchema
        name="Guías y Artículos de Salud y Nutrición"
        description="Consejos de expertos, análisis profundos y guías completas para ayudarle a tomar las mejores decisiones sobre su bienestar."
        url={`${SITE_URL}/article`}
        items={allArticles.map((a: any) => ({
          name: a.title,
          url: `${SITE_URL}/ingredients/${a.slug}`,
          image: a.featuredImage || undefined,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Guías y Artículos", url: `${SITE_URL}/article` },
        ]}
      />

      {/* ── Redesigned Header: Two-Column Hero with Title/Description on Left & Article Spotlight Card on Right ── */}
      <section className="relative bg-[#010226] py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-french_blue/30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <BookOpen className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Divulgación Médica y Científica</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Guías y <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">Artículos</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Consejos de expertos, análisis profundos y guías completas para ayudarle a tomar
                las mejores decisiones sobre su bienestar.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Comité Médico Verificado</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Evidencia Clínica Indexada</span>
                </span>
              </div>
            </div>

            {/* Right Box: Featured Article Spotlight Card with Circular Image */}
            {heroArticle && (
              <div className="lg:col-span-5">
                <Link
                  href={`/ingredients/${heroArticle.slug}`}
                  className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle inner decorative glow */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                  <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                    {/* Circular Article Image (As requested in sketch) */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-slate-800 ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all">
                      {heroArticle.featuredImage ? (
                        <Image
                          src={heroArticle.featuredImage}
                          alt={heroArticle.featuredImageAlt || heroArticle.title}
                          fill
                          priority
                          sizes="112px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-sky_aqua">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Right text lines */}
                    <div className="flex-1 min-w-0">
                      {/* Line 1: Badge & Date */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                          Artículo Destacado
                        </span>
                        {heroArticle.publishedAt && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                            <Calendar className="w-3 h-3 text-turquoise_surf" />
                            {new Date(heroArticle.publishedAt).toLocaleDateString("es-ES", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      {/* Line 2: Title */}
                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors line-clamp-2 leading-snug">
                        {heroArticle.title}
                      </h2>

                      {/* Line 3: Excerpt */}
                      {heroArticle.excerpt && (
                        <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                          {heroArticle.excerpt}
                        </p>
                      )}

                      {/* Line 4: Action link */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                        <span>Leer artículo</span>
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

      {/* ── Articles Grid ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {allArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-light_cyan/70 shadow-sm">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aún no hay artículos publicados</h2>
              <p className="text-slate-500">Vuelva más tarde para descubrir nuevas guías y contenidos.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-light_cyan/80">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Catálogo de Guías y Monografías
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Análisis clínicos independientes, dosificaciones y seguridad de suplementos
                  </p>
                </div>
                <span className="hidden sm:inline-flex text-xs font-bold px-3.5 py-1.5 rounded-full bg-white border border-light_cyan text-french_blue shadow-xs">
                  {allArticles.length} Guías Publicadas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allArticles.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/ingredients/${article.slug}`}
                    className="group flex flex-col bg-white rounded-3xl border border-light_cyan/70 shadow-sm hover:shadow-xl hover:shadow-bright_teal_blue/10 hover:-translate-y-1 transition-all overflow-hidden h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      {article.featuredImage ? (
                        <Image
                          src={article.featuredImage}
                          alt={article.featuredImageAlt || article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        {article.publishedAt && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-bright_teal_blue" />
                            {new Date(article.publishedAt).toLocaleDateString("es-ES", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-bright_teal_blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {article.author?.avatar ? (
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-light_cyan/60 flex items-center justify-center text-french_blue border-2 border-white shadow-sm">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                          <span className="text-xs font-bold text-slate-700">
                            {article.author?.name || "NutritionalReviews"}
                          </span>
                        </div>

                        <span className="flex items-center gap-1 text-xs font-bold text-bright_teal_blue group-hover:text-french_blue transition-colors">
                          Leer <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
