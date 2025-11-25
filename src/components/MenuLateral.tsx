import { useState } from 'react'
import { Instagram } from 'lucide-react'
import logoTipo from '../assets/images/home/Logotipo Birutinha tipologia beje.svg'
import logoTipo2 from '../assets/images/home/Logotipo Birutinha 2.svg'
import { SOCIAL_LINKS } from '../config/socialLinks'
import MenuModal from './MenuModal'

interface MenuLateralProps {
  isSlideSection?: boolean
}

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

export default function MenuLateral({ isSlideSection = false }: MenuLateralProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Usa o logo 1 na seção de slides, logo 2 nas outras seções/páginas
  const logoAtual = isSlideSection ? logoTipo : logoTipo2

  return (
    <>
      <div className="fixed left-4 top-4 bottom-4 w-40 z-50 flex flex-col items-center justify-between p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/50">
        {/* Logo no topo */}
        <div className="flex flex-col items-center">
          <img
            src={logoAtual}
            alt="Birutinha Filmes"
            className="h-28 w-auto transition-opacity duration-500"
          />
        </div>

        {/* Menu e ícones sociais na parte inferior */}
        <div className="flex flex-col items-center gap-24">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-xs font-medium tracking-[0.2em] uppercase hover:text-white/70 transition-colors cursor-pointer relative h-5 w-20 flex items-center justify-center font-sans"
          >
            <span
              className={`absolute transition-all duration-500 ease-in-out font-sans ${
                isMenuOpen
                  ? 'opacity-0 translate-y-2'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              MENU
            </span>
            <span
              className={`absolute transition-all duration-500 ease-in-out font-sans ${
                isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              FECHAR
            </span>
          </button>
          <div className="flex flex-row gap-4">
            <a
              href={SOCIAL_LINKS.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/70 transition-colors"
              aria-label="Vimeo"
            >
              <VimeoIcon size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/70 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal do Menu */}
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
