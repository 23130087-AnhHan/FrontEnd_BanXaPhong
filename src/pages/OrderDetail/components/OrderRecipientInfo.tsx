import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill'
import { faFilePen } from '@fortawesome/free-solid-svg-icons/faFilePen'
import Icon from '../../../components/Icon'
import { formatAddress } from '../../../api/accountApi'
import { orderStatusLabels } from '../../../api/orderApi'
import type { AccountOrder } from '../../../api/orderApi'
import './OrderRecipientInfo.css'

export default function OrderRecipientInfo({ order }: { order: AccountOrder }) {
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
        <span className="order-recipient-status"><span aria-hidden="true" />{orderStatusLabels[order.status]}</span>
      </div>

      <div className="order-recipient-grid">
        <div className="order-recipient-box">
          <h3>NGƯỜI NHẬN</h3>
          <div className="order-recipient-person">
            <strong>{order.shippingAddress.receiverName}</strong>
            <span>Số điện thoại: {order.shippingAddress.receiverPhone}</span>
          </div>
          <p className="order-recipient-address">{formatAddress(order.shippingAddress)}</p>
        </div>

        <div className="order-recipient-box order-recipient-transport">
          <h3>VẬN CHUYỂN &amp; THANH TOÁN</h3>
          <p className="order-recipient-delivery"><Icon icon={faTruck} />{order.shippingCarrier || 'Chưa cập nhật đơn vị vận chuyển'} · {order.shippingMethod === 'standard' ? 'Giao hàng tiêu chuẩn' : order.shippingMethod}</p>
          <p className="order-recipient-payment"><Icon icon={faMoneyBill} />{order.paymentMethod === 'vnpay' ? 'VNPay' : 'Thanh toán khi nhận hàng (COD)'} · {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
        </div>

        <div className="order-recipient-box order-recipient-note">
          <span className="order-recipient-icon"><Icon icon={faFilePen} /></span>
          <div>
            <h3>GHI CHÚ CHO ĐƠN HÀNG</h3>
            <p>{order.note || 'Không có ghi chú.'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
