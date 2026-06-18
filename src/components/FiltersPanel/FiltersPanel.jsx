import { options } from '../../data/options.js'

const FiltersPanel = ({filters, setSearchParams, filtersReset}) => {

  const handleFilterChange = (e) => {
    const nextFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    }

    Object.keys(nextFilters).forEach(key => {
      if (!nextFilters[key]) {
        delete nextFilters[key]
      }
    })

    setSearchParams(nextFilters)
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