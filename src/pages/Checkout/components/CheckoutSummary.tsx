import type { CartItem } from '../../../api/cartApi'
import type { PaymentMethod } from '../checkoutStorage'
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './CheckoutSummary.css'

interface CheckoutSummaryProps {
  products: CartItem[]
  shippingFee: number
  busy: boolean
  message: string
  submitting: boolean
  paymentMethod: PaymentMethod
}

export default function CheckoutSummary({ products, shippingFee, busy, message, submitting, paymentMethod }: CheckoutSummaryProps) {
  const itemCount = products.reduce((sum, product) => sum + product.quantity, 0)
  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const savings = products.reduce((sum, product) => sum + Math.max(0, (product.oldPrice ?? product.price) - product.price) * product.quantity, 0)
  const deliveryFee = products.length ? shippingFee : 0
  const total = subtotal + deliveryFee
  return (
    <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
      <div className="checkout-summary-heading">
        <h2 id="checkout-summary-title">Đơn hàng của bạn</h2>
        <span>{itemCount} sản phẩm</span>
      </div>

      <div className="checkout-products">
        {products.map((product) => (
          <div className="checkout-product" key={product.id}>
            <img src={product.image} alt="" width={68} height={76} />
            <div className="checkout-product-info">
              <h3>{product.name}</h3>
              <p>{product.unit}</p>
              <p>{product.quantity} × {product.price.toLocaleString('vi-VN')} đ {product.oldPrice != null && product.oldPrice > product.price && <del>{product.oldPrice.toLocaleString('vi-VN')} đ</del>}</p>
              <strong>{(product.price * product.quantity).toLocaleString('vi-VN')} đ</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-coupon">
        <label htmlFor="checkout-coupon">Mã ưu đãi</label>
        <div className="checkout-coupon-input">
          <input id="checkout-coupon" type="text" placeholder="Chưa có mã ưu đãi" disabled />
          <button type="button" disabled>Áp dụng</button>
        </div>
      </div>

      <div className="checkout-costs">
        <dl>
          <div><dt>Tạm tính ({itemCount} sản phẩm)</dt><dd>{subtotal.toLocaleString('vi-VN')} đ</dd></div>
          <div><dt>Ưu đãi bổ sung</dt><dd>0 đ</dd></div>
          <div><dt>Phí giao hàng tiêu chuẩn</dt><dd>{deliveryFee.toLocaleString('vi-VN')} đ</dd></div>
        </dl>
        <div className="checkout-grand-total">
          <span>Tổng thanh toán</span>
          <strong>{total.toLocaleString('vi-VN')} đ</strong>
        </div>
        <p className="checkout-cost-note">Đã bao gồm phí vận chuyển.</p>
        {savings > 0 && <p className="checkout-savings"><Icon icon={faTag} />Bạn đã tiết kiệm {savings.toLocaleString('vi-VN')} đ trong giá sản phẩm.</p>}
      </div>

      <button type="submit" className="checkout-pay" disabled={busy || products.length === 0}>
        {submitting ? 'Đang xử lý...' : paymentMethod === 'cod' ? 'Đặt hàng COD' : 'Thanh toán qua VNPay'}
        <Icon icon={faArrowRight} />
      </button>
      {message && <p className="checkout-feedback" role="alert">{message}</p>}
      <p className="checkout-terms">
        Bằng việc đặt hàng, bạn đồng ý với <span>Điều khoản mua hàng</span> và <span>Chính sách bảo mật</span> của Saponi.
      </p>
    </aside>
  )
}
