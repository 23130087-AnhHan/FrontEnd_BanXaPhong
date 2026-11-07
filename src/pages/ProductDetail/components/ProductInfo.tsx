import { useState } from 'react'
import { faBagShopping, faCircleCheck, faMinus, faPlus, faRotateLeft, faStar, faTruck } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ProductInfo.css'

const weightOptions = ['100g', '200g', '250g']

export default function ProductInfo() {
  const [selectedWeight, setSelectedWeight] = useState('100g')
  const [quantity, setQuantity] = useState(1)

  return (
    <section className="product-info" aria-labelledby="product-detail-title">
      <p className="product-info-code">Mã sản phẩm: SP-LAV001</p>
      <h1 id="product-detail-title">Xà phòng Oải hương Pháp</h1>

      <div className="product-info-meta">
        <a href="#product-reviews" className="product-info-rating">
          <Icon icon={faStar} />
          <span><strong>5.0</strong> (128 đánh giá)</span>
        </a>
        <span className="product-info-sold">Đã bán 1.2k</span>
        <span className="product-info-stock"><Icon icon={faCircleCheck} /> Tình trạng: Còn hàng</span>
      </div>

      <div className="product-info-price">
        <strong>185.000 đ</strong>
        <del>215.000 đ</del>
        <span>/ bánh 100g</span>
        <span className="product-info-discount">Tiết kiệm 14%</span>
      </div>

      <div className="product-info-intro">
        <p>Chiết xuất từ hoa oải hương Provence hữu cơ và dầu thực vật nguyên chất.</p>
        <p>Làm sạch, thư giãn và nuôi dưỡng làn da.</p>
      </div>

      <fieldset className="product-info-weights">
        <legend>Trọng lượng</legend>
        <div className="product-info-weight-options">
          {weightOptions.map((weight) => (
            <button
              key={weight}
              type="button"
              className={selectedWeight === weight ? 'active' : ''}
              aria-pressed={selectedWeight === weight}
              onClick={() => setSelectedWeight(weight)}
            >
              {weight}
            </button>
          ))}
        </div>
      </fieldset>

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
