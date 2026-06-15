'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Picture 01 - Atacadão
import p01f1 from '../assets/images/mansory portifolio/picture 01/ATACADAO_SEMPRE_EM_FRENTE_FILME_60_FINAL.mp4.00_00_25_14.Still004.jpg'
import p01f2 from '../assets/images/mansory portifolio/picture 01/ATACADAO_SEMPRE_EM_FRENTE_FILME_60_FINAL.mp4.00_00_54_12.Still005.jpg'
import p01f3 from '../assets/images/mansory portifolio/picture 01/ATACADAO_SEMPRE_EM_FRENTE_FILME_60_FINAL.mp4.00_00_57_10.Still006.jpg'

// Picture 02 - BB Seguros
import p02f1 from '../assets/images/mansory portifolio/picture 02/BB_SEGUROS_ONIBUS_30_16x9_BL.mp4.00_00_16_13.Still001.jpg'
import p02f2 from '../assets/images/mansory portifolio/picture 02/BB_SEGUROS_PARQUE_30_16x9_BL.mp4.00_00_18_08.Still001.jpg'
import p02f3 from '../assets/images/mansory portifolio/picture 02/BB_SEGUROS_VIDASOCIAL_30_16x9_BL.mp4.00_00_26_20.Still001.jpg'

// Picture 03 - Caedu
import p03f1 from '../assets/images/mansory portifolio/picture 03/CAEDU_MAES_30_FINAL.mp4.00_00_05_03.Still002.jpg'
import p03f2 from '../assets/images/mansory portifolio/picture 03/CAEDU_MAES_30_FINAL.mp4.00_00_08_08.Still003.jpg'
import p03f3 from '../assets/images/mansory portifolio/picture 03/CAEDU_MAES_30_FINAL.mp4.00_00_19_10.Still004.jpg'

// Picture 04 - Cheetos
import p04f1 from '../assets/images/mansory portifolio/picture 04/COPIA_Cheetos_30_online_15.mp4.00_00_04_06.Still003.jpg'
import p04f2 from '../assets/images/mansory portifolio/picture 04/COPIA_Cheetos_30_online_15.mp4.00_00_12_05.Still002.jpg'
import p04f3 from '../assets/images/mansory portifolio/picture 04/COPIA_Cheetos_30_online_15.mp4.00_00_20_06.Still001.jpg'

// Picture 05 - Coralit
import p05f1 from '../assets/images/mansory portifolio/picture 05/CORALIT_FINAL_YT_v3.mp4.00_01_48_05.Still001.jpg'
import p05f2 from '../assets/images/mansory portifolio/picture 05/CORALIT_FINAL_YT_v3.mp4.00_02_24_09.Still002.jpg'
import p05f3 from '../assets/images/mansory portifolio/picture 05/CORALIT_FINAL_YT_v3.mp4.00_02_57_27.Still003.jpg'

// Picture 06 - Mobil
import p06f1 from '../assets/images/mansory portifolio/picture 06/MOBIL - FILME 1.mp4.00_00_22_03.Still003.jpg'
import p06f2 from '../assets/images/mansory portifolio/picture 06/MOBIL - FILME 1.mp4.00_00_35_14.Still002.jpg'
import p06f3 from '../assets/images/mansory portifolio/picture 06/MOBIL - FILME 1.mp4.00_00_46_20.Still001.jpg'

// Picture 07 - Natura
import p07f1 from '../assets/images/mansory portifolio/picture 07/NATURA_simpatia_FINAL.mp4.00_00_00_00.Still001.jpg'
import p07f2 from '../assets/images/mansory portifolio/picture 07/NATURA_simpatia_FINAL.mp4.00_00_05_06.Still002.jpg'
import p07f3 from '../assets/images/mansory portifolio/picture 07/NATURA_simpatia_FINAL.mp4.00_03_32_22.Still003.jpg'

// Picture 08 - Nazca
import p08f1 from '../assets/images/mansory portifolio/picture 08/NAZCA_30_FINAL.mp4.00_00_10_02.Still005.jpg'
import p08f2 from '../assets/images/mansory portifolio/picture 08/NAZCA_30_FINAL.mp4.00_00_11_05.Still004.jpg'
import p08f3 from '../assets/images/mansory portifolio/picture 08/NAZCA_30_FINAL.mp4.00_00_30_02.Still007.jpg'

