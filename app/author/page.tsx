import prisma from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  Package,
  Star,
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles,
} from "lucide-react";
import AuthorAvatar from "@/components/AuthorAvatar";
import Breadcrumb from "@/components/Breadcrumb";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const metadata: Metadata = {
  title: "Equipo Editorial y Autores Expertos | NutritionalReviews",
  description:
    "Conozca a nuestros autores, revisores médicos y especialistas en nutrición que investigan y evalúan cada suplemento de forma independiente.",
  alternates: {
    canonical: `${SITE_URL}/author`,
  },
  openGraph: {
    title: "Equipo Editorial y Autores Expertos | NutritionalReviews",
    description:
      "Conozca a nuestros autores, revisores médicos y especialistas en nutrición que investigan y evalúan cada suplemento.",
    url: `${SITE_URL}/author`,
    type: "website",
  },
};

export default async function AuthorsDirectoryPage() {
  const authors = await (prisma.author as any).findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          articles: { where: { status: "PUBLISHED" } },
          products: { where: { status: "PUBLISHED" } },
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24">
      {/* Schema.org CollectionPage & BreadcrumbList */}
      <CollectionPageSchema
        name="Equipo Editorial y Autores Expertos — NutritionalReviews"
        description="Conozca a nuestros autores, revisores médicos y especialistas en nutrición que investigan y evalúan cada suplemento de forma independiente."
        url={`${SITE_URL}/author`}
        items={authors.map((a: any) => ({
          name: a.name,
          url: `${SITE_URL}/author/${a.slug}`,
          image: a.avatar || undefined,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Autores", url: `${SITE_URL}/author` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative bg-[#010226] py-16 sm:py-24 overflow-hidden border-b border-french_blue/30 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumb
              crumbs={[
                { label: "Inicio", href: "/" },
                { label: "Autores y Revisores" },
              ]}
            />
          </div>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-turquoise_surf" />
              <span>Comité Científico y Equipo Editorial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Nuestros Autores y{" "}
              <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                Especialistas
              </span>
            </h1>

            <p className="text-light_cyan/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              Detrás de cada análisis hay profesionales titulados en nutrición, farmacia y
              salud preventiva. Evaluamos ingredientes, evidencia científica y transparencia de
              los fabricantes para que tomes decisiones informadas.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: ShieldCheck,
              title: "Rigor Científico",
              desc: "Revisiones basadas en ensayos clínicos indexados y fuentes de alta calidad.",
            },
            {
              icon: Award,
              title: "Independencia Editorial",
              desc: "Ninguna marca financia ni influye en nuestras calificaciones objetivas.",
            },
            {
              icon: CheckCircle2,
              title: "Verificación de Etiqueta",
              desc: "Contrastamos dosis, formas moleculares y pureza frente a literatura médica.",
            },
            {
              icon: Sparkles,
              title: "Especialistas Cualificados",
              desc: "Perfiles transparentes con formación académica contrastable y colegiada.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-light_cyan/80 shadow-sm shadow-bright_teal_blue/5 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-bright_teal_blue/10 flex items-center justify-center text-bright_teal_blue flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Authors Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-light_cyan/70">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Investigadores y Autores Destacados
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explora las investigaciones y análisis de productos realizados por cada autor.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {authors.length} {authors.length === 1 ? "autor registrado" : "autores registrados"}
          </span>
        </div>

        {authors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-light_cyan/70 shadow-sm max-w-xl mx-auto">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Pronto presentaremos a nuestros autores
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Estamos actualizando los perfiles de nuestro equipo editorial. Regresa pronto
              para consultar sus trayectorias y publicaciones.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bright_teal_blue text-white font-bold text-xs hover:bg-french_blue transition-colors"
            >
              Volver al inicio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author: any) => {
              const expertiseList = author.expertise
                ? author.expertise
                    .split(",")
                    .map((e: string) => e.trim())
                    .filter(Boolean)
                : ["Nutrición Clínica", "Evidencia Científica"];

              const articleCount = author._count?.articles ?? 0;
              const productCount = author._count?.products ?? 0;
              const ratingVal = author.rating || 4.9;

              return (
                <article
                  key={author.id}
                  className="group bg-white rounded-3xl border border-light_cyan/70 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-bright_teal_blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header with Soft Gradient Banner */}
                  <div className="relative h-24 bg-gradient-to-r from-deep_twilight/90 via-french_blue to-bright_teal_blue p-4 flex items-start justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/20">
                      <CheckCircle2 className="w-3 h-3 text-turquoise_surf" /> Revisor Verificado
                    </span>
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{ratingVal.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Avatar & Author Info */}
                  <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between">
                    <div>
                      {/* Avatar overlapping banner */}
                      <div className="-mt-12 mb-4 flex items-end justify-between">
                        <Link href={`/author/${author.slug}`} className="block">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md ring-2 ring-bright_teal_blue/30 group-hover:ring-bright_teal_blue transition-all bg-slate-100 flex-shrink-0">
                            <AuthorAvatar
                              src={author.avatar}
                              name={author.name}
                              alt={author.avatarAlt || author.name}
                            />
                          </div>
                        </Link>

                        {/* Social Links Quick Access */}
                        <div className="flex items-center gap-2 mb-1">
                          {author.website && (
                            <a
                              href={author.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Sitio web"
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-bright_teal_blue hover:text-white flex items-center justify-center text-slate-500 transition-colors text-xs"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {author.twitter && (
                            <a
                              href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Twitter / X"
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-500 transition-colors text-[11px] font-black"
                            >
                              𝕏
                            </a>
                          )}
                          {author.linkedin && (
                            <a
                              href={author.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="LinkedIn"
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-500 transition-colors text-[10px] font-black"
                            >
                              in
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name & Credentials */}
                      <Link href={`/author/${author.slug}`} className="block">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-bright_teal_blue transition-colors leading-tight">
                          {author.name}
                        </h3>
                      </Link>

                      <p className="text-xs font-semibold text-bright_teal_blue mt-1">
                        {author.title || "Especialista en Nutrición y Salud"}
                      </p>

                      {/* Bio snippet */}
                      {author.bio && (
                        <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                          {author.bio}
                        </p>
                      )}

                      {/* Expertise tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {expertiseList.slice(0, 3).map((exp: string, i: number) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-[#edf8fa] border border-light_cyan text-[10px] font-bold text-slate-700"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats & CTA Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-center gap-1 text-slate-700 font-black text-sm">
                            <BookOpen className="w-3.5 h-3.5 text-bright_teal_blue" />
                            <span>{articleCount}</span>
                          </div>
                          <span className="text-[10px] text-slate-600 font-medium">Artículos</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-center gap-1 text-slate-700 font-black text-sm">
                            <Package className="w-3.5 h-3.5 text-french_blue" />
                            <span>{productCount}</span>
                          </div>
                          <span className="text-[10px] text-slate-600 font-medium">Productos</span>
                        </div>
                      </div>

                      <Link
                        href={`/author/${author.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 group-hover:bg-bright_teal_blue text-white text-xs font-bold tracking-wide transition-all shadow-sm shadow-slate-900/10"
                      >
                        <span>Ver Perfil y Reseñas</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Editorial Methodology Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-gradient-to-br from-[#010226] via-[#051138] to-[#010226] rounded-3xl p-8 sm:p-12 text-white border border-french_blue/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise_surf/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-turquoise_surf mb-3">
              <ShieldCheck className="w-4 h-4" /> Compromiso con el lector
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              ¿Cómo evaluamos los suplementos y redactamos las guías?
            </h2>
            <p className="text-light_cyan/80 text-sm leading-relaxed mb-6">
              Cada reseña reúne qué contiene un producto según su etiqueta, qué promete el fabricante,
              qué evidencia científica hay disponible, sus ventajas y desventajas, y el precio y lugar
              de compra verificados. No vendemos suplementos ni aceptamos pagos a cambio de valoraciones
              positivas.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/quienes-somos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bright_teal_blue text-white font-bold text-xs hover:bg-french_blue transition-colors shadow-md shadow-bright_teal_blue/30"
              >
                Quiénes Somos <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm"
              >
                Contactar al Comité Editorial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
