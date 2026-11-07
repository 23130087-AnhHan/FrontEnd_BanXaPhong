import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage'
import Icon from '../../../components/Icon'
import './OrderShippingInfo.css'

export default function OrderShippingInfo() {
  return (
    <section className="order-shipping-info" aria-labelledby="order-shipping-title">
      <h2 id="order-shipping-title">Thông tin giao hàng</h2>
      <div className="order-shipping-details">
        <div>
          <p className="order-shipping-label"><Icon icon={faLocationDot} />Địa chỉ nhận hàng</p>
          <p className="order-shipping-recipient">Nguyễn Văn Anh Hàn · 090 123 4567</p>
          <p>12A Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
        </div>
        <div>
          <p className="order-shipping-label"><Icon icon={faTruck} />Giao hàng tiêu chuẩn</p>
          <p className="order-shipping-date">29/10 – 30/10/2026</p>
          <p>Dự kiến nhận trong 2–3 ngày làm việc.</p>
        </div>
      </div>
      <p className="order-shipping-note"><Icon icon={faMessage} />Ghi chú: Vui lòng gọi trước khi giao hàng.</p>
    </section>
  )
}
