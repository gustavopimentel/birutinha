import { useRef, useCallback } from 'react'
import { SLIDER_CONFIG } from '../config/videos'

interface UseVideoSliderProps {
  currentIndex: number
  totalSlides: number
  onSlideChange: (index: number) => void
  isLastSlide: boolean
  isFirstSlide: boolean
}

export function useVideoSlider({
  currentIndex,
  totalSlides,
  onSlideChange,
  isLastSlide,
  isFirstSlide,
}: UseVideoSliderProps) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const lastWheelTime = useRef<number>(0)
  const isAnimatingRef = useRef(false)

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current || isLastSlide) return

    isAnimatingRef.current = true
    onSlideChange((currentIndex + 1) % totalSlides)
    setTimeout(() => { isAnimatingRef.current = false }, SLIDER_CONFIG.animationDuration)
  }, [currentIndex, totalSlides, onSlideChange, isLastSlide])

  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current || isFirstSlide) return

    isAnimatingRef.current = true
    onSlideChange((currentIndex - 1 + totalSlides) % totalSlides)
    setTimeout(() => { isAnimatingRef.current = false }, SLIDER_CONFIG.animationDuration)
  }, [currentIndex, totalSlides, onSlideChange, isFirstSlide])

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
        if (diffX > 0) nextSlide()
        else prevSlide()
      }

      touchStartX.current = null
      touchStartY.current = null
    },
    [nextSlide, prevSlide]
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isAnimatingRef.current) return

      const now = Date.now()
      if (now - lastWheelTime.current < SLIDER_CONFIG.wheelThrottle) return

      if (Math.abs(e.deltaY) > SLIDER_CONFIG.wheelThreshold) {
        if (e.deltaY > 0) nextSlide()
        else prevSlide()
        lastWheelTime.current = now
      }
    },
    [nextSlide, prevSlide]
  )

  return { handleTouchStart, handleTouchEnd, handleWheel }
}
