import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { AppContent } from "./types";
import { DEFAULT_CONTENT } from "./defaultContent";
import { CreatorPanel } from "./components/CreatorPanel";
import { AdminDashboard } from "./components/AdminDashboard";
import { trackVisit, trackClick } from "./services/tracker";

// Import Pages
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { CookiesPage } from "./pages/CookiesPage";
import { ContactPage } from "./pages/ContactPage";
import { AuthorPage } from "./pages/AuthorPage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";

// Import book cover image
// @ts-ignore
import bookCover from "./assets/images/book_cover_official_final_1781653883340.jpg";
const BOOK_COVER_PATH = bookCover;

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const location = useLocation();

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
    trackVisit();

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let current: HTMLElement | null = target;
      while (current && current !== document.body) {
        if (current.tagName === "A" || current.tagName === "BUTTON") {
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
  }, [location.pathname]); // Track page view on route transitions

  // Invisible back-door shortcut to access visual editor sidebar or admin dashboard
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
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-violet via-brand-gold to-brand-violet z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Shared Global Header */}
      <header className="fixed top-2 left-0 right-0 z-40 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto backdrop-blur-md bg-brand-dark/75 border border-brand-violet/20 px-4 md:px-6 py-3 rounded-full flex items-center justify-between shadow-lg shadow-black/80">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-xs sm:text-sm tracking-widest text-white hover:text-brand-gold transition-colors font-black">
              CÓDIGO SILENCIOSO
            </span>
            <span className="text-[10px] bg-brand-violet/30 border border-brand-violet/50 px-2 py-0.5 rounded text-brand-gold font-mono font-bold">
              VOL II
            </span>
          </Link>

          {/* Shared Header Navigation */}
          <nav className="hidden md:flex items-center space-x-5 text-xs font-mono tracking-wider">
            <Link to="/#about" className="text-slate-300 hover:text-brand-gold transition-colors">
              ¿QUÉ ES EL PROTOCOLO?
            </Link>
            <Link to="/#topics" className="text-slate-300 hover:text-brand-gold transition-colors">
              LO QUE DOMINARÁS
            </Link>
            <Link to="/#target" className="text-slate-300 hover:text-brand-gold transition-colors">
              ¿PARA QUIÉN?
            </Link>
            <Link to="/#author" className="text-slate-300 hover:text-brand-gold transition-colors">
              EL AUTOR
            </Link>
            <Link to="/blog" className="text-brand-gold hover:text-white transition-colors font-bold flex items-center gap-1">
              <span>BLOG</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile blog link to make sure it's accessible */}
            <Link to="/blog" className="md:hidden text-[10px] font-mono font-bold text-brand-gold border border-brand-gold/30 px-2.5 py-1.5 rounded-full hover:bg-brand-gold hover:text-black transition-colors">
              BLOG
            </Link>
            <a
              href={content.paymentUrl}
              onClick={() => trackClick("hotmart_click", "Header Copy Button")}
              className="bg-brand-gold text-black text-[10px] md:text-xs font-bold tracking-wider hover:bg-brand-gold/85 hover:scale-[1.03] transition-all px-3 sm:px-4 py-2 rounded-full font-mono flex items-center space-x-1"
            >
              <span>ADQUIRIR COPIA</span>
              <Lock className="w-3 h-3 text-black" />
            </a>
          </div>
        </div>
      </header>

      {/* ----------------- ROUTED CONTENT MAIN CONTAINER ----------------- */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage content={content} />} />
          <Route path="/privacidad" element={<PrivacyPage soporteEmail={content.soporteEmail || "contacto@codigosilencioso.com"} />} />
          <Route path="/terminos" element={<TermsPage soporteEmail={content.soporteEmail || "contacto@codigosilencioso.com"} />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/contacto" element={<ContactPage soporteEmail={content.soporteEmail || "contacto@codigosilencioso.com"} />} />
          <Route path="/autor" element={<AuthorPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ----------------- SHARED FOOTER WITH STANDALONE LINKS ----------------- */}
      <footer className="bg-brand-dark/95 border-t border-brand-violet/15 py-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="font-serif text-sm tracking-widest text-slate-400 font-bold uppercase">
            <Link to="/" className="hover:text-white transition-colors">CÓDIGO SILENCIOSO</Link>
          </div>
          <p className="text-xs text-slate-500 tracking-tight leading-relaxed font-sans max-w-sm mx-auto">
            {content.footer.text}
          </p>

          {/* Compliance & AdSense Required Links - Real Routing Paths */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400 pb-2">
            <Link
              to="/privacidad"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Política de Privacidad
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/terminos"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Términos de Servicio
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/cookies"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Política de Cookies
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/contacto"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Contacto / Soporte
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/autor"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Sobre el Autor
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/blog"
              className="hover:text-brand-gold transition-colors underline decoration-brand-violet/40 hover:decoration-brand-gold"
            >
              Blog Editorial
            </Link>
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

          {/* AdSense Compliance Permanent Visible Disclaimer */}
          <div className="text-[10px] text-slate-500 max-w-2xl mx-auto border-t border-brand-violet/10 pt-5 leading-relaxed font-mono">
            Descargo de responsabilidad: El contenido de este sitio web, del blog editorial y del libro digital "Código Silencioso Volumen 2" tiene un carácter estrictamente educativo, divulgativo e informativo. Ninguno de los protocolos, análisis, guías o sugerencias aquí explicados constituye consejo médico, diagnóstico, tratamiento ni terapia psicológica, psiquiátrica o neurológica profesional. Consulte siempre con un profesional de la salud cualificado ante cualquier inquietud sobre su bienestar físico o mental.
          </div>

          <div className="text-[9px] text-slate-600 font-mono pt-1">
            Pulsar teclas <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">Ctrl</kbd> + <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">Shift</kbd> + <kbd className="bg-black/40 px-1 py-0.5 rounded border border-white/5 mx-0.5">A</kbd> para acceder a la analítica autorizada.
          </div>
        </div>
      </footer>

      {/* Admin Analytics & Visitor Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
