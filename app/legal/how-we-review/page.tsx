import Link from "next/link";
import { HelpCircle, Star, ShieldAlert, List, AlertTriangle, RefreshCw, Mail, CheckCircle } from "lucide-react";

export default function HowWeReviewPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Metodología de Análisis
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Cómo Evaluamos los Productos
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de análisis independiente creado para orientar a los consumidores en la toma de decisiones informadas sobre bienestar, suplementos y nutrición.
          </p>
          <p>
            Nuestro proceso de evaluación está diseñado para desmitificar las campañas de marketing. Analizamos a fondo la formulación de los productos, la calidad y biodisponibilidad de los ingredientes, los respaldos científicos contrastados, las limitaciones reales y la transparencia de las garantías.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Methodology */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nuestros Pilares de Evaluación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue" /> Pureza y Calidad de Ingredientes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Examinamos las formas químicas activas, la ausencia de rellenos artificiales y la procedencia de los compuestos botánicos o minerales.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue" /> Dosis Clínicamente Efectivas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Comprobamos si las cantidades por dosis se corresponden con los rangos avalados en ensayos clínicos independientes.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue" /> Transparencia del Fabricante
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Evaluamos los certificados de análisis (COA), buenas prácticas de manufactura (GMP) y la claridad en los datos de contacto y atención al cliente.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-bright_teal_blue" /> Relación Calidad-Precio Real
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Calculamos el coste real por dosis diaria frente a las principales alternativas y fórmulas homólogas del mercado.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto con el Equipo de Metodología
            </h2>
            <p>
              Si desea remitir información sobre formulaciones, análisis de laboratorio o certificaciones:
            </p>
            <div className="bg-gradient-to-br from-[#f4fcfe] to-[#f8fbff] border border-light_cyan/80 rounded-2xl p-5 space-y-2 text-slate-800 text-xs sm:text-sm font-semibold max-w-md">
              <p>Nutritional Reviews</p>
              <p>Correo electrónico: <a href="mailto:support@nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue transition-colors">support@nutritionalreviews.org</a></p>
              <p>Sitio web: <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue transition-colors">https://nutritionalreviews.org</a></p>
            </div>
          </div>

        </section>
      </article>
    </main>
  );
}
