import { options } from '../../data/options.js'

const FiltersPanel = ({filters, setFilters, filtersReset}) => {

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="filters-panel">
      <select
        value={filters.type}
        onChange={handleFilterChange}
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
        onChange={handleFilterChange}
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
        onChange={handleFilterChange}
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