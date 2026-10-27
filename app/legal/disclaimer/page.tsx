import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Avisos y Límites Legales
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Aviso Legal y Descargo de Responsabilidad
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de información sobre productos creado para orientar a los consumidores en la investigación de suplementos y productos de bienestar mediante análisis imparciales, guías de compra y resúmenes técnicos.
          </p>
          <p>
            La información contenida en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a> se suministra con fines estrictamente informativos y divulgativos. Al utilizar este sitio web, usted comprende y acepta que el contenido no constituye asesoramiento profesional ni una garantía médica o de resultados.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Informational Purpose Only */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Finalidad Exclusivamente Informativa
            </h2>
            <p>
              El propósito de Nutritional Reviews es brindar comparativas objetivas para que los compradores conozcan a fondo las características, pros y contras de un producto antes de acudir a una tienda oficial.
            </p>
            <p className="font-semibold text-slate-900">
              Esta información no debe considerarse como una garantía de que determinado producto solucionará un problema de salud o resultará idóneo para todas las personas.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: No Medical Advice */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sin Asesoramiento Médico ni Sanitario
            </h2>
            <p>
              Nutritional Reviews no presta asesoramiento médico, diagnóstico clínico ni prescripción terapéutica. Nada en este sitio web debe utilizarse para reemplazar el criterio de un médico, farmacéutico u otro profesional sanitario cualificado.
            </p>
            <p>
              Antes de iniciar cualquier régimen de suplementación alimenticia, consulte con su médico de confianza, especialmente si:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Padece alguna enfermedad diagnosticada o trastorno crónico</li>
              <li>Se encuentra embarazada, en período de lactancia o planificando un embarazo</li>
              <li>Toma medicamentos con o sin receta médica</li>
              <li>Presenta alergias alimentarias o sensibilidad conocida a ciertos principios activos</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Results May Vary */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Los Resultados Individuales Pueden Variar
            </h2>
            <p>
              Cada organismo responde de forma diferente a los ingredientes bioactivos y hábitos de estilo de vida. Un suplemento que resulte altamente eficaz para un usuario puede no generar los mismos efectos en otro debido a factores metabólicos, edad, dieta y regularidad en las tomas.
            </p>
            <p className="font-semibold text-slate-900">
              Nutritional Reviews no garantiza resultados específicos ni curas milagrosas en ningún caso.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Links */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Enlaces Externos y Tiendas de Terceros
            </h2>
            <p>
              Los enlaces a tiendas de terceros y fabricantes se facilitan para su conveniencia investigadora. Nutritional Reviews no asume responsabilidad alguna por cambios de precio, stock, retrasos en la entrega o discrepancias en pasarelas de pago externas.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tiene dudas sobre este descargo de responsabilidad, comuníquese con nosotros en:
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
