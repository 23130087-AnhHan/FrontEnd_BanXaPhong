import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage'
import Icon from '../../../components/Icon'
import { formatAddress } from '../../../api/accountApi'
import type { AccountOrder } from '../../../api/orderApi'
import './OrderShippingInfo.css'

export default function OrderShippingInfo({ order }: { order: AccountOrder }) {
  return (
    <section className="order-shipping-info" aria-labelledby="order-shipping-title">
      <h2 id="order-shipping-title">Thông tin giao hàng</h2>
      <div className="order-shipping-details">
        <div>
          <p className="order-shipping-label"><Icon icon={faLocationDot} />Địa chỉ nhận hàng</p>
          <p className="order-shipping-recipient">{order.shippingAddress.receiverName} · {order.shippingAddress.receiverPhone}</p>
          <p>{formatAddress(order.shippingAddress)}</p>
        </div>
        <div>
          <p className="order-shipping-label"><Icon icon={faTruck} />{order.shippingMethod === 'standard' ? 'Giao hàng tiêu chuẩn' : order.shippingMethod}</p>
          <p className="order-shipping-date">{order.estimatedDeliveryAt ? new Date(order.estimatedDeliveryAt).toLocaleDateString('vi-VN') : 'Chờ xác nhận thời gian giao hàng'}</p>
          <p>{order.shippingCarrier || 'Đơn vị vận chuyển sẽ được cập nhật sau.'}</p>
        </div>
      </div>
      <p className="order-shipping-note"><Icon icon={faMessage} />Ghi chú: {order.note || 'Không có ghi chú.'}</p>
    </section>
  )
}
