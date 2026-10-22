// Configuración y variables globales (reutiliza APPS_SCRIPT_URL y pedirJSON definidos en <head>)
const APPS_SCRIPT_URL = window.APPS_SCRIPT_URL;
const pedirJSON = window.pedirJSON;
const WHATSAPP_PHONE = "51980694497";

// Helpers seguros para localStorage (evitan errores en modo incógnito o navegadores internos de WhatsApp/Instagram)
function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// ==========================================================================
// ESTILOS BASE COMPARTIDOS (100% DRY)
// ==========================================================================
const ESTILOS_BOTON_BASE = "boton-base";

// ==========================================================================
// CONFIGURACIÓN Y ESTILOS UNIFICADOS DEL MODAL (100% DRY)
// Edita en MODAL_CONFIG.estilos para cambiar el diseño en ambos pasos a la vez.
// ==========================================================================
const MODAL_CONFIG = {
  estilos: {
    cajaAlerta: "border rounded-xl md:rounded-2xl p-4 md:p-5 text-center flex flex-col items-center justify-center text-balance",
    icono: "ph-bold text-10 md:text-12 mb-3",
    titulo: "font-condensed font-bold text-lg md:text-xl uppercase mb-1",
    parrafo: "font-medium text-sm md:text-base !leading-snug",
    botonBase: ESTILOS_BOTON_BASE,
    colorBotonVolver: "hidden 2xs:inline-flex inset-ring inset-ring-terciario text-secundario hover:bg-slate-100 shrink-0 max-sm:!px-4",
  },
  paso1: {
    colorCaja: "bg-blue-500/5 border-blue-500/30",
    iconoPaso: "ph-seal-question text-brand-blue",
    colorTitulo: "text-brand-blue",
    colorParrafo: "text-blue-950",
    colorBoton: "flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white",
    colorBotonError: "flex-1 bg-rose-600 hover:bg-rose-700 text-white",
    titulo: "Confirma tu curso de regalo",
    parrafo: "Revisa tu selección antes de continuar. Puedes volver a la lista para elegir otro o hacer clic en <strong>REGISTRAR CURSO</strong> para guardarlo.",
    textoBoton: "REGISTRAR CURSO",
    iconoBoton: "ph-paper-plane-tilt",
  },
  paso2: {
    colorCaja: "bg-emerald-500/5 border-emerald-500/30",
    iconoPaso: "ph-seal-check text-emerald-600",
    colorTitulo: "text-emerald-600",
    colorParrafo: "text-emerald-950",
    colorBoton: "w-full bg-emerald-600 hover:bg-emerald-700 text-white",
    titulo: "¡Curso registrado con éxito!",
    parrafo: "Tu curso estará habilitado en un plazo máximo de <strong>1 día hábil</strong>. Te avisaremos por correo electrónico cuando ya puedas ingresar.",
    textoBoton: "CONFIRMAR POR WHATSAPP",
    iconoBoton: "ph-whatsapp-logo",
  },
};

// Generador de plantilla reutilizable para cajas informativas del modal (100% DRY)
function renderAlertaModal(paso, estilos) {
  return `
    <div class="${estilos.cajaAlerta} ${paso.colorCaja}">
      <i class="${estilos.icono} ${paso.iconoPaso}"></i>
      <h4 class="${estilos.titulo} ${paso.colorTitulo}">
        ${paso.titulo}
      </h4>
      <p class="${estilos.parrafo} ${paso.colorParrafo}">
        ${paso.parrafo}
      </p>
    </div>
  `;
}

// Generador del Botón de WhatsApp unificado (100% DRY para Modal y Estado Canjeado)
function renderBotonWhatsApp(esModal = true) {
  const { estilos, paso2 } = MODAL_CONFIG;
  const clasesAncho = esModal ? "w-full" : "w-full xs:w-auto";
  const clasesColor = paso2.colorBoton.replace("w-full", "").trim();
  return `
    <button
      type="button"
      data-action="enviar-whatsapp"
      class="${estilos.botonBase} ${clasesColor} ${clasesAncho}">
      <i class="ph-bold ${paso2.iconoBoton}"></i>
      <span>${paso2.textoBoton}</span>
    </button>
  `;
}

// Generador del cuerpo unificado para Modal Paso 2 y Estado Canjeado (100% DRY)
function renderCuerpoConfirmacion() {
  const { estilos, paso2 } = MODAL_CONFIG;
  return `
    ${renderAlertaModal(paso2, estilos)}
    ${renderBotonWhatsApp(true)}
  `;
}

// Actualiza insignia de número, categoría y título formateado en Modal o Estado Canjeado (100% DRY)
function actualizarEncabezadoTarjeta(curso, tipo = "Modal") {
  if (!curso) return;
  const isModal = tipo === "Modal";
  const badgeNumero = document.getElementById(isModal ? "insigniaNumeroCursoModal" : "insigniaNumeroCursoCanjeado");
  const badgeCat = document.getElementById(isModal ? "insigniaCategoriaCursoModal" : "insigniaCategoriaCursoCanjeado");
  const titulo = document.getElementById(isModal ? "modalTituloCurso" : "tituloCursoCanjeado");

  if (badgeNumero) badgeNumero.textContent = curso.id ? `Curso #${curso.id}` : "Curso Registrado";
  if (badgeCat) badgeCat.textContent = getCategoryName(curso.category);
  if (titulo) titulo.textContent = formatCourseTitle(curso.title);
}

function renderModalStep(paso = 1) {
  const container = document.getElementById("modalContenidoPaso");
  if (!container) return;
  const { estilos, paso1 } = MODAL_CONFIG;

  if (paso === 1) {
    container.innerHTML = `
      ${renderAlertaModal(paso1, estilos)}

      <div class="flex items-center gap-3">
        <button
          type="button"
          id="botonVolverModal"
          data-action="cerrar-modal"
          aria-label="Volver"
          title="Volver"
          class="${estilos.botonBase} ${estilos.colorBotonVolver}">
          <i class="ph-bold ph-arrow-left"></i>
          <span class="hidden sm:inline">Volver</span>
        </button>
        <button
          type="button"
          id="botonRegistrarCurso"
          data-action="registrar-curso"
          class="${estilos.botonBase} ${paso1.colorBoton}">
          <i class="ph-bold ${paso1.iconoBoton}"></i>
          <span>${paso1.textoBoton}</span>
        </button>
      </div>
    `;
  } else if (paso === 2) {
    container.innerHTML = renderCuerpoConfirmacion();
  }
}

