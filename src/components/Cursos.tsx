import React, { useState } from 'react';
import { COURSES } from '../data';
import { Course } from '../types';
import { Search, Award, Clock, BookOpen, Star, Filter, CheckCircle2, ChevronRight, X, Play, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cursos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ['Todos', 'Geología', 'Minas', 'Procesamiento', 'Seguridad', 'Gestión'];

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
    }
  };

  const simulateDownload = (courseId: string) => {
    if (downloadingId) return; // Only download one at a time
    setDownloadingId(courseId);
    setDownloadProgress(prev => ({ ...prev, [courseId]: 0 }));

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setDownloadProgress(prev => ({ ...prev, [courseId]: current }));
      if (current >= 100) {
        clearInterval(interval);
        setDownloadingId(null);
      }
    }, 150);
  };

  return (
    <div id="cursos-ecosystem" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Section */}
      <div className="mb-12 border-b border-brand-border pb-8">
        <span className="font-mono text-xs text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 rounded">
          DIPLOMADOS DE ALTA ESPECIALIZACIÓN
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-4 tracking-tight transition-colors">
          Especialización Técnica Validada por la Industria
        </h1>
        <p className="text-brand-subtext mt-2 max-w-3xl transition-colors">
          Explora los programas desarrollados y actualizados constantemente junto a superintendentes de minas élite de Latinoamérica. Descarga encriptado y estudia donde estés.
        </p>
      </div>

      {/* Main Grid: Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 bg-brand-card p-6 rounded-lg border border-brand-border shrink-0 transition-theme">
          <div className="flex items-center gap-2 mb-4 font-bold text-brand-heading text-sm uppercase tracking-wider transition-colors">
            <Filter size={16} className="text-brand-gold" />
            <span>Categorías</span>
          </div>
          <div className="flex flex-row flex-wrap lg:flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-left rounded text-sm font-medium transition-all cursor-pointer w-fit lg:w-full ${
                  selectedCategory === cat
                    ? 'text-white bg-amber-700 border-l-4 border-l-brand-gold'
                    : 'text-brand-subtext hover:text-brand-heading hover:bg-brand-border/30 border-l-4 border-l-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-brand-border pt-6 hidden lg:block">
            <h4 className="text-xs font-mono text-brand-gold uppercase tracking-wider mb-3">Reconocimiento</h4>
            <p className="text-xs text-brand-subtext leading-relaxed transition-colors">
              Todos los programas cuentan con aval curricular alineado al código JORC de Australia y Estándar Regulatorio Canadiense NI 43-101.
            </p>
          </div>
        </div>

        {/* Course Browse Section */}
        <div className="flex-grow w-full">
          {/* Search bar */}
          <div className="relative mb-8 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-subtext">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar curso, tema o instructor (ej. Datamine, molienda SAG, Carlos)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-brand-card border border-brand-border rounded-lg text-brand-text w-full placeholder-brand-subtext/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-theme"
            />
          </div>

          {/* Catalog Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-brand-card rounded-lg border border-brand-border">
              <p className="text-gray-500 font-mono text-sm">No se encontraron cursos de ingeniería para tu búsqueda.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
                className="mt-4 text-xs font-mono text-brand-gold hover:underline uppercase tracking-wider"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                const progress = downloadProgress[course.id] || 0;
                const isDownloading = downloadingId === course.id;

                return (
                  <motion.div
                    key={course.id}
                    layoutId={`course-card-${course.id}`}
                    onClick={() => setSelectedCourse(course)}
                    className="bg-brand-card border border-brand-border rounded-xl overflow-hidden cursor-pointer hover:border-brand-gold/60 transition-theme flex flex-col group justify-between"
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      {/* Image header with category badge */}
                      <div className="relative h-44 w-full overflow-hidden bg-black/40">
                        <img
                          src={course.image}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/10 to-transparent" />
                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase font-bold tracking-widest bg-brand-copper/90 text-white px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-xs font-mono text-brand-gold bg-black/80 px-2 py-0.5 rounded flex items-center gap-1">
                            <Star size={12} className="fill-brand-gold text-brand-gold" />
                            {course.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-6">
                        <span className="text-xs font-mono text-brand-subtext transition-colors">Instructor: {course.instructor}</span>
                        <h3 className="text-lg font-bold text-brand-heading mt-1 group-hover:text-brand-gold transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-brand-text text-xs mt-2 line-clamp-2 transition-colors">
                          {course.description}
                        </p>

                        {/* Metas */}
                        <div className="flex items-center gap-4 mt-4 py-2 border-t border-brand-border text-brand-subtext font-mono text-[11px] transition-colors">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen size={12} />
                            {course.lessonsCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status / Buttons bar */}
                    <div className="p-6 pt-0 bg-brand-card border-t border-brand-border/40 flex items-center justify-between transition-theme">
                      <span className="text-[11px] font-mono text-brand-gold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Ver Plan de Estudios <ChevronRight size={14} />
                      </span>

                      {isEnrolled ? (
                        <div className="flex items-center gap-2">
                          {progress === 100 ? (
                            <span className="text-green-500 text-xs font-mono flex items-center gap-1 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20">
                              <CheckCircle2 size={12} /> Descargado
                            </span>
                          ) : isDownloading ? (
                            <div className="flex items-center gap-2 bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20">
                              <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
                              <span className="text-brand-gold text-[10px] font-mono">{progress}%</span>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  simulateDownload(course.id);
                              }}
                              className="bg-brand-border text-brand-text text-xs font-mono hover:bg-brand-border/80 px-2.5 py-1 rounded transition-colors flex items-center gap-1 border border-brand-border/80 cursor-pointer"
                            >
                              Descargar
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnroll(course.id);
                          }}
                          className="bg-amber-600/90 text-white text-xs font-mono hover:bg-amber-600 px-3 py-1 rounded transition-colors uppercase tracking-wider font-bold cursor-pointer active:scale-95"
                        >
                          Matricular
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`course-card-${selectedCourse.id}`}
              className="bg-brand-surface border border-brand-border rounded-xl max-w-2xl w-full text-left overflow-hidden flex flex-col justify-between max-h-[90vh] transition-theme"
            >
              <div>
                <div className="relative h-48 bg-black/40">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent" />
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 bg-black/60 rounded-full p-2 text-white hover:bg-black/80 hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="font-mono text-xs text-brand-gold bg-black/80 px-2 py-0.5 rounded">
                      {selectedCourse.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                      {selectedCourse.title}
                    </h2>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 overflow-y-auto max-h-[50vh] transition-colors">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-xs text-brand-subtext font-mono border-b border-brand-border/40 pb-4 transition-colors">
                    <div>
                      Instructor <span className="text-brand-heading block font-sans text-sm font-semibold mt-0.5 transition-colors">{selectedCourse.instructor}</span>
                    </div>
                    <div>
                      Duración <span className="text-brand-heading block font-sans text-sm font-semibold mt-0.5 transition-colors">{selectedCourse.duration}</span>
                    </div>
                    <div>
                      Nivel <span className="text-brand-heading block font-sans text-sm font-semibold mt-0.5 transition-colors">{selectedCourse.level}</span>
                    </div>
                    <div>
                      Calificación <span className="text-brand-gold block font-sans text-sm font-semibold mt-0.5 flex items-center gap-1">★ {selectedCourse.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2 font-bold">
                    Resumen del Curso
                  </h4>
                  <p className="text-brand-text text-sm leading-relaxed mb-6 transition-colors">
                    {selectedCourse.description}
                  </p>

                  <h3 className="text-brand-heading font-bold text-sm mb-3 font-sans border-b border-brand-border/40 pb-2 transition-colors">
                    Programa de Estudio
                  </h3>
                  <div className="space-y-3">
                    {selectedCourse.syllabus.map((item, index) => (
                      <div key={index} className="flex gap-3 text-sm">
                        <span className="text-brand-gold font-mono text-xs mt-0.5 shrink-0 block">
                          [Módulo {(index + 1).toString().padStart(2, '0')}]
                        </span>
                        <p className="text-brand-subtext font-sans transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Panel */}
              <div className="p-6 bg-brand-card border-t border-brand-border flex items-center justify-between transition-theme">
                <div>
                  {enrolledCourseIds.includes(selectedCourse.id) && (
                    <span className="text-xs font-mono text-brand-subtext transition-colors">
                      Ya estás matriculado en este programa.
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 bg-brand-border hover:bg-brand-border/80 border border-brand-border text-brand-heading text-xs font-mono rounded cursor-pointer transition-theme"
                  >
                    Cerrar
                  </button>
                  {enrolledCourseIds.includes(selectedCourse.id) ? (
                    (downloadProgress[selectedCourse.id] || 0) === 100 ? (
                      <div className="bg-green-500/20 text-green-400 text-xs font-mono border border-green-500/30 px-4 py-2 rounded flex items-center gap-1 transition-theme">
                        <CheckCircle2 size={14} /> Listo para ver
                      </div>
                    ) : (
                      <button
                        onClick={() => simulateDownload(selectedCourse.id)}
                        className="bg-brand-gold text-brand-dark px-4 py-2 text-xs font-mono rounded hover:brightness-110 font-bold cursor-pointer active:scale-95 transition-all"
                      >
                        {downloadingId === selectedCourse.id ? `Descargando (${downloadProgress[selectedCourse.id]}%)` : 'Descargar Offline'}
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        handleEnroll(selectedCourse.id);
                      }}
                      className="bg-brand-copper/95 text-white px-6 py-2 text-xs font-mono rounded hover:bg-brand-copper font-bold tracking-wider cursor-pointer active:scale-95 transition-all"
                    >
                      MATRICULARSE GRATIS
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
