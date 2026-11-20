import { useState } from 'react'
import { faBagShopping, faCircleCheck, faMinus, faPlus, faRotateLeft, faStar, faTruck } from '@fortawesome/free-solid-svg-icons'
import type { ProductDetailData } from '../../../api/productApi'
import Icon from '../../../components/Icon'
import './ProductInfo.css'

interface Props {
  product: ProductDetailData
}

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState(1)

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null

  return (
    <section className="product-info" aria-labelledby="product-detail-title">
      <p className="product-info-code">Mã sản phẩm: {product.id}</p>
      <h1 id="product-detail-title">{product.name}</h1>

      <div className="product-info-meta">
        <a href="#product-reviews" className="product-info-rating">
          <Icon icon={faStar} />
          <span><strong>{product.rating.toFixed(1)}</strong> ({product.reviewCount} đánh giá)</span>
        </a>
        <span className="product-info-sold">Đã bán {product.soldCount.toLocaleString()}</span>
        <span className="product-info-stock"><Icon icon={faCircleCheck} /> Tình trạng: Còn hàng</span>
      </div>

      <div className="product-info-price">
        <strong>{product.price.toLocaleString()}đ</strong>
        {product.oldPrice && <del>{product.oldPrice.toLocaleString()}đ</del>}
        {discount && <span className="product-info-discount">Tiết kiệm {discount}%</span>}
      </div>

      {product.shortDescription && (
        <div className="product-info-intro">
          <p>{product.shortDescription}</p>
        </div>
      )}

      <div className="product-info-quantity">
        <span id="product-quantity-label">Số lượng:</span>
        <div className="product-info-quantity-control" role="group" aria-labelledby="product-quantity-label">
          <button type="button" aria-label="Giảm số lượng" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
            <Icon icon={faMinus} />
          </button>
          <output aria-live="polite" aria-label="Số lượng sản phẩm">{quantity}</output>
          <button type="button" aria-label="Tăng số lượng" disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)}>
            <Icon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="product-info-actions">
        <button type="button" className="product-info-cart"><Icon icon={faBagShopping} /> Thêm vào giỏ</button>
        <button type="button" className="product-info-buy">Mua ngay</button>
      </div>

      <div className="product-info-policies">
        <span><Icon icon={faCircleCheck} /> Sản phẩm thủ công 100% tự nhiên</span>
        <span><Icon icon={faTruck} /> Giao hàng toàn quốc</span>
        <span><Icon icon={faRotateLeft} /> Đổi trả trong 7 ngày</span>
      </div>
    </section>
  )
}
