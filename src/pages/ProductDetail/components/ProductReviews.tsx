import { useState } from 'react'
import { faImage, faStar } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ProductReviews.css'

interface ProductReview {
  id: number
  name: string
  initials: string
  rating: number
  date: string
  weight: string
  comment: string
  images?: string[]
}

const reviews: ProductReview[] = [
  {
    id: 1,
    name: 'Nguyễn Thùy Trang',
    initials: 'NT',
    rating: 5,
    date: '2 ngày trước',
    weight: '100g',
    comment: 'Mùi hương oải hương rất thơm và thư giãn, không bị nồng gắt. Bọt mịn, tắm xong da mềm và không bị khô căng. Rất đáng thử!',
  },
  {
    id: 2,
    name: 'Hoàng Minh Quân',
    initials: 'MQ',
    rating: 5,
    date: '1 tuần trước',
    weight: '200g',
    comment: 'Gói hàng cẩn thận, mở hộp ra là thơm lừng. Bánh xà phòng dùng khá lâu, mùi hương nhẹ nhàng dễ chịu.',
  },
  {
    id: 3,
    name: 'Lê Phương Mai',
    initials: 'PM',
    rating: 5,
    date: '2 tuần trước',
    weight: '100g',
    comment: 'Thành phần tự nhiên nên mình rất yên tâm sử dụng. Cảm giác da sạch dịu nhẹ mà vẫn giữ được độ ẩm sau khi tắm.',
  },
]

export default function ProductReviews() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === 'five-stars') return review.rating === 5
    if (selectedFilter === 'with-images') return (review.images?.length ?? 0) > 0
    return true
  })

  return (
    <section id="product-reviews" className="product-detail-panel product-reviews" aria-labelledby="product-reviews-title">
      <h2 id="product-reviews-title">Đánh giá sản phẩm</h2>
      <div className="product-reviews-summary">
        <span className="product-review-stars" aria-label="5 trên 5 sao">
          {[1, 2, 3, 4, 5].map((star) => <Icon key={star} icon={faStar} />)}
        </span>
        <strong>5.0 / 5.0</strong>
        <span>·</span>
        <span>128 đánh giá</span>
      </div>

      <div className="product-reviews-filters" role="group" aria-label="Lọc đánh giá">
        <span>Lọc theo:</span>
        <button type="button" aria-pressed={selectedFilter === 'all'} onClick={() => setSelectedFilter('all')}>Tất cả (128)</button>
        <button type="button" aria-pressed={selectedFilter === 'five-stars'} onClick={() => setSelectedFilter('five-stars')}>5 sao (112)</button>
        <button type="button" aria-pressed={selectedFilter === 'with-images'} onClick={() => setSelectedFilter('with-images')}>
          <Icon icon={faImage} /> Có hình ảnh (28)
        </button>
      </div>

      <div className="product-reviews-list">
        {filteredReviews.length === 0 && <p className="product-reviews-empty">Chưa có đánh giá kèm hình ảnh.</p>}
        {filteredReviews.map((review) => (
          <article key={review.id} className="product-review-card">
            <div className="product-review-header">
              <div className="product-review-author">
                <span className="product-review-avatar" aria-hidden="true">{review.initials}</span>
                <div>
                  <h3>{review.name}</h3>
                  <span className="product-review-stars" aria-label={review.rating + ' trên 5 sao'}>
                    {[1, 2, 3, 4, 5].map((star) => <Icon key={star} icon={faStar} />)}
                  </span>
                </div>
              </div>
              <span className="product-review-date">{review.date} - Phân loại: {review.weight}</span>
            </div>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