let userToken = null;
let urlParams = null;
let activeCategory = "Todos";
let selectedCourse = null;
let isRegisteringCourse = false;
let vistaActual = "pantalla-carga";

// Función para alternar entre las 3 Vistas principales y adaptar el Footer
function mostrarVista(vistaId) {
  vistaActual = vistaId;
  const v1 = document.getElementById("pantalla-carga");
  const v2 = document.getElementById("pantalla-cursos");
  const v3 = document.getElementById("pantalla-expirado");

  if (v1) v1.classList.add("hidden");
  if (v2) v2.classList.add("hidden");
  if (v3) v3.classList.add("hidden");

  const target = document.getElementById(vistaId);
  if (target) {
    target.classList.remove("hidden");
  }

  // Control dinámico del contenido del Footer compartido
  const marcaIzquierda = document.getElementById("footerMarcaIzquierda");
  const flexWrapper = document.getElementById("footerFlexWrapper");

  if (vistaId === "pantalla-cursos") {
    iniciarCintilloCumpleanos();
    if (marcaIzquierda) {
      marcaIzquierda.classList.remove("hidden");
      marcaIzquierda.classList.add("flex");
    }
    if (flexWrapper) {
      flexWrapper.classList.remove("justify-center");
      flexWrapper.classList.add("justify-between");
    }
  } else {
    // En Vista 1 y Vista 3: Se oculta 100% la 1ra columna (Logo y Eslogan)
    if (marcaIzquierda) {
      marcaIzquierda.classList.remove("flex");
      marcaIzquierda.classList.add("hidden");
    }
    if (flexWrapper) {
      flexWrapper.classList.remove("justify-between");
      flexWrapper.classList.add("justify-center");
    }
  }
}

function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function getClaimKey() {
  return "edumin_claimed_" + (userToken ? userToken.trim() : "demo");
}

function mostrarEstadoCanjeado(mostrar) {
  const catalogo = document.getElementById("catalogo");
  const seccionCatalogoExploracion = document.getElementById("seccionCatalogoExploracion");
  const estadoCanjeado = document.getElementById("estadoCanjeado");

  if (mostrar) {
    if (catalogo) catalogo.classList.add("hidden");
    if (seccionCatalogoExploracion) seccionCatalogoExploracion.classList.add("hidden");
    if (estadoCanjeado) {
      estadoCanjeado.classList.remove("hidden");
      estadoCanjeado.classList.add("flex");
      const cuerpoCanjeado = document.getElementById("cuerpoEstadoCanjeado");
      if (cuerpoCanjeado) {
        cuerpoCanjeado.innerHTML = renderCuerpoConfirmacion();
      }
    }
  } else {
    if (catalogo) catalogo.classList.remove("hidden");
    if (seccionCatalogoExploracion) seccionCatalogoExploracion.classList.remove("hidden");
    if (estadoCanjeado) {
      estadoCanjeado.classList.remove("flex");
      estadoCanjeado.classList.add("hidden");
    }
  }
}

function checkClaimedState(apiData) {
  const key = getClaimKey();
  let saved = safeGetItem(key);

  // Si la API devuelve un curso previamente registrado para este token
  if (!saved && apiData && (apiData.curso || apiData.cursoSeleccionado || apiData.claimedCourse)) {
    const titleStr = String(apiData.curso || apiData.cursoSeleccionado || apiData.claimedCourse).trim();
    const matched = ALL_COURSES.find((c) => c.title.toLowerCase() === titleStr.toLowerCase() || c.id.toString() === titleStr);
    if (matched) {
      saved = JSON.stringify(matched);
      safeSetItem(key, saved);
    } else if (titleStr) {
      saved = JSON.stringify({
        id: 0,
        title: titleStr,
        category: "Curso Registrado",
      });
      safeSetItem(key, saved);
    }
  }

  if (!saved) {
    mostrarEstadoCanjeado(false);
    return false;
  }

  try {
    const claimedData = JSON.parse(saved);
    selectedCourse = claimedData;
    mostrarEstadoCanjeado(true);
    actualizarEncabezadoTarjeta(claimedData, "Canjeado");
    return true;
  } catch (e) {
    console.warn("Claimed state parse warning:", e);
    mostrarEstadoCanjeado(false);
    return false;
  }
}

function isTokenValido(data) {
  return Boolean(data && data.valid === true);
}

// Manejo unificado de error de carga del logo (definido en <head> para estar disponible desde el ms 0)
const handleLogoError = window.handleLogoError;
const handleHeroLogoError = window.handleHeroLogoError;

// Generar dinámicamente el contenido del cintillo para loop infinito continuo (100% DRY & a11y)
function iniciarCintilloCumpleanos() {
  const pistaCintillo = document.querySelector("#cintilloCumpleanos .animate-cintillo");
  if (!pistaCintillo) return;

  const frases = ["BENEFICIO EXCLUSIVO DE CUMPLEAÑOS", "1 CURSO GRATIS A TU ELECCIÓN", "VÁLIDO POR TIEMPO LIMITADO"];

  const logoHTML = `<img src="https://raw.githubusercontent.com/videoconferenciasdiplomado-alt/imagenes/main/logo/logo%20negro.png" alt="EDUMIN" class="h-6 w-auto object-contain shrink-0" onerror="handleLogoError(this, 'cintillo')" />`;
  const sparkleHTML = `<i class="ph-bold ph-sparkle shrink-0 text-5"></i>`;

  // Generar una ronda con el patrón: [LOGO] [DESTEL] [FRASE] [DESTEL]
  const rondaHTML = frases.map((frase) => `${logoHTML}${sparkleHTML}<span>${frase}</span>${sparkleHTML}`).join("");

  // Bloque con 2 repeticiones de la ronda para cubrir pantallas panorámicas
  const bloqueHTML = `
    <div class="flex items-center h-full gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
      ${rondaHTML}${rondaHTML}
    </div>
  `;

  // Inyectar el bloque original y su clon con aria-hidden para el bucle continuo al -50%
  pistaCintillo.innerHTML = bloqueHTML;
  const clone = pistaCintillo.firstElementChild.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  pistaCintillo.appendChild(clone);

  if (!pistaCintillo.dataset.hoverInitialized) {
    pistaCintillo.dataset.hoverInitialized = "true";
    pistaCintillo.addEventListener("mouseenter", () => {
      pistaCintillo.getAnimations().forEach((anim) => (anim.playbackRate = 0.35));
    });
    pistaCintillo.addEventListener("mouseleave", () => {
      pistaCintillo.getAnimations().forEach((anim) => (anim.playbackRate = 1.0));
    });
  }
}

