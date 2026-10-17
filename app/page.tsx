"use client";

import { useEffect, useState, type ReactNode, Key, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategoryContext } from "@/context/CategoryContext";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import TestimonialSlider from "@/components/TestimonialSlider";
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
      fetch("/api/hero-settings").then((r) => r.json()),
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
    title: "Explore Trending Products With Clear Buyer-Focused Reviews",
    subtitle: "Verified Testing & Editorial Reviews",
    description:
      "Official Products Lab helps shoppers evaluate popular lifestyle & tech products through in-depth testing summaries, clear feature breakdowns, real-world pros & cons, and verified pricing checks before ordering.",
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
      <section className="relative w-full overflow-hidden bg-[#eef8fb] border-b border-turquoise_surf/20 pt-6 sm:pt-8 pb-14 sm:pb-20">
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
                  {hero.subtitle || "Verified Testing & Editorial Reviews"}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-[3.35rem] font-black leading-[1.15] sm:leading-[1.08] tracking-tight text-slate-900">
                Explore Trending Products With{" "}
                <span className="text-french_blue">Clear Buyer-Focused Reviews</span>
              </h1>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                {hero.description ||
                  "Official Products Lab helps shoppers understand popular online products through simple reviews, category guides, feature breakdowns, and verified pricing checks before visiting an offer."}
              </p>

              {/* Action Buttons: SOLID COLORS ONLY (NO GRADIENT INTERNAL LINKING) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                {spotlightProduct ? (
                  <Link
                    href={`/${spotlightProduct.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm tracking-wide shadow-md shadow-french_blue/20 hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
                  >
                    <span>Read Latest Product Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href="#products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm tracking-wide shadow-md shadow-french_blue/20 hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-light_cyan/40 text-deep_twilight hover:text-french_blue font-bold text-sm border-2 border-french_blue/30 hover:border-french_blue transition-all duration-200 text-center"
                >
                  <span>Browse All Products</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-turquoise_surf/30 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>100% Independent</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>Verified Specifications</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Clock className="w-4 h-4 text-bright_teal_blue flex-shrink-0" />
                  <span>Updated for 2026</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Spotlight Card Displaying the Latest Product */}
            <div className="lg:col-span-6">
              {loading ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-light_cyan shadow-xl animate-pulse min-h-[440px] flex flex-col justify-between">
                  <div className="h-6 w-32 bg-slate-200 rounded-full mb-4" />
                  <div className="h-48 sm:h-56 bg-slate-100 rounded-2xl w-full" />
                  <div className="space-y-3 mt-6">
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-10 bg-slate-200 rounded-xl w-full" />
                  </div>
                </div>
              ) : spotlightProduct ? (
                <div className="relative group">
                  {/* Spotlight container card */}
                  <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-light_cyan hover:border-turquoise_surf/60 shadow-xl shadow-french_blue/5 transition-all duration-300 relative overflow-hidden">
                    
                    {/* Top status bar inside card */}
                    <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-french_blue text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 text-white" />
                        <span>Latest Product Spotlight</span>
                      </div>
                      {(spotlightProduct.subcategory?.name || subcategories.find((s) => s.id === spotlightProduct.subcategoryId)?.name) && (
                        <span className="text-[11px] sm:text-xs font-bold text-slate-500 bg-light_cyan/40 px-2.5 py-1 rounded-lg border border-frosted_blue/40 truncate max-w-[140px] sm:max-w-none">
                          {spotlightProduct.subcategory?.name || subcategories.find((s) => s.id === spotlightProduct.subcategoryId)?.name}
                        </span>
                      )}
                    </div>

                    {/* Spotlight Product Image & Badge */}
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl bg-gradient-to-b from-[#f0f9fb] to-[#e6f4f8] flex items-center justify-center p-3 sm:p-4 overflow-hidden mb-5 sm:mb-6 border border-light_cyan/80">
                      <Link href={`/${spotlightProduct.slug}`} className="relative w-full h-full block">
                        <Image
                          src={spotlightProduct.featuredImage || spotlightProduct.image || "/placeholder-image.png"}
                          alt={spotlightProduct.imageAlt || spotlightProduct.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      </Link>

                      {/* Verified Review Score Pill */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full shadow-md border border-light_cyan flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-bright_teal_blue text-bright_teal_blue" />
                        <span className="text-xs font-black text-slate-900">4.9 / 5</span>
                        <span className="hidden sm:inline text-[10px] text-slate-500 font-medium">Verified Test</span>
                      </div>

                      {/* Price callout */}
                      <div className="absolute top-3 right-3 bg-deep_twilight text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-md font-extrabold text-xs sm:text-sm">
                        ${spotlightProduct.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3">
                      <Link href={`/${spotlightProduct.slug}`} className="block group-hover:text-french_blue transition-colors">
                        <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug line-clamp-2">
                          {spotlightProduct.name}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {spotlightProduct.shortDescription ||
                          "Comprehensive review analyzing build quality, buyer suitability, feature breakdowns, and real-world value."}
                      </p>

                      {/* Solid CTA Buttons (NO GRADIENTS) */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                        <Link
                          href={`/${spotlightProduct.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-sm transition-colors shadow-md text-center"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Full Review</span>
                        </Link>
                        {spotlightProduct.buyNowLink && (
                          <a
                            href={spotlightProduct.buyNowLink}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-bright_teal_blue hover:bg-french_blue text-white font-bold text-sm transition-colors shadow-md text-center"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Check Official Offer</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Quick Switcher Thumbnails Dock (if multiple products exist) */}
                    {products.length > 1 && (
                      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Recent Additions:
                        </span>
                        <div className="flex items-center gap-2">
                          {products.slice(0, 4).map((item, idx) => (
                            <button
                              key={item.id}
                              onClick={() => setActiveSpotlightIndex(idx)}
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-50 cursor-pointer ${
                                idx === activeSpotlightIndex
                                  ? "border-french_blue scale-105 shadow-md bg-white"
                                  : "border-slate-200 hover:border-bright_teal_blue opacity-70 hover:opacity-100"
                              }`}
                              title={item.name}
                              aria-label={`View ${item.name}`}
                            >
                              <div className="relative w-full h-full">
                                <Image
                                  src={item.featuredImage || item.image || "/placeholder-image.png"}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Fallback if no products in database yet */
                <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-light_cyan text-center py-16 text-slate-500">
                  <ShoppingCart className="w-12 h-12 mx-auto text-bright_teal_blue opacity-30 mb-3" />
                  <p className="font-bold text-base text-slate-800">Featured Spotlight Ready</p>
                  <p className="text-sm mt-1">Products added in the admin dashboard will be showcased right here.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. EDITORIAL STANDARDS & VALUE PROPOSITION METRICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-turquoise_surf/20 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "100% Unbiased",
                desc: "Independent research & editorial testing",
              },
              {
                icon: Award,
                title: "Verified Specs",
                desc: "Rigorous breakdown of features & limitations",
              },
              {
                icon: TrendingUp,
                title: "Live Pricing",
                desc: "Checked against current manufacturer offers",
              },
              {
                icon: Star,
                title: "Buyer Suitability",
                desc: "Clear guidelines on who should (and shouldn't) buy",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#eef8fb]/50 hover:bg-[#eef8fb] border border-light_cyan/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-light_cyan flex items-center justify-center flex-shrink-0 text-french_blue shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. FEATURED PRODUCT REVIEWS SECTION (WITH SOLID CONTROLS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="products" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eef8fb]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="In-Depth Analysis"
            title="Featured Product Reviews"
            subtitle="Explore our comprehensive editorial reviews detailing real specifications, buyer suitability, price checks, and verified pros & cons."
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
                    aria-label="List view"
                  >
                    <List className="w-3.5 h-3.5" /> List
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-french_blue text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" /> Grid
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
                All Categories ({latestProducts.length})
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
            <div className="rounded-3xl text-center py-20 text-slate-500 border-2 border-dashed border-light_cyan bg-white">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-25 text-bright_teal_blue" />
              <p className="text-base font-bold text-slate-800">No products found in this category.</p>
              <button
                onClick={() => setSelectedSubcategoryFilter("all")}
                className="mt-3 text-xs font-bold text-french_blue hover:underline"
              >
                Reset filters
              </button>
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
                      More verified product reviews and comparison benchmarks are currently in our testing pipeline.
                    </span>
                  </div>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-french_blue hover:text-bright_teal_blue flex items-center gap-1 flex-shrink-0 bg-light_cyan/30 px-3 py-1.5 rounded-xl border border-light_cyan hover:border-french_blue transition-colors"
                  >
                    <span>Browse All Reviews</span>
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
              <span>Explore Complete Product Catalog</span>
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
              label="Curated Categories"
              title="Browse by Product Category"
              subtitle="Find tailored product reviews, buyer guides, and feature comparisons organized by specific product type."
              action={
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-french_blue hover:text-bright_teal_blue transition-colors border border-light_cyan hover:border-french_blue px-4 py-2 rounded-xl bg-light_cyan/20"
                >
                  <span>View All Categories</span>
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
                          Featured Category Hub
                        </span>
                        <span className="text-xs font-bold text-light_cyan/90 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                          {products.filter((p) => p.subcategoryId === subcategories[0].id).length || 1} Tested Reviews
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                        {subcategories[0].name}
                      </h3>

                      <p className="text-sm sm:text-base text-light_cyan/90 leading-relaxed max-w-2xl">
                        {subcategories[0].description ||
                          "In-depth editorial reviews, decibel noise tests, motor output measurements, and buyer suitability comparisons for top cardio and fitness equipment."}
                      </p>

                      {/* Editorial Testing Highlights */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/90">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Motor Durability & Decibel Testing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Frame Stability & Joint Cushioning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Live Pricing & Warranty Audits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                          <span>Verified User Feedback Analysis</span>
                        </div>
                      </div>

                      {/* Action Links: SOLID BUTTONS (NO GRADIENT INTERNAL LINKING) */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/products?subcategory=${subcategories[0].slug}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-light_cyan text-deep_twilight font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center"
                        >
                          <span>Explore All {subcategories[0].name} Reviews</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/products"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all text-center"
                        >
                          <span>Browse Full Catalog</span>
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
                                  Top Tested Pick in Category
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
                                  {topProduct.shortDescription || "Verified specifications & buyer guide"}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                                    Verified Offer
                                  </span>
                                  <span className="text-xl font-black text-deep_twilight">
                                    ${topProduct.price.toFixed(2)}
                                  </span>
                                </div>

                                <Link
                                  href={`/${topProduct.slug}`}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-xs"
                                >
                                  <span>Read Review</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center space-y-3">
                          <LayoutGrid className="w-10 h-10 mx-auto text-turquoise_surf" />
                          <h4 className="font-bold text-white text-base">Active Testing Hub</h4>
                          <p className="text-xs text-light_cyan/80">
                            New models are tested regularly with updated motor, noise, and price data.
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
                      Explore Other Review Departments
                    </span>
                    <span className="text-xs font-semibold text-bright_teal_blue">
                      Updated for 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      {
                        title: "Tech & Smart Gadgets",
                        desc: "Fitness trackers, wireless audio, smart home devices, and wearable sensors tested for battery life & accuracy.",
                        icon: Zap,
                        badge: "Active Department",
                        href: "/products",
                      },
                      {
                        title: "Health, Nutrition & Wellness",
                        desc: "Ingredient purity tests, certified dietary formulations, recovery essentials, and manufacturer guarantee checks.",
                        icon: ShieldCheck,
                        badge: "Verified Department",
                        href: "/products",
                      },
                      {
                        title: "Home Living & Ergonomics",
                        desc: "Ergonomic seating, active desk setups, wellness appliances, and durability testing for daily living.",
                        icon: Sparkles,
                        badge: "Testing Department",
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
                          <span>Browse Department</span>
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
                          {products.filter((p) => p.subcategoryId === sub.id).length} Reviews
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
                        <span>Explore Category</span>
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
              label="Science & Formulation"
              title="Verified Ingredient Breakdowns"
              subtitle="Understand the science behind top product formulations, certified purity standards, and proven benefits."
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
                      Verified
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight mb-1.5">
                        {ing.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {ing.description || "High quality component evaluated for safety, potency, and effectiveness."}
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
                        <Zap className="w-3.5 h-3.5 text-turquoise_surf" /> Lab Evaluated
                      </span>
                      <span className="text-slate-400">100% Pure</span>
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
          7. HOW OFFICIAL PRODUCTS LAB WORKS (EDITORIAL METHODOLOGY)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-turquoise_surf/20">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light_cyan text-deep_twilight font-extrabold text-[11px] tracking-widest uppercase mb-3 border border-frosted_blue/60">
              <ShieldCheck className="w-3.5 h-3.5 text-bright_teal_blue" />
              <span>Editorial Integrity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              How Official Products Lab Evaluates Products
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Online product research can be overwhelming when exaggerated claims, unstable pricing, and scattered reviews make informed choices difficult. We simplify this process by providing structured, transparent analysis before you decide to visit a product offer.
            </p>
          </div>

          {/* 3-Column Structured Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#eef8fb] p-7 rounded-2xl border border-light_cyan space-y-3">
              <div className="w-10 h-10 rounded-xl bg-french_blue text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unbiased Product Clarity</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We clearly define what the product is, its intended purpose, and exactly which everyday problem it aims to solve without sensationalized marketing language.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-turquoise_surf/20">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-french_blue" /> Practical function breakdown
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-french_blue" /> Target buyer suitability check
                </li>
              </ul>
            </div>

            <div className="bg-[#eef8fb] p-7 rounded-2xl border border-light_cyan space-y-3">
              <div className="w-10 h-10 rounded-xl bg-bright_teal_blue text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Balanced Pros & Limitations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No product is ideal for everyone. We explicitly highlight both the standout advantages and realistic limitations so you have full expectations ahead of time.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-turquoise_surf/20">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-bright_teal_blue" /> Verified user experiences
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-bright_teal_blue" /> Realistic durability expectations
                </li>
              </ul>
            </div>

            <div className="bg-[#eef8fb] p-7 rounded-2xl border border-light_cyan space-y-3">
              <div className="w-10 h-10 rounded-xl bg-deep_twilight text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Price & Guarantee Checks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We confirm current package offerings, official discounts, shipping terms, and manufacturer refund policies so shoppers are never caught off guard.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-turquoise_surf/20">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-deep_twilight" /> Current discount verification
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-deep_twilight" /> Direct link to official offers
                </li>
              </ul>
            </div>
          </div>

          {/* Action Links (SOLID INTERNAL LINKS) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#03045e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Have questions about our review process?</h4>
              <p className="text-xs sm:text-sm text-light_cyan/80 mt-1">
                Read our complete testing methodology and consumer transparency guidelines.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/about"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-deep_twilight font-bold text-xs hover:bg-light_cyan transition-colors text-center"
              >
                About Our Process
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/30 text-white font-bold text-xs hover:bg-white/10 transition-colors text-center"
              >
                Contact Research Team
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. BOTTOM CALL-TO-ACTION (SOLID STYLING, ZERO GRADIENTS)
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
                <span>Shop With Confidence</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Ready to Find Your Next Verified Product?
              </h2>

              <p className="text-light_cyan/90 text-xs sm:text-base leading-relaxed">
                Join thousands of smart shoppers who consult Official Products Lab before buying. Compare verified reviews, check specs, and find the best offer.
              </p>

              {/* Solid Action Buttons (NO GRADIENT INTERNAL LINKING) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center pt-2 w-full sm:w-auto">
                <a
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-french_blue hover:bg-bright_teal_blue text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm text-center"
                >
                  <span>Explore Featured Reviews</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-deep_twilight hover:bg-light_cyan font-bold rounded-xl shadow-md transition-all text-sm text-center"
                >
                  <span>Browse All Categories</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
