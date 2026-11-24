import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ReviewImages.css'

interface ReviewImage {
  name: string
  url: string
}

interface ReviewImagesProps {
  productIndex: number
}

export default function ReviewImages({ productIndex }: ReviewImagesProps) {
  const [images, setImages] = useState<ReviewImage[]>([])
  const [error, setError] = useState('')
  const imageUrls = useRef<string[]>([])
  const hintId = 'review-images-hint-' + productIndex

  useEffect(() => {
    return () => {
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function handleChooseImages(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (selectedFiles.length === 0) return

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

    setImages((currentImages) => [...currentImages, ...newImages])
    setError('')
  }

  function handleRemoveImage(imageUrl: string) {
    URL.revokeObjectURL(imageUrl)
    imageUrls.current = imageUrls.current.filter((url) => url !== imageUrl)
    setImages((currentImages) => currentImages.filter((image) => image.url !== imageUrl))
    setError('')
  }

  return (
    <div className="review-images">
      <div className="review-images-heading">
        <span>Hình ảnh sản phẩm</span>
        <span>{images.length}/5 ảnh</span>
      </div>

      <div className="review-images-list">
        {images.map((image) => (
          <div className="review-image-preview" key={image.url}>
            <img src={image.url} alt={'Ảnh đánh giá: ' + image.name} />
            <button type="button" onClick={() => handleRemoveImage(image.url)} aria-label={'Xoá ảnh ' + image.name}><Icon icon={faXmark} /></button>
          </div>
        ))}

        {images.length < 5 && (
          <label className="review-image-upload">
            <Icon icon={faCamera} />
            <span>Thêm ảnh</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleChooseImages} aria-label="Thêm ảnh đánh giá sản phẩm" aria-describedby={hintId} />
          </label>
        )}
      </div>

      <p className="review-images-hint" id={hintId}>Tối đa 5 ảnh JPG, PNG hoặc WEBP, mỗi ảnh không quá 5 MB.</p>
      {error && <p className="review-images-error" role="alert">{error}</p>}
    </div>
  )
}
