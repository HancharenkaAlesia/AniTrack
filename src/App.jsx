import AniTrack from './pages/AniTrack/AniTrack.jsx'
import { Routes, Route } from 'react-router-dom'
import AniDetails from './pages/AniDetails/AniDetails.jsx'
import animeList from './data/animeList.js'
import { useState } from 'react'

const App = () => {
  const [animeData, setAnimeData] = useState(animeList)

  return (
    <div className='page'>
      <Routes>
        <Route
          path="/"
          element={
          <AniTrack
            animeData={animeData}
            setAnimeData={setAnimeData}
          />
        }
        />
        <Route
          path="/anime/:id"
          element={
          <AniDetails
            animeData={animeData}
          />
        } />
      </Routes>
    </div>
  )
}

export default App
