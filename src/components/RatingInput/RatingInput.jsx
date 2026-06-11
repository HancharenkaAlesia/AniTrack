import './RatingInput.scss'

const RatingInput = ({ value, onChange }) => {
  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className='button button--with-icon'
        >
          {i <= value ? '🌸' : '🤍'}
        </button>
      ))}
    </div>
  )
}

export default RatingInput