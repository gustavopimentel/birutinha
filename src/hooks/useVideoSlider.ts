import { useRef, useCallback, useState } from 'react'
import { SLIDER_CONFIG } from '../config/videos'

interface UseVideoSliderProps {
  currentIndex: number
  totalSlides: number
  onSlideChange: (index: number) => void
  isLastSlide: boolean
  onScrollToNextSection?: () => void
}

export function useVideoSlider({
  currentIndex,
  totalSlides,
  onSlideChange,
  isLastSlide,
  onScrollToNextSection,
}: UseVideoSliderProps) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const lastWheelTime = useRef<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return

    // Se está no último slide e tem próxima seção, vai para ela
    if (isLastSlide && onScrollToNextSection) {
      onScrollToNextSection()
      return
    }

    setIsAnimating(true)
    onSlideChange((currentIndex + 1) % totalSlides)

    // Libera após animação
    setTimeout(() => setIsAnimating(false), SLIDER_CONFIG.animationDuration)
  }, [currentIndex, totalSlides, onSlideChange, isLastSlide, onScrollToNextSection, isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    onSlideChange((currentIndex - 1 + totalSlides) % totalSlides)

    setTimeout(() => setIsAnimating(false), SLIDER_CONFIG.animationDuration)
  }, [currentIndex, totalSlides, onSlideChange, isAnimating])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY

      if (
        Math.abs(diffX) > Math.abs(diffY) &&
        Math.abs(diffX) > SLIDER_CONFIG.swipeThreshold
      ) {
        if (diffX > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    },
    [nextSlide, prevSlide]
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Bloqueia scroll durante animação
      if (isAnimating) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      const now = Date.now()
      if (now - lastWheelTime.current < SLIDER_CONFIG.wheelThrottle) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // Detecta scroll para baixo ou para cima
      if (Math.abs(e.deltaY) > SLIDER_CONFIG.wheelThreshold) {
        e.preventDefault()
        e.stopPropagation()

        if (e.deltaY > 0) {
          // Scroll para baixo - próximo slide
          nextSlide()
        } else {
          // Scroll para cima - slide anterior
          prevSlide()
        }

        lastWheelTime.current = now
      }
    },
    [nextSlide, prevSlide, isAnimating]
  )

  return {
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
    isAnimating,
  }
}

