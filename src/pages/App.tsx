import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Diretores from './Diretores'
import Sobre from './Sobre'
import Contato from './Contato'
import ScrollToTop from '../components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/diretores" element={<Diretores />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  )
}


