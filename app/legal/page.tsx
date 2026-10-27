import Link from "next/link";

const legalPages = [
  {
    title: "Política de Privacidad",
    description: "Cómo recopilamos, utilizamos y protegemos sus datos.",
    href: "/legal/privacy",
  },
  {
    title: "Términos de Servicio",
    description: "Reglas y condiciones para el uso de NutritionalReviews.",
    href: "/legal/terms",
  },
  {
    title: "Política de Reembolso",
    description: "Elegibilidad, plazos y procedimiento de devoluciones.",
    href: "/legal/refunds",
  },
  {
    title: "Política de Envíos",
    description: "Tiempos de preparación, seguimiento e información de entrega.",
    href: "/legal/shipping",
  },
  {
    title: "Política de Cookies",
    description: "Qué cookies utilizamos y cómo gestionar sus preferencias.",
    href: "/legal/cookies",
  },
  {
    title: "Divulgación de Publicidad",
    description: "Transparencia publicitaria y estándares comerciales.",
    href: "/legal/advertising",
  },
  {
    title: "Divulgación de Afiliados",
    description: "Información sobre nuestras relaciones y enlaces de afiliados.",
    href: "/legal/affiliate",
  },
  {
    title: "Política de Correcciones",
    description: "Cómo gestionamos correcciones y actualizaciones de datos.",
    href: "/legal/corrections",
  },
  {
    title: "Aviso Legal y Descargo",
    description: "Descargo de responsabilidad de salud y productos.",
    href: "/legal/disclaimer",
  },
  {
    title: "Proceso Editorial",
    description: "Nuestros estándares editoriales e integridad científica.",
    href: "/legal/editorial",
  },
  {
    title: "Enlaces Externos",
    description: "Pautas y políticas respecto a enlaces de terceros.",
    href: "/legal/external-links",
  },
  {
    title: "Cómo Evaluamos Productos",
    description: "Nuestra metodología de análisis y pruebas independientes.",
    href: "/legal/how-we-review",
  },
];

export default function LegalIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue font-bold">
          Legal
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-slate-900">
          Información legal
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl">
          Consulte las políticas que rigen el uso de NutritionalReviews, la protección de sus datos
          y las compras realizadas a través de enlaces verificados.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-turquoise_surf/40 hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  {page.title}
                </h2>
                <span className="text-bright_teal_blue text-sm font-medium transition group-hover:text-french_blue">
                  Ver
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
