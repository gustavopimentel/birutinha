import type { Metadata } from 'next'
import Contato from '@/screens/Contato'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com a Birutinha Filmes. Conte seu projeto e a gente já começa a pensar em como entregar.',
}

export default function ContatoPage() {
  return <Contato />
}