// Renderizar dinámicamente los beneficios generales del curso en el Hero
function renderHeroBeneficios() {
  const container = document.getElementById("heroBeneficios");
  if (!container) return;

  const beneficios = [
    {
      icon: "ph-student",
      colorClass: "bg-brand-blue/15 text-brand-blue inset-ring inset-ring-brand-blue/30",
      label: "Modalidad:",
      val: "100% asincrónica",
    },
    {
      icon: "ph-monitor-play",
      colorClass: "bg-amber-500/15 text-amber-600 inset-ring inset-ring-amber-500/30",
      label: "Clases:",
      val: "De 2 a 4 sesiones",
    },
    {
      icon: "ph-certificate",
      colorClass: "bg-emerald-500/15 text-emerald-600 inset-ring inset-ring-emerald-500/30",
      label: "Certificado:",
      val: "Por 30 horas",
    },
  ];

  container.innerHTML = beneficios
    .map(
      (item) => `
        <div class="tarjeta-beneficio">
          <!-- Columna 1: Icono -->
          <div class="caja-icono-beneficio ${item.colorClass}">
            <i class="ph-bold ${item.icon}"></i>
          </div>
          <!-- Columna 2: Etiqueta y Valor -->
          <div class="caja-textos-beneficio">
            <span>${item.label}</span>
            <span>${item.val}</span>
          </div>
        </div>
      `,
    )
    .join("");
}

// Asegura que todos los pesos de las fuentes tipográficas estén descargados y listos en memoria antes de mostrar Vista 2
function asegurarFuentesCargadas() {
  if (!("fonts" in document)) return Promise.resolve();
  const listaFuentes = window.FUENTES_APP || [];
  const fontPromise = window._fontPreloadPromise || Promise.allSettled(listaFuentes.map((f) => document.fonts.load(f)));
  // Límite de espera de seguridad de 600ms para nunca retrasar la interfaz si la conexión es lenta
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 600));
  return Promise.race([fontPromise, timeoutPromise]);
}

// ===== MODO DEMO (BORRAR ESTE BLOQUE AL SUBIR A PRODUCCIÓN) =====
let esModoDemo = false;

function limpiarDatosDemo(token) {
  safeRemoveItem("edumin_claimed_demo");
  safeRemoveItem(getClaimKey());
  if (token) {
    safeRemoveItem("edumin_claimed_" + token.trim());
    safeRemoveItem("edumin_val_" + token.trim());
  }
  selectedCourse = null;
  mostrarEstadoCanjeado(false);
}

function gestionarModoDemo(params, token) {
  // 0. Resetear caché y canje local para pruebas (?reset=1) (DEMO: se borra junto a todo este bloque)
  if (params.has("reset")) {
    limpiarDatosDemo(token);
  }

  const vistaParam = params.get("vista");
  const demoParam = params.get("demo");

  // 1. Forzar vistas directas (?vista=1, ?vista=2, ?vista=3)
  if (vistaParam === "1") {
    esModoDemo = true;
    mostrarVista("pantalla-carga");
    return true;
  }

  if (vistaParam === "2") {
    esModoDemo = true;
    limpiarDatosDemo(token);
    mostrarVista("pantalla-cursos");
    initCursosApp();
    return true;
  }

  if (vistaParam === "3") {
    esModoDemo = true;
    mostrarVista("pantalla-expirado");
    return true;
  }

  // 2. Modos Demo (?demo=1, ?demo=2, ?demo=3)
  // Demo 1: Catálogo interactivo desde cero (limpia canjes previos en cada recarga)
  if (demoParam === "1") {
    esModoDemo = true;
    limpiarDatosDemo(token);
    mostrarVista("pantalla-cursos");
    initCursosApp();
    return true;
  }

  // Demo 2: Vista de Curso Ya Canjeado
  if (demoParam === "2") {
    esModoDemo = true;
    const cursoDemo = ALL_COURSES[0] || {
      id: 1,
      title: "MANEJO DE EPPS SEGÚN LA NORMA TÉCNICA PERUANA LEY 29783",
      category: 1,
    };
    safeSetItem("edumin_claimed_demo", JSON.stringify(cursoDemo));
    safeSetItem(getClaimKey(), JSON.stringify(cursoDemo));
    mostrarVista("pantalla-cursos");
    initCursosApp();
    return true;
  }

  // Demo 3: Vista de Búsqueda sin Resultados / Estado Vacío
  if (demoParam === "3") {
    esModoDemo = true;
    limpiarDatosDemo(token);
    mostrarVista("pantalla-cursos");
    initCursosApp();
    const inputBusqueda = document.getElementById("inputBusqueda");
    const botonLimpiar = document.getElementById("botonLimpiarBusqueda");
    if (inputBusqueda) inputBusqueda.value = "Término sin resultados";
    if (botonLimpiar) botonLimpiar.classList.remove("hidden");
    renderCourses([]);
    return true;
  }

  // 3. Fallback para apertura local o token=demo
  const isLocalFile = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (token === "demo" || (!token && !vistaParam && !demoParam && isLocalFile)) {
    esModoDemo = true;
    limpiarDatosDemo(token);
    mostrarVista("pantalla-cursos");
    initCursosApp();
    return true;
  }

  return false; // Flujo de producción normal
}
// ===== FIN MODO DEMO =====

