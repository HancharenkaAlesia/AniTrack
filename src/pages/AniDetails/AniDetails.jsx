import './AniDetails.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiEdit, FiLoader } from 'react-icons/fi'
import Rating from '../../components/Rating/Rating.jsx'
import { useEffect, useState } from 'react'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'
import { updateAnime, getAnimeById } from '../../api/anime'
import { uploadPoster } from '../../api/storage.js'

const AniDetails = () => {
  const navigate = useNavigate()
  const [anime, setAnime] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchOne = async () => {
      const { data, error } = await getAnimeById(id)

      if (error) {
        console.error(error)
        return
      }

      setAnime(data)
    }

    fetchOne()
  }, [id])

  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!anime) {
    return  <div className="loading"><FiLoader className="spin" /></div>
  }

  const handleUpdateAnime = async (updateData) => {
    setIsUpdating(true)

    try {
      let imageUrl = anime.image_url

      if (updateData.image) {
        imageUrl = await uploadPoster(updateData.image)
      }

      const { image, ...rest } = updateData

      const { data, error } = await updateAnime(anime.id, {
        ...rest,
        image_url: imageUrl,
      })

      if (error) throw error

      setAnime(data[0])
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="anime-details">
      <header className="anime-details__header">
        <h1>{anime.title}</h1>
      </header>
      {isEditing ? (
        <AnimeForm
          initialData={anime}
          onSubmit={handleUpdateAnime}
          loading={isUpdating}
        />
      ) : (
        <>
          <div className="anime-details__info">
            <p>Type: {anime.type}</p>
            <p>Genre: {anime.genre}</p>
            <p>Status: {anime.status}</p>
            <Rating value={anime.rating} />
          </div>
          <p className='anime-details__note'>{anime.note}</p>
        </>
      )}
        <div className="anime-details__controls">
          <button
            onClick={() => navigate(-1)}
            className='anime-details__back button'>
            <FiChevronLeft />
            <span>Back</span>
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(prev => !prev)}
            >
              <FiEdit />
              <span>Edit</span>
            </button>
          )}
        </div>
    </div>
  )
}

export default AniDetails

