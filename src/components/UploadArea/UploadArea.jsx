import './UploadArea.scss'
import { useRef, useState, useEffect } from 'react'

const UploadArea = ({onFileChange, initialImage, onRemove}) => {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(initialImage || '')
  const [error, setError] = useState('')

  const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

  const isValidSize = (file) => {
    return file.size <= MAX_SIZE
  }

  const isImage = (file) => {
    return file.type.startsWith('image/')
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFile = (selectedFile) => {
    if (!selectedFile) return

    if (!isValidSize(selectedFile)) {
      setError('Maximum file size is 5 MB')
      return
    }

    if (!isImage(selectedFile)) {
      setError('Only image files are allowed')
      return
    }

    setError('')

    onFileChange(selectedFile)

    const previewUrl = URL.createObjectURL(selectedFile)
    setPreview(previewUrl)
  }

  const handleSelect = (e) => {
    handleFile(e.target.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]

    handleFile(droppedFile)
  }

  const handleRemove = (e) => {
    e.stopPropagation()

    setPreview('')
    setError('')
    onRemove()

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const uploadClass = isDragging
    ? 'upload-area__body upload-area--dragging'
    : 'upload-area__body'

  useEffect(() => {
    if (!preview.startsWith('blob:')) return

    return () => {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  useEffect(() => {
    setPreview(initialImage || '')
  }, [initialImage])

  return (
    <div
      className="upload-area"
    >
      <div
        className={uploadClass}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="upload-area__preview"
            />

            <button
              type="button"
              className="upload-area__remove button button--with-icon"
              onClick={handleRemove}
            >
              ×
            </button>
          </>
        ) : (
          'Click or drop image'
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleSelect}
      />
      {error && (
        <span className="upload-area__error">
        {error}
      </span>
      )}
    </div>
  )
}

export default UploadArea