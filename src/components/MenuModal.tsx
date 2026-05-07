import { Link } from 'react-router-dom'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Diretores', href: '/diretores' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <div
      className={`fixed top-4 bottom-4 left-4 z-[100] rounded-3xl border border-white/50 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        isOpen
          ? 'w-[calc(100%-2rem)]'
          : 'w-40 pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 flex flex-col items-start justify-center pl-48 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 delay-300' : 'opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-10">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-white text-6xl font-bold hover:text-white/80 transition-all duration-500 ease-out ${
                isOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{
                transitionDelay: isOpen ? `${400 + index * 80}ms` : '0ms',
              }}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`w-64 h-px bg-white/30 transition-all duration-500 ${
              isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            } origin-left`}
            style={{
              transitionDelay: isOpen ? `${400 + menuItems.length * 80}ms` : '0ms',
            }}
          />

          <a
            href="tel:+551150510404"
            className={`text-white/70 text-xl font-medium hover:text-white transition-all duration-500 ${
              isOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
            style={{
              transitionDelay: isOpen ? `${400 + (menuItems.length + 1) * 80}ms` : '0ms',
            }}
            onClick={onClose}
          >
            11 5051-0404
          </a>
        </nav>
      </div>
    </div>
  )
}
