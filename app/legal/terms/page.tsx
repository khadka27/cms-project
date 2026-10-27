import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Términos y Políticas
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Términos y Condiciones
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Fecha de entrada en vigor: 01/06/2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Bienvenido a Nutritional Reviews. Estos Términos y Condiciones (“Términos”) explican las normas para utilizar <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a>, nuestras páginas de análisis de productos, páginas de categorías, guías de compra, fichas informativas de productos y cualquier subdominio o servicio relacionado que enlace a estos Términos.
          </p>
          <p className="font-semibold text-slate-900">
            Al acceder o utilizar este sitio web, usted acepta cumplir con estos Términos. Si no está de acuerdo con estos Términos, le solicitamos que suspenda el uso del sitio web.
          </p>

          <hr className="border-slate-100" />

          {/* Section: About Nutritional Reviews */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Acerca de Nutritional Reviews
            </h2>
            <p>
              Nutritional Reviews es un portal de información de productos diseñado para ayudar a los compradores a investigar productos de comercio electrónico y bienestar en tendencia antes de visitar páginas oficiales o realizar pedidos.
            </p>
            <p>Nuestro sitio web puede incluir:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Análisis independientes de productos</li>
              <li>Guías para compradores</li>
              <li>Páginas de categorías de productos</li>
              <li>Resúmenes editoriales de productos</li>
              <li>Desgloses de ingredientes y características</li>
              <li>Notas sobre precios y disponibilidad verificada</li>
              <li>Enlaces a páginas informativas de fabricantes</li>
              <li>Enlaces a ofertas de terceros, plataformas de afiliados o pantallas de pago</li>
            </ul>
            <p>
              Nutritional Reviews no es el fabricante, propietario ni vendedor directo de los productos mencionados en el sitio web a menos que se indique expresamente lo contrario. La información sobre productos se proporciona únicamente con fines de investigación general e informativos.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Website Use */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Uso del Sitio Web
            </h2>
            <p>
              Usted puede utilizar Nutritional Reviews para fines personales, no comerciales y de investigación informativa.
            </p>
            <p>
              Usted se compromete a utilizar el sitio web únicamente de manera legal y respetuosa. Puede consultar nuestros contenidos, leer valoraciones de productos, comparar especificaciones y utilizar enlaces para continuar su propia investigación.
            </p>
            <p className="font-semibold text-slate-900">
              No puede utilizar este sitio web de manera que dañe el sitio, interrumpa su funcionamiento, haga un uso indebido de sus contenidos o infrinja las leyes aplicables.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: No Misuse of the Website */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Prohibición de Uso Indebido del Sitio Web
            </h2>
            <p>
              Usted se compromete a no hacer un uso indebido de Nutritional Reviews ni de sus contenidos.
            </p>
            <p>Las actividades prohibidas incluyen, entre otras:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Copiar, extraer (scrapear) o volver a publicar partes sustanciales del contenido del sitio web sin autorización previa</li>
              <li>Utilizar robots, rastreadores automatizados o scripts para extraer contenido de forma masiva o dañina</li>
              <li>Intentar hackear, dañar, sobrecargar o interferir con la infraestructura técnica del sitio web</li>
              <li>Cargar o transmitir código malicioso, virus, spam o contenido dañino</li>
              <li>Utilizar el sitio web para fraudes, prácticas engañosas o fines ilícitos</li>
              <li>Hacerse pasar por Nutritional Reviews o afirmar falsamente una relación de afiliación con nosotros</li>
              <li>Eliminar avisos de derechos de autor, descargos de responsabilidad o atribuciones en nuestros contenidos</li>
            </ul>
            <p>
              Nos reservamos el derecho de restringir el acceso al sitio web si determinamos que un usuario ha infringido estos Términos o ha actuado de manera perjudicial.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Content Accuracy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Exactitud del Contenido
            </h2>
            <p>
              Nos esforzamos por proporcionar información clara, útil y actualizada sobre los productos. Sin embargo, los detalles de los productos pueden cambiar con el tiempo.
            </p>
            <p>
              Los precios, descuentos, promociones, disponibilidad, condiciones de envío, políticas de devolución, garantías, características, ingredientes y especificaciones pueden ser modificados por los fabricantes sin previo aviso.
            </p>
            <p>
              Debido a que muchos productos son comercializados a través de sitios web de terceros, no podemos garantizar que toda la información en Nutritional Reviews sea en todo momento completa, libre de errores o exhaustiva.
            </p>
            <p className="font-semibold text-slate-900">
              Antes de tomar una decisión de compra, le recomendamos revisar siempre la página oficial del producto, la información del vendedor, la pantalla de pago, los términos y condiciones, y las políticas de devolución vigentes.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Product Reviews and Buyer Guides */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Análisis de Productos y Guías de Compra
            </h2>
            <p>
              Nuestros análisis y guías están creados para ayudar a los usuarios a evaluar los productos de forma transparente antes de visitar una página oficial o realizar un pedido.
            </p>
            <p>Nuestros análisis pueden abordar:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Qué es el producto y su propósito</li>
              <li>Beneficios atribuidos y principios activos</li>
              <li>Características clave y especificaciones técnicas</li>
              <li>Puntos fuertes y limitaciones (pros y contras)</li>
              <li>Precios comparativos y disponibilidad</li>
              <li>Perfil de idoneidad para el usuario</li>
              <li>Recomendaciones de uso y precauciones</li>
              <li>Preguntas frecuentes de los compradores</li>
            </ul>
            <p>
              Nuestro contenido no debe considerarse como asesoramiento médico, diagnóstico profesional, asesoramiento financiero ni como garantía del rendimiento individual de un producto.
            </p>
            <p className="font-semibold text-slate-900">
              Los resultados, experiencias y niveles de satisfacción con cualquier producto pueden variar en cada individuo.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Affiliate Links and Commercial Relationships */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Enlaces de Afiliados y Relaciones Comerciales
            </h2>
            <p>
              Algunos enlaces en Nutritional Reviews pueden ser enlaces de afiliados, enlaces patrocinados o enlaces directos a pasarelas de pago de terceros.
            </p>
            <p>
              Esto significa que podemos percibir una comisión si hace clic en determinados enlaces o adquiere productos a través de ellos, sin ningún costo adicional para usted.
            </p>
            <p>
              Las relaciones de afiliación no implican que todos los productos sean adecuados para todos los usuarios. Usted es responsable de verificar los detalles del producto, precios, términos y políticas de devolución antes de comprar.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: External Links and Third-Party Websites */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Enlaces Externos y Sitios Web de Terceros
            </h2>
            <p>
              Nutritional Reviews puede contener enlaces a sitios web externos, vendedores independientes, plataformas de pago o redes publicitarias.
            </p>
            <p>
              Una vez que abandona Nutritional Reviews y accede a un sitio web de terceros, se aplican los términos, políticas de privacidad y condiciones comerciales de dicho tercero.
            </p>
            <p>No controlamos los sitios web de terceros y no somos responsables de:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Cambios de precios en sitios de terceros</li>
              <li>Disponibilidad de existencias o cancelaciones</li>
              <li>Retrasos o problemas en los envíos</li>
              <li>Resoluciones sobre solicitudes de reembolso</li>
              <li>Dificultades en pasarelas de pago externas</li>
              <li>Calidad o defectos del producto suministrado</li>
              <li>Afirmaciones comerciales de vendedores independientes</li>
              <li>Servicio de atención al cliente de vendedores externos</li>
            </ul>
            <p className="font-semibold text-slate-900">
              Le aconsejamos revisar minuciosamente las políticas de cualquier sitio web de terceros antes de suministrar datos personales o efectuar transacciones.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: No Professional Advice */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sin Asesoramiento Profesional
            </h2>
            <p>
              El contenido de Nutritional Reviews se brinda con fines exclusivamente informativos y de divulgación. Nada en este sitio web debe interpretarse como asesoramiento profesional.
            </p>
            <p>Esto comprende, entre otros:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Asesoramiento médico o clínico</li>
              <li>Prescripción de suplementos o regímenes dietéticos</li>
              <li>Asesoramiento legal o tributario</li>
              <li>Asesoramiento financiero o de inversión</li>
            </ul>
            <p>
              Para productos de bienestar, nutrición, belleza o suplementación alimenticia, consulte a un profesional de la salud cualificado antes de su uso si padece afecciones médicas, alergias, embarazo o toma medicamentos recetados.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: User Responsibility */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Responsabilidad del Usuario
            </h2>
            <p>
              Usted es responsable de la forma en que utiliza la información proporcionada en Nutritional Reviews.
            </p>
            <p>
              Antes de adquirir cualquier producto, valore sus propias necesidades individuales, presupuesto, posibles sensibilidades y compatibilidad.
            </p>
            <p className="font-semibold text-slate-900">
              Usted reconoce que cualquier decisión de compra tomada tras consultar nuestro sitio web es de su exclusiva responsabilidad.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Intellectual Property */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Propiedad Intelectual
            </h2>
            <p>
              Los contenidos de Nutritional Reviews, incluidos textos, diseños, gráficos, logotipos, estilos y código original, son propiedad exclusiva de Nutritional Reviews o están licenciados a su favor, salvo que se especifique lo contrario.
            </p>
            <p>
              Usted puede consultar y utilizar el contenido para su investigación personal. No está permitida la reproducción, copia, distribución, modificación ni explotación comercial de nuestros contenidos sin autorización previa por escrito.
            </p>
            <p>
              Los nombres comerciales, marcas registradas y logotipos de productos mencionados pertenecen a sus respectivos titulares legítimos. Su mención no implica patrocinio ni propiedad por parte de Nutritional Reviews.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: User Submissions */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Comunicaciones y Comentarios de Usuarios
            </h2>
            <p>
              Si nos envía un mensaje, sugerencia de corrección, comentario o consulta a través del sitio web o por correo electrónico, garantiza que la información proporcionada es veraz según su leal saber y entender.
            </p>
            <p>
              Acepta no remitir contenidos ilícitos, agraviantes, difamatorios, lesivos ni que infrinjan derechos de terceros.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Limitation of Liability */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Limitación de Responsabilidad
            </h2>
            <p>
              Nutritional Reviews se proporciona “tal cual” y según su disponibilidad técnica.
            </p>
            <p>
              En la máxima medida permitida por la ley, Nutritional Reviews y su equipo no se hacen responsables de pérdidas, daños o reclamaciones derivados de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>El uso o la imposibilidad de uso del sitio web</li>
              <li>La confianza depositada en los análisis y guías publicados</li>
              <li>Compras realizadas en sitios web vinculados de terceros</li>
              <li>Actos, omisiones o políticas de vendedores externos</li>
              <li>Rendimiento o ausencia de resultados en productos evaluados</li>
              <li>Interrupciones técnicas, errores del servidor o caídas de conectividad</li>
              <li>Información de productos desactualizada o modificada por terceros</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Privacy */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Privacidad y Protección de Datos
            </h2>
            <p>
              El uso de Nutritional Reviews se rige además por nuestra Política de Privacidad.
            </p>
            <p>
              Dicha política describe cómo recopilamos, gestionamos y protegemos sus datos de navegación. Le invitamos a revisar nuestra <Link href="/legal/privacy" className="text-bright_teal_blue hover:text-french_blue transition-colors font-bold">Política de Privacidad</Link> detallada.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Changes to These Terms */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Modificaciones a estos Términos
            </h2>
            <p>
              Podemos actualizar estos Términos periódicamente para reflejar cambios en nuestras operaciones, requisitos legales o servicios ofrecidos.
            </p>
            <p>
              Al actualizar estos Términos, actualizaremos la fecha de entrada en vigor en la cabecera. El uso continuado del sitio tras la publicación de los cambios constituye su aceptación íntegra de los nuevos Términos.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Governing Law */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Ley Aplicable
            </h2>
            <p>
              Estos Términos se regirán e interpretarán de conformidad con las leyes de los Estados Unidos, sin perjuicio de las disposiciones en materia de conflicto de leyes.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si tiene preguntas o inquietudes respecto a estos Términos y Condiciones, puede comunicarse con nosotros en:
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
