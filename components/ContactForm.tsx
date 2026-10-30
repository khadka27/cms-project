"use client";

import { useState, useTransition } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  FileEdit,
  Shield,
  MessageSquare,
  User,
  Tag,
} from "lucide-react";

const TOPICS = [
  { id: "consulta-general", label: "Consulta General", icon: HelpCircle },
  { id: "correccion-producto", label: "Corrección de Producto", icon: FileEdit },
  { id: "enlace-roto", label: "Reportar Enlace Roto", icon: AlertCircle },
  { id: "privacidad", label: "Privacidad y Datos", icon: Shield },
  { id: "comercial", label: "Asociaciones / Prensa", icon: Tag },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("consulta-general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("reviewsnutritional@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Por favor ingrese su nombre (mínimo 2 caracteres).");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMessage("Por favor ingrese un correo electrónico válido.");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage("Por favor escriba un mensaje de al menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedTopicLabel =
        TOPICS.find((t) => t.id === topic)?.label || "Consulta General";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic: selectedTopicLabel,
          subject: subject.trim() || undefined,
          message: message.trim(),
          _hp: honeypot,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || "Error al enviar el mensaje. Por favor intente más tarde."
        );
      }

      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "No se pudo enviar el mensaje. Por favor escríbanos directamente a reviewsnutritional@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* ── Contact Options Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Column: Contact Direct Info & Trust Badges ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-light_cyan relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-light_cyan/40 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bright_teal_blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-bright_teal_blue" />
              </span>
              <span className="text-xs font-bold text-french_blue uppercase tracking-wider">
                Canal Oficial de Correo
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 leading-tight">
              Escríbanos Directamente
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Para consultas editoriales, reportes de enlaces, solicitudes de corrección de información de productos o dudas sobre privacidad:
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-[#eef8fb] border border-light_cyan flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-french_blue shadow-2xs flex-shrink-0">
                  <Mail className="w-5 h-5 text-bright_teal_blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Bandeja Principal
                  </p>
                  <a
                    href="mailto:reviewsnutritional@gmail.com"
                    className="text-xs sm:text-sm font-bold text-french_blue hover:text-bright_teal_blue transition-colors truncate block"
                  >
                    reviewsnutritional@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-light_cyan text-slate-700 hover:text-french_blue border border-light_cyan transition-all flex-shrink-0 cursor-pointer shadow-2xs"
                title="Copiar correo"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <span className="font-bold text-french_blue">•</span>
              <p>
                <strong>Tiempo estimado de respuesta:</strong> Entre 2 y 5 días hábiles según la investigación requerida.
              </p>
            </div>
          </div>

          {/* Guidelines Mini Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-light_cyan space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-bright_teal_blue" />
              Directrices de Privacidad y Seguridad
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No envíe información médica confidencial, datos de pago ni contraseñas por este formulario. Las compras se realizan directamente con el vendedor oficial.
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
                <span>Respuestas basadas en fuentes públicas y verificadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-bright_teal_blue flex-shrink-0" />
                <span>Sin venta de datos personales a terceros</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Right Column: Interactive Contact Form with Animated Button ── */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-light_cyan/80 relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-french_blue via-bright_teal_blue to-turquoise_surf absolute top-0 left-0" />

            {submitSuccess ? (
              /* Success State */
              <div className="py-12 sm:py-16 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-200/60 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mensaje Entregado</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    ¡Gracias por contactarnos!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Hemos recibido su mensaje a través de nuestro servidor de correo. Nuestro equipo editorial revisará su consulta y le responderá a la brevedad.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-french_blue hover:bg-deep_twilight text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <span>Enviar otro mensaje</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Formulario de Contacto
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Complete los campos a continuación para remitir su mensaje a nuestro equipo.
                  </p>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold">No se pudo enviar el formulario</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Honeypot field (hidden from real users, traps spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_hp">Leave this field blank</label>
                  <input
                    id="_hp"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Topic Selector Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Motivo de la Consulta <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const Icon = t.icon;
                      const active = topic === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? "bg-french_blue text-white shadow-sm ring-2 ring-french_blue/20"
                              : "bg-[#eef8fb] text-slate-700 hover:bg-light_cyan/60 border border-light_cyan"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email inputs in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Nombre Completo <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu-correo@ejemplo.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Asunto del Mensaje
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ej. Consulta sobre análisis de proteína o actualización de precio"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        message.length > 2800 ? "text-amber-600 font-bold" : "text-slate-400"
                      }`}
                    >
                      {message.length} / 3000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escriba aquí los detalles de su consulta, URL del producto si aplica y observaciones detalladas..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent transition-all resize-y min-h-[120px]"
                  />
                </div>

                {/* ── Awesome Animated Submit Button ── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-french_blue via-bright_teal_blue to-french_blue bg-[length:200%_auto] p-0.5 font-bold text-white shadow-lg shadow-bright_teal_blue/25 transition-all duration-500 hover:bg-[position:right_center] hover:shadow-xl hover:shadow-bright_teal_blue/35 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {/* Inner button container with glow and interactive micro-animations */}
                    <div className="relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-[14px] bg-gradient-to-r from-[#023e8a] via-[#0077b6] to-[#023e8a] transition-all duration-300 group-hover:bg-opacity-95">
                      
                      {/* Animated Shimmer Flare across button on hover */}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[shine-sweep_0.65s_ease_forwards]" />

                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                          <span className="tracking-wide text-sm font-black uppercase">
                            Enviando mensaje…
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide text-sm font-black uppercase text-white drop-shadow-xs">
                            Enviar Mensaje Ahora
                          </span>
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-white/15 text-white transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:bg-white/25">
                            <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <p className="text-center text-[11px] text-slate-400">
                  Al enviar este formulario acepta nuestras{" "}
                  <a href="/legal/privacy" className="underline hover:text-slate-600">
                    Políticas de Privacidad
                  </a>
                  . No almacenamos datos para fines promocionales no solicitados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
