import { useScrollAnimation } from '../hooks/useScrollAnimation'

const MOTIVOS = [
  {
    titulo: 'Agilidade sem abrir mão da qualidade',
    descricao:
      'Processo enxuto, decisões rápidas. A gente entrega no prazo porque planejou direito desde o início.',
  },
  {
    titulo: 'Produção que cabe no seu orçamento',
    descricao:
      'Criatividade é o nosso superpoder quando a verba é real — não de sonho.',
  },
  {
    titulo: 'Equipe multidisciplinar de verdade',
    descricao:
      'Gente nova com ideias frescas + experiente que sabe segurar a onda. Processo com liberdade.',
  },
  {
    titulo: 'DNA Biruta Filmes',
    descricao:
      'Somos a irmã ágil de uma produtora com 10+ anos no mercado. O rigor está no nosso DNA.',
  },
]

export default function SecaoMotivos() {
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible

  return (
    <section className="relative w-full min-h-screen lg:h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 h-full rounded-3xl overflow-hidden flex flex-col justify-center px-6 md:px-10 lg:px-14 border-2 border-white/20 py-10 lg:py-0"
      >
        <div className="mb-14">
          <span
            className={`text-white/50 text-xs font-semibold tracking-[0.2em] uppercase block transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Por que a gente
          </span>
          <h2
            className={`text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mt-3 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Quatro bons motivos
            <br />
            pra escolher a Birutinha.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {MOTIVOS.map((motivo, index) => (
            <div
              key={index}
              className={`px-6 transition-all duration-1000 ease-out ${
                index > 0 ? 'lg:border-l border-white/15' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${500 + index * 200}ms` }}
            >
              <span className="text-white/15 text-5xl font-black block mb-4">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-white text-sm font-black leading-snug mb-3">
                {motivo.titulo}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                {motivo.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
