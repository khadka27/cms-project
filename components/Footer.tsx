"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  Check,
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
  { label: "Catálogo de Productos", href: "/products" },
  { label: "Directorio de Ingredientes", href: "/ingredients" },
  { label: "Guías de Compra y Artículos", href: "/article" },
  { label: "Autores y Revisores", href: "/author" },
  { label: "Cómo Evaluamos Suplementos", href: "/legal/how-we-review" },
];

const categoryLinks = [
  { label: "Vitaminas y Minerales", href: "/products" },
  { label: "Magnesio y Biodisponibilidad", href: "/ingredients/magnesio-formas-suplementacion-cual-elegir" },
  { label: "Proteínas y Aminoácidos", href: "/products" },
  { label: "Probióticos y Salud Intestinal", href: "/products" },
  { label: "Nootrópicos y Enfoque Mental", href: "/products" },
  { label: "Longevidad y Bienestar", href: "/products" },
];

const transparencyAndLegalLinks = [
  { label: "Sobre Nosotros", href: "/about" },
  { label: "Divulgación de Afiliados", href: "/legal/affiliate" },
  { label: "Política de Privacidad", href: "/legal/privacy" },
  { label: "Términos de Uso", href: "/legal/terms" },
  { label: "Descargo de Responsabilidad de Salud", href: "/legal/disclaimer" },
  { label: "Transparencia Publicitaria", href: "/legal/advertising" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Centro de Contacto", href: "/contact" },
];

const socials = [
  { icon: TwitterIcon, label: "Twitter / X", href: "https://twitter.com/nutritionalreviews" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/nutritionalreviews" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/nutritionalreviews" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@nutritionalreviews" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || subscribing) return;
    setSubscribing(true);
    setSubscribeError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo procesar la suscripción");
      }

      setSubscribed(true);
      setSubscribeMessage(
        data.message ||
          "¡Bienvenido! Te hemos enviado un correo con las últimas revisiones y guías de salud."
      );
      setEmail("");
    } catch (err: any) {
      setSubscribeError(err.message || "Ocurrió un error al suscribirte. Inténtalo de nuevo.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#010226] text-slate-300 border-t border-french_blue/30">
      {/* Top accent gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-french_blue via-bright_teal_blue via-turquoise_surf to-french_blue" />

      {/* Decorative ambient lighting glows */}
      <div className="absolute -top-32 -left-20 w-[450px] h-[450px] rounded-full bg-turquoise_surf/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] rounded-full bg-deep_twilight-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] rounded-full bg-bright_teal_blue/5 blur-[110px] pointer-events-none" />

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 relative z-10">

        {/* ── 1. Premium Newsletter Banner (Pre-Footer) ── */}
        <section aria-labelledby="footer-newsletter-heading" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.05] border border-white/10 p-6 sm:p-8 lg:p-10 mb-14 backdrop-blur-md shadow-2xl">
          {/* Subtle inner decorative glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-turquoise_surf/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise_surf/15 border border-turquoise_surf/30 text-turquoise_surf text-xs font-bold tracking-wider uppercase mb-3.5">
                <Sparkles className="w-3.5 h-3.5 text-sky_aqua animate-pulse" />
                <span>Boletín de Investigación Clínica</span>
              </div>
              <h2 id="footer-newsletter-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Evidencia nutricional rigurosa y análisis de pureza directamente en tu correo
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Suscríbete para recibir mensualmente nuestras revisiones independientes de suplementos, análisis de biodisponibilidad y alertas sanitarias sin conflictos de interés ni patrocinios comerciales.
              </p>

              {/* Trust Checkmarks */}
              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-turquoise_surf flex-shrink-0" />
                  <span>Sin publicidad pagada ni marcas patrocinadas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-turquoise_surf flex-shrink-0" />
                  <span>Revisado por farmacéuticos y médicos</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-turquoise_surf flex-shrink-0" />
                  <span>Cancela tu suscripción en cualquier momento</span>
                </span>
              </div>
            </div>

            {/* Right Action Form */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-5 rounded-2xl bg-bright_teal_blue/20 border border-turquoise_surf/40 animate-in fade-in zoom-in-95 duration-300 shadow-inner">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-turquoise_surf flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-sky_aqua">¡Suscripción Confirmada!</h3>
                      <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                        {subscribeMessage || "Te hemos enviado la confirmación. Revisa tu bandeja de entrada para acceder a las últimas revisiones independientes."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3" id="newsletter-form">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (subscribeError) setSubscribeError("");
                        }}
                        placeholder="Introduce tu correo electrónico..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 hover:bg-white/[0.12] focus:bg-white/[0.15] border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-turquoise_surf/50 focus:border-turquoise_surf transition-all duration-200"
                        required
                      />
                    </div>
                    <button
                      id="newsletter-submit"
                      type="submit"
                      disabled={subscribing}
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-french_blue via-bright_teal_blue to-turquoise_surf hover:opacity-95 text-white shadow-lg shadow-french_blue/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {subscribing ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Verificando...</span>
                        </>
                      ) : (
                        <>
                          <span>Suscribirse</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  {subscribeError && (
                    <p className="text-xs text-rose-400 font-semibold px-1">{subscribeError}</p>
                  )}
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 px-1">
                    <Lock className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span>Tus datos están protegidos. Estricta política anti-spam según normativa de privacidad.</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 2. Symmetrical 12-Column Navigation Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

          {/* Column 1: Brand & E-E-A-T Authority (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5" aria-label="NutritionalReviews home">
              <img
                src="/logo.png"
                alt="NutritionalReviews logo"
                className="h-12 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-sky_aqua transition-colors duration-200">
                NutritionalReviews
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
              NutritionalReviews.org es un portal editorial independiente dedicado a la divulgación científica, análisis de pureza de formulaciones y comparativas rigurosas de suplementos nutricionales respaldadas por evidencia clínica y revisión médica colegiada.
            </p>

            {/* Contact & Location Badges */}
            <div className="space-y-2.5 mb-6 text-xs text-slate-400">
              <a
                href="mailto:reviewsnutritional@gmail.com"
                className="inline-flex items-center gap-2.5 hover:text-sky_aqua transition-colors duration-200 group"
              >
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-turquoise_surf group-hover:border-turquoise_surf/40 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>reviewsnutritional@gmail.com</span>
              </a>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span>Estados Unidos</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-turquoise_surf" />
                </div>
                <span className="text-slate-300 font-medium">Comité Editorial y Científico Independiente</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-french_blue/40 border border-white/10 hover:border-turquoise_surf/50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 shadow-sm active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explorar (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <Compass className="w-4 h-4 text-turquoise_surf" />
              <span>Explorar</span>
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categorías (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <Layers className="w-4 h-4 text-turquoise_surf" />
              <span>Categorías</span>
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Transparencia & Legal (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-5">
              <ShieldCheck className="w-4 h-4 text-turquoise_surf" />
              <span>Rigor y Legal</span>
            </h3>
            <ul className="space-y-3">
              {transparencyAndLegalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-sky_aqua hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── 3. Medical Disclaimer Card (E-E-A-T & Regulatory) ── */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 sm:p-5 mb-8 text-xs text-slate-400/90 leading-relaxed flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-turquoise_surf flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200 block mb-1">Aviso Médico y Responsabilidad Sanitaria:</span>
            La información publicada en NutritionalReviews.org tiene propósitos exclusivamente educativos, informativos y de divulgación científica. En ningún caso constituye asesoramiento médico personalizado, diagnóstico ni recomendación de tratamiento farmacológico. Consulte siempre a un médico, farmacéutico o profesional sanitario acreditado antes de iniciar cualquier pauta de suplementación dietética, especialmente si presenta patologías previas o consume medicación prescrita.
          </div>
        </div>

        {/* ── 4. Polished Bottom Bar ── */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} NutritionalReviews.org. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3 sm:gap-5 order-1 md:order-2 flex-wrap justify-center text-[11px] font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              <Lock className="w-3 h-3 text-turquoise_surf" />
              <span>Conexión Segura SSL 256-bit</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-turquoise_surf" />
              <span>Revisión Médica E-E-A-T</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              <Sparkles className="w-3 h-3 text-turquoise_surf" />
              <span>100% Independencia Editorial</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
