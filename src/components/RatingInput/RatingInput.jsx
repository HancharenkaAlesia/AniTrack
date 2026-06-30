import './RatingInput.scss'
import { GiFlowers } from 'react-icons/gi'
import { useState } from 'react'

const RatingInput = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map(i => {
        const active = hoverValue ? i <= hoverValue : i <= value

        return (
          <button
            key={i}
            type="button"
            className={`button button--with-icon rating-input__emoji ${
              active ? 'rating-input__emoji--active' : ''
            }`}
            onClick={() => onChange(i)}
            onMouseEnter={() => setHoverValue(i)}
            onMouseLeave={() => setHoverValue(value)}
          >
            🌸
          </button>
        )
      })}
    </div>
  )
}

export default RatingInput