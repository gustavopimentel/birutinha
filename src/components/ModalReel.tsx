import { X } from 'lucide-react'

interface ModalReelProps {
  isOpen: boolean
  onClose: () => void
  reelUrl?: string
  diretorNome: string
}

export default function ModalReel({
  isOpen,
  onClose,
  reelUrl,
  diretorNome,
}: ModalReelProps) {
  if (!isOpen || !reelUrl) return null

  // Extrai o ID do Vimeo da URL
  const getVimeoId = (url: string): string | null => {
    // Formato: https://vimeo.com/123456789 ou https://vimeo.com/example
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const vimeoId = getVimeoId(reelUrl)
  const vimeoEmbedUrl = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&controls=1`
    : null

  return (
    <>
      {/* Overlay com blur escuro */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[210] flex items-center justify-center p-8 pointer-events-none">
        <div className="relative w-full max-w-6xl aspect-video pointer-events-auto">
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors z-10"
            aria-label="Fechar modal"
          >
            <X size={32} strokeWidth={3} />
          </button>

          {/* Container do vídeo */}
          {vimeoEmbedUrl ? (
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <iframe
                src={vimeoEmbedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`Reel de ${diretorNome}`}
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-3xl bg-black/50 flex items-center justify-center text-white overflow-hidden">
              <p>URL do vídeo inválida</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

