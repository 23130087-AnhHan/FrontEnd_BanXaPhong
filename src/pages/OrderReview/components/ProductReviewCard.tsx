import { useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import type { Order } from '../../MyOrders/components/OrderCard'
import ReviewImages from './ReviewImages'
import './ProductReviewCard.css'

interface ProductReviewCardProps {
  product: Order['products'][number]
  productIndex: number
}

const ratingLabels = [
  'Chưa chọn đánh giá',
  'Rất không hài lòng',
  'Không hài lòng',
  'Bình thường',
  'Hài lòng',
  'Rất hài lòng',
]

const defaultProductImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

export default function ProductReviewCard({ product, productIndex }: ProductReviewCardProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const titleId = 'review-product-title-' + productIndex
  const commentId = 'review-comment-' + productIndex

  return (
    <article className="order-review-panel review-product-card" aria-labelledby={titleId}>
      <div className="review-product-heading">
        <img src={product.image || defaultProductImage} alt="" width={72} height={72} />
        <div>
          <h2 id={titleId}>{product.name}</h2>
          <p>{product.weight ? 'Phân loại: ' + product.weight + ' - ' : ''}Số lượng: {product.quantity}</p>
          <strong>{product.price}</strong>
        </div>
      </div>

      <fieldset className="review-product-rating">
        <legend>Chất lượng sản phẩm <span aria-hidden="true">*</span></legend>
        <div className="review-product-rating-row">
          <div className="review-product-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className={'review-star-option' + (star <= rating ? ' active' : '')} title={star + ' sao'}>
                <input type="radio" name={'productRating-' + productIndex} value={star} aria-label={star + ' sao'} checked={rating === star} onChange={() => setRating(star)} required />
                <Icon icon={faStar} />
              </label>
            ))}
          </div>
          <span className={rating > 0 ? 'review-rating-label selected' : 'review-rating-label'}>{ratingLabels[rating]}</span>
        </div>
      </fieldset>

      <div className="review-product-comment">
        <label htmlFor={commentId}>Nhận xét của bạn</label>
        <textarea id={commentId} name={'productComment-' + productIndex} rows={4} maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Bạn cảm thấy sản phẩm thế nào? Hãy chia sẻ về mùi hương, độ tạo bọt hoặc cảm giác sau khi dùng." aria-describedby={commentId + '-hint'} />
        <div className="review-comment-hint" id={commentId + '-hint'}>
          <span>Chia sẻ cảm nhận thực tế sau khi sử dụng.</span>
          <span>{comment.length}/500</span>
        </div>
      </div>
      <ReviewImages productIndex={productIndex} />
    </article>
  )
}
