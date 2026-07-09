import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const useAnimeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = {
    type: searchParams.get('type') || '',
    genre: searchParams.get('genre') || '',
    status: searchParams.get('status') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
  }
  const [searchInput, setSearchInput] = useState(filters.search)
  const updateParams = (key, value) => {
    setSearchParams(prev => {
      const next = Object.fromEntries(prev)

      if (!value) {
        delete next[key]
      } else {
        next[key] = value
      }

      return next
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams('search', searchInput)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {
    if (filters.search !== searchInput) {
      setSearchInput(filters.search)
    }
  }, [filters.search])

  const filtersReset = () => {
    setSearchParams(prev => {
      const next = Object.fromEntries(prev)

      delete next.type
      delete next.genre
      delete next.status

      return next
    })
  }

  return {
    filters,
    searchInput,
    setSearchInput,
    updateParams,
    filtersReset,
  }
}

export default useAnimeFilters