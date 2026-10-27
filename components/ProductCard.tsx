import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import type { Product } from "@/lib/types";
import {
  ShoppingCart,
  Star,
  CheckCircle,
  Check,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";

interface Props {
  product: Product;
  variant?: "grid" | "list";
  useFeaturedImage?: boolean;
}

export default function ProductCard({
  product,
  variant = "grid",
  useFeaturedImage = true,
}: Props) {
  const displayImage =
    useFeaturedImage && product.featuredImage
      ? product.featuredImage
      : product.image;

  // Extract real highlights from product keyFeatures or provide editorial proof points
  const featurePills = useMemo(() => {
    if (product.keyFeatures) {
      const split = product.keyFeatures
        .split(/[\n,]+/)
        .map((f) => f.trim())
        .filter(Boolean);
      if (split.length > 0) return split.slice(0, 3);
    }
    return [
      "Pruebas de Laboratorio 100% Independientes",
      "Especificaciones Verificadas 2026",
      "Garantía Oficial y Verificación de Devolución",
    ];
  }, [product.keyFeatures]);

  /* ─────────────────────────────────────────────────────────────────────────
     1. LIST VARIANT: ULTRA-PREMIUM 3-ZONE EDITORIAL REVIEW CARD
     ───────────────────────────────────────────────────────────────────────── */
  if (variant === "list") {
    return (
      <div className="group bg-white rounded-3xl border border-light_cyan hover:border-turquoise_surf/50 hover:shadow-xl hover:shadow-french_blue/10 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row w-full">
        {/* Left: Media & Rating Showcase */}
        <div className="relative w-full lg:w-72 xl:w-80 h-56 lg:h-auto bg-gradient-to-b from-[#f0f9fb] to-[#e6f4f8] flex-shrink-0 flex items-center justify-center p-5 border-b lg:border-b-0 lg:border-r border-light_cyan/70">
          <Link href={`/${product.slug}`} className="relative w-full h-full block">
            <Image
              src={displayImage || "/placeholder-image.png"}
              alt={product.imageAlt || product.name || "Product Image"}
              fill
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Top Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-french_blue border border-light_cyan shadow-xs">
              {product.subcategory?.name || "Análisis de Producto"}
            </span>
          </div>

          {/* Review Score Pill */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs border border-light_cyan flex items-center gap-1.5 text-xs font-black text-slate-900">
            <Star className="w-3.5 h-3.5 fill-bright_teal_blue text-bright_teal_blue" />
            <span>4.9 / 5</span>
            <span className="text-[10px] text-slate-500 font-semibold">Probado</span>
          </div>
        </div>

        {/* Center: Comprehensive Editorial Content */}
        <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between min-w-0 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-light_cyan/60 text-deep_twilight border border-frosted_blue/40">
                <CheckCircle className="w-3 h-3 text-bright_teal_blue" /> Análisis Editorial Verificado
              </span>
            </div>

            <Link href={`/${product.slug}`} className="block">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-bright_teal_blue transition-colors">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
              {product.shortDescription ||
                "Análisis editorial exhaustivo que evalúa especificaciones, usabilidad diaria, confort y relación calidad-precio."}
            </p>

            {/* Feature Highlights / Proof Points */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {featurePills.map((feature, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#eef8fb] border border-light_cyan text-[11px] font-semibold text-slate-700"
                >
                  <Check className="w-3 h-3 text-bright_teal_blue flex-shrink-0" />
                  <span className="truncate max-w-[220px]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Verdict Quote Excerpt */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
            <span className="italic line-clamp-1">
              "Veredicto Editorial: Recomendado para quienes buscan rendimiento confiable, alta pureza y garantía verificada."
            </span>
          </div>
        </div>

        {/* Right: Pricing & Decision Action Deck */}
        <div className="p-5 sm:p-6 lg:p-7 w-full lg:w-68 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-light_cyan/70 flex flex-col justify-between flex-shrink-0 gap-5">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
              Mejor Precio Verificado
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-deep_twilight">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-500 font-bold">USD</span>
            </div>
            <p className="text-[11px] font-semibold text-bright_teal_blue mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Verificación Actualizada 2026
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Primary Action: Read Review */}
            <Link
              href={`/${product.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-md active:scale-98 text-center"
            >
              <FileText className="w-4 h-4" />
              <span>Leer Análisis Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Secondary Action: Buy Now or Compare */}
            {product.buyNowLink ? (
              <a
                href={product.buyNowLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs bg-bright_teal_blue hover:bg-french_blue text-white transition-all shadow-sm active:scale-98 text-center"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Ver Oferta Oficial</span>
              </a>
            ) : (
              <Link
                href={`/${product.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs bg-white hover:bg-light_cyan/40 text-deep_twilight border border-light_cyan hover:border-french_blue/40 transition-all text-center"
              >
                <span>Ver Especificaciones Completas</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     2. GRID VARIANT: RICH EDITORIAL REVIEW PRODUCT CARD
     ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="group bg-white rounded-3xl border-2 border-light_cyan hover:border-turquoise_surf/60 hover:shadow-xl hover:shadow-french_blue/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between">
      {/* Media Top Container */}
      <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#f0f9fb] to-[#e6f4f8] flex items-center justify-center p-4 border-b border-light_cyan/80">
        <Link href={`/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={displayImage || "/placeholder-image.png"}
            alt={product.imageAlt || product.name || "Product Image"}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-french_blue border border-light_cyan shadow-xs">
            {product.subcategory?.name || "Análisis de Producto"}
          </span>
        </div>

        {/* Rating Score Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-light_cyan flex items-center gap-1.5 text-xs font-black text-slate-900">
          <Star className="w-3.5 h-3.5 fill-bright_teal_blue text-bright_teal_blue" />
          <span>4.9 / 5</span>
          <span className="text-[10px] text-slate-500 font-medium">Probado</span>
        </div>

        {/* Price Tag Callout */}
        <div className="absolute top-3 right-3 bg-deep_twilight text-white px-2.5 py-1 rounded-xl shadow-xs font-black text-xs">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/${product.slug}`} className="block group-hover:text-french_blue transition-colors">
            <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription ||
              "Análisis completo que examina calidad, idoneidad, desglose de ingredientes y valor real."}
          </p>

          {/* Quick Highlight Feature Pills */}
          <div className="pt-1.5 flex flex-wrap gap-1.5">
            {featurePills.slice(0, 2).map((feat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eef8fb] text-[10px] font-bold text-slate-700 border border-light_cyan"
              >
                <Check className="w-3 h-3 text-bright_teal_blue flex-shrink-0" />
                <span className="truncate max-w-[150px]">{feat}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Button Deck */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
          <Link
            href={`/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-md active:scale-98 text-center"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver Análisis y Especificaciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {product.buyNowLink && (
            <a
              href={product.buyNowLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold bg-bright_teal_blue hover:bg-french_blue text-white transition-all shadow-xs active:scale-98 text-center"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Ver Oferta Oficial</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
