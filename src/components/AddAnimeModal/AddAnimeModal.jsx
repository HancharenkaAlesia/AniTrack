import './AddAnimeModal.scss'
import AnimeForm from '../AnimeForm/AnimeForm.jsx'
import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'

const AddAnimeModal = ({onSubmit, loading}) => {
  const dialogRef = useRef(null)

  const openModal = () => {
    dialogRef.current.showModal()
    dialogRef.current.classList.add('is-open')

    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    dialogRef.current.classList.remove('is-open')

    setTimeout(() => {
      dialogRef.current.close()
    }, 150)

    document.body.style.overflow = ''
  }

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      closeModal()
    }
  }

  const handleSubmit = async (formData) => {
    try {
      await onSubmit(formData)
      closeModal()
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])


  return (
    <>
      <button
        onClick={openModal}
        type="button"
      >
        Add anime
      </button>
      <dialog
        ref={dialogRef}
        className="add-anime-dialog"
        onClick={handleBackdropClick}
      >
        <button
          type="button"
          onClick={closeModal}
          className="add-anime-dialog__close button button--with-icon"
          aria-label="Close modal"
        >
          <FiX />
        </button>
        <AnimeForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </dialog>
    </>
  )
}

export default AddAnimeModal