// Lógica de verificación al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  iniciarCintilloCumpleanos();
  renderHeroBeneficios();
  renderModalStep(1);
  initPlaceholderBusqueda();

  urlParams = new URLSearchParams(window.location.search);
  userToken = urlParams.get("token");
  if (userToken) userToken = userToken.trim();

  // Evaluar si la navegación es interceptada por el modo demo/pruebas
  if (gestionarModoDemo(urlParams, userToken)) return; // DEMO: borrar al quitar el modo demo

  // -------------------------------------------------------------
  // FLUJO NORMAL DE PRODUCCIÓN:
  // -------------------------------------------------------------

  // 1. Si NO hay token en la URL, mostrar Vista 3 (Expirado)
  if (!userToken) {
    mostrarVista("pantalla-expirado");
    return;
  }

  const tokenKey = "edumin_val_" + userToken.trim();
  const cachedVal = safeGetItem(tokenKey);
  let cargadoDesdeCache = false;

  // 2. Comprobar si ya fue validado previamente Y sigue dentro del plazo vigente
  if (cachedVal) {
    try {
      const parsed = JSON.parse(cachedVal);
      const ahora = Date.now();
      let esVigente = true;
      if (parsed.fechaLimite) {
        const limiteMs = typeof parsed.fechaLimite === "number" ? parsed.fechaLimite : new Date(parsed.fechaLimite).getTime();
        esVigente = !isNaN(limiteMs) ? ahora <= limiteMs : true;
      }
      if (parsed.valid && esVigente) {
        cargadoDesdeCache = true;
        asegurarFuentesCargadas().then(() => {
          mostrarVista("pantalla-cursos");
          initCursosApp(parsed);
        });
      } else if (!esVigente) {
        safeRemoveItem(tokenKey);
      }
    } catch (e) {
      safeRemoveItem(tokenKey);
    }
  }

  // 3. Si APPS_SCRIPT_URL no está configurado
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
    if (!cargadoDesdeCache) {
      asegurarFuentesCargadas().then(() => {
        mostrarVista("pantalla-cursos");
        initCursosApp();
      });
    }
    return;
  }

  const fetchUrl = `${APPS_SCRIPT_URL}?token=${encodeURIComponent(userToken)}`;

  // Intento 1: usar la petición anticipada del <head> o lanzar una nueva con límite de 7.5s
  let data = window._earlyTokenPromise ? await window._earlyTokenPromise : await pedirJSON(fetchUrl, 7500);

  // Si el Intento 1 falló por timeout, corte de red o error de servidor de Google (data es null):
  // se ejecuta un 2do intento automático. Dado que el 1er intento ya despertó a los servidores de Google,
  // este segundo intento responderá casi de inmediato.
  if (data === null) {
    console.warn("Intento 1 no obtuvo respuesta de Google (timeout o error). Ejecutando 2do intento...");
    data = await pedirJSON(fetchUrl, 6500);
  }

  if (isTokenValido(data)) {
    safeSetItem(tokenKey, JSON.stringify(data));
    if (!cargadoDesdeCache) {
      asegurarFuentesCargadas().then(() => {
        mostrarVista("pantalla-cursos");
        initCursosApp(data);
      });
    } else {
      // Si ya fue mostrado previamente desde la caché, actualizar solo datos dinámicos sin re-renderizar la grilla
      cargarNombreEstudiante(data);
      checkClaimedState(data);
    }
  } else if (data && data.valid === false) {
    // Respuesta explícita de token inválido o revocado: limpiar caché y mostrar expirado
    safeRemoveItem(tokenKey);
    mostrarVista("pantalla-expirado");
  } else {
    // data === null (sin respuesta por corte de red o timeout): mantener caché si existía, si no mostrar expirado
    if (!cargadoDesdeCache) {
      mostrarVista("pantalla-expirado");
    }
  }
});

// Cargar nombre personalizado del estudiante desde el token (API) o URL
function cargarNombreEstudiante(apiData) {
  const params = urlParams || new URLSearchParams(window.location.search);
  const nombreDirecto = (apiData && (apiData.nombre || apiData.estudiante || apiData.name || apiData.alumno || apiData.student)) || params.get("nombre") || params.get("estudiante") || params.get("name");
  const spanNombre = document.getElementById("nombreEstudiante");
  const spanPrefijo = document.getElementById("prefijoNombre");
  if (spanNombre) {
    if (nombreDirecto && typeof nombreDirecto === "string" && nombreDirecto.trim()) {
      if (spanPrefijo) spanPrefijo.textContent = ", ";
      spanNombre.textContent = nombreDirecto.trim();
    } else {
      if (spanPrefijo) spanPrefijo.textContent = "";
      spanNombre.textContent = "";
    }
  }
}

let placeholderIniciado = false;
function initPlaceholderBusqueda() {
  const inputBusqueda = document.getElementById("inputBusqueda");
  if (!inputBusqueda || placeholderIniciado) return;
  placeholderIniciado = true;
  const bp2xs = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-2xs").trim() || "22rem";
  const mql = window.matchMedia(`(max-width: ${bp2xs})`);
  const update = (e) => {
    inputBusqueda.placeholder = e.matches ? "Buscar…" : "Buscar por curso…";
  };
  mql.addEventListener("change", update);
  update(mql);
}

function actualizarPlaceholderBusqueda() {
  initPlaceholderBusqueda();
}

let isAppIniciada = false;

