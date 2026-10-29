import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados | NutritionalReviews.org",
  description:
    "Transparencia sobre nuestras relaciones y enlaces de afiliados comerciales en NutritionalReviews.org. Conozca cómo se financia nuestro sitio.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/affiliate",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Divulgación y Transparencia
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Divulgación de Afiliados
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
          {/* Section Intro */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Transparencia desde el inicio
            </h2>
            <p>
              NutritionalReviews.org es un sitio financiado en parte por comisiones de afiliados. Queremos que lo sepas antes de leer nuestras reseñas o hacer clic en un enlace de compra.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              1. Qué significa un enlace de afiliado
            </h2>
            <p>
              Cuando haces clic en ciertos enlaces de este sitio — por ejemplo, botones como “Comprar ahora”, “Ver oferta” o “Sitio oficial” — y realizas una compra en el sitio del vendedor, podemos recibir una comisión.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>No pagas más por usar nuestros enlaces.</strong> El precio que ves en el sitio del vendedor es el mismo, con o sin nuestro enlace, salvo que se indique una oferta específica.
              </li>
              <li>
                La comisión la paga el vendedor o la red de afiliados, no tú.
              </li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              2. Redes y programas con los que trabajamos
            </h2>
            <p>
              Podemos participar en programas de afiliados de redes y vendedores, así como en programas directos de fabricantes y vendedores.
            </p>
            <p>
              Los programas exactos pueden cambiar con el tiempo según los productos que reseñemos. Esta página se actualizará cuando corresponda.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              3. Cómo elaboramos nuestras reseñas
            </h2>
            <p>
              Nuestras reseñas se basan en información pública del producto, su etiqueta, ingredientes, precio y opiniones disponibles. Nos esforzamos por señalar ventajas y desventajas, no solo beneficios.
            </p>
            <p>Sin embargo, debes saber que:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>La existencia de una comisión es un incentivo económico.</li>
              <li>No todos los productos del mercado son reseñados en este sitio.</li>
              <li>Una reseña positiva no significa que un producto sea adecuado para ti ni que sea el mejor para tu caso.</li>
            </ul>
            <p className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs sm:text-sm font-medium text-slate-700">
              Te recomendamos comparar productos, leer la etiqueta completa y, si tienes dudas de salud, consultar a un profesional antes de comprar.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              4. Responsabilidad de la compra
            </h2>
            <p>
              La compra se realiza directamente con el vendedor. El vendedor es responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>El precio final, impuestos y gastos de envío.</li>
              <li>La entrega, disponibilidad y plazos.</li>
              <li>Devoluciones, reembolsos y atención al cliente.</li>
              <li>La calidad y seguridad del producto.</li>
            </ul>
            <p>
              Si tienes un problema con un pedido, debes contactar directamente al vendedor. No podemos procesar reembolsos ni envíos, porque no vendemos los productos.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              5. Contenido patrocinado
            </h2>
            <p>
              Si algún artículo es patrocinado o contiene contenido pagado, lo indicaremos claramente en ese artículo. Salvo que se indique lo contrario, las reseñas no son patrocinadas por el fabricante del producto reseñado.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              6. Preguntas y Contacto
            </h2>
            <p>
              Si tienes preguntas sobre esta divulgación o nuestras relaciones comerciales, escríbenos a:
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
