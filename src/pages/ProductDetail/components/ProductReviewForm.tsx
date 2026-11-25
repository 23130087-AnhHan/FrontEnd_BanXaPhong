import { useState, type FormEvent } from 'react'
import { faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import ReviewImages from '../../OrderReview/components/ReviewImages'
import './ProductReviewForm.css'

interface ProductReviewFormProps {
  productId: string
  onCancel: () => void
}

const ratingLabels = [
  'Chưa chọn đánh giá',
  'Rất không hài lòng',
  'Không hài lòng',
  'Bình thường',
  'Hài lòng',
  'Rất hài lòng',
]

export default function ProductReviewForm({ productId, onCancel }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const formId = 'product-review-form-' + productId

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form id={formId} className="product-review-form" onSubmit={handleSubmit} aria-labelledby={formId + '-title'}>
      <div className="product-review-form-heading">
        <h3 id={formId + '-title'}>Viết đánh giá của bạn</h3>
        <p>Chia sẻ cảm nhận sau khi nhận và sử dụng sản phẩm.</p>
      </div>
      <input type="hidden" name="productId" value={productId} />

      <fieldset className="product-review-form-rating">
        <legend>Chất lượng sản phẩm <span aria-hidden="true">*</span></legend>
        <div className="product-review-form-rating-row">
          <div className="product-review-form-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className={'product-review-form-star' + (star <= rating ? ' active' : '')} title={star + ' sao'}>
                <input type="radio" name="rating" value={star} aria-label={star + ' sao'} checked={rating === star} onChange={() => setRating(star)} required />
                <Icon icon={faStar} />
              </label>
            ))}
          </div>
          <span className={rating > 0 ? 'product-review-form-rating-label selected' : 'product-review-form-rating-label'}>{ratingLabels[rating]}</span>
        </div>
      </fieldset>

      <div className="product-review-form-comment">
        <label htmlFor={formId + '-comment'}>Nhận xét của bạn</label>
        <textarea id={formId + '-comment'} name="comment" rows={4} maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Bạn cảm thấy sản phẩm thế nào? Hãy chia sẻ về mùi hương, độ tạo bọt hoặc cảm giác sau khi dùng." aria-describedby={formId + '-comment-hint'} />
        <div className="product-review-form-hint" id={formId + '-comment-hint'}>
          <span>Chia sẻ trải nghiệm thực tế của bạn với sản phẩm.</span>
          <span>{comment.length}/500</span>
        </div>
      </div>

      <ReviewImages productIndex={0} onUploadingChange={setIsUploadingImages} />

      <div className="product-review-form-actions">
        <button type="button" onClick={onCancel}>Huỷ</button>
        <button type="submit" className="product-review-form-submit" disabled={isUploadingImages}>{isUploadingImages ? 'Đang tải ảnh...' : 'Gửi đánh giá'}<Icon icon={faPaperPlane} /></button>
      </div>
    </form>
  )
}