function initCursosApp(apiData) {
  unlockScroll();
  cargarNombreEstudiante(apiData);

  // Si ya fue inicializada, no volver a renderizar tarjetas ni volver a enlazar eventos
  if (isAppIniciada) {
    checkClaimedState(apiData);
    return;
  }
  isAppIniciada = true;

  renderHeroBeneficios();
  initPlaceholderBusqueda();

  // Pre-calcular índice de búsqueda sin acentos (una sola vez al iniciar)
  ALL_COURSES.forEach((course) => {
    if (!course._searchIndex) {
      const catName = getCategoryName(course.category);
      course._searchIndex = `${course.id} ${removeAccents(course.title)} ${removeAccents(catName)}`;
    }
  });

  renderCategories();
  renderCourses(ALL_COURSES);
  checkClaimedState(apiData);

  // Listeners de búsqueda
  const inputBusqueda = document.getElementById("inputBusqueda");
  const botonLimpiarBusqueda = document.getElementById("botonLimpiarBusqueda");

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      if (query.length > 0) {
        botonLimpiarBusqueda.classList.remove("hidden");
      } else {
        botonLimpiarBusqueda.classList.add("hidden");
      }
      filterCourses();
    });

    inputBusqueda.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        inputBusqueda.blur();
      }

      if (e.key === "Escape") {
        if (inputBusqueda.value !== "") {
          inputBusqueda.value = "";
          if (botonLimpiarBusqueda) botonLimpiarBusqueda.classList.add("hidden");
          filterCourses();
        } else {
          inputBusqueda.blur();
        }
      }
    });
  }

  if (botonLimpiarBusqueda) {
    botonLimpiarBusqueda.addEventListener("click", (e) => {
      e.stopPropagation();
      inputBusqueda.value = "";
      botonLimpiarBusqueda.classList.add("hidden");
      filterCourses();
      inputBusqueda.focus();
    });
  }

  // Listener de scroll para el degradado en categorías móviles (una sola vez)
  const listaMovil = document.getElementById("listaCategoriasMovil");
  const fadeMovil = document.getElementById("fadeCategoriasMovil");
  if (listaMovil && fadeMovil) {
    listaMovil.addEventListener("scroll", () => {
      const isAtBottom = listaMovil.scrollHeight - listaMovil.scrollTop - listaMovil.clientHeight < 8;
      fadeMovil.style.opacity = isAtBottom ? "0" : "1";
    });
  }

  // Delegación de eventos centralizada para las tarjetas de cursos (clic y teclado)
  const grillaCursos = document.getElementById("grillaCursos");
  if (grillaCursos) {
    grillaCursos.addEventListener("click", (e) => {
      const card = e.target.closest("[data-course-id]");
      if (card && card.dataset.courseId) {
        openModal(Number(card.dataset.courseId));
      }
    });

    grillaCursos.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest("[data-course-id]");
        if (card && card.dataset.courseId) {
          e.preventDefault();
          openModal(Number(card.dataset.courseId));
        }
      }
    });
  }

  setTimeout(() => {
    launchConfetti();
  }, 400);

  // Disparar confeti festivo interactivo al hacer clic (solo activo en la Vista 2)
  document.addEventListener("click", (e) => {
    // Desactivar confeti por clic fuera de Vista 2
    if (vistaActual !== "pantalla-cursos") return;

    // No distraer la interacción del usuario mientras escribe en el input de búsqueda
    if (e.target && e.target.tagName === "INPUT") return;

    const x = e.clientX && window.innerWidth ? e.clientX / window.innerWidth : 0.5;
    const y = e.clientY && window.innerHeight ? e.clientY / window.innerHeight : 0.6;

    launchConfetti({
      x: Math.max(0.05, Math.min(0.95, x)),
      y: Math.max(0.05, Math.min(0.95, y)),
    });
  });
}

let lastConfettiTime = 0;

function launchConfetti(originCoords) {
  // No lanzar confeti si la pantalla actual no es la Vista 2
  if (vistaActual !== "pantalla-cursos") return;

  const now = Date.now();
  // Evita doble disparo en milisegundos si el elemento ya disparó confeti propio
  if (originCoords && now - lastConfettiTime < 120) return;
  lastConfettiTime = now;

  if (typeof confetti === "function") {
    try {
      const isClick = !!originCoords;
      confetti({
        particleCount: isClick ? 80 : 130,
        spread: isClick ? 75 : 85,
        origin: originCoords || {
          y: 0.6,
        },
        ticks: 200,
        gravity: 1.1,
        decay: 0.94,
        startVelocity: isClick ? 28 : 38,
        colors: ["#024adf", "#f59e0b", "#10b981", "#ec4899", "#8b5cf6", "#ffffff"],
      });
    } catch (e) {
      console.warn("Confetti animation warning:", e);
    }
  }
}

function scrollToCourses() {
  launchConfetti();

  const estadoCanjeado = document.getElementById("estadoCanjeado");
  const element = estadoCanjeado && !estadoCanjeado.classList.contains("hidden") ? estadoCanjeado : document.getElementById("catalogo");

  if (element && typeof element.scrollIntoView === "function") {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
}

let isCategoriasExpanded = false;

function toggleCategorias() {
  if (window.innerWidth >= 640) return;

  const container = document.getElementById("contenedorCategoriasMovil");
  const iconoBoton = document.getElementById("iconoToggleCategorias");
  const botonToggle = document.getElementById("botonToggleCategorias");

  if (!container) return;

  isCategoriasExpanded = !isCategoriasExpanded;

  if (botonToggle) {
    botonToggle.setAttribute("aria-expanded", isCategoriasExpanded ? "true" : "false");
  }

  if (isCategoriasExpanded) {
    container.classList.remove("hidden");
    if (iconoBoton) iconoBoton.classList.add("rotate-180");

    // Resetear visibilidad del degradado inferior
    const listaMovil = document.getElementById("listaCategoriasMovil");
    const fadeMovil = document.getElementById("fadeCategoriasMovil");
    if (listaMovil && fadeMovil) {
      const hasOverflow = listaMovil.scrollHeight > listaMovil.clientHeight;
      const isAtBottom = listaMovil.scrollHeight - listaMovil.scrollTop - listaMovil.clientHeight < 8;
      fadeMovil.style.opacity = hasOverflow && !isAtBottom ? "1" : "0";
    }
  } else {
    container.classList.add("hidden");
    if (iconoBoton) iconoBoton.classList.remove("rotate-180");
  }
}

// Cerrar el menú flotante de categorías en móvil al hacer clic o tocar fuera de él
document.addEventListener("click", (e) => {
  if (!isCategoriasExpanded || window.innerWidth >= 640) return;

  const container = document.getElementById("contenedorCategoriasMovil");
  const botonToggle = document.getElementById("botonToggleCategorias");

  const clickedInside = (container && container.contains(e.target)) || (botonToggle && botonToggle.contains(e.target));

  if (!clickedInside) {
    toggleCategorias();
  }
});

// Cerrar el menú flotante de categorías con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isCategoriasExpanded && window.innerWidth < 640) {
    toggleCategorias();
  }
});

