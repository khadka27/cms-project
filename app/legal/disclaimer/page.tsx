import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descargo de Responsabilidad de Salud | NutritionalReviews.org",
  description:
    "Aviso legal y descargo de responsabilidad sobre contenido informativo y suplementos en NutritionalReviews.org. Consulte siempre a un profesional sanitario.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Avisos y Límites Legales
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Descargo de Responsabilidad de Salud
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500">
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
            Última actualización: 27 de octubre de 2026
          </span>
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-bright_teal_blue">
            Sitio web: https://nutritionalreviews.org
          </span>
        </div>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg text-slate-800 font-medium">
            Lee este descargo antes de usar cualquier información de este sitio.
          </p>

          <hr className="border-slate-100" />

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              1. Contenido informativo, no consejo médico
            </h2>
            <p>
              Todo el contenido de NutritionalReviews.org — incluyendo reseñas, artículos, comparaciones, opiniones, testimonios y descripciones de ingredientes — tiene fines exclusivamente informativos y educativos.
            </p>
            <p className="font-semibold text-slate-900">
              No constituye, ni debe interpretarse como, asesoramiento médico, diagnóstico, tratamiento, recomendación nutricional personalizada ni sustituto de la atención profesional.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              2. Consulta a un profesional de la salud
            </h2>
            <p>
              Antes de tomar, cambiar o suspender cualquier suplemento, medicamento o tratamiento, consulta a un médico, nutricionista, farmacéutico u otro profesional de la salud calificado, especialmente si:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Estás embarazada, en periodo de lactancia o planeas estarlo.</li>
              <li>Tienes una enfermedad, condición crónica o tomas medicamentos.</li>
              <li>Vas a someterte a una cirugía.</li>
              <li>Eres menor de edad o cuidas a un menor o a una persona mayor.</li>
              <li>Tienes alergias o intolerancias conocidas.</li>
            </ul>
            <p className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs sm:text-sm font-medium">
              No ignores el consejo de un profesional ni retrases la búsqueda de atención médica por algo que hayas leído en este sitio.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              3. Los suplementos no son medicamentos
            </h2>
            <p>
              Los suplementos alimenticios no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. Las afirmaciones sobre estos productos no han sido evaluadas necesariamente por autoridades sanitarias como la FDA de Estados Unidos ni por las autoridades sanitarias de tu país (por ejemplo, COFEPRIS en México, INVIMA en Colombia, ANVISA en Brasil, o la autoridad equivalente en tu país).
            </p>
            <p>
              Los resultados pueden variar de una persona a otra. Que un producto funcione para una persona no garantiza que funcione para otra.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              4. Lee siempre la etiqueta del producto
            </h2>
            <p>Antes de comprar o consumir un producto:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Lee la etiqueta completa, incluyendo ingredientes, dosis, advertencias y contraindicaciones.</li>
              <li>Verifica que el producto esté autorizado para su venta en tu país.</li>
              <li>Sigue las instrucciones del fabricante y no excedas la dosis recomendada.</li>
            </ul>
            <p>
              Si experimentas efectos adversos, suspende su uso y consulta a un profesional de la salud. En caso de emergencia, busca atención médica inmediata.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              5. Testimonios y resultados
            </h2>
            <p>
              Los testimonios, opiniones de usuarios o resultados mencionados en reseñas son experiencias individuales y no garantizan resultados. Pueden estar editados por claridad, pero no representan una promesa de eficacia.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              6. Responsabilidad del vendedor
            </h2>
            <p>
              El fabricante y el vendedor son responsables de la composición, calidad, seguridad, etiquetado, envío y devoluciones de sus productos. NutritionalReviews.org no fabrica, distribuye ni garantiza ningún producto reseñado.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 7 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              7. En caso de duda
            </h2>
            <p className="font-semibold text-slate-900">
              Si tienes dudas sobre si un suplemento es adecuado para ti, no lo tomes hasta consultar a un profesional de la salud.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tienes dudas o preguntas sobre este descargo de responsabilidad, escríbenos a:
            </p>
            <div className="bg-gradient-to-br from-[#f4fcfe] to-[#f8fbff] border border-light_cyan/80 rounded-2xl p-5 space-y-2 text-slate-800 text-xs sm:text-sm font-semibold max-w-md">
              <p className="font-bold text-slate-900">NutritionalReviews.org</p>
              <p>
                Correo electrónico:{" "}
                <a
                  href="mailto:reviewsnutritional@gmail.com"
                  className="text-bright_teal_blue hover:text-french_blue transition-colors"
                >
                  reviewsnutritional@gmail.com
                </a>
              </p>
              <p>
                Sitio web:{" "}
                <a
                  href="https://nutritionalreviews.org"
                  className="text-bright_teal_blue hover:text-french_blue transition-colors"
                >
                  https://nutritionalreviews.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
