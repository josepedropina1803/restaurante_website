import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { EmentaPage } from '@/pages/EmentaPage'
import { HomePage } from '@/pages/HomePage'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ementa" element={<EmentaPage />} />
      </Routes>
    </BrowserRouter>
  )
}
