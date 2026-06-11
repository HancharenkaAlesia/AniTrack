import './AnimeForm.scss'
import RatingInput from '../RatingInput/RatingInput.jsx'
import { useState } from 'react'
import { options } from '../../data/options.js'

const AnimeForm = ({ onAddAnime }) => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const anime = {
      title,
      type,
      genre,
      status,
      rating,
      note
    }

    onAddAnime(anime)
    setTitle('')
    setType('')
    setGenre('')
    setStatus('')
    setRating(0)
    setNote('')
  }

  return (
    <>
      <h2>Add new Anime 🌸</h2>
      <form
        className="anime-form"
        onSubmit={handleSubmit}
      >
        <RatingInput
          value={rating}
          onChange={setRating}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Anime title"
          name="title"
        />
        <div className="anime-form__wrapper">
          <div className="anime-form__column">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
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
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
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
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              {options.statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >{status}</option>
              ))}
            </select>
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
        >
          Add anime
        </button>
      </form>
    </>
  )
}

export default AnimeForm