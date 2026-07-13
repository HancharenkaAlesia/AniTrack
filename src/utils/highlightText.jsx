const highlightText = (text, query) => {
  const queryFormatted = query.trim()

  if (!queryFormatted) return text

  const escapedQuery = queryFormatted.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  const pattern = new RegExp(`(${escapedQuery})`, 'ig')
  const splitText = text.split(pattern)

  return splitText.map((item, index) => {
    if (item.toLowerCase() === queryFormatted.toLowerCase()) {
      return <mark key={index}>{item}</mark>
    } else {
      return item
    }
  })
}

export default highlightText