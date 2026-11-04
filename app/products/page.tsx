"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import Pagination from "@/components/Pagination";
import { PackageSearch, Filter, List, LayoutGrid, Star, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState<string>("ecom");

  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    setLoading(true);
    const typeQuery = activeType ? `&type=${activeType}` : "";
    fetch(`/api/products?page=${page}&limit=12${typeQuery}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, activeType]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#eef8fb]">
      {/* Dynamic SEO Schemas */}
      <CollectionPageSchema
        name="Catálogo de Productos y Suplementos"
        description="Descubra nuestra selección de suplementos nutricionales y productos de salud analizados rigurosamente."
        url={`${SITE_URL}/products`}
        items={products.map((p) => ({
          name: p.name,
          url: `${SITE_URL}/${p.slug}`,
          image: p.image || undefined,
          price: p.price,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Productos", url: `${SITE_URL}/products` },
        ]}
      />

      {/* Header: Two-Column Hero with Title/Description on Left & Product Spotlight Card on Right */}
      <section className="relative bg-[#010226] py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-french_blue/30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <PackageSearch className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Catálogo de Suplementos y Nutracéuticos</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Explore Nuestros{" "}
                <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                  Productos
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Descubra nuestra selección de reseñas y análisis de suplementos populares, 
                organizados para ayudarle a contrastar ingredientes, evidencia disponible y precios antes de comprar.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Fórmulas y Pureza Verificadas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Criterio Editorial Imparcial</span>
                </span>
              </div>
            </div>

            {/* Right Box: Featured Product Spotlight Card */}
            {products.length > 0 && products[0] && (
              <div className="lg:col-span-5">
                <Link
                  href={`/${products[0].slug}`}
                  className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                  <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                    {/* Circular Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-white ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all flex items-center justify-center p-2">
                      {products[0].image ? (
                        <img
                          src={products[0].image}
                          alt={products[0].name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <PackageSearch className="w-8 h-8 text-french_blue" />
                      )}
                    </div>

                    {/* Right text lines */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                          Producto Destacado
                        </span>
                        {products[0].price > 0 && (
                          <span className="text-[11px] text-amber-300 font-bold">
                            ${products[0].price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors line-clamp-2 leading-snug">
                        {products[0].name}
                      </h2>

                      {products[0].shortDescription && (
                        <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                          {products[0].shortDescription}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                        <span>Ver análisis y precios</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-[2rem] border border-light_cyan shadow-sm">
          {/* Results count (left) */}
          <div className="hidden sm:block">
            <p className="text-xs font-extrabold text-bright_teal_blue uppercase tracking-widest px-2">
              {pagination.total} Resultados
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-between sm:justify-end">
            <p className="sm:hidden text-xs font-extrabold text-bright_teal_blue uppercase tracking-widest pl-1">
              {pagination.total} Resultados
            </p>

            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-french_blue text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
                title="Vista Lista"
              >
                <List className="w-4 h-4" /> <span className="hidden sm:inline">Lista</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-french_blue text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
                title="Vista Cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">Cuadrícula</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={viewMode === "list" ? "h-40 bg-slate-100 rounded-2xl animate-pulse" : "h-80"}>
                {viewMode === "grid" && <SkeletonCard />}
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageSearch className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No se encontraron productos</h3>
            <p className="text-slate-500 mt-2">Intente ajustar sus filtros o términos de búsqueda.</p>
          </div>
        ) : (
          <div className={viewMode === "list" ? "flex flex-col gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant={viewMode} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-[#eef8fb]" />}>
      <ProductsContent />
    </Suspense>
  );
}
