import type { Metadata } from 'next'
import Sobre from '@/screens/Sobre'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a Birutinha Filmes — o núcleo mais ágil da Biruta Filmes, e os sócios por trás da produtora.',
}

export default function SobrePage() {
  return <Sobre />
}
