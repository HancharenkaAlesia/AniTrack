import './Sort.scss'

const Sort = ({value, onChange}) => {
  const sortOptions = [
    { value: 'newest', label: '↓ Newest' },
    { value: 'oldest', label: '↑ Oldest' },
    { value: 'rating-desc', label: '★ Rating ↓' },
    { value: 'rating-asc', label: '☆ Rating ↑' },
    { value: 'title-asc', label: 'A→Z' },
    { value: 'title-desc', label: 'Z→A' },
  ]

  return (
    <select
      className="sort"
      value={value}
      onChange={(e) => onChange('sort', e.target.value)}
      name="sort"
    >
      <option value="">Sort</option>
      {sortOptions.map(({value, label}) => (
        <option
          key={value}
          value={value}
        >{label}</option>
      ))}
    </select>
  )
}

export default Sort