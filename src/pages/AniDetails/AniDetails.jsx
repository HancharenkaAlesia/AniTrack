import './AniDetails.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiLoader, FiTrash2 } from 'react-icons/fi'
import Rating from '../../components/Rating/Rating.jsx'
import { useEffect, useState } from 'react'
import { updateAnime, getAnimeById, deleteAnime } from '../../api/anime'
import AddAnimeModal from '../../components/AddAnimeModal/AddAnimeModal.jsx'
import Badge from '../../components/Badge/Badge.jsx'
import { STATUS_VARIANTS } from '../../constants/badgeVariants.js'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx'

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

  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!anime) {
    return  <div className="loading"><FiLoader className="spin" /></div>
  }

  const handleUpdateAnime = async (updateData) => {
    setIsUpdating(true)

    try {
      const { data, error } = await updateAnime(
        anime.id,
        updateData,
        anime.image_path
      )

      if (error) throw error

      setAnime(data[0])

    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const { error } = await deleteAnime(anime)

      if (error) throw error

      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const statusVariant = STATUS_VARIANTS[anime.status] ?? 'default'

  return (
    <div className="anime-details">
      <header className="anime-details__header">
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          className='anime-details__back button button--with-icon'>
          <FiChevronLeft />
        </button>
        <ConfirmModal
          className="button button--with-icon"
          title="Delete anime?"
          message={`"${anime.title}" will be permanently deleted.`}
          confirmText="Delete"
          loading={isDeleting}
          onConfirm={handleDelete}
          trigger={<FiTrash2 />}
        />
      </header>

      <div className="anime-details__wrapper">
        <div className="anime-details__poster">
          <img
            src={anime.image_url || '/src/assets/images/poster.jpg'}
            alt={anime.title} />
        </div>
        <div className="anime-details__content">
          <h1 className="anime-details__title">{anime.title}</h1>
          <div className="anime-details__rating">
            <Rating value={anime.rating} />
          </div>
          <div className="anime-details__badges">
            <Badge variant="genre">{anime.genre}</Badge>
            <Badge variant="type">{anime.type}</Badge>
            <Badge variant={statusVariant}>{anime.status}</Badge>
          </div>
          <p className="anime-details__note">
            {anime.note}
          </p>

          <AddAnimeModal
            initialData={anime}
            onSubmit={handleUpdateAnime}
            loading={isUpdating}
          />
        </div>
      </div>
    </div>
  )
}

export default AniDetails

