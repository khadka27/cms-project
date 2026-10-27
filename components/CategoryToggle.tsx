"use client";

import { useCategoryContext } from "@/context/CategoryContext";
import type { CategoryType } from "@/lib/types";

export default function CategoryToggle() {
  const { activeCategory, setActiveCategory } = useCategoryContext();

  const options: { label: string; value: CategoryType }[] = [
    { label: "Suplemento", value: "nutra" },
    { label: "Producto", value: "ecom" },
  ];

  return (
    <div className="flex w-full sm:w-auto rounded-2xl p-1 bg-light_cyan/30 border border-turquoise_surf/30 shadow-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setActiveCategory(opt.value)}
          className={`flex-1 sm:flex-none px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeCategory === opt.value
              ? opt.value === "nutra"
                ? "bg-gradient-to-r from-deep_twilight to-french_blue text-white shadow-md shadow-deep_twilight/20"
                : "bg-gradient-to-r from-french_blue to-bright_teal_blue text-white shadow-md shadow-bright_teal_blue/20"
              : "text-slate-600 hover:text-deep_twilight hover:bg-white/80"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
