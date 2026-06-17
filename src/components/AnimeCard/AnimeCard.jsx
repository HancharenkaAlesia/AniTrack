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
    searchQuery,
    onDelete
  } = props

  const highlightText = (text, query) => {
    const queryFormatted = query.trim()

    if (!queryFormatted) return text

    const escapedQuery = queryFormatted.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )

    const pattern = new RegExp(`(${escapedQuery})`, 'ig')
    const splitText = text.split(pattern)

    return splitText.map((item, index) => {
      if (item.toLowerCase() === queryFormatted.toLowerCase()) {
        return <mark key={index}>{item}</mark>
      } else {
        return item
      }
    })

  }

  return (
    <li className={`anime-card anime-card--${mode}`}>
      <Link to={`/anime/${id}`} className="anime-card__content">
        <h2>{highlightText(title, searchQuery)}</h2>
        <div className="anime-card__wrapper">
          <p className='anime-card__genre'>{genre} • {type}</p>
          <p className='anime-card__status'>Status:<span> {status}</span></p>
          <Rating value={rating} />
        </div>
      </Link>
      <div className="anime-card__actions">
        <button
          className='anime-card__delete button button--with-icon'
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