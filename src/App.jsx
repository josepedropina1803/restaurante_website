import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmentaPage from './pages/EmentaPage'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ementa" element={<EmentaPage />} />
      </Routes>
    </Router>
  )
}

export default App
