import { useEffect, useRef, useState } from 'react'
import { faImage, faPenToSquare, faStar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { fetchProductReviews } from '../../../api/productApi'
import type { ReviewData } from '../../../api/productApi'
import Icon from '../../../components/Icon'
import ProductReviewForm from './ProductReviewForm'
import './ProductReviews.css'

interface Props {
  productId: string
  reviewCount: number
  rating: number
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('vi-VN')
}

export default function ProductReviews({ productId, reviewCount, rating }: Props) {
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const writeReviewButton = useRef<HTMLButtonElement>(null)

  function handleCloseReviewForm() {
    setIsReviewFormOpen(false)
    writeReviewButton.current?.focus()
  }

  useEffect(() => {
    if (!productId) return
    fetchProductReviews(productId).then(setReviews)
  }, [productId])

  useEffect(() => {
    if (!previewImage) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewImage])

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length
  const withImagesCount = reviews.filter((r) => r.images && r.images.length > 0).length

  const filtered = reviews.filter((r) => {
    if (selectedFilter === 'five-stars') return r.rating === 5
    if (selectedFilter === 'with-images') return r.images && r.images.length > 0
    return true
  })

  return (
    <section id="product-reviews" className="product-detail-panel product-reviews" aria-labelledby="product-reviews-title">
      <div className="product-reviews-heading">
        <h2 id="product-reviews-title">Đánh giá sản phẩm</h2>
        <button ref={writeReviewButton} type="button" className="product-reviews-write-button" onClick={() => setIsReviewFormOpen(!isReviewFormOpen)} aria-expanded={isReviewFormOpen} aria-controls={'product-review-form-' + productId}>
          <Icon icon={isReviewFormOpen ? faXmark : faPenToSquare} />{isReviewFormOpen ? 'Đóng form' : 'Viết đánh giá'}
        </button>
      </div>
      <div className="product-reviews-summary">
        <span className="product-review-stars" aria-label={`${rating.toFixed(1)} trên 5 sao`}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Icon key={s} icon={faStar} className={s <= Math.round(rating) ? 'active' : 'empty'} />
          ))}
        </span>
        <strong>{rating.toFixed(1)} / 5.0</strong>
        <span>·</span>
        <span>{reviewCount} đánh giá</span>
      </div>

      {isReviewFormOpen && <ProductReviewForm productId={productId} onCancel={handleCloseReviewForm} />}

      <div className="product-reviews-filters" role="group" aria-label="Lọc đánh giá">
        <span>Lọc theo:</span>
        <button type="button" aria-pressed={selectedFilter === 'all'} onClick={() => setSelectedFilter('all')}>
          Tất cả ({reviews.length})
        </button>
        <button type="button" aria-pressed={selectedFilter === 'five-stars'} onClick={() => setSelectedFilter('five-stars')}>
          5 sao ({fiveStarCount})
        </button>
        <button type="button" aria-pressed={selectedFilter === 'with-images'} onClick={() => setSelectedFilter('with-images')}>
          <Icon icon={faImage} /> Có hình ảnh ({withImagesCount})
        </button>
      </div>

      <div className="product-reviews-list">
        {filtered.length === 0 && <p className="product-reviews-empty">Chưa có đánh giá nào.</p>}
        {filtered.map((r) => (
          <article key={r.id} className="product-review-card">
            <div className="product-review-header">
              <div className="product-review-author">
                <span className="product-review-avatar" aria-hidden="true">{getInitials(r.authorName)}</span>
                <div>
                  <h3>{r.authorName}</h3>
                  <span className="product-review-stars" aria-label={`${r.rating} trên 5 sao`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} icon={faStar} className={s <= r.rating ? 'active' : 'empty'} />
                    ))}
                  </span>
                </div>
              </div>
              <span className="product-review-date">
                {formatDate(r.createdAt)}
                {r.weightGrams ? ` - Phân loại: ${r.weightGrams}g` : ''}
              </span>
            </div>
            <p>{r.comment}</p>
            {r.images && r.images.length > 0 && (
              <div className="product-review-images">
                {r.images.map((img, idx) => (
                  <button key={idx} type="button" className="product-review-img-btn" onClick={() => setPreviewImage(img)} aria-label={`Xem ảnh đánh giá ${idx + 1}`}>
                    <img src={img} alt={`Ảnh đánh giá ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {previewImage && (
        <div className="product-review-modal" onClick={() => setPreviewImage(null)} role="dialog" aria-modal="true" aria-label="Xem ảnh phóng to">
          <div className="product-review-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="Xem ảnh đánh giá phóng to" />
            <button type="button" className="product-review-modal-close" onClick={() => setPreviewImage(null)} aria-label="Đóng ảnh phóng to">
              <Icon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
