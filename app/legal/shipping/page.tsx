import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Envíos y Logística | NutritionalReviews.org",
  description:
    "Directrices informativas sobre plazos de envío, entrega, costes aduaneros y logística administrada por las tiendas oficiales de los vendedores.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/shipping",
  },
};

export default function ShippingPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue font-bold">
          Logística y Entregas
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Información de Envíos y Entregas
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500">
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
            Última actualización: 27 de octubre de 2026
          </span>
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-bright_teal_blue">
            Sitio web: https://nutritionalreviews.org
          </span>
        </div>

        <section className="mt-8 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium leading-relaxed">
            <strong>Aviso de no comercialización directa:</strong> NutritionalReviews.org es un sitio de reseñas informativas y <strong>no vende, no cobra, no almacena ni envía productos físicos</strong>. Las compras se realizan de forma independiente y directa en la tienda oficial del vendedor mediante los enlaces que acompañan a cada reseña.
          </div>

          <p>
            Los envíos y la logística de entrega de los suplementos reseñados son gestionados de principio a fin por las empresas vendedoras, sus distribuidores y sus respectivos operadores postales autorizados.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            1. Plazos de preparación y despacho
          </h2>
          <p>
            Los plazos habituales de preparación dependen de cada fabricante o tienda oficial, despachando comúnmente en un plazo de 24 a 48 horas hábiles tras la confirmación de la orden en su propia plataforma.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            2. Tiempos estimados de entrega
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Envíos nacionales (locales al país del vendedor):</strong> Generalmente de 3 a 7 días hábiles según la región de destino.</li>
            <li><strong>Envíos internacionales a países de América Latina:</strong> De 7 a 20 días hábiles dependiendo de la logística de cada vendedor y de los trámites aduaneros locales de cada país (México, Colombia, Argentina, Chile, Perú, etc.).</li>
          </ul>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            3. Seguimiento de su pedido
          </h2>
          <p>
            Una vez despachado el paquete, el vendedor emite automáticamente un código o número de guía de seguimiento a la dirección de correo electrónico facilitada durante el proceso de compra.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            4. Dudas o incidencias con el envío
          </h2>
          <p>
            Para consultar el estado de un envío o reportar demoras, comuníquese con el departamento de logística del fabricante o tienda oficial donde completó su compra. Si necesita orientación para ubicar el contacto de atención al cliente de un producto, escríbanos a:
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
        </section>
      </article>
    </main>
  );
}
