import Link from "next/link";

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
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews (“Nutritional Reviews”, “nosotros” o “nuestro”) respeta profundamente su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos la información cuando usted visita <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a>, consulta nuestros análisis de productos, explora categorías, se suscribe a actualizaciones, envía formularios o hace clic en enlaces a páginas de productos y ofertas de terceros.
          </p>
          <p>
            Esta Política de Privacidad se aplica a NutritionalReviews.org y a cualquier página, servicio o subdominio relacionado que enlace a esta política.
          </p>
          <p className="font-semibold text-slate-900">
            Al utilizar nuestro sitio web, usted acepta las prácticas descritas en esta Política de Privacidad.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Information We Collect */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Información que Recopilamos
            </h2>
            <p>
              Podemos recopilar información que usted nos proporcione directamente, información recopilada automáticamente cuando navega por el sitio web y datos limitados procedentes de herramientas de terceros.
            </p>
            <p>El tipo de información que podemos recopilar incluye:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Nombre y dirección de correo electrónico si nos contacta o se suscribe al boletín</li>
              <li>Mensajes o detalles enviados a través de formularios de contacto</li>
              <li>Dirección IP, tipo de navegador, modelo de dispositivo y sistema operativo</li>
              <li>Páginas visitadas, enlaces pulsados, tiempo de permanencia y actividad de navegación</li>
              <li>Datos de cookies, identificadores de sesión y datos analíticos</li>
              <li>Interacciones con enlaces de productos, clics en enlaces de afiliados y fuentes de referencia</li>
              <li>Preferencias de suscripción y tasa de interacción con comunicaciones por correo</li>
            </ul>
            <p className="text-slate-500 text-xs sm:text-sm italic bg-slate-50 border border-slate-100 rounded-xl p-4">
              No recopilamos de forma deliberada datos personales sensibles como números de identificación gubernamental, números de tarjetas de crédito o débito, historiales médicos privados ni credenciales bancarias a través de este sitio web.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: How We Collect Information */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cómo Recopilamos la Información
            </h2>
            <p>
              Recopilamos información de diversas formas según su interacción con nuestro portal.
            </p>
            <p>
              Parte de la información se recopila directamente cuando completa un formulario, se suscribe a nuestras alertas o nos envía un correo electrónico. Otra información se recopila automáticamente mediante cookies, registros de servidor, etiquetas analíticas y tecnologías similares de seguimiento.
            </p>
            <p>
              También podemos recibir métricas agregadas de herramientas de análisis, plataformas de afiliados, sistemas de prevención de spam y servicios de alojamiento seguro.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: How We Use Your Information */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cómo Utilizamos su Información
            </h2>
            <p>
              Utilizamos la información recopilada para operar, mantener, proteger y mejorar Nutritional Reviews.
            </p>
            <p>Podemos utilizar su información para:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Responder a sus consultas, mensajes, comentarios o solicitudes de corrección</li>
              <li>Enviar boletines informativos y guías cuando se haya suscrito voluntariamente</li>
              <li>Optimizar nuestros análisis, páginas de categorías y diseño del sitio web</li>
              <li>Analizar el comportamiento general de los visitantes y medir el tráfico</li>
              <li>Medir el rendimiento de enlaces y la efectividad de los análisis de productos</li>
              <li>Prevenir el spam, actividades fraudulentas y amenazas a la seguridad del portal</li>
              <li>Cumplir con las obligaciones legales aplicables</li>
            </ul>
            <p className="font-semibold text-slate-900">
              No vendemos directamente su información personal a terceros ni a corredores de datos.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Cookies and Tracking Technologies */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cookies y Tecnologías de Rastreo
            </h2>
            <p>
              Nutritional Reviews puede utilizar cookies, etiquetas y scripts técnicos para asegurar el correcto funcionamiento del portal, comprender los patrones de navegación y medir el rendimiento de los contenidos.
            </p>
            <p>
              Las cookies son pequeños ficheros que se almacenan en su navegador o dispositivo para recordar preferencias, registrar sesiones de navegación anónimas y optimizar la experiencia de usuario.
            </p>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm mt-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-900 border-b border-slate-100 font-bold">
                    <th className="p-4">Tipo de Cookie</th>
                    <th className="p-4">Finalidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Esenciales</td>
                    <td className="p-4">Permiten la navegación segura y funciones técnicas básicas</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Analíticas</td>
                    <td className="p-4">Nos ayudan a entender las visitas y el rendimiento de las páginas</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Afiliados</td>
                    <td className="p-4">Permiten registrar referencias válidas a tiendas oficiales</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies Publicitarias</td>
                    <td className="p-4">Miden la eficacia de campañas informativas y anuncios</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Cookies de Preferencia</td>
                    <td className="p-4">Guardan ajustes seleccionados por el usuario</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              Usted puede configurar o desactivar las cookies en cualquier momento a través de las preferencias de su navegador. Tenga en cuenta que bloquear ciertas cookies puede influir en la disponibilidad de algunas funciones técnicas.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Tools and Services */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Herramientas y Servicios de Terceros
            </h2>
            <p>
              Podemos emplear servicios de terceros para administrar, medir y proteger nuestro sitio web. Estos proveedores procesan información de acuerdo con sus propias políticas de privacidad.
            </p>
            <p>Entre los servicios utilizados pueden encontrarse:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Google Analytics para análisis de audiencia y comportamiento</li>
              <li>Google Search Console para supervisión del rendimiento de búsqueda</li>
              <li>Redes de afiliación para el seguimiento de referencias de productos</li>
              <li>Servicios de entrega de correo electrónico para el boletín informativo</li>
              <li>Proveedores de infraestructura en la nube y cortafuegos de seguridad</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Affiliate Links and Product Pages */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Enlaces de Afiliados y Páginas de Productos
            </h2>
            <p>
              Nutritional Reviews incluye enlaces a páginas de información detallada, ofertas oficiales de productos o pantallas de pago de terceros.
            </p>
            <p>
              Al hacer clic en un enlace a un producto externo, el sitio de destino puede registrar datos como su dirección IP, navegador y referencia de clic. Dichos sitios aplican sus propias políticas de privacidad y condiciones comerciales independientes.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Newsletter and Email Communication */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Boletín y Comunicaciones por Correo Electrónico
            </h2>
            <p>
              Si se suscribe a nuestro boletín, utilizaremos su correo electrónico exclusivamente para remitirle análisis de productos, guías de salud y resúmenes editoriales.
            </p>
            <p>
              Puede darse de baja en cualquier instante haciendo clic en el enlace de cancelación presente al pie de cada correo o enviándonos un mensaje directo.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: How We Share Information */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cómo Compartimos la Información
            </h2>
            <p>
              Solo compartimos datos limitados con proveedores de servicios de confianza necesarios para alojar el sitio, garantizar la seguridad, gestionar el correo y cumplir con normativas legales.
            </p>
            <p className="font-semibold text-slate-900">
              No comercializamos ni alquilamos datos personales a intermediarios comerciales de datos.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Data Retention */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Conservación de Datos
            </h2>
            <p>
              Conservamos la información personal únicamente durante el tiempo estrictamente necesario para los fines descritos en esta política o para cumplir con obligaciones legales y de archivo.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Data Security */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Seguridad de los Datos
            </h2>
            <p>
              Adoptamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a accesos no autorizados, pérdidas o alteraciones. Sin embargo, ningún sistema de transmisión por internet es infalible al 100%.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Your Privacy Rights */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sus Derechos de Privacidad
            </h2>
            <p>
              Dependiendo de su lugar de residencia (como la Unión Europea bajo el RGPD o California bajo la CCPA/CPRA), usted puede ostentar derechos para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Solicitar acceso a los datos personales que conservamos sobre usted</li>
              <li>Pedir la rectificación de información inexacta o desactualizada</li>
              <li>Solicitar la supresión o eliminación de sus datos personales</li>
              <li>Oponerse o limitar determinados tratamientos de sus datos</li>
              <li>Darse de baja de comunicaciones comerciales en cualquier momento</li>
              <li>Solicitar la portabilidad de sus datos en formato estructurado</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, contáctenos en la dirección indicada abajo.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Children’s Privacy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Privacidad de Menores
            </h2>
            <p>
              Nutritional Reviews no está dirigido a menores de 13 años (o 16 años según la legislación local). No recopilamos conscientemente datos de menores de edad.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Changes to This Privacy Policy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Modificaciones a esta Política de Privacidad
            </h2>
            <p>
              Podemos modificar esta Política de Privacidad periódicamente. Toda actualización se publicará con una nueva fecha de entrada en vigor en esta página.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Para consultas relativas a la privacidad o para ejercer sus derechos de datos, comuníquese con nosotros en:
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
