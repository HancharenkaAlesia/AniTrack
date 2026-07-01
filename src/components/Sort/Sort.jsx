const Sort = ({value, onChange}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'rating-desc', label: 'Highest rating' },
    { value: 'rating-asc', label: 'Lowest rating' },
    { value: 'title-asc', label: 'Title A–Z' },
    { value: 'title-desc', label: 'Title Z–A' },
  ]

  return (
    <select
      value={value}
      onChange={(e) => onChange('sort', e.target.value)}
      name="sort"
    >
      <option value="">Select option</option>
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