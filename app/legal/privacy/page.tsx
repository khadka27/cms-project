import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | NutritionalReviews.org",
  description:
    "Conozca cómo NutritionalReviews.org recopila, procesa y protege sus datos personales, el uso de herramientas de análisis y el ejercicio de sus derechos.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Legal y Transparencia
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Política de Privacidad
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500">
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
            Última actualización: 27 de octubre de 2026
          </span>
          <span className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-bright_teal_blue">
            Titular: NutritionalReviews.org
          </span>
        </div>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              1. Introducción
            </h2>
            <p>
              Esta Política de Privacidad explica qué datos recopilamos cuando visitas NutritionalReviews.org, cómo los usamos y qué derechos tienes. Al usar este sitio, aceptas esta política.
            </p>
            <p>
              NutritionalReviews.org es un sitio informativo de reseñas de suplementos y productos de bienestar. No vendemos productos directamente. Cuando haces clic en un enlace de afiliado y compras en el sitio del vendedor, esa compra se rige por la política de privacidad y los términos de ese vendedor, no por los nuestros.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              2. Datos que recopilamos
            </h2>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Datos que nos proporcionas directamente
              </h3>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Nombre y correo electrónico, únicamente si nos contactas a través de un formulario o por correo electrónico.</li>
                <li>Cualquier mensaje, consulta o comentario que nos envíes voluntariamente.</li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Datos recopilados automáticamente
              </h3>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Dirección IP, tipo de navegador, modelo de dispositivo, resolución y sistema operativo.</li>
                <li>Páginas visitadas, enlaces pulsados y métricas de navegación agregadas.</li>
                <li>Datos anónimos o agregados a través de herramientas de análisis para entender qué guías y artículos resultan útiles.</li>
                <li>Información derivada de cookies y tecnologías similares.</li>
              </ul>
            </div>

            <p className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs sm:text-sm font-semibold text-slate-800">
              No recopilamos intencionalmente datos de salud personales, historiales médicos, ni información bancaria o de pago. No procesamos pagos en este sitio.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              3. Cómo usamos tus datos
            </h2>
            <p>Usamos los datos únicamente para:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Operar, mantener y mejorar el sitio y la calidad de su contenido editorial.</li>
              <li>Entender qué contenido y guías resultan útiles para nuestros lectores.</li>
              <li>Responder a mensajes, consultas o peticiones de corrección.</li>
              <li>Detectar, prevenir y corregir incidentes de seguridad, spam o abusos.</li>
              <li>Cumplir con las obligaciones legales aplicables.</li>
            </ul>
            <p className="font-semibold text-slate-900">
              No vendemos ni alquilamos tus datos personales a terceros bajo ninguna circunstancia.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              4. Terceros y enlaces de afiliados
            </h2>
            <p>
              Este sitio web utiliza enlaces de afiliados comerciales. Al hacer clic en ellos, puedes ser redirigido a sitios web de terceros, incluyendo redes de afiliados y tiendas oficiales de los vendedores.
            </p>
            <p>
              Esos terceros pueden emplear sus propias cookies y herramientas de seguimiento para registrar el clic, la venta y la atribución de comisión correspondiente. Te recomendamos revisar sus políticas de privacidad individuales, ya que no controlamos sus prácticas externas.
            </p>
            <p>
              También podemos utilizar herramientas de análisis y optimización de terceros, tales como Google Analytics, Bing Webmaster Tools y Google Search Console, con el fin de supervisar la disponibilidad técnica, la audiencia agregada y el posicionamiento del sitio web.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              5. Cookies
            </h2>
            <p>
              Usamos cookies necesarias para el funcionamiento seguro del sitio, cookies de preferencias y, con tu consentimiento cuando la legislación lo exija, cookies analíticas y de atribución de afiliados. Puedes gestionar o bloquear cookies desde la configuración de tu navegador.
            </p>
            <p>
              Para más información detallada, consulta nuestra{" "}
              <Link
                href="/legal/cookies"
                className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors"
              >
                Política de Cookies
              </Link>.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              6. Conservación de datos
            </h2>
            <p>
              Conservamos los datos de contacto únicamente el tiempo necesario para responder a tu mensaje y, en su caso, para dar cumplimiento a requerimientos legales. Los datos analíticos de navegación se conservan de forma agregada o anonimizada.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 7 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              7. Seguridad de la información
            </h2>
            <p>
              Aplicamos medidas razonables para proteger los datos, incluyendo cifrado HTTPS en todo el sitio y control restringido de accesos. Aunque nos esforzamos al máximo en salvaguardar la seguridad, ningún método de transmisión por internet es 100% invulnerable.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 8 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              8. Menores de edad
            </h2>
            <p>
              Este sitio está dirigido exclusivamente a personas adultas. No recopilamos intencionalmente datos de menores de 18 años. Si eres padre, madre o tutor y consideras que un menor nos ha proporcionado información personal, contáctanos inmediatamente para proceder a su eliminación.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 9 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              9. Tus derechos de privacidad
            </h2>
            <p>
              Dependiendo de tu país de residencia en Latinoamérica (como México, Colombia, Brasil, Argentina, Chile o Perú) o en otras jurisdicciones internacionales, puedes tener derechos para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Acceder a los datos personales que conservamos sobre ti.</li>
              <li>Rectificar información inexacta, desactualizada o incompleta.</li>
              <li>Cancelar o solicitar la supresión de tus datos.</li>
              <li>Oponerte al tratamiento o solicitar la limitación de ciertos usos.</li>
              <li>Solicitar la portabilidad de tus datos cuando sea técnicamente factible.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a
                href="mailto:reviewsnutritional@gmail.com"
                className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors"
              >
                reviewsnutritional@gmail.com
              </a>{" "}
              indicando tu nombre, el país desde el que nos contactas y el detalle de tu solicitud. Responderemos con la mayor celeridad conforme a los plazos previstos por la normativa aplicable.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 10 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              10. Transferencias internacionales
            </h2>
            <p>
              Nuestros servidores y proveedores de servicios tecnológicos pueden estar ubicados fuera de tu país de origen. Al utilizar este portal, aceptas que tus datos puedan ser procesados en otros territorios bajo las salvaguardas y principios de seguridad previstos en esta política.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 11 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              11. Cambios en esta política
            </h2>
            <p>
              Podemos modificar esta Política de Privacidad periódicamente. Toda actualización se publicará con la fecha de última actualización reflejada en la parte superior de esta página. Te aconsejamos revisarla de forma habitual.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 12 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              12. Contacto
            </h2>
            <p>
              Para cualquier pregunta, duda o solicitud relacionada con la privacidad, puedes contactarnos en:
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
