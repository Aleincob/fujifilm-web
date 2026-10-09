# **Fujifilm X100VI — Propuesta de Arquitectura, Pipeline y Plan de Acción Ajustado**

> **Estado del documento:** Propuesta revisada y ajustada en base a la auditoría exhaustiva de los recursos gráficos reales en `public/` y el stack del repositorio.  
> **Fecha:** Octubre 2026  
> **Objetivo:** Plan maestro de ejecución para una experiencia web inmersiva de clase mundial (*Awwwards / Apple-grade*) en **Astro 5 + React 19 + GSAP + Lenis + Tailwind CSS v4**.

---

## **1. Auditoría Técnica de Recursos Gráficos Existentes (`public/`)**

Tras analizar en detalle el contenido, dimensiones, pesos y secuencias de la carpeta `public/`, se identificaron los activos reales disponibles y su correlación con la narrativa web:

| Recurso | Tipo / Formato | Dimensiones / Duración | Peso Aprox. | Análisis de Contenido y Movimiento Real |
| :--- | :--- | :--- | :--- | :--- |
| **`public/frames/`**<br>`frame_001.webp` ... `frame_180.webp` | Secuencia de 180 fotogramas WebP | 1920 × 1080 px (16:9 Full HD) | ~45 KB/frame<br>(**Total: ~8.1 MB**) | **Secuencia 3D continua de cámara:** Inicia en plano picado 3/4 (vista cenital angular mostrando la placa superior, diales mecanizados, zapata y barril de lente) y desciende fluidamente rotando hasta un **plano frontal perfecto a la altura de los ojos** (`frame_180.webp`). |
| **`public/images/img-overview-exploded.webp`** | Imagen fija WebP | 1376 × 768 px | ~76 KB | **Despiece Óptico 3D de alta precisión:** Muestra los 8 elementos del lente en grupos, el obturador de láminas (*leaf shutter*), el módulo del sensor X-Trans CMOS 5 HR con bus flex y el chasis IBIS sobre fondo negro puro con guías técnicas de ingeniería. |
| **`public/videos/dials-ambient.mp4`** | Video MP4 (H.264 / AAC) | 1280 × 720 px (4.01 seg loop) | ~1.24 MB | **Macro cinematográfico de los diales superiores:** Enfoque selectivo y juego de iluminación rasante sobre los diales de velocidad de obturación, compensación EV y botón disparador moleteado en aluminio macizo. |
| **`public/images/gallery-01-reala.webp`** | Imagen fija WebP | 1376 × 768 px | ~119 KB | **Retrato urbano en cálida luz dorada:** Calle adoquinada europea, retratando a un hombre sonriente. Demuestra la reproducción fiel de tonos de piel y calidez de la simulación **REALA ACE**. |
| **`public/images/gallery-02-acros.webp`** | Imagen fija WebP | 1200 × 896 px | ~121 KB | **Arquitectura brutalista monocromática:** Geometrías de concreto, sombras duras y texturas ricas. Demuestra el contraste tonal profundo y grano fino de la simulación **ACROS**. |
| **`public/images/gallery-03-chrome.webp`** | Imagen fija WebP | 1376 × 768 px | ~258 KB | **Calle nocturna con lluvia y luces de neón:** Pavimento mojado, peatones con paraguas y reflejos urbanos. Demuestra la desaturación cinematográfica y retención de sombras de **Classic Chrome**. |
| **`public/images/preorder-duo.webp`** | Imagen fija WebP | 1376 × 768 px | ~99 KB | **Plano de producto dual (Silver & Black):** Ambas variantes de la Fujifilm X100VI dispuestas frente a frente sobre una losa de pizarra negra texturizada con iluminación de estudio premium. |

---

## **2. Diagnóstico y Reajuste Estratégico de la Propuesta Inicial**

