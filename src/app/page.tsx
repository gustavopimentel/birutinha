import SecaoQuemSomos from '@/components/SecaoQuemSomos'
import SecaoPeixe3D from '@/components/SecaoPeixe3D'
import SecaoTecnologia from '@/components/SecaoTecnologia'
import SecaoServicos from '@/components/SecaoServicos'
import SecaoContato from '@/components/SecaoContato'
import SecaoMasonry from '@/components/SecaoMasonry'
import SecaoTime from '@/components/SecaoTime'

export default function Home() {
  return (
    <div className="relative w-full">
      <SecaoPeixe3D />
      <SecaoTecnologia />
      <div id="portfolio"><SecaoMasonry /></div>
      <div id="quem-somos"><SecaoQuemSomos /></div>
      <div id="equipe"><SecaoTime /></div>
      <div id="servicos"><SecaoServicos /></div>
      <div id="contato"><SecaoContato /></div>
    </div>
  )
}
