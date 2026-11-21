import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { faBagShopping, faCircleCheck, faMinus, faPlus, faRotateLeft, faStar, faTruck } from '@fortawesome/free-solid-svg-icons'
import type { ProductDetailData, ProductVariantData } from '../../../api/productApi'
import { layNguoiDungHienTai } from '../../../api/authApi'
import { addToCart } from '../../../store/cartSlice'
import type { AppDispatch, RootState } from '../../../store/store'
import Icon from '../../../components/Icon'
import './ProductInfo.css'

interface Props {
  product: ProductDetailData
  variants?: ProductVariantData[]
  primaryImage?: string
}

export default function ProductInfo({ product, variants = [], primaryImage = '' }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const { saving } = useSelector((state: RootState) => state.cart)

  const [selectedVariantId, setSelectedVariantId] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const defaultVariant = variants.find((v) => v.isDefault) || variants[0]
    if (defaultVariant) {
      setSelectedVariantId(defaultVariant.id)
    }
  }, [variants])

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0] || null

  const currentPrice = selectedVariant ? selectedVariant.price : product.price
  const currentOldPrice = selectedVariant ? selectedVariant.oldPrice : product.oldPrice
  const discount = currentOldPrice ? Math.round((1 - currentPrice / currentOldPrice) * 100) : null
  const currentSku = selectedVariant ? selectedVariant.sku : product.id
  const inStock = selectedVariant ? selectedVariant.stock > 0 : true
  const maxStock = selectedVariant?.stock ?? 99

  function taoSanPhamGioHang() {
    return {
      id: product.id,
      name: product.name,
      price: currentPrice,
      oldPrice: currentOldPrice,
      unit: selectedVariant ? `${selectedVariant.weightGrams}g` : 'bánh 100g',
      image: primaryImage,
      inStock,
    }
  }

  function handleAddToCart() {
    if (!layNguoiDungHienTai()) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    dispatch(addToCart(taoSanPhamGioHang()))
  }

  function handleBuyNow() {
    if (!layNguoiDungHienTai()) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    dispatch(addToCart(taoSanPhamGioHang())).then(() => {
      navigate('/gio-hang')
    })
  }

  return (
    <section className="product-info" aria-labelledby="product-detail-title">
      <p className="product-info-code">Mã sản phẩm: {currentSku}</p>
      <h1 id="product-detail-title">{product.name}</h1>

      <div className="product-info-meta">
        <a href="#product-reviews" className="product-info-rating">
          <Icon icon={faStar} />
          <span><strong>{product.rating.toFixed(1)}</strong> ({product.reviewCount} đánh giá)</span>
        </a>
        <span className="product-info-sold">Đã bán {product.soldCount.toLocaleString()}</span>
        <span className="product-info-stock">
          <Icon icon={faCircleCheck} /> Tình trạng: {inStock ? 'Còn hàng' : 'Hết hàng'}
        </span>
      </div>

      <div className="product-info-price">
        <strong>{currentPrice.toLocaleString()}đ</strong>
        {currentOldPrice && <del>{currentOldPrice.toLocaleString()}đ</del>}
        {discount && <span className="product-info-discount">Tiết kiệm {discount}%</span>}
      </div>

      {product.shortDescription && (
        <div className="product-info-intro">
          <p>{product.shortDescription}</p>
        </div>
      )}

      {variants.length > 0 && (
        <fieldset className="product-info-weights">
          <legend>Trọng lượng</legend>
          <div className="product-info-weight-options">
            {variants.map((v) => (
              <button key={v.id} type="button" className={selectedVariant?.id === v.id ? 'active' : ''} onClick={() => setSelectedVariantId(v.id)}>
                {v.weightGrams}g
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="product-info-quantity">
        <span id="product-quantity-label">Số lượng:</span>
        <div className="product-info-quantity-control" role="group" aria-labelledby="product-quantity-label">
          <button type="button" aria-label="Giảm số lượng" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
            <Icon icon={faMinus} />
          </button>
          <output aria-live="polite" aria-label="Số lượng sản phẩm">{quantity}</output>
          <button type="button" aria-label="Tăng số lượng" disabled={quantity >= maxStock} onClick={() => setQuantity(quantity + 1)}>
            <Icon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="product-info-actions">
        <button type="button" className="product-info-cart" disabled={saving || !inStock} onClick={handleAddToCart}>
          <Icon icon={faBagShopping} /> {saving ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </button>
        <button type="button" className="product-info-buy" disabled={saving || !inStock} onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>

      <div className="product-info-policies">
        <span><Icon icon={faCircleCheck} /> Sản phẩm thủ công 100% tự nhiên</span>
        <span><Icon icon={faTruck} /> Giao hàng toàn quốc</span>
        <span><Icon icon={faRotateLeft} /> Đổi trả trong 7 ngày</span>
      </div>
    </section>
  )
}
