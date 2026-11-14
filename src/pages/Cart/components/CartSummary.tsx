import { Link } from 'react-router-dom'
import { faTicket } from '@fortawesome/free-solid-svg-icons/faTicket'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './CartSummary.css'

interface CartSummaryProps {
  itemCount: number
  total: number
  busy: boolean
}

export default function CartSummary({ itemCount, total, busy }: CartSummaryProps) {
  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Tóm tắt đơn hàng</h2>

      <dl className="cart-costs">
        <div><dt>Tạm tính ({itemCount} sản phẩm)</dt><dd>{total.toLocaleString('vi-VN')} đ</dd></div>
        <div><dt>Ưu đãi bổ sung</dt><dd>0 đ</dd></div>
      </dl>

      <div className="cart-coupon">
        <label htmlFor="cart-coupon"><Icon icon={faTicket} />Mã ưu đãi</label>
        <div className="cart-coupon-input">
          <input id="cart-coupon" type="text" placeholder="Nhập mã ưu đãi" />
          <button type="button">Áp dụng</button>
        </div>
      </div>

      <div className="cart-grand-total">
        <div><span>Tổng cộng</span><strong>{total.toLocaleString('vi-VN')} đ</strong></div>
        <p>Chưa bao gồm phí vận chuyển.</p>
      </div>

      {busy || itemCount === 0 ? (
        <button type="button" className="cart-checkout" disabled>Tiến hành thanh toán <Icon icon={faArrowRight} /></button>
      ) : (
        <Link to="/thanh-toan" className="cart-checkout">Tiến hành thanh toán <Icon icon={faArrowRight} /></Link>
      )}
    </aside>
  )
}
