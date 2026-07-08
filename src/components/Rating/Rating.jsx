import './Rating.scss'

const Rating = ({value}) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>
          {i <= value ? '🌸' : '🤍'}
        </span>
      ))}
    </div>
  )
}

export default Rating