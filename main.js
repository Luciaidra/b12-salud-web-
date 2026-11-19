/* B12 Salud Integral: script principal.
   Cada módulo se inicia por separado con init(): si uno falla, los demás siguen andando
   y el contenido se muestra igual (no queda nada invisible). */
'use strict';
window.B12_OK = true; // avisa al <head> que el script cargó

// ===== Configuración rápida =====
const WHATSAPP_NUMERO = '5492236962636';   // formato internacional sin "+"
const WHATSAPP_TEXTO  = '223 696-2636';    // cómo se muestra en la página
const especialidades = [
  { id: 'kinesiologia', nombre: 'Kinesiología', cat: 'rehab', desc: 'Rehabilitación, prevención y tratamiento de lesiones: evaluación, recuperación de la movilidad y fortalecimiento.',
    icon: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.66 21.51a2 2 0 1 1-2.83-2.83l-1.77 1.77a2 2 0 1 1-2.83-2.83l6.37-6.37a2 2 0 1 1 2.83 2.83l-1.77 1.77a2 2 0 1 1 2.83 2.83z"/><path d="m21.5 21.5-1.4-1.4M3.9 3.9 2.5 2.5"/><path d="M6.4 12.77a2 2 0 1 1-2.83-2.83l1.77-1.77a2 2 0 1 1-2.83-2.83l2.83-2.83a2 2 0 1 1 2.83 2.83l1.77-1.77a2 2 0 1 1 2.83 2.83z"/>' },
  { id: 'fkt', nombre: 'FKT (Fisiokinesioterapia)', cat: 'rehab', desc: 'Agentes físicos (calor, frío, electroterapia, ultrasonido) combinados con ejercicio terapéutico para aliviar el dolor y acelerar la recuperación.',
    icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>' },
  { id: 'rpg', nombre: 'RPG (Reeducación Postural Global)', cat: 'rehab', desc: 'Método que trabaja las cadenas musculares en conjunto para corregir desequilibrios posturales y tratar dolores de origen postural.',
    icon: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v8M8 10h8M9 21l3-6 3 6"/>' },
  { id: 'osteopatia', nombre: 'Osteopatía', cat: 'manual', desc: 'Abordaje integral corporal para niños y adultos: alivio de dolores crónicos y agudos, postura, movilidad y equilibrio global.',
    icon: '<path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>' },
  { id: 'atm', nombre: 'ATM (Disfunción Temporomandibular)', cat: 'manual', desc: 'Abordaje de dolor mandibular, chasquidos, bruxismo y cefaleas asociadas a la articulación temporomandibular.',
    icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>' },
  { id: 'terapia-ocupacional', nombre: 'Terapia Ocupacional', cat: 'desarrollo', desc: 'Terapia y evaluación cognitiva (memoria, atención), tratamiento de la motricidad fina y estrategias para ganar autonomía en el día a día.',
    icon: '<path d="M19.44 7.85c-.28-.28-.74-.28-1.02 0l-6.29 6.29-2.83-2.83 6.29-6.29c.28-.28.28-.74 0-1.02a3.6 3.6 0 0 0-5.09 0L3.63 10.87a3.6 3.6 0 0 0 0 5.09l4.41 4.41a3.6 3.6 0 0 0 5.09 0l6.87-6.87a3.6 3.6 0 0 0 0-5.09z"/>' },
  { id: 'nutricion', nombre: 'Nutrición', cat: 'desarrollo', desc: 'Planes alimentarios personalizados, nutrición en la adultez mayor, acompañamiento en la perimenopausia y evaluación antropométrica.',
    icon: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"/><path d="M10 2c1 .5 2 2 2 5"/>' },
];

const obrasSociales = [
  { grupo: 'Empresas de medicina prepaga', items: [
    ['AMSTERDAM SALUD', 'Amsterdam Salud S.A.'], ['APRES SA'], ['AVALIAN', 'Ex ACA Salud'], ['CENTRO MÉDICO PUEYRREDÓN'],
    ['CRISTAL SALUD', 'Red Argentina de Sanatorios'], ['ENSALUD / ENSALUD S/ COPAGO'], ['FEDERADA SALUD', 'Federada Salud S.A.'],
    ['GALENO', 'Galeno Argentina S.A.'], ['JERÁRQUICOS SALUD', 'Mutual Jerárquicos Salud'], ['LUIS PASTEUR'],
    ['MEDIFÉ S.A.', 'Medifé Cobertura Médica Nacional'], ['OMINT'], ['PREVENCIÓN SALUD S.A.'], ['SANCOR SALUD', 'Plan Común'],
    ['SANCOR SALUD', 'Plan 700 / 800'], ['SANTA CLARA SALUD'], ['SCIS S.A.', 'Sistema de Cobertura de Integración'], ['SWISS MEDICAL']
  ]},
  { grupo: 'Obras sociales sindicales y de dirección', items: [
    ['ACTIVA SALUD', 'OSFATLYF y OSSEG Plan Especial'], ['AMFFA', 'Asociación Mutual de Farmacéuticos'],
    ['APSOT', 'Asociación del Personal Superior de Organismos de Control'], ['DASMI'],
    ['DASUTEN', 'Dirección de Acción Social de la Universidad Tecnológica Nacional'], ['FUTBOLISTAS', 'Obra Social de Futbolistas'],
    ['OPDEA', 'Personal de Dirección de Empresas de Alimentación'], ['OSCAP', 'Capitanes de Buques de Pesca'],
    ['OSDOP', 'Obra Social de Docentes Particulares'], ['OSEPJANA', 'Personal Jerárquico de Goodyear'],
    ['OSPEDYC', 'Personal de Entidades Deportivas y Civiles'], ['OSPEP', 'Personal de Panaderías'],
    ['OSPEPBA', 'Personal de Escribanías'], ['OSPIA', 'Industria de la Alimentación'], ['OSPIF', 'Industriales del Calzado'],
    ['OSPSA', 'Personal de Sanidad Argentina'], ['OSPTV', 'Personal de Televisión'], ['OSSEG', 'Personal de Seguros y Servicios'],
    ['PODER JUDICIAL', 'Obra Social del Poder Judicial de la Nación'], ['UNIÓN PERSONAL', 'Plan Medio y Bajo'], ['UNIÓN PERSONAL', 'Plan Alto']
  ]},
  { grupo: 'Mutuales, cooperativas y asistencias integrales', items: [
    ['AMEBPBA', 'Mutualista de Empleados del Banco Provincia de Buenos Aires'], ['ASÍ ASISTENCIA SANITARIA INTEGRAL', 'ASÍ Asistencial'],
    ['ASOCIACIÓN ECLESIÁSTICA SAN PEDRO', 'Conferencia Episcopal Argentina'], ['COLONIA SUIZA'], ['GLOBAL EMPRESARIA S.A.'],
    ['MEDICAR WORK'], ['RAS', 'Red Argentina de Salud'], ['W. HOPE / WILLIAM HOPE ENSALUD']
  ]},
  { grupo: 'Cajas de previsión y profesionales', items: [
    ['CASA', 'Caja de Previsión para Abogados de la Provincia de Buenos Aires'], ['COLEGIO DE ESCRIBANOS', 'Caja de Previsión para Escribanos'],
    ['COMEI', 'Fundación Comei - Caja de Odontólogos de la Provincia de Buenos Aires']
  ]},
  { grupo: 'Aseguradoras de riesgos del trabajo (ART)', items: [
    ['LA HOLANDO ART'], ['LA SEGUNDA ART'], ['OMINT ART / SERENA ART'], ['RECONQUISTA ART S.A.'], ['RURAL MUTUAL ART'],
    ['SAN FRANCISCO ART'], ['SMG ART', 'Swiss Medical ART']
  ]}
];

// ===== Utilidades =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Escapa texto antes de meterlo en HTML (evita que una comilla o un "<" rompa el markup)
const esc = (t) => String(t).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Búsqueda sin tildes ni mayúsculas
const normalizar = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Enlaces de WhatsApp
const waBase = `https://wa.me/${WHATSAPP_NUMERO}`;
const waMensaje = (texto) => `${waBase}?text=${encodeURIComponent(texto)}`;
const waLink = (especialidad) => waMensaje(`¡Hola! Quisiera solicitar un turno de ${especialidad}.`);
const nombreCorto = (nombre) => nombre.split(' (')[0];

// Muestra todo el contenido animado (se usa si algo falla)
const mostrarTodo = () => $$('.reveal').forEach(el => el.classList.add('is-visible'));

const init = (nombre, fn) => {
  try {
    fn();
  } catch (err) {
    console.error(`[B12] Falló el módulo "${nombre}":`, err);
    mostrarTodo();
  }
};

// ===== Módulos =====
function initWhatsApp() {
  $$('[data-wa]').forEach(a => { a.href = waBase; });
  $$('[data-wa-texto]').forEach(el => { el.textContent = WHATSAPP_TEXTO; });
  $('#alquiler-wa').href = waMensaje('¡Hola! Soy profesional de la salud y me interesa alquilar un consultorio en B12. ¿Me pasan información?');
}

function initEspecialidades() {
  $('#spec-grid').innerHTML = especialidades.map(e => `
    <article class="spec-card reveal group flex flex-col rounded-3xl border border-sage-100 bg-cream p-6 transition duration-300 hover:-translate-y-1 hover:border-sage-200 hover:bg-white hover:shadow-soft" data-cat="${esc(e.cat)}">
      <span class="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-700 transition group-hover:bg-sage-600 group-hover:text-white">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e.icon}</svg>
      </span>
      <h3 class="mt-5 font-serif text-lg font-semibold leading-snug text-sage-900">${esc(e.nombre)}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-sage-800/75">${esc(e.desc)}</p>
      <a href="${esc(waLink(e.nombre))}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-sage-600 hover:text-sage-800">
        Pedir turno por WhatsApp
        <svg class="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </article>`).join('');

  $('#wa-specs').innerHTML = especialidades.map(e => `
    <a href="${esc(waLink(e.nombre))}" target="_blank" rel="noopener"
       class="rounded-full border border-sage-200 bg-cream px-4 py-2 text-sm font-medium text-sage-800 transition hover:border-sage-600 hover:bg-sage-600 hover:text-white">${esc(nombreCorto(e.nombre))}</a>`).join('');

  $('#footer-specs').innerHTML = especialidades
    .map(e => `<li><a href="#especialidades" class="hover:text-sage-600">${esc(nombreCorto(e.nombre))}</a></li>`).join('');

  // Contadores del hero: salen de los datos, no hay que actualizarlos a mano
  $('#count-especialidades').textContent = especialidades.length;
  $('#count-profesionales').textContent = $$('#profesionales article').length;
}

function initFiltros() {
  const botones = $$('.filter-btn');
  const marcar = (activo) => botones.forEach(btn => {
    const on = btn.dataset.filter === activo;
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('bg-sage-600', on);
    btn.classList.toggle('border-sage-600', on);
    btn.classList.toggle('text-white', on);
    btn.classList.toggle('border-sage-200', !on);
    btn.classList.toggle('text-sage-800', !on);
    btn.classList.toggle('hover:border-sage-400', !on);
  });
  botones.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    marcar(f);
    $$('.spec-card').forEach(card => card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f));
  }));
  marcar('all');
}

function initNavbar() {
  const navbar = $('#navbar');
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('bg-cream/90', scrolled);
    navbar.classList.toggle('backdrop-blur', scrolled);
    navbar.classList.toggle('shadow-sm', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú hamburguesa
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    $('#icon-open').classList.toggle('hidden', open);
    $('#icon-close').classList.toggle('hidden', !open);
    if (open) navbar.classList.add('bg-cream/90', 'backdrop-blur');
    else onScroll();
  };
  toggle.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
  $$('.mobile-link').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });

  // Enlace activo según la sección visible
  const links = $$('.nav-link');
  const obs = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('text-sage-600', link.getAttribute('href') === '#' + entry.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => obs.observe(s));
}

