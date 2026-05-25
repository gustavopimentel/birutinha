import fernanda from '../assets/images/sobre/Fernanda.jpg'

export default function DemoPincelada() {
  return (
    <section className="relative w-full pl-4 pr-4 pt-20 pb-20 lg:pl-48 lg:pt-10 z-10">
      <div className="px-6 lg:px-16">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-10">
          Demo: 4 estilos de borda para fotos
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* MODELO 1 — clip-path SVG geométrico irregular */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-widest">1. Clip-path</span>
            <div
              style={{
                clipPath: 'polygon(5% 0%, 95% 2%, 100% 8%, 98% 92%, 94% 100%, 6% 98%, 0% 93%, 2% 7%)',
                width: 220,
                height: 280,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img src={fernanda} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* MODELO 2 — SVG feTurbulence (filtro orgânico) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-widest">2. SVG Filter</span>
            <div style={{ position: 'relative', width: 220, height: 280, flexShrink: 0 }}>
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <filter id="pincel-turbulence" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
              <img
                src={fernanda}
                alt=""
                style={{
                  width: 220,
                  height: 280,
                  objectFit: 'cover',
                  borderRadius: '12px',
                  filter: 'url(#pincel-turbulence)',
                }}
              />
            </div>
          </div>

          {/* MODELO 3 — CSS mask-image gradiente radial falhado */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-widest">3. Mask Gradient</span>
            <div
              style={{
                width: 220,
                height: 280,
                overflow: 'hidden',
                flexShrink: 0,
                WebkitMaskImage: `
                  radial-gradient(ellipse 105% 100% at 50% 50%, black 55%, transparent 75%),
                  radial-gradient(ellipse 40% 20% at 20% 10%, black 60%, transparent 80%),
                  radial-gradient(ellipse 30% 15% at 80% 5%, black 60%, transparent 80%),
                  radial-gradient(ellipse 35% 18% at 10% 90%, black 60%, transparent 80%),
                  radial-gradient(ellipse 40% 20% at 85% 88%, black 60%, transparent 80%)
                `,
                WebkitMaskComposite: 'source-over',
                maskImage: `
                  radial-gradient(ellipse 105% 100% at 50% 50%, black 55%, transparent 75%),
                  radial-gradient(ellipse 40% 20% at 20% 10%, black 60%, transparent 80%),
                  radial-gradient(ellipse 30% 15% at 80% 5%, black 60%, transparent 80%),
                  radial-gradient(ellipse 35% 18% at 10% 90%, black 60%, transparent 80%),
                  radial-gradient(ellipse 40% 20% at 85% 88%, black 60%, transparent 80%)
                `,
              } as React.CSSProperties}
            >
              <img src={fernanda} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* MODELO 4 — border-image SVG + box-shadow orgânico */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-widest">4. SVG Mask PNG</span>
            <div style={{ position: 'relative', width: 220, height: 280, flexShrink: 0 }}>
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <filter id="pincel-rough" x="-15%" y="-15%" width="130%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" seed="8" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                    <feComposite in="displaced" in2="displaced" operator="in" />
                  </filter>
                  <clipPath id="rounded-clip">
                    <rect x="10" y="10" width="200" height="260" rx="16" ry="16" />
                  </clipPath>
                </defs>
              </svg>
              <img
                src={fernanda}
                alt=""
                style={{
                  width: 220,
                  height: 280,
                  objectFit: 'cover',
                  filter: 'url(#pincel-rough)',
                  clipPath: 'inset(8px round 14px)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
