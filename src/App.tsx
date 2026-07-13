import React, { useState, useEffect } from 'react';
import { FAQS, COURSES } from './data';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Smartphone,
  FileText,
  HelpCircle,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  Lock,
  ChevronDown,
  Instagram,
  Rss,
  Mail,
  Play,
  Sun,
  Moon,
  Compass,
  Hammer,
  Cpu,
  Shield,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import Cursos from './components/Cursos';
import Empleo from './components/Empleo';
import AppDemo from './components/AppDemo';
import AuditoriaCV from './components/AuditoriaCV';
import SuscripcionModal from './components/SuscripcionModal';
import Logo from './components/Logo';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Inicio' | 'Diplomados' | 'Bolsa de Empleo' | 'Acceso Miembros' | 'Auditoría CV'>('Inicio');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  const [shuffledCourses, setShuffledCourses] = useState<typeof COURSES>([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [selectedDiplomadoForInfo, setSelectedDiplomadoForInfo] = useState('');

  useEffect(() => {
    const shuffled = [...COURSES].sort(() => Math.random() - 0.5);
    setShuffledCourses(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledCourses.length === 0) return;
    const timer = setInterval(() => {
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % shuffledCourses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [shuffledCourses]);

  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<'completo' | 'full' | 'ilimitado'>('full');
  const [pricingRegion, setPricingRegion] = useState<'PE' | 'LA'>('PE');

  const openSubscribe = (plan: 'completo' | 'full' | 'ilimitado') => {
    setSelectedPlanForModal(plan);
    setIsSubscribeOpen(true);
  };

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Floating notifications or interactive counts
  const [showNotification, setShowNotification] = useState(true);

  // Workshop registration contact form states
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [workshopName, setWorkshopName] = useState('');
  const [workshopEmail, setWorkshopEmail] = useState('');
  const [workshopPhone, setWorkshopPhone] = useState('');
  const [workshopCompany, setWorkshopCompany] = useState('');
  const [isWorkshopSubmitting, setIsWorkshopSubmitting] = useState(false);
  const [isWorkshopSubmitted, setIsWorkshopSubmitted] = useState(false);

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWorkshopSubmitting(true);
    setTimeout(() => {
      setIsWorkshopSubmitting(false);
      setIsWorkshopSubmitted(true);
    }, 1000);
  };

  const closeWorkshopModal = () => {
    setIsWorkshopOpen(false);
    setTimeout(() => {
      setWorkshopName('');
      setWorkshopEmail('');
      setWorkshopPhone('');
      setWorkshopCompany('');
      setSelectedDiplomadoForInfo('');
      setIsWorkshopSubmitted(false);
    }, 300);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleAuditoriaNav = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('Auditoría CV');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCourseForCarousel = shuffledCourses[currentCourseIndex] || COURSES[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-dark text-brand-text font-sans selection:bg-brand-gold/30 selection:text-white transition-colors duration-300">
      
      {/* Upper informational announcement bar */}
      {showNotification && (
        <div className="bg-amber-950/40 border-b border-brand-border text-center py-2 px-4 flex items-center justify-between text-xs font-mono relative z-50">
          <span className="flex items-center gap-2 mx-auto text-brand-gold">
            <Sparkles size={14} className="animate-spin" />
            <span>¡EDUMIN ahora con BCP! Accede a tu especialización con 12 cuotas sin intereses.</span>
          </span>
          <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-white absolute right-4">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header Sticky Glass Navigation */}
      <header className="sticky top-0 w-full bg-brand-card/90 backdrop-blur-md z-40 border-b border-brand-border/60 transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo with clean engineering theme */}
          <div
            onClick={() => setActiveTab('Inicio')}
            className="text-xl sm:text-2xl font-black text-brand-gold tracking-tighter uppercase cursor-pointer flex items-center gap-3 group transition-theme"
          >
            <div className="bg-white p-1.5 rounded-lg flex items-center justify-center shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Logo className="w-7 h-7" />
            </div>
            <span className="text-brand-heading transition-colors">EDUMIN</span>
          </div>

          {/* Desktop Navigation Link items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('Inicio')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded ${
                activeTab === 'Inicio' ? 'text-brand-gold bg-brand-border/30 font-black' : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/25'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('Diplomados')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded ${
                activeTab === 'Diplomados' ? 'text-brand-gold bg-brand-border/30 font-black' : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/25'
              }`}
            >
              Diplomados
            </button>
            <button
              onClick={() => setActiveTab('Bolsa de Empleo')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded ${
                activeTab === 'Bolsa de Empleo' ? 'text-brand-gold bg-brand-border/30 font-black' : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/25'
              }`}
            >
              Bolsa de Empleo
            </button>
            <button
              onClick={() => setActiveTab('Acceso Miembros')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded ${
                activeTab === 'Acceso Miembros' ? 'text-brand-gold bg-brand-border/30 font-black' : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/25'
              }`}
            >
              Acceso Miembros
            </button>
          </nav>

          {/* Header Actions Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded border border-brand-border text-brand-subtext hover:text-brand-heading hover:bg-brand-card transition-theme cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setActiveTab('Auditoría CV')}
              className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 transition-all rounded border ${
                activeTab === 'Auditoría CV' 
                  ? 'border-brand-gold text-brand-gold bg-brand-gold/5 font-black'
                  : 'border-brand-border text-brand-subtext hover:text-brand-heading hover:bg-brand-card'
              }`}
            >
              Auditoría CV
            </button>
            <button
              onClick={() => openSubscribe('full')}
              className="bg-brand-copper hover:bg-amber-600 text-white font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 rounded transition-all shadow-md active:scale-95 border border-brand-gold/10 hover:shadow-brand-copper/20"
            >
              Iniciar Suscripción
            </button>
          </div>

          {/* Mobile actions & hamburger menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded border border-brand-border text-brand-subtext hover:text-brand-heading hover:bg-brand-card transition-theme cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Tema Claro' : 'Tema Oscuro'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-subtext hover:text-brand-heading hover:bg-brand-border/20 rounded transition-theme"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-brand-card border-b border-brand-border px-4 py-6 space-y-3 z-45 fixed top-20 inset-x-0 transition-theme"
          >
            <button
              onClick={() => { setActiveTab('Inicio'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wide ${activeTab === 'Inicio' ? 'text-brand-gold bg-brand-border/20' : 'text-brand-subtext'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => { setActiveTab('Diplomados'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wide ${activeTab === 'Diplomados' ? 'text-brand-gold bg-brand-border/20' : 'text-brand-subtext'}`}
            >
              Diplomados
            </button>
            <button
              onClick={() => { setActiveTab('Bolsa de Empleo'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wide ${activeTab === 'Bolsa de Empleo' ? 'text-brand-gold bg-brand-border/20' : 'text-brand-subtext'}`}
            >
              Bolsa de Empleo (Trabajo)
            </button>
            <button
              onClick={() => { setActiveTab('Acceso Miembros'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wide ${activeTab === 'Acceso Miembros' ? 'text-brand-gold bg-brand-border/20' : 'text-brand-subtext'}`}
            >
              Acceso Miembros (App)
            </button>
            <button
              onClick={() => { setActiveTab('Auditoría CV'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wide ${activeTab === 'Auditoría CV' ? 'text-brand-gold bg-brand-border/20' : 'text-brand-subtext'}`}
            >
              Auditoría CV
            </button>
            
            <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
              <button
                onClick={() => { openSubscribe('full'); setIsMobileMenuOpen(false); }}
                className="w-full text-center py-3 bg-brand-copper hover:bg-amber-600 text-white font-mono text-xs uppercase tracking-widest font-bold rounded transition-colors"
              >
                Iniciar Suscripción
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content routing */}
      <main className="flex-grow">
        {activeTab === 'Inicio' && (
          <div>
            {/* Hero Banner Section */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-7xl mx-auto border-b border-brand-border/40">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left pitch text */}
                <div className="z-10 space-y-6">
                  <span className="font-mono text-xs text-brand-gold bg-brand-gold/10 px-3 py-1.5 border border-brand-gold/20 rounded inline-block tracking-[0.2em] font-bold">
                    EL CÍRCULO EXCLUSIVO DE LA MINERÍA HISPANA
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl font-black text-brand-heading leading-[1.1] tracking-tight transition-colors">
                    Domina la Industria Minera. Accede a Vacantes Privadas y Capacitación Técnica de Élite.
                  </h1>
                  
                  <p className="text-brand-subtext text-sm sm:text-base leading-relaxed max-w-xl transition-colors">
                    Acelera tu carrera con certificaciones validadas por la industria y conecta directamente con tomadores de decisiones en las operaciones más grandes de Latinoamérica.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => openSubscribe('full')}
                      className="bg-brand-copper hover:bg-amber-600 text-white font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 group hover:brightness-110 transition-all shadow-xl hover:scale-[1.01]"
                    >
                      Acelerar Mi Carrera Ahora — Acceso Inmediato
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Profile badges & social metrics */}
                  <div className="flex items-center gap-4 pt-6 border-t border-brand-border/40">
                    <div className="flex -space-x-2">
                      <img
                        className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover"
                        referrerPolicy="no-referrer"
                        alt="Ingeniero Geólogo"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI999SROB-pJaCEBS5rfB9G89GVVZkntnsXDquAuKU1ytEVA2Fxtr3Hx66iphN7X1r6okMNFBiaJ8E2tRNitHNFHlTLqaaRpsDPJDYUJmuQnf6DbWfBMzMAgoOjz2ntwdP4A1xJba63-FxH-V_crT0bPRz89ogw8xroBT3P5NEOs8yhKbKyPTGHYiBQvdczKS7JihS7q6kUXymEwoArmSYg0TAwEs8zS6GyfcSaPvkejjju8X_HCfjppBY94bAPkG-AMCArXnKOas"
                      />
                      <img
                        className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover"
                        referrerPolicy="no-referrer"
                        alt="Metalurgista Spt."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMFQXEEr7xxGZ83SCRNPwgfHSzapzEZLR5edAGYtLKJiAtKePTYQJSJXlQLgMHZxxDjPRyIoCKXSQvF8778Huladx9WTAuNyDxkdNglU2vsJfH35WeIeNrkNWTjIisgKaG6rHdB36bkm_Q04utujnM3DyNqc24JzQ5eWMysqC6weN8zADlWr3WuL2yRumk56V7FwRhrCXAMQsLOO2CtkCK6MRKo8Tj1xbsLAaf0fK7vzOEiM5scwJSB5mJUqMgkbM1HrUOhzayqrU"
                      />
                      <img
                        className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover"
                        referrerPolicy="no-referrer"
                        alt="Gerente Mina"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSMrFe2rvMz6EXEq2vYH4rss5iQKAxTeL7E1JL3HWw5ZqY4IN-kf2dn3Zs96gpAvUVtAeZ-0Hm2TKNusMb5-M_OkbkCKVWYKS2uJlP_iNLOTJp6j4gP-_T13YxmfGrW3zQdGAIL3MPKxMfKZppNo95CLTcValZ6Q6Rh7xljhxM0864Q8cTKcl8Kr7W9DCJWpeXWk9eWwQUlvNxj1vnhQGSkTWsEBOlVKECjAOXbtrxFthCth0-DYFno6a6_DYwTQnavB84TUnTI7o"
                      />
                    </div>
                    <p className="font-mono text-xs text-brand-subtext">
                      <span className="text-brand-gold font-black">3,400+ MIEMBROS</span> ACTIVOS EN TODA LATAM
                    </p>
                  </div>
                </div>

                {/* Right Interactive Card Preview */}
                <div className="relative">
                  {/* Neon orange background glow behind frame */}
                  <div className="absolute inset-0 bg-brand-gold/10 blur-[130px] rounded-full" />
                  
                  <div className="bg-brand-surface border border-brand-border rounded-xl p-4 relative overflow-hidden group shadow-2xl aspect-[4/3]">
                    {/* Sliding Slide (Image + Integrated Info Card) */}
                    <AnimatePresence mode="wait">
                      {currentCourseForCarousel && (
                        <motion.div
                          key={currentCourseForCarousel.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-4 rounded-lg overflow-hidden"
                        >
                          {/* Image */}
                          <img
                            src={currentCourseForCarousel.image}
                            alt={currentCourseForCarousel.title}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Box 1: Integrated Info Card (Compact) */}
                          <div className="absolute bottom-[72px] left-4 right-4 bg-brand-dark/95 backdrop-blur-md p-3.5 border border-brand-border rounded shadow-lg text-left">
                            <span className="text-[9px] font-mono text-brand-gold tracking-widest font-black uppercase flex items-center gap-1">
                              <Sparkles size={10} className="animate-pulse" /> DIPLOMADO DE ALTA ESPECIALIZACIÓN EN:
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-brand-heading mt-1 leading-snug line-clamp-2 min-h-[2.5rem] flex items-center">
                              {currentCourseForCarousel.title}
                            </h3>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Box 2: Static Fixed Button Card */}
                    <div className="absolute bottom-8 left-8 right-8 bg-brand-dark/95 backdrop-blur-md p-3.5 border border-brand-border rounded shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left z-10">
                      <span className="text-[10px] font-mono text-brand-subtext uppercase tracking-wider">
                        Información académica completa
                      </span>
                      <button 
                        onClick={() => {
                          if (currentCourseForCarousel) {
                            setSelectedDiplomadoForInfo(currentCourseForCarousel.title);
                          }
                          setIsWorkshopOpen(true);
                        }}
                        className="text-xs font-mono text-brand-gold hover:underline uppercase tracking-wide flex items-center gap-1 cursor-pointer font-bold shrink-0 self-start sm:self-auto"
                      >
                        <Play size={10} className="fill-brand-gold" /> Pedir más información
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Industrial Brands section */}
            <section className="bg-brand-card/30 border-b border-brand-border/40 py-12 transition-theme">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-[10px] font-mono uppercase tracking-widest text-brand-subtext mb-6 font-bold transition-colors">
                  CONEXIONES Y EGRESADOS EN LAS CONTRATISTAS Y OPERACIONES MÁS GRANDES
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-35 grayscale contrast-125">
                  <span className="font-sans font-black text-lg tracking-widest text-brand-text">BHP</span>
                  <span className="font-sans font-black text-lg tracking-wider text-brand-text">ANTAMINA</span>
                  <span className="font-sans font-black text-lg tracking-widest text-brand-text">CODELCO</span>
                  <span className="font-sans font-black text-lg tracking-wide text-brand-text">ANGLO AMERICAN</span>
                  <span className="font-sans font-black text-lg tracking-wider text-brand-text">BARRICK GOLD</span>
                  <span className="font-sans font-black text-lg tracking-widest text-brand-text">GLENCORE</span>
                </div>
              </div>
            </section>

            {/* Specialties Matrix */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="font-mono text-xs text-brand-gold uppercase tracking-wider">MAPA DE ESPECIALIDADES</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-3 tracking-tight transition-colors">Especialización Técnica de Extremo a Extremo</h2>
                <div className="w-24 h-1 bg-brand-copper mx-auto mt-4" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Geologia */}
                <div
                  onClick={() => { setActiveTab('Diplomados'); }}
                  className="bg-brand-surface border border-brand-border p-6 rounded-lg group hover:border-brand-gold/60 cursor-pointer transition-theme flex flex-col justify-between hover:shadow-lg"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                      <Compass size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-brand-heading mb-2 font-sans transition-colors">Geología</h3>
                    <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed transition-colors">Modelamiento de bloques, geoestadística y exploración avanzada.</p>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mt-6 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explorar Ruta <ArrowRight size={12} />
                  </span>
                </div>

                {/* Minas */}
                <div
                  onClick={() => { setActiveTab('Diplomados'); }}
                  className="bg-brand-surface border border-brand-border p-6 rounded-lg group hover:border-brand-gold/60 cursor-pointer transition-theme flex flex-col justify-between hover:shadow-lg"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                      <Hammer size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-brand-heading mb-2 font-sans transition-colors">Minas</h3>
                    <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed transition-colors">Planeamiento short-range, perforación y tronadura táctica.</p>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mt-6 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explorar Ruta <ArrowRight size={12} />
                  </span>
                </div>

                {/* Procesamiento */}
                <div
                  onClick={() => { setActiveTab('Diplomados'); }}
                  className="bg-brand-surface border border-brand-border p-6 rounded-lg group hover:border-brand-gold/60 cursor-pointer transition-theme flex flex-col justify-between hover:shadow-lg"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                      <Cpu size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-brand-heading mb-2 font-sans transition-colors">Procesos</h3>
                    <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed transition-colors">Metalurgia extractiva, molienda SAG y flotación selectiva complejos.</p>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mt-6 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explorar Ruta <ArrowRight size={12} />
                  </span>
                </div>

                {/* Seguridad */}
                <div
                  onClick={() => { setActiveTab('Diplomados'); }}
                  className="bg-brand-surface border border-brand-border p-6 rounded-lg group hover:border-brand-gold/60 cursor-pointer transition-theme flex flex-col justify-between hover:shadow-lg"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                      <Shield size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-brand-heading mb-2 font-sans transition-colors">Seguridad</h3>
                    <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed transition-colors">Gestión crítica de riesgos (GICA) y normativas HSEC de campo.</p>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mt-6 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explorar Ruta <ArrowRight size={12} />
                  </span>
                </div>

                {/* Gestión */}
                <div
                  onClick={() => { setActiveTab('Diplomados'); }}
                  className="bg-brand-surface border border-brand-border p-6 rounded-lg group hover:border-brand-gold/60 cursor-pointer transition-theme flex flex-col justify-between hover:shadow-lg"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6">
                      <TrendingUp size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-brand-heading mb-2 font-sans transition-colors">Gestión</h3>
                    <p className="text-brand-subtext text-xs sm:text-sm leading-relaxed transition-colors">Liderazgo operativo en alta montaña y gestión confiabilidad RCM.</p>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mt-6 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explorar Ruta <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </section>

            {/* Split Screen Offline Mode Mockup Pitch */}
            <section className="bg-brand-card py-20 overflow-hidden border-y border-brand-border/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Smartphone Visual representation */}
                <div className="relative flex justify-center">
                  <div className="w-[280px] h-[540px] bg-black border-4 border-brand-border rounded-[36px] overflow-hidden shadow-2xl relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJrQQ_sTzhy6J582o9s4TrbafgCql52WurCadNxqDBAJrMNwY_5h_zMVQgDSOHAZNyTp544xSBLz65GepZ8U_I1aUli0edi9GDQfNu6sc5WP9ntmO3p44MMgZKvz0j3OeklPiMwFH1gPrWE8_51N0xuL74un05uFaTp3r6--U5Z6xxMICOuQpDA6IHmH-Sjj5EZG_DJPouskO_4YCSsVgCzfTKA-lBnZlPC2M6aWApJ_IUQ39OLMPudBoQOQnLn6p2rioM_RBs4h4"
                      alt="Teléfono"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute bottom-6 left-4 right-4 bg-brand-gold p-3 rounded-lg text-brand-dark flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono font-bold block opacity-70">CLASE DESCARGADA</span>
                        <h4 className="text-xs font-black font-sans mt-0.5">Molienda SAG - Cap 4</h4>
                      </div>
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                </div>

                {/* Right side Pitch details */}
                <div className="space-y-6">
                   <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading tracking-tight leading-tight transition-colors">Sin Conexión en Alta Montaña</h2>
                  <p className="text-brand-subtext leading-relaxed font-sans text-sm sm:text-base transition-colors">
                    Entendemos la realidad de la operación de campo. Nuestra plataforma tecnológica te permite descargar micro-cápsulas de aprendizaje técnico en tu dispositivo móvil para estudiar de camino a mina o en el campamento, sin depender de redes de satélite.
                  </p>

                  <ul className="space-y-3.5 pt-2">
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-text transition-colors">
                      <CheckCircle2 size={16} className="text-brand-gold" />
                      <span>Sincronización automática de progreso al detectar Wi-Fi.</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-text transition-colors">
                      <CheckCircle2 size={16} className="text-brand-gold" />
                      <span>Contenido de video comprimido optimizado para pantallas en faena.</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-brand-text transition-colors">
                      <CheckCircle2 size={16} className="text-brand-gold" />
                      <span>Descarga directa de documentos técnicos bajo estándares JORC e ISO de campo.</span>
                    </li>
                  </ul>

                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={() => setActiveTab('Acceso Miembros')}
                      className="px-6 py-3.5 bg-brand-surface border border-brand-border hover:bg-brand-border text-brand-heading hover:text-brand-gold rounded font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer active:scale-95"
                    >
                      Ver Video Demostración
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Testimonials Quote Blocks */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-brand-border/40">
              <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 tracking-tight text-brand-heading transition-colors">Voces desde el Frente Operativo</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Mendoza */}
                <div className="bg-brand-surface border border-brand-border p-6 rounded-lg flex flex-col justify-between hover:border-brand-gold/30 transition-theme hover:shadow-lg">
                  <div>
                    <div className="flex gap-0.5 text-brand-gold mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-text text-xs sm:text-sm italic leading-relaxed mb-6 font-sans transition-colors">
                      &quot;La actualización en planeamiento minero me permitió liderar la transición a autonomía en mi unidad departamental.&quot;
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-heading text-xs sm:text-sm transition-colors">Carlos Mendoza</h5>
                    <span className="text-[9px] font-mono text-brand-subtext uppercase block mt-1 tracking-widest transition-colors">Spt. de Planeamiento, Antamina</span>
                  </div>
                </div>

                {/* Elena */}
                <div className="bg-brand-surface border border-brand-border p-6 rounded-lg flex flex-col justify-between hover:border-brand-gold/30 transition-theme hover:shadow-lg">
                  <div>
                    <div className="flex gap-0.5 text-brand-gold mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-text text-xs sm:text-sm italic leading-relaxed mb-6 font-sans transition-colors">
                      &quot;EDUMIN es el filtro que necesitaba. Información pura de ingeniería aplicada de campo sin el ruido de LinkedIn.&quot;
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-heading text-xs sm:text-sm transition-colors">Elena Rostova</h5>
                    <span className="text-[9px] font-mono text-brand-subtext uppercase block mt-1 tracking-widest transition-colors">Consultora de Metalurgia, BHP</span>
                  </div>
                </div>

                {/* Peralta */}
                <div className="bg-brand-surface border border-brand-border p-6 rounded-lg flex flex-col justify-between hover:border-brand-gold/30 transition-theme hover:shadow-lg">
                  <div>
                    <div className="flex gap-0.5 text-brand-gold mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-text text-xs sm:text-sm italic leading-relaxed mb-6 font-sans transition-colors">
                      &quot;Gracias a la Auditoría de CV, mi perfil superó los filtros ATS de Anglo American en menos de 48 horas de campo.&quot;
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-heading text-xs sm:text-sm transition-colors">Mateo Peralta</h5>
                    <span className="text-[9px] font-mono text-brand-subtext uppercase block mt-1 tracking-widest transition-colors">Ing. de Perforación y Tronadura</span>
                  </div>
                </div>

                {/* Silva */}
                <div className="bg-brand-surface border border-brand-border p-6 rounded-lg flex flex-col justify-between hover:border-brand-gold/30 transition-theme hover:shadow-lg">
                  <div>
                    <div className="flex gap-0.5 text-brand-gold mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-text text-xs sm:text-sm italic leading-relaxed mb-6 font-sans transition-colors">
                      &quot;El networking aquí es real. No son &apos;likes&apos; vacíos, son contactos operativos directos en faenas clave de cobre.&quot;
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-heading text-xs sm:text-sm transition-colors">Jorge Silva</h5>
                    <span className="text-[9px] font-mono text-brand-subtext uppercase block mt-1 tracking-widest transition-colors">Jefe de Seguridad, Codelco</span>
                  </div>
                </div>

              </div>
            </section>

            {/* Central Subscription Section with Three Cards */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6">
                <span className="font-mono text-xs text-brand-gold uppercase tracking-wider">PLANES DE ESPECIALIZACIÓN</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-3 tracking-tight transition-colors">Elige el Plan para tu Crecimiento Técnico</h2>
                <div className="w-24 h-1 bg-brand-copper mx-auto mt-4 mb-10" />
              </div>

              {/* Region Selector Bar */}
              <div className="flex justify-center mb-12">
                <div className="bg-brand-surface p-1.5 rounded-lg border border-brand-border flex gap-2 transition-theme relative shadow-md">
                  <button
                    type="button"
                    onClick={() => setPricingRegion('PE')}
                    className={`px-6 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      pricingRegion === 'PE' 
                        ? 'bg-brand-copper text-white shadow-md' 
                        : 'text-brand-subtext hover:text-brand-heading'
                    }`}
                  >
                    🇵🇪 Perú (Soles - S/.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingRegion('LA')}
                    className={`px-6 py-2 text-xs font-mono font-bold uppercase rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      pricingRegion === 'LA' 
                        ? 'bg-brand-copper text-white shadow-md' 
                        : 'text-brand-subtext hover:text-brand-heading'
                    }`}
                  >
                    🌎 Latinoamérica (Dólares - USD)
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                {/* 1. PROGRAMA COMPLETO */}
                <div className="bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-300">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-brand-border text-brand-text">
                      INVERSIÓN ÚNICA
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-heading mt-4 font-sans transition-colors">PROGRAMA COMPLETO</h3>
                    
                    <div className="flex items-center gap-2 mt-4 mb-8">
                      <span className="text-4xl sm:text-5xl font-black text-brand-gold font-mono transition-colors">
                        {pricingRegion === 'PE' ? 'S/ 749' : '$199'}
                      </span>
                      <div className="text-left font-mono">
                        <p className="text-xs text-brand-heading leading-none uppercase font-bold transition-colors">
                          {pricingRegion === 'PE' ? 'PEN' : 'USD'}
                        </p>
                        <p className="text-[10px] text-brand-subtext mt-1 uppercase transition-colors">Pago Único</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-xs sm:text-sm text-brand-text text-left">
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Diplomados:</strong> 1 Diplomado + DIPLOMA</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Certificaciones:</strong> 3 Certificaciones adicionales</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Cursos Asincrónicos:</strong> 3 Cursos a elección</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Aval CIP:</strong> 1 Certificado del Colegio de Ingenieros del Perú</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Bolsa de Trabajo:</strong> Acceso Bolsa Regular</span>
                      </div>
                      <div className="flex gap-2 text-brand-subtext/40 line-through">
                        <XCircle size={16} className="text-brand-subtext/30 shrink-0 mt-0.5" />
                        <span>Bolsa de Trabajo Exclusiva</span>
                      </div>
                      <div className="flex gap-2 text-brand-subtext/40 line-through">
                        <XCircle size={16} className="text-brand-subtext/30 shrink-0 mt-0.5" />
                        <span>Certificación Internacional</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => openSubscribe('completo')}
                      className="w-full py-3 bg-brand-card border border-brand-border hover:bg-brand-border text-brand-heading font-mono text-xs uppercase tracking-widest font-black rounded-lg transition-all shadow-md hover:scale-[1.01] cursor-pointer active:scale-95"
                    >
                      Matricularme Completo
                    </button>
                    <p className="text-center text-[9px] text-brand-subtext font-mono mt-3 uppercase tracking-widest transition-colors">
                      Garantía de satisfacción de 14 días.
                    </p>
                  </div>
                </div>

                {/* 2. PROGRAMA FULL (Recommended) */}
                <div className="bg-brand-surface border-2 border-brand-copper p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col justify-between hover:border-brand-gold/60 transition-all duration-300">
                  <div className="absolute top-0 right-0 bg-brand-copper text-white font-mono text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl">
                    RECOMENDADO
                  </div>

                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-brand-copper/20 text-brand-gold border border-brand-gold/20">
                      DOBLE CERTIFICACIÓN
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-heading mt-4 font-sans transition-colors">PROGRAMA FULL</h3>
                    
                    <div className="flex items-center gap-2 mt-4 mb-8">
                      <span className="text-4xl sm:text-5xl font-black text-brand-gold font-mono">
                        {pricingRegion === 'PE' ? 'S/ 1,099' : '$299'}
                      </span>
                      <div className="text-left font-mono">
                        <p className="text-xs text-brand-heading leading-none uppercase font-bold transition-colors">
                          {pricingRegion === 'PE' ? 'PEN' : 'USD'}
                        </p>
                        <p className="text-[10px] text-brand-subtext mt-1 uppercase transition-colors">Pago Único</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-xs sm:text-sm text-brand-text text-left">
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Diplomados:</strong> 1 Diplomado + DIPLOMA</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Certificaciones:</strong> 3 Certificaciones adicionales</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Cursos Asincrónicos:</strong> 5 Cursos a elección</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Aval CIP:</strong> 1 Certificado del Colegio de Ingenieros del Perú</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Bolsa de Trabajo:</strong> Acceso Bolsa Regular</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Bolsa de Trabajo:</strong> Acceso Bolsa Exclusiva</span>
                      </div>
                      <div className="flex gap-2 text-brand-gold">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Internacional:</strong> Por San Ignacio University of Miami</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => openSubscribe('full')}
                      className="w-full py-3.5 bg-brand-copper hover:bg-amber-600 font-mono text-xs uppercase tracking-widest font-black text-white rounded-lg transition-all shadow-xl hover:scale-[1.01] cursor-pointer active:scale-95 border border-brand-gold/10"
                    >
                      Matricularme Full
                    </button>
                    <p className="text-center text-[9px] text-brand-subtext font-mono mt-3 uppercase tracking-widest transition-colors">
                      Doble certificación oficial incluida.
                    </p>
                  </div>
                </div>

                {/* 3. PROGRAMA ILIMITADO POR 2 AÑOS */}
                <div className="bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-300">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-brand-border text-brand-text">
                      ACCESO TOTAL 2 AÑOS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-heading mt-4 font-sans transition-colors">ILIMITADO (2 AÑOS)</h3>
                    
                    <div className="flex items-center gap-2 mt-4 mb-8">
                      <span className="text-4xl sm:text-5xl font-black text-brand-gold font-mono">
                        {pricingRegion === 'PE' ? 'S/ 1,899' : '$499'}
                      </span>
                      <div className="text-left font-mono">
                        <p className="text-xs text-brand-heading leading-none uppercase font-bold transition-colors">
                          {pricingRegion === 'PE' ? 'PEN' : 'USD'}
                        </p>
                        <p className="text-[10px] text-brand-subtext mt-1 uppercase transition-colors">Pago Único</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-xs sm:text-sm text-brand-text text-left">
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Diplomados:</strong> Asincrónicos ILIMITADOS</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Certificaciones:</strong> Certificados sin límite</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Cursos Asincrónicos:</strong> Acceso ilimitado incluido</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Aval CIP:</strong> Aval del CIP (Válido para 1 Diplomado)</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Bolsa de Trabajo:</strong> Acceso Bolsa Regular</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Bolsa de Trabajo:</strong> Acceso Bolsa Exclusiva</span>
                      </div>
                      <div className="flex gap-2 text-brand-gold">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span><strong>Internacional:</strong> Validez global (Válido para 1 Diplomado)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => openSubscribe('ilimitado')}
                      className="w-full py-3 bg-brand-card border border-brand-border hover:bg-brand-border text-brand-heading font-mono text-xs uppercase tracking-widest font-black rounded-lg transition-all shadow-md hover:scale-[1.01] cursor-pointer active:scale-95"
                    >
                      Matricularme Ilimitado
                    </button>
                    <p className="text-center text-[9px] text-brand-subtext font-mono mt-3 uppercase tracking-widest transition-colors">
                      Acceso libre y actualizaciones por 2 años.
                    </p>
                  </div>
                </div>
              </div>

              {/* ATS Audit Bottom Banner alert */}
              <div className="mt-16 bg-brand-card/90 border-l-4 border-l-brand-gold border border-brand-border p-6 sm:p-8 rounded flex flex-col md:flex-row items-center justify-between gap-8 transition-theme shadow-md">
                <div className="max-w-lg">
                  <h4 className="text-brand-heading font-bold text-base font-sans transition-colors">¿Tu perfil laboral no supera los filtros ATS de RRHH?</h4>
                  <p className="text-brand-subtext text-xs sm:text-sm mt-1.5 leading-relaxed font-sans transition-colors">
                    Nuestro equipo técnico audita tus habilidades bajo los estándares internacionales regulatorios JORC de reservas y seguridad industrial de campo. Cupos limitados disponibles por semana.
                  </p>
                </div>

                <form onSubmit={handleAuditoriaNav} className="flex gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="email@ingeniero.com"
                    className="bg-brand-surface border border-brand-border rounded px-4 py-3 text-xs font-mono text-brand-text placeholder-brand-subtext/60 focus:outline-none focus:border-brand-gold w-full md:w-60 transition-theme"
                  />
                  <button
                    type="submit"
                    className="bg-brand-gold text-brand-dark px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider shrink-0 hover:brightness-110 shadow-md cursor-pointer active:scale-95"
                  >
                    Auditar Mi CV
                  </button>
                </form>
              </div>
            </section>

            {/* Central FAQ section Accordions */}
            <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-border/40">
              <h2 className="text-3xl font-black text-center text-brand-heading mb-12 tracking-tight transition-colors">Preguntas Frecuentes</h2>
              
              <div className="space-y-4">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaqIdx === i;
                  return (
                    <div
                      key={i}
                      className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden transition-theme"
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between text-brand-heading font-bold text-xs sm:text-sm tracking-wide gap-4 uppercase font-sans hover:bg-brand-card/30 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          size={18}
                          className={`text-brand-gold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-brand-text border-t border-brand-border/30 text-xs sm:text-sm leading-relaxed font-sans transition-colors">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Tab Diplomados - Courses Explorer */}
        {activeTab === 'Diplomados' && <Cursos />}

        {/* Tab Bolsa de Empleo - Job Listings and applicant system */}
        {activeTab === 'Bolsa de Empleo' && <Empleo />}

        {/* Tab Acceso Miembros - Connected Device Simulator */}
        {activeTab === 'Acceso Miembros' && <AppDemo />}

        {/* Tab Auditoría CV - ATS resume audit analyzer tool */}
        {activeTab === 'Auditoría CV' && <AuditoriaCV />}
      </main>

      {/* Footer corporate notes */}
      <footer className="bg-brand-dark border-t border-brand-border/50 pt-16 pb-8 shrink-0 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1 info */}
          <div className="space-y-4">
            <div className="text-lg font-black text-brand-gold tracking-tight uppercase">
              EDUMIN
            </div>
            <p className="text-brand-subtext text-xs sm:text-sm leading-normal transition-colors">
              Liderando la formación técnica y la inserción de profesionales de élite en la industria minera internacional del mundo hispanohablante.
            </p>
          </div>

          {/* Column 2 links */}
          <div>
            <h5 className="font-mono text-xs text-brand-heading uppercase tracking-wider mb-4 font-bold transition-colors">Plataforma</h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-subtext transition-colors">
              <li>
                <button onClick={() => setActiveTab('Diplomados')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Diplomados
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Bolsa de Empleo')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Bolsa de Trabajo Privada
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('Acceso Miembros')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Sincronización Móvil
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 support links */}
          <div>
            <h5 className="font-mono text-xs text-brand-heading uppercase tracking-wider mb-4 font-bold transition-colors">Soporte y Contacto</h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-subtext font-sans transition-colors">
              <li>
                <a href="#cursos-ecosystem" className="hover:text-brand-gold transition-colors">Términos de Licencia</a>
              </li>
              <li>
                <a href="#cursos-ecosystem" className="hover:text-brand-gold transition-colors">Políticas de Privacidad</a>
              </li>
              <li>
                <a href="#cursos-ecosystem" className="hover:text-brand-gold transition-colors">Mesa de Ayuda</a>
              </li>
            </ul>
          </div>

          {/* Column 4 legal disclosures */}
          <div>
            <h5 className="font-mono text-xs text-brand-heading uppercase tracking-wider mb-4 font-bold transition-colors">Resguardo Legal</h5>
            <ul className="space-y-2 text-[10px] sm:text-xs text-brand-subtext font-mono leading-relaxed transition-colors">
              <li>Libro de Reclamaciones disponible.</li>
              <li>Todo el material pedagógico de EDUMIN se encuentra diseñado en conformidad con la norma canadiense NI 43-101 y el código JORC de reservas.</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bars & icons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-brand-subtext transition-theme">
          <p>© 2026 EDUMIN - Ingeniería y Capacitación de Alto Impacto. Reservados todos los derechos.</p>
          
          <div className="flex gap-5 text-brand-subtext">
            <span className="hover:text-brand-gold cursor-pointer transition-colors" title="Instagram">
              <Instagram size={16} />
            </span>
            <span className="hover:text-brand-gold cursor-pointer transition-colors" title="Rss">
              <Rss size={16} />
            </span>
            <span className="hover:text-brand-gold cursor-pointer transition-colors" title="Mail Co">
              <Mail size={16} />
            </span>
          </div>
        </div>
      </footer>

      {/* Subscription Checkout Modal */}
      <SuscripcionModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        defaultPlan={selectedPlanForModal}
        region={pricingRegion}
      />

      {/* Workshop Registration Modal */}
      <AnimatePresence>
        {isWorkshopOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-surface border border-brand-border rounded-xl max-w-md w-full p-6 sm:p-8 text-left shadow-2xl relative transition-theme"
            >
              <button
                onClick={closeWorkshopModal}
                className="absolute top-4 right-4 p-1.5 hover:bg-brand-border/40 rounded-full text-brand-subtext hover:text-brand-heading transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              {!isWorkshopSubmitted ? (
                <div>
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20 inline-block mb-2">
                      {selectedDiplomadoForInfo ? 'SOLICITUD DE INFORMACIÓN' : 'REGISTRO GRATUITO AL WORKSHOP'}
                    </span>
                    <h3 className="text-xl font-extrabold text-brand-heading transition-colors">
                      {selectedDiplomadoForInfo ? selectedDiplomadoForInfo : 'Optimización de Carguío y Acarreo'}
                    </h3>
                    <p className="text-xs text-brand-subtext mt-1.5 transition-colors">
                      {selectedDiplomadoForInfo 
                        ? 'Completa tus datos para recibir el plan de estudios completo, fecha de inicio y opciones de financiamiento.'
                        : 'Completa tus datos profesionales para recibir tu enlace de acceso a la sala de Zoom en vivo.'}
                    </p>
                  </div>

                  <form onSubmit={handleWorkshopSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1.5 transition-colors">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={workshopName}
                        onChange={(e) => setWorkshopName(e.target.value)}
                        placeholder="Ej. Ing. Juan Pérez"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1.5 transition-colors">
                        Correo Electrónico Corporativo / Personal *
                      </label>
                      <input
                        type="email"
                        required
                        value={workshopEmail}
                        onChange={(e) => setWorkshopEmail(e.target.value)}
                        placeholder="ejemplo@mineria.com"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1.5 transition-colors">
                        Número de Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={workshopPhone}
                        onChange={(e) => setWorkshopPhone(e.target.value)}
                        placeholder="Ej. +51 987 654 321"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1.5 transition-colors">
                        Unidad Minera / Empresa / Cargo
                      </label>
                      <input
                        type="text"
                        value={workshopCompany}
                        onChange={(e) => setWorkshopCompany(e.target.value)}
                        placeholder="Ej. Antamina - Ingeniero de Planeamiento"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isWorkshopSubmitting}
                      className="w-full py-3 bg-brand-gold hover:brightness-110 text-brand-dark uppercase tracking-widest font-mono text-xs font-bold rounded shadow-lg flex items-center justify-center gap-2 mt-6 cursor-pointer transition-theme disabled:opacity-50"
                    >
                      {isWorkshopSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          {selectedDiplomadoForInfo ? 'Enviando Solicitud...' : 'Reservando Cupo...'}
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={13} />
                          {selectedDiplomadoForInfo ? 'Pedir Información' : 'Confirmar Registro Gratis'}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-heading transition-colors">
                    {selectedDiplomadoForInfo ? '¡Solicitud Recibida!' : '¡Registro Confirmado!'}
                  </h3>
                  <p className="text-xs text-brand-subtext mt-2 px-2 leading-relaxed transition-colors">
                    {selectedDiplomadoForInfo ? (
                      <>Estimado <strong className="text-brand-heading font-semibold transition-colors">{workshopName}</strong>, hemos recibido tu solicitud para el diplomado de <strong className="text-brand-heading font-semibold transition-colors">{selectedDiplomadoForInfo}</strong>. Un asesor académico se contactará contigo a la brevedad.</>
                    ) : (
                      <>Estimado <strong className="text-brand-heading font-semibold transition-colors">{workshopName}</strong>, hemos reservado tu cupo exclusivo para el workshop.</>
                    )}
                  </p>
                  <div className="bg-brand-card border border-brand-border p-4 rounded-lg mt-6 text-left space-y-2.5 transition-theme">
                    <div className="text-xs font-mono flex justify-between">
                      <span className="text-brand-subtext">{selectedDiplomadoForInfo ? 'Programa:' : 'Evento:'}</span>
                      <span className="text-brand-heading font-medium">{selectedDiplomadoForInfo ? selectedDiplomadoForInfo : 'Carguío y Acarreo en Tajo Abierto'}</span>
                    </div>
                    <div className="text-xs font-mono flex justify-between">
                      <span className="text-brand-subtext">{selectedDiplomadoForInfo ? 'Estado:' : 'Fecha:'}</span>
                      <span className="text-brand-gold font-bold">{selectedDiplomadoForInfo ? 'Asesor Académico Asignado' : 'Sábado 20:00 UTC'}</span>
                    </div>
                    <div className="text-xs font-mono flex justify-between">
                      <span className="text-brand-subtext">{selectedDiplomadoForInfo ? 'Plan de Estudios:' : 'Acceso:'}</span>
                      <span className="text-green-400 font-bold">{selectedDiplomadoForInfo ? 'Enviado a su correo' : 'Enlace enviado a su correo'}</span>
                    </div>
                  </div>
                  <button
                    onClick={closeWorkshopModal}
                    className="mt-8 px-6 py-2.5 bg-brand-border hover:bg-brand-border/80 text-brand-text font-mono text-xs uppercase tracking-wider rounded cursor-pointer transition-theme"
                  >
                    Cerrar Ventana
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
