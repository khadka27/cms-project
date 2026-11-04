import type { Metadata } from "next";
import Link from "next/link";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  Lock,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const metadata: Metadata = {
  title: "Información Legal y Políticas | NutritionalReviews.org",
  description:
    "Consulte las políticas legales, privacidad, términos de uso, descargo de salud y divulgación de afiliados de NutritionalReviews.org.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal",
  },
};

const legalPages = [
  {
    title: "Política de Privacidad",
    description: "Cómo recopilamos, utilizamos y protegemos sus datos personales y sus derechos.",
    href: "/legal/privacy",
    primary: true,
  },
  {
    title: "Términos de Uso",
    description: "Reglas, condiciones y límites de responsabilidad para el uso de NutritionalReviews.",
    href: "/legal/terms",
    primary: true,
  },
  {
    title: "Descargo de Responsabilidad de Salud",
    description: "Aviso legal sobre contenido informativo, suplementos alimenticios y consulta profesional.",
    href: "/legal/disclaimer",
    primary: true,
  },
  {
    title: "Divulgación de Afiliados",
    description: "Transparencia sobre enlaces de compra, comisiones y nuestra independencia editorial.",
    href: "/legal/affiliate",
    primary: true,
  },
  {
    title: "Política de Cookies",
    description: "Qué cookies empleamos, herramientas de análisis y cómo gestionar sus preferencias.",
    href: "/legal/cookies",
    primary: true,
  },
  {
    title: "Divulgación de Publicidad",
    description: "Transparencia publicitaria, anuncios de terceros y estándares comerciales.",
    href: "/legal/advertising",
    primary: false,
  },
  {
    title: "Política de Correcciones",
    description: "Cómo gestionamos rectificaciones, actualizaciones de datos y fe de erratas.",
    href: "/legal/corrections",
    primary: false,
  },
  {
    title: "Proceso Editorial",
    description: "Nuestros estándares editoriales, verificación y rigor en análisis de salud.",
    href: "/legal/editorial",
    primary: false,
  },
  {
    title: "Enlaces Externos",
    description: "Pautas de navegación respecto a tiendas oficiales y enlaces a terceros.",
    href: "/legal/external-links",
    primary: false,
  },
  {
    title: "Cómo Evaluamos Productos",
    description: "Nuestra metodología de análisis, despiece de fórmulas y criterios de valoración.",
    href: "/legal/how-we-review",
    primary: false,
  },
  {
    title: "Política de Reembolso",
    description: "Pautas sobre devoluciones y atención al cliente en tiendas de fabricantes.",
    href: "/legal/refunds",
    primary: false,
  },
  {
    title: "Política de Envíos",
    description: "Directrices generales sobre plazos de entrega y logística de terceros.",
    href: "/legal/shipping",
    primary: false,
  },
];

export default function LegalIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24">
      <CollectionPageSchema
        name="Políticas Legales y Transparencia Editorial"
        description="Consulte las políticas legales, privacidad, términos de uso, descargo de salud y divulgación de afiliados de NutritionalReviews.org."
        url={`${SITE_URL}/legal`}
        items={legalPages.map((p) => ({
          name: p.title,
          url: `${SITE_URL}${p.href}`,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Legal", url: `${SITE_URL}/legal` },
        ]}
      />

      {/* Hero Header: Two-Column Hero with Title/Description on Left & Spotlight Card on Right */}
      <section className="relative bg-[#010226] py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-french_blue/30 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-turquoise_surf/15 blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-deep_twilight-600/30 blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep_twilight via-bright_teal_blue to-turquoise_surf" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <nav className="flex items-center gap-1.5 text-xs text-light_cyan/70 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Legal y Políticas</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <Scale className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Marco Normativo y Transparencia</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Políticas Legales y{" "}
                <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                  Transparencia
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Consulte las políticas y directrices que rigen el uso de NutritionalReviews.org, la protección de sus datos personales, la divulgación sobre enlaces de afiliados y las advertencias sobre información de salud.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Cumplimiento Normativo y Privacidad</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Divulgación Comercial 100% Explícita</span>
                </span>
              </div>
            </div>

            {/* Right Box: Key Policy Spotlight Card */}
            <div className="lg:col-span-5">
              <Link
                href="/legal/affiliate"
                className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                  {/* Circular Shield Icon */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-bright_teal_blue/20 ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-sky_aqua group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Right text lines */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                        Aviso Fundamental
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors line-clamp-2 leading-snug">
                      Divulgación de Afiliados y Financiación
                    </h2>

                    <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                      Conozca cómo nos financiamos de forma ética sin aceptar comisiones por manipular veredictos ni valoraciones.
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                      <span>Leer política de afiliados</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Legal Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-light_cyan/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Directorio de Políticas y Pautas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Documentos oficiales, términos de uso y compromisos de transparencia editorial
            </p>
          </div>
          <span className="hidden sm:inline-flex text-xs font-bold px-3.5 py-1.5 rounded-full bg-white border border-light_cyan text-french_blue shadow-xs">
            {legalPages.length} Documentos
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`group flex flex-col justify-between rounded-3xl border p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 ${
                page.primary
                  ? "border-turquoise_surf/40 bg-white hover:shadow-xl hover:shadow-bright_teal_blue/10"
                  : "border-light_cyan bg-white/90 hover:bg-white hover:border-turquoise_surf/40 hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    page.primary ? "bg-light_cyan text-french_blue" : "bg-slate-100 text-slate-500"
                  }`}>
                    {page.primary ? "Políticas Principales" : "Pautas Editoriales"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-bright_teal_blue group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-bright_teal_blue transition-colors">
                  {page.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {page.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-french_blue group-hover:text-bright_teal_blue transition-colors">
                <span>Consultar documento</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
