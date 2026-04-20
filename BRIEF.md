# BRIEF — Practify IA Web (Landing / Marketing Site)

Documento vivo con todo el contexto del producto y la estrategia de la web.
Leer al inicio de cada sesión.

## 1. Qué es Practify IA

Practify IA es un **SaaS de entrenamiento y análisis de ventas con IA** en español de España. Dos capas:

1. **Simulador IA**: los comerciales practican llamadas de ventas (cold call, cualificación, videollamada de cierre) contra un prospecto IA realista. El prospecto se genera desde una URL del negocio o desde una descripción. Tiene arquetipo (autónomo/CEO/mando medio/comercial/técnico/B2C), sector activo (legal/salud/inmobiliario/finanzas/tech/formación/consultoría) y 3 niveles de dificultad. Habla con género correcto, en primera persona, con sentido crítico (no acepta saltos lógicos del comercial).

2. **Análisis de llamadas reales**: el comercial sube una grabación/transcripción y la IA genera un análisis completo (score 0-100, sub-puntuaciones por fase, fortalezas, áreas a mejorar, coaching moments, auditoría de objeciones, oportunidades perdidas, calidad del prospecto, win/loss, mentalidad). En roleplays añade el campo `como_conseguir_objetivo` con plan accionable exacto para cerrar/agendar la próxima vez.

3. **Panel Manager**: el admin ve rendimiento del equipo, evolución temporal, comparativa por rep, reps en riesgo, distribución de resultados.

## 2. Diferenciadores reales

Qué tiene que NINGÚN competidor (Gong / Chorus / Avoma / Wingman) tiene:

- **Simulador con prospectos personalizables desde web**: pegas URL → se genera prospecto coherente con el negocio real
- **Roleplay que adapta personaje a arquetipo+sector+género**: un abogado autónomo habla distinto a un CEO de SaaS
- **Medidor de interés interno** que evoluciona en cada turno según lo que hace el comercial. El prospecto es cerrable si hace bien el trabajo, resistente si lo hace mal
- **Análisis "cómo podrías haber cerrado"**: cuando NO se logra el objetivo, la IA (que conoce al prospecto porque lo generó) devuelve momentos clave perdidos + plan accionable + frase clave exacta
- **Glosario interactivo** con 14 términos técnicos explicados con tooltip al vuelo — enseña mientras analiza
- **Multi-usuario con roles** (admin + comerciales) con RLS en Supabase, invitaciones por email vía Resend
- **Agnóstico de marcas**: el producto NO cita "7-Figure Selling Academy" ni "iDealSales" ni "Pitch Codex" — metodología propia de Practify IA

## 3. Público objetivo (ICP)

**Primario (B2B high-ticket):**
- Directores de ventas con equipos de 3-20 comerciales
- Agencias de ventas y empresas de setting/closing
- Academias online que forman vendedores
- Empresas de consultoría que venden tickets >1.000€

**Secundario:**
- Comerciales individuales ambiciosos que quieren entrenar solos
- Emprendedores que venden sus propios servicios high-ticket

## 4. Tono de marca

