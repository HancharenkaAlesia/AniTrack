import './AnimeForm.scss'
import RatingInput from '../RatingInput/RatingInput.jsx'
import { useState } from 'react'
import { options } from '../../data/options.js'

const AnimeForm = ({ initialData, onSubmit, loading }) => {
  const [title, setTitle] = useState(
    initialData?.title || ''
  )
  const [type, setType] = useState(
    initialData?.type || ''
  )
  const [genre, setGenre] = useState(
    initialData?.genre || ''
  )
  const [status, setStatus] = useState(
    initialData?.status || ''
  )
  const [rating, setRating] = useState(
    initialData?.rating || 0
  )
  const [note, setNote] = useState(
    initialData?.note || ''
  )

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!type) {
      newErrors.type = 'Type is required'
    }
    if (!genre) {
      newErrors.genre = 'Genre is required'
    }
    if (!status) {
      newErrors.status = 'Status is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const anime = {
      title,
      type,
      genre,
      status,
      rating,
      note
    }
    setErrors({})

    onSubmit(anime)
    if (!initialData) {
      resetForm()
    }
  }

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const resetForm = () => {
    setTitle('')
    setType('')
    setGenre('')
    setStatus('')
    setRating(0)
    setNote('')
  }

  return (
    <>
      {!initialData && (
        <h2>Add new Anime 🌸</h2>
      )}

      <form
        className="anime-form"
        onSubmit={handleSubmit}
      >
        <RatingInput
          value={rating}
          onChange={setRating}
        />
        <div className="anime-form__item">
          <input
            className={errors.title ? 'is-error' : ''}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              clearError('title')
            }}
            placeholder="Anime title"
            name="title"
          />
          {errors.title && (
            <span className="anime-form__error error">{errors.title}</span>
          )}
        </div>
        <div className="anime-form__wrapper">
          <div className="anime-form__column">
            <div className="anime-form__item">
              <select
                className={errors.type ? 'is-error' : ''}
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                  clearError('type')
                }}
                name="type"
              >
                <option value="">Select type</option>
                {options.types.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >{type}</option>
                ))}
              </select>
              {errors.type && (
                <span className="anime-form__error error">{errors.type}</span>
              )}
            </div>
            <div className="anime-form__item">
              <select
                className={errors.genre ? 'is-error' : ''}
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value)
                  clearError('genre')
                }}
                name="genre"
              >
                <option value="">Select genre</option>
                {options.genres.map((genre) => (
                  <option
                    key={genre}
                    value={genre}
                  >{genre}</option>
                ))}
              </select>
              {errors.genre && (
                <span className="anime-form__error error">{errors.genre}</span>
              )}
            </div>
            <div className="anime-form__item">
              <select
                className={errors.status ? 'is-error' : ''}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  clearError('status')
                }}
              >
                <option value="">Select status</option>
                {options.statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >{status}</option>
                ))}
              </select>
              {errors.status && (
                <span className="anime-form__error error">{errors.status}</span>
              )}
            </div>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Your notes"
            name="notes"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? (
              'Loading...'
            )
            : initialData ? (
                'Save changes'
              )
              : (
                'Add anime'
              )}
        </button>
      </form>
    </>
  )
}

export default AnimeForm