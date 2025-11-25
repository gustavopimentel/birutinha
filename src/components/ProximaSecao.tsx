import { DIRETORES } from '../config/diretores'
import { VIDEOS } from '../config/videos'
import { Link } from 'react-router-dom'
import setaIcon from '../assets/images/diretores/seta.svg'
import iconeTransparente from '../assets/images/diretores/icone trnsparente.svg'
import { useSequentialAnimation } from '../hooks/useScrollAnimation'

export default function ProximaSecao() {
  // Usa o primeiro diretor para exibir a foto
  const primeiroDiretor = DIRETORES[0]
  // Usa o primeiro vídeo para exibir no card
  const primeiroVideo = VIDEOS[0]
  
  const getVimeoUrl = (vimeoId: string) =>
    `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`
  
  // Animações sequenciais para os 4 cards principais
  const { containerRef, visibleItems } = useSequentialAnimation(4, { 
    delay: 100, 
    stagger: 120 
  })
  
  return (
    <section
      className="relative w-full h-screen pl-48 pr-4 pt-4 pb-4 overflow-hidden"
    >
      {/* Background fixo com gradiente e ícone */}
      <div
        className="fixed inset-0 w-full h-screen z-0"
        style={{
          background: `linear-gradient(to bottom right, #696beb, #ea5ec8, #e84c4a, #ee7a19)`,
        }}
      >
        {/* Ícone de fundo transparente - centralizado */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={iconeTransparente}
            alt=""
            className="w-auto h-auto max-w-full max-h-full opacity-30"
          />
        </div>
      </div>
      
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
          {/* Conteúdo principal */}
          <div className="flex flex-col">
            <h2 className="text-white text-4xl font-bold mb-6">
              Título sobre a Birutinha
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
          </div>

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
                <iframe
                  src={getVimeoUrl(primeiroVideo.vimeoId)}
                  className="absolute"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '100%',
                    minWidth: '100%',
                    top: 0,
                    left: 0,
                  }}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={primeiroVideo.title}
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
