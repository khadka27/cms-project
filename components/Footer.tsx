"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Compass,
  Layers,
  BookOpen,
} from "lucide-react";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.667.417-1.667 1.623v2.367h3.818l-.513 3.667h-3.305v7.98z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const exploreLinks = [
  { label: "Análisis de Productos", href: "/products" },
  { label: "Categorías de Productos", href: "/products" },
  { label: "Últimos Productos", href: "/products" },
  { label: "Guías de Compra", href: "/article" },
  { label: "Páginas Destacadas", href: "/products" },
];

const categoryLinks = [
  { label: "Productos Automotrices", href: "/products" },
  { label: "Belleza y Cuidado Personal", href: "/products" },
  { label: "Bienestar y Estilo de Vida", href: "/products" },
  { label: "Hogar y Cocina", href: "/products" },
  { label: "Tecnología y Gadgets", href: "/products" },
];

const companyLinks = [
  { label: "Sobre Nosotros", href: "/about" },
  { label: "Contáctenos", href: "/contact" },
  { label: "Proceso Editorial", href: "/legal/editorial" },
  { label: "Cómo Analizamos Productos", href: "/legal/how-we-review" },
];

const legalLinks = [
  { label: "Divulgación de Afiliados", href: "/legal/affiliate" },
  { label: "Política de Privacidad", href: "/legal/privacy" },
  { label: "Términos de Uso", href: "/legal/terms" },
  { label: "Descargo de Responsabilidad de Salud", href: "/legal/disclaimer" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Divulgación de Publicidad", href: "/legal/advertising" },
  { label: "Política de Correcciones", href: "/legal/corrections" },
  { label: "Política de Enlaces Externos", href: "/legal/external-links" },
];

const socials = [
  { icon: TwitterIcon, label: "Twitter / X", href: "#", color: "hover:bg-slate-700" },
  { icon: InstagramIcon, label: "Instagram", href: "#", color: "hover:bg-slate-700" },
  { icon: FacebookIcon, label: "Facebook", href: "#", color: "hover:bg-slate-700" },
  { icon: YoutubeIcon, label: "YouTube", href: "#", color: "hover:bg-slate-700" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribed(true);
      setSubscribing(false);
    }, 800);
  };

  return (
    <footer className="relative overflow-hidden bg-[#010226] text-slate-300 border-t border-french_blue/30">
      {/* Top ocean accent line */}
      <div className="h-1 w-full bg-french_blue" />

      {/* Decorative ocean gradient ambient glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-turquoise_surf/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-deep_twilight-600/25 blur-3xl pointer-events-none" />

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">

          {/* Brand column (wider) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5" aria-label="NutritionalReviews home">
              <img
                src="/logo.png"
                alt="NutritionalReviews logo"
                className="h-12 sm:h-14 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-bold text-white text-base tracking-tight group-hover:text-sky_aqua transition-colors duration-200">
                NutritionalReviews
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Nutritional Reviews es un centro de información de productos que ayuda a los compradores a descubrir productos destacados de salud y nutrición mediante análisis claros, guías por categoría, notas para compradores y páginas especializadas de información de productos.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <a
                href="mailto:reviewsnutritional@gmail.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-sky_aqua transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-turquoise_surf transition-colors" />
                reviewsnutritional@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                Estados Unidos
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-transparent transition-all duration-200 hover:bg-french_blue shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <Compass className="w-3.5 h-3.5 text-turquoise_surf" />
              Explorar
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua transition-colors duration-200 hover:pl-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories links */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <Layers className="w-3.5 h-3.5 text-turquoise_surf" />
              Categorías
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {categoryLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua transition-colors duration-200 hover:pl-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal links */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <BookOpen className="w-3.5 h-3.5 text-turquoise_surf" />
              Empresa
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua transition-colors duration-200 hover:pl-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-3">
              Legal
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {legalLinks.slice(0, 2).map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua transition-colors duration-200 hover:pl-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-2">
              <Mail className="w-3.5 h-3.5 text-turquoise_surf" />
              Recibir Actualizaciones de Investigación
            </h3>
            <p className="text-sm text-slate-400 mb-4 sm:mb-5 leading-relaxed">
              Suscríbase para recibir nuevos análisis de productos, guías de compra y novedades de categorías de Nutritional Reviews.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-bright_teal_blue/15 border border-turquoise_surf/30">
                <CheckCircle className="w-5 h-5 text-turquoise_surf flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-sky_aqua">¡Bienvenido!</p>
                  <p className="text-xs text-slate-400">Revisa tu bandeja de entrada pronto.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5" id="newsletter-form">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-turquoise_surf/40 focus:border-turquoise_surf/50 transition-all duration-200"
                    required
                  />
                </div>
                <button
                  id="newsletter-submit"
                  type="submit"
                  disabled={subscribing}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-french_blue hover:bg-bright_teal_blue text-white shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                >
                  {subscribing ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Suscribirse <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Sin spam. Puedes cancelar tu suscripción en cualquier momento.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 order-2 sm:order-1">
            © {new Date().getFullYear()} NutritionalReviews. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 order-1 sm:order-2 flex-wrap justify-center">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-slate-500 hover:text-sky_aqua transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
