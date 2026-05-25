import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const SERVICOS = [
  {
    titulo: 'Filmes Publicitários',
    descricao:
      'Do conceito ao entregável. Campanhas enxutas com produção de qualidade, dentro do prazo e do orçamento.',
  },
  {
    titulo: 'Conteúdo para Redes',
    descricao:
      'Reels, stories, vídeos curtos. Conteúdo que funciona no feed e gera resultado de verdade.',
  },
  {
    titulo: 'Edição e Finalização',
    descricao:
      'Corte, cor, trilha e entrega. A Birutinha assume qualquer etapa do processo audiovisual.',
  },
  {
    titulo: 'Motion 2D/3D',
    descricao:
      'Vinhetas, animações e grafismos que dão vida a qualquer projeto, do simples ao complexo.',
  },
  {
    titulo: 'Vídeo Corporativo',
    descricao:
      'Institucional, treinamento, apresentação de produto. Comunicação visual que representa sua marca.',
  },
  {
    titulo: 'Live & Transmissão',
    descricao:
      'Produção ao vivo com estrutura profissional. Eventos, webinars e transmissões que não travam.',
  },
]

export default function SecaoServicos() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionAnimation = useScrollAnimation({ delay: 100 })
  const isVisible = sectionAnimation.isVisible

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="relative w-full min-h-screen lg:h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      <div
        ref={sectionAnimation.elementRef}
        className="relative z-10 h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Coluna esquerda */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center px-6 md:px-10 lg:px-12 py-10 lg:py-0">
          <span
            className={`text-white/70 text-xs font-semibold tracking-[0.2em] uppercase italic block mb-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Serviços
          </span>
          <h2
            className={`text-white text-4xl font-black leading-[1.1] mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Para cada projeto,
            <br />
            uma solução
          </h2>
          <p
            className={`text-white/80 text-xs leading-relaxed max-w-[340px] transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Do briefing à entrega em tempo real.
            <br /><br />
            Aplicamos IA em etapas da criação, edição e finalização para acelerar o processo e expandir soluções.
          </p>
        </div>

        {/* Coluna direita: Accordion */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:pr-10 lg:px-0 py-6 lg:py-10">
          <div className="flex flex-col gap-2">
            {SERVICOS.map((servico, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className={`rounded-2xl border cursor-pointer transition-all duration-1000 ease-out ${
                    isOpen
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-center gap-4 px-6 py-4">
                    <span className="text-white/40 text-xs font-mono flex-shrink-0 w-6 text-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white font-bold text-base flex-1">
                      {servico.titulo}
                    </span>
                    <span
                      className={`text-white/50 text-xl transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? '6rem' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="text-white/70 text-sm leading-relaxed px-6 pb-5 pl-[4rem]">
                      {servico.descricao}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