La propuesta inicial planteaba suposiciones teóricas que no coincidían exactamente con los activos reales ni con el stack actual del repositorio. A continuación se detallan los ajustes clave:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   MATRIZ DE REAJUSTES                                  │
├────────────────────────┬────────────────────────────────┬──────────────────────────────┤
│ Área                   │ Propuesta Inicial Teórica      │ Propuesta Ajustada a la Realidad │
├────────────────────────┼────────────────────────────────┼──────────────────────────────┤
│ 1. Stack Tecnológico   │ React / Next.js                │ Astro 5 + React Islands      │
│                        │                                │ (Zero JS estático + GSAP)    │
│                        │                                │                              │
│ 2. Scrollytelling      │ Despiece y diales animados en  │ Rotación cenital a frontal   │
│    (180 Frames)        │ el mismo Canvas de 180 frames  │ fluida (180 frames 1080p)    │
│                        │                                │                              │
│ 3. Despiece Óptico     │ Integrado en animación Canvas  │ Sección interactiva propia   │
│    (Exploded View)     │ (inexistente en los frames)    │ con img-overview-exploded    │
│                        │                                │ y Hotspots GSAP reactivos    │
│                        │                                │                              │
│ 4. Diales Superiores   │ Animación 3D en Canvas         │ Componente Audiovisual con   │
│                        │                                │ dials-ambient.mp4 en loop    │
│                        │                                │                              │
│ 5. Pre-Order & Acabados│ Render 3D abstracto            │ Showcase con preorder-duo    │
│                        │                                │ + selector Silver / Black    │
└────────────────────────┴────────────────────────────────┴──────────────────────────────┘
```

### **2.1 Ventajas del Stack Real (Astro 5 + React 19 + GSAP + Lenis + Tailwind v4)**
1. **Rendimiento Máximo y Cero Bloqueo de Hilo Principal:** Al no ser un SPA monolítico de Next.js, las secciones estáticas (Specs, filosofía, footer, copys) se compilan a HTML puro. El JavaScript se reserva exclusivamente para las "islas" interactivas:
   - `<CanvasScroller client:load />`
   - `<ExplodedViewer client:visible />`
   - `<GallerySimulator client:visible />`
   - `<PreorderSelector client:visible />`
2. **Control Total del Scroll con Lenis + GSAP ScrollTrigger:** Sincronización milimétrica entre la tasa de refresco del canvas y el scroll suave, evitando el "stuttering" o saltos de fotograma.

---

## **3. Arquitectura del Sitio y Guía de Secciones (Storyline)**

La experiencia se estructura como un viaje narrativo en 6 actos continuos:

```
                                  [ HEADER STICKY TRANSLÚCIDO ]
                                               │
                                               ▼
                         [ SECCIÓN 1: HERO CANVAS SCROLLYTELLING ]
                          (180 Frames: Vista 3/4 Cenital ➔ Frontal)
                                               │
                                               ▼
                        [ SECCIÓN 2: ANATOMÍA ÓPTICA & SENSOR 40MP ]
                         (Exploded View Interactivo con Hotspots)
                                               │
                                               ▼
                        [ SECCIÓN 3: PURA MECÁNICA & DIALES ANALÓGICOS ]
                          (Video Ambient Macro + Pilares Táctiles)
                                               │
                                               ▼
                       [ SECCIÓN 4: LABORATORIO DE SIMULACIÓN DE PELÍCULA ]
                         (Muestras Reales: Reala Ace / Acros / Chrome)
                                               │
                                               ▼
                         [ SECCIÓN 5: MATRIZ DE INGENIERÍA Y SPECS ]
                            (Filtros por categoría + Alto contraste)
                                               │
                                               ▼
                         [ SECCIÓN 6: SHOWCASE DUAL & PRE-ORDER CTA ]
                           (preorder-duo.webp + Selector Silver/Black)
                                               │
                                               ▼
                                      [ FOOTER LEGAL & LINKS ]
```

---

### **3.1 Global Header (Navegación Fija & Píldora de Acción)**

* **Comportamiento:** `position: sticky`, `top: 0`, altura `64px`, `backdrop-blur(16px)`, fondo `#0A0A0A/80`, borde inferior `1px solid rgba(255,255,255,0.08)`.
* **Lado Izquierdo:**
  - Logotipo: `FUJIFILM` en tipografía sans-serif audaz con espaciado limpio.
  - Indicador de modelo: `X100VI` en gris plata `#A3A3A3` con separador sutil.
