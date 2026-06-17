import React, { useState } from "react";
import { X, Shield, FileText, HelpCircle, Mail, MapPin, Database, Cookie, Check } from "lucide-react";

interface ComplianceModalsProps {
  isOpen: boolean;
  activeType: "privacy" | "terms" | "cookie" | "contact" | null;
  onClose: () => void;
  soporteEmail: string;
}

export const ComplianceModals: React.FC<ComplianceModalsProps> = ({
  isOpen,
  activeType,
  onClose,
  soporteEmail
}) => {
  if (!isOpen || !activeType) return null;

  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      onClose();
    }, 2500);
  };

  const renderContent = () => {
    switch (activeType) {
      case "privacy":
        return (
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
            <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-5 h-5 text-brand-gold" />
              <span>Última actualización: Junio de 2026</span>
            </div>
            <p>
              En <strong>Código Silencioso</strong>, valoramos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos su información de conformidad con las directrices de privacidad de <strong>Google AdSense</strong> y las leyes de protección de datos vigentes (GDPR / RGPD, CCPA, etc.).
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">1. Recopilación de Información</h3>
            <p>
              Recopilamos información de identificación personal que usted nos proporciona voluntariamente, por ejemplo, su nombre y dirección de correo electrónico cuando se pone en contacto con el soporte técnico o cuando adquiere su copia del libro a través de nuestra pasarela de pagos integrada de Hotmart®. No recopilamos datos financieros directos en nuestra plataforma; todas las transacciones son seguras y gestionadas directamente por Hotmart.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">2. Uso de cookies y tecnologías de seguimiento</h3>
            <p>
              Este sitio utiliza cookies para personalizar la experiencia de exploración, analizar el tráfico del sitio y publicar anuncios optimizados para sus intereses mediante <strong>Google AdSense</strong>.
            </p>
            <p>
              Los proveedores de terceros, incluido Google, utilizan cookies para presentar anuncios basados en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios web. El uso de cookies de publicidad por parte de Google les permite a ellos y a sus socios presentar anuncios a nuestros usuarios según sus visitas a este sitio y a otros sitios de Internet.
            </p>
            <p className="bg-black/40 p-2 border border-brand-violet/15 rounded text-xs text-brand-gold font-mono">
              Puede inhabilitar la publicidad personalizada visitando <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="underline">Preferencias de anuncios de Google</a> o el sitio web de control de cookies de terceros voluntario.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">3. Compartir su Información</h3>
            <p>
              No vendemos, comercializamos ni transferimos de otro modo sus datos personales a terceros, con excepción de los datos estrictamente necesarios compartidos con proveedores de infraestructura tecnológica confiables (como nuestro servidor web o Google Analytics/AdSense) para garantizar la correcta funcionalidad de la web.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">4. Seguridad de los Datos</h3>
            <p>
              Implementamos rigurosos mecanismos de encriptación de datos SSL (Secure Sockets Layer) y medidas técnicas avanzadas para salvaguardar la confidencialidad de su información. El acceso a los datos de soporte está estrictamente restringido a personal calificado.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">5. Enlaces Externos</h3>
            <p>
              Este sitio web contiene enlaces que dirigen a plataformas de terceros de confianza, tales como Hotmart® para la compra del libro digital e Instagram para actividades de nuestra comunidad oficial. Nosotros no tenemos control sobre las políticas de privacidad de estos sitios web externos ni nos responsabilizamos de ellas.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">6. Contacto directo sobre Privacidad</h3>
            <p>
              Si desea ejercer sus derechos de acceso, rectificación, cancelación u oposición al tratamiento de sus datos personales, puede ponerse en contacto con nuestro oficial de privacidad en cualquier momento enviando un correo a: <strong className="text-brand-gold font-mono">{soporteEmail}</strong>.
            </p>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
            <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-5 h-5 text-brand-gold" />
              <span>Acuerdo Legal del Usuario</span>
            </div>
            <p>
              Le rogamos lea atentamente este instrumento legal de Términos y Condiciones antes de explorar o utilizar los servicios interactivos de este portal. Al acceder a la web, usted acepta cumplir los presentes términos.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">1. Propiedad Intelectual</h3>
            <p>
              El diseño gráfico, la marca registrada <strong>CÓDIGO SILENCIOSO</strong>, los logotipos de la comunidad, las ilustraciones de portada y las metodologías descritas (como el "Protocolo de Reprogramación Hipnagógica") son propiedad intelectual registrada y con derechos reservados exclusivos de su creador. Queda estrictamente prohibida la redistribución, copia parcial, subasta ilegal de copias no autorizadas o explotación comercial del libro digital "Código Silencioso Volumen 2".
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">2. Condiciones de Compra de Productos</h3>
            <p>
              Los servicios de transacción comercial se delegan en su totalidad a la pasarela Hotmart®. La transferencia bancaria, pasarela de tarjetas de crédito o PayPal se rigen por los términos de Hotmart. El usuario asume la responsabilidad de proveer un correo de destino real y activo para recibir los archivos (PDF, EPUB).
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">3. Descargo de Responsabilidad Científico / Educativo</h3>
            <p>
              La información de neurociencia práctica y los protocolos de reorganización de hábitos provistos en este sitio y en el libro son de naturaleza exclusivamente divulgativa, educativa y teórica. No constituyen tratamientos de salud mental clínica, terapia psiquiátrica ni sustituyen el consejo médico calificado. El usuario se responsabiliza del uso de las técnicas de hábitos sugeridas.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">4. Moderación de Plataformas de Anuncios</h3>
            <p>
              Este sitio aloja anuncios de terceros mediante <strong>Google AdSense</strong>. Al interactuar con los anuncios, se reconocen los respectivos términos de Google de privacidad. Los usuarios se obligan a no incurrir en generación fraudulenta de clics artificiales, robots de navegación automatizados ni prácticas que violen las políticas de la plataforma AdSense.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">5. Enmiendas</h3>
            <p>
              Nos reservamos el derecho unilateral de actualizar o cambiar estas directrices de términos de servicio. Por favor, revise este apartado periódicamente para mantenerse actualizado.
            </p>
          </div>
        );

      case "cookie":
        return (
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
            <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Cookie className="w-5 h-5 text-brand-gold animate-bounce" />
              <span>Cookies y Tecnologías del Navegador</span>
            </div>
            <p>
              Esta Política de Cookies explica de qué modo gestionamos las cookies en el portal interactivo y cómo garantizamos una navegación transparente orientada a la excelencia.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">¿Qué es una cookie?</h3>
            <p>
              Las cookies son pequeños archivos de texto que se instalan localmente en su ordenador o en su dispositivo móvil al cargar una página web. Ayudan a que el sitio reconozca su dispositivo en visitas futuras, retenga ciertas preferencias de idioma o recuerde sus resultados diagnósticos dinámicos temporales del motor interactivo.
            </p>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">¿Cómo usamos las Cookies?</h3>
            <p>
              Hacemos uso de tres categorías fundamentales de cookies:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 list-inside text-xs">
              <li>
                <strong>Cookies Técnicas Esenciales:</strong> Necesarias para iniciar sesión de personalización del sitio y memorizar la configuración regional.
              </li>
              <li>
                <strong>Cookies Analíticas (Avanzadas):</strong> Nos permiten entender qué apartados reciben más atención o cuántas personas superan el widget de diagnóstico cognitivo, ayudándonos a ofrecer mejores contenidos científicos.
              </li>
              <li>
                <strong>Cookies de Publicidad Orientada (Google AdSense):</strong> Google y otros proveedores asocian cookies de seguimiento con el fin de presentarle anuncios que resulten verdaderamente coherentes con sus búsquedas. Estas cookies nos asisten para sostener económicamente este portal web de libre acceso.
              </li>
            </ul>

            <h3 className="text-white font-bold text-sm sm:text-base pt-2 border-b border-brand-violet/10 pb-1 font-serif">Control de Preferencias de Cookies</h3>
            <p>
              La mayoría de los navegadores web le permiten configurar las preferencias de seguridad en cualquier momento para desactivar las cookies por completo u obligar al sistema a preguntarle antes de aceptar una nueva cookie. Tenga en cuenta que si inhabilita todas las cookies esenciales, algunos servicios interactivos dinámicos podrían verse temporalmente afectados.
            </p>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
            <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Mail className="w-5 h-5 text-brand-gold" />
              <span>Formulario Oficial de Soporte y Contacto</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm">
              ¿Tiene dudas sobre el lanzamiento de <strong>Código Silencioso Vol 2</strong>, su garantía de Hotmart® o desea presentar una consulta técnica de copyright? Rellene el formulario a continuación y responderemos en menos de 24 horas hábiles.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-xl text-center space-y-2 animate-fade-in">
                <Check className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-emerald-400 font-bold text-sm uppercase">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-slate-300 text-xs">
                  Su solicitud de comunicación ha sido registrada. Nuestro equipo legal y de atención técnica le enviará una respuesta en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-gold"
                      placeholder="Ej. Francisco Álvarez"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-gold"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Asunto de Consulta</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-gold"
                    placeholder="Dudas, compra, Adsense, legal..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Cuerpo del Mensaje / Consulta</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full h-24 bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold resize-none"
                    placeholder="Escriba su mensaje aquí..."
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-[9px] font-mono text-slate-400">
                    O envíenos un correo electrónico directo a:<br/>
                    <strong className="text-brand-gold">{soporteEmail}</strong>
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-gold text-black font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeType) {
      case "privacy":
        return "POLÍTICA DE PRIVACIDAD";
      case "terms":
        return "TÉRMINOS Y CONDICIONES";
      case "cookie":
        return "DECLARACIÓN DE COOKIES";
      case "contact":
        return "ATENCIÓN AL CLIENTE / SOPORTE";
      default:
        return "ACUERDO LEGAL";
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-brand-dark border-2 border-brand-violet/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(107,33,232,0.4)] overflow-hidden flex flex-col relative animate-scale-up">
        {/* Border accents */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-violet/15 bg-black/40">
          <h2 className="font-serif font-black text-white text-base sm:text-lg tracking-wide uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 flex-1 text-slate-300">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-black/50 border-t border-brand-violet/10 text-center text-[10px] font-mono text-slate-500">
          Este sitio opera bajo estándares estrictos de protección de datos de Google AdSense e Hotmart.
        </div>
      </div>
    </div>
  );
};
