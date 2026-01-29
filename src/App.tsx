import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SavedLoc } from './pages/SavedLocPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preferiti" element={<SavedLoc />} />
    </Routes>
  )
}

export default App
