import './FiltersPanel.scss'
import { options } from '../../data/options.js'
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi'
import { useState, useRef, useEffect  } from 'react'

const FiltersPanel = ({filters, onFilterChange, filtersReset}) => {

  const [isOpen, setIsOpen] = useState(false)

  const filtersRef = useRef(null)

  const handleReset = () => {
    filtersReset()
    setIsOpen(false)
  }

  const toggleFilters = () => {
    setIsOpen(prev => !prev)
  }

  const activeFilters = [
    filters.type,
    filters.genre,
    filters.status,
  ].filter(Boolean).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className="filters"
      ref={filtersRef}
    >
      <button
        type="button"
        className="filters__toggle"
        onClick={toggleFilters}
      >
        <FiFilter />
        <span>Filters</span>
        {activeFilters > 0 && ` (${activeFilters})`}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="filters__panel">
          <select
            value={filters.type}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
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
            value={filters.genre}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
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
            value={filters.status}
            onChange={(e) => onFilterChange(e.target.name, e.target.value)}
            name="status"
          >
            <option value="">Select status</option>
            {options.statuses.map((status) => (
              <option
                key={status}
                value={status}
              >{status}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>
      )}
    </div>
  )
}

export default FiltersPanel