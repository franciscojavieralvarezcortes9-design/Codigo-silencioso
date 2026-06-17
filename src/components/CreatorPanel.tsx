import React, { useState } from "react";
import {
  X,
  Save,
  RotateCcw,
  Copy,
  Check,
  Globe,
  Instagram,
  FileText,
  Brain,
  HelpCircle,
  Cpu,
  Target,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  Download,
  Upload,
  Image,
  Trash2
} from "lucide-react";
import { AppContent } from "../types";

interface CreatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: AppContent;
  onUpdate: (newContent: AppContent) => void;
  onReset: () => void;
  defaultCover: string;
}

type TabType = "general" | "portada" | "sections" | "simulador" | "topics" | "target" | "faqs" | "advanced";

export const CreatorPanel: React.FC<CreatorPanelProps> = ({
  isOpen,
  onClose,
  content,
  onUpdate,
  onReset,
  defaultCover
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState("");

  if (!isOpen) return null;

  // Show a temporary success toast
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split(".");
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newContent);
  };

  // Helper to handle list items updates
  const updateListItem = (path: string, index: number, value: string) => {
    const keys = path.split(".");
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    const arr = [...current[keys[keys.length - 1]]];
    arr[index] = value;
    current[keys[keys.length - 1]] = arr;
    onUpdate(newContent);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopied(true);
    triggerToast("¡JSON de configuración copiado al portapapeles!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed && typeof parsed === "object" && parsed.paymentUrl) {
        onUpdate(parsed);
        triggerToast("¡Contenido importado correctamente!");
      } else {
        triggerToast("Error: Estructura JSON inválida.");
      }
    } catch (e) {
      triggerToast("Error de sintaxis: JSON no válido.");
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas restablecer el contenido original? Se borrarán tus ediciones locales.")) {
      onReset();
      triggerToast("Restablecido al diseño original.");
    }
  };

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "general", label: "General & Pago", icon: <Globe className="w-4 h-4" /> },
    { key: "portada", label: "Portada", icon: <Image className="w-4 h-4" /> },
    { key: "sections", label: "Secciones", icon: <FileText className="w-4 h-4" /> },
    { key: "simulador", label: "Simulador", icon: <Cpu className="w-4 h-4" /> },
    { key: "topics", label: "Temarios", icon: <BookOpen className="w-4 h-4" /> },
    { key: "target", label: "Público", icon: <Target className="w-4 h-4" /> },
    { key: "faqs", label: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    { key: "advanced", label: "JSON & Guardar", icon: <Save className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-brand-dark border-l border-brand-violet/35 z-[150] shadow-[0_0_50px_rgba(107,33,232,0.30)] flex flex-col font-sans text-brand-text">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-black px-4 py-2 rounded-full text-xs font-mono font-bold shadow-lg shadow-black z-[200] border border-white/20 animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Header Panel */}
      <div className="p-4 bg-black/80 border-b border-brand-violet/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
          <div>
            <h2 className="font-serif text-sm md:text-base font-black tracking-widest text-white">
              EDITOR VISUAL DE SITIO
            </h2>
            <p className="text-[10px] font-mono text-brand-gold tracking-wider">
              CÓDIGO SILENCIOSO · VOL. 2
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-brand-violet/20 text-slate-400 hover:text-white rounded-full transition-colors border border-brand-violet/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Warning Tip */}
      <div className="bg-brand-violet/10 border-b border-brand-violet/20 px-4 py-2 flex items-center gap-2">
        <span className="text-[10px] font-mono text-brand-gold bg-brand-gold/15 px-1.5 py-0.5 rounded flex-shrink-0 animate-pulse">
          LIVE PREVIEW
        </span>
        <span className="text-[10px] text-slate-300 leading-tight">
          Cualquier cambio que realices se refleja instantáneamente en la pantalla izquierda.
        </span>
      </div>

      {/* Tabs navigation */}
      <div className="flex bg-black/50 border-b border-brand-violet/15 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-3 text-xs font-mono tracking-tight border-b-2 whitespace-nowrap transition-all cursor-pointer
              ${activeTab === tab.key
                ? "border-brand-gold text-brand-gold bg-brand-violet/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-brand-violet/5"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Editor scrollable content panel */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
        
        {/* ================= TAB 1: GENERAL & PAYMENTS ================= */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-brand-gold uppercase mb-1">
                Enlace de Pago (Hotmart URL)
              </label>
              <input
                type="text"
                value={content.paymentUrl}
                onChange={(e) => updateField("paymentUrl", e.target.value)}
                className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                placeholder="https://pay.hotmart.com/..."
              />
              <p className="text-[10px] text-slate-500 mt-1">Este enlace recubrirá todos los botones de "Adquirir Copia / Comprar" del sitio.</p>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Títulos Principales (Libro)</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Línea 1 del Título</label>
                  <input
                    type="text"
                    value={content.hero.titleLine1}
                    onChange={(e) => updateField("hero.titleLine1", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Línea 2 del Título</label>
                  <input
                    type="text"
                    value={content.hero.titleLine2}
                    onChange={(e) => updateField("hero.titleLine2", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Redes Sociales</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Texto de Enlace</label>
                  <input
                    type="text"
                    value={content.author.socialText}
                    onChange={(e) => updateField("author.socialText", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Handle de Instagram</label>
                  <input
                    type="text"
                    value={content.author.socialHandle}
                    onChange={(e) => updateField("author.socialHandle", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">URL de Instagram</label>
                  <input
                    type="text"
                    value={content.author.socialUrl}
                    onChange={(e) => updateField("author.socialUrl", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 1.5: PORTADA ================= */}
        {activeTab === "portada" && (
          <div className="space-y-5 flex flex-col">
            <div className="bg-brand-violet/10 border border-brand-violet/20 p-3.5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-brand-gold animate-pulse" />
                Imagen de Portada del Libro
              </h3>
              <p className="text-[11px] text-slate-300 leading-normal">
                Personaliza la portada oficial en el hero principal. Sube tu propia portada o ingresa una dirección URL.
              </p>
            </div>

            {/* Drag & Drop / Click Upload Area */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase">
                Opción A: Subir imagen desde tu ordenador (Recomendado)
              </label>
              
              <div
                className="border-2 border-dashed border-brand-violet/30 hover:border-brand-gold/60 p-6 rounded-xl bg-black/40 text-center transition-all group relative cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        updateField("bookCoverUrl", reader.result);
                        triggerToast("¡Imagen de portada cargada con éxito!");
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={() => {
                  const input = document.getElementById("cover-file-upload") as HTMLInputElement;
                  input?.click();
                }}
              >
                <input
                  id="cover-file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === "string") {
                          updateField("bookCoverUrl", reader.result);
                          triggerToast("¡Imagen de portada cargada con éxito!");
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                
                <Upload className="w-8 h-8 text-brand-violet group-hover:text-brand-gold scale-100 group-hover:scale-110 transition-transform mx-auto mb-2" />
                <span className="block text-xs text-slate-200 font-medium">
                  Presiona para seleccionar o arrastra la imagen aquí
                </span>
                <span className="block text-[10px] text-slate-500 mt-1 uppercase font-mono">
                  Soporta formatos JPG, PNG, WEBP, SVG
                </span>
              </div>
            </div>

            {/* URL Option */}
            <div className="space-y-2 border-t border-brand-violet/15 pt-4">
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase">
                Opción B: Introducir URL de internet
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.bookCoverUrl?.startsWith("data:") ? "" : (content.bookCoverUrl || "")}
                  onChange={(e) => updateField("bookCoverUrl", e.target.value)}
                  className="flex-1 bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-gold"
                  placeholder="https://ejemplo.com/mi_portada.jpg"
                />
                {content.bookCoverUrl && (
                  <button
                    onClick={() => {
                      updateField("bookCoverUrl", "");
                      triggerToast("Restablecido a la imagen por defecto");
                    }}
                    className="p-1 px-2.5 bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Restablecer Portada Original"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Quitar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Preview Status */}
            <div className="space-y-3 border-t border-brand-violet/15 pt-4">
              <span className="block text-[11px] font-mono font-bold text-slate-300 uppercase">
                Estado de Portada Activa
              </span>
              <div className="bg-black/60 border border-brand-violet/25 rounded-xl p-4 flex gap-4 items-center">
                <div className="w-20 h-28 border border-brand-violet/30 rounded overflow-hidden bg-brand-dark flex-shrink-0 shadow-md">
                  <img
                    src={content.bookCoverUrl || defaultCover}
                    alt="Previsualización"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultCover;
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-gold block">
                    {content.bookCoverUrl ? "⭐ PORTADA PERSONALIZADA" : "📖 PORTADA ORIGINAL ACTIVA"}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {content.bookCoverUrl 
                      ? (content.bookCoverUrl.startsWith("data:") ? "Cargada por Archivo Local Base64" : `Enlace Externo: ${content.bookCoverUrl.substring(0, 30)}...`)
                      : "Archivo físico del proyecto"
                    }
                  </span>
                  {content.bookCoverUrl && (
                    <button
                      onClick={() => {
                        updateField("bookCoverUrl", "");
                        triggerToast("Restablecido a la portada por defecto");
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-[10px] text-brand-gold hover:text-white font-mono bg-brand-violet/15 border border-brand-violet/30 px-2 py-1 rounded cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> RESTABLECER ORIGINAL
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SECTIONS CONTENT ================= */}
        {activeTab === "sections" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Sección Hero (Fondo Inicial)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Badge Superior</label>
                  <input
                    type="text"
                    value={content.hero.badgeText}
                    onChange={(e) => updateField("hero.badgeText", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Frase Subtítulo (Slogan)</label>
                  <textarea
                    value={content.hero.subtitle}
                    onChange={(e) => updateField("hero.subtitle", e.target.value)}
                    className="w-full h-16 bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Botón de Acción (Texto)</label>
                  <input
                    type="text"
                    value={content.hero.ctaButton}
                    onChange={(e) => updateField("hero.ctaButton", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Sección ¿Qué es? (Acerca de)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Título de Sección</label>
                  <input
                    type="text"
                    value={content.about.title}
                    onChange={(e) => updateField("about.title", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Frase destacada (Sello de Garantía)</label>
                  <input
                    type="text"
                    value={content.about.quote}
                    onChange={(e) => updateField("about.quote", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                {content.about.paragraphs.map((p, idx) => (
                  <div key={idx}>
                    <label className="block text-[10px] font-mono text-slate-500">Párrafo Introductorio {idx + 1}</label>
                    <textarea
                      value={p}
                      onChange={(e) => updateListItem("about.paragraphs", idx, e.target.value)}
                      className="w-full h-16 bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Los 5 Pilares del Hackeo Mental</h3>
              <div className="space-y-4">
                {content.about.pilares.map((pilar, index) => (
                  <div key={index} className="bg-black/40 border border-brand-violet/15 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-brand-violet font-bold">PILAR III-{index + 1}</span>
                      <input
                        type="text"
                        value={pilar.icon}
                        onChange={(e) => {
                          const pilares = [...content.about.pilares];
                          pilares[index].icon = e.target.value;
                          updateField("about.pilares", pilares);
                        }}
                        className="w-10 text-center bg-black/60 border border-brand-violet/30 rounded px-1 text-xs py-0.5 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={pilar.title}
                      onChange={(e) => {
                        const pilares = [...content.about.pilares];
                        pilares[index].title = e.target.value;
                        updateField("about.pilares", pilares);
                      }}
                      className="w-full bg-black/60 border border-brand-violet/30 rounded px-2 text-xs py-1 focus:outline-none text-white font-semibold"
                    />
                    <textarea
                      value={pilar.desc}
                      onChange={(e) => {
                        const pilares = [...content.about.pilares];
                        pilares[index].desc = e.target.value;
                        updateField("about.pilares", pilares);
                      }}
                      className="w-full h-12 bg-black/60 border border-brand-violet/30 rounded px-2 text-xs py-1 focus:outline-none text-slate-300 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SIMULATOR ================= */}
        {activeTab === "simulador" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Simulador Diagnóstico</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Título Inicial del Diagnóstico</label>
                  <input
                    type="text"
                    value={content.diagnoser.title}
                    onChange={(e) => updateField("diagnoser.title", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Descripción de Ayuda</label>
                  <textarea
                    value={content.diagnoser.desc}
                    onChange={(e) => updateField("diagnoser.desc", e.target.value)}
                    className="w-full h-16 bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Editar Protocolos Clínicos</h3>
              
              <div className="space-y-4">
                {Object.keys(content.diagnoser.protocols).map((key) => {
                  const p = content.diagnoser.protocols[key];
                  const opt = content.diagnoser.options.find(o => o.key === key);
                  return (
                    <div key={key} className="bg-black/60 border border-brand-violet/20 rounded-xl p-4 space-y-3 shadow-inner">
                      <div className="flex justify-between items-center border-b border-brand-violet/10 pb-1.5">
                        <span className="text-xs font-mono font-black text-brand-gold uppercase">{key} ({opt?.label})</span>
                        <input
                          type="text"
                          value={opt?.label || ""}
                          onChange={(e) => {
                            const options = content.diagnoser.options.map(o => o.key === key ? { ...o, label: e.target.value } : o);
                            updateField("diagnoser.options", options);
                          }}
                          className="bg-black/40 border border-brand-violet/20 rounded text-[11px] px-2 py-0.5 max-w-[200px]"
                        />
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-500">Bucle Biológico Analizado</label>
                          <input
                            type="text"
                            value={p.bioloop}
                            onChange={(e) => {
                              const protocols = { ...content.diagnoser.protocols };
                              protocols[key] = { ...protocols[key], bioloop: e.target.value };
                              updateField("diagnoser.protocols", protocols);
                            }}
                            className="w-full bg-black/80 border border-brand-violet/15 rounded px-2 py-1 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-500">Alteración Química / Biológica</label>
                          <input
                            type="text"
                            value={p.chemical}
                            onChange={(e) => {
                              const protocols = { ...content.diagnoser.protocols };
                              protocols[key] = { ...protocols[key], chemical: e.target.value };
                              updateField("diagnoser.protocols", protocols);
                            }}
                            className="w-full bg-black/80 border border-brand-violet/15 rounded px-2 py-1 text-xs text-slate-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Nombre de Protocolo</label>
                            <input
                              type="text"
                              value={p.protocolName}
                              onChange={(e) => {
                                const protocols = { ...content.diagnoser.protocols };
                                protocols[key] = { ...protocols[key], protocolName: e.target.value };
                                updateField("diagnoser.protocols", protocols);
                              }}
                              className="w-full bg-black/80 border border-brand-violet/15 rounded px-2 py-1 text-xs text-brand-gold font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Capítulo de Referencia</label>
                            <input
                              type="text"
                              value={p.chapter}
                              onChange={(e) => {
                                const protocols = { ...content.diagnoser.protocols };
                                protocols[key] = { ...protocols[key], chapter: e.target.value };
                                updateField("diagnoser.protocols", protocols);
                              }}
                              className="w-full bg-black/80 border border-brand-violet/15 rounded px-2 py-1 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-500">Solución / Método de Reparación</label>
                          <textarea
                            value={p.solution}
                            onChange={(e) => {
                              const protocols = { ...content.diagnoser.protocols };
                              protocols[key] = { ...protocols[key], solution: e.target.value };
                              updateField("diagnoser.protocols", protocols);
                            }}
                            className="w-full h-14 bg-black/80 border border-brand-violet/15 rounded px-2 py-1 text-xs text-slate-300 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: TOPICS ================= */}
        {activeTab === "topics" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Sección Temarios</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Título Principal de la Sección</label>
                  <input
                    type="text"
                    value={content.topics.title}
                    onChange={(e) => updateField("topics.title", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    value={content.topics.subtitle}
                    onChange={(e) => updateField("topics.subtitle", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Enlace a índice (Texto)</label>
                  <input
                    type="text"
                    value={content.topics.indexLinkText}
                    onChange={(e) => updateField("topics.indexLinkText", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">6 Tarjetas de Contenido</h3>
              <div className="space-y-4">
                {content.topics.cards.map((card, index) => (
                  <div key={index} className="bg-black/40 border border-brand-violet/15 p-3 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono text-brand-violet font-bold">TARJETA II-0{index + 1}</span>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const cards = [...content.topics.cards];
                        cards[index].title = e.target.value;
                        updateField("topics.cards", cards);
                      }}
                      className="w-full bg-black/60 border border-brand-violet/30 rounded px-2 py-1 text-xs text-white font-semibold focus:outline-none"
                    />
                    <textarea
                      value={card.desc}
                      onChange={(e) => {
                        const cards = [...content.topics.cards];
                        cards[index].desc = e.target.value;
                        updateField("topics.cards", cards);
                      }}
                      className="w-full h-16 bg-black/60 border border-brand-violet/30 rounded px-2 py-1 text-xs text-slate-300 resize-none focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: AUDIENCE (TARGET) ================= */}
        {activeTab === "target" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Sección Compatibilidad</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Título Inicial</label>
                  <input
                    type="text"
                    value={content.target.title}
                    onChange={(e) => updateField("target.title", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Subtítulo explicativo</label>
                  <input
                    type="text"
                    value={content.target.subtitle}
                    onChange={(e) => updateField("target.subtitle", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">"Es Para ti si..." (Lista)</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={content.target.yesTitle}
                  onChange={(e) => updateField("target.yesTitle", e.target.value)}
                  className="w-full bg-black/60 border border-brand-violet/30 rounded px-2 py-1 text-xs font-mono text-brand-gold font-bold mb-1.5 focus:outline-none"
                />
                {content.target.yesItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-brand-gold font-mono text-xs pt-1.5">✔</span>
                    <textarea
                      value={item}
                      onChange={(e) => updateListItem("target.yesItems", index, e.target.value)}
                      className="w-full h-12 bg-black/60 border border-brand-violet/20 rounded px-2 py-1 text-xs text-slate-300 resize-none focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">"No es para ti si..." (Lista)</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={content.target.noTitle}
                  onChange={(e) => updateField("target.noTitle", e.target.value)}
                  className="w-full bg-black/60 border border-brand-violet/30 rounded px-2 py-1 text-xs font-mono text-red-400 font-bold mb-1.5 focus:outline-none"
                />
                {content.target.noItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-red-500 font-mono text-xs pt-1.5">✘</span>
                    <textarea
                      value={item}
                      onChange={(e) => updateListItem("target.noItems", index, e.target.value)}
                      className="w-full h-12 bg-black/60 border border-brand-violet/20 rounded px-2 py-1 text-xs text-slate-300 resize-none focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: FAQS ================= */}
        {activeTab === "faqs" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-3">Preguntas Frecuentes</h3>
              <div className="space-y-3">
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Título FAQ</label>
                <input
                  type="text"
                  value={content.faqs.title}
                  onChange={(e) => updateField("faqs.title", e.target.value)}
                  className="w-full bg-black/60 border border-brand-violet/30 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              {content.faqs.rows.map((row, index) => (
                <div key={index} className="bg-black/40 border border-brand-violet/20 p-4 rounded-xl space-y-3 shadow-inner">
                  <span className="text-[10px] font-mono text-brand-gold font-bold">PREGUNTA FRECUENTE 0{index + 1}</span>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">Pregunta</label>
                    <input
                      type="text"
                      value={row.question}
                      onChange={(e) => {
                        const rows = [...content.faqs.rows];
                        rows[index].question = e.target.value;
                        updateField("faqs.rows", rows);
                      }}
                      className="w-full bg-black/80 border border-brand-violet/15 rounded px-2.5 py-1.5 text-xs text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">Respuesta</label>
                    <textarea
                      value={row.answer}
                      onChange={(e) => {
                        const rows = [...content.faqs.rows];
                        rows[index].answer = e.target.value;
                        updateField("faqs.rows", rows);
                      }}
                      className="w-full h-20 bg-black/80 border border-brand-violet/15 rounded px-2.5 py-1.5 text-xs text-slate-300 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: ADVANCED & JSON IMPORT/EXPORT ================= */}
        {activeTab === "advanced" && (
          <div className="space-y-5 text-sans text-xs">
            {/* Google AdSense Integration Settings */}
            <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-xl space-y-3.5">
              <h4 className="font-mono text-brand-gold font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-gold" /> Integración con Google AdSense
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Configura tu ID de Editor de Google AdSense para inyectar automáticamente el código de monetización oficial en la cabecera (<code className="bg-black px-1 py-0.5 rounded text-brand-gold font-mono">&lt;head&gt;</code>) de tu web y validar la URL para aprobación de AdSense.
              </p>
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">ID de Editor AdSense (ca-pub-XXXXXXXXXXXXXXX)</label>
                  <input
                    type="text"
                    value={content.adsenseClientId || ""}
                    onChange={(e) => updateField("adsenseClientId", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/35 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold"
                    placeholder="Ej. ca-pub-0925485493019485"
                  />
                  <span className="text-[9px] text-slate-500 block mt-1">Este ID vincula la web con tu cuenta Adsense automáticamente.</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Correo de Soporte Oficial (Para AdSense y Usuarios)</label>
                  <input
                    type="email"
                    value={content.soporteEmail || "contacto@codigosilencioso.com"}
                    onChange={(e) => updateField("soporteEmail", e.target.value)}
                    className="w-full bg-black/60 border border-brand-violet/35 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-gold"
                    placeholder="Ej. soporte@codigosilencioso.com"
                  />
                  <span className="text-[9px] text-slate-500 block mt-1">Utilizado en las cláusulas de las políticas de privacidad y formularios de contacto.</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-violet/10 border border-brand-violet/20 p-4 rounded-xl space-y-2">
              <h4 className="font-mono text-brand-gold font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Save className="w-3.5 h-3.5" /> Guardado del Trabajo
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Editas desde el navegador de manera local. Los cambios se guardan automáticamente en tu almacenamiento local (<code className="bg-black px-1 py-0.5 rounded text-brand-gold font-mono">localStorage</code>) para que no los pierdas al refrescar la pantalla.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <button
                onClick={() => {
                  localStorage.setItem("codigo_silencioso_content", JSON.stringify(content));
                  triggerToast("¡Diseño guardado en almacenamiento local de manera segura!");
                }}
                className="bg-brand-violet hover:bg-brand-violet/85 text-white font-mono font-bold uppercase p-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Local</span>
              </button>

              <button
                onClick={handleReset}
                className="bg-black/60 hover:bg-black text-slate-400 hover:text-white font-mono uppercase p-3 rounded-xl border border-brand-violet/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer</span>
              </button>
            </div>

            <div className="border-t border-brand-violet/15 pt-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                Exportar Configuración Completa (JSON)
              </h4>
              <p className="text-slate-400 leading-tight">
                Puedes copiar este JSON de abajo para respaldar tus ediciones o para pegarlo en el archivo <code className="bg-black px-1.5 py-0.5 text-brand-gold rounded">defaultContent.ts</code> y consolidar los cambios permanentes en el código.
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  value={JSON.stringify(content, null, 2)}
                  className="w-full h-44 bg-black/80 border border-brand-violet/25 rounded-lg px-3 py-2 text-[10px] font-mono text-slate-300 select-all"
                />
                <button
                  onClick={handleCopyJson}
                  className="absolute bottom-3 right-3 bg-brand-gold text-black hover:bg-white transition-all rounded px-2.5 py-1 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>
              </div>
            </div>

            <div className="border-t border-brand-violet/15 pt-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                Importar Configuración
              </h4>
              <p className="text-slate-400 leading-tight">
                Pega tu código JSON anterior abajo para re-aplicar tu configuración de manera masiva.
              </p>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Pega tu JSON aquí...'
                className="w-full h-32 bg-black/60 border border-brand-violet/20 rounded-lg px-3 py-2 text-[10px] font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleImportJson}
                className="w-full bg-black border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-white font-mono uppercase p-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-4.5 h-4.5" />
                <span>Importar JSON</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Panel Footer */}
      <div className="p-4 bg-black/90 border-t border-brand-violet/15 flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>© 2026 Plataforma de Autor v2.0</span>
        <span className="flex items-center gap-1 text-slate-400">
          <ChevronRight className="w-3 h-3 text-brand-gold" />
          Pulsa Esc para cerrar este panel
        </span>
      </div>
    </div>
  );
};
