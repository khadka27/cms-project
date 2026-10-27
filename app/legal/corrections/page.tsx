import Link from "next/link";
import { CheckCircle, AlertTriangle, HelpCircle, FileText, Info, RefreshCw, Mail } from "lucide-react";

export default function CorrectionsPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Exactitud y Actualizaciones
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Política de Correcciones
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de información sobre productos diseñado para ayudar a los compradores a investigar productos de bienestar y comercio electrónico en tendencia mediante análisis, guías de compra, páginas de categorías y fichas técnicas.
          </p>
          <p>
            Nos esforzamos por proporcionar información clara y actualizada. No obstante, los detalles de los productos pueden cambiar: precios, ofertas, existencias, costes de envío o políticas de devolución pueden ser modificados por los fabricantes sin previo aviso.
          </p>
          <p className="font-semibold text-slate-900">
            Esta Política de Correcciones explica cómo lectores, fabricantes y colaboradores pueden reportar información desactualizada, incompleta o errónea en NutritionalReviews.org.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Commitment to Accuracy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nuestro Compromiso con la Exactitud
            </h2>
            <p>
              Organizamos la información de los productos de manera comprensible para el usuario antes de que acceda a la tienda oficial. Nuestro contenido incluye:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm">
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Resúmenes de productos</li>
                <li>Desglose de características e ingredientes</li>
                <li>Puntos fuertes y limitaciones (pros y contras)</li>
                <li>Notas de precios y disponibilidad verificada</li>
                <li>Pautas de idoneidad para el usuario</li>
              </ul>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Consejos de uso y advertencias de seguridad</li>
                <li>Preguntas frecuentes</li>
                <li>Enlaces a fuentes y páginas oficiales</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: How to Request a Correction */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cómo Solicitar una Corrección
            </h2>
            <p>
              Si detecta un dato erróneo, un enlace roto o una especificación desactualizada, puede solicitarnos una revisión inmediata por correo electrónico:
            </p>
            <p>
              Envíe un correo a: <a href="mailto:support@nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">support@nutritionalreviews.org</a>
            </p>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2">
              <p className="text-sm font-semibold text-slate-800">Para agilizar la tramitación, le rogamos incluir:</p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>Nombre del producto o artículo</li>
                <li>URL exacta de la página en cuestión</li>
                <li>Breve explicación del dato a corregir</li>
                <li>Enlace oficial o fuente que sustente la actualización</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Resolution Time */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Plazo de Revisión y Resolución
            </h2>
            <p>
              La mayoría de las solicitudes de corrección se revisan y procesan en un plazo de 2 a 7 días hábiles. Si se comprueba la inexactitud, el contenido se modifica de inmediato para preservar la máxima transparencia para nuestra comunidad de lectores.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Para enviar sugerencias editoriales o reportar incidencias:
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
