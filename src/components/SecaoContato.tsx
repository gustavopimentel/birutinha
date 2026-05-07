import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function SecaoContato() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible

  return (
    <section className="relative w-full min-h-screen lg:h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-0 py-10 lg:py-0"
      >
        <span
          className={`text-white/70 text-xs font-semibold tracking-[0.2em] uppercase italic mb-6 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          Bora?
        </span>

        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="text-white">Tem um projeto?</span>
          <br />
          <span className="text-white/90">Fala com a gente.</span>
        </h2>

        <p
          className={`text-white/60 text-base leading-relaxed max-w-md mb-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Manda um oi, conta o projeto e a gente já começa a pensar em
          como entregar. Sem enrolação.
        </p>

        <div
          className={`flex flex-col md:flex-row items-center gap-4 mb-10 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="mailto:contato@birutinha.com.br"
            className="flex items-center gap-2 bg-white text-[#696beb] font-bold text-sm px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            Mandar e-mail
          </a>
          <a
            href="https://wa.me/551150510404"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/30 text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div
          className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="text-center">
            <span className="text-white/40 text-[0.65rem] font-semibold tracking-[0.15em] uppercase block mb-1">
              E-mail
            </span>
            <span className="text-white/80 text-sm">
              contato@birutinha.com.br
            </span>
          </div>
          <div className="text-center">
            <span className="text-white/40 text-[0.65rem] font-semibold tracking-[0.15em] uppercase block mb-1">
              Telefone
            </span>
            <span className="text-white/80 text-sm">
              11 5051-0404
            </span>
          </div>
          <div className="text-center">
            <span className="text-white/40 text-[0.65rem] font-semibold tracking-[0.15em] uppercase block mb-1">
              Instagram
            </span>
            <a
              href="https://instagram.com/birutinha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              @birutinha
            </a>
          </div>
        </div>

        <div
          className={`text-center mt-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <span className="text-white/40 text-[0.65rem] font-semibold tracking-[0.15em] uppercase block mb-1">
            Endereço
          </span>
          <span className="text-white/80 text-sm">
            Av. Indianópolis, 2603 - Indianópolis, São Paulo - SP, 04063-005
          </span>
        </div>
      </div>
    </section>
  )
}
