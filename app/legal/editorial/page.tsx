import Link from "next/link";
import { ShieldCheck, HelpCircle, FileText, CheckCircle, AlertTriangle, RefreshCw, Mail } from "lucide-react";

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Editorial y Estándares
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Proceso y Política Editorial
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de información científica e investigación de productos creado para orientar a los consumidores en su evaluación de suplementos y productos de bienestar en tendencia.
          </p>
          <p>
            Esta Política Editorial describe cómo creamos, contrastamos, revisamos y actualizamos los contenidos en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a>. Nuestro objetivo irrenunciable es brindar información clara y sustentada, evitando afirmaciones infundadas o promesas de resultados irreales.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Editorial Purpose */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nuestro Propósito Editorial
            </h2>
            <p>
              Muchas páginas de venta por internet recurren a discursos de urgencia o promesas exageradas. Nuestro enfoque editorial estructura la información de manera equilibrada para que el lector comprenda:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Qué es el producto y para qué necesidades fue formulado</li>
              <li>Ingredientes activos, dosis y biodisponibilidad</li>
              <li>Respaldos clínicos o científicos existentes</li>
              <li>Limitaciones reales, posibles efectos secundarios y contraindicaciones</li>
              <li>Relación calidad-precio en comparación con alternativas del mercado</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Claim Control */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Control Riguroso de Afirmaciones
            </h2>
            <p>
              Rechazamos deliberadamente el sensacionalismo. Supervisamos las afirmaciones de marketing para sustituir cualquier término equívoco por un lenguaje responsable y veraz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
                <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Lenguaje que Evitamos
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-red-800/90 list-inside list-disc">
                  <li>"Resultados garantizados"</li>
                  <li>"Cura milagrosa" o "Efecto instantáneo"</li>
                  <li>"Eficaz para el 100% de las personas"</li>
                  <li>"Aprobado médicamente sin evidencia"</li>
                </ul>
              </div>

              <div className="p-6 bg-teal-50/50 rounded-2xl border border-teal-100">
                <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  Lenguaje que Priorizamos
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-teal-800/90 list-inside list-disc">
                  <li>"Puede contribuir a..."</li>
                  <li>"Formulado para apoyar..."</li>
                  <li>"Los resultados individuales pueden variar"</li>
                  <li>"Respaldado por estudios sobre sus ingredientes"</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto con el Equipo Editorial
            </h2>
            <p>
              Para preguntas editoriales, sugerencias o consultas de investigación:
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
