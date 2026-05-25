import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function SecaoQuemSomos() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible

  return (
    <section className="relative w-full min-h-screen lg:h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 h-full rounded-3xl overflow-hidden flex items-center"
      >
        <div className="w-full h-full flex flex-col lg:flex-row items-center px-6 md:px-10 lg:px-16 gap-10 lg:gap-16 py-10 lg:py-0">
          {/* Coluna esquerda */}
          <div className="w-full lg:w-[40%] lg:flex-shrink-0">
            <span
              className={`text-white/70 text-xs font-semibold tracking-[0.2em] uppercase italic block mb-4 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              Quem somos
            </span>
            <h2
              className={`text-white text-3xl md:text-4xl font-black leading-[1.1] mb-6 lg:mb-10 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              A produtora
              <br />
              que chegou
              <br />
              fazendo.
            </h2>
            <div
              className={`text-white/80 text-xs leading-relaxed space-y-4 max-w-[340px] transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <p>
                A Birutinha nasceu da vontade de produzir com agilidade, sem perder qualidade.
                Somos o núcleo mais ágil da Biruta Filmes.
              </p>
              <p>
                Criada pra resolver. Pra simplificar.
                Pra fazer produção boa caber na verba real.
              </p>
              <p>
                Menos enrolação. Mais criação que anda.
                Menos estrutura inflada. Mais eficiência.
              </p>
              <p>
                A gente existe pra preencher um espaço simples:
                entre o que o cliente precisa
                e o que o mercado não entrega.
              </p>
            </div>
          </div>

          {/* Coluna direita: 4 cards pill */}
          <div className="w-full lg:flex-1 flex flex-col justify-center gap-3 lg:gap-4">
            {[
              { valor: '10+', desc: 'Anos de experiência da Biruta Filmes' },
              { valor: '100%', desc: 'Comprometida com prazo e entrega' },
              { valor: '∞ formatos', desc: 'Do reels ao formato de TV' },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white/90 rounded-full px-6 py-4 md:px-10 md:py-5 flex items-center shadow-sm transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${600 + i * 200}ms` }}
              >
                <span className="text-sm md:text-base font-bold mr-3" style={{ color: '#7448B7' }}>{item.valor}</span>
                <span className="text-sm md:text-base mx-2" style={{ color: '#7448B7', opacity: 0.5 }}>—</span>
                <span className="text-sm md:text-base font-medium" style={{ color: '#7448B7' }}>{item.desc}</span>
              </div>
            ))}

            <div
              className={`bg-white/90 rounded-full px-6 py-4 md:px-10 md:py-5 flex items-center shadow-sm transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <span className="text-base md:text-lg font-bold" style={{ color: '#7448B7' }}>Super Qualidade na verba que você tem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
