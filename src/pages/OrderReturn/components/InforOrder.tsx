import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import type { AccountOrder } from '../../../api/orderApi'
import { orderStatusLabels } from '../../../api/orderApi'
import './InforOrder.css'

export default function InforOrder({ order }: { order: AccountOrder }) {
    return (
        <div className="order-info-card">
            <h3>Thông tin đơn hàng</h3>

            <div className="order-id-row">
                <span className="order-id">#{order.id}</span>
                <span className="order-badge">
                    <FontAwesomeIcon icon={faCheck} /> {orderStatusLabels[order.status]}
                </span>
            </div>

            <p className="order-date">Đặt ngày {new Date(order.createdAt).toLocaleString('vi-VN')}</p>

            <hr className="order-divider" />

            <p className="order-customer">{order.shippingAddress.receiverName} · {order.shippingAddress.receiverPhone}</p>
            <p className="order-payment">{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Thanh toán VNPay'}</p>
        </div>
    )
}

