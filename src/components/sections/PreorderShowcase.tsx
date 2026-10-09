import React, { useState } from 'react';

type CameraFinish = 'silver' | 'black';

interface Accessory {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ACCESSORIES: Accessory[] = [
  {
    id: 'hood',
    name: 'Parasol Ventilado LH-X100 & Anillo AR-X100',
    price: 89,
    description: 'Aluminio fresado. Evita destellos parásitos y protege el elemento frontal.',
  },
  {
    id: 'filter',
    name: 'Filtro Protector PRF-49 (Weather-Seal)',
    price: 49,
    description: 'Requerido para sellado climático hermético completo contra lluvia y polvo.',
  },
  {
    id: 'battery',
    name: 'Batería Original NP-W126S Adicional',
    price: 65,
    description: '1260 mAh. Autonomía extendida para sesiones de más de 800 disparos.',
  },
];

export default function PreorderShowcase() {
  const [finish, setFinish] = useState<CameraFinish>('silver');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['hood', 'filter']);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', country: 'España' });

  const basePrice = 1599;
  const accessoriesTotal = selectedAccessories.reduce((acc, id) => {
    const item = ACCESSORIES.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalPrice = basePrice + accessoriesTotal;

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.name) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="preorder" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-b border-white/[0.08] overflow-hidden">
      {/* Subtle ambient spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-neutral-800/20 via-white/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            06 / RESERVA TU EJEMPLAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            La próxima toma te está esperando.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Disponible en dos tratamientos de superficie distintos. Selecciona el acabado que complemente tu estilo fotográfico.
          </p>
        </div>

        {/* Product Duo Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left / Visual Column: Dual Camera Image with Dynamic Spotlight (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-neutral-950/90 overflow-hidden shadow-2xl p-4 sm:p-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <img
                  src="/images/preorder-duo.webp"
                  alt="Fujifilm X100VI en acabado Silver y acabado Black"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Dynamic Focus Highlight Box over the selected camera */}
                <div
                  className={`absolute inset-y-0 w-1/2 border-2 border-white/60 pointer-events-none transition-all duration-500 rounded-lg backdrop-brightness-110 shadow-[0_0_40px_rgba(255,255,255,0.15)] ${
                    finish === 'silver' ? 'left-0' : 'left-1/2'
                  }`}
                >
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white tracking-widest uppercase">
                    SELECCIÓN: {finish.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Finish Selector Buttons below Image */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setFinish('silver')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    finish === 'silver'
                      ? 'bg-white text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.25)] scale-105'
                      : 'bg-white/5 text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  aria-pressed={finish === 'silver'}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-neutral-400 via-neutral-100 to-white border border-neutral-300" />
                  <span>Silver Clásico</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFinish('black')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    finish === 'black'
                      ? 'bg-neutral-800 text-white border border-white/30 font-semibold shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-105'
                      : 'bg-white/5 text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  aria-pressed={finish === 'black'}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-black via-neutral-900 to-neutral-700 border border-neutral-600" />
                  <span>Black Sigiloso</span>
                </button>
              </div>

              {/* Editorial note on selected finish */}
              <div className="mt-4 text-center">
                <p className="text-xs text-neutral-400 font-light">
                  {finish === 'silver'
                    ? 'Placas superior e inferior en aluminio satinado natural con grabado en negro. La silueta telemétrica icónica de la serie.'
                    : 'Acabado en anodizado negro mate profundo en cada dial, anillo y grabado. Cero reflejos y máxima discreción documental.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right / Configuration Column: Pricing & Bundle Configurator (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    PVP SUGERIDO
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                    ${totalPrice.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-neutral-400">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono text-emerald-400">
                    LOTE 2026 ACTIVO
                  </span>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    Asignación por orden
                  </div>
                </div>
              </div>

              {/* Base Camera Spec Item */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 mb-5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-white font-semibold">FUJIFILM X100VI</span>
                  <span className="text-neutral-400 block text-[11px]">
                    Acabado: {finish === 'silver' ? 'Silver Clásico' : 'Black Sigiloso'}
                  </span>
                </div>
                <span className="text-white font-semibold">${basePrice.toLocaleString()}</span>
              </div>

              {/* Optional Accessories Selector */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                  ACCESORIOS OFICIALES RECOMENDADOS
                </span>

                <div className="flex flex-col gap-2.5">
                  {ACCESSORIES.map((acc) => {
                    const isChecked = selectedAccessories.includes(acc.id);
                    return (
                      <label
                        key={acc.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                          isChecked
                            ? 'bg-white/[0.04] border-white/20 text-white'
                            : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAccessory(acc.id)}
                          className="mt-0.5 rounded border-white/20 bg-neutral-900 text-white focus:ring-0 cursor-pointer"
                        />
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between font-medium">
                            <span className={isChecked ? 'text-white' : 'text-neutral-300'}>
                              {acc.name}
                            </span>
                            <span className="font-mono text-neutral-300">+${acc.price}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                            {acc.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Primary Action CTA */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 rounded-full text-xs font-semibold tracking-wider text-black bg-[#FAFAFA] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                Reservar Configuración — ${totalPrice.toLocaleString()} USD
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-mono text-neutral-400 text-center">
                <span>Garantía Oficial Fujifilm 2 Años</span>
                <span>·</span>
                <span>Envío Asegurado Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Order Confirmation Drawer / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <>
                <div className="mb-6">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">
                    CONFIRMACIÓN DE RESERVA
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Fujifilm X100VI ({finish === 'silver' ? 'Silver' : 'Black'})
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Total configurado: ${totalPrice.toLocaleString()} USD ({selectedAccessories.length} accesorios incluidos)
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexandre Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                      País de Envío
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    >
                      <option value="España">España</option>
                      <option value="México">México</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-neutral-400 leading-relaxed mt-2">
                    Esta solicitud asigna un número de prioridad en el lote de ensamblaje. No se requiere pago inmediato. Nos pondremos en contacto cuando tu unidad esté lista para despacho.
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-full text-xs font-semibold tracking-wider text-black bg-white hover:bg-neutral-100 transition-all cursor-pointer"
                  >
                    Confirmar Reserva Prioritaria
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl mb-4">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-white mb-2">¡Reserva Registrada con Éxito!</h4>
                <p className="text-xs text-neutral-300 font-light max-w-sm mb-6 leading-relaxed">
                  Gracias, {formData.name}. Hemos guardado tu preferencia por el modelo{' '}
                  <span className="text-white font-medium">{finish.toUpperCase()}</span>. Te hemos enviado un correo de confirmación a{' '}
                  <span className="text-white font-mono">{formData.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Volver al sitio
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
