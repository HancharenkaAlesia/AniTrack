import './AniTrack.scss'
import { useMemo } from 'react'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import {
  FiGrid,
  FiList
} from 'react-icons/fi'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel.jsx'
import useAnimeFilters from '../../hooks/useAnimeFilters.js'
import useLocalStorage from '../../hooks/useLocalStorage.js'

const AniTrack = ({animeData, addAnime, deleteAnime}) => {
  const {
    filters,
    searchInput,
    setSearchInput,
    updateParams,
    filtersReset,
  } = useAnimeFilters()

  const [view, setView] = useLocalStorage('list-view', 'grid')

  const finalAnimeData = useMemo(() => {
    return animeData.filter((anime) => {
      const matchesSearch = anime.title.toLowerCase().includes(filters.search.toLowerCase())

      const matchesType = !filters.type || anime.type === filters.type
      const matchesGenre = !filters.genre || anime.genre === filters.genre
      const matchesStatus = !filters.status || anime.status === filters.status

      return (
        matchesSearch &&
        matchesType &&
        matchesGenre &&
        matchesStatus
      )
    })
  }, [filters, animeData])

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AnimeForm
        onSubmit={addAnime}
      />
      <div className="anitrack__controls-panel">
       <div className="anitrack__controls-panel-wrapper">
         <SearchForm
           value={searchInput}
           onChange={setSearchInput}
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
       <FiltersPanel
         filters={filters}
         onFilterChange={updateParams}
         filtersReset={filtersReset}
       />
      </div>
      <div className="anitrack__body">
        {finalAnimeData.length > 0 ? (
          <ul className={`anitrack__list anitrack__list--${view}`}>
            {finalAnimeData.map((item) => (
                <AnimeCard
                  key={item.id}
                  onDelete={deleteAnime}
                  mode={view}
                  searchQuery={filters.search}
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