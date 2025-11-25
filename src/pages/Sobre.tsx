import { useEffect, useRef, useState } from 'react'
import { Mail } from 'lucide-react'
import MenuLateral from '../components/MenuLateral'
import iconeTransparente from '../assets/images/diretores/icone trnsparente.svg'
import fernandaFoto from '../assets/images/sobre/Fernanda.jpg'
import fredFoto from '../assets/images/sobre/Fred.jpg'
import nilviaFoto from '../assets/images/sobre/Nilvia.jpg'
import iconeLaranja from '../assets/images/sobre/icone laranja.svg'
import iconeAzul from '../assets/images/sobre/icone azul.svg'
import iconeRosa from '../assets/images/sobre/icone rosa.svg'
import { useScrollAnimation, useSequentialAnimation } from '../hooks/useScrollAnimation'

interface CardDonoProps {
  foto: string
  nome: string
  descricao: string
  email: string
  icone?: string
  containerRef?: (ref: HTMLDivElement | null) => void
  maxHeight?: number
}

function CardDono({ foto, nome, descricao, email, icone, containerRef, maxHeight }: CardDonoProps) {
  return (
    <div className="flex flex-col items-start w-[340px] max-w-[340px]">
      {/* Foto com ícone */}
      <div className="relative w-full mb-6">
        <img
          src={foto}
          alt={nome}
          className="w-full rounded-3xl object-cover"
          style={{ aspectRatio: '4/5', maxHeight: '400px' }}
        />
        {icone && (
          <div className="absolute bottom-[60px] right-4">
            <img
              src={icone}
              alt=""
              className="w-16 h-16"
            />
          </div>
        )}
      </div>

      {/* Container branco com nome, descrição e email */}
      <div 
        ref={containerRef}
        className="bg-white rounded-3xl px-6 py-6 w-full -mt-[70px] relative z-10 flex flex-col"
        style={maxHeight && maxHeight > 0 ? { minHeight: `${maxHeight}px` } : {}}
      >
        {/* Nome */}
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#655CBB' }}>
          {nome}
        </h3>

        {/* Descrição */}
        <p className="text-base leading-relaxed mb-6 flex-1" style={{ color: '#655CBB' }}>
          {descricao}
        </p>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="text-base font-medium hover:opacity-70 transition-opacity block mt-auto flex items-center gap-2"
          style={{ color: '#655CBB' }}
        >
          <Mail size={18} />
          {email}
        </a>
      </div>
    </div>
  )
}

