"use client";

import { useState, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Lock, Mail, AlertCircle, Sparkles } from "lucide-react";
import SilhouetteAvatar from "@/components/admin/SilhouetteAvatar";
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
  const [avatarMode, setAvatarMode] = useState<"silhouette" | "yeti">("silhouette");

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#121936] via-[#101b3b] to-[#070b1c] select-none">
      {/* Global CSS rules to eliminate browser autofill grey/white background & maintain clean look */}
      <style dangerouslySetInnerHTML={{ __html: `
        input.glass-input:-webkit-autofill,
        input.glass-input:-webkit-autofill:hover,
        input.glass-input:-webkit-autofill:focus,
        input.glass-input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0 1000px #18223c inset !important;
          box-shadow: 0 0 0 1000px #18223c inset !important;
          transition: background-color 9999999s ease-in-out 0s, color 9999999s ease-in-out 0s !important;
        }
        input.glass-input {
          background-color: transparent !important;
          color: #ffffff !important;
        }
        input.glass-input:-moz-autofill,
        input.glass-input:-moz-autofill-preview {
          background-color: #18223c !important;
          color: #ffffff !important;
        }
      `}} />

      {/* Ambient background glows matching Image 1 */}
      <div className="absolute -top-32 -left-32 w-[540px] h-[540px] bg-blue-600/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] bg-indigo-700/22 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-sky-500/12 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <div className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[34px] sm:rounded-[38px] overflow-hidden p-8 sm:p-10 pt-10 pb-11 shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/20 backdrop-blur-2xl bg-white/[0.08] z-10">
        {/* Diagonal specular glass reflection cut from Image 1 */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background:
              "linear-gradient(116deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.12) 34.5%, rgba(255, 255, 255, 0.015) 34.8%, transparent 44%)",
          }}
        />

        {/* Top bar with subtle avatar switcher */}
        <div className="relative z-20 flex justify-end mb-2 -mt-4 -mr-4">
          <button
            type="button"
            onClick={() => setAvatarMode((prev) => (prev === "silhouette" ? "yeti" : "silhouette"))}
            title={avatarMode === "silhouette" ? "Cambiar a Yeti interactivo" : "Cambiar a Silhouette clásico"}
            className="text-white/30 hover:text-white/80 transition-colors p-2 text-xs flex items-center gap-1 rounded-full cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Avatar Display */}
        <div className="relative z-10 flex justify-center mb-8 sm:mb-9">
          {avatarMode === "silhouette" ? (
            <SilhouetteAvatar className="w-32 h-32 sm:w-36 sm:h-36" />
          ) : (
            <AnimatedAvatar
              email={formData.email}
              isEmailFocused={isEmailFocused}
              isPasswordFocused={isPasswordFocused}
              showPassword={showPassword}
              inputContainerRef={emailRowRef}
            />
          )}
        </div>

        {/* Error notification */}
        {error && (
          <div className="relative z-10 mb-6 bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs px-4 py-3 rounded-xl flex items-center gap-2.5 backdrop-blur-md animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
          {/* Email ID Field */}
          <div
            ref={emailRowRef}
            className="relative border-b border-white/35 focus-within:border-white transition-all duration-200 pb-2.5 flex items-center gap-3.5 group"
          >
            <Mail className="w-5 h-5 text-[#9aa7b9] group-focus-within:text-white transition-colors flex-shrink-0" />
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
              className="glass-input w-full bg-transparent text-white placeholder-[#8d9cb0] text-sm sm:text-base font-normal tracking-wide focus:outline-none border-none outline-none ring-0 p-0 m-0 shadow-none"
            />
          </div>

          {/* Password Field */}
          <div className="relative border-b border-white/35 focus-within:border-white transition-all duration-200 pb-2.5 flex items-center gap-3.5 group">
            <Lock className="w-5 h-5 text-[#9aa7b9] group-focus-within:text-white transition-colors flex-shrink-0" />
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
              className="glass-input w-full bg-transparent text-white placeholder-[#8d9cb0] text-sm sm:text-base font-normal tracking-wide focus:outline-none border-none outline-none ring-0 p-0 m-0 shadow-none pr-2"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((p) => !p)}
              className="text-slate-400/60 hover:text-white transition-colors cursor-pointer flex-shrink-0 p-1"
              tabIndex={-1}
              title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Action Row: LOGIN Button (left) & Forgot Password? (right) */}
          <div className="flex items-center justify-between pt-4 sm:pt-5 gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#2a2c33] hover:bg-[#353942] active:scale-95 text-white font-bold text-xs tracking-[0.16em] px-8 sm:px-10 py-3 uppercase shadow-lg shadow-black/45 border border-white/10 transition-all cursor-pointer disabled:opacity-60"
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
              className="text-[#8c9cb2] hover:text-white italic text-sm font-medium transition-colors cursor-pointer select-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Forgot password helper message */}
        {forgotNotice && (
          <div className="relative z-10 mt-5 p-3 rounded-xl bg-white/10 border border-white/20 text-slate-200 text-xs text-center backdrop-blur-sm animate-in fade-in duration-200">
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
