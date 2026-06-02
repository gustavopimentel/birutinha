import type { Metadata } from 'next'
import Diretores from '@/screens/Diretores'

export const metadata: Metadata = {
  title: 'Diretores',
  description:
    'Conheça os diretores da Birutinha Filmes e assista aos reels de cada talento por trás das produções.',
}

export default function DiretoresPage() {
  return <Diretores />
}
