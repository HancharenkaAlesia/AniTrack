import './AniTrack.scss'
import AnimeCard from '@/components/AnimeCard/AnimeCard.jsx'
import SearchForm from '@/components/SearchForm/SearchForm.jsx'
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel.jsx'
import useAnimeFilters from '@/hooks/useAnimeFilters.js'
import useLocalStorage from '@/hooks/useLocalStorage.js'
import { FiGrid, FiList } from 'react-icons/fi'
import useAnime from '@/hooks/useAnime.js'
import AnimeCardSkeleton
  from '@/components/AnimeCardSkeleton/AnimeCardSkeleton.jsx'
import AddAnimeModal from '@/components/AddAnimeModal/AddAnimeModal.jsx'
import useToast from '@/hooks/useToast.js'
import Toast from '@/components/Toast/Toast.jsx'
import Sort from '@/components/Sort/Sort.jsx'
import EmptyState from '@/components/EmptyState/EmptyState.jsx'
import Pagination from '@/components/Pagintaion/Pagination.jsx'

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
    page,
    setPage,
    totalPages,
    totalAnime,
    loading,
    error,
    isAdding,
    deletingId,
    handleAddAnime,
    handleDeleteAnime
  } = useAnime(filters)

  const {
    toast,
    showToast,
  } = useToast()

  const [view, setView] = useLocalStorage('list-view', 'grid')

  const onAddAnime = async (data) => {
    try {
      await handleAddAnime(data)
      showToast('Anime added 🌸')
    } catch (error) {
      showToast('Something went wrong ❌', 'error')
      throw error
    }
  }

  const onDeleteAnime = async (anime) => {
    try {
      await handleDeleteAnime(anime)
      showToast('Deleted 🗑', 'success')
    } catch (error) {
      showToast('Delete failed ❌', 'error')
      throw error
    }
  }

  const handleFilterChange = (key, value) => {
    setPage(1)
    updateParams(key, value)
  }

  const hasFilters = Boolean(
    filters.search ||
    filters.type ||
    filters.genre ||
    filters.status
  )

  const hasResults = anime.length > 0

  const isInitialEmpty =
    !loading &&
    !error &&
    !hasResults &&
    !hasFilters

  const isNoResults =
    !loading &&
    !error &&
    !hasResults &&
    hasFilters

  return (
    <div className="anitrack">
      <header className="anitrack__header">
        <h1 className="anitrack__title">AniTrack 🌸</h1>
        <AddAnimeModal
          onSubmit={onAddAnime}
          loading={isAdding}
        />
      </header>
      <div className="anitrack__controls-panel">
        <SearchForm
          value={searchInput}
          onChange={setSearchInput}
        />
        <div className="anitrack__controls-panel-wrapper">
          <Sort
            value={filters.sort}
            onChange={handleFilterChange}
          />
          <FiltersPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            filtersReset={filtersReset}
          />
          <div className="anitrack__controls-panel-view">
            <button
              aria-label="Grid view"
              className={`button button--with-icon ${
                view === 'grid' ? 'is-active' : ''
              }`}
              onClick={() => setView('grid')}
            >
              <FiGrid />
            </button>
            <button
              aria-label="List view"
              className={`button button--with-icon ${
                view === 'list' ? 'is-active' : ''
              }`}
              onClick={() => setView('list')}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>
      <div className="anitrack__body">
        {loading && anime.length === 0 && (
          <ul className={`anitrack__list anitrack__list--${view}`}>
            {Array.from({ length: 6 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))}
          </ul>
        )}
        {error && (
          <EmptyState type="error" error={error} />
        )}

        {isInitialEmpty && (
          <EmptyState type="empty" />
        )}

        {isNoResults && (
          <EmptyState type="no-results" />
        )}

        {hasResults && (
          <ul className={`anitrack__list anitrack__list--${view}`}>
            {anime.map((item) => (
              <AnimeCard
                key={item.id}
                onDelete={onDeleteAnime}
                isDeleting={deletingId === item.id}
                mode={view}
                searchQuery={filters.search}
                {...item}
              />
            ))}
          </ul>
        )}

        <p className="anitrack__counter">🌸 {totalAnime} anime in your collection</p>

        {totalPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}

      </div>
      {toast && (
        <Toast toast={toast} />
      )}
    </div>
  )
}

export default AniTrack