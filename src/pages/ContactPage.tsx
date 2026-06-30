import React, { useState, useEffect } from "react";
import { Mail, Check, MessageSquare } from "lucide-react";

interface ContactPageProps {
  soporteEmail: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ soporteEmail }) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Soporte y Contacto | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;

    // Build mailto URL
    const bodyText = `Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`;
    const mailtoUrl = `mailto:${soporteEmail}?subject=${encodeURIComponent(form.subject || "Consulta de Soporte")}&body=${encodeURIComponent(bodyText)}`;
    
    // Open the email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="border border-brand-violet/20 bg-black/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />
          
          <div className="flex items-center gap-3 text-brand-gold font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <Mail className="w-5 h-5 text-brand-gold" />
            <span>Formulario Oficial de Soporte y Contacto</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mb-4 border-b border-brand-violet/10 pb-4">
            ATENCIÓN AL CLIENTE / SOPORTE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            ¿Tiene dudas sobre el lanzamiento de <strong>Código Silencioso Vol 2</strong>, su garantía de Hotmart® o desea presentar una consulta técnica o comercial? Complete el formulario de contacto a continuación. Responderemos a la brevedad, usualmente en menos de 24 horas hábiles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left side info */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-black/30 border border-brand-violet/10 p-6 rounded-2xl space-y-4">
                <h3 className="font-serif text-white font-bold text-base tracking-wide flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                  Atención Directa
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  Siempre puede enviarnos un correo directo desde su cliente de correo preferido utilizando nuestra dirección de contacto:
                </p>

                <div className="bg-black/40 p-3 border border-brand-violet/20 rounded-xl">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Email de Soporte
                  </span>
                  <a 
                    href={`mailto:${soporteEmail}`}
                    className="text-brand-gold font-mono font-bold text-sm sm:text-base hover:underline break-all block mt-1"
                  >
                    {soporteEmail}
                  </a>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <p><strong>Horario:</strong> Lunes a Viernes</p>
                  <p>9:00 AM - 6:00 PM (Hora de España/América)</p>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="md:col-span-7">
              {submitted ? (
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-emerald-400 font-bold text-lg uppercase font-serif tracking-wide">
                    ¡Redirigiendo a Correo!
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Hemos preparado su mensaje para abrir su cliente de correo. Si su gestor de correo no se abrió automáticamente, por favor escriba directamente a <strong className="text-brand-gold font-mono">{soporteEmail}</strong> con sus datos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-black/60 border border-brand-violet/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="Ej. Francisco Álvarez"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-black/60 border border-brand-violet/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Asunto de Consulta
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-black/60 border border-brand-violet/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Dudas, adquisición del libro, soporte..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Cuerpo del Mensaje / Consulta
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full h-36 bg-black/60 border border-brand-violet/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                      placeholder="Escriba su mensaje en detalle aquí..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-gold text-black font-mono font-bold text-xs sm:text-sm uppercase py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-95 transition-all cursor-pointer shadow-lg tracking-widest"
                    >
                      ENVIAR MENSAJE AHORA →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
