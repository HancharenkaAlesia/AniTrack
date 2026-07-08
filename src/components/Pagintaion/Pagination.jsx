import './Pagintaion.scss'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Pagintaion = ({page, totalPages, setPage}) => {
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="button button--with-icon"
      >
        <FiChevronLeft />
      </button>

      {pages.map(item => (
        <button
          key={item}
          className={`button button--with-icon ${page === item ? 'is-active' : ''}`}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="button button--with-icon"
      >
        <FiChevronRight />
      </button>

    </div>
  )
}

export default Pagintaion