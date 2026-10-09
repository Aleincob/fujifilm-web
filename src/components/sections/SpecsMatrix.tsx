import React, { useState } from 'react';

type SpecCategory = 'all' | 'sensor-optics' | 'video-ibis' | 'viewfinder-screen' | 'body-connectivity';

interface SpecRow {
  category: SpecCategory;
  categoryLabel: string;
  name: string;
  value: string;
  detail: string;
}

const SPEC_DATA: SpecRow[] = [
  // Sensor & Óptica
  {
    category: 'sensor-optics',
    categoryLabel: 'Sensor & Óptica',
    name: 'Sensor de Imagen',
    value: 'X-Trans CMOS 5 HR de 40.2 MP',
    detail: 'Retroiluminado (BSI) con matriz pseudorandomizada de filtros primarios sin filtro óptico de paso bajo (OLPF). Resolución de 7728 × 5152.',
  },
  {
    category: 'sensor-optics',
    categoryLabel: 'Sensor & Óptica',
    name: 'Procesador de Imagen',
    value: 'X-Processor 5',
    detail: 'Arquitectura de doble núcleo de 64 bits con coprocesador de Inteligencia Artificial para autoenfoque predictivo de sujetos.',
  },
  {
    category: 'sensor-optics',
    categoryLabel: 'Sensor & Óptica',
    name: 'Sensibilidad ISO',
    value: 'Nativo ISO 125 – 12,800',
    detail: 'Rango ampliado desde ISO 64 hasta ISO 51,200 para situaciones extremas de luz.',
  },
  {
    category: 'sensor-optics',
    categoryLabel: 'Sensor & Óptica',
    name: 'Objetivo Integrado',
    value: 'FUJINON 23mm f/2.0 II',
    detail: 'Equivalente a 35mm en formato completo. 8 elementos ópticos en 6 grupos (2 lentes asféricos de ultra-baja dispersión).',
  },
  {
    category: 'sensor-optics',
    categoryLabel: 'Sensor & Óptica',
    name: 'Filtro ND Integrado',
    value: '4 Pasos (ND16)',
    detail: 'Filtro de densidad neutra óptico interno conmutable con un clic para aperturas f/2 en pleno sol.',
  },
  // Estabilización & Video
  {
    category: 'video-ibis',
    categoryLabel: 'Estabilización & Video',
    name: 'Sistema IBIS',
    value: 'Estabilización en el cuerpo de 5 ejes',
    detail: 'Compensación de hasta 6.0 pasos CIPA (Yaw, Pitch, Roll, desplazamiento X y Y) mediante levitación magnética.',
  },
  {
    category: 'video-ibis',
    categoryLabel: 'Estabilización & Video',
    name: 'Grabación de Video Máxima',
    value: '6.2K a 30p (16:9)',
    detail: 'Grabación interna 10-bit 4:2:2 con soporte de perfil gamma plano F-Log y F-Log2 con más de 13 pasos de rango dinámico.',
  },
  {
    category: 'video-ibis',
    categoryLabel: 'Estabilización & Video',
    name: 'Formatos Adicionales',
    value: 'DCI 4K / 4K a 60p, FHD a 240p',
    detail: 'Modo de cámara lenta de ultra-alta velocidad (High-Speed REC) a 240 fotogramas por segundo.',
  },
  {
    category: 'video-ibis',
    categoryLabel: 'Estabilización & Video',
    name: 'Obturador Mecánico & Electrónico',
    value: 'Mecánico 1/4000s | Electrónico 1/180,000s',
    detail: 'Obturador central Leaf Shutter silencioso con sincronización flash a cualquier velocidad, más obturador electrónico ultrarrápido.',
  },
  // Visor & Pantalla
  {
    category: 'viewfinder-screen',
    categoryLabel: 'Visor & Pantalla',
    name: 'Visor Híbrido Avanzado',
    value: 'OVF Telemétrico + EVF OLED 3.69M puntos',
    detail: 'Conmutación instantánea. OVF con marco brillante electrónico y cobertura del 95%. EVF OLED de 0.5" con frecuencia de hasta 100 fps.',
  },
  {
    category: 'viewfinder-screen',
    categoryLabel: 'Visor & Pantalla',
    name: 'Telémetro Electrónico (ERF)',
    value: 'Subpantalla EVF integrada en OVF',
    detail: 'Muestra una ventana digital en la esquina inferior del marco óptico para verificar el punto de enfoque con asistencia de pico o división de imagen.',
  },
  {
    category: 'viewfinder-screen',
    categoryLabel: 'Visor & Pantalla',
    name: 'Pantalla Trasera',
    value: 'LCD táctil de 3.0" basculante en 2 vías',
    detail: '1.62 millones de puntos. Mecanismo de articulación ultraplano que se integra al ras del cuerpo sin sobresalir.',
  },
  // Cuerpo & Conectividad
  {
    category: 'body-connectivity',
    categoryLabel: 'Cuerpo & Conectividad',
    name: 'Dimensiones Físicas',
    value: '128.0 mm × 74.8 mm × 55.3 mm',
    detail: 'Diseño compacto de bolsillo con placas de aluminio mecanizado CNC y cuerpo central de aleación de magnesio.',
  },
  {
    category: 'body-connectivity',
    categoryLabel: 'Cuerpo & Conectividad',
    name: 'Peso Operativo',
    value: 'Aprox. 521 g',
    detail: 'Incluye batería recargable NP-W126S y tarjeta de memoria SD instaladas. Solo 471 g de chasis desnudo.',
  },
  {
    category: 'body-connectivity',
    categoryLabel: 'Cuerpo & Conectividad',
    name: 'Puertos & Conectores',
    value: 'USB-C (USB 3.2 Gen 2) / Micro HDMI / Mic 2.5mm',
    detail: 'Carga rápida por USB-C y transferencia de datos a 10 Gbps. Salida limpia HDMI para monitores de video externos.',
  },
  {
    category: 'body-connectivity',
    categoryLabel: 'Cuerpo & Conectividad',
    name: 'Conexión Inalámbrica',
    value: 'Wi-Fi 5 (802.11ac) & Bluetooth 4.2 LE',
    detail: 'Integración nativa con la app FUJIFILM XApp para transferencia automática de imágenes en segundo plano y sincronización de hora/GPS.',
  },
];

