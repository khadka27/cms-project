"use client";

import Fuse from "fuse.js";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BookOpen,
  LayoutGrid,
  ShoppingBag,
  Star,
} from "lucide-react";
import type { Product } from "@/lib/types";

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

const TRENDING_SEARCHES = [
  "Home Treadmill",
  "Cardio Equipment",
  "Supplements",
  "Fitness Gear",
  "Wellness",
];

export default function SearchBar({ onClose, autoFocus = true }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pre-fetch product database for instant sub-millisecond fuzzy matching
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: { products?: Product[] }) => {
        if (Array.isArray(data.products)) {
          setAllProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  // Initialize Fuse.js fuzzy search engine
  const fuse = useMemo(() => {
    return new Fuse(allProducts, {
      keys: [
        { name: "name", weight: 0.5 },
        { name: "subcategory.name", weight: 0.2 },
        { name: "subcategory.category.name", weight: 0.15 },
        { name: "shortDescription", weight: 0.1 },
        { name: "keyFeatures", weight: 0.05 },
      ],
      threshold: 0.45, // Typo-tolerant threshold
      distance: 100,
      minMatchCharLength: 1,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [allProducts]);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Perform instant fuzzy search on query change
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setHasSearched(true);

    if (allProducts.length > 0) {
      const searchResults = fuse.search(q);
      setResults(searchResults.map((res) => res.item).slice(0, 6));
    } else {
      setLoading(true);
      fetch("/api/products")
        .then((r) => r.json())
        .then((data: { products?: Product[] }) => {
          const prods = data.products || [];
          setAllProducts(prods);
          const tempFuse = new Fuse(prods, {
            keys: [
              { name: "name", weight: 0.55 },
              { name: "subcategory.name", weight: 0.25 },
              { name: "shortDescription", weight: 0.12 },
            ],
            threshold: 0.42,
            ignoreLocation: true,
            minMatchCharLength: 1,
          });
          setResults(tempFuse.search(q).map((res) => res.item).slice(0, 6));
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }
  }, [query, fuse, allProducts.length]);

  const handleSelectTrending = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* ── Search Input Field ── */}
      <div className="relative flex items-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-bright_teal_blue flex items-center justify-center pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products, reviews, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-24 py-4 rounded-2xl bg-[#eef8fb] border-2 border-turquoise_surf/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-french_blue/20 focus:border-french_blue transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
        />

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                setHasSearched(false);
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-400 bg-white border border-slate-200 shadow-xs">
              ESC
            </kbd>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer ml-1"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Content Area: Empty State vs Live Results ── */}
      <div className="mt-4 pt-3 border-t border-slate-100 max-h-[55vh] overflow-y-auto no-scrollbar">
        {/* State 1: When query is empty (Show Trending Searches & Quick Links) */}
        {!query.trim() && (
          <div className="space-y-5 py-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                <TrendingUp className="w-3.5 h-3.5 text-bright_teal_blue" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTrending(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eef8fb] hover:bg-light_cyan text-xs font-bold text-deep_twilight border border-light_cyan hover:border-turquoise_surf/50 transition-all cursor-pointer active:scale-95"
                  >
                    <Search className="w-3 h-3 text-bright_teal_blue" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                <Sparkles className="w-3.5 h-3.5 text-bright_teal_blue" />
                <span>Explore Sections</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href="/products"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#eef8fb] border border-slate-100 hover:border-turquoise_surf/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-light_cyan/40 text-french_blue flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-french_blue transition-colors">
                        All Products Catalog
                      </p>
                      <p className="text-[11px] text-slate-500">Browse verified reviews</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-french_blue group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  href="/article"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#eef8fb] border border-slate-100 hover:border-turquoise_surf/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-light_cyan/40 text-french_blue flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-french_blue transition-colors">
                        Buyer Guides & Articles
                      </p>
                      <p className="text-[11px] text-slate-500">Expert comparisons & tips</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-french_blue group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Loading Indicator */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 border-3 border-light_cyan border-t-french_blue rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold text-slate-500">Searching verified database...</p>
          </div>
        )}

        {/* State 3: Live Search Results */}
        {!loading && hasSearched && results.length > 0 && (
          <div className="space-y-1.5 py-1">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Matching Products ({results.length})
              </span>
              <span className="text-[11px] font-bold text-bright_teal_blue">
                Verified Reviews
              </span>
            </div>

            {results.map((product) => {
              const displayImage = product.featuredImage || product.image;
              return (
                <Link
                  key={product.id}
                  href={`/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:bg-[#eef8fb] border border-slate-100 hover:border-turquoise_surf/40 transition-all duration-200 group shadow-xs hover:shadow-md"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 flex items-center justify-center">
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        sizes="48px"
                      />
                    ) : (
                      <ShoppingBag className="w-5 h-5 text-bright_teal_blue/40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-french_blue transition-colors">
                        {product.name}
                      </h4>
                      {product.subcategory?.name && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-light_cyan/50 text-french_blue border border-frosted_blue/40 flex-shrink-0">
                          {product.subcategory.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {product.shortDescription || "Click to explore verified review and buyer notes"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-right flex-shrink-0">
                    <div>
                      <p className="text-sm font-black text-french_blue">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <Star className="w-2.5 h-2.5 fill-bright_teal_blue text-bright_teal_blue" />
                        <span className="text-[10px] font-bold text-slate-600">4.9</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-french_blue group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* State 4: No Results Found */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <div className="w-12 h-12 rounded-2xl bg-light_cyan/40 border border-turquoise_surf/30 flex items-center justify-center mx-auto mb-3 text-bright_teal_blue">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              No products found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try searching with general keywords like &ldquo;treadmill&rdquo;, &ldquo;fitness&rdquo;, or &ldquo;supplements&rdquo;.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-3 text-xs font-bold text-french_blue hover:underline cursor-pointer"
            >
              Clear search query
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