export default function Sobre() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const headerAnimation = useScrollAnimation({ delay: 0 })
  const { containerRef: cardsContainerRef, visibleItems: cardsVisible } = useSequentialAnimation(3, { 
    delay: 200, 
    stagger: 150 
  })
  const formAnimation = useScrollAnimation({ delay: 600 })

  useEffect(() => {
    const updateMaxHeight = () => {
      const heights = containerRefs.current
        .filter(ref => ref !== null)
        .map(ref => ref!.offsetHeight)
      
      if (heights.length > 0) {
        const max = Math.max(...heights)
        setMaxHeight(max)
      }
    }

    // Aguarda o render completo antes de calcular
    setTimeout(updateMaxHeight, 100)
    window.addEventListener('resize', updateMaxHeight)
    
    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [])

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
        <div 
          ref={headerAnimation.elementRef}
          className={`relative z-10 pt-32 pb-16 pl-8 transition-all duration-700 ease-out ${
            headerAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-white text-6xl font-bold mb-4">
            Sobre
          </h1>
          <p className="text-white text-xl font-medium opacity-90 mb-8">
            Conheça mais sobre a Birutinha
          </p>
          <p className="text-white text-lg leading-relaxed opacity-90 max-w-4xl mb-16">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>

        {/* Cards dos Donos */}
        <div 
          ref={cardsContainerRef}
          className="relative z-10 pl-8 pr-8 pb-16"
        >
          <div className="flex gap-[30px]">
            <div className={`transition-all duration-700 ease-out ${
              cardsVisible[0] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <CardDono
                foto={fernandaFoto}
                nome="Fernanda Carpinelli"
                descricao="Sócia e responsável pela gestão administrativa e orçamentária da Biruta Filmes. Fernanda possui visão de negócios moldada por sua larga experiência no mercado financeiro, prevendo os mais diversos cenários econômicos para gerenciar a produtora com solidez e segurança."
                email="fernanda@birutinha.com.br"
                icone={iconeLaranja}
                containerRef={(ref) => { containerRefs.current[0] = ref }}
                maxHeight={maxHeight}
              />
            </div>
            <div className={`transition-all duration-700 ease-out ${
              cardsVisible[1] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <CardDono
                foto={fredFoto}
                nome="Fred Farah"
                descricao="Traz uma vasta vivência em publicidade, propaganda, rádio, cinema e TV. Já ajudou a construir e consolidar grandes marcas e produtos, trabalhando em conjunto com algumas das melhores agências do país. Além de sócio, atua como Diretor e Produtor Executivo na Biruta Filmes."
                email="fred@birutinha.com.br"
                icone={iconeAzul}
                containerRef={(ref) => { containerRefs.current[1] = ref }}
                maxHeight={maxHeight}
              />
            </div>
            <div className={`transition-all duration-700 ease-out ${
              cardsVisible[2] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <CardDono
                foto={nilviaFoto}
                nome="Nilvia Centeno"
                descricao="Nilvia já atuou como Agência, Cliente e Produtora e como Gerente de Operações traz à Biruta Filmes um olhar abrangente e repleto de conhecimento sobre todo o processo de produção, que resulta na excelência de cada projeto e em maior engajamento do público-alvo."
                email="nilvia@birutinha.com.br"
                icone={iconeRosa}
                containerRef={(ref) => { containerRefs.current[2] = ref }}
                maxHeight={maxHeight}
              />
            </div>
          </div>
        </div>

        {/* Seção "Quer trabalhar conosco" */}
        <div 
          ref={formAnimation.elementRef}
          className={`relative z-10 pl-8 pr-8 pb-16 mt-32 transition-all duration-700 ease-out ${
            formAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Linha azul no topo */}
          <div className="absolute top-0 left-0 right-0 h-px bg-cyan-400/50" />
          
          <div className="grid grid-cols-2 gap-0 mt-8 rounded-3xl overflow-hidden">
            {/* Coluna Esquerda - Fundo Roxo Escuro */}
            <div className="bg-purple-900 p-12 flex flex-col justify-center relative">
              {/* Linha azul vertical no meio */}
              <div className="absolute top-0 bottom-0 right-0 w-px bg-cyan-400/50" />
              
              {/* Conteúdo */}
              <div className="flex flex-col justify-center">
                <h2 className="text-white text-5xl font-bold mb-6">
                  Quer trabalhar conosco?
                </h2>
                <p className="text-white text-xl italic mb-8">
                  Deixe-nos uma mensagem
                </p>
                <p className="text-white text-base leading-relaxed opacity-90">
                  Somos realizadores abertos a novas ideias, negócios e parcerias, entre em contato conosco, venha tomar um cafezinho e contar um pouco sobre seu projeto.
                </p>
              </div>
            </div>

            {/* Coluna Direita - Gradiente Rosa para Laranja com Formulário */}
            <div 
              className="p-12 flex flex-col justify-center"
              style={{
                background: `linear-gradient(to bottom, #ea5ec8, #ee7a19)`,
              }}
            >
              <form className="space-y-8">
                {/* Campo Nome */}
                <div>
                  <label className="block text-white text-base font-medium mb-3">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Campo E-mail */}
                <div>
                  <label className="block text-white text-base font-medium mb-3">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Campo Mensagem */}
                <div>
                  <label className="block text-white text-base font-medium mb-3">
                    Mensagem
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    placeholder="Sua mensagem..."
                  />
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

