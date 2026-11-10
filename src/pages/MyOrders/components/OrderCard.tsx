import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons/faCircleXmark'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../../components/Icon'
import './OrderCard.css'

export interface Order {
  id: string
  date: string
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled'
  quantity: number
  total: string
  update: string
  action?: string
  products: {
    name: string
    quantity: number
    price: string
    total: string
  }[]
}

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const statuses = {
  pending: { label: 'Chờ xác nhận', icon: faClock },
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
          {status.label}
        </span>
      </div>

      <div className="order-products">
        {order.products.map((product) => (
          <div className="order-product" key={product.name}>
            <img src={productImage} alt="" width="64" height="64" loading="lazy" />
            <div className="order-product-info">
              <h3>{product.name}</h3>
              <p>Bánh 100g • Số lượng: {product.quantity}</p>
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
          <p>{order.quantity} sản phẩm • Miễn phí giao hàng</p>
          <div className="order-total-value">
            <span>Tổng tiền:</span>
            <strong>{order.total}</strong>
          </div>
        </div>
        <div className="order-bottom">
          <p className="order-update">{order.update}</p>
          <div className="order-actions">
            <Link to="/tai-khoan/don-hang/chi-tiet" reloadDocument>Xem chi tiết</Link>
            {order.action && (
              <button
                type="button"
                className="order-action-primary"
                onClick={() => {
                  if (order.action === 'Theo dõi đơn') {
                    navigate('/tai-khoan/don-hang/track', { state: { order } })
                  }
                }}
              >
                {order.action}
              </button>
            )}

            {order.status === 'pending' && (
              <button
                type="button"
                onClick={() => navigate('/tai-khoan/don-hang/cancel', { state: { order } })}
              >
                Huỷ đơn
              </button>
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
