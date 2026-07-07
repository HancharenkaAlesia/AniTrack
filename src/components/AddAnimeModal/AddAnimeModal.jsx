import './AddAnimeModal.scss'
import AnimeForm from '../AnimeForm/AnimeForm.jsx'
import { useEffect, useRef } from 'react'
import { FiEdit, FiX } from 'react-icons/fi'

const AddAnimeModal = ({onSubmit, loading, initialData}) => {
  const dialogRef = useRef(null)

  const lockScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const unlockScroll = () => {
    document.body.style.overflow = ''
  }

  const openModal = () => {
    dialogRef.current.showModal()
    dialogRef.current.classList.add('is-open')

    lockScroll()
  }

  const closeModal = () => {
    dialogRef.current.classList.remove('is-open')

    setTimeout(() => {
      dialogRef.current.close()
    }, 150)

    unlockScroll()
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
      unlockScroll()
    }
  }, [])

  const isEditing = Boolean(initialData)

  const buttonContent = isEditing
    ? (
      <>
        <FiEdit />
        <span>Edit</span>
      </>
    )
    : (
      <span>Add anime</span>
    )

  return (
    <>
      <button
        onClick={openModal}
        type="button"
      >
        {buttonContent}
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
          initialData={initialData}
        />
      </dialog>
    </>
  )
}

export default AddAnimeModal