import { Metadata } from "next";
import Link from "next/link";
import { AboutPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  FileCheck2,
  Microscope,
  Info,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const metadata: Metadata = {
  title: "Sobre Nosotros | NutritionalReviews",
  description: "Conozca más sobre NutritionalReviews y nuestro compromiso con el bienestar y la vida saludable.",
  alternates: {
    canonical: "https://nutritionalreviews.org/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24">
      <AboutPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Sobre Nosotros", url: `${SITE_URL}/about` },
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
              <span className="text-white font-bold">Sobre Nosotros</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <Info className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Misión y Criterio Editorial</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Sobre{" "}
                <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                  NutritionalReviews
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Un centro editorial independiente dedicado a la divulgación científica, análisis de pureza de formulaciones y comparativas rigurosas de suplementos nutricionales respaldadas por evidencia clínica y revisión médica colegiada.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>100% Imparcialidad Editorial</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Revisado por Farmacéuticos y Médicos</span>
                </span>
              </div>
            </div>

            {/* Right Box: Editorial Principles Spotlight Card */}
            <div className="lg:col-span-5">
              <Link
                href="/legal/how-we-review"
                className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                  {/* Circular Logo Emblem */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-white ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all flex items-center justify-center p-3">
                    <img
                      src="/logo.png"
                      alt="NutritionalReviews Logo"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Right text lines */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                        Criterio Editorial 2026
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors line-clamp-2 leading-snug">
                      Rigor, Pureza y Transparencia
                    </h2>

                    <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                      Evaluamos etiquetas oficiales, ensayos clínicos y biodisponibilidad molecular sin patrocinios pagados.
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                      <span>Cómo analizamos suplementos</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-light_cyan/80">
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Nuestra Misión</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              En NutritionalReviews, nuestra misión es empoderar a los compradores con información verificable, 
              libre de promesas comerciales vacías y fundamentada en la literatura científica internacional. 
              Analizamos ingredientes, proporciones activas y dosificaciones de referencia para que cada elección nutricional sea segura y contrastada.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Nuestra Metodología</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 not-prose">
              <div className="p-6 bg-light_cyan/30 rounded-2xl border border-turquoise_surf/30 transition-all hover:shadow-md hover:bg-light_cyan/50">
                <div className="flex items-center gap-2 mb-2 text-deep_twilight font-bold">
                  <FileCheck2 className="w-5 h-5 text-bright_teal_blue" />
                  <h3>Revisión de Fuentes y Etiquetas</h3>
                </div>
                <p className="text-sm text-french_blue leading-relaxed">
                  Reunimos qué contiene cada suplemento según su ficha técnica oficial, contrastando las promesas comerciales con la literatura científica indexada en PubMed y Cochrane.
                </p>
              </div>

              <div className="p-6 bg-sky_aqua/15 rounded-2xl border border-sky_aqua/30 transition-all hover:shadow-md hover:bg-sky_aqua/25">
                <div className="flex items-center gap-2 mb-2 text-deep_twilight font-bold">
                  <ShieldCheck className="w-5 h-5 text-bright_teal_blue" />
                  <h3>Criterio Editorial Transparente</h3>
                </div>
                <p className="text-sm text-french_blue leading-relaxed">
                  Evaluamos pros, contras y precios verificados en la fecha de publicación, sin prometer curas milagrosas ni sustituir la consulta médica personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
