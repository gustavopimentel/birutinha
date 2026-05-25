import { Fragment, useRef, useCallback, useEffect, useState } from 'react'
import peixinhoSvg from '../assets/images/home/peixinho.svg'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface PeixinhoDecor {
  left?: string; right?: string; top?: string; bottom?: string
  size: string; rotation: number; blur: number; opacity: number
  speed: number
}

const DECORATIVE: PeixinhoDecor[] = [
  { left: '-2%', top: '-3%', size: '19rem', rotation: 18, blur: 0, opacity: 0.18, speed: 0.03 },
  { left: '35%', top: '2%', size: '5rem', rotation: -12, blur: 5, opacity: 0.14, speed: 0.1 },
  { right: '1%', top: '1%', size: '6.5rem', rotation: 22, blur: 0, opacity: 0.22, speed: 0.07 },
  { left: '1%', top: '45%', size: '8.5rem', rotation: -15, blur: 0, opacity: 0.2, speed: 0.05 },
  { right: '2%', top: '35%', size: '4rem', rotation: 15, blur: 4, opacity: 0.15, speed: 0.09 },
  { left: '20%', top: '18%', size: '3.2rem', rotation: -8, blur: 7, opacity: 0.12, speed: 0.12 },
  { right: '18%', bottom: '20%', size: '3.2rem', rotation: 25, blur: 6, opacity: 0.13, speed: 0.11 },
  { left: '-1%', bottom: '-2%', size: '17rem', rotation: 12, blur: 0, opacity: 0.18, speed: 0.035 },
  { left: '38%', bottom: '1%', size: '6rem', rotation: -10, blur: 3, opacity: 0.16, speed: 0.08 },
  { right: '-1%', bottom: '-2%', size: '21rem', rotation: -8, blur: 0, opacity: 0.17, speed: 0.025 },
]

const PHRASES = [
  {
    size: 'text-4xl md:text-5xl lg:text-7xl',
    segments: [
      { text: 'A equipe', bold: true, br: true },
      { text: 'por trás', bold: true, br: true },
      { text: 'do corre', bold: true, br: false },
    ],
  },
  {
    size: 'text-3xl md:text-4xl lg:text-5xl',
    segments: [
      { text: 'Gente nova', bold: false, br: true },
      { text: 'com ideias frescas,', bold: false, br: true },
      { text: 'gente experiente', bold: true, br: true },
      { text: 'que sabe segurar', bold: true, br: true },
      { text: 'a onda', bold: true, br: false },
    ],
  },
]

function buildChars(phraseIdx: number) {
  const result: { ch: string; bold: boolean; isBreak: boolean }[] = []
  PHRASES[phraseIdx].segments.forEach(seg => {
    for (const ch of seg.text) {
      result.push({ ch, bold: seg.bold, isBreak: false })
    }
    if (seg.br) result.push({ ch: '\n', bold: seg.bold, isBreak: true })
  })
  return result
}

const FLIGHT_MS = 2400

