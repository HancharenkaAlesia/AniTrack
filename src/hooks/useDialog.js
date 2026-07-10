import { useEffect, useRef } from 'react'

const useDialog = () => {
  const dialogRef = useRef(null)

  const lockScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const unlockScroll = () => {
    document.body.style.overflow = ''
  }

  const openModal = () => {
    if (!dialogRef.current) return

    dialogRef.current?.showModal()
    dialogRef.current?.classList.add('is-open')

    lockScroll()
  }

  const closeModal = () => {
    if (!dialogRef.current) return

    dialogRef.current?.classList.remove('is-open')

    setTimeout(() => {
      dialogRef.current?.close()
    }, 150)

    unlockScroll()
  }

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      closeModal()
    }
  }

  useEffect(() => {
    return () => {
      unlockScroll()
    }
  }, [])

  return {
    dialogRef,
    openModal,
    closeModal,
    handleBackdropClick,
  }

}

export default useDialog