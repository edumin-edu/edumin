import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Smartphone, Play, Pause, Download, CheckCircle, HardDrive, Sliders, Volume2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MockEpisode {
  id: string;
  title: string;
  chapter: string;
  duration: string;
  fileSize: string;
}

export default function AppDemo() {
  const [isOnline, setIsOnline] = useState(true);
  const [downloadedIds, setDownloadedIds] = useState<string[]>(['sag-4']);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // Media player state
  const [activePlayId, setActivePlayId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // in seconds
  const [showWarning, setShowWarning] = useState<string | null>(null);

  const mockEpisodes: MockEpisode[] = [
    { id: 'sag-1', chapter: 'Capítulo 1', title: 'Fundamentos del Molino SAG', duration: '14 min', fileSize: '18 MB' },
    { id: 'sag-2', chapter: 'Capítulo 2', title: 'Sensores Acústicos y Densidad', duration: '18 min', fileSize: '22 MB' },
    { id: 'sag-3', chapter: 'Capítulo 3', title: 'Control de Carga de Bolas', duration: '22 min', fileSize: '28 MB' },
    { id: 'sag-4', chapter: 'Capítulo 4', title: 'Molienda SAG avanzada', duration: '25 min', fileSize: '32 MB' },
    { id: 'geo-1', chapter: 'Capítulo 5', title: 'Sondajes y Leyes de Corte', duration: '15 min', fileSize: '20 MB' }
  ];

  // Tick simulation of play status
  useEffect(() => {
    let timer: any;
    if (isPlaying && activePlayId) {
      const activeEp = mockEpisodes.find(e => e.id === activePlayId);
      if (activeEp) {
        // Convert '25 min' to virtual seconds (e.g. 1500 secs)
        const mins = parseInt(activeEp.duration);
        setTotalTime(mins * 60);
      }
      
      timer = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activePlayId, totalTime]);

  const handleDownload = (id: string) => {
    if (downloadingId) return; // one at a time
    if (downloadedIds.includes(id)) return;
    
    // Verify connection
    if (!isOnline) {
      setShowWarning('No puedes iniciar nuevas descargas mientras te encuentres sin conexión (Alta Montaña). Reconéctate a Wi-Fi.');
      setTimeout(() => setShowWarning(null), 4000);
      return;
    }

    setDownloadingId(id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadedIds(curr => [...curr, id]);
          setDownloadingId(null);
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handlePlayEp = (id: string) => {
    const isDownloaded = downloadedIds.includes(id);
    
    // Guard offline playback
    if (!isOnline && !isDownloaded) {
      setShowWarning('❌ CONTENIDO BLOQUEADO: El capítulo seleccionado no fue descargado previamente. No tienes conexión a satélite disponible.');
      setTimeout(() => setShowWarning(null), 5000);
      return;
    }

    if (activePlayId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlayId(id);
      setIsPlaying(true);
      setPlaybackTime(0);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="offline-app-sim" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro block */}
      <div className="mb-12 border-b border-brand-border pb-8 transition-theme">
        <span className="font-mono text-xs text-brand-gold bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 rounded uppercase tracking-widest">
          SIMULADOR INTERACTIVO DE MIEMBROS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-4 tracking-tight transition-colors">
          Acceso Móvil Sin Conexión en Alta Montaña
        </h1>
        <p className="text-brand-subtext mt-2 max-w-3xl transition-colors">
          Interactúa con el siguiente simulador de teléfono para experimentar de primera mano la sincronización inteligente de EDUMIN. Cambia de modo para probar el aprendizaje offline.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Pitch & Controls Left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-card border border-brand-border p-6 rounded-xl space-y-4 transition-theme">
            <h3 className="font-bold text-brand-heading text-base transition-colors">Control de Simulación de Red</h3>
            <p className="text-xs text-brand-subtext transition-colors">
              Usa este interruptor para simular encontrarte en la oficina central con Wi-Fi, o en campamento profundo en alta montaña (sin señal).
            </p>

            <div className="flex items-center justify-between bg-brand-surface p-4 rounded border border-brand-border mt-2 transition-theme">
              <span className="text-xs font-mono font-medium flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Wifi size={16} className="text-green-400 animate-pulse" />
                    <span className="text-green-400 font-bold uppercase">Conexión Activa (Oficina)</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={16} className="text-red-400 animate-bounce" />
                    <span className="text-red-400 font-bold uppercase">Sin Conexión (Operación)</span>
                  </>
                )}
              </span>

              <button
                onClick={() => {
                  setIsOnline(!isOnline);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 text-xs font-mono font-bold rounded uppercase tracking-wider transition-colors cursor-pointer ${
                  isOnline
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30'
                }`}
              >
                {isOnline ? 'Desconectar Red' : 'Conectar Red'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">1</span>
              <div>
                <h4 className="text-sm font-bold text-brand-heading transition-colors">Descarga Offline</h4>
                <p className="text-xs text-brand-subtext mt-1 transition-colors">Con el simulador en &quot;ONLINE&quot;, presiona el icono de descarga junto a las lecciones de molienda SAG para guardarlas localmente.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">2</span>
              <div>
                <h4 className="text-sm font-bold text-brand-heading transition-colors">Pierde Conexión</h4>
                <p className="text-xs text-brand-subtext mt-1 transition-colors">Cambia la simulación de red a &quot;SIN CONEXIÓN&quot;. Verás que tu teléfono entra instantáneamente en modo fuera de línea.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">3</span>
              <div>
                <h4 className="text-sm font-bold text-brand-heading transition-colors">Prueba la Reproducción</h4>
                <p className="text-xs text-brand-subtext mt-1 transition-colors">Intenta reproducir un capítulo descargado frente a uno que no guardaste. Observa cómo la aplicación móvil protege tu continuidad académica.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Phone Mockup Center-Right */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative">
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-brand-gold/5 blur-[130px] rounded-full pointer-events-none" />

            {/* Smartphone shell frame */}
            <div className="relative w-[340px] h-[660px] bg-[#0c0c0d] border-[8px] border-[#222124] rounded-[48px] shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Speaker / Camera pill notch */}
              <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex items-center justify-center">
                <div className="w-24 h-4 bg-black rounded-b-xl flex items-center justify-around px-2">
                  <div className="w-2 h-2 rounded-full bg-[#1b1a1c]" />
                  <div className="w-12 h-1 bg-[#151516] rounded-full" />
                </div>
              </div>

              {/* Status bar mock */}
              <div className="px-6 pt-9 pb-2 bg-brand-dark flex items-center justify-between text-[11px] font-mono text-brand-subtext border-b border-brand-border/30 z-20 transition-theme">
                <span>16:44</span>
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi size={13} className="text-green-400" />
                  ) : (
                    <WifiOff size={13} className="text-red-400" />
                  )}
                  <span className={isOnline ? 'text-green-500 font-bold' : 'text-red-400 font-bold'}>
                    {isOnline ? 'LTE' : 'OFFLINE'}
                  </span>
                </div>
              </div>

              {/* Warnings / Alerts within App view */}
              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="absolute top-14 left-4 right-4 bg-red-950/95 border border-red-500 rounded p-3 z-30 flex gap-2 items-start shadow-xl"
                  >
                    <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-200 leading-normal font-sans">{showWarning}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Internal Mobile App Content Screen */}
              <div className="flex-grow bg-brand-dark overflow-y-auto p-4 space-y-4 transition-theme">
                
                {/* Brand and category info */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">EDUMIN APP</span>
                  <span className="text-[9px] font-mono bg-brand-surface border border-brand-border text-brand-subtext px-1.5 py-0.5 rounded transition-theme">
                    PRO LEVEL
                  </span>
                </div>

                {/* Cover graphic */}
                <div className="bg-brand-surface border border-brand-border rounded-xl p-3 flex gap-3 relative overflow-hidden transition-theme">
                  <div className="w-12 h-12 rounded bg-amber-600/30 flex items-center justify-center border border-brand-gold/20 shrink-0">
                    <HardDrive size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-heading transition-colors">Molienda SAG y Autógena</h4>
                    <p className="text-[9px] text-brand-subtext leading-tight transition-colors">Especialización de planta • 5 lecciones offline disponibles para miembros</p>
                  </div>
                </div>

                {/* Subheading list titles */}
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-mono uppercase text-brand-subtext transition-colors">Capítulos de la cápsula</span>
                  <span className="text-[9px] font-mono text-brand-gold">Módulos descargables</span>
                </div>

                {/* List items */}
                <div className="space-y-2">
                  {mockEpisodes.map((ep) => {
                    const isDownloaded = downloadedIds.includes(ep.id);
                    const isDownloading = downloadingId === ep.id;
                    const isActive = activePlayId === ep.id;

                    return (
                      <div
                        key={ep.id}
                        className={`border rounded-lg p-3 transition-colors flex items-center justify-between ${
                          isActive 
                            ? 'bg-amber-500/10 border-brand-gold/60'
                            : 'bg-brand-surface border-brand-border/40 hover:bg-brand-surface/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 cursor-pointer" onClick={() => handlePlayEp(ep.id)}>
                          <button className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/10 cursor-pointer">
                            {isActive && isPlaying ? (
                              <Pause size={10} className="fill-brand-gold text-brand-gold" />
                            ) : (
                              <Play size={10} className="fill-brand-gold text-brand-gold translate-x-[0.5px]" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono text-brand-gold block">{ep.chapter}</span>
                            <h5 className="text-[11px] font-bold text-brand-heading truncate leading-tight mt-0.5 transition-colors">{ep.title}</h5>
                            <span className="text-[8px] font-mono text-brand-subtext block transition-colors">{ep.duration} • {ep.fileSize}</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 pl-2">
                          {isDownloaded ? (
                            <CheckCircle size={14} className="text-green-500" />
                          ) : isDownloading ? (
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-mono text-brand-gold">{downloadProgress}%</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDownload(ep.id)}
                              className="p-1 hover:bg-brand-border/60 rounded text-brand-subtext hover:text-brand-heading transition-colors cursor-pointer"
                              title="Descargar para modo seguro sin conexión"
                            >
                              <Download size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Overlay Offline Mini-Indicator inside App */}
              <div className="px-4 py-2 border-t border-brand-border/40 bg-brand-surface flex items-center justify-between font-mono text-[9px] text-brand-subtext transition-theme">
                <span className="flex items-center gap-1">
                  <Sliders size={10} className="text-brand-gold" />
                  Auto-limpiar caché (30 días)
                </span>
                <span className="text-right">62 MB Usados</span>
              </div>

              {/* Dynamic bottom play tracker HUD */}
              <AnimatePresence>
                {activePlayId && (
                  <motion.div
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    exit={{ y: 200 }}
                    className="p-3 bg-brand-surface border-t-2 border-brand-gold/80 z-20 transition-theme"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="truncate min-w-0">
                        <span className="text-[8px] font-mono text-brand-gold block tracking-wider uppercase">REPRODUCING OFFLINE</span>
                        <h4 className="text-[10px] font-bold text-brand-heading truncate leading-none mt-0.5 transition-colors">
                          {mockEpisodes.find(e => e.id === activePlayId)?.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Volume2 size={12} className="text-brand-gold animate-pulse" />
                        <span className="text-[8px] font-mono text-brand-subtext transition-colors">{formatTime(playbackTime)}</span>
                      </div>
                    </div>

                    {/* Mini progress tracker */}
                    <div className="w-full bg-brand-dark h-1 rounded overflow-hidden transition-theme">
                      <div
                        className="bg-brand-gold h-full transition-all"
                        style={{ width: `${(playbackTime / (totalTime || 1)) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
