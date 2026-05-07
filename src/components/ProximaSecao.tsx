import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'
import { DIRETORES } from '../config/diretores'
import { VIDEOS } from '../config/videos'
import { Link } from 'react-router-dom'
import setaIcon from '../assets/images/diretores/seta.svg'
import LayeredText from './LayeredText'
import { useSequentialAnimation } from '../hooks/useScrollAnimation'

export default function ProximaSecao() {
  const primeiroDiretor = DIRETORES[0]
  const primeiroVideo = VIDEOS[0]
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    const container = videoContainerRef.current
    if (!container) return

    const player = new Player(container, {
      id: parseInt(primeiroVideo.vimeoId),
      background: true,
      loop: true,
      muted: true,
      autopause: false,
      dnt: true,
    })

    playerRef.current = player

    return () => {
      player.destroy()
      playerRef.current = null
    }
  }, [primeiroVideo.vimeoId])

  const { containerRef, visibleItems } = useSequentialAnimation(4, { 
    delay: 100, 
    stagger: 120 
  })
  
  return (
    <section
      className="relative w-full h-screen pl-48 pr-4 pt-4 pb-4 overflow-hidden"
    >
      
      {/* Conteúdo */}
      <div ref={containerRef} className="relative z-10 h-full grid grid-cols-2 gap-4">
        {/* Coluna 1: Card altura máxima */}
        <Link 
          to="/sobre" 
          className={`rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden border border-white bg-transparent cursor-pointer hover:opacity-90 transition-all duration-700 ease-out ${
            visibleItems[0] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-auto pt-2">
            <div className="h-px w-6 bg-[#e84c4a]" />
            <span className="text-white text-xs font-medium tracking-[0.2em] uppercase">
              Um braço da Biruta Filmes
            </span>
            <div className="h-px flex-1 bg-[#e84c4a]" />
          </div>

          {/* Headline com efeito layered - centralizado */}
          <div className="flex-1 flex items-center justify-center">
            <LayeredText
              lines={[
                { top: '\u00A0', bottom: 'Nascida', bottomColor: '#ffffff' },
                { top: 'Nascida', bottom: 'no corre,', topColor: '#ffffff', bottomColor: '#ffffff' },
                { top: 'no corre,', bottom: 'feita pra', topColor: '#ffffff', bottomColor: '#facc15' },
                { top: 'feita pra', bottom: 'entregar.', topColor: '#facc15', bottomColor: '#facc15' },
                { top: 'entregar.', bottom: '\u00A0', topColor: '#facc15' },
              ]}
              fontSize="4.75rem"
              lineHeight="4.375rem"
            />
          </div>
          <p className="text-white text-base leading-relaxed opacity-90">
            Produção audiovisual ágil, criativa e com verba real.
            Vinheta ou longa? Conteúdo ou campanha? A gente encara.
          </p>

          {/* Seta no canto inferior direito */}
          <div className="absolute bottom-6 right-6">
            <img
              src={setaIcon}
              alt=""
              className="w-6 h-6"
            />
          </div>
        </Link>

        {/* Coluna 2: Dividida em duas linhas */}
        <div className="flex flex-col gap-4">
          {/* Linha 1: Card full largura */}
          <div className={`flex-1 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden border border-white bg-transparent transition-all duration-700 ease-out ${
            visibleItems[1] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-white text-4xl font-bold mb-6">
              Projetos especiais
            </h2>
            <div className="text-white space-y-4 text-lg leading-relaxed">
              <p>
                O que hoje é tendência no mercado, nós sempre fizemos. Somos uma
                Casa de Produção que trabalha de forma artesanal, ágil e
                inteligente. Tratamos todos os projetos, independentemente do
                seu tamanho, com a mesma atenção e cuidado.
              </p>
              <p>
                São dez anos entregando com paixão filmes publicitários,
                programas e séries para TV e VOD, cinema, conteúdo para redes
                sociais, vídeos corporativos, edição, finalização e Motion
                2D/3D.
              </p>
            </div>
            {/* Seta no canto inferior direito */}
            <div className="absolute bottom-6 right-6">
              <img
                src={setaIcon}
                alt=""
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Linha 2: Dividida em duas colunas */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Coluna 1: Card com foto */}
            <Link 
              to="/diretores" 
              className={`rounded-3xl overflow-hidden relative bg-black h-full block cursor-pointer hover:opacity-90 transition-all duration-700 ease-out ${
                visibleItems[2] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Foto do diretor */}
              <img
                src={primeiroDiretor.foto}
                alt={primeiroDiretor.nome}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay de texto */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <span className="text-white text-2xl font-bold">
                  Nossos diretores
                </span>
                <img
                  src={setaIcon}
                  alt=""
                  className="w-6 h-6"
                />
              </div>
            </Link>

            {/* Coluna 2: Dividida em duas linhas */}
            <div className="flex flex-col gap-4">
              {/* Linha 1: Card com vídeo */}
              <div className={`flex-1 rounded-3xl overflow-hidden relative bg-black transition-all duration-700 ease-out ${
                visibleItems[3] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                {/* Vídeo do Vimeo */}
                <div
                  ref={videoContainerRef}
                  className="vimeo-bg absolute inset-0 w-full h-full"
                />
                {/* Título do filme */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-white text-xl font-semibold">
                    {primeiroVideo.title}
                  </span>
                </div>
                {/* Seta no canto inferior direito */}
                <div className="absolute bottom-6 right-6 z-10">
                  <img
                    src={setaIcon}
                    alt=""
                    className="w-6 h-6"
                  />
                </div>
              </div>

              {/* Linha 2: Card botão */}
              <div className={`rounded-3xl overflow-hidden transition-all duration-700 ease-out ${
                visibleItems[3] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visibleItems[3] ? '150ms' : '0ms' }}
              >
                <button
                  className="w-full h-full py-6 px-8 rounded-3xl text-white font-semibold text-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                  style={{
                    background: `#696beb`,
                  }}
                >
                  fale com a gente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
