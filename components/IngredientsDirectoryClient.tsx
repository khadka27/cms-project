"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  FlaskConical,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  Zap,
  Leaf,
  Filter,
  X,
  BookOpen,
} from "lucide-react";

export interface IngredientItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  keyFeatures: string | null;
  image: string | null;
  imageAlt: string | null;
  productCount: number;
}

interface Props {
  initialIngredients: IngredientItem[];
}

export default function IngredientsDirectoryClient({ initialIngredients }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("TODOS");

  // Available first letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    initialIngredients.forEach((ing) => {
      const first = (ing.name || "").trim().charAt(0).toUpperCase();
      if (/[A-ZÁÉÍÓÚÑ]/.test(first)) {
        // Normalize accented letters to base for grouping
        const normalized = first.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        letters.add(normalized);
      }
    });
    return Array.from(letters).sort();
  }, [initialIngredients]);

  // Filtered ingredients
  const filtered = useMemo(() => {
    return initialIngredients.filter((ing) => {
      // 1. Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = ing.name?.toLowerCase().includes(query);
        const descMatch = ing.description?.toLowerCase().includes(query);
        const featMatch = ing.keyFeatures?.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !featMatch) return false;
      }

      // 2. Letter filter
      if (selectedLetter !== "TODOS") {
        const first = (ing.name || "")
          .trim()
          .charAt(0)
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (first !== selectedLetter) return false;
      }

      return true;
    });
  }, [initialIngredients, searchTerm, selectedLetter]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, nutriente o beneficio (ej. Cúrcuma, Magnesio, Omega-3)…"
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent bg-slate-50/50 hover:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result counter pill */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3.5 py-2 rounded-xl shrink-0">
            <FlaskConical className="w-4 h-4 text-french_blue" />
            <span>
              {filtered.length}{" "}
              {filtered.length === 1 ? "ingrediente encontrado" : "ingredientes encontrados"}
            </span>
          </div>
        </div>

        {/* Letter Navigation Pills */}
        {availableLetters.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar:
              </span>
              <button
                type="button"
                onClick={() => setSelectedLetter("TODOS")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedLetter === "TODOS"
                    ? "bg-french_blue text-white shadow-xs scale-105"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Todos
              </button>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    selectedLetter === letter
                      ? "bg-french_blue text-white shadow-xs scale-105"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Ingredients */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((ing) => {
            const features = ing.keyFeatures
              ? ing.keyFeatures
                  .split("\n")
                  .map((f) => f.trim())
                  .filter(Boolean)
                  .slice(0, 3)
              : [];

            return (
              <Link
                key={ing.id}
                href={`/ingredients/${ing.slug}`}
                className="group relative bg-white hover:bg-slate-50/60 rounded-3xl border border-slate-200/80 hover:border-bright_teal_blue/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Brand glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-french_blue via-bright_teal_blue to-turquoise_surf opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Thumbnail / Image Showcase */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-[#f0f9fb] to-[#e6f4f8] overflow-hidden border-b border-slate-100 flex items-center justify-center">
                    {ing.image ? (
                      <Image
                        src={ing.image}
                        alt={ing.imageAlt || ing.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:text-bright_teal_blue transition-colors">
                        <div className="w-16 h-16 rounded-2xl bg-white/80 border border-light_cyan flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                          <FlaskConical className="w-8 h-8 text-french_blue" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">
                          Principio Activo
                        </span>
                      </div>
                    )}

                    {/* Verified Evidence Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-french_blue border border-light_cyan/80 shadow-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-bright_teal_blue" />
                      <span>Evidencia Clínica</span>
                    </div>

                    {/* Product Count Pill */}
                    {ing.productCount > 0 && (
                      <div className="absolute top-3 right-3 bg-deep_twilight/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white shadow-xs">
                        {ing.productCount} {ing.productCount === 1 ? "producto" : "productos"}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-french_blue transition-colors leading-snug line-clamp-1">
                        {ing.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1.5">
                        {ing.description ||
                          "Compuesto nutricional investigado por pureza, farmacocinética, tolerancia y mecanismos fisiológicos de acción."}
                      </p>
                    </div>

                    {/* Features list */}
                    {features.length > 0 && (
                      <div className="pt-2 border-t border-slate-100/80 space-y-1.5">
                        {features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 text-xs text-slate-600"
                          >
                            <Check className="w-3.5 h-3.5 text-bright_teal_blue mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-french_blue group-hover:text-bright_teal_blue transition-colors">
                  <span>Ver Perfil Científico</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-light_cyan/50 text-french_blue mx-auto flex items-center justify-center">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No se encontraron ingredientes con ese criterio
          </h3>
          <p className="text-sm text-slate-500">
            {searchTerm
              ? `No hay resultados para "${searchTerm}". Intente con otro término o restablezca los filtros.`
              : "Actualmente no hay ingredientes registrados para esta letra."}
          </p>
          {(searchTerm || selectedLetter !== "TODOS") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedLetter("TODOS");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-french_blue text-white text-xs font-bold hover:bg-deep_twilight transition-all cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}

