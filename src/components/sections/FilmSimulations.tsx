import React, { useState } from 'react';

interface SimulationItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  alt: string;
  accentColor: string;
  badge: string;
  subject: string;
  quote: string;
  description: string;
  exif: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    wb: string;
  };
}

const SIMULATIONS: SimulationItem[] = [
  {
    id: 'reala-ace',
    name: 'REALA ACE',
    tag: 'NUEVA SIMULACIÓN INSIGNIA',
    image: '/images/gallery-01-reala.webp',
    alt: 'Retrato callejero cálido capturado con simulación REALA ACE',
    accentColor: '#E29578', // Warm amber
    badge: 'Tono Fiel & Piel Natural',
    subject: 'Retrato Callejero · Luz Dorada',
    quote: 'La síntesis definitiva de la ciencia del color químico de Fujifilm.',
    description:
      'Inspirada en el legendario negativo en color Superia Reala, esta nueva formulación proporciona una reproducción cromática sumamente fiel con una curva de contraste balanceada. Los tonos de piel se representan con una calidez orgánica única, preservando microtexturas en altas luces sin saturación artificial.',
    exif: {
      lens: 'FUJINON 23mm (Eq. 35mm)',
      aperture: 'f/2.0',
      shutter: '1/1000s',
      iso: 'ISO 125',
      wb: 'Luz de Día (5600K)',
    },
  },
  {
    id: 'acros',
    name: 'ACROS + R Filter',
    tag: 'MONOCROMO DE ALTO CONTRASTE',
    image: '/images/gallery-02-acros.webp',
    alt: 'Arquitectura brutalista y sombras capturada con simulación ACROS',
    accentColor: '#D4D4D8', // Crisp Silver
    badge: 'Gradación Tonal Analógica',
    subject: 'Geometría Brutalista · Sombras Duras',
    quote: 'Negros densos y grano que responde a la intensidad de la luz.',
    description:
      'Mucho más que un desaturado digital: ACROS calcula matemáticamente la estructura del grano en base al brillo de cada píxel, imitando la respuesta de los haluros de plata de la película química homónima. El filtro rojo virtual intensifica el contraste en cielos y sombras arquitectónicas.',
    exif: {
      lens: 'FUJINON 23mm (Eq. 35mm)',
      aperture: 'f/5.6',
      shutter: '1/250s',
      iso: 'ISO 400',
      wb: 'Automático',
    },
  },
  {
    id: 'classic-chrome',
    name: 'Classic Chrome',
    tag: 'DOCUMENTAL PERIODÍSTICO',
    image: '/images/gallery-03-chrome.webp',
    alt: 'Calle lluviosa nocturna con neón capturada con simulación Classic Chrome',
    accentColor: '#7E9F99', // Muted cyan/olive
    badge: 'Estética Editorial del Siglo XX',
    subject: 'Lluvia Nocturna · Asfalto & Neón',
    quote: 'El lenguaje visual de las revistas de reportaje que definieron una época.',
    description:
      'Diseñada para narrar historias humanas en la calle. Presenta una ligera desaturación general combinada con una compresión tonal agresiva en las sombras, transmitiendo gravedad documental y una atmósfera cinematográfica instantánea en cualquier condición lumínica.',
    exif: {
      lens: 'FUJINON 23mm (Eq. 35mm)',
      aperture: 'f/2.8',
      shutter: '1/60s',
      iso: 'ISO 1600',
      wb: 'Luz Fluorescente Cálida',
    },
  },
];

const OTHER_PROFILES = [
  'PROVIA / Standard',
  'Velvia / Vivid',
  'ASTIA / Soft',
  'Classic Neg.',
  'Nostalgic Neg.',
  'ETERNA / Cinema',
  'ETERNA Bleach Bypass',
  'PRO Neg. Hi',
  'PRO Neg. Std',
  'Monochrome',
  'Sepia',
];

