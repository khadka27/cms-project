export default function RefundPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="surface-shell rounded-3xl p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-bright_teal_blue">
          Política de Reembolso
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-slate-900">
          Política de reembolsos y devoluciones
        </h1>
        <p className="mt-4 text-sm text-slate-500">Última actualización: 8 de mayo de 2026</p>

        <section className="mt-8 space-y-4 text-sm sm:text-base text-slate-700">
          <p>
            Queremos que esté completamente satisfecho con su compra. Esta política explica
            cuándo se aplican los reembolsos y cómo solicitarlos.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Elegibilidad</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Las solicitudes deben enviarse dentro de los 30 días posteriores a la entrega.</li>
            <li>Los artículos deben estar sin usar y en su embalaje original intacto.</li>
            <li>Ciertos productos consumibles o precintados pueden no ser reembolsables por razones de higiene y seguridad.</li>
          </ul>
          <h2 className="text-lg font-semibold text-slate-900">
            Cómo solicitar un reembolso
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Envíe un correo electrónico con su número de pedido a support@nutritionalreviews.org.</li>
            <li>Nuestro equipo le responderá con las instrucciones de devolución.</li>
            <li>Los reembolsos se emiten utilizando el método de pago original.</li>
          </ol>
          <p>
            Los tiempos de procesamiento varían según el proveedor de pagos, normalmente entre 5 y 10
            días hábiles después de la aprobación.
          </p>
        </section>
      </article>
    </main>
  );
}
