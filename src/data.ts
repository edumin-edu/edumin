import { Course, Job, Testimonial, FAQItem } from './types';

export const COURSES: Course[] = [
  {
    id: 'geo-1',
    title: 'GEOMETALURGIA',
    category: 'Geología',
    instructor: 'Ing. Elena Rostova',
    duration: '325 horas',
    level: 'Avanzado',
    rating: 4.9,
    lessonsCount: '+18 clases',
    description: 'Integración estratégica de características geológicas y metalúrgicas para optimizar el procesamiento mineralógico y maximizar la recuperación económica de metales.',
    syllabus: [
      'Muestreo geometalúrgico y caracterización física de menas',
      'Pruebas de conminución, flotabilidad e lixiviación a escala piloto',
      'Modelamiento geometalúrgico predictivo en modelos de bloques 3D',
      'Optimización de planes de minado según recuperaciones por bloque',
      'Conciliación modelo geometalúrgico vs rendimiento real en planta'
    ],
    image: 'geometalurgia.jpeg'
  },
  {
    id: 'geo-2',
    title: 'GEOMECÁNICA SUBTERRÁNEA Y SUPERFICIAL',
    category: 'Geología',
    instructor: 'Dr. Francisco Rossi',
    duration: '325 horas',
    level: 'Avanzado',
    rating: 4.8,
    lessonsCount: '+18 clases',
    description: 'Estudio de estabilidad y comportamiento mecánico de macizos rocosos en tajos abiertos y excavaciones subterráneas profundas bajo estándares HSEC.',
    syllabus: [
      'Clasificación geomecánica avanzada de macizos rocosos (RMR, Q, GSI)',
      'Esfuerzos in-situ y modelamiento numérico de esfuerzos inducidos',
      'Diseño y cálculo de soporte: pernos, mallas electrosoldadas y shotcrete',
      'Estabilidad de taludes en tajos y análisis cinemático de fallas estructurales',
      'Monitoreo geotécnico avanzado: instrumentación y microsismicidad'
    ],
    image: 'geomecania.jpeg'
  },
  {
    id: 'geo-3',
    title: 'GEOTECNIA MINERA',
    category: 'Geología',
    instructor: 'Ing. Claudia Ortiz',
    duration: '325 horas',
    level: 'Avanzado',
    rating: 4.9,
    lessonsCount: '+18 clases',
    description: 'Diseño y control de estabilidad física de botaderos, depósitos de relaves y taludes operativos, minimizando riesgos geotécnicos catastróficos.',
    syllabus: [
      'Mecánica de suelos y caracterización geotécnica de materiales',
      'Diseño estructural y estabilidad de presas de relaves (Tailings)',
      'Hidrogeología e hidrología aplicada a taludes y control de agua de mina',
      'Radares, prismas y sistemas automatizados de monitoreo geotécnico',
      'Planes de gestión de riesgos y análisis de modo de fallas (FMEA)'
    ],
    image: 'geotecnia.jpeg'
  },
  {
    id: 'geo-4',
    title: 'GEOLOGÍA MINERA',
    category: 'Geología',
    instructor: 'Ing. Roberto Díaz',
    duration: '325 horas',
    level: 'Avanzado',
    rating: 4.7,
    lessonsCount: '+18 clases',
    description: 'Control de calidad geológica (QA/QC), mapeo geológico de frentes, muestreo sistemático de producción y estrategias para el control y reducción de la dilución.',
    syllabus: [
      'Mapeo geológico estructurado en labores subterráneas y tajos',
      'Aseguramiento y control de calidad (QA/QC) en muestreo y laboratorio',
      'Estimación de leyes en frentes de producción y reconciliación de reservas',
      'Identificación y control de la dilución operativa en minado',
      'Manejo de bases de datos geológicas de producción e integridad de datos'
    ],
    image: 'geologia.jpeg'
  }
];

