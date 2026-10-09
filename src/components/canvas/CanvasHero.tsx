import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 180;

interface StageInfo {
  stage: number;
  progress: number;
}

export default function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<StageInfo>({ stage: 1, progress: 0 });
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);

  // Helper to render frame onto high-DPI canvas
  const renderFrame = (targetFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    currentFrameRef.current = targetFrame;
    const images = imagesRef.current;

    // Find requested frame or fallback to closest loaded frame
    let imgToDraw: HTMLImageElement | null = images[targetFrame];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      let closestDist = Infinity;
      let closestImg: HTMLImageElement | null = null;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = images[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - targetFrame);
          if (dist < closestDist) {
            closestDist = dist;
            closestImg = candidate;
          }
        }
      }
      imgToDraw = closestImg;
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const iw = imgToDraw.naturalWidth;
    const ih = imgToDraw.naturalHeight;

    const hRatio = w / iw;
    const vRatio = h / ih;
    const isPortrait = h > w;

    // Dynamic scale: safe margins across all resolutions
    const scale = isPortrait
      ? Math.min(hRatio * 0.96, vRatio * 0.65)
      : Math.min(hRatio * 0.92, vRatio * 0.88);

    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (w - nw) / 2;
    const cy = (h - nh) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(imgToDraw, cx, cy, nw, nh);
  };

  // Handle canvas sizing for Retina / High-DPI screens
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    renderFrame(currentFrameRef.current);
  };

  // Progressive frame loading pipeline
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    const handleSingleLoad = (index: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      imagesRef.current[index] = img;
      loaded++;
      setLoadedCount(loaded);

      // Render frame 0 immediately once ready
      if (index === 0 && currentFrameRef.current === 0) {
        renderFrame(0);
      }

      if (loaded === TOTAL_FRAMES) {
        setIsFullyLoaded(true);
      }
    };

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]?.complete) {
          resolve();
          return;
        }
        const img = new Image();
        const paddedIndex = String(index + 1).padStart(3, '0');
        img.src = `/frames/frame_${paddedIndex}.webp`;
        img.onload = () => {
          handleSingleLoad(index, img);
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Priority 1: Frame 0 (instant LCP)
    loadFrame(0).then(() => {
      if (isCancelled) return;

      // Priority 2: Keyframe milestones [44, 89, 134, 179]
      const milestones = [44, 89, 134, 179];
      Promise.all(milestones.map((idx) => loadFrame(idx))).then(() => {
        if (isCancelled) return;

        // Priority 3: Remaining frames in asynchronous batches of 8
        const remainingIndices: number[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (i !== 0 && !milestones.includes(i)) {
            remainingIndices.push(i);
          }
        }

        const BATCH_SIZE = 8;
        let batchPointer = 0;

        const loadNextBatch = () => {
          if (isCancelled || batchPointer >= remainingIndices.length) return;
          const slice = remainingIndices.slice(batchPointer, batchPointer + BATCH_SIZE);
          batchPointer += BATCH_SIZE;

          Promise.all(slice.map((idx) => loadFrame(idx))).then(() => {
            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(loadNextBatch, { timeout: 200 });
            } else {
              setTimeout(loadNextBatch, 30);
            }
          });
        };

        loadNextBatch();
      });
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // GSAP ScrollTrigger setup & Lenis integration
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Synchronize Lenis with ScrollTrigger if available
    const checkLenis = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
      }
    };
    checkLenis();

    const triggerElem = containerRef.current;
    if (!triggerElem) return;

    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerElem,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          frameObj.frame = targetFrameIndex;
          renderFrame(targetFrameIndex);

          // Update active storytelling stage based on scroll progress
          if (progress < 0.25) {
            setActiveStage({ stage: 1, progress: progress / 0.25 });
          } else if (progress < 0.55) {
            setActiveStage({ stage: 2, progress: (progress - 0.25) / 0.3 });
          } else if (progress < 0.85) {
            setActiveStage({ stage: 3, progress: (progress - 0.55) / 0.3 });
          } else {
            setActiveStage({ stage: 4, progress: (progress - 0.85) / 0.15 });
          }
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert();
    };
  }, []);

  // Compute opacity & visibility for each stage
  const getStageOpacity = (stageNum: number) => {
    if (activeStage.stage === stageNum) return 1;
    return 0;
  };

  return (
    <section
      ref={containerRef}
      id="canvas-hero-container"
      className="relative w-full h-[400vh] bg-[#0A0A0A]"
      aria-label="Experiencia interactiva 3D Fujifilm X100VI"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0A0A0A]">
        {/* Soft radial backdrop illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(10,10,10,0.8)_60%,#0A0A0A_100%)] pointer-events-none" />

        {/* The 60fps Scrollytelling Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none select-none z-0"
        />

        {/* Narrative Overlays Container */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between py-12 pointer-events-none">
          {/* Top spacer for header clearance */}
          <div className="h-14" />

          {/* Central Overlay Stage Wrapper */}
          <div className="relative w-full flex items-center justify-center min-h-[360px]">
            {/* STAGE 1: El Encuentro (0% - 25% Scroll) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-3xl mx-auto transition-all duration-700 ease-out"
              style={{
                opacity: getStageOpacity(1),
                transform: activeStage.stage === 1 ? 'translateY(0)' : 'translateY(16px)',
                pointerEvents: activeStage.stage === 1 ? 'auto' : 'none',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                FUJIFILM X100VI · SERIE X
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.08] drop-shadow-md">
                El arte de ver <br className="hidden sm:inline" /> el mundo.
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                Diseño analógico atemporal acoplado a la ingeniería digital más avanzada jamás concebida por Fujifilm.
              </p>
            </div>

            {/* STAGE 2: Precisión en Cada Ángulo (25% - 55% Scroll) */}
            <div
              className="absolute inset-0 flex items-center justify-start max-w-xl transition-all duration-700 ease-out"
              style={{
                opacity: getStageOpacity(2),
                transform: activeStage.stage === 2 ? 'translateX(0)' : 'translateX(-24px)',
                pointerEvents: activeStage.stage === 2 ? 'auto' : 'none',
              }}
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl shadow-2xl">
                <span className="inline-block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                  01 / MECANIZADO MONOLÍTICO
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Ingeniería táctil <br />sin concesiones.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-light">
                  Cada dial se labra a partir de un bloque monolítico de aluminio aeronáutico. La confirmación mecánica precisa precede a cada disparo con una respuesta háptica inolvidable.
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-neutral-300">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Aluminio CNC</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Respuesta Háptica</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Grabado Láser</span>
                </div>
              </div>
            </div>

            {/* STAGE 3: La Mirada Fujinon (55% - 85% Scroll) */}
            <div
              className="absolute inset-0 flex items-center justify-end max-w-xl ml-auto transition-all duration-700 ease-out"
              style={{
                opacity: getStageOpacity(3),
                transform: activeStage.stage === 3 ? 'translateX(0)' : 'translateX(24px)',
                pointerEvents: activeStage.stage === 3 ? 'auto' : 'none',
              }}
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl shadow-2xl text-left">
                <span className="inline-block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                  02 / ÓPTICA FIJA DE ÉLITE
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  FUJINON 23mm f/2 II.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-light">
                  Calculado para resolver la nitidez del nuevo sensor de 40.2 Megapíxeles de centro a esquina. Incorpora un filtro ND interno de 4 pasos para disparar a máxima apertura incluso bajo luz cegadora.
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-neutral-300">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Equiv. 35mm</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">f/2.0 Apertura</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Filtro ND 4 Pasos</span>
                </div>
              </div>
            </div>

            {/* STAGE 4: El Retrato Heroico (85% - 100% Scroll) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-2xl mx-auto transition-all duration-700 ease-out"
              style={{
                opacity: getStageOpacity(4),
                transform: activeStage.stage === 4 ? 'translateY(0)' : 'translateY(16px)',
                pointerEvents: activeStage.stage === 4 ? 'auto' : 'none',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-4">
                UNA LEYENDA VIVA
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Una compañera para toda la vida.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-lg mb-8 leading-relaxed">
                Construida para estar contigo en cada calle, en cada viaje, en cada instante decisivo.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#optics"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-black bg-white hover:bg-neutral-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all pointer-events-auto cursor-pointer"
                >
                  Descubrir Anatomía Óptica
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Scroll Indicator & Progressive Loading Status */}
          <div className="w-full flex items-center justify-between text-xs text-neutral-400">
            {/* Scroll indicator with animated vertical pulse */}
            <div
              className="flex items-center gap-3 transition-opacity duration-500"
              style={{ opacity: activeStage.stage === 4 ? 0 : 1 }}
            >
              <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
              </div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                Scroll para explorar
              </span>
            </div>

            {/* Discreet High-Res Sequence Preload Indicator */}
            {!isFullyLoaded && (
              <div className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Secuencia 1080p: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