// =========================================================================
// 📱 1. PLANTILLA MÓVIL (Menú desplegable tipo lista/tabla compacta)
// =========================================================================
function renderItemCategoriaMovil(cat, isActive) {
  const catLabel = escapeHtml(cat);

  // Estilos para la fila en móvil
  const estiloActivo = "bg-brand-blue text-white font-semibold";
  const estiloInactivo = "bg-cuaternario text-secundario font-semibold";

  return `
    <button type="button"
            data-action="seleccionar-categoria"
            data-category="${catLabel}"
            aria-selected="${isActive}"
            class="w-full px-4 text-left text-sm !leading-none font-sans select-none flex items-center justify-between gap-4 transition cursor-pointer overflow-hidden ${isActive ? estiloActivo : estiloInactivo}">
      <span class="truncate py-3.5 min-w-0 flex-1" title="${catLabel}">${catLabel}</span>
      ${isActive ? '<i class="ph-bold ph-check text-4 shrink-0"></i>' : ""}
    </button>
  `;
}

// =========================================================================
// 💻 2. PLANTILLA DESKTOP (Píldoras horizontales alineadas)
// =========================================================================
function renderItemCategoriaDesktop(cat, isActive) {
  const catLabel = escapeHtml(cat);

  // Estilos para la píldora en desktop
  const estiloActivo = "bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold";
  const estiloInactivo = "bg-cuaternario text-secundario hover:bg-slate-200 inset-ring inset-ring-terciario font-semibold";

  return `
    <button type="button"
            data-action="seleccionar-categoria"
            data-category="${catLabel}"
            aria-pressed="${isActive}"
            class="px-3.5 py-2.5 !leading-none rounded-full font-sans text-xs md:text-sm shrink-0 efecto-presionar select-none flex items-center justify-center cursor-pointer ${isActive ? estiloActivo : estiloInactivo}">
      <span>${catLabel}</span>
    </button>
  `;
}

function renderCategories() {
  const badge = document.getElementById("insigniaCategoriaActiva");
  const contenedorMovil = document.getElementById("contenedorCategoriasMovil");
  const contenedorDesktop = document.getElementById("contenedorCategoriasDesktop");

  if (badge) {
    badge.textContent = activeCategory;
  }

  // Renderizar lista en móvil
  const listaMovil = document.getElementById("listaCategoriasMovil") || contenedorMovil;
  if (listaMovil) {
    listaMovil.innerHTML = categories.map((cat) => renderItemCategoriaMovil(cat, cat === activeCategory)).join("");
  }

  // Renderizar píldoras en desktop (alineadas desde la izquierda)
  if (contenedorDesktop) {
    contenedorDesktop.innerHTML = categories.map((cat) => renderItemCategoriaDesktop(cat, cat === activeCategory)).join("");
  }
}

function selectCategory(cat) {
  activeCategory = cat;
  renderCategories();

  // En móvil, colapsar automáticamente el acordeón tras elegir categoría
  if (window.innerWidth < 640 && isCategoriasExpanded) {
    toggleCategorias();
  }

  filterCourses();
}

