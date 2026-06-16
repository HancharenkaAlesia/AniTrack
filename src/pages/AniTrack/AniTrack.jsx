import './AniTrack.scss'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import { useState } from 'react'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import {
  FiGrid,
  FiList
} from 'react-icons/fi'

const AniTrack = ({animeData, addAnime, deleteAnime}) => {
  const [view, setView] = useState('grid')

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AnimeForm
        onSubmit={addAnime}
      />
      <div className="anitrack__view-controls">
        <button
          aria-label="Grid view"
          className={view === 'grid' ? 'button button--with-icon is-active' : 'button button--with-icon'}
          onClick={() => setView('grid')}
        >
          <FiGrid />
        </button>
        <button
          aria-label="List view"
          className={view === 'list' ? 'button button--with-icon is-active' : 'button button--with-icon'}
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