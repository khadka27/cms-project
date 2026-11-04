import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { ContactPageSchema, BreadcrumbSchema } from "@/components/SEOSchema";
import {
  Mail,
  HelpCircle,
  FileText,
  Lock,
  Globe,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionalreviews.org";

export const metadata: Metadata = {
  title: "Contáctenos | NutritionalReviews.org",
  description:
    "Póngase en contacto con el equipo de NutritionalReviews.org para consultas sobre reseñas de suplementos, solicitudes de corrección, dudas de privacidad o propuestas editoriales.",
  alternates: {
    canonical: "https://nutritionalreviews.org/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] pb-24">
      <ContactPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Contacto", url: `${SITE_URL}/contact` },
        ]}
      />

      {/* Hero Header: Two-Column Hero with Title/Description on Left & Channel Spotlight Card on Right */}
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
              <span className="text-white font-bold">Contacto</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Box: Title & Description */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright_teal_blue/20 border border-turquoise_surf/30 text-sky_aqua text-xs font-bold tracking-wider uppercase mb-4 self-start shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-turquoise_surf" />
                <span>Soporte y Consultas Editoriales</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Contáctenos con{" "}
                <span className="bg-gradient-to-r from-sky_aqua via-turquoise_surf to-light_cyan bg-clip-text text-transparent">
                  Nuestro Equipo
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                NutritionalReviews.org es un centro editorial independiente de análisis nutricionales. Si tiene una pregunta sobre nuestros análisis, desea reportar un enlace desactualizado o enviar una solicitud editorial, comuníquese con nosotros.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Atención Editorial Directa</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-turquoise_surf flex-shrink-0" />
                  <span>Plazo de Respuesta: 24 a 48h hábiles</span>
                </span>
              </div>
            </div>

            {/* Right Box: Direct Email Spotlight Card */}
            <div className="lg:col-span-5">
              <a
                href="mailto:reviewsnutritional@gmail.com"
                className="group relative block p-5 sm:p-6 rounded-3xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-turquoise_surf/50 backdrop-blur-md shadow-2xl hover:shadow-bright_teal_blue/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-turquoise_surf/20 blur-2xl pointer-events-none group-hover:bg-turquoise_surf/30 transition-colors" />

                <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                  {/* Circular Mail Icon */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-turquoise_surf/40 shadow-lg shadow-bright_teal_blue/20 bg-bright_teal_blue/20 ring-4 ring-white/10 group-hover:ring-turquoise_surf/40 transition-all flex items-center justify-center">
                    <Mail className="w-10 h-10 text-sky_aqua group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Right text lines */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-turquoise_surf/20 text-sky_aqua border border-turquoise_surf/30">
                        Bandeja Oficial
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky_aqua transition-colors truncate leading-snug">
                      reviewsnutritional@gmail.com
                    </h2>

                    <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                      Consultas sobre artículos, reportes de precios y sugerencias de investigación.
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-turquoise_surf group-hover:text-white transition-colors">
                      <span>Enviar correo directo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Guidelines Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-12">
        {/* ── Interactive Contact Form Component with Nodemailer ── */}
        <ContactForm />

        {/* ── Additional Guidance & Reference Sections ── */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Información Adicional para Usuarios
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Conozca nuestros procedimientos habituales de respuesta y cómo tramitar solicitudes específicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Box 1: Motivos Habituales */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-light_cyan flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-light_cyan flex items-center justify-center text-french_blue">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  Sobre Qué Puede Consultarnos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  Las razones más frecuentes de contacto con nuestra redacción incluyen:
                </p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-inside list-disc">
                  <li>Preguntas sobre nuestras reseñas de productos o metodología</li>
                  <li>Solicitudes para corregir información o precios desactualizados</li>
                  <li>Reportes de enlaces rotos o páginas de vendedores caídas</li>
                  <li>Dudas sobre nuestra política de afiliación y financiación</li>
                  <li>Solicitudes de privacidad o ejercicio de derechos de datos</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 mt-5 pt-3 border-t border-slate-100 italic">
                Agradecemos incluir la URL del artículo o el nombre exacto del producto en su mensaje.
              </p>
            </div>

            {/* Box 2: Tiempos de Respuesta */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-light_cyan flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-light_cyan flex items-center justify-center text-french_blue">
                    <Clock className="h-4 w-4" />
                  </div>
                  Tiempos de Respuesta
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  Revisamos cada mensaje recibido en <span className="font-semibold text-slate-800">reviewsnutritional@gmail.com</span>. Nuestro plazo habitual de atención es de <span className="font-bold text-french_blue">2 a 3 días hábiles</span>, condicionado por:
                </p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-inside list-disc">
                  <li>Volumen de solicitudes en curso</li>
                  <li>Pasos de verificación documental del producto</li>
                  <li>Comprobación técnica de enlaces y precios con el fabricante</li>
                  <li>Complejidad de consultas sobre políticas de privacidad</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 mt-5 pt-3 border-t border-slate-100 italic">
                Enviar mensajes repetidos no acelera el tiempo de análisis.
              </p>
            </div>
          </div>

          {/* Third-Party Notice & Disclaimer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-light_cyan space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-bright_teal_blue" />
              Compras, Envíos y Reclamaciones de Productos de Terceros
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Recordatorio importante:</strong> NutritionalReviews.org no vende suplementos directamente. Todas las compras se formalizan directamente en las plataformas del vendedor oficial a través de los enlaces disponibles.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Si su consulta concierne al estado de un pedido, cargos bancarios, tiempos de paquetería o solicitudes de reembolso de un producto adquirido, debe comunicarse directamente con el servicio de atención al cliente del fabricante o vendedor correspondiente.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <Link
                href="/legal/disclaimer"
                className="font-bold text-french_blue hover:underline"
              >
                Descargo de Responsabilidad de Salud →
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                href="/legal/affiliate"
                className="font-bold text-french_blue hover:underline"
              >
                Divulgación de Afiliados →
              </Link>
              <span className="text-slate-300">·</span>
              <Link
                href="/legal/privacy"
                className="font-bold text-french_blue hover:underline"
              >
                Política de Privacidad →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
