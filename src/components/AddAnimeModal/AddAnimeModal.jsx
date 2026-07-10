import './AddAnimeModal.scss'
import AnimeForm from '../AnimeForm/AnimeForm.jsx'
import { FiEdit, FiX, FiPlus } from 'react-icons/fi'
import useDialog from '../../hooks/useDialog.js'

const AddAnimeModal = ({onSubmit, loading, initialData}) => {
  const {
    dialogRef,
    openModal,
    closeModal,
    handleBackdropClick,
  } = useDialog()

  const handleSubmit = async (formData) => {
    try {
      await onSubmit(formData)
      closeModal()
    } catch(error) {
      console.log(error)
    }
  }

  const isEditing = Boolean(initialData)

  const buttonContent = isEditing
    ? (
      <>
        <FiEdit />
        <span>Edit</span>
      </>
    )
    : (
      <>
        <FiPlus />
        <span>Add anime</span>
      </>
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