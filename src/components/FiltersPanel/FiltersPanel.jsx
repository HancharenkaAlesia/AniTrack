import './FiltersPanel.scss'
import { options } from '../../data/options.js'

const FiltersPanel = ({filters, onFilterChange, filtersReset}) => {

  return (
    <div className="filters-panel">
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
        onClick={filtersReset}
      >
        Reset
      </button>

    </div>
  )
}

export default FiltersPanel