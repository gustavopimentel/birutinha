import { useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import ModalReel from '../components/ModalReel'
import { DIRETORES } from '../config/diretores'
import setaIcon from '../assets/images/diretores/seta.svg'
import iconeTransparente from '../assets/images/diretores/icone trnsparente.svg'
import { Diretor } from '../config/diretores'

export default function Diretores() {
  const [selectedDiretor, setSelectedDiretor] = useState<Diretor | null>(null)

  const handleCardClick = (diretor: Diretor) => {
    if (diretor.reelUrl) {
      setSelectedDiretor(diretor)
    }
  }

  const handleCloseModal = () => {
    setSelectedDiretor(null)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Menu Lateral - Fixo */}
      <MenuLateral />

      {/* Background fixo */}
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

      {/* Conteúdo Principal */}
      <section className="relative w-full min-h-screen pl-48 pr-4 pt-4 pb-4 z-10">
        {/* Header */}
        <div className="relative z-10 pt-32 pb-16 pl-8">
          <h1 className="text-white text-6xl font-bold mb-4">
            Nossos diretores
          </h1>
          <p className="text-white text-xl font-medium opacity-90">
            Conheça os talentos por trás de cada produção
          </p>
        </div>

        {/* Lista de Diretores */}
        <div className="relative z-10 pl-8 pr-8 pb-16 space-y-16">
          {DIRETORES.map((diretor) => (
            <div
              key={diretor.id}
              onClick={() => handleCardClick(diretor)}
              className="inline-flex gap-8 border border-white rounded-3xl p-8 min-h-[350px] hover:backdrop-blur-md hover:bg-black/10 transition-all duration-300 cursor-pointer group relative"
            >
              {/* Foto - sempre centralizada verticalmente */}
              <div className="flex items-center justify-center h-full">
                <img
                  src={diretor.foto}
                  alt={diretor.nome}
                  className="w-[350px] h-[350px] rounded-3xl object-cover flex-shrink-0"
                />
              </div>

              {/* Conteúdo ao lado da foto */}
              <div className="flex-1 flex flex-col gap-6 max-w-[800px]">
                {/* Nome */}
                <h3 className="text-white text-5xl font-bold">
                  {diretor.nome}
                </h3>

                {/* Descrição */}
                <p className="text-white text-lg leading-relaxed opacity-90">
                  {diretor.descricao}
                </p>

                {/* Watch Reel Button */}
                {diretor.reelUrl && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-white text-xl font-semibold hover:text-white/80 transition-colors w-fit"
                  >
                    <span>watch reel</span>
                    <img
                      src={setaIcon}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal do Reel */}
      {selectedDiretor && (
        <ModalReel
          isOpen={!!selectedDiretor}
          onClose={handleCloseModal}
          reelUrl={selectedDiretor.reelUrl}
          diretorNome={selectedDiretor.nome}
        />
      )}
    </div>
  )
}
