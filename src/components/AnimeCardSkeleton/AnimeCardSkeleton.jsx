import './AnimeCardSkeleton.scss'

const AnimeCardSkeleton = () => {
  return (
    <li className="anime-card-skeleton">
      <div className="anime-card-skeleton__title"></div>
      <div className="anime-card-skeleton__line"></div>
      <div className="anime-card-skeleton__line"></div>
      <div className="anime-card-skeleton__line short"></div>
    </li>
  )
}

export default AnimeCardSkeleton