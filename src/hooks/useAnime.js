import { useEffect, useState } from 'react'
import { getAnime, addAnime, deleteAnime } from '../api/anime.js'

const useAnime = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleAddAnime = async (newAnime) => {
    setIsAdding(true)
    try {
      const { data, error } = await addAnime(newAnime)
      if (error) throw error
      setAnime(prev => [data[0], ...prev])

    } catch (error) {
      console.error(error)

    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteAnime = async (id) => {
    setDeletingId(id)
    try {
      const { error } = await deleteAnime(id)

      if (error) throw error

      setAnime(prev => prev.filter(item => item.id !== id))
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

  return {
    anime,
    loading,
    error,
    isAdding,
    deletingId,
    handleAddAnime,
    handleDeleteAnime,
  }
}

export default useAnime