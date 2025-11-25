import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Diretores from './Diretores'
import Sobre from './Sobre'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/diretores" element={<Diretores />} />
      </Routes>
    </BrowserRouter>
  )
}