function removeAccents(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function filterCourses() {
  const inputBusqueda = document.getElementById("inputBusqueda");
  const rawQuery = inputBusqueda ? inputBusqueda.value.trim() : "";
  const cleanQuery = removeAccents(rawQuery);

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);
  const searchId = rawQuery.replace(/^#/, "").trim();

  const filtered = ALL_COURSES.filter((course) => {
    const categoryName = getCategoryName(course.category);
    const matchesCategory = activeCategory === "Todos" || categoryName === activeCategory;

    const searchIndex = course._searchIndex || `${course.id} ${removeAccents(course.title)} ${removeAccents(categoryName)}`;
    const matchesSearch = tokens.length === 0 || course.id.toString() === searchId || tokens.every((token) => searchIndex.includes(token));

    return matchesCategory && matchesSearch;
  });

  renderCourses(filtered);
}

function resetFilters() {
  const inputBusqueda = document.getElementById("inputBusqueda");
  const botonLimpiarBusqueda = document.getElementById("botonLimpiarBusqueda");

  if (inputBusqueda) inputBusqueda.value = "";
  if (botonLimpiarBusqueda) botonLimpiarBusqueda.classList.add("hidden");
  activeCategory = "Todos";
  renderCategories();
  renderCourses(ALL_COURSES);
}

function formatCourseTitle(title) {
  if (!title) return "";
  // Une la conjunción "Y" (o "y") a la palabra anterior con un espacio de no separación (\u00A0)
  // para evitar que pase sola a otra línea (ej: "MINERÍA Y\nOPERACIONES")
  return String(title).replace(/(\S+)\s+([yY])\b/g, (m, p1, p2) => p1 + "\u00A0" + p2);
}

// Configuración centralizada de clases responsivas para las tarjetas de curso (en Español)
const ESTILOS_TARJETA = {
  contenedorTarjeta: "tarjeta-neo tarjeta-neo-interactiva tarjeta-anim-scroll flex flex-col justify-between relative group overflow-hidden",
  encabezadoContenedor: "flex items-center justify-between mb-3 md:mb-4 gap-3",
  insigniaId: "insignia-base bg-brand-blue text-white shrink-0",
  insigniaCategoria: "insignia-base text-secundario bg-cuaternario font-semibold normal-case inset-ring inset-ring-terciario shrink truncate hidden 2xs:inline-flex",
  titulo: "font-sans font-bold text-principal text-lg md:text-xl !leading-[1.15] mb-5 md:mb-6 uppercase text-balance",
  pieContenedor: "pt-4 border-t border-terciario flex items-center justify-between gap-3",
  insigniaSeleccionar: "insignia-seleccion",
  iconoSeleccionar: "ph-bold ph-hand-tap",
  textoSeleccionar: "whitespace-nowrap transition",
  iconoFlecha: "ph-bold ph-arrow-right text-brand-blue group-hover:text-amber-500 text-4 md:text-5 group-hover:translate-x-1.5 group-active:translate-x-0 transition shrink-0 hidden 2xs:block",
};

let observerTarjetas = null;

function animarTarjetasScroll() {
  if (observerTarjetas) {
    observerTarjetas.disconnect();
  }

  const cards = document.querySelectorAll(".tarjeta-anim-scroll:not(.tarjeta-visible)");
  if (cards.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("tarjeta-visible"));
    return;
  }

  const getColumnas = () => {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };

  observerTarjetas = new IntersectionObserver(
    (entries) => {
      const visibles = entries.filter((entry) => entry.isIntersecting);
      if (visibles.length === 0) return;

      const columnas = getColumnas();

      visibles.forEach((entry, i) => {
        // Escalonado progresivo de izquierda a derecha y fila por fila (0ms, 70ms, 140ms, 210ms...)
        const delay = columnas > 1 ? Math.min(i * 70, 450) : 0;
        entry.target.style.animationDelay = `${delay}ms`;
        entry.target.classList.add("tarjeta-visible");
        observerTarjetas.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -30px 0px",
      threshold: 0.05,
    },
  );

  cards.forEach((card) => observerTarjetas.observe(card));
}

function renderCourses(list) {
  const grid = document.getElementById("grillaCursos");
  const estadoVacio = document.getElementById("estadoVacio");
  const contadorCursos = document.getElementById("contadorCursos");

  if (contadorCursos) {
    const totalCursos = ALL_COURSES.length;
    contadorCursos.textContent = list.length < totalCursos ? `${list.length} de ${totalCursos}` : `${totalCursos}`;
  }

  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = "";
    if (estadoVacio) estadoVacio.classList.remove("hidden");
    return;
  }

  if (estadoVacio) estadoVacio.classList.add("hidden");
  grid.classList.remove("hidden");

  const e = ESTILOS_TARJETA;

  // Render tarjetas dinámicas
  grid.innerHTML = list
    .map(
      (course) => `
          <div data-course-id="${course.id}"
               tabindex="0"
               role="button"
               aria-label="Seleccionar curso #${course.id}: ${escapeHtml(course.title)}"
               class="${e.contenedorTarjeta}">
              <div>
                  <!-- Category Badge & Course Number -->
                  <div class="${e.encabezadoContenedor}">
                      <span class="${e.insigniaId}">
                          Curso #${course.id}
                      </span>
                      <span class="${e.insigniaCategoria}">
                          ${escapeHtml(getCategoryName(course.category))}
                      </span>
                  </div>

                  <!-- Course Title -->
                  <h3 class="${e.titulo}">
                      ${escapeHtml(formatCourseTitle(course.title))}
                  </h3>
              </div>

              <!-- Action Badge Footer -->
              <div class="${e.pieContenedor}">
                  <span class="${e.insigniaSeleccionar}">
                      <i class="${e.iconoSeleccionar}"></i>
                      <span class="${e.textoSeleccionar}">Seleccionar curso</span>
                  </span>
                  <i class="${e.iconoFlecha}"></i>
              </div>
          </div>
      `,
    )
    .join("");

  animarTarjetasScroll();
}

let elementoEnfocadoPrevio = null;

function openModal(courseId) {
  if (safeGetItem(getClaimKey())) {
    checkClaimedState();
    return;
  }

  selectedCourse = ALL_COURSES.find((c) => c.id === courseId);
  if (!selectedCourse) return;

  elementoEnfocadoPrevio = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  isRegisteringCourse = false;
  resetBotonRegistro();

  if (timerAutoCierrePaso2) {
    clearTimeout(timerAutoCierrePaso2);
    timerAutoCierrePaso2 = null;
  }

  const modalCanje = document.getElementById("modalCanje");
  const botonVolver = document.getElementById("botonVolverModal");
  const botonCerrar = document.getElementById("botonCerrarModal");

  actualizarEncabezadoTarjeta(selectedCourse, "Modal");

  renderModalStep(1);

  if (botonVolver) {
    botonVolver.disabled = false;
    botonVolver.classList.remove("opacity-50", "pointer-events-none");
  }

  if (botonCerrar) {
    botonCerrar.disabled = false;
    botonCerrar.classList.remove("opacity-50", "pointer-events-none");
  }

  if (modalCanje) {
    modalCanje.classList.remove("hidden");
    modalCanje.classList.add("flex");
  }
  lockScroll();

  // Enfoque automático en el botón de cierre al abrir
  setTimeout(() => {
    if (botonCerrar) botonCerrar.focus();
  }, 50);
}

let timerResetBoton = null;
let timerAutoCierrePaso2 = null;

function resetBotonRegistro(esReintento = false) {
  if (timerResetBoton) {
    clearTimeout(timerResetBoton);
    timerResetBoton = null;
  }
  const boton = document.getElementById("botonRegistrarCurso");
  if (boton) {
    boton.disabled = false;
    boton.className = `${MODAL_CONFIG.estilos.botonBase} ${MODAL_CONFIG.paso1.colorBoton}`;
    const texto = esReintento ? "REINTENTAR REGISTRO" : MODAL_CONFIG.paso1.textoBoton;
    boton.innerHTML = `<i class="ph-bold ${MODAL_CONFIG.paso1.iconoBoton}"></i><span>${texto}</span>`;
  }
}

function closeModal() {
  // Bloquear salida si el registro está en proceso
  if (isRegisteringCourse) return;

  if (timerAutoCierrePaso2) {
    clearTimeout(timerAutoCierrePaso2);
    timerAutoCierrePaso2 = null;
  }

  resetBotonRegistro();

  const modalCanje = document.getElementById("modalCanje");
  const modalContainer = modalCanje?.firstElementChild;

  const onModalClosed = () => {
    // Si el usuario ya completó el canje, revelamos el estado canjeado recién cuando el modal se cierra
    const claimKey = getClaimKey();
    if (safeGetItem(claimKey)) {
      checkClaimedState();
      const estadoCanjeado = document.getElementById("estadoCanjeado");
      if (estadoCanjeado && !estadoCanjeado.classList.contains("hidden")) {
        estadoCanjeado.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (elementoEnfocadoPrevio && document.contains(elementoEnfocadoPrevio)) {
      elementoEnfocadoPrevio.focus({ preventScroll: true });
    }
    elementoEnfocadoPrevio = null;
  };

  if (modalCanje && !modalCanje.classList.contains("hidden") && modalContainer) {
    modalContainer.classList.remove("animate-modal-in");
    modalContainer.classList.add("animate-modal-out");

    setTimeout(() => {
      modalCanje.classList.remove("flex");
      modalCanje.classList.add("hidden");
      modalContainer.classList.remove("animate-modal-out");
      modalContainer.classList.add("animate-modal-in");
      unlockScroll();
      onModalClosed();
    }, 180);
  } else if (modalCanje) {
    modalCanje.classList.remove("flex");
    modalCanje.classList.add("hidden");
    unlockScroll();
    onModalClosed();
  }
}

// Delegación centralizada de clics para botones con data-action y cierre por fondo del modal
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "modalCanje") {
    closeModal();
    return;
  }

  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;

  switch (actionBtn.dataset.action) {
    case "scroll-cursos":
      scrollToCourses();
      break;
    case "toggle-categorias":
      toggleCategorias();
      break;
    case "reset-filtros":
      resetFilters();
      break;
    case "cerrar-modal":
      closeModal();
      break;
    case "registrar-curso":
      handleRegisterCourse(e);
      break;
    case "enviar-whatsapp":
      handleSendWhatsApp();
      break;
    case "seleccionar-categoria":
      if (actionBtn.dataset.category) {
        selectCategory(actionBtn.dataset.category);
      }
      break;
  }
});

