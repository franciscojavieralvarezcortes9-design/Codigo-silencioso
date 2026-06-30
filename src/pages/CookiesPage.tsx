import React, { useEffect } from "react";
import { Cookie } from "lucide-react";

export const CookiesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Cookies | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="border border-brand-violet/20 bg-black/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />
          
          <div className="flex items-center gap-3 text-brand-gold font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <Cookie className="w-5 h-5 text-brand-gold animate-bounce" />
            <span>Cookies y Tecnologías del Navegador</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mb-8 border-b border-brand-violet/10 pb-4">
            POLÍTICA DE COOKIES
          </h1>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300">
            <p>
              Esta Política de Cookies explica de qué modo gestionamos las cookies en el portal interactivo de <strong>Código Silencioso</strong> y cómo garantizamos una navegación transparente orientada a la excelencia.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              ¿Qué es una cookie?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se instalan localmente en su ordenador o en su dispositivo móvil al cargar una página web. Ayudan a que el sitio reconozca su dispositivo en visitas futuras, retenga ciertas preferencias de idioma o recuerde sus resultados diagnósticos dinámicos temporales del motor interactivo.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              ¿Cómo usamos las Cookies?
            </h2>
            <p>
              Hacemos uso de tres categorías fundamentales de cookies en nuestro sitio web:
            </p>
            <div className="space-y-4 my-4">
              <div className="bg-black/20 p-4 border border-brand-violet/10 rounded-xl">
                <h3 className="text-brand-gold font-bold text-sm sm:text-base font-serif mb-1">
                  1. Cookies Técnicas Esenciales:
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Necesarias para habilitar la personalización del sitio, asegurar la persistencia de las preferencias locales del creador y memorizar la configuración regional durante el recorrido web.
                </p>
              </div>

              <div className="bg-black/20 p-4 border border-brand-violet/10 rounded-xl">
                <h3 className="text-brand-gold font-bold text-sm sm:text-base font-serif mb-1">
                  2. Cookies Analíticas:
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Nos permiten entender qué apartados o artículos del blog reciben más atención o cuántas personas completan el widget de diagnóstico cognitivo, ayudándonos a ofrecer mejores contenidos científicos y ajustar el rendimiento técnico.
                </p>
              </div>

              <div className="bg-black/20 p-4 border border-brand-violet/10 rounded-xl">
                <h3 className="text-brand-gold font-bold text-sm sm:text-base font-serif mb-1">
                  3. Cookies de Publicidad (Google AdSense):
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Google y otros proveedores de publicidad asocian cookies de seguimiento con el fin de presentarle anuncios que resulten verdaderamente pertinentes con sus búsquedas. Estas cookies nos asisten para sostener económicamente este portal web de libre acceso y ofrecer contenido educativo de gran valor sin coste.
                </p>
              </div>
            </div>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              Control de Preferencias de Cookies
            </h2>
            <p>
              La mayoría de los navegadores web le permiten configurar las preferencias de seguridad en cualquier momento para desactivar las cookies por completo u obligar al sistema a preguntarle antes de aceptar una nueva cookie. Tenga en cuenta que si inhabilita todas las cookies esenciales, algunos servicios interactivos dinámicos podrían verse temporalmente afectados.
            </p>
            <p>
              Para cambiar la configuración de cookies de su navegador, por favor consulte la sección de ayuda o soporte técnico de su navegador de internet específico (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
