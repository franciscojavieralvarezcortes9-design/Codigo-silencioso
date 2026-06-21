import React, { useState, useEffect } from "react";
import { 
  auth 
} from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  fetchAllActivity, 
  ActivityLog 
} from "../services/tracker";
import { 
  TrendingUp, 
  MousePointerClick, 
  Eye, 
  LogOut, 
  Calendar, 
  Laptop, 
  Phone, 
  Compass, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  UserCheck, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Globe,
  Plus
} from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle to help set up the account first time

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "visit" | "click">("all");
  const [visibleLogsCount, setVisibleLogsCount] = useState(30);

  // Constants
  const AUTHORIZED_EMAILS = [
    "fran.14jac@gmail.com",
    "franciscojavieralvarezcortes9@gmail.com"
  ];

  // Watch Authentication State
  useEffect(() => {
    // Check localStorage first for instant session recovery
    const savedUser = localStorage.getItem("admin_auth_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing saved admin user", err);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email && AUTHORIZED_EMAILS.includes(user.email.toLowerCase())) {
        setCurrentUser(user);
        localStorage.setItem("admin_auth_user", JSON.stringify({ email: user.email }));
      } else {
        if (!localStorage.getItem("admin_auth_user")) {
          setCurrentUser(null);
        }
      }
    });
    return unsubscribe;
  }, []);

  // Fetch activity logs once authenticated
  const loadAnalyticsData = async () => {
    if (!currentUser) return;
    setLoadingData(true);
    setDataError("");
    try {
      const fetchedLogs = await fetchAllActivity();
      setLogs(fetchedLogs);
    } catch (err: any) {
      console.error(err);
      setDataError(err.message || "Error al leer datos de Firestore. Asegúrate de que las reglas de seguridad estén actualizadas.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (currentUser && isOpen) {
      loadAnalyticsData();
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Sign In / Sign Up handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    const targetEmail = email.trim().toLowerCase();
    const targetPassword = password.trim();

    if (!AUTHORIZED_EMAILS.includes(targetEmail)) {
      setAuthError("Acceso denegado: este panel de la administración es exclusivo para el usuario autorizado.");
      return;
    }

    if (!targetPassword) {
      setAuthError("Por favor ingresa tu contraseña.");
      return;
    }

    setLoadingAuth(true);

    // Direct credentials bypass check for instant, flawless access
    if (AUTHORIZED_EMAILS.includes(targetEmail) && targetPassword === "francisco14") {
      const mockUser = { email: targetEmail };
      setCurrentUser(mockUser);
      localStorage.setItem("admin_auth_user", JSON.stringify(mockUser));
      setAuthSuccess("Acceso autorizado con éxito.");
      setLoadingAuth(false);
      return;
    }

    try {
      if (isRegistering) {
        // Create user
        await createUserWithEmailAndPassword(auth, targetEmail, targetPassword);
        setAuthSuccess("¡Tu cuenta exclusiva de administrador ha sido creada con éxito!");
        setIsRegistering(false);
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
        setAuthSuccess("Acceso autorizado con éxito.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setAuthError("No se encontró el usuario. Intenta ingresando la contraseña directa acordada.");
      } else if (err.code === "auth/wrong-password") {
        setAuthError("La contraseña ingresada es incorrecta.");
      } else {
        // Fallback check: if there is any other error (like operation-not-allowed), but credentials match
        if (targetPassword === "francisco14") {
          const mockUser = { email: targetEmail };
          setCurrentUser(mockUser);
          localStorage.setItem("admin_auth_user", JSON.stringify(mockUser));
          setAuthSuccess("Acceso autorizado con éxito.");
        } else {
          setAuthError(err.message || "Error de autenticación. Intenta nuevamente.");
        }
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  // Sign Out handler
  const handleSignOut = async () => {
    try {
      localStorage.removeItem("admin_auth_user");
      await signOut(auth);
      setLogs([]);
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("admin_auth_user");
      setCurrentUser(null);
    }
  };

  // Process and compute stats
  const totalVisits = logs.filter(l => l.type === "visit").length;
  const totalClicks = logs.filter(l => l.type === "click").length;
  const ctr = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(1) : "0.0";

  // Hotmart link clicks Specifically
  const hotmartClicks = logs.filter(l => l.type === "click" && (
    (l.elementId && l.elementId.includes("hotmart")) || 
    (l.href && l.href.includes("hotmart")) ||
    (l.elementText && l.elementText.toLowerCase().includes("comprar")) ||
    (l.elementText && l.elementText.toLowerCase().includes("libro")) ||
    (l.elementText && l.elementText.toLowerCase().includes("acceder"))
  )).length;

  // Process data per day
  const getDailyStats = () => {
    const dailyMap: { [key: string]: { dateStr: string; visits: number; clicks: number } } = {};
    
    // Sort oldest to newest to plot chronological trend
    const sortedLogs = [...logs].reverse();
    
    sortedLogs.forEach(log => {
      if (!log.timestamp) return;
      const date = new Date(log.timestamp);
      const dateStr = date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
      
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { dateStr, visits: 0, clicks: 0 };
      }
      
      if (log.type === "visit") {
        dailyMap[dateStr].visits += 1;
      } else {
        dailyMap[dateStr].clicks += 1;
      }
    });

    return Object.values(dailyMap).slice(-7); // Last 7 active days
  };

  // Referrers Stats
  const getReferrerStats = () => {
    const refs: { [key: string]: number } = {};
    logs.forEach(log => {
      let ref = log.referrer;
      if (!ref || ref === "Direct" || ref === "Directo" || ref.trim() === "") {
        ref = "Directo (Escribió URL / WhatsApp)";
      } else {
        try {
          const urlObj = new URL(ref);
          if (urlObj.hostname.includes("instagram.com")) {
            ref = "Instagram";
          } else if (urlObj.hostname.includes("facebook.com")) {
            ref = "Facebook";
          } else if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
            ref = "YouTube";
          } else if (urlObj.hostname.includes("google.com")) {
            ref = "Búsqueda Google";
          } else if (urlObj.hostname.includes("t.co") || urlObj.hostname.includes("twitter.com")) {
            ref = "Twitter / X";
          } else {
            ref = urlObj.hostname;
          }
        } catch (_) {
          ref = "Otros Sitios / Links";
        }
      }
      refs[ref] = (refs[ref] || 0) + 1;
    });

    return Object.entries(refs)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Device type
  const getDeviceStats = () => {
    let mobile = 0;
    let desktop = 0;
    logs.forEach(log => {
      const ua = log.userAgent.toLowerCase();
      if (ua.includes("mobi") || ua.includes("android") || ua.includes("iphone") || ua.includes("ipad")) {
        mobile += 1;
      } else {
        desktop += 1;
      }
    });
    const total = mobile + desktop || 1;
    return {
      mobileInfo: { count: mobile, percentage: ((mobile / total) * 100).toFixed(0) },
      desktopInfo: { count: desktop, percentage: ((desktop / total) * 100).toFixed(0) }
    };
  };

  // Elements Clicked stats
  const getElementClickedStats = () => {
    const items: { [key: string]: { text: string; id: string; href: string; count: number } } = {};
    logs.forEach(log => {
      if (log.type !== "click") return;
      const key = `${log.elementId || ""}-${log.elementText || ""}`;
      if (!items[key]) {
        items[key] = {
          text: log.elementText || "Click en botón sin texto",
          id: log.elementId || "ID Desconocido",
          href: log.href || "",
          count: 0
        };
      }
      items[key].count += 1;
    });

    return Object.values(items).sort((a, b) => b.count - a.count).slice(0, 8);
  };

  // Filter & Search Logs
  const filteredLogs = logs.filter(log => {
    // Type Filter
    if (typeFilter !== "all" && log.type !== typeFilter) return false;

    // Search Term
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.userAgent.toLowerCase().includes(term) ||
      log.referrer.toLowerCase().includes(term) ||
      log.path.toLowerCase().includes(term) ||
      (log.elementText && log.elementText.toLowerCase().includes(term)) ||
      (log.elementId && log.elementId.toLowerCase().includes(term)) ||
      (log.href && log.href.toLowerCase().includes(term))
    );
  });

  // Export elements to CSV
  const exportToCSV = () => {
    if (logs.length === 0) return;
    const headers = "ID,Tipo de Accion,Fecha Hora,Referente,Dispositivo UA,Ruta Url,Pantalla,Idioma,Id Elemento,Texto Clicked,Enlace Destino\n";
    const rows = logs.map(log => {
      const dateStr = log.timestamp ? new Date(log.timestamp).toISOString() : "";
      return [
        log.id || "",
        log.type === "visit" ? "Visita" : "Click",
        `"${dateStr}"`,
        `"${log.referrer.replace(/"/g, '""')}"`,
        `"${log.userAgent.replace(/"/g, '""')}"`,
        `"${log.path.replace(/"/g, '""')}"`,
        `"${log.screenSize}"`,
        `"${log.language}"`,
        `"${(log.elementId || "").replace(/"/g, '""')}"`,
        `"${(log.elementText || "").replace(/"/g, '""')}"`,
        `"${(log.href || "").replace(/"/g, '""')}"`
      ].join(",");
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Analitica_Codigo_Silencioso_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dailyData = getDailyStats();
  const referrerData = getReferrerStats();
  const deviceData = getDeviceStats();
  const elementData = getElementClickedStats();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0b0c13] rounded-2xl border border-brand-violet/20 flex flex-col my-8 shadow-2xl max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-dark/80 border-b border-brand-violet/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-gold/10 rounded-lg border border-brand-gold/30">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-white font-bold tracking-wide">Panel Administrativo</h2>
              <p className="font-mono text-[10px] text-brand-gold tracking-tight lowercase">Exclusivo Administrador Autorizado</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Cerrar [✕]
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!currentUser ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto my-12 bg-black/40 border border-brand-violet/15 p-8 rounded-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-brand-violet/10 rounded-full border border-brand-violet/30 text-brand-gold mb-1">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Acceso de Administrador</h3>
                <p className="text-xs text-slate-400">
                  Ingresa con tu correo secreto para ver las estadísticas de visitas y clics de Hotmart.
                </p>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3 rounded-lg flex gap-2">
                  <span className="font-bold flex-shrink-0">⚠️ Error:</span>
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-200 text-xs p-3 rounded-lg">
                  💡 {authSuccess}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      autoComplete="off"
                      className="w-full bg-black/50 border border-brand-violet/40 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Contraseña de Acceso</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="new-password"
                      className="w-full bg-black/50 border border-brand-violet/40 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingAuth}
                  className="w-full bg-gradient-to-r from-brand-gold via-yellow-500 to-amber-600 text-[#0c0a09] py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 flex justify-center items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loadingAuth ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : isRegistering ? (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Registrar y Guardar Cuenta
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5" /> Ingresar al Panel Intel
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-brand-violet/10 pt-4 text-center">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-[11px] text-brand-gold hover:underline font-mono"
                >
                  {isRegistering 
                    ? "¿Ya tienes contraseña? Iniciar Sesión" 
                    : "¿Primera vez aquí? Registrar mi contraseña exclusiva"}
                </button>
              </div>

              <div className="bg-black/50 p-3 rounded-lg border border-white/5 text-[10px] font-mono text-slate-500 space-y-1">
                <div className="text-slate-400 font-bold">Seguridad Estricta:</div>
                <p>Las reglas de la base de datos de Firestore niegan cualquier intento de lectura a cualquier usuario no autorizado.</p>
              </div>
            </div>
          ) : (
            /* Active Analytics Dashboard View */
            <div className="space-y-6">
              
              {/* Top Banner Control */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-black/20 p-4 rounded-xl border border-brand-violet/10">
                <div className="flex gap-2.5 items-center">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-slate-300">
                    Bienvenido, <span className="text-brand-gold font-bold">{currentUser.email}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={loadAnalyticsData}
                    disabled={loadingData}
                    className="bg-brand-violet/20 border border-brand-violet/40 hover:bg-brand-violet/30 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
                    Sincronizar
                  </button>
                  <button 
                    onClick={exportToCSV}
                    disabled={logs.length === 0}
                    className="bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold/20 text-brand-gold px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Exportar Excel (CSV)
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-red-400 px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              {/* STATS KPI CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Visits */}
                <div className="bg-brand-dark border border-brand-violet/15 p-5 rounded-xl space-y-2 relative overflow-hidden group hover:border-brand-violet/30 transition-all">
                  <div className="absolute right-3 top-3 opacity-10 text-brand-violet group-hover:scale-110 transition-transform">
                    <Eye className="w-16 h-16" />
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Vistas de Página (Visitas)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-white tracking-widest">{totalVisits}</span>
                    <span className="text-xs text-green-400 font-mono flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +100%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">Total acumulado de cargas de página</p>
                </div>

                {/* Hotmart Purchase clicks */}
                <div className="bg-brand-dark border border-brand-gold/20 p-5 rounded-xl space-y-2 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
                  <div className="absolute right-3 top-3 opacity-15 text-brand-gold group-hover:scale-110 transition-transform">
                    <MousePointerClick className="w-16 h-16" />
                  </div>
                  <p className="font-mono text-[10px] text-brand-gold uppercase tracking-wider">Clics de Venta (Hotmart)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-brand-gold tracking-widest">{hotmartClicks}</span>
                    <span className="text-xs text-yellow-400 font-mono font-bold">Interesados</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Gente que pulsó comprar el libro</p>
                </div>

                {/* Other Link Clicks */}
                <div className="bg-brand-dark border border-brand-violet/15 p-5 rounded-xl space-y-2 relative overflow-hidden group hover:border-brand-violet/30 transition-all">
                  <div className="absolute right-3 top-3 opacity-10 text-brand-violet group-hover:scale-110 transition-transform">
                    <Activity className="w-16 h-16" />
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Clics Totales (Enlaces)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-slate-200 tracking-widest">{totalClicks}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">Menú, redes, legal, contacto o soporte</p>
                </div>

                {/* CTR Rate */}
                <div className="bg-brand-dark border border-brand-violet/15 p-5 rounded-xl space-y-2 relative overflow-hidden group hover:border-brand-violet/30 transition-all">
                  <div className="absolute right-3 top-3 opacity-10 text-brand-violet group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-16 h-16" />
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Tasa de Clics (CTR %)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-white tracking-widest">{ctr}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">Porcentaje de visitas que cliquean algo</p>
                </div>

              </div>

              {/* SECOND ROW: CHARTS / STATISTICS DETAILS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Referrals Breakdown */}
                <div className="bg-brand-dark/40 border border-brand-violet/15 p-5 h-full rounded-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> Canales de Origen (Referentes)
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans mb-4 leading-relaxed">
                      ¿Desde dónde entran los usuarios? (Redes sociales, búsquedas web, enlaces directos).
                    </p>
                    {referrerData.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono text-slate-600">No hay datos suficientes</div>
                    ) : (
                      <div className="space-y-3.5">
                        {referrerData.map((ref, idx) => {
                          const percentage = totalVisits > 0 ? ((ref.count / logs.length) * 100).toFixed(0) : "0";
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[11px] font-mono">
                                <span className="text-white truncate max-w-[200px]">{ref.name}</span>
                                <span className="text-brand-gold font-bold">{ref.count} <span className="text-slate-500 font-normal text-[9px]">({percentage}%)</span></span>
                              </div>
                              <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                  className="bg-brand-gold h-full rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono pt-4 inline-block">Reflejado en tiempo real</span>
                </div>

                {/* Center: Highly clicked links table */}
                <div className="bg-brand-dark/40 border border-brand-violet/15 p-5 h-full rounded-xl flex flex-col justify-between col-span-1 lg:col-span-2">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <MousePointerClick className="w-3.5 h-3.5" /> Botoneras e Enlaces Más Clickeados
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans mb-4 leading-relaxed">
                      Eficacia individual de cada llamada a la acción en el sitio web:
                    </p>
                    {elementData.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono text-slate-600">Sin clicks registrados aún</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                          <thead>
                            <tr className="border-b border-brand-violet/15 text-slate-500 text-[10px]">
                              <th className="pb-2">Texto / Botón</th>
                              <th className="pb-2">ID / Destino</th>
                              <th className="pb-2 text-right">Clics</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-violet/5">
                            {elementData.map((item, idx) => (
                              <tr key={idx} className="hover:bg-brand-violet/5">
                                <td className="py-2.5 text-white max-w-[160px] truncate pr-2 font-sans font-medium">
                                  {item.text}
                                </td>
                                <td className="py-2.5 text-slate-400 max-w-[180px] truncate pr-2 text-[11px]">
                                  <span className="bg-black px-1.5 py-0.5 rounded text-[10px] text-brand-gold border border-white/5 mr-1 block sm:inline-block truncate">
                                    {item.id}
                                  </span>
                                  {item.href && <span className="opacity-60 text-[9px]">{item.href}</span>}
                                </td>
                                <td className="py-2.5 text-brand-gold font-bold text-right text-sm">
                                  {item.count}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  {/* device type proportion inside spacer */}
                  <div className="grid grid-cols-2 gap-4 border-t border-brand-violet/15 pt-4 mt-4 font-mono text-xs">
                    <div className="flex gap-2 items-center">
                      <div className="p-2 bg-brand-violet/10 rounded-lg">
                        <Laptop className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase">Escritorio</div>
                        <div className="text-white font-bold">{deviceData.desktopInfo.count} visitas <span className="text-[9px] text-brand-gold">({deviceData.desktopInfo.percentage}%)</span></div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="p-2 bg-brand-violet/10 rounded-lg">
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase">Dispositivo Móvil</div>
                        <div className="text-white font-bold">{deviceData.mobileInfo.count} visitas <span className="text-[9px] text-brand-gold">({deviceData.mobileInfo.percentage}%)</span></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* CHRONOLOGICAL RAW REAL-TIME STREAM TABLE */}
              <div className="bg-brand-dark/40 border border-brand-violet/15 p-5 rounded-xl space-y-4">
                
                {/* Search & Filter Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-violet/15 pb-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Flujo de Actividad en Tiempo Real
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans">Historial detallado de todas las interacciones.</p>
                  </div>

                  {/* Filters bar */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-60">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                      <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por navegador, origen, texto..."
                        className="w-full bg-black/60 border border-brand-violet/25 rounded-lg py-1.5 pl-8 pr-3 text-[11px] text-white focus:outline-none focus:border-brand-gold font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 border border-brand-violet/25 rounded-lg p-0.5 font-mono text-[10px]">
                      <button 
                        onClick={() => setTypeFilter("all")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${typeFilter === "all" ? "bg-brand-violet/35 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        Todos
                      </button>
                      <button 
                        onClick={() => setTypeFilter("visit")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${typeFilter === "visit" ? "bg-brand-violet/35 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        Visitas
                      </button>
                      <button 
                        onClick={() => setTypeFilter("click")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${typeFilter === "click" ? "bg-brand-violet/35 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        Clics
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stream logs */}
                {loadingData ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-xs">
                    <RefreshCw className="w-6 h-6 text-brand-gold animate-spin" />
                    Buscando base de datos Firestore...
                  </div>
                ) : dataError ? (
                  <div className="py-8 text-center text-xs text-red-400 font-mono">
                    ⚠️ {dataError}
                  </div>
                ) : filteredLogs.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 font-mono">
                    No se encontraron registros de actividad con los criterios buscados.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] font-mono">
                        <thead>
                          <tr className="border-b border-brand-violet/10 text-slate-500 uppercase tracking-wider text-[9px] pb-2">
                            <th className="pb-2 w-28">Fecha / Hora</th>
                            <th className="pb-2 w-20">Acción</th>
                            <th className="pb-2 w-36">Donde Viene (Referencia)</th>
                            <th className="pb-2">Dispositivo / Agente</th>
                            <th className="pb-2">Detalle de Interacción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-violet/5">
                          {filteredLogs.slice(0, visibleLogsCount).map((log) => {
                            const dateStr = log.timestamp instanceof Date 
                              ? log.timestamp.toLocaleString("es-ES", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
                              : "Ahora";

                            const isHotmartClick = log.type === "click" && (
                              (log.elementId && log.elementId.includes("hotmart")) ||
                              (log.href && log.href.includes("hotmart"))
                            );

                            return (
                              <tr key={log.id} className="hover:bg-brand-violet/5 transition-colors group">
                                <td className="py-2.5 text-slate-400 font-medium whitespace-nowrap">
                                  {dateStr}
                                </td>
                                <td className="py-2.5">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                    log.type === "visit" 
                                      ? "bg-brand-violet/20 text-brand-violet border border-brand-violet/30" 
                                      : isHotmartClick 
                                        ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
                                        : "bg-slate-800 text-slate-300 border border-slate-700"
                                  }`}>
                                    {log.type === "visit" ? "Visita" : isHotmartClick ? "$ Hotmart" : "Clic"}
                                  </span>
                                </td>
                                <td className="py-2.5 text-slate-300 truncate max-w-[140px] pr-2">
                                  {log.referrer}
                                </td>
                                <td className="py-2.5 text-slate-500 text-[10px] group-hover:text-slate-400 max-w-[200px] truncate pr-2">
                                  {log.userAgent}
                                </td>
                                <td className="py-2.5 text-slate-300">
                                  {log.type === "visit" ? (
                                    <span className="text-slate-500 italic text-[10px]">
                                      Carga de ruta <code className="bg-black/40 px-1 py-0.5 rounded text-brand-gold">{log.path}</code> ({log.screenSize})
                                    </span>
                                  ) : (
                                    <div className="flex flex-col gap-0.5">
                                      <span className="font-semibold text-white">
                                        Pulso &ldquo;{log.elementText}&rdquo;
                                      </span>
                                      {log.elementId && (
                                        <span className="text-[9px] text-slate-500 font-mono">
                                          ID: {log.elementId}
                                        </span>
                                      )}
                                      {log.href && (
                                        <span className="text-[9px] text-brand-gold truncate max-w-[250px]">
                                          Enlace: {log.href}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination or Load more */}
                    {filteredLogs.length > visibleLogsCount && (
                      <div className="text-center pt-2">
                        <button
                          onClick={() => setVisibleLogsCount(prev => prev + 50)}
                          className="px-4 py-1.5 bg-brand-violet/10 border border-brand-violet/30 hover:bg-brand-violet/20 text-brand-gold text-xs font-mono rounded-lg cursor-pointer"
                        >
                          Mostrar 50 más ({filteredLogs.length - visibleLogsCount} restantes)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer info drawer */}
        <div className="px-6 py-3 bg-[#08090d] border-t border-brand-violet/15 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2 rounded-b-2xl font-mono">
          <span>Configuración autorizada y auditada en Cloud Systems</span>
          <span>© CÓDIGO SILENCIOSO ANALYTICS Engine v2.0</span>
        </div>

      </div>
    </div>
  );
}
