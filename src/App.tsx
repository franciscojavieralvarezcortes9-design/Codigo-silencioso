import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Zap,
  RotateCw,
  Target,
  ArrowRight,
  BookOpen,
  Award,
  Instagram,
  ChevronDown,
  Lock,
  Moon,
  Sparkles,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  Check,
  AlertTriangle,
  Flame,
  HelpCircle,
  Edit,
  Settings
} from "lucide-react";
import { AppContent } from "./types";
import { DEFAULT_CONTENT } from "./defaultContent";
import { CreatorPanel } from "./components/CreatorPanel";
import { ComplianceModals } from "./components/ComplianceModals";
import { trackVisit, trackClick } from "./services/tracker";
import { AdminDashboard } from "./components/AdminDashboard";

// Import book cover image
// @ts-ignore
import bookCover from "./assets/images/book_cover_official_final_1781653883340.jpg";
const BOOK_COVER_PATH = bookCover;

// HTML5 Canvas Brain Wave Particle Effect
const BrainWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle class representing nodes in the network
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.1;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle alpha pulsation
        this.alpha = this.baseAlpha + Math.sin(Date.now() * 0.001 * this.radius) * 0.05;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(107, 33, 232, ${this.alpha})`; // Deep Violet Node
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid system representing diagnostic nodes
      ctx.strokeStyle = "rgba(107, 33, 232, 0.02)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw a slow sinuous sine wave representing the brain alpha-frequency activity
      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 166, 35, 0.04)"; // Golden faint wave
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 3) {
        const y =
          height / 2 +
          Math.sin(x * 0.005 + Date.now() * 0.0006) * 50 * Math.sin(x * 0.001 + Date.now() * 0.0002) +
          Math.cos(x * 0.01 - Date.now() * 0.0004) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Render particle neural network
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        // Draw connections between neighboring nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(107, 33, 232, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

// Launch Promotional Countdown Timer (Updates accurately in real time)
const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    // Standard timer ticking downwards
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset slightly to maintain urgency
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUnit = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center space-x-2 font-mono text-xs text-brand-gold bg-brand-violet/15 border border-brand-violet/30 px-3 py-1.5 rounded-full shadow-inner shadow-brand-violet/10">
      <Flame className="w-3.5 h-3.5 text-brand-gold animate-pulse mr-1" />
      <span className="tracking-wide">OFERTA DE LANZAMIENTO EXPIRA EN:</span>
      <span className="font-bold text-white tracking-widest px-1.5 py-0.5 bg-black/40 rounded border border-white/5">
        {formatUnit(timeLeft.hours)}
      </span>
      <span>:</span>
      <span className="font-bold text-white tracking-widest px-1.5 py-0.5 bg-black/40 rounded border border-white/5">
        {formatUnit(timeLeft.minutes)}
      </span>
      <span>:</span>
      <span className="font-bold text-white tracking-widest px-1.5 py-0.5 bg-black/40 rounded border border-white/5">
        {formatUnit(timeLeft.seconds)}
      </span>
    </div>
  );
};

// Interactive Protocol diagnoser widget
interface ProtocolEngineProps {
  diagnoserContent: AppContent["diagnoser"];
  paymentUrl: string;
}

const InteractiveProtocolEngine: React.FC<ProtocolEngineProps> = ({ diagnoserContent, paymentUrl }) => {
  const [selectedCase, setSelectedCase] = useState<string>("procrastination");
  const [diagnosing, setDiagnosing] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  const diagnosis = diagnoserContent.protocols[selectedCase] || diagnoserContent.protocols["procrastination"];

  const handleSelect = (key: string) => {
    if (key === selectedCase) return;
    setDiagnosing(true);
    setFade(true);
    setTimeout(() => {
      setSelectedCase(key);
      setDiagnosing(false);
      setFade(false);
    }, 700);
  };

  const getIconForCase = (key: string) => {
    switch (key) {
      case "procrastination":
        return Target;
      case "sleep":
        return Moon;
      case "emotion":
        return Zap;
      case "power":
        return Award;
      default:
        return Brain;
    }
  };

  return (
    <div className="glass-morphism rounded-2xl border border-brand-violet/20 p-6 md:p-8 max-w-4xl mx-auto backdrop-blur-xl relative overflow-hidden glow-violet">
      <div className="absolute top-0 right-0 p-1 bg-brand-gold/10 text-brand-gold border-b border-l border-brand-gold/20 text-[10px] tracking-wider font-mono uppercase">
        NÚCLEO DIAGNÓSTICO EN TIEMPO REAL
      </div>

      <div className="mb-6">
        <h3 className="font-serif text-lg tracking-wide text-brand-gold flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-gold animate-pulse" />
          {diagnoserContent.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          {diagnoserContent.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
        {diagnoserContent.options.map((item) => {
          const IconComp = getIconForCase(item.key);
          const isActive = selectedCase === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleSelect(item.key)}
              id={`diagnose-btn-${item.key}`}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center cursor-pointer
                ${isActive
                  ? "bg-brand-violet/20 border-brand-gold/60 text-white shadow-md shadow-brand-violet/30"
                  : "bg-black/40 border-brand-violet/10 hover:border-brand-violet/40 text-slate-400 hover:text-slate-200"
                }`}
            >
              <IconComp className={`w-5 h-5 mb-2 ${isActive ? "text-brand-gold scale-110" : "text-brand-violet"}`} />
              <span className="text-xs font-medium tracking-tight leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Diagnosis Results Display */}
      <div className="bg-black/60 border border-brand-violet/25 rounded-xl p-5 relative min-h-[220px] transition-all duration-500">
        {diagnosing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 rounded-xl">
            <RotateCw className="w-8 h-8 text-brand-gold animate-spin mb-2" />
            <span className="text-xs font-mono tracking-widest text-brand-gold">CALIBRANDO FRECUENCIA CEREBRAL...</span>
            <div className="w-48 h-1 bg-brand-violet/20 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-brand-gold rounded-full w-full animate-pulse" />
            </div>
          </div>
        ) : null}

        <div className={`transition-all duration-500 ${fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-violet/15 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-brand-violet uppercase">ANÁLISIS NEUROQUÍMICO</span>
              <h4 className="text-sm font-semibold text-white tracking-wide">{diagnosis.bioloop}</h4>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-950/20 border border-red-500/20 text-red-400 text-[10px] font-mono">
              <AlertTriangle className="w-3 h-3 text-red-400" /> RECEPTOR COMPROMETIDO
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block mb-1">ALTERACIÓN BIOLÓGICA</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{diagnosis.chemical}</p>

              <span className="text-[10px] font-mono text-slate-500 block mt-4 mb-1">PROTOCOLO DE REPARACIÓN</span>
              <span className="inline-flex items-center rounded-md bg-brand-gold/10 px-2.5 py-1 text-xs font-medium text-brand-gold ring-1 ring-inset ring-brand-gold/20">
                🚀 {diagnosis.protocolName}
              </span>
            </div>

            <div className="border-l border-brand-violet/10 pl-0 md:pl-6">
              <div className="text-[10px] font-mono text-brand-gold mb-1 flex items-center gap-1">
                <BookmarkCheck className="w-3.5 h-3.5" /> UBICACIÓN EN EL LIBRO
              </div>
              <h5 className="text-xs font-semibold text-white mb-2">{diagnosis.chapter}</h5>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{diagnosis.solution}"
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-violet/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-violet/10 -mx-5 -mb-5 px-5 py-4 rounded-b-xl">
            <span className="text-[11px] text-slate-300 font-medium">Este protocolo está completamente detallado en el Volumen 2.</span>
            <a
              href={paymentUrl}
              className="text-xs font-bold text-brand-gold hover:text-white flex items-center gap-1.5 transition-colors group"
            >
              ACCEDER AL PROTOCOLO COMPLETO AHORA
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1 text-brand-gold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Item template component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQRow: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-violet/15 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left focus:outline-none focus:text-brand-gold py-2 group cursor-pointer"
      >
        <span className="font-serif font-medium text-slate-200 group-hover:text-brand-gold transition-colors text-base md:text-lg pr-4">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-brand-violet transition-transform flex-shrink-0 ${open ? "rotate-180 text-brand-gold" : ""}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[300px] opacity-100 mt-2 pb-2" : "max-h-0 opacity-0"}`}>
        <p className="text-slate-300 text-sm leading-relaxed font-sans">{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [content, setContent] = useState<AppContent>(() => {
    const saved = localStorage.getItem("codigo_silencioso_content");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return DEFAULT_CONTENT;
  });

  // Compliance dialogs state (Privacy policy, Terms & Conditions, Cookies, Support form)
  const [compliance, setCompliance] = useState<{
    isOpen: boolean;
    type: "privacy" | "terms" | "cookie" | "contact" | null;
  }>({ isOpen: false, type: null });

  // Dynamically inject Google AdSense global verification code inside <head> if client code is provided
  useEffect(() => {
    if (!content.adsenseClientId) return;

    const scriptId = "google-adsense-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${content.adsenseClientId}`;
  }, [content.adsenseClientId]);

  // Dynamically inject Google Analytics 4 (GA4) inside <head> if measurement ID is provided
  useEffect(() => {
    if (!content.googleAnalyticsId) return;

    const externalScriptId = "google-analytics-script";
    const inlineScriptId = "google-analytics-inline";

    let script = document.getElementById(externalScriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = externalScriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${content.googleAnalyticsId}`;
      document.head.appendChild(script);
    }

    let inlineScript = document.getElementById(inlineScriptId) as HTMLScriptElement;
    if (!inlineScript) {
      inlineScript = document.createElement("script");
      inlineScript.id = inlineScriptId;
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${content.googleAnalyticsId}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, [content.googleAnalyticsId]);

  // Track page visits and global link clicks
  useEffect(() => {
    // Record page view on load
    trackVisit();

    // Global listener for tracking button/link clicks
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let current: HTMLElement | null = target;
      while (current && current !== document.body) {
        if (current.tagName === "A" || current.tagName === "BUTTON") {
          // Skip tracking clicks inside the admin dashboard to avoid cluttering metrics
          if (current.closest(".admin-dashboard") || current.id === "admin-dashboard" || current.closest("#admin-dashboard")) {
            return;
          }
          const id = current.id || current.getAttribute("data-track-id") || "";
          const text = current.innerText || current.getAttribute("aria-label") || "";
          const href = current.getAttribute("href") || "";
          trackClick(id || current.tagName.toLowerCase(), text, href);
          break;
        }
        current = current.parentElement;
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Invisible back-door shortcut for site owner/dev to access editing drawer or admin panel
  // Triggered by holding (Ctrl OR Alt OR Command) + Shift + E for Editor, or + A for Admin Analytics
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey) {
        if (e.key.toLowerCase() === "e") {
          e.preventDefault();
          setIsPanelOpen((prev) => !prev);
        } else if (e.key.toLowerCase() === "a") {
          e.preventDefault();
          setIsAdminOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeys);

    if (window.location.search.includes("edit=true") || window.location.hash === "#edit") {
      setIsPanelOpen(true);
    }
    if (window.location.search.includes("admin=true") || window.location.hash === "#admin") {
      setIsAdminOpen(true);
    }

    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  // Monitor scroll behavior for progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to Escape key to close editing drawer panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPanelOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUpdate = (newContent: AppContent) => {
    setContent(newContent);
    localStorage.setItem("codigo_silencioso_content", JSON.stringify(newContent));
  };

  const handleReset = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem("codigo_silencioso_content");
  };

  return (
    <div className="bg-brand-dark min-h-screen relative flex flex-col font-sans select-none selection:bg-brand-violet/40 selection:text-brand-gold text-brand-text">
      
      {/* Slide-out Visual Editor Sidebar Panel */}
      <CreatorPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        content={content}
        onUpdate={handleUpdate}
        onReset={handleReset}
        defaultCover={BOOK_COVER_PATH}
      />

      {/* Scroll indicator bar on top */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet z-40 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Trust banner */}
      <header className="fixed top-2 left-0 right-0 z-35 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto backdrop-blur-md bg-brand-dark/65 border border-brand-violet/20 px-4 md:px-6 py-3 rounded-full flex items-center justify-between shadow-lg shadow-black/80">
          <a href="#" className="flex items-center space-x-2">
            <span className="font-serif text-sm tracking-widest text-white hover:text-brand-gold transition-colors font-black">
              CÓDIGO SILENCIOSO
            </span>
            <span className="text-[10px] bg-brand-violet/30 border border-brand-violet/50 px-2 py-0.5 rounded text-brand-gold font-mono font-bold">
              VOL II
            </span>
          </a>

          {/* Nav menu links for smooth-scrolling */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider">
            <a href="#about" className="text-slate-300 hover:text-brand-gold transition-colors">
              ¿QUÉ ES EL PROTOCOLO?
            </a>
            <a href="#topics" className="text-slate-300 hover:text-brand-gold transition-colors">
              LO QUE DOMINARÁS
            </a>
            <a href="#target" className="text-slate-300 hover:text-brand-gold transition-colors">
              ¿PARA QUIÉN?
            </a>
            <a href="#author" className="text-slate-300 hover:text-brand-gold transition-colors">
              EL AUTOR
            </a>
          </nav>

          <div>
            <a
              href={content.paymentUrl}
              className="bg-brand-gold text-black text-[10px] md:text-sm font-bold tracking-wider hover:bg-brand-gold/80 hover:scale-[1.03] transition-all px-4 py-2 rounded-full font-mono flex items-center space-x-1"
            >
              <span>ADQUIRIR COPIA</span>
              <Lock className="w-3 h-3 text-black" />
            </a>
          </div>
        </div>
      </header>

      {/* ----------------- SECTION 1: HERO SECTION ----------------- */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden md:px-6">
        {/* Animated dynamic wave background */}
        <BrainWaveCanvas />

        {/* Backdrop Ambient Light Spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto text-center px-4 z-10 relative flex flex-col items-center">
          {/* Eyebrow badge */}
          <div className="mb-4 inline-flex items-center space-x-2 bg-brand-violet/15 border border-brand-violet/30 rounded-full px-4 py-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
            <span className="text-xs uppercase tracking-widest font-mono text-slate-300 font-semibold gap-1.5 flex">
              {content.hero.badgeText}
            </span>
          </div>

          {/* Main Title heading with gold/cinzel style */}
          <h1 className="font-serif leading-none tracking-tight py-1">
            <span className="text-gold-gradient block text-[2.7rem] sm:text-6xl md:text-8xl font-black tracking-[0.05em] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] filter">
              {content.hero.titleLine1}
            </span>
            <span className="text-violet-gradient block text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest uppercase mt-2">
              {content.hero.titleLine2}
            </span>
          </h1>

          {/* Action-focused subtitle */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 font-mono max-w-2xl text-center tracking-tight leading-relaxed italic border-x border-brand-violet/20 px-4">
            {content.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center">
            {/* Countdown component in between to drive FOMO */}
            <LaunchCountdown />
          </div>

          {/* Centered book cover block with gorgeous glowing animation */}
          <div className="mt-10 mb-8 max-w-[280px] sm:max-w-[340px] relative group px-2">
            {/* Ambient gold-purple background glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-violet via-brand-gold to-brand-violet opacity-30 blur-2xl group-hover:opacity-75 transition-all duration-700" />

            <a
              href={content.paymentUrl}
              title="Obtener Volumen 2 de Código Silencioso en Hotmart"
              className="block relative rounded-2xl border-2 border-brand-violet/40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-brand-dark cursor-pointer transform group-hover:scale-[1.04] group-hover:-translate-y-1 transition-all duration-500 hover:glow-gold"
            >
              <img
                src={content.bookCoverUrl || BOOK_COVER_PATH}
                alt="Código Silencioso Volumen 2 - Portada Oficial"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />

              {/* Cover shiny linear overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </a>


          </div>

          {/* CTA Box */}
          <div className="w-full flex flex-col items-center">
            <a
              href={content.paymentUrl}
              className="w-full sm:w-auto relative inline-flex items-center justify-center bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-brand-gold text-black uppercase font-mono font-black text-sm tracking-widest px-8 py-4.5 rounded-xl transition-all shadow-[0_4px_30px_rgba(245,166,35,0.4)] hover:shadow-[0_4px_40px_rgba(245,166,35,0.6)] cursor-pointer scale-100 hover:scale-[1.025] active:scale-95 group text-center"
            >
              {content.hero.ctaButton}
            </a>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-mono">
              {content.hero.features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-brand-gold" /> {feature}
                  </span>
                  {idx < content.hero.features.length - 1 && <span className="text-brand-violet">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: WHAT IS THIS BOOK SECTION ----------------- */}
      <section id="about" className="py-20 relative bg-black/60 border-y border-brand-violet/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Details Side */}
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-xs font-mono text-brand-violet tracking-widest uppercase block">
                {content.about.badgeText}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black leading-tight border-b border-brand-violet/15 pb-4">
                {content.about.title}
              </h2>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed text-justify">
                {content.about.paragraphs.map((para, i) => (
                  <p key={i}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Quality Seal */}
              <div className="flex items-center gap-3 bg-brand-violet/10 border border-brand-violet/20 p-4 rounded-xl">
                <BookOpen className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs text-slate-300 font-mono italic">
                  {content.about.quote}
                </span>
              </div>
            </div>

            {/* Graphical representation side */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-xs font-mono text-brand-gold tracking-widest uppercase mb-4 text-center md:text-left">
                {content.about.columnTitle}
              </h3>

              <div className="bg-brand-dark/80 border border-brand-violet/20 rounded-2xl p-6 space-y-4 shadow-xl">
                {content.about.pilares.map((pilar, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3 rounded-lg border border-brand-violet/10 bg-black/40 hover:border-brand-violet/30 transition-all duration-300"
                  >
                    <div className="text-2xl bg-black/80 w-12 h-12 rounded-lg flex items-center justify-center border border-brand-violet/15 flex-shrink-0">
                      {pilar.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-white tracking-wide">{pilar.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{pilar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: INTERACTIVE DIAGNOSTIC SIMULATOR ----------------- */}
      <section className="py-20 relative bg-brand-dark">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center mb-10 z-10 relative">
          <span className="text-xs font-mono text-brand-gold tracking-widest uppercase">
            {content.diagnoser.badgeText}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-normal font-black mt-2">
            {content.diagnoser.title}
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            {content.diagnoser.desc}
          </p>
        </div>

        <div className="px-4 z-10 relative">
          <InteractiveProtocolEngine
            diagnoserContent={content.diagnoser}
            paymentUrl={content.paymentUrl}
          />
        </div>
      </section>

      {/* ----------------- SECTION 4: WHAT YOU WILL LEARN SECTION ----------------- */}
      <section id="topics" className="py-20 bg-black/40 relative border-t border-brand-violet/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-brand-violet tracking-widest uppercase">
              {content.topics.badgeText}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mt-2">
              {content.topics.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 font-mono">
              {content.topics.subtitle}
            </p>
          </div>

          {/* Grid of 6 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.topics.cards.map((card, index) => (
              <div
                key={index}
                className="glass-morphism p-6 rounded-2xl glass-morphic-hover group hover:border-brand-gold/40 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-violet/10 to-transparent pointer-events-none" />

                <div>
                  <div className="font-mono text-xs text-brand-gold font-bold mb-3 flex items-center justify-between">
                    <span>PROTOCOLO II-0{index + 1}</span>
                    <span className="text-[9px] bg-brand-violet/20 px-2 py-0.5 rounded text-brand-violet border border-brand-violet/30 font-black">ACTIVE</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-3 group-hover:text-brand-gold transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-violet/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>MÉTODO: APLICADO</span>
                  <span className="text-brand-gold/60 group-hover:text-brand-gold transition-colors">Volumen II</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={content.paymentUrl}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold hover:text-white transition-colors uppercase border-b border-brand-gold/30 hover:border-white pb-1"
            >
              {content.topics.indexLinkText} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: FOR WHOM SECTION ----------------- */}
      <section id="target" className="py-20 relative bg-brand-dark">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-brand-gold tracking-widest uppercase">
              {content.target.badgeText}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-black mt-2">
              {content.target.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 font-mono">
              {content.target.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* COLUMN 1: ES PARA TI SI... */}
            <div className="glass-morphism p-6 md:p-8 rounded-2xl border-l-4 border-brand-gold/60 bg-gradient-to-r from-brand-gold/5 via-brand-dark/20 to-brand-dark shadow-xl hover:glow-gold transition-all">
              <h3 className="font-serif text-xl font-bold text-brand-gold flex items-center gap-2 mb-6 tracking-wide">
                <Check className="w-6 h-6 text-brand-gold bg-brand-gold/10 p-1 rounded-full flex-shrink-0" />
                {content.target.yesTitle}
              </h3>
              <ul className="space-y-4 font-sans text-sm md:text-base text-slate-300">
                {content.target.yesItems.map((item, idx) => (
                  <li className="flex items-start gap-3" key={idx}>
                    <span className="text-brand-gold mt-1">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: NO ES PARA TI SI... */}
            <div className="glass-morphism p-6 md:p-8 rounded-2xl border-l-4 border-red-500/60 bg-gradient-to-r from-red-500/5 via-brand-dark/20 to-brand-dark shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all">
              <h3 className="font-serif text-xl font-bold text-red-400 flex items-center gap-2 mb-6 tracking-wide">
                <span className="bg-red-500/10 text-red-500 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">X</span>
                {content.target.noTitle}
              </h3>
              <ul className="space-y-4 font-sans text-sm md:text-base text-slate-300">
                {content.target.noItems.map((item, idx) => (
                  <li className="flex items-start gap-3" key={idx}>
                    <span className="text-red-500 mt-1">✘</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 6: AUTHOR SECTION ----------------- */}
      <section id="author" className="py-20 relative bg-black/60 border-t border-brand-violet/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glass-morphism rounded-2xl border border-brand-violet/20 p-6 md:p-10 relative overflow-hidden shadow-2xl">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Profile placeholder structure */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-violet to-brand-gold p-1 flex items-center justify-center glow-violet shadow-2xl">
                  <div className="w-full h-full rounded-full bg-brand-dark flex items-center justify-center">
                    <Brain className="w-10 h-10 md:w-14 md:h-14 text-white animate-pulse" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-brand-gold text-black px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest border border-black uppercase">
                  AUTOR
                </div>
              </div>

              {/* Bio description */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-brand-gold tracking-widest uppercase">
                  {content.author.badgeText}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide font-black">
                  {content.author.title}
                </h2>
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed text-justify">
                  {content.author.paragraphs.map((p, i) => (
                    <p key={i}>
                      {p}
                    </p>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-brand-violet/10">
                  <a
                    href={content.author.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-brand-gold hover:text-white transition-colors group"
                  >
                    <Instagram className="w-4 h-4 text-brand-gold group-hover:text-white group-hover:scale-110 transition-all" />
                    <span>{content.author.socialText}</span>
                    <span className="font-bold underline">{content.author.socialHandle}</span>
                  </a>

                  <span className="text-[10px] text-slate-500 font-mono">COMUNIDAD IMPERTURBABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- INTRODUCING PORTION COLLAPSE / FAQ ----------------- */}
      <section className="py-20 relative bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <HelpCircle className="w-8 h-8 text-brand-gold mx-auto mb-2 animate-bounce" />
            <span className="text-xs font-mono text-brand-gold tracking-widest uppercase">
              {content.faqs.badgeText}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide font-black mt-2">
              {content.faqs.title}
            </h2>
          </div>

          <div className="glass-morphism rounded-2xl border border-brand-violet/20 p-6 shadow-xl backdrop-blur-md">
            {content.faqs.rows.map((row, idx) => (
              <FAQRow
                key={idx}
                question={row.question}
                answer={row.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 7: FINAL CTA SECTION ----------------- */}
      <section className="py-24 relative overflow-hidden bg-black flex items-center justify-center border-t border-brand-violet/20">
        <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-violet/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 text-center z-10 relative space-y-8">
          <div className="inline-flex items-center space-x-1 bg-brand-gold/15 border border-brand-gold/30 rounded-full px-3 py-1 font-mono text-[10px] text-brand-gold">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>{content.finalCta.badgeText}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-normal font-black leading-tight">
            {content.finalCta.title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            {content.finalCta.subtitle}
          </p>

          <div className="flex flex-col items-center space-y-4">
            <a
              href={content.paymentUrl}
              className="w-full sm:w-auto relative inline-flex items-center justify-center bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-brand-gold text-black uppercase font-mono font-black text-sm tracking-widest px-10 py-5 rounded-xl transition-all shadow-[0_10px_40px_-5px_rgba(245,166,35,0.45)] hover:shadow-[0_10px_50px_-5px_rgba(245,166,35,0.65)] hover:scale-[1.03] active:scale-95 group text-center"
            >
              {content.finalCta.ctaButton}
            </a>

            <div className="text-xs text-brand-gold font-mono tracking-wider flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span>{content.finalCta.fomoText}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-violet/10 flex flex-wrap justify-center items-center gap-6 opacity-40 hover:opacity-75 transition-opacity">
            <div className="text-[10px] font-mono tracking-widest text-slate-400">PAGO SEGURO RESPALTADO POR HOTMART</div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 8: FOOTER ----------------- */}
      <footer className="bg-brand-dark/95 border-t border-brand-violet/15 py-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <div className="font-serif text-sm tracking-widest text-slate-400 font-bold">
            CÓDIGO SILENCIOSO
          </div>
          <p className="text-xs text-slate-500 tracking-tight leading-relaxed font-sans max-w-sm mx-auto">
            {content.footer.text}
          </p>

          {/* Compliance & AdSense Required Links - Direct Interactive Modals */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400 pb-2">
            <button
              onClick={() => setCompliance({ isOpen: true, type: "privacy" })}
              className="hover:text-brand-gold transition-colors cursor-pointer underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Política de Privacidad
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setCompliance({ isOpen: true, type: "terms" })}
              className="hover:text-brand-gold transition-colors cursor-pointer underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Términos de Servicio
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setCompliance({ isOpen: true, type: "cookie" })}
              className="hover:text-brand-gold transition-colors cursor-pointer underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Política de Cookies
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setCompliance({ isOpen: true, type: "contact" })}
              className="hover:text-brand-gold transition-colors cursor-pointer underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Contacto / Soporte
            </button>
            <span className="text-slate-700">|</span>
            <a href="https://instagram.com/codigosilencioso_" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              Instagram @codigosilencioso_
            </a>
            <span className="text-slate-700">|</span>
            <button
              id="admin-portal-link"
              onClick={() => setIsAdminOpen(true)}
              className="text-brand-gold hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold font-mono decoration-brand-gold hover:underline decoration-brand-gold/40"
            >
              🔒 Panel Intel
            </button>
          </div>

          <div className="text-[9px] text-slate-600 font-mono pt-1">
            Pulsar teclas <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">Ctrl</kbd> + <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">Shift</kbd> + <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">A</kbd> para acceder a la analítica autorizada.
          </div>
        </div>
      </footer>

      {/* Compliance Modals Portal */}
      <ComplianceModals
        isOpen={compliance.isOpen}
        activeType={compliance.type}
        onClose={() => setCompliance({ isOpen: false, type: null })}
        soporteEmail={content.soporteEmail || "contacto@codigosilencioso.com"}
      />

      {/* Admin Analytics & Visitor Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
