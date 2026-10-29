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
          <p>
            NutritionalReviews.org proporciona análisis y comparativas de suplementos y productos de bienestar. Los envíos físicos de los productos reseñados son gestionados de principio a fin por las empresas vendedoras y sus operadores logísticos autorizados.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            1. Plazos de preparación y despacho
          </h2>
          <p>
            La mayoría de los fabricantes y distribuidores autorizados despachan los pedidos en un plazo habitual de 24 a 48 horas hábiles tras la confirmación del pago.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            2. Tiempos estimados de entrega
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Envíos nacionales:</strong> Generalmente de 3 a 7 días hábiles según la región de destino.</li>
            <li><strong>Envíos internacionales a Latinoamérica / España:</strong> De 7 a 20 días hábiles dependiendo de los trámites aduaneros locales de cada país (México, Colombia, Argentina, Chile, Perú, etc.).</li>
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
