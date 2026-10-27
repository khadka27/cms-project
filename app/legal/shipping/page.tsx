export default function ShippingPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue">
          Política de Envíos
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-slate-900">
          Política de envíos y entregas
        </h1>
        <p className="mt-4 text-sm text-slate-500">Última actualización: 8 de mayo de 2026</p>

        <section className="mt-8 space-y-4 text-sm sm:text-base text-slate-700">
          <p>
            Nuestro objetivo es entregar su pedido de forma rápida y confiable. Esta política
            describe nuestros plazos de preparación y logística de envío.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Tiempo de preparación
          </h2>
          <p>
            Los pedidos se procesan en un plazo de 1 a 3 días hábiles, excluyendo
            fines de semana y días festivos.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Plazos de entrega estimados
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Envío nacional estándar: de 3 a 7 días hábiles.</li>
            <li>Envío nacional exprés: de 1 a 3 días hábiles.</li>
            <li>Envío internacional: de 7 a 21 días hábiles según aduanas.</li>
          </ul>
          <h2 className="text-lg font-semibold text-slate-900">Seguimiento de envío</h2>
          <p>Recibirá un enlace de seguimiento oficial por correo electrónico en cuanto su pedido sea despachado.</p>
        </section>
      </article>
    </main>
  );
}
