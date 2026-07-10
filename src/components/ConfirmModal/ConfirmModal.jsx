import './ConfirmModal.scss'
import { FiLoader, FiX } from 'react-icons/fi'
import useDialog from '../../hooks/useDialog'

const ConfirmModal = ({
  className = '',
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  trigger,
}) => {
  const {
    dialogRef,
    openModal,
    closeModal,
    handleBackdropClick,
  } = useDialog()

  const handleConfirm = async () => {
    try {
      await onConfirm()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={className}
      >
        {trigger}
      </button>

      <dialog
        ref={dialogRef}
        className="confirm-dialog"
        onClick={handleBackdropClick}
      >
        <button
          type="button"
          className="confirm-dialog__close button button--with-icon"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        <h2 className="confirm-dialog__title">
          {title}
        </h2>

        <p className="confirm-dialog__message">
          {message}
        </p>

        <div className="confirm-dialog__actions">
          <button
            type="button"
            className="button"
            onClick={closeModal}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="button button--danger"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading
              ? <FiLoader className="spin" />
              : confirmText}
          </button>
        </div>
      </dialog>
    </>
  )
}

export default ConfirmModal