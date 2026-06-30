import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, ArrowRight, User } from "lucide-react";

export const AuthorPage: React.FC = () => {
  useEffect(() => {
    document.title = "Sobre el Autor | Código Silencioso";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen pt-28 pb-20 text-slate-300 font-sans selection:bg-brand-gold selection:text-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="border border-brand-violet/20 bg-black/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet" />
          
          <div className="flex items-center gap-3 text-brand-gold font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <User className="w-5 h-5 text-brand-gold" />
            <span>La Mente Detrás del Protocolo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-6">
              <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black border-b border-brand-violet/10 pb-4">
                Francisco Álvarez
              </h1>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300 text-justify">
                <p>
                  Francisco Álvarez es el fundador, investigador y principal divulgador detrás de la marca <strong>Código Silencioso</strong>. Apasionado por desentrañar la complejidad del comportamiento humano, emprendió este proyecto con el propósito de democratizar el conocimiento sobre neurociencia aplicada, psicología cognitiva y biología del comportamiento, alejándose de los tópicos simplistas y los clichés motivacionales de la autoayuda convencional.
                </p>
                
                <p>
                  Su trayectoria comenzó al observar cómo la sobrecarga de información moderna y la fatiga dopaminérgica secuestran el lóbulo frontal de los individuos, reduciendo su capacidad de enfoque y sumergiéndolos en una reactividad automática constante. Ante esto, Francisco se propuso estructurar metodologías rigurosas basadas en evidencia científica de vanguardia que permitieran a las personas comunes intervenir deliberadamente en su propio software mental y optimizar su hardware biológico.
                </p>

                <p>
                  La creación de <em>Código Silencioso</em> nació como un canal de expresión libre para compartir protocolos estructurados de reprogramación de hábitos, rediseño de creencias y dominio conductual. A través de este portal y del blog educativo que lo acompaña, Francisco cubre temas esenciales que van desde la neurobiología del hábito y los efectos reales del estrés crónico sobre la plasticidad cerebral, hasta los mecanismos empíricos para desmantelar sesgos cognitivos arraigados.
                </p>

                <p>
                  Tras el impacto y la acogida masiva del primer volumen en miles de lectores en Latinoamérica y España, Francisco concibió <strong>Código Silencioso Volumen 2</strong> como una secuela de mayor rigor científico y profundidad operativa. Su objetivo con cada artículo del blog y con cada capítulo de la obra es claro: guiar al lector hacia una autoevaluación honesta y proveer un manual empírico estructurado libre de dogmas románticos.
                </p>

                <p>
                  Para Francisco, la verdadera transformación humana no se fundamenta en discursos motivacionales vacíos, sino en el entendimiento preciso de nuestra biología y en la adopción persistente de protocolos prácticos. Te invitamos a explorar los artículos del blog, estudiar las metodologías y unirte a una comunidad de mentes curiosas comprometidas con la excelencia de su desarrollo intelectual.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold text-black font-mono font-bold text-xs sm:text-sm uppercase py-4 px-6 rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg tracking-widest"
                >
                  <span>Ponte en Contacto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://instagram.com/codigosilencioso_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-violet/20 border border-brand-violet/40 text-brand-gold font-mono font-bold text-xs sm:text-sm uppercase py-4 px-6 rounded-xl hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all cursor-pointer tracking-widest"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Comunidad Oficial</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 bg-black/30 border border-brand-violet/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-white font-bold text-base tracking-wide border-b border-brand-violet/10 pb-2">
                Áreas de Enfoque
              </h3>
              
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold">▪</span>
                  <span>Neurociencia aplicada al comportamiento humano</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold">▪</span>
                  <span>Formación empírica y desmantelamiento de hábitos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold">▪</span>
                  <span>Neuroplasticidad autodirigida y lóbulo frontal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold">▪</span>
                  <span>Fisiología del estrés y gobernanza biológica</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-brand-violet/10">
                <p className="text-[11px] text-slate-400 italic text-justify leading-relaxed">
                  "No pretendemos dar soluciones mágicas; buscamos equiparte con los fundamentos científicos prácticos para que asumas el mando soberano de tu cerebro."
                </p>
                <span className="block text-[10px] font-mono text-brand-gold mt-2 text-right">
                  — Francisco Álvarez
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
