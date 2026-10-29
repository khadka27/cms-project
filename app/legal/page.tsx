import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Información Legal y Políticas | NutritionalReviews.org",
  description:
    "Consulte las políticas legales, privacidad, términos de uso, descargo de salud y divulgación de afiliados de NutritionalReviews.org.",
  alternates: {
    canonical: "https://nutritionalreviews.org/legal",
  },
};

const legalPages = [
  {
    title: "Política de Privacidad",
    description: "Cómo recopilamos, utilizamos y protegemos sus datos personales y sus derechos.",
    href: "/legal/privacy",
    primary: true,
  },
  {
    title: "Términos de Uso",
    description: "Reglas, condiciones y límites de responsabilidad para el uso de NutritionalReviews.",
    href: "/legal/terms",
    primary: true,
  },
  {
    title: "Descargo de Responsabilidad de Salud",
    description: "Aviso legal sobre contenido informativo, suplementos alimenticios y consulta profesional.",
    href: "/legal/disclaimer",
    primary: true,
  },
  {
    title: "Divulgación de Afiliados",
    description: "Transparencia sobre enlaces de compra, comisiones y nuestra independencia editorial.",
    href: "/legal/affiliate",
    primary: true,
  },
  {
    title: "Política de Cookies",
    description: "Qué cookies empleamos, herramientas de análisis y cómo gestionar sus preferencias.",
    href: "/legal/cookies",
    primary: true,
  },
  {
    title: "Divulgación de Publicidad",
    description: "Transparencia publicitaria, anuncios de terceros y estándares comerciales.",
    href: "/legal/advertising",
    primary: false,
  },
  {
    title: "Política de Correcciones",
    description: "Cómo gestionamos rectificaciones, actualizaciones de datos y fe de erratas.",
    href: "/legal/corrections",
    primary: false,
  },
  {
    title: "Proceso Editorial",
    description: "Nuestros estándares editoriales, verificación y rigor en análisis de salud.",
    href: "/legal/editorial",
    primary: false,
  },
  {
    title: "Enlaces Externos",
    description: "Pautas de navegación respecto a tiendas oficiales y enlaces a terceros.",
    href: "/legal/external-links",
    primary: false,
  },
  {
    title: "Cómo Evaluamos Productos",
    description: "Nuestra metodología de análisis, despiece de fórmulas y criterios de valoración.",
    href: "/legal/how-we-review",
    primary: false,
  },
  {
    title: "Política de Reembolso",
    description: "Pautas sobre devoluciones y atención al cliente en tiendas de fabricantes.",
    href: "/legal/refunds",
    primary: false,
  },
  {
    title: "Política de Envíos",
    description: "Directrices generales sobre plazos de entrega y logística de terceros.",
    href: "/legal/shipping",
    primary: false,
  },
];

export default function LegalIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue font-bold">
          Centro Legal y Transparencia
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-slate-900">
          Información legal
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Consulte las políticas y directrices que rigen el uso de NutritionalReviews.org,
          la protección de sus datos personales, la divulgación sobre enlaces de afiliados y las
          advertencias sobre información de salud.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`group rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 ${
                page.primary
                  ? "border-bright_teal_blue/30 bg-white hover:border-bright_teal_blue hover:shadow-md"
                  : "border-slate-100 bg-white/80 hover:border-turquoise_surf/40 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-bright_teal_blue transition-colors">
                  {page.title}
                </h2>
                <span className="text-bright_teal_blue text-sm font-medium transition group-hover:text-french_blue">
                  Ver →
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
