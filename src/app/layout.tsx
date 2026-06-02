import type { Metadata } from 'next'
import '../styles/global.css'
import MenuLateral from '@/components/MenuLateral'
import GradientBackground from '@/components/GradientBackground'

export const metadata: Metadata = {
  metadataBase: new URL('https://birutinha.com.br'),
  title: {
    default: 'Birutinha Filmes — Produtora audiovisual ágil e criativa',
    template: '%s | Birutinha Filmes',
  },
  description:
    'Produção audiovisual ágil, criativa e com tecnologia aplicada — dentro da verba real. O núcleo mais ágil da Biruta Filmes: do roteiro à entrega final.',
  keywords: [
    'produtora audiovisual',
    'produção de vídeo',
    'filmes publicitários',
    'conteúdo para redes',
    'Birutinha Filmes',
    'Biruta Filmes',
    'São Paulo',
  ],
  authors: [{ name: 'Birutinha Filmes' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Birutinha Filmes',
    title: 'Birutinha Filmes — Produtora audiovisual ágil e criativa',
    description:
      'Produção audiovisual ágil, criativa e com tecnologia aplicada — dentro da verba real.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birutinha Filmes',
    description:
      'Produção audiovisual ágil, criativa e com tecnologia aplicada — dentro da verba real.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zgs2oyz.css" />
      </head>
      <body>
        <GradientBackground />
        <MenuLateral />
        {children}
      </body>
    </html>
  )
}
