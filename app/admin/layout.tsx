"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard, FolderOpen, Layers, Package,
  ShoppingBag, ArrowLeft, Settings, LogOut, User,
  Menu, X, ChevronRight, UserCog, FlaskConical, Sparkles, FileText, MessageSquareQuote,
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

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full bg-[#010226] text-white select-none">
      {/* Brand */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-french_blue to-bright_teal_blue rounded-lg flex items-center justify-center shadow-md shadow-bright_teal_blue/30">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight text-white leading-tight">NutritionalReviews</p>
            <p className="text-[10px] text-sky_aqua uppercase tracking-widest font-semibold">Panel de Administración</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors md:hidden cursor-pointer" aria-label="Cerrar barra lateral">
            <X className="w-4 h-4 text-white/60" />
          </button>
        )}
      </div>

      {/* User */}
      {session?.user && (
        <div className="shrink-0 px-3 py-2 mx-3 mt-2.5 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-deep_twilight to-bright_teal_blue rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
              {session.user.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {session.user.name || session.user.email}
              </p>
              <p className="text-[10px] text-sky_aqua uppercase tracking-wider font-semibold">
                {(session.user as any)?.role || "Administrador"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 my-1.5">Navegación</p>
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                active
                  ? "bg-bright_teal_blue/20 text-white border border-turquoise_surf/35 shadow-xs font-semibold"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-sky_aqua" : item.color + " opacity-75 group-hover:opacity-100"}`} />
              <span className="flex-1 truncate">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-sky_aqua flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 mt-auto px-3 pb-3 space-y-0.5 border-t border-white/8 pt-2.5 bg-[#010226]">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-white/50 hover:bg-white/8 hover:text-white transition-all font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al Sitio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-white/50 hover:bg-red-500/15 hover:text-red-400 transition-all font-medium cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideSidebar = pathname === "/admin/login" || pathname?.startsWith("/admin/login");

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex bg-gradient-to-br from-[#eaf4f8] via-[#f0f8fb] to-[#e4f2f7] overflow-hidden z-30">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-full bg-[#010226] border-r border-french_blue/30 shadow-xl">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 z-10 bg-[#010226]">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir barra lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page title from nav */}
            <p className="text-sm font-bold text-gray-900">
              {navItems.find(n => n.href === pathname || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Admin"}
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-bright_teal_blue hover:bg-light_cyan/30 rounded-lg transition-colors border border-transparent hover:border-turquoise_surf/30"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ver Sitio
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
