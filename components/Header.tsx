"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  BookOpen,
  LayoutGrid,
  Info,
  Mail,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 pb-2 px-3 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          {/* ── Floating Pill Navbar ── */}
          <div
            className={`relative bg-white/95 backdrop-blur-xl rounded-full border border-turquoise_surf/35 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 ${
              scrolled
                ? "shadow-lg border-bright_teal_blue/40 bg-white/98"
                : ""
            }`}
          >
            <div className="flex items-center justify-between min-h-[44px] sm:min-h-[48px]">
              {/* ── Left Navigation: Article, Guide, About ── */}
              <div className="flex items-center gap-6 lg:gap-8 flex-1 justify-start">
                {/* Mobile Hamburger Toggle */}
                <button
                  id="mobile-menu-toggle"
                  onClick={() => {
                    setMobileOpen(!mobileOpen);
                    setSearchOpen(false);
                  }}
                  className="md:hidden p-2 -ml-1 text-slate-700 hover:text-bright_teal_blue hover:bg-light_cyan/40 rounded-full transition-colors cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Desktop Left Links: Article, Guide, About */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Left navigation">
                  <Link
                    href="/article"
                    className="text-[15px] font-bold text-slate-800 hover:text-bright_teal_blue transition-colors duration-200 tracking-tight"
                  >
                    Article
                  </Link>
                  <Link
                    href="/article"
                    className="text-[15px] font-bold text-slate-800 hover:text-bright_teal_blue transition-colors duration-200 tracking-tight"
                  >
                    Guide
                  </Link>
                  <Link
                    href="/about"
                    className="text-[15px] font-bold text-slate-800 hover:text-bright_teal_blue transition-colors duration-200 tracking-tight"
                  >
                    About
                  </Link>
                </nav>
              </div>

              {/* ── Center: Circular Protruding Logo Badge ── */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <Link
                  href="/"
                  className="block group"
                  aria-label="OfficialProductsLab Home"
                >
                  <div className="w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-full bg-white border-2 border-turquoise_surf/50 shadow-xl shadow-bright_teal_blue/20 ring-4 ring-white flex items-center justify-center p-1.5 sm:p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-bright_teal_blue group-hover:shadow-bright_teal_blue/35 cursor-pointer">
                    <img
                      src="/logo.png"
                      alt="OfficialProductsLab logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* ── Right Navigation: Products, Contact, Search ── */}
              <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-end">
                <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Right navigation">
                  <Link
                    href="/products"
                    className="text-[15px] font-bold text-slate-800 hover:text-bright_teal_blue transition-colors duration-200 tracking-tight"
                  >
                    Products
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[15px] font-bold text-slate-800 hover:text-bright_teal_blue transition-colors duration-200 tracking-tight"
                  >
                    Contact
                  </Link>
                </nav>

                {/* Search Toggle Button */}
                <button
                  id="search-toggle"
                  onClick={() => {
                    setSearchOpen(!searchOpen);
                    setMobileOpen(false);
                  }}
                  className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                    searchOpen
                      ? "bg-bright_teal_blue text-white shadow-md shadow-bright_teal_blue/20"
                      : "text-slate-700 hover:text-bright_teal_blue hover:bg-light_cyan/40"
                  }`}
                  aria-label="Search products"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Floating Search Bar Popover ── */}
          {searchOpen && (
            <div className="mt-3 w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-turquoise_surf/35 shadow-2xl shadow-bright_teal_blue/10 p-3 sm:p-4 animate-in fade-in zoom-in-95 duration-200">
              <SearchBar />
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile Side Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Drawer Top Solid Bar */}
            <div className="h-1 w-full bg-french_blue" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full border border-turquoise_surf/30 p-1 flex items-center justify-center bg-light_cyan/20">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                  OfficialProductsLab
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Mobile navigation">
              <p className="px-3 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Navigation
              </p>
              <Link
                href="/article"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-light_cyan/40 text-slate-800 font-bold text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4 text-bright_teal_blue" />
                Article
              </Link>
              <Link
                href="/article"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-light_cyan/40 text-slate-800 font-bold text-sm transition-colors"
              >
                <Sparkles className="w-4 h-4 text-bright_teal_blue" />
                Guide
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-light_cyan/40 text-slate-800 font-bold text-sm transition-colors"
              >
                <Info className="w-4 h-4 text-bright_teal_blue" />
                About
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-light_cyan/40 text-slate-800 font-bold text-sm transition-colors"
              >
                <LayoutGrid className="w-4 h-4 text-bright_teal_blue" />
                Products
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-light_cyan/40 text-slate-800 font-bold text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-bright_teal_blue" />
                Contact
              </Link>
            </nav>

            {/* Drawer Bottom CTA */}
            <div className="p-4 border-t border-slate-100">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                Explore All Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
