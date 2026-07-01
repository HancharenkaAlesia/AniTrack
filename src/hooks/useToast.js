import { useCallback, useState } from 'react'

const useToast = () => {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })

    setTimeout(() => {
      setToast(null)
    }, 2500)
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return {
    toast,
    showToast,
    hideToast,
  }
}

export default useToast