const messages = {
  error: (error) => `Error: ${error}`,
  empty: "Your list is empty 🌸",
  "no-results": "No results found 🔍",
}

const EmptyState = ({ type, error }) => {
  if (!type) return null

  return (
    <div className={`empty-state empty-state--${type}`}>
      <h2>
        {typeof messages[type] === "function"
          ? messages[type](error)
          : messages[type]
        }
      </h2>
    </div>
  )
}
export default EmptyState