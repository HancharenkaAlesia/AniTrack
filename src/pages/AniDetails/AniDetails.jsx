import './AniDetails.scss'
import { Link, useParams } from 'react-router-dom'
import { FiChevronLeft } from "react-icons/fi"
import Rating from '../../components/Rating/Rating.jsx'

const AniDetails = ({animeData}) => {
  const { id } = useParams()
  const anime = animeData.find((anime) => String(anime.id) === id)

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
        <Rating value={anime.rating} />
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

export default AniDetails

