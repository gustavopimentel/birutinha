'use client'

import { useRef, useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import CardTime from './CardTime'
import ModalReel from './ModalReel'
import peixinhoSvg from '../assets/images/home/peixinho.svg'

import guil from '../assets/images/time/Guil Valente.png'
import guto from '../assets/images/time/Guto Gomes.png'
import giovanna from '../assets/images/time/Giovanna Postiglione.png'
import dani from '../assets/images/time/Dani Libardi.png'

interface PeixinhoConfig {
  size: number      // px
  top: string       // CSS top
  speed: number     // px por frame (~60fps)
  blur: number      // px de desfoque
  opacity: number
  phase: number     // posição X inicial (0-100, % do container)
  flip: boolean     // nada para esquerda?
}

const PEIXINHOS: PeixinhoConfig[] = [
  { size: 320, top: '2%',  speed: 0.18, blur: 0,  opacity: 0.13, phase: 10,  flip: false },
  { size: 80,  top: '15%', speed: 0.55, blur: 6,  opacity: 0.12, phase: 55,  flip: false },
  { size: 130, top: '32%', speed: 0.30, blur: 2,  opacity: 0.16, phase: 75,  flip: true  },
  { size: 60,  top: '48%', speed: 0.70, blur: 8,  opacity: 0.10, phase: 30,  flip: false },
  { size: 200, top: '55%', speed: 0.20, blur: 0,  opacity: 0.14, phase: 80,  flip: true  },
  { size: 50,  top: '68%', speed: 0.85, blur: 10, opacity: 0.09, phase: 5,   flip: false },
  { size: 110, top: '75%', speed: 0.38, blur: 4,  opacity: 0.15, phase: 45,  flip: true  },
  { size: 260, top: '80%', speed: 0.15, blur: 0,  opacity: 0.12, phase: 60,  flip: false },
  { size: 70,  top: '88%', speed: 0.60, blur: 7,  opacity: 0.11, phase: 20,  flip: true  },
  { size: 90,  top: '22%', speed: 0.45, blur: 5,  opacity: 0.10, phase: 90,  flip: false },
]

const REEL_BASE = 'https://scxsixaagkaeeqtvhfuj.supabase.co/storage/v1/object/public/reels'

const MEMBROS = [
  { foto: guil,     nome: 'Guil Valente',          cargo: 'Diretor de IA e Live Action', reel: `${REEL_BASE}/guil-valente.mp4` },
  { foto: guto,     nome: 'Guto Gomes',            cargo: 'Diretor',                      reel: `${REEL_BASE}/guto-gomes.mp4` },
  { foto: giovanna, nome: 'Giovanna Postiglione',  cargo: 'Diretora',                     reel: '' },
  { foto: dani,     nome: 'Dani Libardi',          cargo: 'Diretora',                     reel: `${REEL_BASE}/dani-libardi.mp4` },
]

export default function SecaoTime() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible
  const sectionRef = useRef<HTMLElement>(null)
  const [reel, setReel] = useState<{ url: string; nome: string } | null>(null)
  const decorRefs = useRef<(HTMLImageElement | null)[]>([])
  const posRef = useRef<number[]>(PEIXINHOS.map(p => p.phase))
  const rafRef = useRef(0)

  useEffect(() => {
    const animate = () => {
      const container = sectionRef.current
      const W = container ? container.offsetWidth : window.innerWidth

      posRef.current = posRef.current.map((x, i) => {
        const cfg = PEIXINHOS[i]
        const direction = cfg.flip ? -1 : 1
        let next = x + cfg.speed * direction
        // Wrap: sai pela direita → entra pela esquerda (e vice-versa)
        const limit = W + cfg.size
        if (!cfg.flip && next > limit) next = -cfg.size
        if (cfg.flip  && next < -cfg.size) next = limit
        return next
      })

      decorRefs.current.forEach((el, i) => {
        if (!el) return
        const cfg = PEIXINHOS[i]
        const scaleX = cfg.flip ? -1 : 1
        el.style.transform = `translateX(${posRef.current[i]}px) scaleX(${scaleX})`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    // Converte phase (%) em px inicial
    const W = sectionRef.current ? sectionRef.current.offsetWidth : window.innerWidth
    posRef.current = PEIXINHOS.map(p => (p.phase / 100) * W)

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full pl-4 pr-4 pt-20 pb-10 lg:pl-48 lg:pt-10 z-10 overflow-hidden"
    >
      {/* Peixinhos flutuando no fundo */}
      {PEIXINHOS.map((cfg, i) => (
        <img
          key={i}
          ref={el => { decorRefs.current[i] = el }}
          src={peixinhoSvg.src}
          alt=""
          className="absolute pointer-events-none select-none will-change-transform"
          style={{
            width: cfg.size,
            height: cfg.size,
            top: cfg.top,
            left: 0,
            opacity: cfg.opacity,
            filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : undefined,
            transform: `translateX(${(cfg.phase / 100) * 1000}px) scaleX(${cfg.flip ? -1 : 1})`,
          }}
        />
      ))}

      <div ref={sectionAnimation.elementRef} className="relative z-10 px-2 lg:px-6">
        {/* Header */}
        <div className="mb-10">
          <span
            className={`text-white/70 text-xs font-semibold tracking-[0.2em] uppercase italic block mb-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Time
          </span>
          <h2
            className={`text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Gente nova com ideias frescas,
            <br />
            <span className="font-black">gente experiente que sabe segurar a onda</span>
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {MEMBROS.map((m, i) => (
            <div
              key={m.nome}
              className={`flex transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <CardTime
                foto={m.foto}
                nome={m.nome}
                cargo={m.cargo}
                onReels={m.reel ? () => setReel({ url: m.reel, nome: m.nome }) : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <ModalReel
        isOpen={!!reel}
        onClose={() => setReel(null)}
        reelUrl={reel?.url}
        diretorNome={reel?.nome ?? ''}
      />
    </section>
  )
}
