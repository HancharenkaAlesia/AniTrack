import './AnimeDetails.scss'
import { Link, useParams } from 'react-router-dom'
import animeList from '../../data/animeList.js'
import { FiChevronLeft } from "react-icons/fi"

const AnimeDetails = () => {
  const { id } = useParams()
  const anime = animeList.find((anime) => anime.id === Number(id))

  if (!anime) {
    return <h2>Anime not found</h2>
  }

  return (
    <div className="anime-details">
      <header className="anime-details__header">
        <h1>{anime.title}</h1>
      </header>
      <div className="anime-details__info">
        <p>Type: {anime.type}</p>
        <p>Genre: {anime.genre}</p>
        <p>Status: {anime.status}</p>
        <p>Rating: {anime.rating}</p>
      </div>
      <p className='anime-details__note'>{anime.note}</p>
      <div className="anime-details__controls">
        <Link to={`/`} className='anime-details__back button'>
          <FiChevronLeft />
          <span>Back</span>
        </Link>
      </div>
    </div>
  )
}

export default AnimeDetails

