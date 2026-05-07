import { useState } from 'react'
import { Instagram } from 'lucide-react'
import logoTipo2 from '../assets/images/home/Logotipo Birutinha 2.svg'
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
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 8l4 8 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

const MENU_ITEMS = [
  { label: 'Quem somos', target: 'quem-somos' },
  { label: 'Serviços', target: 'servicos' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Equipe', target: 'equipe' },
  { label: 'Contato', target: 'contato' },
]

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

function MenuNav({ isOpen, onClose, textSize = 'text-4xl' }: { isOpen: boolean; onClose: () => void; textSize?: string }) {
  return (
    <nav className="flex flex-col gap-8">
      {MENU_ITEMS.map((item, index) => (
        <button
          key={item.target}
          className={`text-white ${textSize} font-bold hover:text-white/80 transition-all duration-500 ease-out text-left ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionDelay: isOpen ? `${300 + index * 80}ms` : '0ms' }}
          onClick={() => {
            onClose()
            setTimeout(() => scrollToSection(item.target), 400)
          }}
        >
          {item.label}
        </button>
      ))}
      <div
        className={`w-48 h-px bg-white/30 transition-all duration-500 origin-left ${
          isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{ transitionDelay: isOpen ? `${300 + MENU_ITEMS.length * 80}ms` : '0ms' }}
      />
      <a
        href="tel:+551150510404"
        className={`text-white/70 text-lg font-medium hover:text-white transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
        style={{ transitionDelay: isOpen ? `${300 + (MENU_ITEMS.length + 1) * 80}ms` : '0ms' }}
        onClick={onClose}
      >
        11 5051-0404
      </a>
      <div
        className={`flex gap-4 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
        style={{ transitionDelay: isOpen ? `${300 + (MENU_ITEMS.length + 2) * 80}ms` : '0ms' }}
      >
        <a href={SOCIAL_LINKS.vimeo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
          <VimeoIcon size={22} />
        </a>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
          <Instagram size={22} strokeWidth={1.5} />
        </a>
      </div>
    </nav>
  )
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between relative">
      <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
      <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
    </div>
  )
}

// ===== VARIAÇÃO 1: Barra horizontal fixa no topo =====
export function MenuMobileVar1() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`fixed left-3 right-3 top-3 z-50 rounded-2xl border border-white/50 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        isOpen ? 'bottom-3' : 'h-14'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-5 z-10">
        <img src={logoTipo2} alt="Birutinha Filmes" className="h-8 w-auto" />
        <button onClick={() => setIsOpen(!isOpen)} className="p-1" aria-label="Menu">
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'
      }`}>
        <MenuNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

// ===== VARIAÇÃO 2: Pill flutuante no bottom =====
export function MenuMobileVar2() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`fixed z-50 border border-white/50 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        isOpen
          ? 'left-3 right-3 top-3 bottom-3 rounded-2xl'
          : 'left-1/2 -translate-x-1/2 bottom-4 w-48 h-12 rounded-full'
      }`}
    >
      <div className={`flex items-center justify-between z-10 transition-all duration-700 ${
        isOpen ? 'absolute top-0 left-0 right-0 h-14 px-5' : 'h-full px-5'
      }`}>
        <img src={logoTipo2} alt="Birutinha Filmes" className={`w-auto transition-all duration-700 ${isOpen ? 'h-8' : 'h-5'}`} />
        <button onClick={() => setIsOpen(!isOpen)} className="p-1" aria-label="Menu">
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'
      }`}>
        <MenuNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

// ===== VARIAÇÃO 3: Ícone hambúrguer + painel lateral =====
export function MenuMobileVar3() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <img src={logoTipo2} alt="Birutinha Filmes" className="h-8 w-auto" />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full border border-white/50 bg-white/5 backdrop-blur-md flex items-center justify-center"
        aria-label="Menu"
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      <div
        className={`fixed inset-0 z-40 border border-white/50 bg-white/5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex items-center justify-center">
          <MenuNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  )
}

// ===== MENU DESKTOP (original) =====
function MenuDesktop() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`fixed top-4 bottom-4 left-4 z-50 rounded-3xl border border-white/50 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        isOpen ? 'w-[calc(100%-2rem)]' : 'w-40'
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-40 flex flex-col items-center justify-between p-6 z-10">
        <div className="flex flex-col items-center">
          <img src={logoTipo2} alt="Birutinha Filmes" className="h-28 w-auto" />
        </div>
        <div className="flex flex-col items-center gap-24">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-xs font-medium tracking-[0.2em] uppercase hover:text-white/70 transition-colors cursor-pointer relative h-5 w-20 flex items-center justify-center font-sans"
          >
            <span className={`absolute transition-all duration-500 ease-in-out ${isOpen ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>MENU</span>
            <span className={`absolute transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>FECHAR</span>
          </button>
          <div className="flex flex-row gap-4">
            <a href={SOCIAL_LINKS.vimeo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Vimeo">
              <VimeoIcon size={24} />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram">
              <Instagram size={24} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <div className={`absolute left-40 top-6 bottom-6 w-px bg-white/20 transition-opacity duration-500 ${isOpen ? 'opacity-100 delay-300' : 'opacity-0'}`} />

      <div className={`absolute inset-0 flex items-center pl-48 transition-opacity duration-500 ${isOpen ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors" aria-label="Fechar menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <nav className="flex flex-col gap-10">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.target}
              className={`text-white text-6xl font-bold hover:text-white/80 transition-all duration-500 ease-out text-left ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: isOpen ? `${400 + index * 80}ms` : '0ms' }}
              onClick={() => { setIsOpen(false); setTimeout(() => scrollToSection(item.target), 400) }}
            >
              {item.label}
            </button>
          ))}
          <div className={`w-64 h-px bg-white/30 transition-all duration-500 origin-left ${isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: isOpen ? `${400 + MENU_ITEMS.length * 80}ms` : '0ms' }} />
          <a href="tel:+551150510404" className={`text-white/70 text-xl font-medium hover:text-white transition-all duration-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: isOpen ? `${400 + (MENU_ITEMS.length + 1) * 80}ms` : '0ms' }} onClick={() => setIsOpen(false)}>
            11 5051-0404
          </a>
        </nav>
      </div>
    </div>
  )
}

// ===== COMPONENTE PRINCIPAL: mostra desktop ou mobile =====
// Troque MenuMobileVar1 por Var2 ou Var3 para testar
export default function MenuLateral() {
  return (
    <>
      <div className="hidden lg:block">
        <MenuDesktop />
      </div>
      <div className="lg:hidden">
        <MenuMobileVar1 />
      </div>
    </>
  )
}
