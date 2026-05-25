import { useRef, useState, useCallback } from 'react'

interface CardTimeProps {
  foto: string
  nome: string
  cargo: string
  reelsHref?: string
}

export default function CardTime({ foto, nome, cargo, reelsHref = '#' }: CardTimeProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [leaving, setLeaving] = useState(false)
  const movingRef = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    movingRef.current = true
    setLeaving(false)
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = (e.clientX - cx) / (rect.width / 2)
    const y = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    movingRef.current = false
    setLeaving(true)
    setTilt({ x: 0, y: 0 })
  }, [])

  const t = tilt
  const nomeLinhas = nome.split(' ')

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: 280, padding: 14, perspective: 800, cursor: 'default', userSelect: 'none', height: '100%' }}
    >
      <div
        style={{
          border: `1.5px solid ${leaving || !movingRef.current ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)'}`,
          transition: leaving ? 'transform 0.6s ease-out, border-color 0.6s ease-out' : 'transform 0.15s ease-out, border-color 0.15s ease-out',
          borderRadius: 80,
          padding: '16px 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          boxSizing: 'border-box',
          transform: `rotateY(${t.x * 10}deg) rotateX(${-t.y * 10}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Foto */}
        <div
          style={{
            width: '100%',
            aspectRatio: '3 / 4',
            borderRadius: 68,
            overflow: 'hidden',
            marginBottom: 20,
            transition: leaving ? 'transform 0.6s ease-out, box-shadow 0.6s ease-out' : 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
            transform: `translateX(${t.x * -12}px) translateY(${t.y * -12}px) scale(${!leaving && movingRef.current ? 1.04 : 1})`,
            boxShadow: !leaving && movingRef.current ? `${-t.x * 12}px ${-t.y * 12}px 40px rgba(0,0,0,0.25)` : 'none',
          }}
        >
          <img src={foto} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>

        {/* Cargo */}
        <p
          style={{
            color: '#fff',
            fontSize: 13,
            fontWeight: 400,
            marginBottom: 10,
            textAlign: 'center',
            transition: leaving ? 'transform 0.6s ease-out' : 'transform 0.15s ease-out',
            transform: `translateX(${t.x * 6}px) translateY(${t.y * 4}px)`,
          }}
        >
          {cargo}
        </p>

        {/* Nome */}
        <h3
          style={{
            color: '#fff',
            fontSize: 26,
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.05,
            textAlign: 'center',
            marginBottom: 18,
            transition: leaving ? 'transform 0.6s ease-out' : 'transform 0.15s ease-out',
            transform: `translateX(${t.x * 10}px) translateY(${t.y * 6}px) scale(${!leaving && movingRef.current ? 1.04 : 1})`,
          }}
        >
          {nomeLinhas[0]}
          <br />
          {nomeLinhas.slice(1).join(' ')}
        </h3>

        {/* Reels */}
        <a
          href={reelsHref}
          style={{
            color: '#fff',
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            transition: leaving ? 'transform 0.6s ease-out' : 'transform 0.15s ease-out',
            transform: `translateX(${t.x * -6}px) translateY(${t.y * 8}px)`,
          }}
        >
          reels
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  )
}
