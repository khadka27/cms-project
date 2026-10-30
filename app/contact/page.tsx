import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import {
  Mail,
  HelpCircle,
  FileText,
  Lock,
  Globe,
  ShieldAlert,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] flex flex-col items-center pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-turquoise_surf/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-bright_teal_blue" />
            <span className="text-xs font-black uppercase tracking-widest text-deep_twilight">
              Soporte y Consultas Editoriales
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contáctenos
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            NutritionalReviews.org es un sitio de reseñas de suplementos nutricionales para América Latina. Si tiene una pregunta sobre nuestros análisis, desea reportar un enlace desactualizado o enviar una solicitud editorial, comuníquese con nuestro equipo.
          </p>
        </div>

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
