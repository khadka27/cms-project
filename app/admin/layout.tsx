"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Layers,
  Package,
  ShoppingBag,
  ArrowLeft,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UserCog,
  FlaskConical,
  Sparkles,
  FileText,
  MessageSquareQuote,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { label: "Panel Principal",     href: "/admin",                icon: LayoutDashboard, color: "text-sky_aqua" },
  { label: "Categorías",          href: "/admin/categories",     icon: FolderOpen,      color: "text-turquoise_surf" },
  { label: "Subcategorías",       href: "/admin/subcategories",  icon: Layers,          color: "text-bright_teal_blue" },
  { label: "Ingredientes",        href: "/admin/ingredients",    icon: FlaskConical,    color: "text-blue_green" },
  { label: "Productos",           href: "/admin/products",       icon: Package,         color: "text-sky_aqua" },
  { label: "Autores",             href: "/admin/authors",        icon: UserCog,         color: "text-frosted_blue" },
  { label: "Artículos",           href: "/admin/articles",       icon: FileText,        color: "text-turquoise_surf" },
  { label: "Artículos SEO",       href: "/admin/seo-article",    icon: Sparkles,        color: "text-sky_aqua" },
  { label: "Testimonios",         href: "/admin/testimonials",   icon: MessageSquareQuote, color: "text-light_cyan" },
  { label: "Ajustes de Portada",  href: "/admin/hero-settings",  icon: Settings,        color: "text-bright_teal_blue" },
  { label: "Cuenta",              href: "/admin/settings",       icon: UserCog,         color: "text-sky_aqua" },
];

function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
}: {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full bg-[#010226] text-white select-none relative">
      {/* Brand */}
      <div className={`shrink-0 flex items-center border-b border-white/8 ${collapsed ? "justify-center p-3.5" : "justify-between px-4 py-3.5"}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-french_blue to-bright_teal_blue rounded-lg flex items-center justify-center shadow-md shadow-bright_teal_blue/30 flex-shrink-0">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm tracking-tight text-white leading-tight truncate">NutritionalReviews</p>
              <p className="text-[10px] text-sky_aqua uppercase tracking-widest font-semibold truncate">Panel de Administración</p>
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors md:hidden cursor-pointer"
            aria-label="Cerrar barra lateral"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        )}
      </div>

      {/* User */}
      {session?.user && (
        <div className={`shrink-0 rounded-xl bg-white/5 border border-white/8 ${collapsed ? "p-2 mx-2.5 my-2.5 flex justify-center" : "px-3 py-2 mx-3 mt-2.5"}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-7 h-7 bg-gradient-to-br from-deep_twilight to-bright_teal_blue rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-xs"
              title={session.user.name || session.user.email || ""}
            >
              {session.user.name?.charAt(0) || "A"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate leading-tight">
                  {session.user.name || session.user.email}
                </p>
                <p className="text-[10px] text-sky_aqua uppercase tracking-wider font-semibold truncate">
                  {(session.user as any)?.role || "Administrador"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className={`flex-1 min-h-0 overflow-y-auto space-y-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${collapsed ? "px-2 py-2" : "px-3 py-2.5"}`}>
        {!collapsed && (
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 my-1.5">Navegación</p>
        )}
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center rounded-xl font-medium transition-all duration-150 relative ${
                collapsed
                  ? "justify-center p-2.5 text-[13px]"
                  : "gap-2.5 px-3 py-2 text-[13px]"
              } ${
                active
                  ? "bg-bright_teal_blue/20 text-white border border-turquoise_surf/35 shadow-xs font-semibold"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-sky_aqua" : item.color + " opacity-75 group-hover:opacity-100"}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-sky_aqua flex-shrink-0" />}
                </>
              )}

              {/* Tooltip on collapsed desktop view */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#010226] border border-white/20 text-white text-xs font-semibold whitespace-nowrap shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`shrink-0 mt-auto space-y-1 border-t border-white/8 bg-[#010226] ${collapsed ? "p-2" : "px-3 pb-3 pt-2.5"}`}>
        <Link
          href="/"
          onClick={onClose}
          title={collapsed ? "Volver al Sitio" : undefined}
          className={`flex items-center rounded-xl text-xs text-white/50 hover:bg-white/8 hover:text-white transition-all font-medium relative group ${
            collapsed ? "justify-center p-2" : "gap-2.5 px-3 py-1.5"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span>Volver al Sitio</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#010226] border border-white/20 text-white text-xs font-semibold whitespace-nowrap shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              Volver al Sitio
            </div>
          )}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          title={collapsed ? "Cerrar Sesión" : undefined}
          className={`w-full flex items-center rounded-xl text-xs text-white/50 hover:bg-red-500/15 hover:text-red-400 transition-all font-medium cursor-pointer relative group ${
            collapsed ? "justify-center p-2" : "gap-2.5 px-3 py-1.5"
          }`}
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span>Cerrar Sesión</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#010226] border border-white/20 text-white text-xs font-semibold whitespace-nowrap shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              Cerrar Sesión
            </div>
          )}
        </button>

        {/* Desktop Collapse / Expand Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
            className={`w-full hidden md:flex items-center rounded-xl text-xs text-white/40 hover:bg-white/8 hover:text-white transition-all font-medium cursor-pointer border-t border-white/5 pt-1.5 ${
              collapsed ? "justify-center p-2" : "gap-2 px-3 py-1.5"
            }`}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            ) : (
              <>
                <PanelLeftClose className="w-3.5 h-3.5" />
                <span>Colapsar</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Load user's sidebar preference safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nr_admin_sidebar_collapsed");
      if (saved !== null) {
        setCollapsed(saved === "true");
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("nr_admin_sidebar_collapsed", String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Automatically close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hideSidebar = pathname === "/admin/login" || pathname?.startsWith("/admin/login");

  if (hideSidebar) {
    return <>{children}</>;
  }

  const currentNav = navItems.find(
    (n) => n.href === pathname || (n.href !== "/admin" && pathname.startsWith(n.href))
  );

  return (
    <div className="fixed inset-0 flex bg-gradient-to-br from-[#eaf4f8] via-[#f0f8fb] to-[#e4f2f7] overflow-hidden z-30">
      {/* Desktop / Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 h-full bg-[#010226] border-r border-french_blue/30 shadow-xl transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-56 lg:w-64"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
      </aside>

      {/* Mobile Drawer (with smooth slide and backdrop transition) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] z-10 bg-[#010226] shadow-2xl transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="shrink-0 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir barra lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop/Tablet Collapse Toggle */}
            <button
              className="hidden md:flex p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={toggleCollapse}
              title={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
              aria-label="Alternar barra lateral"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Current Section Title */}
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {currentNav?.label || "Panel"}
              </p>
            </div>
          </div>

          {/* Quick actions: icons on mobile, icon + text on tablet/desktop */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-bright_teal_blue hover:bg-light_cyan/30 rounded-xl transition-colors border border-gray-200/70 hover:border-turquoise_surf/30 shadow-2xs"
              title="Ver sitio web"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Sitio</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-200/70 hover:border-red-200 shadow-2xs cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
