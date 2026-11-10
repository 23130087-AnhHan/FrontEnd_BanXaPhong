import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill'
import { faFilePen } from '@fortawesome/free-solid-svg-icons/faFilePen'
import Icon from '../../../components/Icon'
import './OrderRecipientInfo.css'

export default function OrderRecipientInfo() {
  return (
    <section className="order-detail-panel" aria-labelledby="order-recipient-title">
      <div className="order-recipient-heading">
        <div className="order-recipient-intro">
          <span className="order-recipient-icon"><Icon icon={faLocationDot} /></span>
          <div>
            <h1 id="order-recipient-title">Thông tin nhận hàng</h1>
            <p>Kiểm tra thông tin giao nhận và tiến trình kiện hàng</p>
          </div>
        </div>
        <span className="order-recipient-status"><span aria-hidden="true" />Đang vận chuyển</span>
      </div>

      <div className="order-recipient-grid">
        <div className="order-recipient-box">
          <h3>NGƯỜI NHẬN</h3>
          <div className="order-recipient-person">
            <strong>Nguyễn Văn Anh Hàn</strong>
            <span>Số điện thoại: 090 123 4567</span>
          </div>
          <p className="order-recipient-address">12A Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
        </div>

        <div className="order-recipient-box order-recipient-transport">
          <h3>VẬN CHUYỂN &amp; THANH TOÁN</h3>
          <p className="order-recipient-delivery"><Icon icon={faTruck} />Giao Hàng Nhanh (GHN) - Hỏa tốc</p>
          <p className="order-recipient-payment"><Icon icon={faMoneyBill} />Thanh toán khi nhận hàng (COD)</p>
        </div>

        <div className="order-recipient-box order-recipient-note">
          <span className="order-recipient-icon"><Icon icon={faFilePen} /></span>
          <div>
            <h3>GHI CHÚ CHO ĐƠN HÀNG</h3>
            <p>“Giao giờ hành chính, gọi trước khi giao 15 phút. Vui lòng bọc kỹ đồ dễ vỡ.”</p>
          </div>
        </div>
      </div>
    </section>
  )
}
