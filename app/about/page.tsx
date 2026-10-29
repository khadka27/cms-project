import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | NutritionalReviews",
  description: "Conozca más sobre NutritionalReviews y nuestro compromiso con el bienestar y la vida saludable.",
  alternates: {
    canonical: "https://nutritionalreviews.org/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d4eff7] via-[#e5f5f9] to-[#daf0f6] flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Sobre <span className="text-bright_teal_blue">NutritionalReviews</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mejorando su estilo de vida con un enfoque integral de bienestar y productos de salud seleccionados. 
            Creemos que una vida saludable es la base de una vida plena.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Nuestra Misión</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              En NutritionalReviews, nuestra misión es empoderar a las personas para que tomen el control de su bienestar. 
              Seleccionamos y analizamos rigurosamente productos de bienestar, suplementos y soluciones de estilo de vida para 
              respaldarlo en el logro de sus metas personales de salud.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">¿Por Qué Elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 bg-light_cyan/30 rounded-2xl border border-turquoise_surf/30 transition-all hover:shadow-md hover:bg-light_cyan/50">
                <h3 className="font-semibold text-deep_twilight mb-2">Calidad Seleccionada</h3>
                <p className="text-sm text-french_blue">Cada producto es verificado en cuanto a eficacia, seguridad e ingredientes de primera calidad.</p>
              </div>
              <div className="p-6 bg-sky_aqua/15 rounded-2xl border border-sky_aqua/30 transition-all hover:shadow-md hover:bg-sky_aqua/25">
                <h3 className="font-semibold text-deep_twilight mb-2">Respaldado por Expertos</h3>
                <p className="text-sm text-french_blue">Nuestro catálogo es analizado y contrastado por profesionales de la salud y nutrición.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
