import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Cookies y Seguimiento
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Política de Cookies
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews (“Nutritional Reviews”, “nosotros” o “nuestro”) utiliza cookies y tecnologías de seguimiento similares en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a> y páginas o subdominios vinculados que enlazan a esta Política de Cookies.
          </p>
          <p>
            Esta Política de Cookies explica qué son las cookies, cómo las utilizamos, qué tipos de cookies pueden estar activas en nuestro sitio web, cómo terceros pueden utilizarlas y cómo gestionar sus preferencias.
          </p>
          <p className="font-semibold text-slate-900">
            Al continuar navegando por nuestro sitio web, usted reconoce el uso de cookies y tecnologías similares según lo descrito en este documento, sujeto a sus opciones de consentimiento cuando la ley así lo exija.
          </p>

          <hr className="border-slate-100" />

          {/* Section: What Cookies Are */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Qué son las Cookies
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su navegador, ordenador o teléfono móvil al visitar un sitio web.
            </p>
            <p>
              Las cookies permiten a los sitios web recordar información sobre su visita, mantener funciones técnicas básicas, mejorar la velocidad, medir el tráfico de audiencia, registrar enlaces pulsados y respaldar el seguimiento de afiliados o analíticas de rendimiento.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Types of Cookies We May Use */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tipos de Cookies que Podemos Utilizar
            </h2>
            <p>
              Nutritional Reviews puede emplear diferentes categorías de cookies según las funciones activas del portal y los proveedores integrados:
            </p>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm mt-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-900 border-b border-slate-100 font-bold">
                    <th className="p-4 w-1/4">Tipo de Cookie</th>
                    <th className="p-4">Finalidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Esenciales</td>
                    <td className="p-4">Garantizan la carga adecuada del sitio, la navegación segura y funciones técnicas indispensables</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Analíticas</td>
                    <td className="p-4">Nos permiten analizar estadísticas de visitas, tiempos de lectura y rendimiento de páginas</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Afiliados</td>
                    <td className="p-4">Registran referencias legítimas a tiendas oficiales cuando un usuario hace clic en un análisis</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Publicitarias</td>
                    <td className="p-4">Ayudan a medir campañas, evitar anuncios repetitivos y evaluar la relevancia de contenidos</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Preferencia</td>
                    <td className="p-4">Guardan selecciones previas como idioma o confirmaciones de avisos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Why We Use Cookies */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Por Qué Usamos Cookies
            </h2>
            <p>
              Utilizamos cookies para garantizar la mejor experiencia posible a nuestros lectores. Nos ayudan a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Mantener el sitio web operativo, estable y seguro</li>
              <li>Comprobar qué guías y comparativas resultan más útiles a los usuarios</li>
              <li>Analizar la interacción con botones de compra y fichas de producto</li>
              <li>Atribuir adecuadamente las referencias a los fabricantes asociados</li>
              <li>Detectar fallos técnicos o enlaces rotos con rapidez</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Cookies */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cookies de Terceros
            </h2>
            <p>
              Ciertas cookies pueden ser instaladas por servicios externos integrados en el portal, tales como Google Analytics, redes de afiliación de productos o proveedores de infraestructura en la nube.
            </p>
            <p>
              Estas terceras partes gestionan sus cookies con arreglo a sus propias políticas de privacidad.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: How You Can Manage Cookies */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cómo Gestionar y Desactivar las Cookies
            </h2>
            <p>
              Usted tiene el control sobre las cookies que se instalan en su dispositivo. Puede:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Configurar su navegador para bloquear o rechazar cookies de terceros</li>
              <li>Eliminar las cookies almacenadas previamente en el historial de navegación</li>
              <li>Activar el modo de navegación privada o de incógnito</li>
              <li>Instalar extensiones de protección de privacidad en su navegador</li>
            </ul>
            <p className="font-semibold text-slate-900">
              Tenga en cuenta que la desactivación de cookies técnicas esenciales puede impedir el correcto funcionamiento de ciertas características del portal.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tiene dudas sobre esta Política de Cookies o sobre el uso de tecnologías de seguimiento, escríbanos a:
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
