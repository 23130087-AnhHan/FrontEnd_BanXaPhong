import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../api/orderApi'
import type { AccountOrder } from '../../api/orderApi'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import Icon from '../../components/Icon'
import OrderRecipientInfo from './components/OrderRecipientInfo'
import OrderDetailProducts from './components/OrderDetailProducts'
import OrderPaymentSummary from './components/OrderPaymentSummary'
import './OrderDetailPage.css'

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState<AccountOrder | null>(null)
  const [loading, setLoading] = useState(Boolean(orderId))
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    if (!orderId) return
    let active = true
    getOrder(orderId).then((data) => { if (active) setOrder(data) })
      .catch((error) => { if (active) setError(error instanceof Error ? error.message : 'Không tải được đơn hàng.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [orderId, reload])

  if (!order) return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        <section className="order-detail-panel">
          {loading && <p role="status">Đang tải chi tiết đơn hàng...</p>}
          {error && <p className="account-error" role="alert">{error} <button type="button" disabled={loading} onClick={() => { setLoading(true); setError(''); setReload(reload + 1) }}>Thử lại</button></p>}
          {!loading && !error && <p>Chọn đơn hàng từ danh sách để xem chi tiết.</p>}
          <Link to="/tai-khoan/don-hang">Trở về danh sách đơn hàng</Link>
        </section>
      </div>
    </div>
  )

  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        <div className="order-detail-meta">
          <nav className="order-detail-breadcrumb" aria-label="Đường dẫn">
            <Link to="/tai-khoan/don-hang" reloadDocument><Icon icon={faArrowLeft} />Trở về danh sách đơn hàng</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">#{order.id}</span>
          </nav>
          <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString('vi-VN')}</time>
        </div>

        {order.status === 'shipping' && <div className="order-detail-tracking">
          <Link to="/tai-khoan/don-hang/track" state={{ order }} className="order-detail-button">Theo dõi đơn hàng</Link>
        </div>}

        <OrderRecipientInfo order={order} />
        <OrderDetailProducts order={order} />
        <OrderPaymentSummary order={order} />

        <div className="order-detail-actions">
          {order.status === 'delivered' && (
            <Link to="/tai-khoan/don-hang/review" state={{ order }} className="order-detail-button"><Icon icon={faStar} />Đánh giá sản phẩm</Link>
          )}
          {order.status === 'pending' && <Link to="/tai-khoan/don-hang/cancel" state={{ order }} className="order-detail-button order-detail-cancel">
            <Icon icon={faXmark} />Hủy đơn
          </Link>}
          {(order.status === 'delivered' || order.status === 'cancelled') && <Link to="/gio-hang" className="order-detail-button order-detail-button-primary" reloadDocument>
            <Icon icon={faRepeat} />Mua lại
          </Link>}
        </div>
      </div>
    </div>
  )
}
