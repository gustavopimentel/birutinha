import { ChevronRight, Plus, Instagram } from 'lucide-react'
import logoTipo from '../assets/images/home/Logotipo Birutinha tipologia beje.svg'
import { SOCIAL_LINKS } from '../config/socialLinks'

function VimeoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 8l4 8 4-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function ProximaSecao() {
  return (
    <section
      className="relative w-full h-screen pl-48 pr-4 pt-4 pb-4 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, #696beb, #ea5ec8, #e84c4a, #ee7a19)`,
      }}
    >
      <div className="h-full grid grid-cols-2 gap-4">
        {/* Coluna 1: Card altura máxima */}
        <div className="rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-white bg-transparent">
          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col justify-center">
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

          {/* Seta à direita */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <ChevronRight className="text-white" size={24} />
          </div>
        </div>

        {/* Coluna 2: Dividida em duas linhas */}
        <div className="flex flex-col gap-4">
          {/* Linha 1: Card full largura */}
          <div className="flex-1 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-white bg-transparent">
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
            {/* Seta à direita */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <ChevronRight className="text-white" size={24} />
            </div>
          </div>

          {/* Linha 2: Dividida em duas colunas */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Coluna 1: Card com foto */}
            <div className="rounded-3xl overflow-hidden relative bg-black h-full">
              {/* Placeholder para foto - será substituído por imagem real */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-white/50">Foto Diretor</span>
              </div>
              {/* Overlay de texto */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <span className="text-white text-2xl font-bold">
                  Nossos diretores
                </span>
                <Plus className="text-white" size={20} />
              </div>
            </div>

            {/* Coluna 2: Dividida em duas linhas */}
            <div className="flex flex-col gap-4">
              {/* Linha 1: Card com vídeo */}
              <div className="flex-1 rounded-3xl overflow-hidden relative bg-black">
                {/* Placeholder para vídeo - será substituído por player real */}
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                {/* Título do filme */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-white text-xl font-semibold">
                    Título do filme
                  </span>
                </div>
                {/* Seta à direita */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <ChevronRight className="text-white" size={24} />
                </div>
              </div>

              {/* Linha 2: Card botão */}
              <div className="rounded-3xl overflow-hidden">
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
