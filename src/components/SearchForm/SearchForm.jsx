import './SearchForm.scss'
import { FiSearch } from 'react-icons/fi'

const SearchForm = ({onChange, value}) => {
  return (
    <div
      className="search-form"
    >
      <FiSearch />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="search"
        name="search" />
    </div>
  )
}

export default SearchForm