import './AnimeCard.scss'
import { FiTrash2, FiLoader } from "react-icons/fi"
import { Link } from "react-router-dom"
import { STATUS_VARIANTS } from '../../constants/badgeVariants'
import Badge from '../Badge/Badge.jsx'
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx'

const AnimeCard = (props) => {
  const {
    title,
    type,
    genre,
    status,
    rating,
    id,
    mode,
    image_url,
    searchQuery,
    onDelete,
    isDeleting
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

  const statusVariant = STATUS_VARIANTS[status] ?? 'default'

  return (
    <li className={`anime-card anime-card--${mode}`}>
      <div className="anime-card__poster">
        <img
          src={image_url || '/src/assets/images/poster.jpg'}
          alt={title}
        />
        <div className="anime-card__overlay"></div>
      </div>
      <Link to={`/anime/${id}`} className="anime-card__content">
        <div className="anime-card__header">
          <h2 className="anime-card__name">{highlightText(title, searchQuery)}</h2>
          <div className="anime-card__rating">🌸 {rating}</div>
        </div>
        <div className='anime-card__badges'>
          <Badge variant="genre">{genre}</Badge>
          <Badge variant="type">{type}</Badge>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
      </Link>
      <div className="anime-card__actions">
        <ConfirmModal
          className="anime-card__delete"
          title={`Delete "${title}"?`}
          message="This action cannot be undone."
          confirmText="Delete"
          loading={isDeleting}
          onConfirm={() => onDelete(props)}
          trigger={<FiTrash2 />}
        />
      </div>
    </li>
  )
}

export default AnimeCard