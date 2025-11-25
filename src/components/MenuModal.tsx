import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  // Itens do menu - pode ser movido para um arquivo de configuração depois
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Diretores', href: '/diretores' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <>
      {/* Overlay com animação - exatamente do tamanho do modal */}
      <div
        className={`fixed left-48 top-4 bottom-4 right-4 rounded-3xl bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal do Menu */}
      <div
        className={`fixed left-48 top-4 bottom-4 right-4 z-[110] rounded-3xl border border-white bg-white/10 backdrop-blur-md transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className={`absolute right-6 top-6 text-white hover:text-white/70 transition-all duration-300 z-10 ${
            isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
          aria-label="Fechar menu"
        >
          <X size={32} strokeWidth={3} />
        </button>

        {/* Conteúdo do Menu */}
        <div className="h-full flex flex-col items-start justify-center p-8 pl-32">
          <nav className="flex flex-col gap-12 w-full max-w-2xl">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-white text-5xl font-semibold hover:text-white/80 transition-all duration-300 hover:translate-x-2 ${
                  isOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                }}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Separador */}
            <div
              className={`w-full h-px bg-white/50 transition-all duration-300 ${
                isOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{
                transitionDelay: isOpen ? `${menuItems.length * 100}ms` : '0ms',
              }}
            />
            
            {/* Telefone */}
            <a
              href="tel:+551150510404"
              className={`text-white text-2xl font-medium hover:text-white/80 transition-all duration-300 ${
                isOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{
                transitionDelay: isOpen ? `${(menuItems.length + 1) * 100}ms` : '0ms',
              }}
              onClick={onClose}
            >
              11 5051-0404
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}