// Ballantines
import bal1 from '../assets/images/mansory portifolio/Ballantines/Ballantines 01.png'
import bal2 from '../assets/images/mansory portifolio/Ballantines/Ballantines 02.png'

// Electrolux
import ele1 from '../assets/images/mansory portifolio/Electrolux/Electrolux 01.png'
import ele2 from '../assets/images/mansory portifolio/Electrolux/Electrolux 02.png'
import ele3 from '../assets/images/mansory portifolio/Electrolux/Electrolux 03.png'

// Fumasil
import fum1 from '../assets/images/mansory portifolio/Fumasil/Fumasil 01.png'
import fum2 from '../assets/images/mansory portifolio/Fumasil/Fumasil 02.png'

// Hardon
import har1 from '../assets/images/mansory portifolio/Hardon/Hardon 01.png'
import har2 from '../assets/images/mansory portifolio/Hardon/Hardon 02.png'
import har3 from '../assets/images/mansory portifolio/Hardon/Hardon 05.png'

// Krisiun
import kri1 from '../assets/images/mansory portifolio/Krisiun/KRISIUN 01.png'
import kri2 from '../assets/images/mansory portifolio/Krisiun/KRISIUN 02.png'
import kri3 from '../assets/images/mansory portifolio/Krisiun/KRISIUN 03.png'

// Kumon
import kum1 from '../assets/images/mansory portifolio/Kumon/KUMON 01.png'
import kum2 from '../assets/images/mansory portifolio/Kumon/KUMON 03.png'
import kum3 from '../assets/images/mansory portifolio/Kumon/KUMON 04.png'

// Medley
import med1 from '../assets/images/mansory portifolio/Medley/MEDLEY 01.png'
import med2 from '../assets/images/mansory portifolio/Medley/MEDLEY 02.png'
import med3 from '../assets/images/mansory portifolio/Medley/MEDLEY 03.png'

// Natal
import nat1 from '../assets/images/mansory portifolio/Natal/Natal_SdeSamba 01.png'
import nat2 from '../assets/images/mansory portifolio/Natal/Natal_SdeSamba 02.png'
import nat3 from '../assets/images/mansory portifolio/Natal/Natal_SdeSamba 03.png'

// Silvia Popovic
import sil1 from '../assets/images/mansory portifolio/Silvia/Silvia Popòvic 01.png'

// Valda
import val1 from '../assets/images/mansory portifolio/Valda/Valda 01.png'
import val2 from '../assets/images/mansory portifolio/Valda/Valda 02.png'
import val3 from '../assets/images/mansory portifolio/Valda/Valda 03.png'

// O Outro Lado da Moema
import moema1 from '../assets/images/mansory portifolio/outro-lado-da-moema/WhatsApp Image 2026-06-15 at 11.18.47.jpeg'
import moema2 from '../assets/images/mansory portifolio/outro-lado-da-moema/WhatsApp Image 2026-06-15 at 11.18.47 (1).jpeg'
import moema3 from '../assets/images/mansory portifolio/outro-lado-da-moema/WhatsApp Image 2026-06-15 at 11.18.48.jpeg'

interface MasonryItem {
  id: string
  frames: StaticImageData[]
}

const FRAME_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'

const PORTFOLIO_ITEMS: MasonryItem[] = [
  { id: 'outro-lado-moema', frames: [moema1, moema2, moema3] },
  { id: 'ballantines', frames: [bal1, bal2] },
  { id: 'electrolux', frames: [ele1, ele2, ele3] },
  { id: 'fumasil', frames: [fum1, fum2] },
  { id: 'hardon', frames: [har1, har2, har3] },
  { id: 'krisiun', frames: [kri1, kri2, kri3] },
  { id: 'kumon', frames: [kum1, kum2, kum3] },
  { id: 'medley', frames: [med1, med2, med3] },
  { id: 'natal', frames: [nat1, nat2, nat3] },
  { id: 'silvia-popovic', frames: [sil1] },
  { id: 'valda', frames: [val1, val2, val3] },
  { id: 'atacadao', frames: [p01f1, p01f2, p01f3] },
  { id: 'bb-seguros', frames: [p02f1, p02f2, p02f3] },
  { id: 'caedu', frames: [p03f1, p03f2, p03f3] },
  { id: 'cheetos', frames: [p04f1, p04f2, p04f3] },
  { id: 'coralit', frames: [p05f1, p05f2, p05f3] },
  { id: 'mobil', frames: [p06f1, p06f2, p06f3] },
  { id: 'natura', frames: [p07f1, p07f2, p07f3] },
  { id: 'nazca', frames: [p08f1, p08f2, p08f3] },
]