export default function FilmSimulations() {
  const [selectedId, setSelectedId] = useState<string>('reala-ace');

  const current = SIMULATIONS.find((s) => s.id === selectedId) || SIMULATIONS[0];

  return (
    <section id="gallery" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/[0.08] overflow-hidden">
      {/* Background illumination accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: current.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accentColor }} />
            04 / LABORATORIO DE COLOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            80 años de química cinematográfica. <br />
            <span className="text-neutral-400">Directo desde la cámara a 40.2 MP.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Sin necesidad de posprocesado ni curvas complejas en el ordenador. Selecciona entre 20 recetas de simulación de película legendarias desarrolladas por los mismos químicos que crearon el estándar del cine.
          </p>
        </div>

        {/* Film Simulation Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {SIMULATIONS.map((sim) => {
            const isSelected = sim.id === selectedId;
            return (
              <button
                key={sim.id}
                onClick={() => setSelectedId(sim.id)}
                className={`group px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.25)] scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{ backgroundColor: sim.accentColor }}
                />
                <span>{sim.name}</span>
                <span className={`text-[10px] hidden sm:inline ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  · {sim.subject.split('·')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Showcase Stage: Photo Viewer + EXIF Telemetric Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Main Photo Viewer (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-neutral-950/90 shadow-2xl group">
              <div className="aspect-[16/9] w-full relative overflow-hidden">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-full object-cover transition-all duration-700 ease-out filter brightness-[0.98] contrast-[1.02]"
                  loading="lazy"
                />

                {/* Subtle vignette border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

                {/* Film Profile Badge Top Left */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accentColor }} />
                  <span className="font-semibold">{current.name}</span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-neutral-300 text-[10px]">{current.badge}</span>
                </div>

                {/* Resolution Badge Bottom Right */}
                <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                  40.2 MP NATIVO
                </div>
              </div>
            </div>
          </div>

          {/* EXIF & Profile Editorial Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-xl">
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                {current.tag}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {current.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                {current.subject}
              </p>

              <blockquote className="border-l-2 border-white/20 pl-3 italic text-xs text-neutral-300 mb-4 font-light">
                "{current.quote}"
              </blockquote>

              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Telemetric EXIF Matrix */}
              <div className="border-t border-white/[0.08] pt-4">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
                  DATOS EXIF DE LA TOMA
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                    <span className="text-neutral-500 block text-[9px]">LENTE</span>
                    <span className="text-white text-[11px]">{current.exif.lens}</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                    <span className="text-neutral-500 block text-[9px]">APERTURA</span>
                    <span className="text-white font-semibold text-[11px]">{current.exif.aperture}</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                    <span className="text-neutral-500 block text-[9px]">VELOCIDAD</span>
                    <span className="text-white text-[11px]">{current.exif.shutter}</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                    <span className="text-neutral-500 block text-[9px]">ISO</span>
                    <span className="text-white text-[11px]">{current.exif.iso}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Switcher Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {SIMULATIONS.map((sim) => {
                const isSelected = sim.id === selectedId;
                return (
                  <button
                    key={sim.id}
                    onClick={() => setSelectedId(sim.id)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-white ring-2 ring-white/30 scale-[1.03]'
                        : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/20'
                    }`}
                    aria-label={`Seleccionar simulación ${sim.name}`}
                  >
                    <img src={sim.image} alt={sim.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/90 to-transparent text-[9px] font-mono text-center text-white truncate">
                      {sim.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Extended Film Simulation Catalog Pill Matrix */}
        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                CATÁLOGO COMPLETO
              </span>
              <h4 className="text-sm font-semibold text-white">
                20 Simulaciones de Película Integradas en Firmware
              </h4>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Formulaciones de color originales de Fujifilm
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white text-black font-semibold">
              ★ REALA ACE
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/10 text-white border border-white/20">
              ★ ACROS (+Ye, +R, +G)
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/10 text-white border border-white/20">
              ★ Classic Chrome
            </span>
            {OTHER_PROFILES.map((name, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.03] text-neutral-400 border border-white/5"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
