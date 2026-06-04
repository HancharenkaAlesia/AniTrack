import AniTrack from './pages/AniTrack/AniTrack.jsx'
import { Routes, Route } from 'react-router-dom'
import AnimeDetails from './pages/AniDetails/AnimeDetails.jsx'

const App = () => {
  return (
    <div className='page'>
      <Routes>
        <Route path="/" element={<AniTrack />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </div>
  )
}

export default App