export const JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Superintendente de Planeamiento de Minas',
    company: 'Compañía Minera Antamina',
    location: 'Áncash, Perú (Régimen 8x6)',
    discipline: 'Minas',
    salaryRange: '$8,000 - $11,000 USD / mes',
    type: 'Tiempo Completo',
    description: 'Buscamos un Ingeniero de Minas Senior para liderar el departamento de planeamiento de corto y mediano plazo en una de las minas polimetálicas más grandes del mundo a alta montaña.',
    requirements: [
      'Colegiado en Ingeniería de Minas con mínimo 10 años de experiencia en tajo abierto.',
      'Sólido dominio técnico de herramientas de secuenciamiento como Deswik, MineSight u Vulcan.',
      'Experiencia liderando equipos de ingenieros y coordinando con Operaciones de Mina.',
      'Conocimiento profundo de códigos internacionales de reservas (JORC / NI 43-101).'
    ],
    datePosted: 'Hace 2 días'
  },
  {
    id: 'job-2',
    title: 'Geólogo de Modelamiento de Recursos Minerales',
    company: 'BHP - Minera Escondida',
    location: 'Antofagasta, Chile (Régimen 4x3)',
    discipline: 'Geología',
    salaryRange: '$6,500 - $8,500 USD / mes',
    type: 'Tiempo Completo',
    description: 'Únete al equipo líder en Chile para realizar el modelamiento estimativo y geoestadístico de leyes en sulfuros de cobre, reportando directamente al Gerente de Evaluación de Recursos.',
    requirements: [
      'Ingeniero Geólogo o Geofísico con Postgrado en Geoestadística.',
      'Mínimo 6 años de experiencia en minado de pórfidos de cobre de gran tonelaje.',
      'Manejo avanzado de Datamine Studio RM e Isatis/Leapfrog Geo.',
      'Capacidad acreditada para redactar informes de estimación técnica JORC.'
    ],
    datePosted: 'Hace 3 días'
  },
  {
    id: 'job-3',
    title: 'Ingeniero Senior de Confiabilidad de Mantenimiento',
    company: 'Anglo American Quellaveco',
    location: 'Moquegua, Perú (Régimen 14x7)',
    discipline: 'Gestión',
    salaryRange: '$5,500 - $7,200 USD / mes',
    type: 'Tiempo Completo',
    description: 'Soporte directo a operaciones autónomas. Responsable del mantenimiento centrado en confiabilidad (RCM) de la flota de camiones CAT 794 AC autónomos y palas.',
    requirements: [
      'Ingeniero Mecánico, Electricista o de Mantenimiento colegiado.',
      'Mínimo 5 años en mantenimiento de equipos pesados de minería abierta.',
      'Especialista en metodologías FMEA, RCM y análisis causa raíz (RCA).',
      'Inglés técnico hablado y escrito para coordinaciones con fabricantes.'
    ],
    datePosted: 'Hace 1 semana'
  },
  {
    id: 'job-4',
    title: 'Superintendente de Planta de Flotación y Concentrados',
    company: 'CODELCO El Teniente',
    location: 'Rancagua, Chile (Régimen 7x7)',
    discipline: 'Procesamiento',
    salaryRange: '$7,500 - $10,000 USD / mes',
    type: 'Tiempo Completo',
    description: 'Dirección operativa del circuito de trituración, molienda convencional y flotación selectiva cobre/molibdeno en la mina subterránea más grande del mundo.',
    requirements: [
      'Ingeniero de Procesos Metalúrgicos o Químico Titulado.',
      'Más de 10 años de experiencia, incluido rol previo de jefe de planta concentradora.',
      'Experiencia en instrumentación inteligente de celdas de flotación e hidrometalurgia.',
      'Fuerte compromiso con metas de consumo hídrico eficiente.'
    ],
    datePosted: 'Hace 5 días'
  },
  {
    id: 'job-5',
    title: 'Jefe de Seguridad y Salud Ocupacional',
    company: 'Barrick Gold - Pueblo Viejo',
    location: 'República Dominicana (Régimen 15x15)',
    discipline: 'Seguridad',
    salaryRange: '$6,000 - $7,800 USD / mes',
    type: 'Tiempo Completo',
    description: 'Encargado de formular y hacer cumplir la cultura preventiva Zero Harm dentro del campamento y faena metalúrgica de oro a cielo abierto.',
    requirements: [
      'Ingeniero en Higiene y Seguridad Industrial, Minas o carrera afín.',
      'Certificaciones internacionales de seguridad (OSHA, NEBOSH o similar).',
      'Inglés avanzado (obligatorio para reportes a matriz corporativa).',
      'Liderazgo y templanza en auditorías de estado gubernamentales.'
    ],
    datePosted: 'Hace 4 días'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carlos Mendoza',
    role: 'Spt. de Planeamiento',
    company: 'Antamina, Perú',
    stars: 5,
    text: '"La actualización en planeamiento minero me permitió liderar la transición a autonomía en mi unidad."'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Consultora de Metalurgia',
    company: 'BHP Billiton, Chile',
    stars: 5,
    text: '"EDUMIN es el filtro que necesitaba. Información pura de ingeniería sin el ruido de LinkedIn."'
  },
  {
    id: 'test-3',
    name: 'Mateo Peralta',
    role: 'Ing. de Perforación y Tronadura',
    company: 'Cerro Verde, Perú',
    stars: 5,
    text: '"Gracias a la Auditoría de CV, mi perfil pasó los filtros ATS de Anglo American en menos de 48 horas."'
  },
  {
    id: 'test-4',
    name: 'Jorge Silva',
    role: 'Jefe de Seguridad',
    company: 'Codelco, Chile',
    stars: 5,
    text: '"El networking aquí es real. No son \'likes\', son contactos directos en faena de forma confiable."'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Cómo funciona exactamente el modo offline?',
    answer: 'En la App de EDUMIN puedes seleccionar módulos completos de los cursos. Se descargan de forma segura y comprimida en tu dispositivo móvil ocupando poco espacio con codificación optimizada para que puedas estudiar sin señal en tajo abierto, campamentos remotos, o en rutas de socavón subterráneo.'
  },
  {
    question: '¿Cuál es la diferencia con LinkedIn Learning u otras plataformas de capacitación?',
    answer: 'Plataformas tradicionales ofrecen cursos genéricos de Excel o liderazgo básico. EDUMIN es ultra-específica: nuestros programas son dictados por Superintendentes y Gerentes de Mina con experiencia real. Diseñamos contenidos prácticos basados en estándares regulatorios internacionales obligatorios como los informes de reservas JORC (Australia) y NI 43-101 (Canadá), aplicados en operaciones reales latinas.'
  },
  {
    question: '¿En qué consiste la Auditoría de CV y cómo ayuda con los filtros ATS?',
    answer: 'Los departamentos de recursos humanos de las principales mineras (BHP, Anglo American, Antamina, Codelco) usan software de pre-filtrado ATS (Applicant Tracking Systems). Analizamos tu currículum y te brindamos retroalimentación inmediata sobre la densidad de palabras clave técnicas obligatorias y el formato óptimo de redacción de tus logros de campo para superar los algoritmos automatizados.'
  },
  {
    question: '¿La suscripción PRO tiene permanencia mínima obligatoria?',
    answer: 'No. Puedes darte de baja en cualquier momento con un solo clic en tu panel de miembro. Además, contamos con una garantía de reembolso del 100% durante los primeros 14 días si sientes que las clases, vacantes compartidas o coaching técnico no están alineados con tus expectativas operativas.'
  }
];