// Distribui os itens em N colunas sempre escolhendo a coluna mais curta no momento.
// Usa a proporção real (altura/largura) de cada imagem como peso de altura,
// garantindo empacotamento justo (sem buracos) e colunas equilibradas.
function distribuirColunas(items: MasonryItem[], numCols: number): MasonryItem[][] {
  const cols: MasonryItem[][] = Array.from({ length: numCols }, () => [])
  const alturas = new Array(numCols).fill(0)
  for (const item of items) {
    const f = item.frames[0]
    const peso = f.height / f.width
    let menor = 0
    for (let i = 1; i < numCols; i++) {
      if (alturas[i] < alturas[menor]) menor = i
    }
    cols[menor].push(item)
    alturas[menor] += peso
  }
  return cols
}

function MasonryCard({ item }: { item: MasonryItem }) {
  const [activeFrame, setActiveFrame] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const progress = x / rect.width
    const n = item.frames.length
    const frameIndex = Math.min(Math.floor(progress * n), n - 1)
    setActiveFrame(frameIndex)
  }, [item.frames.length])

  const handleMouseLeave = useCallback(() => {
    setActiveFrame(0)
  }, [])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primeira imagem visível define a altura natural do card */}
      <Image
        src={item.frames[0]}
        alt={`${item.id} frame 1`}
        sizes={FRAME_SIZES}
        className="w-full h-auto block transition-opacity duration-200"
        style={{ opacity: activeFrame === 0 ? 1 : 0 }}
      />

      {/* Frames 2 e 3 posicionados absolutamente sobre o primeiro */}
      {item.frames.slice(1).map((frame, i) => (
        <Image
          key={i + 1}
          src={frame}
          alt={`${item.id} frame ${i + 2}`}
          fill
          sizes={FRAME_SIZES}
          className="object-cover transition-opacity duration-200"
          style={{ opacity: i + 1 === activeFrame ? 1 : 0 }}
        />
      ))}

      {/* Indicadores de frame */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.frames.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === activeFrame ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function SecaoMasonry() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [colunas, setColunas] = useState(3)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setColunas(w < 768 ? 1 : w < 1024 ? 2 : 3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const buckets = useMemo(() => distribuirColunas(PORTFOLIO_ITEMS, colunas), [colunas])

  useEffect(() => {
    const container = videoContainerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
          video.currentTime = 0
        }
      },
      { threshold: 0 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 py-20 px-10"
      >
        <div className="mb-16">
          <span
            className={`text-white/50 text-xs font-semibold tracking-[0.2em] uppercase block transition-all duration-1000 ease-out ${
              sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Portfolio
          </span>
          <h2
            className={`text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mt-3 transition-all duration-1000 ease-out ${
              sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Projetos que viraram entrega
          </h2>
          <p
            className={`text-white/70 text-lg md:text-xl leading-relaxed mt-4 max-w-2xl transition-all duration-1000 ease-out ${
              sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            Produção potencializada por tecnologia e inteligência aplicada!
          </p>
        </div>

        {/* Subseção: Portfolio videos */}
        <div
          className={`mb-20 transition-all duration-1000 ease-out ${
            sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
            Portfolio videos
          </span>
          <div ref={videoContainerRef} className="w-full rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="/video.mp4"
              className="w-full h-auto"
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="mt-4 px-1">
            <p className="text-white/90 text-lg md:text-xl leading-snug">
              <span className="font-bold">Iemanjá</span>
              {' '}
              <span className="text-white/60">—</span>
              {' '}
              <span className="text-white/70">Curta metragem composto com cenas de IA e live action</span>
            </p>
          </div>
        </div>

        {/* Subseção: Portfolio pictures */}
        <div
          className={`transition-all duration-1000 ease-out ${
            sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <span className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
            Portfolio pictures
          </span>
          <div className="flex gap-4 items-start">
            {buckets.map((coluna, ci) => (
              <div key={ci} className="flex flex-col gap-4 flex-1 min-w-0">
                {coluna.map(item => (
                  <MasonryCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
