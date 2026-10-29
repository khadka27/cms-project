import Link from "next/link";
import { Link2, HelpCircle, FileText, Settings, Globe, AlertTriangle, ShieldCheck, Mail } from "lucide-react";

export default function ExternalLinksPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-bright_teal_blue mb-3 block">
          Navegación y Transparencia
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Política de Enlaces Externos
        </h1>
        <p className="mt-4 text-sm font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-fit">
          Última actualización: 27 de octubre de 2026
        </p>

        <section className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Nutritional Reviews es un portal de investigación de productos creado para orientar a los consumidores a través de análisis, guías de compra, páginas de categorías y fichas técnicas.
          </p>
          <p>
            Nuestro sitio web incluye enlaces a sitios web externos, tiendas oficiales de fabricantes, pasarelas de pago y recursos científicos. Esta Política de Enlaces Externos explica cómo se presentan dichos enlaces en <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue font-bold transition-colors">NutritionalReviews.org</a> y qué debe tener en cuenta antes de acceder a ellos.
          </p>

          <hr className="border-slate-100" />

          {/* Section: Why We Use External Links */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Por Qué Incluimos Enlaces Externos
            </h2>
            <p>
              Los enlaces externos permiten a los lectores contrastar información y continuar su investigación directamente en las fuentes oficiales o en tiendas verificadas para verificar:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Páginas oficiales de producto y disponibilidad de inventario</li>
              <li>Precios vigentes, promociones por volumen y descuentos temporales</li>
              <li>Políticas de devolución y garantías del fabricante</li>
              <li>Estudios clínicos y publicaciones científicas de referencia</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Third-Party Websites */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sitios Web de Terceros y Deslinde de Responsabilidad
            </h2>
            <p>
              Una vez que hace clic en un enlace externo y abandona Nutritional Reviews, pasa a regirse por los términos, condiciones y políticas de privacidad del sitio de destino.
            </p>
            <p className="font-semibold text-slate-900">
              Nutritional Reviews no tiene control sobre la infraestructura, precios, políticas de privacidad ni atención al cliente de plataformas de terceros.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Contact Us */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contacto
            </h2>
            <p>
              Si detecta un enlace roto, engañoso o inactivo en nuestro portal, le agradecemos que nos lo comunique a:
            </p>
            <div className="bg-gradient-to-br from-[#f4fcfe] to-[#f8fbff] border border-light_cyan/80 rounded-2xl p-5 space-y-2 text-slate-800 text-xs sm:text-sm font-semibold max-w-md">
              <p>Nutritional Reviews</p>
              <p>Correo electrónico: <a href="mailto:reviewsnutritional@gmail.com" className="text-bright_teal_blue hover:text-french_blue transition-colors">reviewsnutritional@gmail.com</a></p>
              <p>Sitio web: <a href="https://nutritionalreviews.org" className="text-bright_teal_blue hover:text-french_blue transition-colors">https://nutritionalreviews.org</a></p>
            </div>
          </div>

        </section>
      </article>
    </main>
  );
}
