"use client";

import { useState, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Lock, Mail, AlertCircle } from "lucide-react";
import AnimatedAvatar from "@/components/admin/AnimatedAvatar";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);

  const emailRowRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Correo electrónico o contraseña no válidos. Por favor, inténtelo de nuevo.");
      } else {
        const session = await getSession();
        const role = (session?.user as any)?.role;
        if (role === "admin" || role === "ADMIN") {
          router.push("/admin");
        } else {
          setError("Acceso denegado. Se requieren privilegios de administrador.");
        }
      }
    } catch {
      setError("Ocurrió un error. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0a0f24] via-[#0d163a] to-[#060a1c] select-none">
      {/* Global overrides to eliminate browser autofill background & style input lines */}
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-input:-webkit-autofill,
        .glass-input:-webkit-autofill:hover,
        .glass-input:-webkit-autofill:focus,
        .glass-input:-webkit-autofill:active {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000000s ease-in-out 0s !important;
          box-shadow: inset 0 0 20px 20px transparent !important;
          background-color: transparent !important;
          caret-color: #ffffff !important;
        }
        .glass-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #ffffff !important;
          color: #ffffff !important;
        }
        .glass-input:-moz-autofill,
        .glass-input:-moz-autofill-preview {
          background-color: transparent !important;
          color: #ffffff !important;
        }
      `}} />

      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] bg-indigo-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <div className="relative w-full max-w-[400px] sm:max-w-[430px] rounded-[32px] sm:rounded-[36px] overflow-hidden p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] border border-white/20 backdrop-blur-2xl bg-white/[0.08] z-10">
        {/* Diagonal specular glass reflection cut */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background:
              "linear-gradient(115deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 36%, rgba(255, 255, 255, 0.01) 36.5%, transparent 37%)",
          }}
        />

        {/* Animated Yeti SVG Avatar */}
        <div className="relative z-10 flex justify-center mb-6 sm:mb-8">
          <AnimatedAvatar
            email={formData.email}
            isEmailFocused={isEmailFocused}
            isPasswordFocused={isPasswordFocused}
            showPassword={showPassword}
            inputContainerRef={emailRowRef}
          />
        </div>

        {/* Error notification */}
        {error && (
          <div className="relative z-10 mb-5 bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs px-4 py-3 rounded-xl flex items-center gap-2.5 backdrop-blur-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Email ID Field */}
          <div
            ref={emailRowRef}
            className="relative border-b border-white/30 focus-within:border-white transition-all duration-200 pb-2.5 flex items-center gap-3.5 group"
          >
            <Mail className="w-5 h-5 text-slate-300 group-focus-within:text-white transition-colors flex-shrink-0" />
            <input
              type="email"
              name="email"
              id="login-email"
              autoComplete="username"
              required
              value={formData.email}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder="Email ID"
              className="glass-input w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-normal tracking-wide focus:outline-none border-none outline-none ring-0 p-0 m-0 shadow-none"
            />
          </div>

          {/* Password Field */}
          <div className="relative border-b border-white/30 focus-within:border-white transition-all duration-200 pb-2.5 flex items-center gap-3.5 group">
            <Lock className="w-5 h-5 text-slate-300 group-focus-within:text-white transition-colors flex-shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="login-password"
              autoComplete="current-password"
              required
              value={formData.password}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
              placeholder="Password"
              className="glass-input w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-normal tracking-wide focus:outline-none border-none outline-none ring-0 p-0 m-0 shadow-none pr-2"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((p) => !p)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 p-1"
              tabIndex={-1}
              title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Action Row: LOGIN Button (left) & Forgot Password? (right) */}
          <div className="flex items-center justify-between pt-4 gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#2a2d34] hover:bg-[#363a44] active:scale-95 text-white font-bold text-xs tracking-widest px-8 sm:px-10 py-3 uppercase shadow-lg shadow-black/40 border border-white/10 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>LOGIN...</span>
                </span>
              ) : (
                "LOGIN"
              )}
            </button>

            <button
              type="button"
              onClick={() => setForgotNotice(true)}
              className="text-slate-300/85 hover:text-white italic text-sm font-medium transition-colors cursor-pointer select-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Forgot password helper message */}
        {forgotNotice && (
          <div className="relative z-10 mt-5 p-3 rounded-xl bg-white/10 border border-white/20 text-slate-200 text-xs text-center backdrop-blur-sm">
            Para restablecer su contraseña, por favor contacte al administrador del sistema.
          </div>
        )}
      </div>

      {/* Back to Website */}
      <div className="mt-6 text-center z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio web
        </Link>
      </div>
    </div>
  );
}
