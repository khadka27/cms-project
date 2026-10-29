import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | NutritionalReviews.org",
  description:
    "Información sobre qué cookies utilizamos en NutritionalReviews.org, tecnologías de seguimiento y cómo gestionar sus preferencias.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/cookies",
  },
};

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
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500">
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
            Última actualización: 27 de octubre de 2026
          </span>
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-bright_teal_blue">
            Sitio web: https://nutritionalreviews.org
          </span>
        </div>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              1. Qué son las cookies
            </h2>
            <p>
              Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar preferencias, medir el uso del sitio o, en el caso de los enlaces de afiliados, registrar que un clic provino de este sitio.
            </p>
            <p>
              También podemos usar tecnologías similares, como píxeles o almacenamiento local.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              2. Qué cookies usamos
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cookies necesarias</h3>
                <p className="mt-1 text-slate-600">
                  Esenciales para que el sitio funcione, por ejemplo, seguridad, integridad técnica y equilibrio de carga. No se pueden desactivar desde el sitio sin afectar su funcionamiento.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Cookies de preferencias</h3>
                <p className="mt-1 text-slate-600">
                  Recuerdan configuraciones como idioma, consentimientos o preferencias de visualización.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Cookies de análisis</h3>
                <p className="mt-1 text-slate-600">
                  Nos ayudan a entender, de forma agregada y anónima, qué artículos se leen y cómo los visitantes usan el sitio. Usamos estas herramientas solo según la configuración realmente instalada: Google Analytics, Bing Webmaster Tools y métricas de servidor.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">Cookies de marketing y afiliados</h3>
                <p className="mt-1 text-slate-600">
                  Cuando haces clic en un enlace de afiliado, el vendedor o la red de afiliados puede colocar una cookie para registrar ese clic y, si compras, atribuir la comisión. Estas cookies pertenecen a terceros y se rigen por sus propias políticas.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm mt-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-900 border-b border-slate-100 font-bold">
                    <th className="p-4 w-1/3">Tipo de Cookie</th>
                    <th className="p-4">Finalidad Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Necesarias</td>
                    <td className="p-4">Garantizan la carga adecuada, seguridad básica y navegación fluida.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Preferencias</td>
                    <td className="p-4">Recuerdan opciones seleccionadas como confirmaciones de avisos o idioma.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Análisis</td>
                    <td className="p-4">Miden volumen de tráfico, artículos más consultados y rendimiento del sitio.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Afiliados</td>
                    <td className="p-4">Atribuyen referencias comerciales anónimas a tiendas oficiales externas.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs sm:text-sm font-semibold text-slate-800">
              No usamos cookies para recopilar historiales médicos ni datos de pago.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              3. Cómo gestionar las cookies
            </h2>
            <p>
              Puedes aceptar, rechazar o eliminar cookies desde la configuración de tu navegador. También puedes usar el modo de navegación privada o incógnito.
            </p>
            <p>Ten en cuenta que:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Bloquear todas las cookies puede afectar el funcionamiento técnico del sitio.</li>
              <li>
                Si bloqueas las cookies de afiliados, es posible que tu compra no se atribuya a este sitio, pero <strong>eso no afectará el precio que pagas</strong>.
              </li>
            </ul>
            <p>
              Para más información sobre cómo gestionar cookies en los navegadores más comunes, consulta los enlaces de soporte oficiales: Google Chrome, Mozilla Firefox, Apple Safari y Microsoft Edge.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              4. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta política cuando cambien las herramientas o servicios que usamos. La versión vigente será la publicada en esta página.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              5. Contacto
            </h2>
            <p>
              Para preguntas sobre el uso de cookies y tecnologías de seguimiento, escríbenos a:
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
