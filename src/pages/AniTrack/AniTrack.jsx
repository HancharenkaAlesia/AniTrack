import './AniTrack.scss'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import { useState } from 'react'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import {
  FiGrid,
  FiList
} from 'react-icons/fi'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'

const AniTrack = ({animeData, addAnime, deleteAnime}) => {
  const [view, setView] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const finalAnimeData = animeData.filter(anime => {
    return anime.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  })

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AnimeForm
        onSubmit={addAnime}
      />
      <div className="anitrack__controls-panel">
        <SearchForm
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <div className="anitrack__controls-panel-view">
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
      </div>
      <div className="anitrack__body">
        {finalAnimeData.length > 0 ? (
          <ul className={`anitrack__list anitrack__list--${view}`}>
            {finalAnimeData.map((item) => (
                <AnimeCard
                  key={item.id}
                  onDelete={deleteAnime}
                  mode={view}
                  searchQuery={searchQuery}
                  {...item}
                />
              ))
            }
          </ul>
        ) : (
          <h2>Nothing found. Please refine your search.</h2>
        )}

      </div>
    </div>
  )
}

export default AniTrack