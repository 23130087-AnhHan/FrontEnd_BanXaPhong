import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons/faCreditCard'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill'
import Icon from '../../../components/Icon'
import './CheckoutMethods.css'

export default function CheckoutMethods() {
  return (
    <div className="checkout-methods">
      <section className="checkout-section" aria-labelledby="delivery-title">
        <div className="checkout-section-heading">
          <span className="checkout-step">2</span>
          <h2 id="delivery-title">Phương thức giao hàng</h2>
        </div>

        <label className="checkout-option">
          <input type="radio" name="checkout-delivery" value="standard" defaultChecked />
          <Icon icon={faTruck} />
          <span className="checkout-option-info">
            <strong>Giao hàng tiêu chuẩn</strong>
            <span>Dự kiến nhận: 29/10 – 30/10/2026</span>
          </span>
          <strong className="checkout-delivery-price">30.000 đ</strong>
        </label>
        <p className="checkout-delivery-note">Giao trong 2–3 ngày làm việc. Saponi sẽ thông báo khi đơn hàng được gửi đi.</p>
      </section>

      <section className="checkout-section" aria-labelledby="payment-title">
        <div className="checkout-section-heading">
          <span className="checkout-step">3</span>
          <h2 id="payment-title">Phương thức thanh toán</h2>
        </div>

        <div className="checkout-payment-options">
          <label className="checkout-option">
            <input type="radio" name="checkout-payment" value="vnpay" defaultChecked />
            <Icon icon={faCreditCard} />
            <span className="checkout-option-info">
              <strong>VNPAY · Thẻ ATM nội địa</strong>
              <span>Thanh toán ngay qua cổng VNPAY an toàn.</span>
            </span>
          </label>
          <label className="checkout-option">
            <input type="radio" name="checkout-payment" value="cod" />
            <Icon icon={faMoneyBill} />
            <span className="checkout-option-info">
              <strong>Thanh toán khi nhận hàng (COD)</strong>
              <span>Thanh toán tiền mặt cho nhân viên giao hàng.</span>
            </span>
          </label>
        </div>
      </section>

      <section className="checkout-section checkout-order-note" aria-labelledby="order-note-title">
        <h2 id="order-note-title">
          <label htmlFor="checkout-note">Ghi chú đơn hàng <span>(không bắt buộc)</span></label>
        </h2>
        <textarea id="checkout-note" rows={3} placeholder="Vui lòng gọi trước khi giao hàng." />
      </section>
    </div>
  )
}