* **Centro (Anclajes Suaves via Lenis):**
  - `Diseño` (`#overview`)
  - `Óptica & Sensor` (`#optics`)
  - `Mecánica` (`#mechanics`)
  - `Simulaciones` (`#gallery`)
  - `Especificaciones` (`#specs`)
* **Lado Derecho:**
  - Botón de Acción CTA: `Pre-order ($1,599)` estilo píldora (`#FAFAFA` con texto `#0A0A0A`), hover con brillo metálico sutil y scroll directo al configurador.

---

### **3.2 Sección 1: Hero Canvas Scrollytelling (180 Fotogramas / 400vh)**

Un contenedor sticky de `400vh` de altura donde el elemento `<canvas>` ocupa `100vh` con renderizado centrado `contain/cover` a alta resolución (High-DPI 2x). La animación recorre los 180 frames sincronizados con el scroll.

#### **Desglose de Fases de la Secuencia Real:**

```
[Scroll 0%] ────────────────────── [Scroll 35%] ────────────────────── [Scroll 70%] ────────────────────── [Scroll 100%]
Frame 001                          Frame 065                          Frame 130                          Frame 180
Vista Cenital 3/4                  Inclinación Dinámica               Transición Frontal                 Frontal Completo
"El Encuentro"                     "Ergonomía Analógica"              "Óptica Fujinon 23mm"              "Una Leyenda Viva"
```

1. **Fase 1: El Encuentro (0% – 25% Scroll | Frames 001 a 045)**
   - **Visual:** Perspectiva elevada 3/4. La luz rasante resalta los números grabados en la placa de aluminio y los diales de velocidad y compensación.
   - **Overlays de Texto:**
     - Kicker: `FUJIFILM X100VI`
     - Titular H1: `El arte de ver el mundo.`
     - Subtítulo: *La silueta telemétrica más venerada de la fotografía, elevada por la ingeniería digital más pura jamás concebida.*
     - Scroll Indicator: Animación en bucle con píldora de scroll y gradiente descendente.

2. **Fase 2: Precisión en Cada Ángulo (25% – 55% Scroll | Frames 046 a 100)**
   - **Visual:** La cámara pivota suavemente hacia abajo, revelando el agarre ergonómico en relieve de cuero, la palanca frontal del visor híbrido y el selector de modo de enfoque.
   - **Overlays de Texto:**
     - Titular: `Ingeniería táctil sin concesiones.`
     - Copy: *Cada dial se labra a partir de un bloque monolítico de aluminio. La confirmación mecánica precede a cada disparo.*

3. **Fase 3: La Mirada Fujinon (55% – 85% Scroll | Frames 101 a 155)**
   - **Visual:** El lente fijo de 23mm f/2 y el visor híbrido entran en el centro de atención mientras la cámara alcanza la perpendicular horizontal.
   - **Overlays de Texto:**
     - Titular: `23mm f/2 II. Perfección de borde a borde.`
     - Badges: `Filtro ND de 4 pasos integrado` | `Resolución óptica para 40.2 MP`.

4. **Fase 4: El Retrato Heroico (85% – 100% Scroll | Frames 156 a 180)**
   - **Visual:** Vista frontal absoluta y simétrica (`frame_180.webp`). La cámara se asienta en su postura más imponente.
   - **Overlays de Texto:**
     - Titular: `Una compañera para toda la vida.`
     - Transición: Al llegar al 100%, el canvas desbloquea el scroll (unpin) y el usuario avanza de forma fluida a la siguiente sección.

---

### **3.3 Sección 2: Anatomía Óptica & Sensor X-Trans (Exploded View Interactivo)**

Aprovechando el activo exclusivo `public/images/img-overview-exploded.webp`, construimos una experiencia de despiece técnico interactivo:

