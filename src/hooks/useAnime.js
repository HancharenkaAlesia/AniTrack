import { useEffect, useState } from 'react'
import { getAnime, addAnime, deleteAnime } from '../api/anime.js'
import { uploadPoster } from '../api/storage'

const PAGE_SIZE = 6

const useAnime = (filters = {
  type: '',
  genre: '',
  status: '',
  search: '',
  sort: '',
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [totalAnime, setTotalAnime] = useState(0)

  const fetchAnime = async (currentPage = page) => {
    setLoading(true)
    setError(null)
    /*setAnime([])*/

    try {
      const { data, error, count } = await getAnime(currentPage, PAGE_SIZE, filters)

      if (error) {
        throw error
      }

      setAnime(data)
      setTotalAnime(count)
      setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)))

      return data

    } catch (error) {
      console.error(error)
      setError(error.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const handleAddAnime = async (newAnime) => {
    setIsAdding(true)

    try {
      const animeToSave = { ...newAnime }

      if (newAnime.image) {
        const { url, path } = await uploadPoster(newAnime.image)

        animeToSave.image_url = url
        animeToSave.image_path = path
      }

      delete animeToSave.image

      const { error } = await addAnime(animeToSave)

      if (error) throw error

      setTotalAnime(prev => prev + 1)
      setPage(1)
      await fetchAnime()

    } catch (error) {
      console.error(error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteAnime = async (anime) => {
    setDeletingId(anime.id)

    try {
      const { error } = await deleteAnime(anime)

      if (error) throw error

      setTotalAnime(prev => prev - 1)

      const data = await fetchAnime()

      if (data.length === 0 && page > 1) {
        setPage(prev => prev - 1)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [
    page,
    filters.type,
    filters.genre,
    filters.status,
    filters.search,
    filters.sort,
  ])

  return {
    anime,
    loading,
    error,
    isAdding,
    deletingId,
    totalAnime,
    handleAddAnime,
    handleDeleteAnime,
    page,
    setPage,
    totalPages,
  }
}

export default useAnime