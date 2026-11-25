import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons'
import { uploadReviewImage } from '../../../api/cloudinaryApi'
import Icon from '../../../components/Icon'
import './ReviewImages.css'

interface ReviewImage {
  name: string
  url: string
}

interface ReviewImagesProps {
  productIndex: number
  inputName?: string
  onUploadingChange?: (isUploading: boolean) => void
}

export default function ReviewImages({ productIndex, inputName = 'images', onUploadingChange }: ReviewImagesProps) {
  const [images, setImages] = useState<ReviewImage[]>([])
  const [pendingImages, setPendingImages] = useState<ReviewImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const imageUrls = useRef<string[]>([])
  const uploadController = useRef<AbortController | null>(null)
  const hintId = 'review-images-hint-' + productIndex

  useEffect(() => {
    return () => {
      uploadController.current?.abort()
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  async function handleChooseImages(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (selectedFiles.length === 0 || uploadController.current) return

    if (images.length + selectedFiles.length > 5) {
      setError('Bạn chỉ có thể thêm tối đa 5 ảnh cho mỗi sản phẩm.')
      return
    }

    if (selectedFiles.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type))) {
      setError('Vui lòng chọn ảnh JPG, PNG hoặc WEBP.')
      return
    }

    if (selectedFiles.some((file) => file.size > 5 * 1024 * 1024)) {
      setError('Mỗi ảnh cần có dung lượng không quá 5 MB.')
      return
    }

    const newImages = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file)
      imageUrls.current.push(url)
      return { name: file.name, url }
    })

    const controller = new AbortController()
    uploadController.current = controller
    setPendingImages(newImages)
    setIsUploading(true)
    setError('')
    onUploadingChange?.(true)

    try {
      const results = await Promise.allSettled(selectedFiles.map((file) => uploadReviewImage(file, controller.signal)))
      if (controller.signal.aborted) return

      const uploadedImages: ReviewImage[] = []
      const failedNames: string[] = []
      let uploadError = ''

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          uploadedImages.push({ name: selectedFiles[index].name, url: result.value })
        } else {
          failedNames.push(selectedFiles[index].name)
          if (!uploadError) uploadError = result.reason instanceof Error ? result.reason.message : 'Vui lòng thử lại.'
        }
      })

      setImages((currentImages) => currentImages.concat(uploadedImages))
      if (failedNames.length > 0) setError('Không tải được ' + failedNames.join(', ') + '. ' + uploadError + ' Vui lòng chọn lại ảnh lỗi.')
    } finally {
      newImages.forEach((image) => URL.revokeObjectURL(image.url))
      imageUrls.current = imageUrls.current.filter((url) => !newImages.some((image) => image.url === url))
      uploadController.current = null
      if (!controller.signal.aborted) {
        setPendingImages([])
        setIsUploading(false)
        onUploadingChange?.(false)
      }
    }
  }

  function handleRemoveImage(imageUrl: string) {
    setImages((currentImages) => currentImages.filter((image) => image.url !== imageUrl))
  }

  return (
    <div className="review-images">
      <div className="review-images-heading">
        <span>Hình ảnh sản phẩm</span>
        <span>{images.length + pendingImages.length}/5 ảnh</span>
      </div>

      <div className="review-images-list" aria-busy={isUploading}>
        {images.map((image) => (
          <div className="review-image-preview" key={image.url}>
            <img src={image.url} alt={'Ảnh đánh giá: ' + image.name} />
            <input type="hidden" name={inputName} value={image.url} />
            <button type="button" onClick={() => handleRemoveImage(image.url)} aria-label={'Xoá ảnh ' + image.name}><Icon icon={faXmark} /></button>
          </div>
        ))}

        {pendingImages.map((image) => (
          <div className="review-image-preview review-image-pending" key={image.url}>
            <img src={image.url} alt={'Đang tải ảnh: ' + image.name} />
            <span>Đang tải...</span>
          </div>
        ))}

        {images.length + pendingImages.length < 5 && (
          <label className="review-image-upload">
            <Icon icon={faCamera} />
            <span>{isUploading ? 'Đang tải...' : 'Thêm ảnh'}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={isUploading} onChange={handleChooseImages} aria-label="Thêm ảnh đánh giá sản phẩm" aria-describedby={hintId} />
          </label>
        )}
      </div>

      <p className="review-images-hint" id={hintId}>Tối đa 5 ảnh JPG, PNG hoặc WEBP, mỗi ảnh không quá 5 MB.</p>
      {isUploading && <p className="review-images-status" role="status">Đang tải {pendingImages.length} ảnh, vui lòng chờ.</p>}
      {error && <p className="review-images-error" role="alert">{error}</p>}
    </div>
  )
}
