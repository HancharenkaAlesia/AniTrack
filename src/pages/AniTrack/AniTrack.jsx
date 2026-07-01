import './AniTrack.scss'
import { useEffect, useMemo, useState } from 'react'
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
import Sort from '../../components/Sort/Sort.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'

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
    const filtered =  anime.filter((anime) => {
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

    const sorted = [...filtered]

    switch (filters.sort) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        break
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'rating-asc':
        sorted.sort((a, b) => a.rating - b.rating)
        break
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      default: break
    }

    return sorted
  }, [filters.search, filters.type, filters.genre, filters.status, filters.sort,  anime])

  const onAddAnime = async (data) => {
    try {
      await handleAddAnime(data)
      showToast('Anime added 🌸')
    } catch (error) {
      showToast('Something went wrong ❌', 'error')
      throw error
    }
  }

  const onDeleteAnime = async (id) => {
    try {
      await handleDeleteAnime(id)
      showToast('Deleted 🗑', 'success')
    } catch(error) {
      showToast('Delete failed ❌', 'error')
      throw error
    }
  }

  const isInitialEmpty = !loading && !error && anime.length === 0
  const isNoResults = !loading && !error && anime.length > 0 && filteredAnime.length === 0
  const hasResults = filteredAnime.length > 0

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
          <Sort
            value={filters.sort}
            onChange={updateParams}
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
        {loading && (
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
            {filteredAnime.map((item) => (
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
      </div>
      {toast && (
        <Toast toast={toast} />
      )}
    </div>
  )
}

export default AniTrack