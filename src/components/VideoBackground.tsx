import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'
import { VideoSliderProps } from '../types/video'
import { VIDEOS, SLIDER_CONFIG } from '../config/videos'
import { useVideoSlider } from '../hooks/useVideoSlider'

export default function VideoBackground({
  currentIndex,
  onSlideChange,
}: VideoSliderProps) {
  const isLastSlide = currentIndex === VIDEOS.length - 1
  const isFirstSlide = currentIndex === 0
  const playersRef = useRef<(Player | null)[]>([])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const { handleTouchStart, handleTouchEnd, handleWheel } = useVideoSlider({
    currentIndex,
    totalSlides: VIDEOS.length,
    onSlideChange,
    isLastSlide,
    isFirstSlide,
  })

  useEffect(() => {
    const players: (Player | null)[] = new Array(VIDEOS.length).fill(null)

    VIDEOS.forEach((video, index) => {
      const container = containerRefs.current[index]
      if (!container) return

      const player = new Player(container, {
        id: parseInt(video.vimeoId),
        background: true,
        loop: true,
        muted: true,
        autopause: false,
        dnt: true,
      })

      players[index] = player

      player.ready().then(() => {
        if (index !== 0) {
          player.pause().catch(() => {})
        }
      })
    })

    playersRef.current = players

    return () => {
      players.forEach(player => {
        if (player) player.destroy()
      })
      playersRef.current = []
    }
  }, [])

  useEffect(() => {
    playersRef.current.forEach((player, index) => {
      if (!player) return
      if (index === currentIndex) {
        player.play().catch(() => {})
      } else {
        player.pause().catch(() => {})
      }
    })
  }, [currentIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      onSlideChange((currentIndex + 1) % VIDEOS.length)
    }, SLIDER_CONFIG.autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, onSlideChange])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      handleWheel(e)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [handleWheel])

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {VIDEOS.map((video, index) => {
          let translateY = '0%'
          if (index < currentIndex) translateY = '-100%'
          else if (index > currentIndex) translateY = '100%'

          return (
            <div
              key={video.id}
              className="absolute transition-transform duration-1000 ease-in-out"
              style={{
                width: '100vw',
                height: '56.25vw',
                minHeight: '100vh',
                minWidth: '177.78vh',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, calc(-50% + ${translateY}))`,
                opacity: index === currentIndex ? 1 : Math.abs(index - currentIndex) === 1 ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none',
                zIndex: index === currentIndex ? 10 : index === currentIndex - 1 ? 5 : 1,
              }}
            >
              <div
                ref={el => { containerRefs.current[index] = el }}
                className="vimeo-bg w-full h-full"
              />
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-8 left-52 z-50 pointer-events-none pl-8">
        <h2 className="text-white text-5xl font-bold transition-opacity duration-1000">
          {VIDEOS[currentIndex].title}
        </h2>
      </div>
    </div>
  )
}
