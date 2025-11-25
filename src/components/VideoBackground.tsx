import { useEffect } from 'react'
import { VideoSliderProps } from '../types/video'
import { VIDEOS, SLIDER_CONFIG } from '../config/videos'
import { useVideoSlider } from '../hooks/useVideoSlider'

const VIDEO_CONTAINER_CLASS = 'video-background-container'

interface VideoBackgroundExtendedProps extends VideoSliderProps {
  onScrollToNextSection?: () => void
  isActive?: boolean
}

export default function VideoBackground({
  currentIndex,
  onSlideChange,
  onScrollToNextSection,
  isActive = true,
}: VideoBackgroundExtendedProps) {
  const isLastSlide = currentIndex === VIDEOS.length - 1

  const { handleTouchStart, handleTouchEnd, handleWheel } = useVideoSlider({
    currentIndex,
    totalSlides: VIDEOS.length,
    onSlideChange,
    isLastSlide,
    onScrollToNextSection,
  })

  // Auto-play slider
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      onSlideChange((currentIndex + 1) % VIDEOS.length)
    }, SLIDER_CONFIG.autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, onSlideChange, isActive])

  // Wheel event listener - captura scroll em toda a tela quando está nos slides
  useEffect(() => {
    if (!isActive) return

    const handleWheelGlobal = (e: WheelEvent) => {
      handleWheel(e)
    }

    window.addEventListener('wheel', handleWheelGlobal, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheelGlobal)
    }
  }, [handleWheel, isActive])

  const getVimeoUrl = (vimeoId: string) =>
    `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`

  return (
    <div
      className={`${VIDEO_CONTAINER_CLASS} fixed inset-0 w-screen h-screen z-0 overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {VIDEOS.map((video, index) => {
          // Determina a posição do slide baseado no índice atual
          let translateY = '0%'
          if (index < currentIndex) {
            // Slide anterior - sai para cima
            translateY = '-100%'
          } else if (index > currentIndex) {
            // Slide próximo - entra de baixo
            translateY = '100%'
          }
          // Slide atual - posição central

          return (
            <iframe
              key={video.id}
              src={getVimeoUrl(video.vimeoId)}
              className="absolute transition-transform duration-1000 ease-in-out"
              style={{
                width: '100vw',
                height: '56.25vw',
                minHeight: '100vh',
                minWidth: '177.78vh',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, calc(-50% + ${translateY}))`,
                opacity: index === currentIndex ? 1 : index === currentIndex - 1 || index === currentIndex + 1 ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none',
                zIndex: index === currentIndex ? 10 : index === currentIndex - 1 ? 5 : 1,
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          )
        })}
      </div>

      {/* Título do vídeo atual */}
      <div className="absolute bottom-8 left-52 z-50 pointer-events-none pl-8">
        <h2 className="text-white text-5xl font-bold transition-opacity duration-1000">
          {VIDEOS[currentIndex].title}
        </h2>
      </div>
    </div>
  )
}
