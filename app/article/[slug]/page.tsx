import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Star,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Share2,
  FileText,
  Award,
  Sparkles,
} from "lucide-react";
import prisma from "@/lib/db";
import { wrapTablesInResponsiveDiv, extractFaqsFromHtml } from "@/lib/utils";
import AuthorAvatar from "@/components/AuthorAvatar";
import Breadcrumb from "@/components/Breadcrumb";
import { ArticleDetailSchema, BreadcrumbSchema, FAQSchema } from "@/components/SEOSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

async function getArticle(slug: string) {
  try {
    return await (prisma as any).article.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        featuredImage: true,
        featuredImageAlt: true,
        metaTitle: true,
        metaDescription: true,
        metaKeywords: true,
        publishedAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
            title: true,
            bio: true,
            expertise: true,
            avatar: true,
            avatarAlt: true,
            website: true,
            twitter: true,
            linkedin: true,
            reviewCount: true,
            rating: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Artículo no encontrado | NutritionalReviews" };

  const url = `${SITE_URL}/article/${slug}`;
  const title = article.metaTitle || `${article.title} | NutritionalReviews`;
  const description =
    article.metaDescription ||
    article.excerpt ||
    "Análisis y guía nutricional verificada por nuestro comité editorial y científico.";

  return {
    title,
    description,
    keywords: article.metaKeywords,
    alternates: { canonical: url },
    authors: article.author
      ? [{ name: article.author.name, url: `${SITE_URL}/author/${article.author.slug}` }]
      : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "NutritionalReviews",
      images: article.featuredImage
        ? [
            {
              url: article.featuredImage,
              width: 1200,
              height: 630,
              alt: article.featuredImageAlt || article.title,
            },
          ]
        : [],
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      modifiedTime: new Date(article.updatedAt).toISOString(),
      authors: article.author ? [article.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const author = article.author;
  const wordCount = article.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));
  const faqs = extractFaqsFromHtml(article.content);

  const formattedPublishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const formattedUpdateDate = new Date(article.updatedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const expertiseList = author?.expertise
    ? author.expertise
        .split(",")
        .map((e: string) => e.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#f4f9fb] pb-24 text-slate-800">
      {/* Schema.org Article Detail, Breadcrumbs, and FAQs */}
      <ArticleDetailSchema
        title={article.title}
        description={article.metaDescription || article.excerpt}
        slug={article.slug}
        featuredImage={article.featuredImage}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        wordCount={wordCount}
        author={author}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Guías y Artículos", url: `${SITE_URL}/article` },
          { name: article.title, url: `${SITE_URL}/article/${slug}` },
        ]}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      {/* ── Editorial Header Section ── */}
      <header className="bg-white border-b border-light_cyan/80 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Breadcrumb
              crumbs={[
                { label: "Inicio", href: "/" },
                { label: "Guías y Artículos", href: "/article" },
                { label: article.title },
              ]}
            />
            <Link
              href="/article"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-french_blue hover:text-bright_teal_blue transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Volver a todas las guías</span>
            </Link>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 text-xs">
            <span className="px-3 py-1 rounded-full bg-deep_twilight text-white font-extrabold uppercase tracking-wider text-[11px]">
              Guía Nutricional
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-turquoise_surf/15 text-french_blue border border-turquoise_surf/30 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Revisión Médica Verificada</span>
            </span>
            {formattedPublishDate && (
              <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedPublishDate}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readTime} min de lectura</span>
            </span>
          </div>

          {/* Article Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] max-w-5xl mb-6">
            {article.title}
          </h1>

          {/* Excerpt / Lead Paragraph */}
          {article.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal max-w-4xl mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Byline Author Header */}
          {author && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/author/${author.slug}`}
                className="group flex items-center gap-3.5 hover:opacity-95 transition-opacity"
              >
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-light_cyan flex-shrink-0 bg-slate-100">
                  <AuthorAvatar
                    src={author.avatar}
                    name={author.name}
                    alt={author.avatarAlt || author.name}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 group-hover:text-bright_teal_blue transition-colors">
                      {author.name}
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e8f7fa] text-french_blue border border-turquoise_surf/30">
                      <CheckCircle2 className="w-3 h-3 text-turquoise_surf" /> Verificado
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {author.title || "Especialista en Nutrición y Salud"}
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="hidden sm:inline-block text-slate-400">
                  Actualizado: {formattedUpdateDate}
                </span>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-french_blue hover:text-white text-slate-700 font-bold text-xs transition-colors"
                >
                  <span>Perfil del Autor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Two-Column Content Layout (Wide max-w-7xl) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ── Left Column: Article Body (8 cols) ── */}
          <article className="lg:col-span-8 min-w-0">
            {/* Featured Image */}
            {article.featuredImage && (
              <figure className="mb-8">
                <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full rounded-3xl overflow-hidden shadow-sm border border-light_cyan/80 bg-slate-100">
                  <Image
                    src={article.featuredImage}
                    alt={article.featuredImageAlt || article.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 850px"
                    className="object-cover"
                  />
                </div>
                {article.featuredImageAlt && (
                  <figcaption className="text-xs text-slate-500 mt-2.5 px-2 text-center italic">
                    {article.featuredImageAlt}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Main Content White Card */}
            <div className="bg-white rounded-3xl border border-light_cyan/80 shadow-sm p-6 sm:p-10 lg:p-12 overflow-hidden">
              <div
                className="article-content text-slate-700 leading-relaxed text-base sm:text-lg"
                dangerouslySetInnerHTML={{
                  __html: wrapTablesInResponsiveDiv(article.content),
                }}
              />

              {/* Editorial Scientific Methodology Box */}
              <div className="mt-12 p-6 rounded-2xl bg-[#f4f9fb] border border-light_cyan/80">
                <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-french_blue">
                  <ShieldCheck className="w-4 h-4 text-bright_teal_blue" />
                  <span>Criterio Editorial y Rigor Científico</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En <strong>NutritionalReviews.org</strong> no emitimos consejos médicos
                  personalizados ni garantizamos resultados terapéuticos milagrosos. Nuestros
                  artículos reúnen evidencia científica verificable, dosificaciones contrastadas y
                  análisis de pureza sobre suplementos nutricionales. Si tienes dudas sobre tu salud,
                  consulta a un profesional sanitario cualificado.
                </p>
              </div>

              {/* Author Signature Footer Box */}
              {author && (
                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-light_cyan flex-shrink-0 bg-slate-100">
                      <AuthorAvatar
                        src={author.avatar}
                        name={author.name}
                        alt={author.avatarAlt || author.name}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Investigado y rediseñado por
                      </p>
                      <Link
                        href={`/author/${author.slug}`}
                        className="text-base font-black text-slate-900 hover:text-bright_teal_blue transition-colors block"
                      >
                        {author.name}
                      </Link>
                      <p className="text-xs text-slate-500 font-medium">
                        {author.title || "Especialista en Nutrición"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/author/${author.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep_twilight hover:bg-french_blue text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>Ver más artículos del autor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </article>

          {/* ── Right Column: Sticky Sidebar (4 cols) ── */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Author Profile Card */}
            {author && (
              <div className="bg-white rounded-3xl border border-light_cyan/80 shadow-sm overflow-hidden">
                {/* Header Strip with Solid Brand Color (No Gradients) */}
                <div className="bg-deep_twilight text-white p-5 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider text-turquoise_surf flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-turquoise_surf" /> Revisor Especialista
                    </span>
                    {author.rating && (
                      <div className="flex items-center gap-1 text-white text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{author.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md flex-shrink-0 bg-white/10">
                      <AuthorAvatar
                        src={author.avatar}
                        name={author.name}
                        alt={author.avatarAlt || author.name}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/author/${author.slug}`}
                        className="text-base font-black text-white hover:text-turquoise_surf transition-colors block leading-tight"
                      >
                        {author.name}
                      </Link>
                      <p className="text-xs text-light_cyan/80 font-medium mt-1 leading-snug">
                        {author.title || "Especialista en Nutrición"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  {author.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                      {author.bio}
                    </p>
                  )}

                  {expertiseList.length > 0 && (
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                        Áreas de Conocimiento
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {expertiseList.slice(0, 4).map((exp: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#edf8fa] border border-light_cyan text-[11px] font-bold text-slate-700"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* External links */}
                  <div className="pt-2 flex flex-col gap-2">
                    {author.website && (
                      <a
                        href={author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span>Sitio Web del Autor</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
                      </a>
                    )}

                    <Link
                      href={`/author/${author.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-french_blue hover:bg-bright_teal_blue text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Ver perfil completo del autor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Article Specifications / Metadata Card */}
            <div className="bg-white rounded-3xl border border-light_cyan/80 shadow-sm p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-bright_teal_blue" />
                <span>Detalles de la Publicación</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                  <span>Tiempo de lectura estimado</span>
                  <span className="font-black text-slate-900">{readTime} minutos</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                  <span>Extensión del texto</span>
                  <span className="font-black text-slate-900">
                    {wordCount.toLocaleString()} palabras
                  </span>
                </div>
                {formattedPublishDate && (
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                    <span>Fecha de publicación</span>
                    <span className="font-black text-slate-900">{formattedPublishDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                  <span>Última revisión editorial</span>
                  <span className="font-black text-slate-900">{formattedUpdateDate}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-slate-600">
                  <span>Estado de verificación</span>
                  <span className="font-black text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Revisado
                  </span>
                </div>
              </div>
            </div>

            {/* Share / Navigation Callout */}
            <div className="bg-[#edf8fa] rounded-3xl p-6 border border-light_cyan text-center">
              <BookOpen className="w-8 h-8 text-bright_teal_blue mx-auto mb-3" />
              <h4 className="text-sm font-black text-slate-900 mb-1">
                ¿Buscas más información?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Consulta nuestro catálogo completo de suplementos analizados y comparativas en español.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep_twilight hover:bg-french_blue text-white font-bold text-xs transition-colors w-full shadow-sm"
              >
                <span>Explorar Productos Analizados</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