* **Visual Principal:** Imagen del despiece óptico (`img-overview-exploded.webp`) en un contenedor oscuro con iluminación central y fondo `#0A0A0A`.
* **Hotspots Interactivos (Puntos flotantes con líneas SVG animadas):**
  1. **Grupo Óptico Asférico:** *8 elementos en 6 grupos con 2 lentes asféricos para minimizar aberraciones cromáticas y coma periférico.*
  2. **Obturador Central Leaf Shutter:** *Sincronización de flash a ultra-alta velocidad (hasta 1/4000s) con disparo casi inaudible y cero vibración.*
  3. **Sensor X-Trans CMOS 5 HR:** *40.2 Megapíxeles efectivos con sensor retroiluminado y matriz de filtro de color pseudorandomizada.*
  4. **Unidad IBIS de 5 Ejes:** *Estabilización magnética interna ultracompacta que compensa hasta 6.0 pasos sin engrosar el chasis.*
  5. **Motor X-Processor 5:** *Doble núcleo con acelerador de IA para detección de sujetos y procesamiento tonal instantáneo.*
* **Interacción:** Al hacer hover o clic en cada punto, se ilumina el componente, se resalta la métrica y se despliega una ficha técnica con microanimaciones GSAP.

---

### **3.4 Sección 3: Control Analógico & Memoria Muscular (Video Ambient)**

Integración del activo audiovisual `public/videos/dials-ambient.mp4` para transmitir la sensación sensorial y táctil de la cámara:

* **Estructura en Split-Layout (2 Columnas Asimétricas):**
  - **Columna Izquierda (Video Ambient Frame):**
    - Contenedor con borde pulido en metal oscuro (`#262626`) y reflejo de luz.
    - Video `dials-ambient.mp4` en loop silencioso infinito con controles discretos (Play/Pause, indicador de 24fps).
    - Etiqueta flotante: `Mecanizado CNC · Tolerancia Micrométrica`.
  - **Columna Derecha (Filosofía del Operador):**
    - Kicker: `FILOSOFÍA DE CONTROL`
    - Titular: `La memoria en la punta de tus dedos.`
    - Copy: *Sin menús laberínticos ni distracciones digitales. La apertura en el anillo, la velocidad y el ISO en diales dedicados, la compensación al alcance del pulgar. Fotografiar con la X100VI es un diálogo directo entre tus manos y la luz.*
    - Grid de 3 Pilares:
      - **Diales Duales:** Ajuste de velocidad e ISO en un solo mecanismo concéntrico retráctil.
      - **Visor Híbrido OVF/EVF:** Alterna con un toque entre la luz pura del mundo y la vista previa digital OLED de 3.69M puntos.
      - **Ergonomía de Bolsillo:** 521 gramos de aluminio y magnesio sellados para soportar el ritmo de la calle.

---

### **3.5 Sección 4: Laboratorio de Simulaciones de Película (Visual Showcase)**

