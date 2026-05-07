import MenuLateral from '../components/MenuLateral'
import GradientBackground from '../components/GradientBackground'
import SecaoQuemSomos from '../components/SecaoQuemSomos'
import SecaoPeixe3D from '../components/SecaoPeixe3D'
import SecaoServicos from '../components/SecaoServicos'
import SecaoMotivos from '../components/SecaoMotivos'
import SecaoContato from '../components/SecaoContato'
import SecaoEquipe from '../components/SecaoEquipe'
import SecaoMasonry from '../components/SecaoMasonry'

export default function Home() {
  return (
    <div className="relative w-full">
      <GradientBackground />
      <MenuLateral />

      <SecaoPeixe3D />
      <div id="quem-somos"><SecaoQuemSomos /></div>
      <div id="servicos"><SecaoServicos /></div>
      <div id="motivos"><SecaoMotivos /></div>

      {/* Video slider oculto por enquanto */}

      <div id="portfolio"><SecaoMasonry /></div>
      <div id="equipe"><SecaoEquipe /></div>
      <div id="contato"><SecaoContato /></div>
    </div>
  )
}
