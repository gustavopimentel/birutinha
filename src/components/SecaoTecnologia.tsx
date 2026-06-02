'use client'

import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function SecaoTecnologia() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible

  return (
    <section className="relative w-full min-h-screen lg:h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 h-full rounded-3xl overflow-hidden flex items-center px-6 md:px-10 lg:px-16 py-10 lg:py-0"
      >
        <div className="max-w-3xl">
          <span
            className={`text-white/70 text-xs font-semibold tracking-[0.2em] uppercase italic block mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Tecnologia
          </span>

          <h2
            className={`text-white text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] mb-10 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Mais eficiência.
            <br />
            Mais entrega.
            <br />
            Sem aumentar estrutura.
          </h2>

          <p
            className={`text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Se for preciso a gente usa tecnologia artificial para ganhar velocidade, otimizar processos
            e ampliar possibilidades criativas.
          </p>

          <p
            className={`text-white text-xl md:text-2xl font-black tracking-wide transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Mais foco no que realmente importa:{' '}
            <span className="text-white/90">RESULTADO</span>
          </p>
        </div>
      </div>
    </section>
  )
}