const CATEGORIES: { id: SpecCategory; label: string }[] = [
  { id: 'all', label: 'Todas las Especificaciones' },
  { id: 'sensor-optics', label: 'Sensor & Óptica' },
  { id: 'video-ibis', label: 'Estabilización & Video' },
  { id: 'viewfinder-screen', label: 'Visor & Pantalla' },
  { id: 'body-connectivity', label: 'Cuerpo & Conectividad' },
];

export default function SpecsMatrix() {
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('all');

  const filteredSpecs =
    activeCategory === 'all'
      ? SPEC_DATA
      : SPEC_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="specs" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            05 / FICHA TÉCNICA PRO
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Ingeniería sin concesiones.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Cada tolerancia, módulo y componente analizado en detalle. La evolución técnica más contundente en los 14 años de historia de la Serie X100.
          </p>
        </div>

        {/* 4 Hero Highlight Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              RESOLUCIÓN EFECTIVA
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
              40.2 <span className="text-base text-neutral-400 font-normal">MP</span>
            </div>
            <p className="text-xs text-neutral-400 font-light">Sensor X-Trans CMOS 5 HR</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              ESTABILIZACIÓN IBIS
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
              6.0 <span className="text-base text-neutral-400 font-normal">Pasos</span>
            </div>
            <p className="text-xs text-neutral-400 font-light">Compensación 5 Ejes CIPA</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              VIDEO INTERNO 10-BIT
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
              6.2K <span className="text-base text-neutral-400 font-normal">30p</span>
            </div>
            <p className="text-xs text-neutral-400 font-light">Grabación 4:2:2 con F-Log2</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              PESO OPERATIVO
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
              521 <span className="text-base text-neutral-400 font-normal">g</span>
            </div>
            <p className="text-xs text-neutral-400 font-light">Batería y SD incluidas</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.03] text-neutral-400 border border-white/10 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* High-Contrast Pro Engineering Specs Matrix Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-neutral-950/90 backdrop-blur-xl shadow-2xl">
          <div className="divide-y divide-white/[0.06]">
            {filteredSpecs.map((spec, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-white/[0.02] transition-colors duration-150 gap-3 md:gap-6 items-baseline"
              >
                {/* Category & Name (4 Cols) */}
                <div className="md:col-span-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                    {spec.categoryLabel}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {spec.name}
                  </span>
                </div>

                {/* Value & Highlight (4 Cols) */}
                <div className="md:col-span-4">
                  <span className="text-xs sm:text-sm font-mono font-medium text-emerald-400/90 bg-emerald-950/30 px-2.5 py-1 rounded border border-emerald-800/30 inline-block">
                    {spec.value}
                  </span>
                </div>

                {/* Engineering Detail (4 Cols) */}
                <div className="md:col-span-4">
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {spec.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
