import React, { useEffect } from "react";
import { Shield } from "lucide-react";

interface PrivacyPageProps {
  soporteEmail: string;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ soporteEmail }) => {
  useEffect(() => {
    document.title = "Política de Privacidad | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="border border-brand-violet/20 bg-black/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />
          
          <div className="flex items-center gap-3 text-brand-gold font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-5 h-5 text-brand-gold animate-pulse" />
            <span>Última actualización: Junio de 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mb-8 border-b border-brand-violet/10 pb-4">
            POLÍTICA DE PRIVACIDAD
          </h1>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300">
            <p>
              En <strong>Código Silencioso</strong>, valoramos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos su información de conformidad con las directrices de privacidad de <strong>Google AdSense</strong> y las leyes de protección de datos vigentes (GDPR / RGPD, CCPA, etc.).
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              1. Recopilación de Información
            </h2>
            <p>
              Recopilamos información de identificación personal que usted nos proporciona voluntariamente, por ejemplo, su nombre y dirección de correo electrónico cuando se pone en contacto con el soporte técnico o cuando adquiere su copia del libro a través de nuestra pasarela de pagos integrada de Hotmart®. No recopilamos datos financieros directos en nuestra plataforma; todas las transacciones son seguras y gestionadas directamente por Hotmart.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              2. Uso de cookies y tecnologías de seguimiento
            </h2>
            <p>
              Este sitio utiliza cookies para personalizar la experiencia de exploración, analizar el tráfico del sitio y publicar anuncios optimizados para sus intereses mediante <strong>Google AdSense</strong>.
            </p>
            <p>
              Los proveedores de terceros, incluido Google, utilizan cookies para presentar anuncios basados en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios web. El uso de cookies de publicidad por parte de Google les permite a ellos y a sus socios presentar anuncios a nuestros usuarios según sus visitas a este sitio y a otros sitios de Internet.
            </p>
            <div className="bg-black/60 p-4 border border-brand-violet/15 rounded-xl text-sm text-brand-gold font-mono my-4">
              Puede inhabilitar la publicidad personalizada visitando{" "}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noreferrer" 
                className="underline hover:text-white transition-colors"
              >
                Preferencias de anuncios de Google
              </a>{" "}
              o el sitio web de control de cookies de terceros voluntario.
            </div>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              3. Compartir su Información
            </h2>
            <p>
              No vendemos, comercializamos ni transferimos de otro modo sus datos personales a terceros, con excepción de los datos estrictamente necesarios compartidos con proveedores de infraestructura tecnológica confiables (como nuestro servidor web o Google Analytics/AdSense) para garantizar la correcta funcionalidad de la web.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              4. Seguridad de los Datos
            </h2>
            <p>
              Implementamos rigurosos mecanismos de encriptación de datos SSL (Secure Sockets Layer) y medidas técnicas avanzadas para salvaguardar la confidencialidad de su información. El acceso a los datos de soporte está estrictamente restringido a personal calificado.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              5. Enlaces Externos
            </h2>
            <p>
              Este sitio web contiene enlaces que dirigen a plataformas de terceros de confianza, tales como Hotmart® para la compra del libro digital e Instagram para actividades de nuestra comunidad oficial. Nosotros no tenemos control sobre las políticas de privacidad de estos sitios web externos ni nos responsabilizamos de ellas. Le recomendamos encarecidamente revisar las políticas de privacidad de cada sitio que visite.
            </p>

            <h2 className="text-white font-bold text-lg pt-4 border-b border-brand-violet/10 pb-1 font-serif">
              6. Contacto directo sobre Privacidad
            </h2>
            <p>
              Si desea ejercer sus derechos de acceso, rectificación, cancelación u oposición al tratamiento de sus datos personales, puede ponerse en contacto con nuestro oficial de privacidad en cualquier momento enviando un correo a:{" "}
              <strong className="text-brand-gold font-mono break-all">{soporteEmail}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
