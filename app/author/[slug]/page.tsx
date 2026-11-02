import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Star,
  Award,
  BookOpen,
  Package,
  Globe,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import AuthorAvatar from "@/components/AuthorAvatar";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { AuthorProfileSchema, BreadcrumbSchema } from "@/components/SEOSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

async function getAuthor(slug: string) {
  try {
    return await (prisma as any).author.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          orderBy: { createdAt: "desc" },
          take: 12,
        },
        articles: {
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
          take: 12,
        },
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) return { title: "Autor no encontrado | NutritionalReviews" };

  const url = `${SITE_URL}/author/${slug}`;
  const title = `${author.name} — Investigador y Revisor Experto | NutritionalReviews`;
  const description =
    author.bio ||
    `Conozca los análisis, investigaciones y revisiones nutricionales realizadas por ${author.name} en NutritionalReviews.org.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      siteName: "NutritionalReviews",
      images: author.avatar
        ? [{ url: author.avatar, alt: author.avatarAlt || author.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: author.avatar ? [author.avatar] : [],
    },
  };
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  const expertiseList = author.expertise
    ? author.expertise.split(",").map((e: string) => e.trim()).filter(Boolean)
    : ["Nutrición y Suplementos", "Evidencia Científica", "Salud Preventiva"];

  const ratingVal = author.rating || 4.9;
  const reviewCountVal = author.reviewCount || author.products.length + author.articles.length || 24;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-20">
      {/* Structured Data: Person + ProfilePage + Breadcrumbs */}
      <AuthorProfileSchema
        name={author.name}
        slug={author.slug}
        title={author.title}
        bio={author.bio}
        expertise={author.expertise}
        avatar={author.avatar}
        website={author.website}
        twitter={author.twitter}
        linkedin={author.linkedin}
        rating={ratingVal}
        reviewCount={reviewCountVal}
        articleCount={author.articles.length}
        productCount={author.products.length}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Autores", url: `${SITE_URL}/about` },
          { name: author.name, url: `${SITE_URL}/author/${author.slug}` },
        ]}
      />

      {/* Top Banner & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          crumbs={[
            { label: "Inicio", href: "/" },
            { label: "Sobre Nosotros", href: "/about" },
            { label: author.name },
          ]}
        />
      </div>

      {/* Author Hero Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-light_cyan/70 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-french_blue via-bright_teal_blue to-turquoise_surf" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0 ring-1 ring-slate-100 bg-slate-100">
              <AuthorAvatar
                src={author.avatar}
                alt={author.avatarAlt || author.name}
                name={author.name}
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {author.name}
                </h1>
                <div className="inline-flex items-center gap-1 bg-light_cyan/60 px-3 py-1 rounded-full border border-turquoise_surf/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-french_blue" />
                  <span className="text-xs font-bold text-french_blue uppercase tracking-wider">
                    Revisor Experto Verificado
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-bright_teal_blue mb-3">
                {author.title || "Investigador y Especialista en Nutrición"}
              </p>

              {author.bio && (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 max-w-3xl">
                  {author.bio}
                </p>
              )}

              {/* Expertise Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Especialidad:
                </span>
                {expertiseList.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-slate-100 hover:bg-light_cyan/40 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats & Social Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{ratingVal.toFixed(1)} / 5.0</span>
                  <span className="text-slate-400">({reviewCountVal} valoraciones)</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-turquoise_surf" />
                  <span>Criterio editorial imparcial</span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 ml-auto">
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-french_blue transition-colors font-medium text-xs"
                    >
                      <Globe className="w-3.5 h-3.5" /> Web personal
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-sky-500 transition-colors font-medium text-xs"
                    >
                      Twitter / X
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-700 transition-colors font-medium text-xs"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Articles by Author */}
      {author.articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-bright_teal_blue/15 flex items-center justify-center text-bright_teal_blue">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Artículos e Investigaciones de {author.name}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {author.articles.length} artículos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.articles.map((art: any) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                className="group bg-white rounded-2xl border border-light_cyan/70 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
              >
                {art.featuredImage && (
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={art.featuredImage}
                      alt={art.featuredImageAlt || art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {art.publishedAt && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(art.publishedAt).toLocaleDateString("es-ES", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <h3 className="font-bold text-slate-900 group-hover:text-bright_teal_blue transition-colors line-clamp-2 text-base leading-snug mb-2">
                      {art.title}
                    </h3>
                    {art.excerpt && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bright_teal_blue">
                    <span>Leer artículo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section: Products Reviewed by Author */}
      {author.products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-french_blue/15 flex items-center justify-center text-french_blue">
                <Package className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Productos Analizados por {author.name}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {author.products.length} productos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {author.products.map((prod: any) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

