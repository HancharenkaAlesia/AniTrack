import AniTrack from './pages/AniTrack/AniTrack.jsx'
import { Routes, Route } from 'react-router-dom'
import AniDetails from './pages/AniDetails/AniDetails.jsx'
import animeList from './data/animeList.js'
import { useEffect, useState } from 'react'

const App = () => {
  const [animeData, setAnimeData] = useState(() => {
   try {
     const dataFromLocalStorage = localStorage.getItem('animeData')

     return dataFromLocalStorage
       ? JSON.parse(dataFromLocalStorage)
       : animeList
   } catch {
     return animeList
   }
  })

  useEffect(() => {
    localStorage.setItem(
      'animeData',
      JSON.stringify(animeData)
    )
  }, [animeData])

  const addAnime = (data) => {
    const newAnime = {
      ...data,
      id: crypto.randomUUID()
    }

    setAnimeData(prev => [...prev, newAnime])
  }

  const deleteAnime = (id) => {
    setAnimeData(prev =>
      prev.filter(anime => anime.id !== id)
    )
  }

  const updateAnime = (id, updatedAnime) => {
    setAnimeData(prev => (
      prev.map((anime) =>
        anime.id === id
        ? { ...anime, ...updatedAnime }
          : anime
      )
    ))
  }

  return (
    <div className='page'>
      <Routes>
        <Route
          path="/"
          element={
          <AniTrack
            addAnime={addAnime}
            deleteAnime={deleteAnime}
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
            updateAnime={updateAnime}
          />
        } />
      </Routes>
    </div>
  )
}

export default App
