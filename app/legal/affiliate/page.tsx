import Link from "next/link";

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
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de análisis e investigación que ayuda a los compradores a evaluar productos de salud y bienestar mediante reseñas, resúmenes de ingredientes, guías y enlaces a tiendas verificadas.
          </p>
          <p>
            Algunas páginas en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a> contienen enlaces de afiliados y botones comerciales. Esto significa que podemos percibir una pequeña comisión si usted hace clic en dichos enlaces y completa una compra, <strong>sin ningún coste adicional para usted</strong>.
          </p>
          <p className="font-semibold text-slate-900">
            Esta Divulgación de Afiliados explica con total claridad cómo operan estas relaciones comerciales en nuestro sitio web.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Our Affiliate Relationship */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nuestras Relaciones de Afiliación
            </h2>
            <p>
              Nutritional Reviews participa en redes de afiliación y programas de colaboradores comerciales verificados. Cuando usted hace clic en enlaces como "Verificar Precio", "Comprar Ahora" o en fichas destacadas, el vendedor asociado puede atribuirnos una comisión por referencia.
            </p>
            <p>
              Estas comisiones nos permiten financiar las operaciones de investigación científica, mantenimiento del servidor y actualización continua de nuestros análisis.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: No Extra Cost to You */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sin Coste Adicional Para Usted
            </h2>
            <p>
              El uso de enlaces de afiliados nunca incrementa el precio final que usted paga. En muchos casos, a través de nuestras alianzas, los lectores acceden a descuentos exclusivos, cupones o promociones de paquetes multipack.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Product Information and Editorial Independence */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Independencia Editorial y Calidad
            </h2>
            <p>
              Nuestra prioridad fundamental es el rigor editorial. Las comisiones de afiliación no alteran nuestros criterios de evaluación: destacamos honestamente los puntos fuertes, posibles efectos secundarios, limitaciones y la relación calidad-precio de cada producto analizado.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Product Offers */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Transacciones en Sitios de Terceros
            </h2>
            <p>
              Nutritional Reviews no gestiona pagos directos ni despachos de mercancía para productos de terceros. Toda transacción se efectúa en la pasarela segura del vendedor oficial, sujeta a sus propias políticas de privacidad, términos de venta y plazos de entrega.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Your Responsibility as a Buyer */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Responsabilidad del Comprador
            </h2>
            <p>
              Le recomendamos encarecidamente verificar la lista de ingredientes, indicaciones de uso del fabricante, certificados de garantía y políticas de devolución oficiales antes de formalizar cualquier pedido.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tiene dudas sobre nuestra política de afiliados o enlaces comerciales, escríbanos a:
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