// Gestión de teclado del modal: cerrar con Escape y atrapar el foco (Focus Trap) con Tab / Shift+Tab
document.addEventListener("keydown", (e) => {
  const modalCanje = document.getElementById("modalCanje");
  if (!modalCanje || modalCanje.classList.contains("hidden")) return;

  if (e.key === "Escape") {
    closeModal();
    return;
  }

  if (e.key === "Tab") {
    const focusables = Array.from(modalCanje.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Registro de elección en Google Sheets vía POST (no-cors) con control de timeout y reintento
function handleRegisterCourse(e) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (!selectedCourse || isRegisteringCourse) return;

  if (timerResetBoton) {
    clearTimeout(timerResetBoton);
    timerResetBoton = null;
  }

  isRegisteringCourse = true;

  const boton = document.getElementById("botonRegistrarCurso");
  const botonVolver = document.getElementById("botonVolverModal");
  const botonCerrar = document.getElementById("botonCerrarModal");

  if (boton) {
    boton.disabled = true;
    boton.innerHTML = `<i class="ph-bold ph-circle-notch animate-spin"></i><span>REGISTRANDO CURSO…</span>`;
  }

  // Bloquear navegación mientras se guarda
  if (botonVolver) {
    botonVolver.disabled = true;
    botonVolver.classList.add("opacity-50", "pointer-events-none");
  }
  if (botonCerrar) {
    botonCerrar.disabled = true;
    botonCerrar.classList.add("opacity-50", "pointer-events-none");
  }

  const tokenUsuario = userToken || "TOKEN-DEMO"; // DEMO: borrar '|| "TOKEN-DEMO"' al quitar el modo demo
  const cursoSeleccionado = selectedCourse.title;

  if (esModoDemo || !APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
    // DEMO: borrar 'esModoDemo ||' al quitar el modo demo
    finalizarRegistroExitoso();
    return;
  }

  // Timeout de seguridad a los 10 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000);

  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      token: tokenUsuario,
      curso: cursoSeleccionado,
    }),
    signal: controller.signal,
  })
    .then(() => {
      clearTimeout(timeoutId);
      finalizarRegistroExitoso();
    })
    .catch((err) => {
      clearTimeout(timeoutId);
      console.warn("Fallo o timeout al enviar a Apps Script:", err);
      mostrarErrorRegistro();
    });
}

function mostrarErrorRegistro() {
  isRegisteringCourse = false;

  const boton = document.getElementById("botonRegistrarCurso");
  const botonVolver = document.getElementById("botonVolverModal");
  const botonCerrar = document.getElementById("botonCerrarModal");

  // Habilitar de nuevo para que el alumno pueda decidir volver o reintentar
  if (botonVolver) {
    botonVolver.disabled = false;
    botonVolver.classList.remove("opacity-50", "pointer-events-none");
  }
  if (botonCerrar) {
    botonCerrar.disabled = false;
    botonCerrar.classList.remove("opacity-50", "pointer-events-none");
  }

  // Estado de error en el botón (cambia a rojo con aviso de error y luego regresa al azul con "REINTENTAR REGISTRO")
  if (boton) {
    boton.disabled = false;
    boton.className = `${MODAL_CONFIG.estilos.botonBase} ${MODAL_CONFIG.paso1.colorBotonError}`;
    boton.innerHTML = `<i class="ph-bold ph-warning-circle"></i><span>ERROR AL REGISTRAR</span>`;

    // Regresar automáticamente al estado azul con el texto "REINTENTAR REGISTRO" a los 2.5 segundos
    if (timerResetBoton) clearTimeout(timerResetBoton);
    timerResetBoton = setTimeout(() => {
      resetBotonRegistro(true);
    }, 2500);
  }
}

function finalizarRegistroExitoso() {
  isRegisteringCourse = false;

  if (timerResetBoton) {
    clearTimeout(timerResetBoton);
    timerResetBoton = null;
  }

  const botonCerrar = document.getElementById("botonCerrarModal");
  if (botonCerrar) {
    botonCerrar.disabled = false;
    botonCerrar.classList.remove("opacity-50", "pointer-events-none");
  }

  // Guardar selección en localStorage aislada por cada token
  safeSetItem(getClaimKey(), JSON.stringify(selectedCourse));

  // Transición en Modal al Paso 2 (el fondo de la web se mantiene como catálogo con su blur)
  renderModalStep(2);

  // Auto-cierre automático tras 5 segundos de permanencia en el Paso 2 si el usuario no presiona WhatsApp
  if (timerAutoCierrePaso2) clearTimeout(timerAutoCierrePaso2);
  timerAutoCierrePaso2 = setTimeout(() => {
    closeModal();
  }, 5000);
}

function handleSendWhatsApp() {
  if (!selectedCourse) return;

  if (timerAutoCierrePaso2) {
    clearTimeout(timerAutoCierrePaso2);
    timerAutoCierrePaso2 = null;
  }

  const message = `¡Hola, EDUMIN! Acabo de elegir mi curso de regalo por mi cumpleaños: *"${selectedCourse.title}"*. Quedo a la espera de las indicaciones para acceder a la plataforma educativa. ¡Saludos!`;
  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

  window.open(waUrl, "_blank", "noopener,noreferrer");
  closeModal();
}
