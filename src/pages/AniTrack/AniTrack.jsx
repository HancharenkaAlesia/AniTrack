import './AniTrack.scss'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import { useState } from 'react'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import {
  FiGrid,
  FiList
} from 'react-icons/fi'

const AniTrack = ({animeData, setAnimeData}) => {
  const [view, setView] = useState('grid')

  const deleteAnime = (id) => {
    setAnimeData(prev =>
      prev.filter(anime => anime.id !== id)
    )
  }

  const addAnime = (data) => {
    const newAnime = {
      ...data,
      id: crypto.randomUUID()
    }

    setAnimeData(prev => [...prev, newAnime])
  }

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AnimeForm
        onAddAnime={addAnime}
      />
      <div className="anitrack__view-controls">
        <button
          aria-label="Grid view"
          className={view === 'grid' ? 'is-active' : ''}
          onClick={() => setView('grid')}
        >
          <FiGrid />
        </button>
        <button
          aria-label="List view"
          className={view === 'list' ? 'is-active' : ''}
          onClick={() => setView('list')}>
          <FiList />
        </button>
      </div>
      <div className="anitrack__body">
        <ul className={`anitrack__list anitrack__list--${view}`}>
          {animeData.map((item) => (
            <AnimeCard
              key={item.id}
              onDelete={deleteAnime}
              mode={view}
              {...item}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AniTrack