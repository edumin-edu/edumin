import React, { useState } from 'react';
import { JOBS } from '../data';
import { Job } from '../types';
import { Search, MapPin, Briefcase, DollarSign, Calendar, X, ClipboardList, Send, Info, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Empleo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todos');
  const [selectedLocation, setSelectedLocation] = useState<string>('Todos');
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  // Application simulator state
  const [showApplyModal, setShowApplyModal] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantExp, setApplicantExp] = useState('5');
  const [applicantAbout, setApplicantAbout] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    score: number;
    approved: boolean;
    feedback: string[];
    insights: string;
  } | null>(null);

  const locations = ['Todos', 'Perú', 'Chile', 'República Dominicana'];
  const disciplines = ['Todos', 'Geología', 'Minas', 'Procesamiento', 'Seguridad', 'Gestión'];

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDiscipline = selectedDiscipline === 'Todos' || job.discipline === selectedDiscipline;
    
    const matchesLocation =
      selectedLocation === 'Todos' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesDiscipline && matchesLocation;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Simulate an intelligent ATS scan
      const textToAnalyze = `${applicantAbout.toLowerCase()} ${applicantName.toLowerCase()}`;
      
      let score = 50; // base score
      const feedback: string[] = [];

      // Add points based on experience
      const years = parseInt(applicantExp);
      if (years >= 8) {
        score += 20;
        feedback.push('✓ Nivel de experiencia cumple con los requisitos del rango senior.');
      } else if (years >= 4) {
        score += 10;
        feedback.push('✓ Experiencia sólida en terreno minero e industrial.');
      } else {
        score -= 10;
        feedback.push('⚠ Este puesto senior suele requerir más de 5 años de experiencia de campo.');
      }

      // Scan for key industry keywords
      // JORC, NI 43-101, Datamine, Deswik, BHP, safety, optimizacion, planeamiento
      const industryTerms = ['jorc', 'ni 43-101', 'datamine', 'deswik', 'seguridad', 'optimización', 'planeamiento', 'molienda', 'sondajes', 'minesight'];
      let keywordCount = 0;
      
      industryTerms.forEach(term => {
        if (textToAnalyze.includes(term)) {
          keywordCount++;
          score += 5;
        }
      });

      if (keywordCount >= 3) {
        feedback.push(`✓ Densidad de Keywords ATS Óptima. Incluyó términos clave: ${industryTerms.filter(t => textToAnalyze.includes(t)).join(', ')}.`);
        score += 10;
      } else {
        feedback.push('⚠ Su postulación carece de palabras clave JORC, NI 43-101 o software específico (Datamine, Deswik, etc.).');
        score -= 5;
      }

      // Cap score at 100
      const finalScore = Math.min(score, 100);
      const isApproved = finalScore >= 70;

      const companyInFocus = JOBS.find(j => j.id === showApplyModal)?.company || 'la minera';

      setSubmitResult({
        score: finalScore,
        approved: isApproved,
        feedback,
        insights: isApproved 
          ? `¡Felicidades! Su perfil coincide en un ${finalScore}% con las exigencias críticas de ${companyInFocus}. El algoritmo ATS ha aprobado su solicitud preliminar para pasar a entrevista telefónica con recursos humanos.`
          : `Su compatibilidad preliminar es del ${finalScore}%. Recomendamos enfáticamente optimizar su curriculum agregando mayor detalle sobre su dominio de regulaciones mineras y software técnico antes de postular oficialmente.`
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setShowApplyModal(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantExp('5');
    setApplicantAbout('');
    setSubmitResult(null);
  };

  return (
    <div id="empleo-board" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Header */}
      <div className="mb-12 border-b border-brand-border pb-8">
        <span className="font-mono text-xs text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 rounded">
          BOLSA DE EMPLEO EXCLUSIVA
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-4 tracking-tight transition-colors">
          Vacantes Privadas de la Industria Hispana
        </h1>
        <p className="text-brand-subtext mt-2 max-w-3xl transition-colors">
          EDUMIN actúa como un puente directo. No enviamos postulaciones masivas; conectamos perfiles optimizados directamente con los tomadores de decisiones de RRHH.
        </p>
      </div>

      {/* Main Filter Panel + Job List */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="lg:col-span-4 bg-brand-card border border-brand-border p-6 rounded-xl space-y-6 transition-theme">
          <div>
            <h3 className="text-sm font-bold text-brand-heading uppercase tracking-wider mb-4 flex items-center gap-2 transition-colors">
              <MapPin size={16} className="text-brand-gold" />
              <span>Filtrar por País</span>
            </h3>
            <div className="space-y-1">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                    selectedLocation === loc
                      ? 'bg-brand-border text-brand-gold font-bold border-l-2 border-l-brand-gold'
                      : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/20'
                  }`}
                >
                  {loc === 'Todos' ? 'Todas las ubicaciones' : loc}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-border/60 pt-6">
            <h3 className="text-sm font-bold text-brand-heading uppercase tracking-wider mb-4 flex items-center gap-2 transition-colors">
              <Briefcase size={16} className="text-brand-gold" />
              <span>Disciplina Primaria</span>
            </h3>
            <div className="space-y-1">
              {disciplines.map((disc) => (
                <button
                  key={disc}
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                    selectedDiscipline === disc
                      ? 'bg-brand-border text-brand-gold font-bold border-l-2 border-l-brand-gold'
                      : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/20'
                  }`}
                >
                  {disc === 'Todos' ? 'Todas las disciplinas' : disc}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-border/60 pt-6 bg-brand-gold/5 -mx-6 -mb-6 p-6 rounded-b-xl border-dashed">
            <h4 className="text-xs font-mono text-brand-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} /> Auditores de CV
            </h4>
            <p className="text-xs text-brand-subtext leading-relaxed transition-colors">
              Los miembros PRO cuentan con revisión personalizada e inserción directa en la bolsa privada. El 84% de nuestros postulantes recomendados pasa el primer filtro.
            </p>
          </div>
        </div>

        {/* Jobs Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Internal search inside careers */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-subtext">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar por cargo, palabra clave o minera (ej. Antamina, secuenciamiento, JORC)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-brand-card border border-brand-border rounded-lg text-brand-text w-full placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-theme"
            />
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-brand-card border border-brand-border rounded-xl transition-theme">
              <p className="text-brand-subtext font-mono text-sm transition-colors">No encontramos oportunidades que coincidan con tus filtros.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedDiscipline('Todos'); setSelectedLocation('Todos'); }}
                className="mt-4 text-xs font-mono text-brand-gold hover:underline uppercase tracking-wider cursor-pointer"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-brand-card border border-brand-border rounded-lg p-6 hover:border-brand-gold/45 transition-theme flex flex-col justify-between hover:bg-brand-surface/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                        {job.discipline}
                      </span>
                      <h3 className="text-lg font-bold text-brand-heading mt-2 font-sans transition-colors">{job.title}</h3>
                      <p className="text-brand-subtext font-medium text-sm mt-0.5 transition-colors">{job.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-brand-subtext text-xs font-mono block transition-colors">{job.datePosted}</span>
                      <span className="text-[#a3e635] font-semibold text-sm block mt-1 font-mono">{job.salaryRange}</span>
                    </div>
                  </div>

                  <p className="text-brand-text text-xs mt-4 line-clamp-2 transition-colors">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-brand-subtext font-mono text-[11px] border-t border-brand-border/40 pt-4 items-center justify-between transition-colors">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveJob(job)}
                        className="px-3 py-1.5 bg-brand-border/50 border border-brand-border text-brand-heading rounded text-xs uppercase tracking-wider font-mono hover:bg-brand-border transition-all cursor-pointer"
                      >
                        Ver Detalles
                      </button>
                      <button
                        onClick={() => setShowApplyModal(job.id)}
                        className="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-600 text-white rounded text-xs uppercase tracking-wider font-mono font-bold transition-all cursor-pointer active:scale-95"
                      >
                        Postular
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide-out / Draw-in Details Panel */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-brand-surface border-l border-brand-border w-full max-w-lg p-8 overflow-y-auto flex flex-col justify-between h-full transition-theme"
            >
              <div>
                <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6 transition-theme">
                  <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20">
                    Oportunidad {activeJob.discipline}
                  </span>
                  <button
                    onClick={() => setActiveJob(null)}
                    className="p-1.5 hover:bg-brand-border rounded-full text-brand-subtext hover:text-brand-heading transition-theme cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-brand-heading tracking-tight transition-colors">{activeJob.title}</h2>
                <p className="text-brand-gold font-medium mt-1">{activeJob.company}</p>

                {/* Meta details strip */}
                <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-brand-card/80 border border-brand-border/40 rounded-lg text-xs font-mono transition-theme">
                  <div>
                    <span className="text-brand-subtext block uppercase text-[10px] transition-colors">País/Operación</span>
                    <span className="text-brand-text font-medium flex items-center gap-1 mt-1 transition-colors">
                      <MapPin size={12} className="text-brand-gold" />
                      {activeJob.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-brand-subtext block uppercase text-[10px] transition-colors">Rango Salarial</span>
                    <span className="text-green-400 font-medium mt-1 block">
                      {activeJob.salaryRange}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold mb-2">Descripción del Rol</h4>
                  <p className="text-brand-text text-sm leading-relaxed font-sans transition-colors">{activeJob.description}</p>
                </div>

                <div className="mt-8 border-t border-brand-border/30 pt-6 transition-theme">
                  <h4 className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
                    <ClipboardList size={14} /> Requisitos Críticos
                  </h4>
                  <ul className="space-y-3">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2 text-xs sm:text-sm text-brand-text transition-colors">
                        <span className="text-brand-gold shrink-0 block mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom apply trigger bar */}
              <div className="mt-12 border-t border-brand-border pt-6 flex gap-4 transition-theme">
                <button
                  onClick={() => setActiveJob(null)}
                  className="w-1/2 py-3 bg-brand-border hover:bg-brand-border/80 border border-brand-border text-brand-heading font-mono text-xs uppercase tracking-wider rounded cursor-pointer transition-theme"
                >
                  Volver al Listado
                </button>
                <button
                  onClick={() => {
                    const id = activeJob.id;
                    setActiveJob(null);
                    setShowApplyModal(id);
                  }}
                  className="w-1/2 py-3 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs uppercase tracking-widest font-bold rounded shadow-lg cursor-pointer active:scale-95 transition-all"
                >
                  Postular Ahora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Application Modal with Simulator Engine */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-surface border border-brand-border rounded-xl max-w-xl w-full p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto transition-theme"
            >
              <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6 transition-theme">
                <div>
                  <h3 className="text-lg font-bold text-brand-heading transition-colors">Formulario de Postulación de Campo</h3>
                  <p className="text-xs text-brand-subtext transition-colors">Coincidencia preliminar de perfil técnico</p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1.5 hover:bg-brand-border/50 rounded-full text-brand-subtext hover:text-brand-heading transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {!submitResult ? (
                <form onSubmit={handleApply} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1 transition-colors">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Ing. Carlos Mendoza"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1 transition-colors">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="ejemplo@ingeniero.com"
                        className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text focus:outline-none focus:border-brand-gold transition-theme"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1 transition-colors">Años de Experiencia en Operaciones Mineras</label>
                    <select
                      value={applicantExp}
                      onChange={(e) => setApplicantExp(e.target.value)}
                      className="w-full bg-brand-card border border-brand-border rounded p-2 text-sm text-brand-text focus:outline-none focus:border-brand-gold transition-theme"
                    >
                      <option value="1">1 - 3 años (Junior / Asistente)</option>
                      <option value="5">4 - 7 años (Intermedio / Jefe de Guardia)</option>
                      <option value="10">8+ años (Avanzado / Superintendente / Gerente)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-brand-subtext block mb-1 transition-colors">
                      Extracto Profesional e Historial Técnico (Escribe sobre ti: incluye términos clave) *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={applicantAbout}
                      onChange={(e) => setApplicantAbout(e.target.value)}
                      placeholder="Ej. Ingeniero de Minas peruano egresado de UNI. 8 años en Antamina liderando el planeamiento a corto plazo (short-range) de tajo abierto. Experiencia aplicando normas JORC para el cálculo de reservas y modelamiento volumétrico con software Datamine y Deswik..."
                      className="w-full bg-brand-card border border-brand-border rounded p-2.5 text-xs text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold transition-theme"
                    />
                    <span className="text-[10px] text-brand-subtext block mt-1.5 leading-relaxed transition-colors">
                      💡 Consejo: Para superar el análisis del algoritmo ATS, describe tu experiencia real mencionando certificaciones, regulaciones (como JORC o NI 43-101) o software especializado.
                    </span>
                  </div>

                  <div className="pt-4 border-t border-brand-border/50 flex gap-3 justify-end transition-theme">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 bg-brand-card hover:bg-brand-border border border-brand-border text-brand-text text-xs font-mono rounded cursor-pointer transition-theme"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-brand-gold text-brand-dark uppercase tracking-wider font-mono text-xs font-bold rounded flex items-center gap-2 hover:brightness-110 disabled:opacity-50 cursor-pointer transition-theme"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          Escaneando ATS...
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          Enviar Candidatura
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* ATS Feedback Presentation */}
                  <div className="p-6 bg-brand-card border border-brand-border rounded-lg text-center transition-theme">
                    <div className="relative inline-block mb-3">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="var(--color-brand-border)"
                          strokeWidth="8"
                          fill="transparent"
                          className="transition-theme"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={submitResult.approved ? '#22c55e' : '#eab308'}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - submitResult.score / 100)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-mono font-black text-brand-heading transition-colors">{submitResult.score}%</span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-brand-heading text-sm uppercase font-mono tracking-wider transition-colors">
                      Compatibilidad del Algoritmo ATS
                    </h4>
                    <p className={`text-xs mt-2 font-mono ${submitResult.approved ? 'text-green-400 bg-green-500/10' : 'text-amber-400 bg-amber-500/10'} px-3 py-1.5 rounded inline-block border border-current/10`}>
                      {submitResult.approved ? 'AUTORIZADO PARA ENTREVISTA' : 'SUFICIENTE OPTIMIZACIÓN REQUERIDA'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-brand-gold uppercase tracking-wider mb-2 font-bold flex items-center gap-1">
                      <Info size={14} /> Análisis Detallado:
                    </h4>
                    <p className="text-brand-text text-xs sm:text-sm leading-relaxed mb-4 transition-colors">
                      {submitResult.insights}
                    </p>
                    
                    <div className="space-y-2.5">
                      {submitResult.feedback.map((f, idx) => (
                        <div key={idx} className="text-xs text-brand-subtext flex gap-2 font-sans transition-colors">
                          <Check size={14} className="text-brand-gold shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-border/60 flex justify-end gap-3 transition-theme">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 bg-brand-border hover:bg-brand-border/80 text-brand-text rounded text-xs font-mono tracking-wider uppercase border border-brand-border cursor-pointer transition-theme"
                    >
                      Intentar de nuevo
                    </button>
                    <button
                      onClick={() => setShowApplyModal(null)}
                      className="px-5 py-2.5 bg-amber-700/80 hover:bg-amber-700 text-white rounded text-xs font-mono tracking-wider uppercase cursor-pointer transition-all active:scale-95"
                    >
                      Terminar
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
