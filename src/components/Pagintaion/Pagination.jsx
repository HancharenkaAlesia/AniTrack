import './Pagintaion.scss'

const Pagintaion = ({page, totalPages, setPage}) => {
  return (
    <>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </>
  )
}

export default Pagintaion