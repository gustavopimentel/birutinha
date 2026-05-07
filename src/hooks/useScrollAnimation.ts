import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', delay = 0, once = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
          }, delay)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
      clearTimeout(timeoutRef.current)
    }
  }, [threshold, rootMargin, delay, once])

  return { elementRef, isVisible }
}

interface UseSequentialAnimationOptions extends UseScrollAnimationOptions {
  stagger?: number
}

// Hook para animações sequenciais - elementos aparecem um por um
export function useSequentialAnimation(
  count: number,
  options: UseSequentialAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '-50px', delay = 0, stagger = 100 } = options
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            const id = setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev]
                newState[i] = true
                return newState
              })
            }, delay + i * stagger)
            timeoutsRef.current.push(id)
          }
          observer.unobserve(container)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
      timeoutsRef.current.forEach(id => clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [count, threshold, rootMargin, delay, stagger])

  return { containerRef, visibleItems }
}

