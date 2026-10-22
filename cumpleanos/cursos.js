// ==========================================================================
// CATÁLOGO MAESTRO DE CATEGORÍAS (ID numérico único)
// Para cambiar una categoría a un curso solo cambia su número de category (1-9)
// ==========================================================================
const CATEGORIAS = {
  1: "Seguridad y prevención",
  2: "Medio ambiente",
  3: "Inteligencia de datos",
  4: "Tecnología e innovación",
  5: "Logística y almacenes",
  6: "Mantenimiento industrial",
  7: "Operaciones y procesos",
  8: "Comercio exterior",
  9: "Legislación y normativa",
};

function getCategoryName(idOrName) {
  return CATEGORIAS[idOrName] || idOrName || "";
}

// Catálogo completo de 76 cursos EDUMIN 2026
const ALL_COURSES = [
  {
    id: 1,
    title: "MANEJO DE EPPS SEGÚN LA NORMA TÉCNICA PERUANA LEY 29783",
    category: 1,
  },
  {
    id: 2,
    title: "IMPLEMENTACIÓN DE MEDIDAS DE CONTROL EN RIESGOS MINEROS",
    category: 1,
  },
  {
    id: 3,
    title: "ERGONOMÍA Y SALUD OCUPACIONAL EN EL SECTOR MINERO E INDUSTRIAL",
    category: 1,
  },
  {
    id: 4,
    title: "MARCO JURÍDICO Y NORMATIVO DE LA MINERÍA",
    category: 9,
  },
  {
    id: 5,
    title: "GESTIÓN DE PROVEEDORES EN MINERÍA",
    category: 5,
  },
  {
    id: 6,
    title: "CONTROL DE COSTOS EN ALMACENES MINEROS",
    category: 5,
  },
  {
    id: 7,
    title: "LOGÍSTICA Y DISTRIBUCIÓN EN LA INDUSTRIA Y MINERÍA",
    category: 5,
  },
  {
    id: 8,
    title: "CONTRATOS EN LA INDUSTRIA MINERA",
    category: 9,
  },
  {
    id: 9,
    title: "DERECHOS HUMANOS EN MINERÍA",
    category: 9,
  },
  {
    id: 10,
    title: "GESTIÓN DE TRABAJO EN ALTO RIESGO EN MINERÍA",
    category: 1,
  },
  {
    id: 11,
    title: "RESPONSABILIDAD PENAL EN MINERÍA",
    category: 9,
  },
  {
    id: 12,
    title: "DERECHO LABORAL EN MINERÍA",
    category: 9,
  },
  {
    id: 13,
    title: "TIPOS DE CONCESIONES MINERAS",
    category: 9,
  },
  {
    id: 14,
    title: "GESTIÓN DE CONTRATOS LOGÍSTICOS EN LA INDUSTRIA Y MINERÍA",
    category: 5,
  },
  {
    id: 15,
    title: "CURSO DE PREVENCIÓN DE RIESGOS",
    category: 1,
  },
  {
    id: 16,
    title: "IMPLEMENTACIÓN DE LA ISO 45001:2018",
    category: 1,
  },
  {
    id: 17,
    title: "GESTIÓN DE EMERGENCIAS EN INDUSTRIA Y MINERÍA",
    category: 1,
  },
  {
    id: 18,
    title: "GESTIÓN DE INVENTARIOS EN INDUSTRIA Y MINERÍA",
    category: 5,
  },
  {
    id: 19,
    title: "CONTROL FINANCIERO EN ALMACENES",
    category: 5,
  },
  {
    id: 20,
    title: "LOGÍSTICA INTERNA EN CONTROL DE ALMACENES",
    category: 5,
  },
  {
    id: 21,
    title: "FUNDAMENTOS DE BIG DATA",
    category: 3,
  },
  {
    id: 22,
    title: "MÉTODOS DE CAPTURA DE INFORMACIÓN EN BIG DATA",
    category: 3,
  },
  {
    id: 23,
    title: "TENDENCIAS 2025-2026: CLAVES DE BIG DATA",
    category: 3,
  },
  {
    id: 24,
    title: "BIG DATA: TRANSFORMACIÓN DE DATOS (PYTHON Y R)",
    category: 3,
  },
  {
    id: 25,
    title: "MINERÍA 4.0 ESSENTIALS: NUEVAS HERRAMIENTAS",
    category: 4,
  },
  {
    id: 26,
    title: "INNOVACIÓN EN MINERÍA: APLICACIONES DE INTELIGENCIA ARTIFICIAL",
    category: 4,
  },
  {
    id: 27,
    title: "AUTOMATIZACIÓN 4.0 EN PROCESOS MINEROS",
    category: 4,
  },
  {
    id: 28,
    title: "CADENA DE SUMINISTRO LOGÍSTICA Y DISTRIBUCIÓN",
    category: 5,
  },
  {
    id: 29,
    title: "MEJORA DE LOS MÉTODOS Y MEDICIÓN DE LOS RECURSOS",
    category: 7,
  },
  {
    id: 30,
    title: "INTRODUCCIÓN A LA GESTIÓN DE PROYECTOS",
    category: 7,
  },
  {
    id: 31,
    title: "ARQUITECTURA DE DATOS: LA IMPORTANCIA DEL DISEÑO, COMPONENTES, FUNCIÓN, CONFIGURACIÓN Y PATRONES",
    category: 3,
  },
  {
    id: 32,
    title: "ECOSISTEMA BIG DATA: HERRAMIENTAS Y TECNOLOGÍAS ESENCIALES",
    category: 3,
  },
  {
    id: 33,
    title: "INTRODUCCIÓN A MACHINE LEARNING PARA BIG DATA",
    category: 3,
  },
  {
    id: 34,
    title: "PROYECTOS CON HERRAMIENTAS DIGITALES PARA MINERÍA",
    category: 4,
  },
  {
    id: 35,
    title: "INTRODUCCIÓN A MACHINE LEARNING EN MINERÍA",
    category: 4,
  },
  {
    id: 36,
    title: "TIPOS DE INTELIGENCIA ARTIFICIAL APLICADAS A LA MINERÍA",
    category: 4,
  },
  {
    id: 37,
    title: "HERRAMIENTAS DE BIG DATA APLICADA A MINERÍA",
    category: 3,
  },
  {
    id: 38,
    title: "GESTIÓN AVANZADA DE OPERACIONES INDUSTRIALES",
    category: 7,
  },
  {
    id: 39,
    title: "BIG DATA APLICADA A PROCESOS INDUSTRIALES",
    category: 3,
  },
  {
    id: 40,
    title: "CONTROL DE COSTOS EN PRODUCCIÓN INDUSTRIAL O EN ÁREAS DE PRODUCCIÓN",
    category: 7,
  },
  {
    id: 41,
    title: "IMPORTACIÓN Y EXPORTACIÓN DESDE 0: CLAVES PARA EL ÉXITO",
    category: 8,
  },
  {
    id: 42,
    title: "IMPLEMENTACIÓN DE LA NORMA ISO 9001:2015",
    category: 7,
  },
  {
    id: 43,
    title: "ANÁLISIS DE MERCADOS INTERNACIONALES: ESTRATEGIAS DE IMPORTACIÓN Y EXPORTACIÓN 2025-2026",
    category: 8,
  },
  {
    id: 44,
    title: "DE LA IMPORTACIÓN A LA VENTA ONLINE: IMPLEMENTA TU TIENDA VIRTUAL DESDE CERO",
    category: 8,
  },
  {
    id: 45,
    title: "CONTROL Y SUPERVISIÓN DE PROCESOS CON SOFTWARE SCADA",
    category: 4,
  },
  {
    id: 46,
    title: "GESTIÓN DE OPERACIONES Y PROCESOS EN LA MINERÍA",
    category: 7,
  },
  {
    id: 47,
    title: "PIRÁMIDE DE PROCESOS: TÉCNICAS DE CONTROL EN MINERÍA",
    category: 7,
  },
  {
    id: 48,
    title: "PROCESO DE OPTIMIZACIÓN DEL MANTENIMIENTO A PARTIR DEL USO DE TÉCNICAS DE LA INDUSTRIA 4.0",
    category: 6,
  },
  {
    id: 49,
    title: "SISTEMAS INTEGRADOS PARA LA GESTIÓN DE MANTENIMIENTO",
    category: 6,
  },
  {
    id: 50,
    title: "ESTÁNDARES Y SISTEMA DE CALIDAD DEL MANTENIMIENTO",
    category: 6,
  },
  {
    id: 51,
    title: "DOCUMENTACIÓN Y TRÁMITES ADUANEROS",
    category: 8,
  },
  {
    id: 52,
    title: "REVISIÓN DE PROVEEDORES PARA EVITAR ESTAFAS EN IMPORTACIONES CHINAS",
    category: 8,
  },
  {
    id: 53,
    title: "PLANIFICACIÓN DE RIESGOS PARA IMPORTACIÓN Y EXPORTACIÓN",
    category: 8,
  },
  {
    id: 54,
    title: "CONTROL DE CALIDAD EN PROCESOS MINEROS",
    category: 7,
  },
  {
    id: 55,
    title: "MONITOREO Y CONTROL EN LA OPERACIÓN DE PLANTAS MINERAS",
    category: 7,
  },
  {
    id: 56,
    title: "SOSTENIBILIDAD Y SEGURIDAD EN CAMPAMENTOS MINEROS",
    category: 1,
  },
  {
    id: 57,
    title: "ANÁLISIS DE DATOS PARA OPTIMIZAR OPERACIONES MINERAS",
    category: 3,
  },
  {
    id: 58,
    title: "SEGURIDAD Y CONTROL AMBIENTAL EN EL MANTENIMIENTO",
    category: 6,
  },
  {
    id: 59,
    title: "GERENCIA DE PROYECTOS DEL MANTENIMIENTO",
    category: 6,
  },
  {
    id: 60,
    title: "GESTIÓN DE COSTOS DEL MANTENIMIENTO EN LA INDUSTRIA 4.0",
    category: 6,
  },
  {
    id: 61,
    title: "SOSTENIBILIDAD Y MINERÍA RESPONSABLE",
    category: 2,
  },
  {
    id: 62,
    title: "PRIMEROS AUXILIOS EN MINERÍA",
    category: 1,
  },
  {
    id: 63,
    title: "INDICADORES CLAVE (KPIS) PARA LA CADENA DE ABASTECIMIENTOS",
    category: 5,
  },
  {
    id: 64,
    title: "EXPLORACIÓN MINERA Y EVALUACIÓN DE YACIMIENTOS",
    category: 7,
  },
  {
    id: 65,
    title: "REQUISITOS CLAVE DE ISO 14001 Y CÓMO APLICARLOS EN LA EMPRESA",
    category: 2,
  },
  {
    id: 66,
    title: "SISTEMAS INTEGRADOS DE GESTIÓN HSEQ (ISO 9001, 14001, 45001)",
    category: 9,
  },
  {
    id: 67,
    title: "GESTIÓN DE CRISIS Y MANEJO DE CONFLICTOS EN AMBIENTES INDUSTRIALES",
    category: 9,
  },
  {
    id: 68,
    title: "PLANIFICACIÓN ESTRATÉGICA Y BALANCED SCORECARD",
    category: 7,
  },
  {
    id: 69,
    title: "GESTIÓN DE LA ENERGÍA EN OPERACIONES MINERAS",
    category: 2,
  },
  {
    id: 70,
    title: "GESTIÓN DE LA CADENA DE SUMINISTRO EN EMPRESAS MINERAS",
    category: 5,
  },
  {
    id: 71,
    title: "SEGURIDAD Y NORMATIVA EN EL CONTROL DE INVENTARIO Y LOGÍSTICA MINERA",
    category: 9,
  },
  {
    id: 72,
    title: "SALUD MENTAL EN EL TRABAJO: DETECCIÓN Y PREVENCIÓN DE TRASTORNOS PSICOLÓGICOS",
    category: 1,
  },
  {
    id: 73,
    title: "IMPLEMENTACIÓN DE LEAN MANUFACTURING EN PROCESOS INDUSTRIALES",
    category: 7,
  },
  {
    id: 74,
    title: "ERGONOMÍA Y DISEÑO DE PUESTOS DE TRABAJO EN LA INDUSTRIA",
    category: 1,
  },
  {
    id: 75,
    title: "GESTIÓN DE SEGURIDAD DURANTE LAS PARADAS DE PLANTA Y MANTENIMIENTO",
    category: 6,
  },
  {
    id: 76,
    title: "GESTIÓN DE RELAVES Y RESIDUOS MINEROS",
    category: 2,
  },
];

const categories = ["Todos", ...Object.values(CATEGORIAS)];
