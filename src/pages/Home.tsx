import { useState, useRef, useEffect, useCallback } from 'react'
import MenuLateral from '../components/MenuLateral'
import VideoBackground from '../components/VideoBackground'
import SlideIndicators from '../components/SlideIndicators'
import ProximaSecao from '../components/ProximaSecao'
import { VIDEOS } from '../config/videos'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNextSection, setShowNextSection] = useState(false)
  const nextSectionRef = useRef<HTMLDivElement>(null)
  const slidesSectionRef = useRef<HTMLDivElement>(null)

  const handleScrollToNextSection = useCallback(() => {
    setShowNextSection(true)
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  // Volta para os slides quando faz scroll para cima na próxima seção
  useEffect(() => {
    if (!showNextSection) return

    const handleWheel = (e: WheelEvent) => {
      // Se está na próxima seção e faz scroll para cima, volta para os slides
      if (e.deltaY < -30) {
        e.preventDefault()
        e.stopPropagation()
        setShowNextSection(false)
        setTimeout(() => {
          slidesSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [showNextSection])

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Menu e Indicadores - Fixos em todas as seções */}
      <MenuLateral isSlideSection={!showNextSection} />
      {!showNextSection && (
        <SlideIndicators
          currentIndex={currentSlide}
          totalSlides={VIDEOS.length}
          onSlideChange={setCurrentSlide}
        />
      )}

      {/* Seção dos Slides - 100vh */}
      <div ref={slidesSectionRef} className="relative w-full h-screen overflow-hidden bg-slate-900">
        <VideoBackground
          currentIndex={currentSlide}
          onSlideChange={setCurrentSlide}
          onScrollToNextSection={handleScrollToNextSection}
          isActive={!showNextSection}
        />
      </div>

      {/* Próxima Seção - 100vh */}
      {showNextSection && (
        <div ref={nextSectionRef} className="relative w-full h-screen">
          <ProximaSecao />
        </div>
      )}
    </div>
  )
}
