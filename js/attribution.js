/**
 * Practify IA — Attribution & UTM propagation
 *
 * Captura los parámetros de atribución (UTMs + click IDs de ads) que llegan
 * por query string en la primera visita a la landing y los propaga a todos
 * los enlaces hacia app.practifyia.com para que el signup conozca la fuente.
 *
 * Modelo first-touch: si ya hay datos guardados, NO se sobrescriben.
 * Quien llegó la primera vez desde LinkedIn sigue contando como LinkedIn
 * aunque después navegue desde otro sitio.
 *
 * No requiere consentimiento de cookies: los UTMs son query string params
 * públicos y se guardan en localStorage del propio dominio, no son PII.
 *
 * Auto-contenido, no depende de librerías externas. Compatible con todos
 * los navegadores modernos. Si localStorage falla (modo privado/quota),
 * sigue funcionando para la sesión actual via URL params.
 */
(function () {
  'use strict';

  // Parámetros que capturamos. UTMs estándar + click IDs de las 4 plataformas
  // de ads principales (Google, Meta, LinkedIn, TikTok, Microsoft).
  // 'source' es legacy: ya lo usaba la app antes para los CTAs landing_hero,
  // landing_pricing, etc. Lo mantenemos para no romper la lógica existente.
  var TRACKED_PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
    'li_fat_id',
    'ttclid',
    'msclkid',
    'source',
  ];

  var STORAGE_KEY = 'practify_attribution_v1';

  // 1) Leer params de la URL actual
  function leerParamsDeUrl() {
    var out = {};
    try {
      var sp = new URL(window.location.href).searchParams;
      TRACKED_PARAMS.forEach(function (p) {
        var v = sp.get(p);
        if (v) out[p] = v;
      });
    } catch (e) {
      // URL inválida (edge case) — devolver vacío
    }
    return out;
  }

  // 2) Guardar como first-touch si no había nada antes
  function guardarFirstTouch(paramsActuales) {
    if (Object.keys(paramsActuales).length === 0) return;
    try {
      var existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) return; // first-touch ya capturado, no sobrescribir
      var data = {};
      // Copiar UTMs
      for (var k in paramsActuales) {
        if (Object.prototype.hasOwnProperty.call(paramsActuales, k)) {
          data[k] = paramsActuales[k];
        }
      }
      // Añadir metadatos contextuales
      data.referrer = document.referrer || null;
      data.landing_url = window.location.pathname + window.location.search;
      data.landing_at = new Date().toISOString();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage deshabilitado/quota lleno — seguir sin persistir
    }
  }

  // 3) Recuperar params (URL actual prevalece sobre storage, para que un
  //    visitante que vuelve con UTMs distintos los vea propagados en esa
  //    sesión; el first-touch persistido sigue intacto)
  function obtenerAttributionParams() {
    var fromUrl = leerParamsDeUrl();
    var fromStore = {};
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) fromStore = JSON.parse(raw) || {};
    } catch (e) {}
    var result = {};
    // Primero llenar con storage (first-touch)
    TRACKED_PARAMS.forEach(function (p) {
      if (fromStore[p]) result[p] = fromStore[p];
    });
    // URL actual prevalece (last-touch overrides para esta sesión)
    TRACKED_PARAMS.forEach(function (p) {
      if (fromUrl[p]) result[p] = fromUrl[p];
    });
    return result;
  }

  // 4) Decorar links hacia app.practifyia.com con los params de atribución
  function decorarLinks() {
    var params = obtenerAttributionParams();
    var keys = Object.keys(params);
    if (keys.length === 0) return;
    var anchors = document.querySelectorAll('a[href*="app.practifyia.com"]');
    anchors.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      try {
        var u = new URL(href, window.location.origin);
        keys.forEach(function (k) {
          // No sobrescribir params que el href ya trae explícitos
          // (ej. ?source=landing_hero queda intacto, solo añadimos los nuevos)
          if (!u.searchParams.has(k)) {
            u.searchParams.set(k, params[k]);
          }
        });
        a.setAttribute('href', u.toString());
      } catch (e) {
        // href no parseable — saltar
      }
    });
  }

  // Ejecutar: guardar first-touch ya (no espera DOM), decorar links cuando
  // el DOM esté listo (los anchors deben existir).
  var paramsActuales = leerParamsDeUrl();
  guardarFirstTouch(paramsActuales);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorarLinks);
  } else {
    decorarLinks();
  }

  // Exponer para debug manual en consola:
  //   window.PractifyAttribution.get()  → ver params actuales
  //   window.PractifyAttribution.clear() → limpiar storage (testing)
  window.PractifyAttribution = {
    get: obtenerAttributionParams,
    clear: function () {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    },
  };
})();
