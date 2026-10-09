import React, { useState } from 'react';

interface ComponentHotspot {
  id: string;
  name: string;
  kicker: string;
  badge: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  description: string;
  specs: { label: string; value: string }[];
}

const HOTSPOTS: ComponentHotspot[] = [
  {
    id: 'optics',
    name: 'Grupo Óptico FUJINON 23mm',
    kicker: 'INGENIERÍA ÓPTICA DE PRECISIÓN',
    badge: '8 Elementos / 6 Grupos',
    x: 18,
    y: 50,
    description:
      'Construcción de ultra-alta resolución con dos elementos asféricos que mitigan las aberraciones esféricas y el coma. Formulado específicamente para exprimir los 40.2 MP del sensor desde la apertura máxima f/2.0.',
    specs: [
      { label: 'Longitud Focal', value: '23 mm (Eq. 35 mm)' },
      { label: 'Apertura Máxima', value: 'f/2.0' },
      { label: 'Filtro ND', value: '4 Pasos Integrado' },
    ],
  },
  {
    id: 'shutter',
    name: 'Obturador Central Leaf Shutter',
    kicker: 'MECÁNICA DE DISPARO SILENCIOSA',
    badge: 'Sincronización Flash 1/4000s',
    x: 58,
    y: 48,
    description:
      'A diferencia de las cortinillas tradicionales de plano focal, el obturador central de láminas integrado en el lente opera casi en silencio absoluto, genera cero vibración en el chasis y permite sincronizar flashes de estudio a cualquier velocidad hasta 1/4000s.',
    specs: [
      { label: 'Velocidad Mecánica', value: 'Hasta 1/4000s' },
      { label: 'Vibración', value: 'Cero Impacto' },
      { label: 'Acústica', value: 'Disparo Silencioso' },
    ],
  },
  {
    id: 'ibis',
    name: 'Unidad de Estabilización IBIS 5 Ejes',
    kicker: 'PRIMICIA EN LA SERIE X100',
    badge: 'Compensación 6.0 Pasos',
    x: 72,
    y: 45,
    description:
      'Un hito de miniaturización mecánica. Sensores giroscópicos y acelerómetros de alta precisión detectan el movimiento en 5 ejes, compensando hasta 6.0 pasos sin añadir grosor perceptible al perfil clásico de la cámara.',
    specs: [
      { label: 'Ejes Compensados', value: '5 Ejes (Yaw, Pitch, Roll, X, Y)' },
      { label: 'Rendimiento', value: 'Hasta 6.0 Pasos CIPA' },
      { label: 'Incremento Grosor', value: 'Menos de 2 mm' },
    ],
  },
  {
    id: 'sensor',
    name: 'Sensor X-Trans CMOS 5 HR',
    kicker: 'CORAZÓN DIGITAL DE ALTA RESOLUCIÓN',
    badge: '40.2 Megapíxeles Efectivos',
    x: 88,
    y: 44,
    description:
      'Sensor retroiluminado con algoritmo de captura de fotones optimizado. Su matriz de filtros única de Fujifilm elimina el efecto moiré sin requerir filtro óptico de paso bajo, entregando un microcontraste y definición sin precedentes.',
    specs: [
      { label: 'Resolución Neta', value: '40.2 MP (7728 × 5152)' },
      { label: 'Sensibilidad Base', value: 'ISO 125 Nativo' },
      { label: 'Filtro Óptico', value: 'Sin OLPF (Pureza Total)' },
    ],
  },
];

export default function ExplodedView() {
  const [activeId, setActiveId] = useState<string>('sensor');

  const activeItem = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  return (
    <section id="optics" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-900/10 via-emerald-800/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            02 / ANATOMÍA ÓPTICA & SENSOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Despiece de precisión. <br />
            <span className="text-neutral-400">40.2 Megapíxeles sin compromisos.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Cada elemento, desde el cristal asférico del lente fijo hasta el sensor retroiluminado X-Trans, ha sido diseñado para trabajar en perfecta armonía óptica.
          </p>
        </div>

        {/* Quick Component Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {HOTSPOTS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105'
                    : 'bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white hover:bg-white/[0.08]'
                }`}
                aria-pressed={isActive}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-neutral-500'}`} />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Exploded View Diagram Container */}
        <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-950 to-[#0A0A0A] overflow-hidden shadow-2xl flex items-center justify-center p-2 sm:p-6 mb-10 group">
          <img
            src="/images/img-overview-exploded.webp"
            alt="Despiece óptico y sensor de la Fujifilm X100VI"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] select-none transition-transform duration-700 group-hover:scale-[1.01]"
            loading="lazy"
          />

          {/* Interactive Floating Hotspots Pins */}
          {HOTSPOTS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer z-20 group/pin p-2 transition-transform duration-300 ${
                  isActive ? 'scale-125' : 'scale-100 hover:scale-110'
                }`}
                aria-label={`Ver detalles de ${item.name}`}
              >
                {/* Ping wave */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                    isActive ? 'bg-white' : 'bg-white/40'
                  }`}
                />
                {/* Core Pin Ring */}
                <span
                  className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-xl backdrop-blur-md transition-colors ${
                    isActive
                      ? 'bg-white text-black border-white ring-4 ring-white/20'
                      : 'bg-black/80 text-white border-white/30 hover:border-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-white'}`} />
                </span>

                {/* Floating label on hover */}
                <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-7 px-2.5 py-1 rounded bg-black/90 border border-white/15 text-[10px] font-mono text-neutral-200 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Component Detailed Specification Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                {activeItem.kicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {activeItem.name}
              </h3>
            </div>
            <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-mono text-neutral-300 bg-white/5 border border-white/10">
              {activeItem.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
            {activeItem.description}
          </p>

          {/* Metric Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeItem.specs.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  {spec.label}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
