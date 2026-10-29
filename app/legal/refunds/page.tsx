import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Reembolsos | NutritionalReviews.org",
  description:
    "Información sobre devoluciones, garantías de satisfacción y proceso de reembolso para compras realizadas a través de vendedores asociados.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/refunds",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue font-bold">
          Transparencia y Compras
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Política de Reembolsos y Devoluciones
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
            NutritionalReviews.org es un portal informativo y de reseñas de suplementos y bienestar. No comercializamos ni despachamos productos directamente desde este portal. Toda transacción comercial se formaliza directamente en la tienda oficial del vendedor o fabricante.
          </p>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            1. Responsabilidad sobre devoluciones y reembolsos
          </h2>
          <p>
            Dado que la compra se efectúa directamente en el sitio del vendedor oficial, las políticas de devolución, plazos de garantía y reembolsos son fijadas y administradas exclusivamente por dicho comerciante.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>La mayoría de las marcas de suplementos evaluadas ofrecen garantías de satisfacción de entre 30 y 180 días según el fabricante.</li>
            <li>Le recomendamos verificar los términos de garantía y la política de reembolso específica en la pantalla de pago de la tienda oficial antes de confirmar su pedido.</li>
            <li>Consulte la confirmación por correo electrónico emitida por el vendedor para localizar el número de pedido y los datos de atención al cliente correspondientes.</li>
          </ul>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            2. Cómo tramitar una devolución
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>Localice el correo electrónico de confirmación recibido al realizar su compra en el sitio del fabricante.</li>
            <li>Contacte directamente con el equipo de soporte del vendedor a través de los canales oficiales indicados en su recibo o en el portal del producto.</li>
            <li>Siga las instrucciones del fabricante para el envío del embalaje o producto y conserve el comprobante de tracking.</li>
          </ol>

          <hr className="border-slate-100" />

          <h2 className="text-xl font-bold text-slate-900">
            3. Contacto de asistencia
          </h2>
          <p>
            Si tiene alguna duda sobre cómo identificar al vendedor de un producto reseñado en nuestro sitio web, puede escribirnos a:
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
