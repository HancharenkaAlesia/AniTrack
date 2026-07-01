import './AniTrack.scss'
import { useMemo } from 'react'
import AnimeCard from '../../components/AnimeCard/AnimeCard.jsx'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel.jsx'
import useAnimeFilters from '../../hooks/useAnimeFilters.js'
import useLocalStorage from '../../hooks/useLocalStorage.js'
import { FiGrid, FiList } from 'react-icons/fi'
import useAnime from '../../hooks/useAnime.js'
import AnimeCardSkeleton
  from '../../components/AnimeCardSkeleton/AnimeCardSkeleton.jsx'
import AddAnimeModal from '../../components/AddAnimeModal/AddAnimeModal.jsx'
import useToast from '../../hooks/useToast.js'
import Toast from '../../components/Toast/Toast.jsx'

const AniTrack = () => {
  const {
    filters,
    searchInput,
    setSearchInput,
    updateParams,
    filtersReset,
  } = useAnimeFilters()

  const {
    anime,
    loading,
    error,
    isAdding,
    deletingId,
    handleAddAnime,
    handleDeleteAnime
  } = useAnime()

  const {
    toast,
    showToast,
  } = useToast()

  const [view, setView] = useLocalStorage('list-view', 'grid')
  const filteredAnime = useMemo(() => {
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
  }, [filters.search, filters.type, filters.genre, filters.status, anime])

  const onAddAnime = async (data) => {
    try {
      await handleAddAnime(data)
      showToast('Anime added 🌸')
    } catch {
      showToast('Something went wrong ❌', 'error')
      throw error
    }
  }

  const onDeleteAnime = async (id) => {
    try {
      await handleDeleteAnime(id)
      showToast('Deleted 🗑', 'success')
    } catch {
      showToast('Delete failed ❌', 'error')
    }
  }

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
      </header>
      <AddAnimeModal
        onSubmit={onAddAnime}
        loading={isAdding}
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
            <ul className={`anitrack__list anitrack__list--${view}`}>
              {Array.from({ length: 6 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </ul>
          )
          : error ?(
            <h2>Error: {error}</h2>
          )
          : filteredAnime.length > 0 ? (
              <ul className={`anitrack__list anitrack__list--${view}`}>
                {filteredAnime.map((item) => (
                  <AnimeCard
                    key={item.id}
                    onDelete={onDeleteAnime}
                    isDeleting={deletingId === item.id}
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
      {toast && (
        <Toast toast={toast} />
      )}
    </div>
  )
}

export default AniTrack