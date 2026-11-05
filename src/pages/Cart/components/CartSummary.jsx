import { faTicket } from '@fortawesome/free-solid-svg-icons/faTicket'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './CartSummary.css'

export default function CartSummary() {
  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Tóm tắt đơn hàng</h2>

      <dl className="cart-costs">
        <div><dt>Tạm tính (3 sản phẩm)</dt><dd>515.000 đ</dd></div>
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
        <div><span>Tổng cộng</span><strong>515.000 đ</strong></div>
        <p>Chưa bao gồm phí vận chuyển.</p>
      </div>

      <button type="button" className="cart-checkout">
        Tiến hành thanh toán
        <Icon icon={faArrowRight} />
      </button>
    </aside>
  )
}
