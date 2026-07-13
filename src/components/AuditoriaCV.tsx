import React, { useState } from 'react';
import { FileText, Cpu, CheckCircle, AlertCircle, ThumbsUp, Download, Copy, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuditoriaCV() {
  const [targetRole, setTargetRole] = useState('Minas');
  const [cvText, setCvText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [copied, setCopied] = useState(false);


  // Score states
  const [score, setScore] = useState(0);
  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [actionVerbsText, setActionVerbsText] = useState<string[]>([]);

  // JORC, NI 43-101 Keywords catalog by discipline
  const keywordsByRole: { [key: string]: string[] } = {
    Geología: ['JORC', 'NI 43-101', 'sondajes', 'modelamiento de bloques', 'QA/QC', 'Leapfrog', 'geoestadística', 'estimación de recursos', 'ley de corte', 'litología'],
    Minas: ['Deswik', 'MineSight', 'planeamiento short-range', 'perforación y tronadura', 'ancho de berma', 'talud de diseño', 'LHD', 'flota de transporte', 'banco de minado', 'Block Caving'],
    Procesamiento: ['Molienda SAG', 'celdas de flotación', 'ley de cabeza', 'recuperación metalúrgica', 'espesamiento de relaves', 'conminución', 'hidrometalurgia', 'PH control', 'circuito cerrado'],
    Seguridad: ['GICA', 'controles críticos', 'Zero Harm', 'investigación ICAM', 'IPERC continuo', 'Bow-tie', 'fatiga de guardia', 'norma ISO 45001', 'bloqueo y etiquetado', 'materiales peligrosos'],
    Gestión: ['OPEX', 'CAPEX', 'disponibilidad física', 'MTBF', 'MTTR', 'confiabilidad RCM', 'indicadores KPI', 'gestión de repuestos', 'contratos MARS', 'auditoría de guardia']
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) return;

    setAnalyzing(true);
    setAnalyzed(false);

    setTimeout(() => {
      const draft = cvText.toLowerCase();
      let finalScore = 40; // Base score

      const roleKeywords = keywordsByRole[targetRole] || [];
      const foundKeywords: string[] = [];
      const missingKeys: string[] = [];

      roleKeywords.forEach(keyword => {
        if (draft.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
          finalScore += 5; // +5 for each matching mining keyword
        } else {
          missingKeys.push(keyword);
        }
      });

      // Structure checks
      const pos: string[] = [];
      const neg: string[] = [];

      // Check for metric numbers (e.g. %, USD, tons)
      const hasMetrics = /[0-9]+%|[0-9]+\s*(toneladas|t|usd|usd\s*\/|dólares)/.test(draft);
      if (hasMetrics) {
        finalScore += 15;
        pos.push('✓ Excelente uso de datos cuantificables y métricas de desempeño financiero u operativo (ej. %, toneladas o USD).');
      } else {
        neg.push('⚠ Falta de métricas numéricas. Describe tus logros en base a aumentos de rendimiento (%), toneladas transportadas o reducción de costos.');
      }

      // Check structure of text: length
      if (cvText.length > 500) {
        finalScore += 10;
        pos.push('✓ La extensión de su extracto profesional es suficiente para describir responsabilidades de faena profunda.');
      } else {
        neg.push('⚠ Resumen extremadamente breve. Un ATS suele requerir de 2 a 3 párrafos de descripción para validar habilidades previas.');
      }

      // Check for code standards
      const standardFound = draft.includes('jorc') || draft.includes('ni 43-101') || draft.includes('ni43-101');
      if (standardFound) {
        finalScore += 10;
        pos.push('✓ Menciona reglamentos y códigos de certificación global de recursos (como JORC o NI 43-101), lo cual añade inmenso valor.');
      } else {
        neg.push('⚠ No se detectó sustento bajo normas JORC o NI 43-101. En minería corporativa, referenciar estas normas demuestra señorío regulatorio.');
      }

      // Action verbs density
      const actionVerbs = ['lideré', 'coordiné', 'implementé', 'automaticé', 'reduje', 'optimicé', 'supervisé', 'diseñé', 'ejecuté', 'audité'];
      const foundVerbs = actionVerbs.filter(verb => draft.includes(verb));
      if (foundVerbs.length >= 3) {
        finalScore += 10;
        pos.push(`✓ Densidad de verbos de acción sólida para liderazgo operativo: ${foundVerbs.join(', ')}.`);
      } else {
        neg.push('⚠ Su currículum utiliza terminología pasiva. Reemplace palabras como "responsable de" por verbos activos como "optimizó", "diseñó", o "dirigió".');
      }

      // Cap at 100
      const computedScore = Math.min(finalScore, 100);

      setScore(computedScore);
      setPositives(pos);
      setNegatives(neg);
      setMissingKeywords(missingKeys);
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1800);
  };

  const handleCopyFeedback = () => {
    const feedbackText = `
EDUMIN - INFORME ATS PREMIUM DE AUDITORÍA DE CV
======================================================
Área Técnica Seleccionada: ${targetRole}
Puntaje de Compatibilidad de la Cuenta: ${score}/100

LOGROS DETECTADOS:
${positives.map(p => ` - ${p}`).join('\n')}

RECOMENDACIONES IMPORTANTES PARA OPTIMIZAR:
${negatives.map(n => ` - ${n}`).join('\n')}

PALABRAS CLAVE (KEYWORDS) SUGERIDAS QUE DEBES AGREGAR:
${missingKeywords.length > 0 ? missingKeywords.join(', ') : 'Ninguna, ¡tu perfil cuenta con toda la densidad necesaria!'}
    `;

    navigator.clipboard.writeText(feedbackText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="cv-audit-screener" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Title */}
      <div className="mb-12 border-b border-brand-border pb-8 transition-theme">
        <span className="font-mono text-xs text-brand-gold bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 rounded uppercase tracking-widest">
          SISTEMA DE AUDITORÍA CV AUTOMATIZADO JORC/ATS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-4 tracking-tight transition-colors">
          Supera los Filtros ATS de las Grandes Mineras
        </h1>
        <p className="text-brand-subtext mt-2 max-w-3xl transition-colors">
          El 92% de las postulaciones para puestos de ingeniería y supervisión son descartadas automáticamente por algoritmos de escaneo que buscan terminología regulatoria obligatoria. Utiliza este simulador para potenciar tu CV de campo.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* CV Input Form */}
        <div className="lg:col-span-7 bg-brand-card border border-brand-border p-6 rounded-xl transition-theme">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="flex gap-4 flex-wrap items-center justify-between border-b border-brand-border/40 pb-4 transition-theme">
              <div className="flex items-center gap-2">
                <FileText className="text-brand-gold" size={20} />
                <h3 className="font-bold text-brand-heading text-sm uppercase tracking-wide transition-colors">Redactar / Pegar Currículum</h3>
              </div>

              <div>
                <label className="text-xs font-mono text-brand-subtext mr-2 uppercase transition-colors">Área Operativa Destino:</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-brand-surface border border-brand-border text-xs text-brand-text rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold font-mono transition-theme cursor-pointer"
                >
                  <option value="Geología">Geología</option>
                  <option value="Minas">Minas / Planeamiento</option>
                  <option value="Procesamiento">Procesamientos / Planta</option>
                  <option value="Seguridad">Seguridad / Salud HSEC</option>
                  <option value="Gestión">Gestión / Mantenimiento</option>
                </select>
              </div>
            </div>

            <div>
              <p className="text-xs text-brand-subtext mb-2 leading-relaxed transition-colors">
                Pega tu perfil laboral actual, lista de responsabilidades o un borrador detallado de tu CV actual. Analizaremos tu densidad semántica bajo los estándares globales aplicados en BHP, Codelco y Antamina.
              </p>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Ejemplo de borrador: Ingeniero de Mina colegiado con amplia experiencia coordinando guardias en subsuelo y tajo abierto. Habilidades en planeamiento a corto plazo (short-range) y control de flota. Responsable del cumplimiento de normas de seguridad de mi turno..."
                className="w-full bg-brand-surface border border-brand-border rounded-lg p-4 text-xs sm:text-sm text-brand-text placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold font-sans focus:ring-1 focus:ring-brand-gold transition-theme"
                rows={12}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] font-mono text-brand-subtext transition-colors">
                {cvText.length} caracteres redactados
              </span>
              <button
                type="submit"
                disabled={analyzing || !cvText.trim()}
                className="px-6 py-3 bg-brand-gold text-brand-dark rounded-md uppercase font-mono font-bold tracking-widest text-xs flex items-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all hover:scale-[1.01] cursor-pointer"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} />
                    PROCESANDO REGLAS ATS...
                  </>
                ) : (
                  <>
                    <Cpu size={14} />
                    AUDITAR CV AHORA
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Real-time Analysis Result Sheet */}
        <div className="lg:col-span-5 bg-brand-card border border-brand-border rounded-xl p-6 relative overflow-hidden transition-theme">
          {!analyzed && !analyzing ? (
            <div className="text-center py-24 text-brand-subtext transition-colors">
              <div className="w-12 h-12 rounded-full border border-dashed border-brand-border mx-auto flex items-center justify-center mb-4 transition-theme">
                <Layers size={20} className="text-brand-gold" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-brand-subtext transition-colors">Esperando Datos</p>
              <p className="text-xs text-brand-subtext/80 mt-2 max-w-xs mx-auto transition-colors">
                Ingresa tu CV a la izquierda y presiona &quot;AUDITAR CV AHORA&quot; para iniciar el escaneo de variables JORC.
              </p>
            </div>
          ) : analyzing ? (
            <div className="text-center py-24 text-brand-subtext font-mono text-xs space-y-4 transition-colors">
              <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="animate-pulse">EJECUTANDO ALGORITMOS DE ESCANEO DE PALABRAS CLAVE...</p>
              <p className="text-brand-subtext/60 text-[10px] transition-colors">Calculando compatibilidad bajo reglas internacionales corporativas...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score breakdown */}
              <div className="border-b border-brand-border/60 pb-6 text-center transition-theme">
                <span className="text-[10px] font-mono uppercase text-brand-gold tracking-widest bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/25 inline-block mb-3">
                  Score de Compatibilidad ATS
                </span>

                <div className="flex justify-center items-baseline gap-1 mt-1">
                  <span className="text-5xl font-black text-brand-heading tracking-tighter transition-colors">{score}</span>
                  <span className="text-brand-subtext text-xl font-mono transition-colors">/100</span>
                </div>

                <div className="w-full bg-brand-surface h-2 rounded overflow-hidden mt-4 border border-brand-border transition-theme">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-[#eab308] rounded transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              {/* Positives list */}
              <div>
                <h4 className="text-xs font-mono uppercase text-green-500 tracking-wider mb-2 font-bold flex items-center gap-1.5 transition-colors">
                  <ThumbsUp size={14} /> Fortalezas Detectadas
                </h4>
                <div className="space-y-3 bg-[#14532d]/10 border border-[#14532d]/30 rounded-lg p-4 transition-theme">
                  {positives.length > 0 ? (
                    positives.map((p, idx) => (
                      <div key={idx} className="text-xs text-brand-text flex gap-2 transition-colors">
                        <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-brand-subtext font-mono italic transition-colors">No se identificaron fortalezas claras en la terminología empleada.</p>
                  )}
                </div>
              </div>

              {/* Gaps detected list */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#eab308] tracking-wider mb-2 font-bold flex items-center gap-1.5 transition-colors">
                  <AlertCircle size={14} /> Oportunidades de Mejora
                </h4>
                <div className="space-y-3 bg-[#78350f]/10 border border-[#78350f]/30 rounded-lg p-4 transition-theme">
                  {negatives.length > 0 ? (
                    negatives.map((n, idx) => (
                      <div key={idx} className="text-xs text-brand-text flex gap-2 transition-colors">
                        <AlertCircle size={14} className="text-[#eab308] shrink-0 mt-0.5" />
                        <span>{n}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-green-500 font-mono flex items-center gap-1 transition-colors">
                      <Sparkles size={12} /> ¡Su perfil está completamente optimizado!
                    </p>
                  )}
                </div>
              </div>

              {/* Recommended keywords breakdown */}
              <div>
                <h4 className="text-xs font-mono uppercase text-brand-gold tracking-widest mb-2 font-bold">
                  Keywords de {targetRole} Faltantes en su CV
                </h4>
                <p className="text-[10px] text-brand-subtext mb-3 leading-tight transition-colors">
                  Inserta los siguientes términos de forma estratégica en la sección de experiencia técnica de tu curriculum para ganar reputación de algoritmo.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.length > 0 ? (
                    missingKeywords.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-brand-surface border border-brand-border text-brand-text px-2 py-1 rounded transition-theme"
                      >
                        + {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20 flex items-center gap-1 transition-theme">
                      <Check size={12} /> ¡Tienes cubiertas todas las palabras clave!
                    </span>
                  )}
                </div>
              </div>

              {/* Utility report tools */}
              <div className="pt-6 border-t border-brand-border/60 flex items-center justify-between gap-4 transition-theme">
                <button
                  onClick={handleCopyFeedback}
                  className="w-full py-2.5 bg-brand-surface border border-brand-border hover:bg-brand-border text-brand-text rounded text-xs font-mono font-medium tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-theme"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-green-500" /> ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copiar Diagnóstico
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
