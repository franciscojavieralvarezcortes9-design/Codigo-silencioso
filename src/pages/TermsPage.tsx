import React, { useEffect } from "react";
import { FileText } from "lucide-react";

interface TermsPageProps {
  soporteEmail: string;
}

export const TermsPage: React.FC<TermsPageProps> = ({ soporteEmail }) => {
  useEffect(() => {
    document.title = "Términos y Condiciones | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="border border-brand-violet/20 bg-black/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />
          
          <div className="flex items-center gap-3 text-brand-gold font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <FileText className="w-5 h-5 text-brand-gold" />
            <span>Acuerdo Legal del Usuario</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mb-8 border-b border-brand-violet/10 pb-4">
            TÉRMINOS Y CONDICIONES
          </h1>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300">
            <p>
              Le rogamos lea atentamente este instrumento legal de Términos y Condiciones antes de explorar o utilizar los servicios interactivos de este portal. Al acceder a la web, usted acepta cumplir los presentes términos de servicio en su totalidad.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              1. Propiedad Intelectual
            </h2>
            <p>
              El diseño gráfico, la marca registrada <strong>CÓDIGO SILENCIOSO</strong>, los logotipos de la comunidad, las ilustraciones de portada y las metodologías descritas (como el "Protocolo de Reprogramación Hipnagógica") son propiedad intelectual registrada y con derechos reservados exclusivos de su creador. Queda estrictamente prohibida la redistribución, copia parcial, subasta ilegal de copias no autorizadas o explotación comercial del libro digital "Código Silencioso Volumen 2".
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              2. Condiciones de Compra de Productos
            </h2>
            <p>
              Los servicios de transacción comercial se delegan en su totalidad a la pasarela Hotmart®. La transferencia bancaria, pasarela de tarjetas de crédito o PayPal se rigen por los términos de Hotmart. El usuario asume la responsabilidad de proveer un correo de destino real y activo para recibir los archivos (PDF, EPUB).
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              3. Descargo de Responsabilidad Científico / Educativo
            </h2>
            <div className="bg-brand-violet/10 border border-brand-violet/30 rounded-xl p-4 md:p-6 text-sm text-slate-200 font-mono space-y-2">
              <p className="font-bold text-brand-gold uppercase text-xs tracking-wider">
                [ AVISO LEGAL CRÍTICO ]
              </p>
              <p>
                La información de neurociencia práctica y los protocolos de reorganización de hábitos provistos en este sitio y en el libro son de naturaleza exclusivamente divulgativa, educativa y teórica. No constituyen tratamientos de salud mental clínica, terapia psiquiátrica ni sustituyen el consejo médico o psicológico profesional calificado.
              </p>
              <p>
                El usuario se responsabiliza del uso de las técnicas de hábitos sugeridas. El autor no asume ninguna responsabilidad por cualquier perjuicio derivado de la mala aplicación de las metodologías divulgadas.
              </p>
            </div>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              4. Moderación de Plataformas de Anuncios
            </h2>
            <p>
              Este sitio aloja anuncios de terceros mediante <strong>Google AdSense</strong>. Al interactuar con los anuncios, se reconocen los respectivos términos de Google de privacidad. Los usuarios se obligan a no incurrir en generación fraudulenta de clics artificiales, robots de navegación automatizados ni prácticas que violen las políticas de la plataforma AdSense.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              5. Enmiendas y Actualizaciones
            </h2>
            <p>
              Nos reservamos el derecho unilateral de actualizar o cambiar estas directrices de términos de servicio. Por favor, revise este apartado periódicamente para mantenerse actualizado sobre cualquier modificación legislativa o en nuestras reglas del sitio.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              6. Contacto y Consultas Legales
            </h2>
            <p>
              Para cualquier consulta relacionada con estos Términos, puede contactarnos directamente a través del correo oficial de soporte técnico:{" "}
              <strong className="text-brand-gold font-mono break-all">{soporteEmail}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
