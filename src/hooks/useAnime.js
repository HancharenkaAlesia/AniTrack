import { useEffect, useState } from 'react'
import { getAnime, addAnime, deleteAnime } from '../api/anime.js'
import { uploadPoster } from '../api/storage'

const PAGE_SIZE = 6

const useAnime = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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

      const { data, error } = await addAnime(animeToSave)

      if (error) throw error

      setAnime(prev => [data[0], ...prev])
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteAnime = async (anime) => {
    setDeletingId(anime.id)

    try {
      const { error } = await deleteAnime(anime)

      if (error) throw error

      setAnime(prev => prev.filter(item => item.id !== anime.id))

    } catch (error) {
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data, error, count } = await getAnime(page, PAGE_SIZE)

        if (error) {
          throw error
        }

        setAnime(data)
        setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)))

      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [page])

  return {
    anime,
    loading,
    error,
    isAdding,
    deletingId,
    handleAddAnime,
    handleDeleteAnime,
    page,
    setPage,
    totalPages,
  }
}

export default useAnime