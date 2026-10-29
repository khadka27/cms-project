import { Metadata } from "next";
import Link from "next/link";
import { Mail, HelpCircle, FileText, Lock, Globe, ShieldAlert, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contáctenos | Nutritional Reviews",
  description: "Póngase en contacto con Nutritional Reviews para consultas, solicitudes de corrección, privacidad o consultas comerciales.",
  alternates: {
    canonical: "https://nutritionalreviews.org/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12 fade-in-up">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
            Soporte y Consultas
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Contáctenos
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nutritional Reviews es un centro de información de productos creado para ayudar a los compradores a investigar productos destacados de salud y nutrición mediante análisis claros, guías de compra, páginas de categoría, resúmenes de productos y páginas especializadas de información.
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-4">
            Si tiene una pregunta, solicitud de corrección, inquietud de privacidad o problema relacionado con la información de productos en nuestro sitio web, puede comunicarse con nosotros mediante los detalles a continuación.
          </p>
        </div>

        {/* Quick Contact Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-10 fade-in-up">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <Mail className="h-6 w-6 text-bright_teal_blue" />
            Cómo Contactar a Nutritional Reviews
          </h2>
          <p className="text-slate-600 mb-6">
            Para preguntas generales, solicitudes de corrección, consultas de privacidad o inquietudes sobre información de productos, envíenos un correo electrónico a:
          </p>
          
          <div className="bg-gradient-to-br from-[#f4fcfe] to-[#f8fbff] border border-light_cyan/80 rounded-2xl p-6 mb-6 max-w-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-bright_teal_blue">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Soporte por Correo</p>
                <a href="mailto:reviewsnutritional@gmail.com" className="text-lg sm:text-xl font-bold text-bright_teal_blue hover:text-french_blue transition-colors">
                  reviewsnutritional@gmail.com
                </a>
              </div>
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-500 border-l-4 border-bright_teal_blue pl-4 py-1">
            Nos esforzamos por revisar los mensajes lo antes posible. En la mayoría de los casos, puede esperar una respuesta en un plazo de <span className="text-slate-800">2 a 5 días hábiles</span>, dependiendo de la naturaleza de su solicitud y el volumen de mensajes.
          </p>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 fade-in-up">
          {/* Box 1: What We Cover */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-bright_teal_blue" />
              Sobre Qué Puede Consultarnos
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Las razones comunes para contactarnos incluyen:
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-inside list-disc">
              <li>Preguntas sobre nuestros análisis de productos o guías de compra</li>
              <li>Solicitudes para corregir información desactualizada de productos</li>
              <li>Consultas sobre precios, disponibilidad o detalles de ofertas</li>
              <li>Reportes de enlaces rotos o enlaces incorrectos a páginas de productos</li>
              <li>Solicitudes de privacidad o preguntas relacionadas con cookies</li>
              <li>Dudas sobre divulgación de afiliados o publicidad</li>
              <li>Comentarios generales sobre el sitio web o consultas comerciales</li>
            </ul>
            <p className="text-xs text-slate-400 mt-4 italic">
              Por favor incluya suficientes detalles en su mensaje para que podamos entender su solicitud con claridad.
            </p>
          </div>

          {/* Box 2: Response Time Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-bright_teal_blue" />
                Detalles del Tiempo de Respuesta
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Hacemos todo lo posible para responder a mensajes legítimos en un plazo de 2 a 5 días hábiles. Los tiempos de respuesta pueden variar según:
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-inside list-disc mb-4">
                <li>Volumen general de mensajes</li>
                <li>Complejidad de la solicitud o pasos de verificación</li>
                <li>Requisitos de investigación del producto o revisión de correcciones</li>
                <li>Necesidades de verificación de privacidad e identidad</li>
                <li>Tipo de consulta comercial</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400 border-t border-slate-100 pt-4 italic">
              Nota: Enviar mensajes repetidos puede retrasar el proceso de revisión.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 space-y-8 fade-in-up">
          
          {/* Section: Product Information Correction Requests */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-bright_teal_blue" />
              Solicitudes de Corrección de Información del Producto
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Los detalles de los productos pueden cambiar con el tiempo. Precios, descuentos, paquetes, información de envío, políticas de reembolso, disponibilidad y términos de garantía pueden ser actualizados por vendedores externos, plataformas de afiliados o páginas de ofertas de productos sin previo aviso.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
              <p className="text-sm font-semibold text-slate-800">
                Si observa información desactualizada, incorrecta, incompleta o poco clara sobre un producto en Nutritional Reviews, comuníquese con nosotros e incluya:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>El nombre del producto</li>
                <li>La URL de la página donde encontró el problema</li>
                <li>Una breve explicación de lo que necesita corrección</li>
                <li>Cualquier fuente o información actualizada que desee que revisemos</li>
              </ul>
            </div>
            <p className="text-slate-600 text-sm">
              Revisaremos las solicitudes de corrección y actualizaremos el contenido cuando consideremos que los cambios son necesarios y estén respaldados por la información disponible.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Privacy Requests */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Lock className="h-6 w-6 text-bright_teal_blue" />
              Solicitudes de Privacidad
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Si tiene una pregunta relacionada con la privacidad o desea realizar una solicitud de datos, puede comunicarse con nosotros en: <a href="mailto:reviewsnutritional@gmail.com" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">reviewsnutritional@gmail.com</a>.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-800 mb-2">Las solicitudes relacionadas con la privacidad pueden incluir:</p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>Solicitar acceso a la información personal que podamos tener sobre usted</li>
                <li>Pedirnos que corrijamos o eliminemos su información</li>
                <li>Cancelar la suscripción a las actualizaciones por correo electrónico</li>
                <li>Hacer preguntas sobre cookies o seguimiento</li>
                <li>Solicitar información sobre cómo se pueden utilizar sus datos</li>
              </ul>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">
              Para más detalles, consulte nuestra <Link href="/legal/privacy" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">Política de Privacidad</Link> y nuestra <Link href="/legal/cookies" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">Política de Cookies</Link>.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Product Pages and Offers */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Globe className="h-6 w-6 text-bright_teal_blue" />
              Páginas y Ofertas de Productos de Terceros
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Nutritional Reviews puede enlazar a páginas de información de productos, subdominios de productos, páginas de afiliados, ofertas de terceros, páginas de pago o sitios web promocionales de productos.
            </p>
            <p className="text-slate-600 text-sm sm:text-base">
              Tenga en cuenta que no controlamos a los vendedores externos, páginas de pago, envíos, devoluciones, reembolsos, garantías, procesamiento de pagos o servicio al cliente de sitios web de productos externos.
            </p>
            <p className="font-semibold text-slate-900 text-sm">
              Si su pregunta es sobre un pedido, pago, reembolso, entrega, suscripción o problema de soporte del producto, deberá comunicarse directamente con el vendedor del producto o el proveedor de pago.
            </p>
            <p className="text-slate-600 text-sm">
              Sin embargo, si cree que uno de nuestros enlaces es incorrecto, está desactualizado, es engañoso o está roto, puede informárnoslo.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Business and Partnership Inquiries */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Globe className="h-6 w-6 text-bright_teal_blue" />
              Consultas Comerciales y de Asociaciones
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Para consultas comerciales, publicidad, colocaciones patrocinadas, afiliados o asociaciones, puede contactarnos en: <a href="mailto:reviewsnutritional@gmail.com" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">reviewsnutritional@gmail.com</a>.
            </p>
            <p className="text-slate-600 text-sm">
              Por favor incluya su nombre, nombre de la empresa si corresponde, sitio web, detalles del producto y el propósito de su consulta. Revisamos las oportunidades de asociación con atención y es posible que no respondamos a todas las solicitudes promocionales.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Important Note & Disclaimer */}
          <div className="space-y-4 bg-light_cyan/30 border border-turquoise_surf/30 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-deep_twilight flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-bright_teal_blue" />
              Nota de Seguridad Importante
            </h3>
            <p className="text-french_blue text-xs sm:text-sm leading-relaxed">
              No envíe información personal sensible por correo electrónico o formularios de contacto a menos que sea necesario. Esto incluye detalles de pago, contraseñas, información médica privada, números de identificación gubernamental o información confidencial de cuentas.
            </p>
            <p className="text-french_blue text-xs sm:text-sm leading-relaxed font-semibold">
              Nutritional Reviews proporciona análisis de productos, guías de compra, páginas de categorías y recursos de información con fines de investigación general únicamente. Nuestro contenido no constituye asesoramiento profesional y los visitantes siempre deben verificar los detalles actuales del producto, precios, términos y políticas antes de tomar una decisión de compra.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Details Footer Block */}
          <div className="pt-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.25em] text-slate-400 mb-4">
              Detalles de Contacto de Nutritional Reviews
            </h3>
            <div className="bg-gradient-to-br from-[#f4fcfe] to-[#f8fbff] border border-light_cyan/80 rounded-2xl p-6 space-y-2 text-slate-800 text-sm font-semibold max-w-md">
              <p>Nutritional Reviews</p>
              <p>Sitio Web: <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue transition-colors">https://nutritionalreviews.org</a></p>
              <p>Correo: <a href="mailto:reviewsnutritional@gmail.com" className="text-bright_teal_blue hover:text-french_blue transition-colors">reviewsnutritional@gmail.com</a></p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