function initReveal() {
  if (!('IntersectionObserver' in window)) { mostrarTodo(); return; }
  const obs = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
}

function initCarrusel() {
  const carousel = $('#carousel');
  const track = $('#carousel-track');
  const slides = $$('.carousel-slide', track);
  const dotsBox = $('#carousel-dots');
  const caption = $('#carousel-caption');
  const count = $('#carousel-count');
  const leyenda = (s) => s.querySelector('figcaption').textContent;
  let actual = 0;

  dotsBox.innerHTML = slides.map((s, i) =>
    `<button type="button" class="carousel-dot h-2 rounded-full transition-all" aria-label="Ver foto ${i + 1}: ${esc(leyenda(s))}"></button>`).join('');
  const dots = [...dotsBox.children];

  const goTo = (i) => {
    actual = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${actual * 100}%)`;
    caption.textContent = leyenda(slides[actual]);
    count.textContent = `${actual + 1} / ${slides.length}`;
    slides.forEach((s, j) => s.setAttribute('aria-hidden', String(j !== actual)));
    dots.forEach((d, j) => {
      const on = j === actual;
      d.classList.toggle('w-6', on);
      d.classList.toggle('bg-sage-600', on);
      d.classList.toggle('w-2', !on);
      d.classList.toggle('bg-sage-200', !on);
      d.setAttribute('aria-current', String(on));
    });
  };

  $('#carousel-prev').addEventListener('click', () => goTo(actual - 1));
  $('#carousel-next').addEventListener('click', () => goTo(actual + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(actual - 1);
    if (e.key === 'ArrowRight') goTo(actual + 1);
  });

  // Swipe: sólo cuenta si el gesto es más horizontal que vertical (no se activa al hacer scroll)
  let inicio = null;
  track.addEventListener('touchstart', e => {
    inicio = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  track.addEventListener('touchend', e => {
    if (!inicio) return;
    const dx = e.changedTouches[0].clientX - inicio.x;
    const dy = e.changedTouches[0].clientY - inicio.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(actual + (dx < 0 ? 1 : -1));
    inicio = null;
  });
  track.addEventListener('touchcancel', () => { inicio = null; });

  goTo(0);
}

function initObrasSociales() {
  const total = obrasSociales.reduce((n, g) => n + g.items.length, 0);
  $('#os-total').textContent = `${total} coberturas en ${obrasSociales.length} categorías`;

  $('#os-groups').innerHTML = obrasSociales.map(g => `
    <div class="os-group">
      <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-sage-600">
        ${esc(g.grupo)} <span class="os-count rounded-full bg-sage-100 px-2 py-0.5 text-[11px] tracking-normal text-sage-700">${g.items.length}</span>
      </h3>
      <ul class="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        ${g.items.map(([nombre, detalle]) => `
          <li class="os-item rounded-xl border border-sage-100 bg-white px-4 py-2.5" data-search="${esc(normalizar(nombre + ' ' + (detalle || '')))}">
            <span class="block text-sm font-semibold text-sage-900">${esc(nombre)}</span>
            ${detalle ? `<span class="block text-xs text-sage-700">${esc(detalle)}</span>` : ''}
          </li>`).join('')}
      </ul>
    </div>`).join('');

  const toggle = $('#os-toggle');
  const panel = $('#os-panel');
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
    $('#os-chevron').classList.toggle('rotate-180', open);
    if (open && window.matchMedia('(min-width: 640px)').matches) $('#os-search').focus({ preventScroll: true });
  });

  $('#os-search').addEventListener('input', e => {
    const q = normalizar(e.target.value.trim());
    let visibles = 0;
    $$('.os-group').forEach(group => {
      let enGrupo = 0;
      $$('.os-item', group).forEach(item => {
        const ok = !q || item.dataset.search.includes(q);
        item.classList.toggle('hidden', !ok);
        if (ok) enGrupo++;
      });
      group.classList.toggle('hidden', enGrupo === 0);
      $('.os-count', group).textContent = enGrupo;
      visibles += enGrupo;
    });
    $('#os-empty').classList.toggle('hidden', visibles > 0);
  });
}

// ===== Arranque =====
init('whatsapp', initWhatsApp);
init('especialidades', initEspecialidades);
init('filtros', initFiltros);
init('navbar', initNavbar);
init('carrusel', initCarrusel);
init('obras sociales', initObrasSociales);
init('año del footer', () => { $('#year').textContent = new Date().getFullYear(); });
init('animaciones', initReveal); // va al final: así también observa las tarjetas generadas arriba
