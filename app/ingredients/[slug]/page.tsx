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
  FlaskConical,
  Package,
  Check,
  Zap,
  Info,
} from "lucide-react";
import prisma from "@/lib/db";
import { wrapTablesInResponsiveDiv, extractFaqsFromHtml } from "@/lib/utils";
import AuthorAvatar from "@/components/AuthorAvatar";
import Breadcrumb from "@/components/Breadcrumb";
import {
  ArticleDetailSchema,
  IngredientDetailSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/SEOSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getIngredientAndArticle(slug: string) {
  try {
    // 1. Try finding by Article slug directly
    let article = await (prisma.article as any).findUnique({
      where: { slug },
      include: {
        author: true,
      },
    });

    // 2. Try finding by Ingredient slug directly
    let ingredient = await prisma.ingredient.findUnique({
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

    // 3. If article was not found by slug, but ingredient was found,
    // match article by ingredient name / keywords
    if (!article && ingredient) {
      const keywords = ingredient.name
        .split(/[\s,\(\)]+/)
        .filter((w) => w.length > 3);

      article = await (prisma.article as any).findFirst({
        where: {
          status: "PUBLISHED",
          OR: [
            { slug: { contains: ingredient.slug } },
            { title: { contains: ingredient.name, mode: "insensitive" } },
            ...keywords.map((kw) => ({
              title: { contains: kw, mode: "insensitive" },
            })),
          ],
        },
        include: {
          author: true,
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      });
    }

    // 4. If article was found by slug, but ingredient was not,
    // find matching ingredient to retrieve its products and keyFeatures
    if (article && !ingredient) {
      const words = article.title
        .split(/[\s:,\(\)]+/)
        .filter((w: string) => w.length > 3);

      for (const word of words) {
        const match = await prisma.ingredient.findFirst({
          where: {
            OR: [
              { name: { contains: word, mode: "insensitive" } },
              { slug: { contains: word.toLowerCase() } },
            ],
          },
          include: {
            products: {
              where: { status: "PUBLISHED" },
              include: { subcategory: true },
              orderBy: { createdAt: "desc" },
            },
          },
        });
        if (match) {
          ingredient = match;
          break;
        }
      }
    }

    return { article, ingredient };
  } catch (error) {
    console.error("Error fetching ingredient/article:", error);
    return { article: null, ingredient: null };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article, ingredient } = await getIngredientAndArticle(slug);

  if (!article && !ingredient) {
    return {
      title: "Ingrediente no encontrado | NutritionalReviews",
      description: "El ingrediente o guía solicitada no se encuentra en nuestra base de datos.",
    };
  }

  const url = `${SITE_URL}/ingredients/${slug}`;

  if (article) {
    const title = article.metaTitle || `${article.title} | NutritionalReviews`;
    const description =
      article.metaDescription ||
      article.excerpt ||
      "Análisis científico y guía nutricional verificada por nuestro comité editorial y científico.";

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

  // Fallback to ingredient metadata
  const title = `${ingredient!.name} — Guía Científica y Beneficios | NutritionalReviews`;
  const description =
    ingredient!.description ||
    `Perfil científico de ${ingredient!.name}: evidencia clínica, beneficios y suplementos evaluados.`;

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
      images: ingredient!.image
        ? [{ url: ingredient!.image, alt: ingredient!.imageAlt || ingredient!.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function IngredientOrArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const { article, ingredient } = await getIngredientAndArticle(slug);

  if (!article && !ingredient) {
    notFound();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CASE A: FULL INGREDIENT ARTICLE PRESENT
  // ───────────────────────────────────────────────────────────────────────────
  if (article) {
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

    const products = ingredient?.products || [];

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
            { name: "Ingredientes", url: `${SITE_URL}/ingredients` },
            { name: article.title, url: `${SITE_URL}/ingredients/${slug}` },
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
                  { label: "Ingredientes", href: "/ingredients" },
                  { label: article.title },
                ]}
              />
              <Link
                href="/ingredients"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-french_blue hover:text-bright_teal_blue transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver a todos los ingredientes</span>
              </Link>
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 text-xs">
              <span className="px-3 py-1 rounded-full bg-deep_twilight text-white font-extrabold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <FlaskConical className="w-3 h-3 text-turquoise_surf" />
                Guía de Ingrediente
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

                {/* Products section if ingredient has products */}
                {products.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-100 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-french_blue bg-light_cyan/60 px-2.5 py-1 rounded-md">
                          Suplementos Evaluados
                        </span>
                        <h3 className="text-xl font-black text-slate-900 mt-1">
                          Productos Recomendados con este Ingrediente
                        </h3>
                      </div>
                      <Link
                        href="/products"
                        className="text-xs font-bold text-french_blue hover:text-bright_teal_blue flex items-center gap-1"
                      >
                        <span>Ver catálogo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {products.map((p) => (
                        <div
                          key={p.id}
                          className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex gap-4 items-center hover:bg-white hover:shadow-md transition-all group"
                        >
                          <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-100 p-2">
                            <Image
                              src={p.featuredImage || p.image || "/placeholder-image.png"}
                              alt={p.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-french_blue transition-colors line-clamp-1">
                              {p.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              ${p.price.toFixed(2)}
                            </p>
                            <Link
                              href={`/${p.slug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-french_blue hover:text-bright_teal_blue mt-2"
                            >
                              <span>Leer Análisis</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                          Investigado y redactado por
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
                    <span>Tiempo de lectura</span>
                    <span className="font-black text-slate-900">{readTime} minutos</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                    <span>Extensión</span>
                    <span className="font-black text-slate-900">
                      {wordCount.toLocaleString()} palabras
                    </span>
                  </div>
                  {formattedPublishDate && (
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                      <span>Publicación original</span>
                      <span className="font-black text-slate-900">{formattedPublishDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-slate-600">
                    <span>Última revisión</span>
                    <span className="font-black text-slate-900">{formattedUpdateDate}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-slate-600">
                    <span>Estado científico</span>
                    <span className="font-black text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Revisado
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Back */}
              <div className="bg-[#edf8fa] rounded-3xl p-6 border border-light_cyan text-center space-y-3">
                <FlaskConical className="w-8 h-8 text-bright_teal_blue mx-auto" />
                <h4 className="text-sm font-black text-slate-900">
                  Directorio de Ingredientes
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consulte nuestra base de datos completa de nutrientes, extractos y principios activos analizados.
                </p>
                <Link
                  href="/ingredients"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep_twilight hover:bg-french_blue text-white font-bold text-xs transition-colors w-full shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ver Todos los Ingredientes</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CASE B: INGREDIENT MONOGRAPH (WHEN FULL ARTICLE NOT YET WRITTEN)
  // ───────────────────────────────────────────────────────────────────────────
  const features = ingredient!.keyFeatures
    ? ingredient!.keyFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24 text-slate-800">
      <IngredientDetailSchema
        name={ingredient!.name}
        slug={ingredient!.slug}
        description={ingredient!.description}
        image={ingredient!.image}
        keyFeatures={ingredient!.keyFeatures}
        products={ingredient!.products.map((p) => ({
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
          { name: ingredient!.name, url: `${SITE_URL}/ingredients/${ingredient!.slug}` },
        ]}
      />

      {/* Top Hero Section */}
      <section className="relative bg-[#010226] text-white pt-10 pb-16 sm:pb-24 overflow-hidden border-b border-french_blue/30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-bright_teal_blue/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
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
                {ingredient!.name}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center pt-2">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bright_teal_blue text-white text-[11px] font-black tracking-wider uppercase shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Principio Activo Verificado
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-light_cyan">
                  <FlaskConical className="w-3 h-3 text-turquoise_surf" />
                  Grado Farmacéutico
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {ingredient!.name}
              </h1>

              <p className="text-base sm:text-lg text-light_cyan/90 leading-relaxed font-normal">
                {ingredient!.description ||
                  `Análisis científico de ${ingredient!.name}: propiedades biológicas, mecanismos de absorción y criterios de calidad para evaluar suplementos nutricionales.`}
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#023e8a] to-[#010226] p-6 border-2 border-white/20 shadow-2xl flex flex-col justify-between group">
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-light_cyan">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold text-light_cyan bg-white/10 px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                    Monografía Científica
                  </span>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center my-4">
                  {ingredient!.image ? (
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5">
                      <Image
                        src={ingredient!.image}
                        alt={ingredient!.imageAlt || ingredient!.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-3xl bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-4">
                      <Sparkles className="w-10 h-10 text-turquoise_surf mb-2" />
                      <span className="text-xs font-bold text-white">
                        {ingredient!.name}
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

        {/* Products section */}
        {ingredient!.products.length > 0 && (
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-2 border border-frosted_blue/60">
                <Package className="w-3 h-3 text-french_blue" />
                <span>Formulaciones Analizadas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Suplementos Evaluados que Contienen {ingredient!.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredient!.products.map((product) => (
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
                      <span className="text-lg font-black text-deep_twilight">
                        ${product.price.toFixed(2)}
                      </span>
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
          </section>
        )}

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
