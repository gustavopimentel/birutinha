import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import ScrollToTop from '../components/ScrollToTop'

const Sobre = lazy(() => import('./Sobre'))
const Diretores = lazy(() => import('./Diretores'))
const Contato = lazy(() => import('./Contato'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/diretores" element={<Diretores />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
