import './AniDetails.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiEdit } from "react-icons/fi"
import Rating from '../../components/Rating/Rating.jsx'
import { useState } from 'react'
import AnimeForm from '../../components/AnimeForm/AnimeForm.jsx'

const AniDetails = ({animeData, updateAnime}) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const anime = animeData.find((anime) => String(anime.id) === id)
  const [isEditing, setIsEditing] = useState(false)

  if (!anime) {
    return <h2>Anime not found</h2>
  }

  const handleUpdateAnime = (updateData) => {
    updateAnime(anime.id, updateData)
    setIsEditing(false)
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