export default function SecaoEquipe() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })

  const containerRef = useRef<HTMLDivElement | null>(null)
  const decorRefs = useRef<(HTMLImageElement | null)[]>([])
  const rafRef = useRef(0)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const decorPositions = useRef(DECORATIVE.map(() => ({ x: 0, y: 0 })))

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseTarget.current = {
      x: e.clientX - r.left - r.width / 2,
      y: e.clientY - r.top - r.height / 2,
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    mouseTarget.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    const tick = () => {
      const { x: tx, y: ty } = mouseTarget.current
      DECORATIVE.forEach((d, i) => {
        const pos = decorPositions.current[i]
        const goalX = tx * d.speed
        const goalY = ty * d.speed
        const lerp = 0.04 + d.speed * 0.5
        pos.x += (goalX - pos.x) * lerp
        pos.y += (goalY - pos.y) * lerp
        const el = decorRefs.current[i]
        if (el) el.style.transform = `rotate(${d.rotation}deg) translate(${pos.x}px, ${pos.y}px)`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Animação de texto ──
  // Ciclo: in → flyOut → out → flyIn → in (próxima frase)
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const [stage, setStage] = useState<'in' | 'flyOut' | 'out' | 'flyIn'>('in')

  const chars = buildChars(phraseIdx)
  const total = chars.length

  useEffect(() => {
    if (stage === 'in') {
      if (revealed >= total) {
        const t = setTimeout(() => setStage('flyOut'), 300)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setRevealed(n => n + 1), 65)
      return () => clearTimeout(t)
    }
    if (stage === 'flyOut') {
      const t = setTimeout(() => setStage('out'), FLIGHT_MS)
      return () => clearTimeout(t)
    }
    if (stage === 'out') {
      if (revealed <= 0) {
        const t = setTimeout(() => setStage('flyIn'), 300)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setRevealed(n => n - 1), 55)
      return () => clearTimeout(t)
    }
    if (stage === 'flyIn') {
      const t = setTimeout(() => {
        setPhraseIdx(n => (n + 1) % PHRASES.length)
        setStage('in')
      }, FLIGHT_MS)
      return () => clearTimeout(t)
    }
  }, [stage, revealed, total])

  // ── Voo do peixinho via JS (curva paramétrica suave) ──
  const cursorRef = useRef<HTMLImageElement>(null)
  const flyRafRef = useRef(0)
  const flyStartRef = useRef(0)

  useEffect(() => {
    const isFlying = stage === 'flyOut' || stage === 'flyIn'
    if (!isFlying) return

    // flyOut: começa scaleX(1), vira scaleX(-1) no meio → pronto pra apagar
    // flyIn:  já começa scaleX(1) o loop inteiro → pronto pra escrever
    flyStartRef.current = performance.now()

    const animate = () => {
      const t = Math.min((performance.now() - flyStartRef.current) / FLIGHT_MS, 1)

      const smooth = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2

      const x = 10 * Math.pow(Math.sin(Math.PI * smooth), 2)
      const y = -8 * Math.sin(2 * Math.PI * smooth)

      const rot = -15 * Math.cos(2 * Math.PI * smooth)

      // flyOut: vira no ápice (metade). flyIn: sempre olhando pra direita
      const flipped = stage === 'flyOut' && smooth >= 0.5
      const visualRot = flipped ? -rot : rot

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${x}vw, ${y}vh) scaleX(${flipped ? -1 : 1}) rotate(${visualRot}deg)`
      }

      if (t < 1) {
        flyRafRef.current = requestAnimationFrame(animate)
      }
    }

    flyRafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(flyRafRef.current)
      if (cursorRef.current) cursorRef.current.style.transform = ''
    }
  }, [stage])

  const cursorSize = '3rem'

  const getCursorStyle = (): React.CSSProperties => ({
    width: cursorSize,
    height: cursorSize,
    verticalAlign: 'middle',
    ...(stage === 'out' && { transform: 'scaleX(-1)' }),
  })

  return (
    <section className="relative w-full h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={el => {
          containerRef.current = el
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (sectionAnimation.elementRef) (sectionAnimation.elementRef as any).current = el
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative z-10 h-full rounded-3xl overflow-hidden transition-[opacity,transform] duration-700 ease-out ${
          sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {DECORATIVE.map((d, i) => (
          <img
            key={i}
            ref={el => { decorRefs.current[i] = el }}
            src={peixinhoSvg}
            alt=""
            className="absolute pointer-events-none select-none will-change-transform"
            style={{
              width: d.size, height: d.size,
              left: d.left, right: d.right, top: d.top, bottom: d.bottom,
              transform: `rotate(${d.rotation}deg)`,
              opacity: d.opacity,
              filter: d.blur > 0 ? `blur(${d.blur}px)` : undefined,
            }}
          />
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-10">
          <span className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
            Time
          </span>

          <div className={`text-white uppercase leading-[1.15] tracking-wide ${PHRASES[phraseIdx].size}`}>
            {revealed === 0 && (
              <img
                ref={stage === 'flyIn' ? cursorRef : undefined}
                src={peixinhoSvg}
                alt=""
                style={getCursorStyle()}
                className="inline-block mr-1"
              />
            )}
            {chars.map((c, i) => {
              const isCursorHere = i === revealed - 1

              if (c.isBreak) {
                return (
                  <Fragment key={i}>
                    {isCursorHere && (
                      <img
                        ref={cursorRef}
                        src={peixinhoSvg}
                        alt=""
                        style={getCursorStyle()}
                        className="inline-block ml-1"
                      />
                    )}
                    <br />
                  </Fragment>
                )
              }

              const show = i < revealed
              return (
                <Fragment key={`${phraseIdx}-${i}`}>
                  <span
                    className={c.bold ? 'font-extrabold' : 'font-medium'}
                    style={{
                      display: 'inline-block',
                      transition: 'opacity 0.4s ease-out, filter 0.4s ease-out, transform 0.4s ease-out',
                      opacity: show ? 1 : 0,
                      filter: show ? 'blur(0)' : 'blur(6px)',
                      transform: show ? 'translateY(0)' : 'translateY(4px)',
                      minWidth: c.ch === ' ' ? '0.3em' : undefined,
                    }}
                  >
                    {c.ch === ' ' ? '\u00A0' : c.ch}
                  </span>
                  {isCursorHere && (
                    <img
                      ref={cursorRef}
                      src={peixinhoSvg}
                      alt=""
                      style={getCursorStyle()}
                      className="inline-block ml-1"
                    />
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
