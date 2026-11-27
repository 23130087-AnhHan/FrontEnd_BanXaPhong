import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons/faCircleXmark'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../../components/Icon'
import { canCancelOrder, paymentStatusLabels } from '../../../api/orderApi'
import './OrderCard.css'

export interface Order {
  id: string
  date: string
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  quantity: number
  total: string
  update: string
  shippingFee?: number
  paymentMethod?: string
  paymentStatus?: string
  checkoutStatus?: string
  products: {
    id?: string
    image?: string
    weight?: string
    name: string
    quantity: number
    price: string
    total: string
  }[]
}

const statuses = {
  pending: { label: 'Chờ xác nhận', icon: faClock },
  confirmed: { label: 'Đã xác nhận', icon: faCircleCheck },
  shipping: { label: 'Đang giao', icon: faTruck },
  delivered: { label: 'Đã giao', icon: faCircleCheck },
  cancelled: { label: 'Đã hủy', icon: faCircleXmark },
}

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate()
  const status = statuses[order.status]

  return (
    <article className="order-card" aria-labelledby={'order-' + order.id}>
      <div className="order-header">
        <div className="order-info">
          <h2 id={'order-' + order.id}>#{order.id}</h2>
          <span>Ngày đặt: {order.date}</span>
        </div>
        <span className={'order-status ' + order.status}>
          <Icon icon={status.icon} />
          {order.status === 'pending' && order.paymentMethod === 'vnpay' && order.paymentStatus !== 'paid' ? 'Chờ thanh toán' : status.label}
        </span>
      </div>

      <div className="order-products">
        {order.products.map((product) => (
          <div className="order-product" key={product.id ?? product.name}>
            <img src={product.image} alt="" width="64" height="64" loading="lazy" />
            <div className="order-product-info">
              <h3>{product.name}</h3>
              <p>{product.weight ? 'Bánh ' + product.weight : 'Sản phẩm'} • Số lượng: {product.quantity}</p>
            </div>
            <div className="order-product-price">
              <strong>{product.total}</strong>
              <span>{product.price}/bánh</span>
            </div>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <div className="order-total">
          <div>
            <p>{order.quantity} sản phẩm • {order.shippingFee ? 'Phí giao hàng: ' + order.shippingFee.toLocaleString('vi-VN') + ' đ' : 'Miễn phí giao hàng'}</p>
            {order.paymentMethod && <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'VNPay'} · {paymentStatusLabels[order.paymentStatus || 'unpaid'] || 'Chưa thanh toán'}</p>}
          </div>
          <div className="order-total-value">
            <span>Tổng tiền:</span>
            <strong>{order.total}</strong>
          </div>
        </div>
        <div className="order-bottom">
          <p className="order-update">{order.update}</p>
          <div className="order-actions">
            <Link to={'/tai-khoan/don-hang/chi-tiet/' + encodeURIComponent(order.id)}>Xem chi tiết</Link>
            {order.status === 'pending' && order.paymentMethod === 'vnpay' && order.paymentStatus !== 'paid' && order.checkoutStatus === 'complete' && <Link to={'/thanh-toan/vnpay/ket-qua?orderId=' + encodeURIComponent(order.id)}>Thanh toán VNPay</Link>}

            {canCancelOrder(order.status) && (
              <button
                type="button"
                onClick={() => navigate('/tai-khoan/don-hang/cancel/' + encodeURIComponent(order.id))}
              >
                Huỷ đơn
              </button>
            )}

            {order.status === 'delivered' && (
              <Link to="/tai-khoan/don-hang/review" state={{ order }}>Đánh giá</Link>
            )}

            {order.status === "delivered" && (
              <button
                type="button" className="order-action-primary"
                onClick={() => navigate('/tai-khoan/don-hang/return', { state: { order } })}>
                Trả hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