Diseño de una galería interactiva conectada directamente con las 3 imágenes de muestra en `public/images/`:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  SELECTOR INTERACTIVO: [ REALA ACE (Retrato) ] [ ACROS (Arquitectura) ] [ CLASSIC CHROME (Noche) ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   [ IMAGEN PRINCIPAL EN ALTA RESOLUCIÓN CON TRANSICIÓN DE TONOS Y GRAIN SHADER ]      │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│   BADGE EXIF FLOTANTE:                                                                 │
│   • Lente: 23mm (Eq. 35mm)  • Apertura: f/2.0  • Vel: 1/1000s  • ISO: 125  • Perfil: REALA ACE │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Muestra 01 (`gallery-01-reala.webp`):**
  - **Simulación:** `REALA ACE` (Nueva incorporación insignia).
  - **Contexto:** Retrato callejero en luz de atardecer.
  - **Metadatos:** `23mm | f/2.0 | 1/1000s | ISO 125`.
  - **Descripción:** *La herencia de las películas negativas en color de Fujifilm. Contraste equilibrado y tonos de piel con una naturalidad inalcanzable para sensores convencionales.*
* **Muestra 02 (`gallery-02-acros.webp`):**
  - **Simulación:** `ACROS + R Filter`.
  - **Contexto:** Geometrías arquitectónicas de hormigón y sombras puras.
  - **Metadatos:** `23mm | f/5.6 | 1/250s | ISO 400`.
  - **Descripción:** *Gradación tonal cinematográfica, negros profundos y textura de grano orgánico modelado por software según la luminosidad de cada zona.*
* **Muestra 03 (`gallery-03-chrome.webp`):**
  - **Simulación:** `Classic Chrome`.
  - **Contexto:** Lluvia nocturna urbana y reflejos de neón.
  - **Metadatos:** `23mm | f/2.8 | 1/60s | ISO 1600`.
  - **Descripción:** *Colores sutilmente desaturados con sombras intensificadas. La estética de los fotorreportajes del siglo XX adaptada al sensor de 40.2 MP.*

---

### **3.6 Sección 5: Matriz de Especificaciones Técnicas (Specs Pro Matrix)**

Diseño tipo ficha técnica industrial con pestañas de filtrado rápido y tabla de alta densidad visual:

* **Categorías seleccionables:** `Todo` | `Sensor & Óptica` | `Estabilización & Video` | `Cuerpo & Visor`.
* **Datos Clave destacados en Hero Cards:**
  - `40.2 MP` (Sensor X-Trans CMOS 5 HR)
  - `6.0 Stops` (Estabilización IBIS de 5 ejes)
  - `6.2K / 30p` (Grabación de video interna 10-bit 4:2:2)
  - `1/180,000s` (Velocidad de obturación electrónica máxima)
* **Tabla Comparativa Completa:** Con los datos verificados del cuerpo de la X100VI (peso 521g, dimensiones 128 × 74.8 × 55.3 mm, conexiones USB-C 3.2 Gen 2, etc.).

---

### **3.7 Sección 6: Showcase de Acabados & Pre-Order Finale**

Aprovechando `public/images/preorder-duo.webp` como pieza central de conversión:

* **Visual Principal:** La fotografía `preorder-duo.webp` con un selector dinámico interactivo:
  - **Toggle interactivo:** `[ Silver Clásico ]` vs `[ Black Sigiloso ]`.
  - Al cambiar, se proyecta una animación de foco/iluminación hacia el modelo seleccionado, actualizando el resumen de especificaciones y disponibilidad estimada.
* **Caja de Acción (Order Card):**
  - Titular: `La próxima toma te está esperando.`
  - Precio: `$1,599 USD` (PVP recomendado).
  - Selector de entrega / lote de producción.
  - Botón Principal: `Reservar Ahora` (despliega un drawer modal con resumen de configuración, accesorios opcionales como parasol LH-X100 y confirmación visual sin fricción).
* **Footer de Marca:**
  - Enlaces de soporte, manuales de firmware, comunidad X-Photographers y créditos legales oficiales de Fujifilm.

---

## **4. Pipeline de Ingeniería & Rendimiento (Canvas & Assets)**

El mayor reto técnico en sitios de este calibre es evitar congelamientos del navegador durante la carga de 180 fotogramas WebP (~8.1 MB). Implementaremos el siguiente pipeline de carga y render:

```
[ INICIO CARGA DE PÁGINA ]
       │
       ▼
[ FASE 1: CRITICAL PATH (< 200ms) ]
  • Descarga inmediata de Frame 001 + CSS tokens + Layout
  • Render del Canvas con Frame 001 estático (First Contentful Paint & LCP instantáneo)
       │
       ▼
[ FASE 2: KEYFRAME PRELOAD (< 800ms) ]
  • Descarga en paralelo de los 5 frames bisagra (Frame 001, 045, 090, 135, 180)
  • Permite interacción básica de scroll sin pantallas en blanco
       │
       ▼
[ FASE 3: PROGRESSIVE BATCH LOADING (Background) ]
  • Descarga asíncrona de los 175 frames restantes en lotes de 10 imágenes
  • Uso de `requestIdleCallback` para no penalizar el hilo principal de render
  • Barra de progreso sutil y discreta sobre el indicador de scroll
       │
       ▼
[ RENDER LOOP ULTRA-SUAVE A 60 FPS ]
  • Doble buffer en `<canvas>` (OffscreenCanvas o ImageBitmap)
  • GSAP ScrollTrigger mapeando el scroll a un índice entero `Math.floor(progress * 179)`
  • Escalado Retina automático: `canvas.width = window.innerWidth * window.devicePixelRatio`
```

---

## **5. Estructura de Componentes Propuesta en el Código**

La estructura dentro de `src/` seguirá el patrón de islas de Astro:

```text
src/
├── components/
│   ├── canvas/
│   │   ├── CanvasHero.astro          # Contenedor sticky 400vh y estructura SSR
│   │   ├── CanvasScroller.tsx        # Isla React: Preloader, Canvas 60fps, GSAP ScrollTrigger
│   │   └── CanvasOverlays.tsx        # Isla React: Textos que aparecen y desaparecen con el scroll
│   ├── sections/
│   │   ├── Header.astro              # Navegación fija con backdrop blur
│   │   ├── ExplodedView.tsx          # Isla React: Hotspots interactivos con img-overview-exploded.webp
│   │   ├── TactileMechanics.astro    # Video loop dials-ambient.mp4 + pilares analógicos
│   │   ├── FilmSimulations.tsx       # Isla React: Selector de muestras (Reala, Acros, Chrome)
│   │   ├── SpecsMatrix.astro         # Tabla y fichas de especificaciones en HTML puro
│   │   ├── PreorderShowcase.tsx      # Isla React: Selector de acabados con preorder-duo.webp
│   │   └── Footer.astro              # Pie de página y links legales
│   └── ui/
│       ├── Button.astro              # Botón píldora con microinteracciones
│       └── HotspotBadge.tsx          # Componente tooltip flotante
├── layouts/
│   └── Layout.astro                  # Inicialización de Lenis Smooth Scroll y fuentes
├── pages/
│   └── index.astro                   # Composición principal de la página
└── styles/
    └── global.css                    # Tailwind CSS v4 + Variables de color y tipografía
```

---

## **6. Plan de Acción por Fases de Implementación**

Una vez revisada y aprobada esta propuesta, la implementación se ejecutará en 5 fases controladas:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP DE IMPLEMENTACIÓN                       │
├─────────┬────────────────────────────┬─────────────────────────────────┤
│ Fase 1  │ Base & Estilos             │ • Setup de tipografía Inter/SF  │
│         │                            │ • Tokens de color dark/metal    │
│         │                            │ • Lenis smooth scroll global    │
│         │                            │ • Header sticky con glassmorphism│
├─────────┼────────────────────────────┼─────────────────────────────────┤
│ Fase 2  │ Canvas Scrollytelling      │ • Componente CanvasScroller     │
│         │ (180 Frames)               │ • Pipeline de precarga de frames│
│         │                            │ • Sincronización GSAP / Scroll  │
│         │                            │ • Overlays tipográficos dinámicos│
├─────────┼────────────────────────────┼─────────────────────────────────┤
│ Fase 3  │ Núcleo de Producto         │ • Componente Exploded View      │
│         │ (Exploded & Video)         │   con hotspots interactivos     │
│         │                            │ • Sección de video macro de     │
│         │                            │   diales en loop                │
├─────────┼────────────────────────────┼─────────────────────────────────┤
│ Fase 4  │ Galería & Especificaciones │ • Slider/Tabs de simulaciones   │
│         │                            │   de película con datos EXIF    │
│         │                            │ • Matriz de especificaciones    │
├─────────┼────────────────────────────┼─────────────────────────────────┤
│ Fase 5  │ Pre-Order & Pulido Final   │ • Selector Silver / Black con   │
│         │                            │   preorder-duo.webp             │
│         │                            │ • Footer de marca               │
│         │                            │ • Optimización 60fps & mobile   │
└─────────┴────────────────────────────┴─────────────────────────────────┘
```

---

## **7. Criterios de Aceptación y Validación de Calidad**

* **Fluidez visual:** 60 FPS estables durante el scroll en escritorio sin tirones de memoria en el canvas.
* **Precisión de activos:** 100% de los archivos de `public/` integrados en sus respectivas secciones sin activos huérfanos.
* **Experiencia de usuario:** Responsive design completo (Mobile/Tablet/Desktop), adaptable a pantallas táctiles y con accesibilidad para `prefers-reduced-motion`.
* **Estética de impacto:** Paleta oscura premium con acentos metálicos, contraste tipográfico y microanimaciones que transmitan el valor de una cámara de $1,599 USD.
