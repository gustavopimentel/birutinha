interface Diretor {
  id: string
  nome: string
  foto: string
  descricao: string
  reelUrl?: string
}

interface CardDiretorProps {
  diretor: Diretor
}

export default function CardDiretor({ diretor }: CardDiretorProps) {
  return (
    <div className="flex items-center gap-16 mb-16">
      {/* Foto do Diretor */}
      <div className="flex-shrink-0">
        <img
          src={diretor.foto}
          alt={diretor.nome}
          className="w-80 h-80 rounded-3xl object-cover"
        />
      </div>

      {/* Conjunto: Nome, Descrição e Watch Reel */}
      <div className="flex items-center gap-16 -ml-[120px]">
        {/* Nome */}
        <div className="flex-shrink-0">
        <h3 className="text-white text-5xl font-bold">
          {diretor.nome.split(' ').map((parte, index, array) => {
            if (index === 0) {
              // Primeira palavra (primeiro nome)
              return <div key={index}>{parte}</div>
            } else if (index === 1 && array.length > 1) {
              // Segunda palavra em diante (sobrenome)
              return <div key={index}>{array.slice(1).join(' ')}</div>
            }
            return null
          })}
        </h3>
        </div>

        {/* Descrição */}
        <div className="flex-1 max-w-[35%]">
          <p className="text-white text-lg leading-relaxed opacity-90">
            {diretor.descricao}
          </p>
        </div>

        {/* Botão Watch Reel */}
        {diretor.reelUrl && (
          <div className="flex-shrink-0">
            <a
              href={diretor.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-start gap-2 text-white text-3xl font-semibold hover:text-white/80 transition-colors"
            >
              <span className="flex flex-col">
                <span>watch</span>
                <span>reel</span>
              </span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
