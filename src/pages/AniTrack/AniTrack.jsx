import './AniTrack.scss'
import { useEffect, useMemo, useState } from 'react'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel.jsx'
import useAnimeFilters from '../../hooks/useAnimeFilters.js'
import useLocalStorage from '../../hooks/useLocalStorage.js'
import { FiGrid, FiList } from 'react-icons/fi'
import { getAnime, addAnime, deleteAnime,} from '../../api/anime'

const AniTrack = () => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    filters,
    searchInput,
    setSearchInput,
    updateParams,
    filtersReset,
  } = useAnimeFilters()

  const [view, setView] = useLocalStorage('list-view', 'grid')

  const finalAnimeData = useMemo(() => {
    return anime.filter((anime) => {
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
  }, [filters, anime])

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const { data, error } = await getAnime()

        if (error) {
          throw error
        }

        setAnime(data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [])

  const handleAddAnime = async (newAnime) => {
    const { data, error } = await addAnime(newAnime)
    if (error) {
      console.error(error)
      return
    }

    setAnime(prev => [data[0], ...prev])
  }

  const handleDeleteAnime = async (id) => {
    const { error } = await deleteAnime(id)
    if (error) {
      console.error(error)
      return
    }

    setAnime(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AnimeForm
        onSubmit={handleAddAnime}
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
              onClick={() => setView('list')}
            >
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
        {loading ? (
            <h2>Loading...</h2>
          )
          : error ?(
            <h2>Error: {error}</h2>
          )
          : finalAnimeData.length > 0 ? (
              <ul className={`anitrack__list anitrack__list--${view}`}>
                {finalAnimeData.map((item) => (
                  <AnimeCard
                    key={item.id}
                    onDelete={handleDeleteAnime}
                    mode={view}
                    searchQuery={filters.search}
                    {...item}
                  />
                ))
                }
              </ul>
            )
            : (
              <h2>Nothing found. Please refine your search.</h2>
            )}
      </div>
    </div>
  )
}

export default AniTrack