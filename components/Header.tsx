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
  ChevronRight,
} from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  // Auto-hide navbar on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled status for glassmorphism border / shadow
      setScrolled(currentScrollY > 15);

      // Never auto-hide when mobile menu or search popover is open
      if (mobileOpen || searchOpen) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Always show navbar near the top of the page
      if (currentScrollY < 60) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Scroll direction check with buffer to prevent micro-jitter
      const delta = currentScrollY - lastScrollY;
      if (delta > 8) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (delta < -8) {
        // Scrolling up -> show navbar
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setMobileOpen(false);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full pt-2.5 sm:pt-4 pb-2 px-3 sm:px-6 lg:px-8 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0" : "-translate-y-[calc(100%+2rem)]"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* ── Floating Pill Navbar ── */}
          <div
            className={`relative bg-white/95 backdrop-blur-xl rounded-full border border-turquoise_surf/35 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-3.5 sm:px-8 py-2 sm:py-3 transition-all duration-300 ${
              scrolled
                ? "shadow-lg border-bright_teal_blue/40 bg-white/98"
                : ""
            }`}
          >
            <div className="flex items-center justify-between min-h-[44px] sm:min-h-[48px]">
              {/* ── Left Navigation: Article, Guide, About ── */}
              <div className="flex items-center gap-6 lg:gap-8 flex-1 justify-start">
                {/* Mobile Hamburger Toggle Button */}
                <button
                  id="mobile-menu-toggle"
                  onClick={() => {
                    setMobileOpen(!mobileOpen);
                    setSearchOpen(false);
                  }}
                  className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer ${
                    mobileOpen
                      ? "bg-french_blue text-white shadow-md shadow-french_blue/25"
                      : "bg-slate-50 hover:bg-light_cyan/50 text-slate-800 hover:text-french_blue border border-slate-200/80 shadow-xs"
                  }`}
                  aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-slate-800" />
                  )}
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[84px] md:h-[84px] rounded-full bg-white border-2 border-turquoise_surf/50 shadow-xl shadow-bright_teal_blue/20 ring-4 ring-white flex items-center justify-center p-1.5 sm:p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-bright_teal_blue group-hover:shadow-bright_teal_blue/35 cursor-pointer">
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
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer ${
                    searchOpen
                      ? "bg-french_blue text-white shadow-md shadow-french_blue/25 scale-105"
                      : "text-slate-700 hover:text-bright_teal_blue hover:bg-light_cyan/40 bg-slate-50 sm:bg-transparent border border-slate-200/80 sm:border-transparent"
                  }`}
                  aria-label={searchOpen ? "Close search" : "Search products"}
                >
                  {searchOpen ? (
                    <X className="w-4.5 h-4.5 animate-in spin-in-90 duration-200" />
                  ) : (
                    <Search className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── Floating Search Bar Popover With Smooth Open/Close Animation ── */}
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              searchOpen
                ? "max-h-[720px] opacity-100 scale-100 translate-y-0 mt-3 pointer-events-auto"
                : "max-h-0 opacity-0 scale-95 -translate-y-3 mt-0 pointer-events-none"
            }`}
          >
            <div className="w-full max-w-2xl mx-auto bg-white/98 backdrop-blur-2xl rounded-3xl border-2 border-turquoise_surf/35 shadow-2xl shadow-french_blue/15 p-4 sm:p-5">
              <SearchBar onClose={() => setSearchOpen(false)} autoFocus={searchOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Search Backdrop Blur Scrim ── */}
      <div
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSearchOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Side Drawer With Silky CSS Slide Transitions ── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Scrim */}
        <div
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-[310px] max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Drawer Top Solid Accent */}
          <div className="h-1.5 w-full bg-french_blue flex-shrink-0" />

          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border border-turquoise_surf/40 p-1 flex items-center justify-center bg-light_cyan/20 shadow-xs">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block font-black text-slate-900 text-sm tracking-tight leading-tight">
                  OfficialProductsLab
                </span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Verified Product Hub
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Quick Search Trigger inside Drawer */}
            <div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#eef8fb] hover:bg-light_cyan/40 border border-turquoise_surf/35 text-slate-700 text-xs font-semibold transition-all group shadow-xs active:scale-98"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-french_blue group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-slate-600">Search products, guides...</span>
                </div>
                <span className="text-[10px] font-extrabold text-french_blue bg-white px-2 py-0.5 rounded-lg border border-light_cyan shadow-xs">
                  ⌘K
                </span>
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="space-y-1">
              <p className="px-2 pb-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Menu
              </p>
              {[
                { href: "/products", label: "Products Catalog", icon: LayoutGrid, desc: "Explore all verified reviews" },
                { href: "/article", label: "Buyer Guides & Articles", icon: BookOpen, desc: "Expert tips & analysis" },
                { href: "/about", label: "About Our Lab", icon: Info, desc: "Editorial review process" },
                { href: "/contact", label: "Contact Us", icon: Mail, desc: "Inquiries & support" },
              ].map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#eef8fb] border border-transparent hover:border-turquoise_surf/30 text-slate-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-light_cyan/40 text-french_blue flex items-center justify-center flex-shrink-0 group-hover:bg-french_blue group-hover:text-white transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-french_blue transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-french_blue group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>

            {/* Quick Category Jump Chips */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between px-2 mb-2.5">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Popular Categories
                </span>
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold text-french_blue hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Smart Tech", href: "/products" },
                  { name: "Home Living", href: "/products" },
                  { name: "Wellness & Health", href: "/products" },
                  { name: "Fitness Gear", href: "/products" },
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-light_cyan/40 text-xs font-bold text-slate-700 hover:text-french_blue border border-slate-200/70 hover:border-turquoise_surf/40 text-center transition-all truncate"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2 flex-shrink-0">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-french_blue hover:bg-deep_twilight text-white transition-all shadow-md active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Full Catalog</span>
            </Link>
            <p className="text-center text-[10px] text-slate-400">
              Official Products Lab • 100% Independent Reviews
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
