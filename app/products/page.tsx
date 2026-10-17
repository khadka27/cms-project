"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import Pagination from "@/components/Pagination";
import { PackageSearch, Filter, List, LayoutGrid } from "lucide-react";
import type { Product } from "@/lib/types";

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
      {/* Header */}
      <section className="relative bg-[#010226] py-14 sm:py-20 overflow-hidden border-b border-french_blue/30">
        {/* Decorative elements matching the ocean theme */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-french_blue" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-bright_teal_blue/20 flex items-center justify-center mb-5 sm:mb-6 ring-1 ring-turquoise_surf/30 backdrop-blur-md">
              <PackageSearch className="w-6 h-6 text-sky_aqua" />
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3 sm:mb-4">
              Explore Our <span className="text-sky_aqua">Products</span>
            </h1>
            <p className="text-slate-300 max-w-2xl text-xs sm:text-base leading-relaxed">
              Discover our curated selection of premium products, 
              designed for maximum style, function, and efficacy.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-[2rem] border border-light_cyan shadow-sm">
          {/* Results count (left) */}
          <div className="hidden sm:block">
            <p className="text-xs font-extrabold text-bright_teal_blue uppercase tracking-widest px-2">
              {pagination.total} Results
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-between sm:justify-end">
            <p className="sm:hidden text-xs font-extrabold text-bright_teal_blue uppercase tracking-widest pl-1">
              {pagination.total} Results
            </p>

            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-french_blue text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" /> <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-french_blue text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">Grid</span>
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
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
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
