import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type React from 'react'

interface LayeredLine {
  top: string
  bottom: string
  topColor?: string
  bottomColor?: string
}

interface LayeredTextProps {
  lines: LayeredLine[]
  fontSize?: string
  lineHeight?: string
  className?: string
}

export default function LayeredText({
  lines,
  fontSize = '3.75rem',
  lineHeight = '3.4rem',
  className = '',
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  const centerIndex = Math.floor(lines.length / 2)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const sliders = container.querySelectorAll('.layered-slider')
    const firstLi = container.querySelector('li')
    if (!firstLi) return

    const computedHeight = firstLi.getBoundingClientRect().height

    timelineRef.current = gsap.timeline({ paused: true })
    timelineRef.current.to(sliders, {
      y: -computedHeight,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    })

    const play = () => timelineRef.current?.play()
    const reverse = () => timelineRef.current?.reverse()

    container.addEventListener('mouseenter', play)
    container.addEventListener('mouseleave', reverse)

    return () => {
      container.removeEventListener('mouseenter', play)
      container.removeEventListener('mouseleave', reverse)
      timelineRef.current?.kill()
    }
  }, [lines, lineHeight, fontSize])

  return (
    <div
      ref={containerRef}
      className={`font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={{ fontSize }}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const offset = (index - centerIndex) * 1.875
          const isEven = index % 2 === 0
          return (
            <li
              key={index}
              className="overflow-hidden relative"
              style={{
                height: lineHeight,
                transform: `translateX(${offset}rem) skew(${isEven ? '60deg, -30deg' : '0deg, -30deg'}) scaleY(${isEven ? '0.66667' : '1.33333'})`,
              } as React.CSSProperties}
            >
              <div className="layered-slider">
                <p
                  className="px-[0.9rem] whitespace-nowrap m-0"
                  style={{
                    height: lineHeight,
                    lineHeight: lineHeight,
                    color: line.topColor ?? '#ffffff',
                  }}
                >
                  {line.top}
                </p>
                <p
                  className="px-[0.9rem] whitespace-nowrap m-0"
                  style={{
                    height: lineHeight,
                    lineHeight: lineHeight,
                    color: line.bottomColor ?? '#ffffff',
                  }}
                >
                  {line.bottom}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
