"use client";

import { useEffect, useState, type ReactNode, Key, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryContext } from "@/context/CategoryContext";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroProductShowcase from "@/components/HeroProductShowcase";
import type { Product, Subcategory, HeroSettings, Ingredient } from "@/lib/types";
import {
  ArrowRight,
  LayoutGrid,
  List,
  Star,
  CheckCircle,
  Zap,
  TrendingUp,
  Award,
  ShieldCheck,
  Sparkles,
  Clock,
  ArrowUpRight,
  ShoppingCart,
  Check,
  SlidersHorizontal,
  Flame,
  FileText,
  AlertCircle,
  HeartHandshake,
  BookOpen,
  Stethoscope,
} from "lucide-react";

/* ─── Section Heading Component ─────────────────────────────────────────── */
function SectionHeading({
  label,
  title,
  subtitle,
  action,
}: {
  label: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-3 border border-frosted_blue/60">
          <Sparkles className="w-3.5 h-3.5 text-bright_teal_blue" />
          <span>{label}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

/* ─── Main Home Page Component ─────────────────────────────────────────── */
export default function HomePage() {
  const { activeCategory } = useCategoryContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [heroSettings, setHeroSettings] = useState<HeroSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string>("all");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/products?type=${activeCategory}`).then((r) => r.json()),
      fetch(`/api/subcategories?type=${activeCategory}`).then((r) => r.json()),
      fetch("/api/hero-settings", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/ingredients").then((r) => r.json()),
      fetch("/api/admin/testimonials").then((r) => r.json()),
    ])
      .then(([prodsData, subs, hero, ings, tests]) => {
        const prods = prodsData?.products || [];
        setProducts(Array.isArray(prods) ? prods : []);
        setSubcategories(Array.isArray(subs) ? subs : []);
        setIngredients(Array.isArray(ings) ? ings : []);
        setHeroSettings(hero && !hero.error ? hero : null);
        setTestimonials(Array.isArray(tests) ? tests.filter((t: any) => t.isPublished) : []);
        setActiveSpotlightIndex(0);
      })
      .catch(() => {
        setProducts([]);
        setSubcategories([]);
        setHeroSettings(null);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const latestProducts = useMemo(() => products.slice(0, 8), [products]);
  const spotlightProduct = products[activeSpotlightIndex] || products[0];

  // Auto-cycle through top 4 products in spotlight if available
  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSpotlightIndex((prev) => (prev + 1) % Math.min(products.length, 4));
    }, 6000);
    return () => clearInterval(interval);
  }, [products.length]);

  const defaultHero: HeroSettings = {
    id: "default",
    title: "Descubra Productos Destacados Con Análisis Claros para Compradores",
    subtitle: "Pruebas Verificadas y Revisiones Editoriales",
    description:
      "Nutritional Reviews ayuda a los compradores a evaluar productos populares de salud y nutrición mediante análisis detallados, desglose de características, pros y contras reales y verificación de precios antes de realizar un pedido.",
    backgroundImage: "",
    backgroundType: "gradient",
    gradientFrom: "#d4eff7",
    gradientVia: "#e5f5f9",
    gradientTo: "#daf0f6",
    textColor: "#0f172a",
    primaryColor: "#023e8a",
    ctaColor: "#023e8a",
    accentColor: "#0077b6",
    overlayOpacity: 30,
    backgroundPosition: "center",
    backgroundSize: "cover",
    buyNowLink: "",
    updatedAt: new Date().toISOString(),
  };

  const hero = heroSettings || defaultHero;

  const renderHeroTitle = (title: string, highlightColor?: string) => {
    if (!title) return "Descubra Productos Destacados Con Análisis Claros para Compradores";
    if (title.includes("|")) {
      const [first, ...rest] = title.split("|");
      return (
        <>
          {first.trim()}{" "}
          <span className="text-french_blue" style={highlightColor ? { color: highlightColor } : undefined}>
            {rest.join("|").trim()}
          </span>
        </>
      );
    }
    const words = title.split(" ");
    if (words.length >= 5) {
      const midpoint = Math.max(words.length - 4, Math.floor(words.length * 0.5));
      const firstPart = words.slice(0, midpoint).join(" ");
      const secondPart = words.slice(midpoint).join(" ");
      return (
        <>
          {firstPart}{" "}
          <span className="text-french_blue" style={highlightColor ? { color: highlightColor } : undefined}>
            {secondPart}
          </span>
        </>
      );
    }
    return title;
  };

  // Filter products by subcategory if selected
  const filteredProducts = useMemo(() => {
    if (selectedSubcategoryFilter === "all") return latestProducts;
    return products.filter((p) => p.subcategoryId === selectedSubcategoryFilter);
  }, [selectedSubcategoryFilter, latestProducts, products]);

  const productSkeletonKeys = ["p1", "p2", "p3", "p4"];
  const categorySkeletonKeys = ["c1", "c2", "c3", "c4", "c5", "c6"];

  return (
    <main className="min-h-screen text-slate-800 bg-[#eef8fb]">

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION: SHOWCASE LATEST PRODUCT PROMINENTLY
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#eef8fb] border-b border-turquoise_surf/20 pt-6 sm:pt-8 pb-14 sm:pb-20"
        style={
          hero.backgroundType === "image" && hero.backgroundImage
            ? {
                backgroundImage: `url(${hero.backgroundImage})`,
                backgroundSize: hero.backgroundSize || "cover",
                backgroundPosition: hero.backgroundPosition || "center",
              }
            : undefined
        }
      >
        {hero.backgroundType === "image" && hero.backgroundImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: `rgba(0,0,0,${(hero.overlayOpacity ?? 30) / 100})`,
            }}
          />
        )}
        {/* Subtle coastal ambient illumination */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-light_cyan/60 blur-[120px] pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-sky_aqua/15 blur-[100px] pointer-events-none -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 min-h-[560px]">

            {/* Left Column: Authoritative Editorial Copy & Trust Proof */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-turquoise_surf/40 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bright_teal_blue opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bright_teal_blue" />
                </span>
                <span className="text-xs font-bold text-deep_twilight uppercase tracking-wider">
                  {hero.subtitle || "Pruebas Verificadas y Revisiones Editoriales"}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-2xl sm:text-4xl lg:text-[3.35rem] font-black leading-[1.15] sm:leading-[1.08] tracking-tight"
                style={{ color: hero.textColor || "#0f172a" }}
              >
                {renderHeroTitle(hero.title, hero.primaryColor)}
              </h1>

              {/* Subtitle / Description */}
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
                style={{
                  color: hero.textColor && hero.backgroundType === "image" ? hero.textColor : "#475569",
                  opacity: hero.backgroundType === "image" ? 0.95 : 1,
                }}
              >
                {hero.description ||
                  "Nutritional Reviews ayuda a los compradores a entender productos populares en línea mediante análisis sencillos, guías por categoría, desglose de funciones y verificación de precios antes de visitar una oferta."}
              </p>

              {/* Action Buttons: SOLID COLORS ONLY (NO GRADIENT INTERNAL LINKING) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                {hero.buyNowLink ? (
                  <a
                    href={hero.buyNowLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm tracking-wide shadow-md shadow-french_blue/20 hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
                    style={hero.ctaColor ? { backgroundColor: hero.ctaColor } : undefined}
                  >
                    <span>Comprar Ahora</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : spotlightProduct ? (
                  <Link
                    href={`/${spotlightProduct.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm tracking-wide shadow-md shadow-french_blue/20 hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
                    style={hero.ctaColor ? { backgroundColor: hero.ctaColor } : undefined}
                  >
                    <span>Leer Análisis de Producto Reciente</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href="#products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm tracking-wide shadow-md shadow-french_blue/20 hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
                    style={hero.ctaColor ? { backgroundColor: hero.ctaColor } : undefined}
                  >
                    <span>Explorar Productos</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-light_cyan/40 text-deep_twilight hover:text-french_blue font-bold text-sm border-2 border-french_blue/30 hover:border-french_blue transition-all duration-200 text-center"
                >
                  <span>Ver Todos los Productos</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-turquoise_surf/30 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>100% Independiente</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>Especificaciones Verificadas</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Clock className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>Actualizado para 2026</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Single-Card Product Showcase Carousel */}
            <div className="lg:col-span-6 flex items-center justify-center">
              {loading ? (
                <div className="w-[340px] h-[440px] rounded-[25px] bg-slate-900/10 border border-slate-200/60 animate-pulse flex flex-col items-center justify-center p-6 gap-4">
                  <div className="w-20 h-20 rounded-full bg-slate-200" />
                  <div className="w-3/4 h-5 rounded-lg bg-slate-200" />
                  <div className="w-1/2 h-4 rounded-lg bg-slate-200" />
                </div>
              ) : (
                <HeroProductShowcase products={products} />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. TITULAR Y TEXTO EDITORIAL PROPUESTO (TRANSPARENCIA)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-turquoise_surf/20 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Main Proposed Headline & Intro */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-3 border border-frosted_blue/60">
              <ShieldCheck className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Transparencia Editorial · Para América Latina</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Reseñas de suplementos en español, para comparar antes de comprar
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              NutritionalReviews.org es un sitio de reseñas de suplementos nutricionales, escrito en español para lectores de América Latina. En cada reseña reunimos, en un mismo lugar, qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo.
            </p>
          </div>

          {/* 3 Pillar Cards: Editorial Scope, Affiliate Disclosure, Medical Disclaimer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-1">
            {/* Card 1: Qué reúne cada reseña */}
            <div className="p-6 rounded-2xl bg-[#eef8fb]/70 border border-light_cyan flex flex-col justify-between space-y-4 hover:shadow-sm transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light_cyan flex items-center justify-center text-french_blue shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Reseñas Claras y Verificadas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  En cada reseña reunimos qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y lugar de compra verificados en la fecha indicada en el artículo.
                </p>
              </div>
              <div className="pt-3 border-t border-turquoise_surf/20 text-xs font-bold text-french_blue flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
                <span>Fecha de verificación visible</span>
              </div>
            </div>

            {/* Card 2: No vendemos suplementos / Afiliados */}
            <div className="p-6 rounded-2xl bg-[#eef8fb]/70 border border-light_cyan flex flex-col justify-between space-y-4 hover:shadow-sm transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-light_cyan flex items-center justify-center text-french_blue shadow-xs">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Compra Directa y Afiliación
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No vendemos suplementos. Las compras se realizan directamente con el vendedor, a través de los enlaces que publicamos. El sitio se financia en parte con comisiones de afiliados sin costo extra para ti, lo cual no determina la valoración del producto.
                </p>
              </div>
              <div className="pt-3 border-t border-turquoise_surf/20 text-xs font-bold text-french_blue flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
                <span>No cobramos al comprador</span>
              </div>
            </div>

            {/* Card 3: Descargo Médico */}
            <div className="p-6 rounded-2xl bg-[#eef8fb]/70 border border-amber-200/70 flex flex-col justify-between space-y-4 hover:shadow-sm transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-xs border border-amber-200/60">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Responsabilidad y Salud
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No damos consejos médicos personalizados, no garantizamos resultados y no publicamos resultados personales inventados. Si tienes dudas de salud, consulta a un profesional cualificado antes de tomar un suplemento.
                </p>
              </div>
              <div className="pt-3 border-t border-amber-200/50 text-xs font-bold text-amber-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Consulte a un profesional cualificado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. FEATURED PRODUCT REVIEWS SECTION (WITH SOLID CONTROLS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="products" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eef8fb]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Catálogo Editorial"
            title="Reseñas Destacadas"
            subtitle="En cada reseña reunimos qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo."
            action={
              <div className="flex items-center gap-3">
                {/* View Mode Toggle: SOLID BRAND STYLING */}
                <div className="flex items-center bg-white border border-light_cyan p-1 rounded-xl shadow-sm">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-french_blue text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    aria-label="Vista lista"
                  >
                    <List className="w-3.5 h-3.5" /> Lista
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-french_blue text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    aria-label="Vista cuadrícula"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" /> Cuadrícula
                  </button>
                </div>
              </div>
            }
          />

          {/* Subcategory Quick Filter Chips (SOLID PILLS WITH EDGE BLEED ON MOBILE) */}
          {subcategories.length > 0 && (
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
              <button
                onClick={() => setSelectedSubcategoryFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  selectedSubcategoryFilter === "all"
                    ? "bg-french_blue text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-light_cyan/40 border border-light_cyan"
                }`}
              >
                Todas las Categorías ({latestProducts.length})
              </button>
              {subcategories.map((sub) => {
                const count = products.filter((p) => p.subcategoryId === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategoryFilter(sub.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                      selectedSubcategoryFilter === sub.id
                        ? "bg-french_blue text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-light_cyan/40 border border-light_cyan"
                    }`}
                  >
                    {sub.name} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          )}

          {/* Product Cards Rendering */}
          {loading ? (
            <div
              className={
                viewMode === "list"
                  ? "space-y-4"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              }
            >
              {productSkeletonKeys.map((key) => (
                <div
                  key={key}
                  className={
                    viewMode === "list"
                      ? "h-40 bg-white rounded-2xl animate-pulse border border-slate-100"
                      : "h-80"
                  }
                >
                  {viewMode === "grid" && <SkeletonCard />}
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl text-center py-16 px-6 text-slate-600 border-2 border-dashed border-light_cyan bg-white max-w-3xl mx-auto space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-light_cyan flex items-center justify-center text-french_blue">
                <Clock className="w-6 h-6 text-bright_teal_blue" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sin reseñas publicadas todavía</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto italic">
                Esta sección se rellena solo con el primer lote que pase los filtros de la lista de lanzamiento: envío confirmado al país objetivo, página de venta en español, y precio y enlace verificados en una fecha concreta. No publicar productos de relleno ni listados sin reseña.
              </p>
              {selectedSubcategoryFilter !== "all" && (
                <button
                  onClick={() => setSelectedSubcategoryFilter("all")}
                  className="mt-2 text-xs font-bold text-french_blue hover:underline cursor-pointer"
                >
                  Restablecer filtros
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={
                  viewMode === "list"
                    ? "flex flex-col gap-5 w-full"
                    : filteredProducts.length === 1
                    ? "max-w-xl mx-auto w-full"
                    : filteredProducts.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 w-full"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
                }
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group w-full">
                    <ProductCard product={product} variant={viewMode} />
                  </div>
                ))}
              </div>

              {/* Testing Pipeline Notice if limited products displayed */}
              {filteredProducts.length <= 2 && (
                <div className="mt-8 p-4 rounded-2xl bg-white/80 border border-light_cyan text-center flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto shadow-xs">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <div className="w-8 h-8 rounded-xl bg-light_cyan/60 flex items-center justify-center text-french_blue flex-shrink-0">
                      <Clock className="w-4 h-4 text-bright_teal_blue" />
                    </div>
                    <span className="font-semibold text-slate-700 text-left">
                      Publicamos únicamente análisis que cumplen los criterios de verificación: envío confirmado al país objetivo, página de venta en español y precio verificado en fecha concreta.
                    </span>
                  </div>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-french_blue hover:text-bright_teal_blue flex items-center gap-1 flex-shrink-0 bg-light_cyan/30 px-3 py-1.5 rounded-xl border border-light_cyan hover:border-french_blue transition-colors"
                  >
                    <span>Ver Catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Solid Link to Catalog */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-9 py-4 bg-french_blue hover:bg-deep_twilight text-white text-sm font-bold rounded-2xl shadow-md transition-all active:scale-95 group"
            >
              <span>Explorar Catálogo Completo de Productos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. BROWSE BY CATEGORY / COLLECTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      {subcategories.length > 0 && (
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-turquoise_surf/20">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              label="Categorías Seleccionadas"
              title="Explorar por Categoría de Producto"
              subtitle="Encuentre análisis de productos a medida, guías de compra y comparativas organizadas por tipo de producto."
              action={
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-french_blue hover:text-bright_teal_blue transition-colors border border-light_cyan hover:border-french_blue px-4 py-2 rounded-xl bg-light_cyan/20"
                >
                  <span>Ver Todas las Categorías</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              }
            />

            {subcategories.length === 1 ? (
              <div className="space-y-8">
                {/* ── Featured Category Hero Spotlight ── */}
                <div className="relative rounded-3xl bg-deep_twilight text-white p-6 sm:p-10 overflow-hidden shadow-2xl border border-french_blue/40">
                  {/* Subtle ambient glows */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-bright_teal_blue/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-french_blue/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Category Narrative & Verification Standards */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bright_teal_blue text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                          <Flame className="w-3.5 h-3.5" />
                          Centro de Categoría Destacada
                        </span>
                        <span className="text-xs font-bold text-light_cyan/90 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                          {products.filter((p) => p.subcategoryId === subcategories[0].id).length || 1} Análisis Probados
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                        {subcategories[0].name}
                      </h3>

                      <p className="text-sm sm:text-base text-light_cyan/90 leading-relaxed max-w-2xl">
                        {subcategories[0].description ||
                          "Análisis editoriales en profundidad, pruebas de nivel sonoro, mediciones de rendimiento y comparativas de idoneidad para el comprador."}
                      </p>

                      {/* Editorial Testing Highlights */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/90">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Durabilidad de Componentes y Pruebas Sonoras</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Estabilidad de Estructura y Amortiguación</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Auditorías de Precios en Vivo y Garantías</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Análisis Verificado de Opiniones de Usuarios</span>
                        </div>
                      </div>

                      {/* Action Links: SOLID BUTTONS (NO GRADIENT INTERNAL LINKING) */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/products?subcategory=${subcategories[0].slug}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-light_cyan text-deep_twilight font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center"
                        >
                          <span>Explorar Todos los Análisis de {subcategories[0].name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/products"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all text-center"
                        >
                          <span>Explorar Catálogo Completo</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Spotlight Product Preview inside this category */}
                    <div className="lg:col-span-5">
                      {products.find((p) => p.subcategoryId === subcategories[0].id) ? (
                        (() => {
                          const topProduct =
                            products.find((p) => p.subcategoryId === subcategories[0].id) || products[0];
                          return (
                            <div className="bg-white rounded-2xl p-5 text-slate-900 border border-light_cyan shadow-xl space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-french_blue bg-light_cyan/60 px-2.5 py-1 rounded-md">
                                  Mejor Elección Probada de la Categoría
                                </span>
                                <div className="flex items-center gap-1 text-xs font-black text-slate-900">
                                  <Star className="w-3.5 h-3.5 fill-bright_teal_blue text-bright_teal_blue" />
                                  <span>4.9 / 5</span>
                                </div>
                              </div>

                              <div className="relative w-full h-44 rounded-xl bg-gradient-to-b from-[#f0f9fb] to-[#e6f4f8] p-3 flex items-center justify-center overflow-hidden border border-light_cyan/70">
                                <Image
                                  src={topProduct.featuredImage || topProduct.image || "/placeholder-image.png"}
                                  alt={topProduct.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>

                              <div>
                                <h4 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-1">
                                  {topProduct.name}
                                </h4>
                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {topProduct.shortDescription || "Especificaciones verificadas y guía de compra"}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                                    Oferta Verificada
                                  </span>
                                  <span className="text-xl font-black text-deep_twilight">
                                    ${topProduct.price.toFixed(2)}
                                  </span>
                                </div>

                                <Link
                                  href={`/${topProduct.slug}`}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-xs"
                                >
                                  <span>Leer Análisis</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center space-y-3">
                          <LayoutGrid className="w-10 h-10 mx-auto text-turquoise_surf" />
                          <h4 className="font-bold text-white text-base">Centro de Pruebas Activo</h4>
                          <p className="text-xs text-light_cyan/80">
                            Nuevos modelos se evalúan periódicamente con datos actualizados de rendimiento y precio.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Additional Lab Testing Departments (Curated Categories) ── */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Explorar Otros Departamentos de Análisis
                    </span>
                    <span className="text-xs font-semibold text-bright_teal_blue">
                      Actualizado para 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      {
                        title: "Tecnología y Gadgets Inteligentes",
                        desc: "Dispositivos de fitness, audio inalámbrico, domótica y sensores portátiles probados en batería y precisión.",
                        icon: Zap,
                        badge: "Departamento Activo",
                        href: "/products",
                      },
                      {
                        title: "Salud, Nutrición y Bienestar",
                        desc: "Pruebas de pureza de ingredientes, fórmulas dietéticas certificadas, elementos de recuperación y garantías del fabricante.",
                        icon: ShieldCheck,
                        badge: "Departamento Verificado",
                        href: "/products",
                      },
                      {
                        title: "Hogar, Vida y Ergonomía",
                        desc: "Asientos ergonómicos, estaciones de trabajo activas, electrodomésticos de bienestar y pruebas de durabilidad para la vida diaria.",
                        icon: Sparkles,
                        badge: "Departamento en Pruebas",
                        href: "/products",
                      },
                    ].map((dept) => (
                      <Link
                        key={dept.title}
                        href={dept.href}
                        className="group bg-[#eef8fb]/50 hover:bg-[#eef8fb] border border-light_cyan hover:border-turquoise_surf/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-light_cyan text-french_blue flex items-center justify-center group-hover:scale-105 group-hover:bg-french_blue group-hover:text-white transition-all shadow-xs">
                              <dept.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-light_cyan">
                              {dept.badge}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-extrabold text-slate-900 group-hover:text-french_blue transition-colors">
                              {dept.title}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                              {dept.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-bold text-french_blue group-hover:text-deep_twilight">
                          <span>Ver Departamento</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={
                  subcategories.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                }
              >
                {subcategories.map((sub, idx) => (
                  <Link
                    key={sub.id}
                    href={`/products?subcategory=${sub.slug}`}
                    className="group relative h-[280px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-light_cyan hover:border-turquoise_surf transition-all duration-300 flex flex-col justify-end p-6 bg-deep_twilight"
                  >
                    {sub.image ? (
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#023e8a] flex items-center justify-center overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-turquoise_surf/15 blur-xl pointer-events-none" />
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-light_cyan group-hover:scale-110 group-hover:bg-white/15 transition-all">
                          <LayoutGrid className="w-8 h-8" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep_twilight/95 via-deep_twilight/60 to-transparent" />

                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2">
                        {idx < 2 && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-bright_teal_blue text-white text-[9px] font-black uppercase tracking-widest">
                            Popular
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-light_cyan bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
                          {products.filter((p) => p.subcategoryId === sub.id).length} Análisis
                        </span>
                      </div>

                      <h3 className="text-white font-black text-xl leading-snug group-hover:text-light_cyan transition-colors">
                        {sub.name}
                      </h3>
                      {sub.description && (
                        <p className="text-light_cyan/80 text-xs line-clamp-2 leading-relaxed">
                          {sub.description}
                        </p>
                      )}
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                        <span>Explorar Categoría</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          5. SCIENCE & INGREDIENT BREAKDOWNS (WHEN AVAILABLE)
      ══════════════════════════════════════════════════════════════════════ */}
      {ingredients.length > 0 && (
        <section id="ingredients" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eef8fb] border-t border-turquoise_surf/20">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              label="Ciencia y Formulación"
              title="Desglose de Ingredientes Verificados"
              subtitle="Comprenda la ciencia detrás de las fórmulas de productos líderes, estándares de pureza certificados y beneficios comprobados."
            />
            <div
              className={
                ingredients.length === 1
                  ? "max-w-md sm:max-w-lg mx-auto"
                  : ingredients.length === 2
                  ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              }
            >
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="bg-white border border-light_cyan rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-turquoise_surf/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                    <Image
                      src={ing.image || "/ingredient-placeholder.png"}
                      alt={ing.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-french_blue border border-light_cyan shadow-sm">
                      Verificado
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight mb-1.5">
                        {ing.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {ing.description || "Componente de alta calidad evaluado en seguridad, potencia y eficacia."}
                      </p>

                      {ing.keyFeatures && (
                        <ul className="mt-3 space-y-1.5">
                          {ing.keyFeatures
                            .split("\n")
                            .filter((f: string) => f.trim())
                            .slice(0, 2)
                            .map((feature: string, i: Key | null | undefined) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <Check className="w-3.5 h-3.5 text-bright_teal_blue mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{feature.trim()}</span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-french_blue">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-turquoise_surf" /> Evaluado en Laboratorio
                      </span>
                      <span className="text-slate-400">100% Puro</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          6. REAL CUSTOMER TESTIMONIALS
      ══════════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && <TestimonialSlider testimonials={testimonials} />}

      {/* ══════════════════════════════════════════════════════════════════════
          7. CÓMO LEER CADA RESEÑA (METODOLOGÍA EDITORIAL)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-turquoise_surf/20">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-3 border border-frosted_blue/60">
              <ShieldCheck className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Metodología Editorial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Cómo Leer Cada Reseña
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              En cada reseña reunimos, en un mismo lugar, qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo.
            </p>
          </div>

          {/* 6 Structured Points Grid from Proposed Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Qué es el producto y para quién está pensado",
                desc: "Definición clara de la fórmula, propósito previsto y a qué tipo de comprador se dirige, sin lenguaje publicitario.",
                color: "bg-french_blue",
              },
              {
                num: "02",
                title: "Ingredientes y etiqueta, tal como los publica el fabricante",
                desc: "Desglose transparente de componentes activos, dosificación declarada y sellos de calidad informados en el envase.",
                color: "bg-bright_teal_blue",
              },
              {
                num: "03",
                title: "Beneficios anunciados frente a evidencia disponible",
                desc: "Contraste objetivo entre las promesas comerciales del fabricante y la evidencia científica o bibliográfica disponible.",
                color: "bg-deep_twilight",
              },
              {
                num: "04",
                title: "Ventajas y desventajas",
                desc: "Evaluación equilibrada de pros prácticos y limitaciones reales, para que tenga expectativas honestas antes de comprar.",
                color: "bg-french_blue",
              },
              {
                num: "05",
                title: "Precio, presentaciones y dónde comprarlo",
                desc: "Costos oficiales, formatos disponibles y enlaces directos al vendedor, con la fecha de verificación siempre visible.",
                color: "bg-bright_teal_blue",
              },
              {
                num: "06",
                title: "Preguntas frecuentes",
                desc: "Reseñas, opiniones existentes de compradores, análisis de si funciona según lo esperado, precio y puntos de venta oficiales.",
                color: "bg-deep_twilight",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-[#eef8fb] p-6 sm:p-7 rounded-2xl border border-light_cyan space-y-3.5 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${step.color} text-white flex items-center justify-center font-black text-xs shadow-xs`}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-turquoise_surf/20 flex items-center gap-1.5 text-[11px] font-bold text-french_blue">
                  <Check className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
                  <span>Criterio verificado</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#03045e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">¿Tiene dudas sobre nuestro proceso de reseñas?</h4>
              <p className="text-xs sm:text-sm text-light_cyan/80 mt-1">
                Escríbanos directamente a reviewsnutritional@gmail.com o consulte nuestras páginas de transparencia.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/quienes-somos"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-deep_twilight font-bold text-xs hover:bg-light_cyan transition-colors text-center"
              >
                Quiénes Somos
              </Link>
              <Link
                href="/contacto"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/30 text-white font-bold text-xs hover:bg-white/10 transition-colors text-center"
              >
                Contacto
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. ENLACES PROPUESTOS (TRANSPARENCIA Y POLÍTICAS DEL SITIO)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#eef8fb] border-t border-turquoise_surf/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-3 border border-frosted_blue/60">
              <BookOpen className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Transparencia y Normativa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Enlaces y Políticas del Sitio
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Consulte nuestras directrices de publicación, descargos de responsabilidad médica y términos de uso antes de navegar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                label: "Quiénes Somos",
                href: "/quienes-somos",
                desc: "Objetivo y equipo editorial de NutritionalReviews.org",
              },
              {
                label: "Contacto",
                href: "/contacto",
                desc: "Canal de contacto: reviewsnutritional@gmail.com",
                badge: "reviewsnutritional@gmail.com",
              },
              {
                label: "Divulgación de Afiliados",
                href: "/divulgacion-de-afiliados",
                desc: "Financiación del sitio mediante comisiones de afiliados sin sobrecoste",
              },
              {
                label: "Descargo de Responsabilidad de Salud",
                href: "/descargo-de-responsabilidad",
                desc: "No ofrecemos asesoramiento médico ni garantizamos resultados",
              },
              {
                label: "Política de Privacidad",
                href: "/politica-de-privacidad",
                desc: "Tratamiento transparente de datos conforme a la normativa vigente",
              },
              {
                label: "Términos de Uso",
                href: "/terminos-de-uso",
                desc: "Condiciones de acceso, uso y navegación en el portal",
              },
              {
                label: "Política de Cookies",
                href: "/politica-de-cookies",
                desc: "Información sobre cookies técnicas y analíticas utilizadas",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-5 rounded-2xl bg-white border border-light_cyan hover:border-turquoise_surf hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-french_blue transition-colors">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-french_blue group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {link.desc}
                  </p>
                </div>
                {link.badge && (
                  <span className="mt-3 inline-block text-[10px] font-mono font-medium text-french_blue bg-light_cyan/40 px-2 py-0.5 rounded-md self-start border border-light_cyan">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. BOTTOM CALL-TO-ACTION (SOLID STYLING, HONEST COMMITMENT)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eef8fb]">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-deep_twilight text-white p-6 sm:p-14 text-center overflow-hidden shadow-2xl border border-french_blue/40">
            {/* Subtle light accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-french_blue/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-bright_teal_blue/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky_aqua text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Compare Antes de Comprar</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Reseñas de Suplementos en Español
              </h2>

              <p className="text-light_cyan/90 text-xs sm:text-base leading-relaxed">
                Consulte qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo.
              </p>

              {/* Solid Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center pt-2 w-full sm:w-auto">
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-french_blue hover:bg-bright_teal_blue text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm text-center"
                >
                  <span>Explorar Reseñas Destacadas</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contacto"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-deep_twilight hover:bg-light_cyan font-bold rounded-xl shadow-md transition-all text-sm text-center"
                >
                  <span>Contacto y Consultas</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
