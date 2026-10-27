import Link from "next/link";

export default function AdvertisingDisclosurePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Divulgación y Transparencia
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Divulgación de Publicidad
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de información que ayuda a los consumidores a investigar productos en tendencia mediante análisis, guías de compra, resúmenes editoriales y enlaces a páginas oficiales de fabricantes.
          </p>
          <p>
            Esta Divulgación de Publicidad explica cómo pueden mostrarse anuncios, ubicaciones patrocinadas, promociones remuneradas, publicidad contextual y relaciones comerciales en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a> y en sus páginas asociadas.
          </p>
          <p className="font-semibold text-slate-900">
            Nuestro objetivo es mantener una total transparencia comercial mientras continuamos ofreciendo información rigurosa y centrada en el comprador.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Advertising Relationships */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Relaciones Publicitarias
            </h2>
            <p>
              Nutritional Reviews puede mostrar publicidad o mantener acuerdos comerciales con anunciantes, distribuidores de productos, redes de afiliados y plataformas de medios.
            </p>
            <p>La publicidad puede presentarse en diversas modalidades:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Banners gráficos y anuncios de display</li>
              <li>Ubicaciones de productos patrocinadas</li>
              <li>Secciones destacadas con fines promocionales</li>
              <li>Widgets comparativos de productos</li>
              <li>Publicidad contextual automatizada</li>
              <li>Enlaces comerciales a tiendas oficiales</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Sponsored Content */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contenido Patrocinado y Publicidad Nativa
            </h2>
            <p>
              Cuando un artículo, guía o bloque de producto ha sido patrocinado o desarrollado en colaboración directa con una marca, nos comprometemos a identificarlo claramente mediante etiquetas reconocibles (como "Patrocinado", "Publicidad" o "Colaboración").
            </p>
            <p className="font-semibold text-slate-900">
              El patrocinio no implica que Nutritional Reviews avale de forma incondicional cada afirmación de marketing del fabricante. Los lectores deben siempre verificar las especificaciones oficiales y la política de devoluciones antes de comprar.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Editorial Independence */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Independencia Editorial
            </h2>
            <p>
              Las relaciones comerciales pueden influir en los productos seleccionados para cobertura editorial, pero no dictan las opiniones, desgloses críticos, limitaciones ni listas de pros y contras elaboradas por nuestro equipo de redacción.
            </p>
            <p>
              Rechazamos valoraciones simuladas, testimonios falsos, calificaciones infladas artificialmente o garantías que no se ajusten a la realidad.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: User Responsibility */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Responsabilidad del Usuario
            </h2>
            <p>
              Los contenidos promocionales o publicitarios no deben ser la única base para una decisión de compra. Antes de ordenar un producto, compruebe:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Si el producto satisface sus requerimientos personales</li>
              <li>El precio final y los costes asociados de envío</li>
              <li>Las condiciones de garantía y plazos de devolución</li>
              <li>Las instrucciones del fabricante y posibles advertencias de seguridad</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tiene preguntas relativas a nuestras directrices publicitarias o acuerdos de colaboración, escríbanos a:
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