- **Idioma**: español de España natural (no neutral, no Latinoamérica)
- **Registro**: profesional pero directo. Sin jerga gringa innecesaria ("scale", "growth", "funnel" mal usado)
- **Términos**: traducir al español los que tienen equivalente (Frame→Marco de la llamada, Temperature Check→Chequeo de Interés, SHUT UP→Silencio Post-Precio). Mantener los que son estándar universal (BANT, ROI, MEDDPICC)
- **Estética**: morado (#7c3aed) como acento, fondos limpios, tipografía Plus Jakarta Sans
- **NADA de promesas exageradas**: "duplicarás tus ventas en 30 días" → NO. "practica sin gastar leads reales" → SÍ

## 5. Términos propios (glosario)

Estos 14 términos deben usarse con coherencia en la web y en el producto:

| Término | Se aplica en |
|---|---|
| Pitch Estructurado | Videollamada cierre |
| Silencio Post-Precio | Videollamada cierre |
| BANT | Cualificación + videollamada |
| MEDDPICC | Videollamada cierre (ventas complejas) |
| Marco de la llamada | Los 3 tipos (contextualizado) |
| Chunking | Videollamada cierre |
| Chequeo de Interés | Cualificación + videollamada |
| Reframe | Los 3 tipos |
| Confrontación empática | Los 3 tipos |
| Negociación colaborativa | Los 3 tipos |
| Doble confirmación | Videollamada cierre |
| Cualificación de Dinero | Cualificación + videollamada |
| 3 pilares del discovery | Cualificación + videollamada |
| 7 principios clave | Los 3 tipos |

## 6. Los 3 tipos de llamada (importante para la comunicación)

1. **Cold Call**: el prospecto NO te conoce. Recibe llamada inesperada. Objetivo: captar atención en 10 seg y AGENDAR una reunión posterior. Medidor interés empieza bajo (2/10 medio).
2. **Cualificación**: el prospecto dejó datos en un formulario o redes. Primera llamada. Objetivo: AGENDAR la videollamada de cierre. Medidor empieza 4/10.
3. **Videollamada de cierre**: el prospecto agendó en Calendly, 30-45 min. Objetivo: CERRAR la venta. Medidor empieza 5/10.

## 7. Qué NO mencionar en la web

- **Marcas de formación externas**: 7-Figure Selling Academy, iDealSales, Pitch Codex, CIA-PATT, Truth Hammer, Nice-Guy Negotiation, 7 beliefs, tie-down — riesgo de propiedad intelectual
- **Comparaciones directas con competidores por nombre** (a menos que sea obvio y legal)
- **Cifras sin evidencia**: "300% más ventas", "95% de retención", salvo que sean reales y medibles

## 8. Stack técnico actual de la web

- HTML puro + CSS + JS vanilla (SPA con sistema de "páginas")
- Hospedada en Vercel
- Sin framework (React/Next/Astro)
- Fuente: Plus Jakarta Sans
- Dominio: practifyia.com

## 9. Stack técnico de la app (para contexto)

- React 18 + TypeScript + Vite
- Supabase (auth + BD Postgres con RLS + Storage + Edge Functions)
- Gemini 2.5 Flash (análisis y roleplay IA)
- Resend (emails de invitación)
- App en producción: app.practifyia.com
- Sesiones de trabajo: 20 completadas. Ver ESTADO.md en /Users/andreirentea/practifyia-app

## 10. Objetivo de esta sesión (web)

Iterar la web actual (index.html) para:
- Reforzar el mensaje único de producto (diferenciadores reales)
- Mejorar estética manteniéndola profesional, sin animaciones gratuitas
- Preparar para lanzamiento de beta (CTA claros, prueba gratis, contacto)
- Añadir secciones que faltan (casos de uso, pricing, FAQ, testimonios si hay)
- Revisar copy para que hable EL lenguaje del ICP (directores de ventas, agencias)

## 11. DISEÑO — Tokens visuales y sistema de diseño del SaaS

Esta sección es la **fuente de verdad visual**. La web debe respetar estos tokens
para que la experiencia sea consistente entre landing y producto.

### 11.1 Paleta de color

**Accent morado (identidad de marca)**
- `#7c3aed` — morado principal (botones primarios, enlaces, highlights)
- `#5b21b6` — morado oscuro (hover, gradiente final)
- `#6d28d9` — morado texto (enlaces en texto)
- `#ede9fe` — morado claro (fondos suaves, badges)
- `#f5f3ff` — morado ultra-suave (hover backgrounds, accent-soft)
- `#e9d5ff` — borde morado suave
- `#c4b5fd` — morado acento claro (tooltips, text highlights)
- `#a78bfa` — morado medio

**Fondos**
- `#ffffff` — blanco puro (cards principales)
- `#fafafa` — off-white (fondo de página)
- `#f9fafb` — gris muy claro (hover states)
- `#f3f4f6` — gris claro (dividers)

**Texto (jerarquía)**
- `#111827` / `#0f172a` — texto fuerte (titulares, stats)
- `#374151` — texto cuerpo
- `#6b7280` — texto muted (subtítulos, metadatos)
- `#9ca3af` — texto subtle (labels pequeños, counters)
- `#d1d5db` — texto faint (placeholders, disabled)

**Bordes**
- `#e5e7eb` — border default
- `#d1d5db` — border strong
- `#e2e8f0` — border alt

**Estados semánticos**
- Éxito: `#059669` (verde), fondo `#d1fae5` o `rgba(5,150,105,0.1)`
- Advertencia: `#d97706` (naranja), fondo `#fef3c7` o `rgba(217,119,6,0.1)`
- Error: `#dc2626` / `#ef4444` (rojo), fondo `#fee2e2` o `rgba(239,68,68,0.1)`
- Info: `#2563eb` (azul), fondo `rgba(37,99,235,0.1)`

**Gradientes característicos de la marca**
- Auth/login: `linear-gradient(180deg, #080810 0%, #0d0820 55%, #1a0a35 100%)`
- Accent gradient: `linear-gradient(135deg, #7c3aed, #5b21b6)` (botones premium, hero)
- Glow morado: `radial-gradient(ellipse, rgba(109,40,217,.3) 0%, transparent 65%)`

### 11.2 Tipografía

- **Fuente única**: `'Plus Jakarta Sans'` (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800
- **Escala recomendada**:
  - Hero / H1: 48-64px, weight 800, letter-spacing -0.02em
  - H2: 32-40px, weight 700, letter-spacing -0.01em
  - H3: 20-24px, weight 700
  - Body large: 17-18px, weight 400, line-height 1.6
  - Body: 14-15px, weight 400, line-height 1.6
  - Small: 12-13px, weight 500
  - Micro/label: 10-11px, weight 600, text-transform: uppercase, letter-spacing 0.05em
- **Antialiasing**: `-webkit-font-smoothing: antialiased` siempre

### 11.3 Espaciado y radios

- **Border radius estándar**: 12px (cards, botones grandes)
- **Radius pequeño**: 8px (botones, inputs, badges)
- **Radius pill**: 20px o 50% (badges redondos, avatares)
- **Radius hero/premium**: 16-20px (cards destacadas)
- **Padding cards**: 20-24px (default), 28-32px (premium)
- **Gap grid**: 12-16px (compact), 20-24px (spacious)
- **Container max-width**: 1200-1280px

### 11.4 Sombras

- Suave default: `0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)`
- Media (cards hover, dropdowns): `0 4px 24px rgba(0,0,0,.08)`
- Fuerte (modales, popovers): `0 8px 40px rgba(0,0,0,.10)`
- Premium (hero cards): `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(124,58,237,.08)`
- Tooltip/portal: `0 8px 24px rgba(0,0,0,0.35)` sobre fondo `#111827`

### 11.5 Componentes clave del SaaS (para referencia visual)

**Botones primarios**
- Fondo `#7c3aed`, texto blanco, radius 8px, padding 9-12px × 20-24px
- Hover: `#5b21b6`
- Disabled: opacity 0.4, cursor not-allowed

**Botones secundarios**
- Fondo blanco / transparente, border 1.5px `#e5e7eb`, texto `#374151`
- Hover: fondo `#f9fafb`, border `#7c3aed`

**Cards**
- Fondo blanco, border 1px `#e5e7eb`, radius 12px
- Sombra suave
- Padding 20-24px

**Badges (estados)**
- Fondo color + alpha 18% (ej: `#059669` + alpha → `rgba(5,150,105,0.15)`)
- Texto color sólido
- Border del mismo color con alpha 30-40%
- Padding 3×10px, radius 20px, fontSize 11-12px, weight 600

**Inputs**
- Fondo `#f9fafb`, border 1.5px `#e5e7eb`, radius 9px
- Focus: border `#7c3aed`, fondo `#fff`
- Placeholder: `#d1d5db`

**Dropdowns / Selectores (estilo RepSelector)**
- Fondo blanco, border 1.5px `#e5e7eb` (`#7c3aed` al abrir)
- Radius 10px
- Fondo al abrir: `#f5f3ff`
- Items con hover `#f9fafb`, selected `#f5f3ff` + check morado

### 11.6 Principios de diseño de la marca

1. **Densidad moderada**: ni saturado ni vacío. El producto tiene mucha información que mostrar con claridad
2. **Jerarquía por tamaño + peso, no por color**: el color acento (morado) se reserva para CTA y highlights clave. Si todo es morado nada destaca
3. **Mínimo uso de gradientes**: solo en hero, botones premium y fondos muy concretos
4. **Cero emojis decorativos** salvo si el usuario lo pide explícitamente
5. **Iconografía lineal** (stroke 1.5-2px, estilo Lucide/Feather). Nunca iconos rellenos o 3D
6. **Tipografía con jerarquía clara**: títulos grandes con letter-spacing negativo dan aire "moderno". Cuerpo con line-height 1.6 se lee cómodo
7. **Espacios en blanco generosos**: aire entre secciones, padding interno amplio
8. **Bordes sutiles, no marcados**: `#e5e7eb` con 1-1.5px, no 2-3px
9. **Transiciones cortas**: 0.15-0.2s para hover, sin bounces ni elasticidad. Nada de Framer Motion con rebotes
10. **Dark mode coherente**: la web puede tener versión dark (el SaaS la tiene). Fondo `#1c1c1e`, texto `#f5f5f7`. Accent morado se mantiene

### 11.7 Qué SÍ y qué NO para animaciones

**SÍ (sutil, funcional):**
- Fade-in al cargar secciones al hacer scroll (`IntersectionObserver`)
- Hover states de 0.15s en botones/links/cards
- Transiciones de color/background sutiles
- Smooth scroll entre secciones

**NO (prohibido porque abarata la marca):**
- Animaciones elásticas/bouncing
- Scroll snap forzado
- Parallax agresivo con imágenes moviéndose
- Efectos de partículas o stars
- Typewriter de texto (escribir letra a letra)
- GIFs o videos autoreproducidos que distraigan
- Cursors custom elaborados
- Cursor trails

### 11.8 Referencias visuales del mercado

Para calibrar el nivel estético objetivo:
- **Linear.app** — claridad, jerarquía, uso estratégico del color
- **Vercel.com** — densidad correcta, buena tipografía
- **Stripe.com** — sección de producto bien explicada, copy limpio
- **Posthog.com** — técnico pero cercano, bueno para SaaS B2B
- **Notion.so** — equilibrio entre friendly y profesional

NO referenciar: sites con mucho glassmorphism extremo, neomorphism, o estética "cyberpunk" saturada.

## 12. Reglas de trabajo (mismas que la app)

- Trabajar en main directamente (no worktrees)
- Verificar que compila antes de cada commit
- Probar en local antes de push
- Push a main → Vercel despliega automáticamente
- Hard refresh del navegador tras cambios CSS
