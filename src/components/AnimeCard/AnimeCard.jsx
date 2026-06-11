import './AnimeCard.scss'
import { FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import Rating from '../Rating/Rating.jsx'

const AnimeCard = (props) => {
  const {
    title,
    type,
    genre,
    status,
    rating,
    id,
    mode,
    onDelete
  } = props

  return (
    <li className={`anime-card anime-card--${mode}`}>
      <Link to={`/anime/${id}`} className="anime-card__content">
        <h2>{title}</h2>
        <div className="anime-card__wrapper">
          <p className='anime-card__genre'>{genre} • {type}</p>
          <p className='anime-card__status'>Status:<span> {status}</span></p>
          <Rating value={rating} />
        </div>
      </Link>
      <div className="anime-card__actions">
        <button
          className='anime-card__delete'
          aria-label={`Delete ${title}`}
          title={`Delete ${title}`}
          onClick={() => onDelete(id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </li>
  )
}

export default AnimeCard