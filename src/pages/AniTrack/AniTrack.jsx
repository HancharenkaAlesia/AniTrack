import './AniTrack.scss'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import animeList from '../../data/animeList.js'
import { useState } from 'react'

const AniTrack = () => {
  const [animeData, setAnimeData] = useState(animeList)

  const deleteAnime = (id) => {
    setAnimeData(prev =>
      prev.filter(anime => anime.id !== id)
    )
  }

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <div className="anirtack__body">
        <ul className="anitrack__list">
          {animeData.map((item) => (
            <AnimeCard
              key={item.id}
              onDelete={deleteAnime}
              {...item}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AniTrack