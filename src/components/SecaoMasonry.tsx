import { useState, useCallback, useRef, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import portfolioVideo from '../assets/videos/video.mp4'

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

interface MasonryItem {
  id: string
  frames: string[]
}

const PORTFOLIO_ITEMS: MasonryItem[] = [
  { id: 'atacadao', frames: [p01f1, p01f2, p01f3] },
  { id: 'bb-seguros', frames: [p02f1, p02f2, p02f3] },
  { id: 'caedu', frames: [p03f1, p03f2, p03f3] },
  { id: 'cheetos', frames: [p04f1, p04f2, p04f3] },
  { id: 'coralit', frames: [p05f1, p05f2, p05f3] },
  { id: 'mobil', frames: [p06f1, p06f2, p06f3] },
  { id: 'natura', frames: [p07f1, p07f2, p07f3] },
  { id: 'nazca', frames: [p08f1, p08f2, p08f3] },
]

function MasonryCard({ item }: { item: MasonryItem }) {
  const [activeFrame, setActiveFrame] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const progress = x / rect.width
    const frameIndex = Math.min(Math.floor(progress * 3), 2)
    setActiveFrame(frameIndex)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveFrame(0)
  }, [])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden mb-4 group cursor-pointer break-inside-avoid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primeira imagem visível define a altura natural do card */}
      <img
        src={item.frames[0]}
        alt={`${item.id} frame 1`}
        className="w-full h-auto block transition-opacity duration-200"
        style={{ opacity: activeFrame === 0 ? 1 : 0 }}
        loading="lazy"
      />

      {/* Frames 2 e 3 posicionados absolutamente sobre o primeiro */}
      {item.frames.slice(1).map((frame, i) => (
        <img
          key={i + 1}
          src={frame}
          alt={`${item.id} frame ${i + 2}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
          style={{ opacity: i + 1 === activeFrame ? 1 : 0 }}
          loading="lazy"
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
            O jeito Birutinha
            <br />
            de entregar
          </h2>
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
              src={portfolioVideo}
              className="w-full h-auto"
              muted
              loop
              playsInline
              preload="metadata"
            />
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
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {PORTFOLIO_ITEMS.map(item => (
              <MasonryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
