import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import MenuLateral from '../components/MenuLateral'
import iconeTransparente from '../assets/images/diretores/icone trnsparente.svg'
import { useScrollAnimation, useSequentialAnimation } from '../hooks/useScrollAnimation'

interface InfoContatoProps {
  icon: React.ReactNode
  titulo: string
  conteudo: string
  link?: string
  delay: number
  isVisible: boolean
}

function InfoContato({ icon, titulo, conteudo, link, delay, isVisible }: InfoContatoProps) {
  const content = link ? (
    <a
      href={link}
      className="text-white text-lg hover:opacity-70 transition-opacity"
    >
      {conteudo}
    </a>
  ) : (
    <p className="text-white text-lg">{conteudo}</p>
  )

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-white">{icon}</div>
          <h3 className="text-white text-2xl font-bold">{titulo}</h3>
        </div>
        {content}
      </div>
    </div>
  )
}

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })

  const headerAnimation = useScrollAnimation({ delay: 0 })
  const { containerRef: infoContainerRef, visibleItems: infoVisible } = useSequentialAnimation(3, { 
    delay: 200, 
    stagger: 150 
  })
  const formAnimation = useScrollAnimation({ delay: 600 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
    // Reset do formulário após envio
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
        <div 
          ref={headerAnimation.elementRef}
          className={`relative z-10 pt-32 pb-16 pl-8 transition-all duration-700 ease-out ${
            headerAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-white text-6xl font-bold mb-4">
            Contato
          </h1>
          <p className="text-white text-xl font-medium opacity-90 mb-8">
            Entre em contato conosco
          </p>
          <p className="text-white text-lg leading-relaxed opacity-90 max-w-4xl">
            Estamos sempre abertos a novos projetos, parcerias e conversas. Entre em contato e vamos criar algo incrível juntos!
          </p>
        </div>

        {/* Informações de Contato */}
        <div 
          ref={infoContainerRef}
          className="relative z-10 pl-8 pr-8 pb-16"
        >
          <div className="grid grid-cols-3 gap-8">
            <InfoContato
              icon={<Mail size={32} />}
              titulo="E-mail"
              conteudo="contato@birutinha.com.br"
              link="mailto:contato@birutinha.com.br"
              delay={0}
              isVisible={infoVisible[0]}
            />
            <InfoContato
              icon={<Phone size={32} />}
              titulo="Telefone"
              conteudo="+55 (11) 9999-9999"
              link="tel:+5511999999999"
              delay={0}
              isVisible={infoVisible[1]}
            />
            <InfoContato
              icon={<MapPin size={32} />}
              titulo="Endereço"
              conteudo="São Paulo, SP - Brasil"
              delay={0}
              isVisible={infoVisible[2]}
            />
          </div>
        </div>

        {/* Formulário de Contato */}
        <div 
          ref={formAnimation.elementRef}
          className={`relative z-10 pl-8 pr-8 pb-16 mt-16 transition-all duration-700 ease-out ${
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
                  Vamos conversar?
                </h2>
                <p className="text-white text-xl italic mb-8">
                  Envie sua mensagem
                </p>
                <p className="text-white text-base leading-relaxed opacity-90">
                  Preencha o formulário ao lado e entraremos em contato o mais breve possível. Estamos ansiosos para conhecer seu projeto e transformar suas ideias em realidade.
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nome */}
                <div>
                  <label htmlFor="nome" className="block text-white text-base font-medium mb-3">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Campo E-mail */}
                <div>
                  <label htmlFor="email" className="block text-white text-base font-medium mb-3">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Campo Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-white text-base font-medium mb-3">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Campo Assunto */}
                <div>
                  <label htmlFor="assunto" className="block text-white text-base font-medium mb-3">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  >
                    <option value="" className="bg-purple-900">Selecione um assunto</option>
                    <option value="orcamento" className="bg-purple-900">Orçamento</option>
                    <option value="parceria" className="bg-purple-900">Parceria</option>
                    <option value="trabalhe-conosco" className="bg-purple-900">Trabalhe conosco</option>
                    <option value="outro" className="bg-purple-900">Outro</option>
                  </select>
                </div>

                {/* Campo Mensagem */}
                <div>
                  <label htmlFor="mensagem" className="block text-white text-base font-medium mb-3">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none transition-all"
                    placeholder="Sua mensagem..."
                  />
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

