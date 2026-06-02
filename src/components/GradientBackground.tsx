'use client'

import { useEffect, useState, useRef } from 'react'
import iconeTransparente from '../assets/images/diretores/icone trnsparente.svg'

export default function GradientBackground() {
  const [iconOpacity, setIconOpacity] = useState(0)
  const [gradientStop, setGradientStop] = useState(25)
  const rafRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - viewportHeight

        // Ícone: aparece entrando na "Quem somos", some na "SecaoEquipe"
        const iconStart = viewportHeight * 0.5
        const iconEnd = viewportHeight * 1.2
        const iconFadeOutStart = viewportHeight * 3.5
        const iconFadeOutEnd = viewportHeight * 4.2

        let iconProgress = Math.min(Math.max((scrollY - iconStart) / (iconEnd - iconStart), 0), 1)
        const iconFadeOut = Math.min(Math.max((scrollY - iconFadeOutStart) / (iconFadeOutEnd - iconFadeOutStart), 0), 1)
        iconProgress = iconProgress * (1 - iconFadeOut)
        setIconOpacity(iconProgress * 0.3)

        // Gradiente: roxo expande na "Serviços", volta ao normal na "SecaoEquipe"
        const gradStart = viewportHeight * 1.5
        const gradEnd = viewportHeight * 2.5
        const gradResetStart = viewportHeight * 3.5
        const gradResetEnd = viewportHeight * 4.2

        const gradProgress = Math.min(Math.max((scrollY - gradStart) / (gradEnd - gradStart), 0), 1)
        const gradReset = Math.min(Math.max((scrollY - gradResetStart) / (gradResetEnd - gradResetStart), 0), 1)

        // Roxo também expande na seção Contato (final do site)
        const contactStart = docHeight - viewportHeight * 1.2
        const contactEnd = docHeight
        const contactProgress = Math.min(Math.max((scrollY - contactStart) / (contactEnd - contactStart), 0), 1)

        const midPurple = gradProgress * (1 - gradReset)
        const finalPurple = Math.max(midPurple, contactProgress)
        setGradientStop(25 + finalPurple * 40)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 w-full h-screen -z-10"
      style={{
        background: `linear-gradient(to bottom right, #696beb ${gradientStop}%, #ea5ec8, #e84c4a, #ee7a19)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={iconeTransparente.src}
          alt=""
          className="w-auto h-auto max-w-full max-h-full"
          style={{ opacity: iconOpacity }}
        />
      </div>
    </div>
  )
}
