import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { faArrowLeft, faHeadset } from '@fortawesome/free-solid-svg-icons'
import { canCancelOrder, cancelOrder, getOrder } from '../../api/orderApi'
import type { AccountOrder, CancelOrderInput } from '../../api/orderApi'
import Icon from '../../components/Icon'
import CancelReasonForm from './components/CancelReasonForm'
import CancelOrderSummary from './components/CancelOrderSummary'
import CancelOrderActions from './components/CancelOrderActions'
import './CancelOrderPage.css'

export default function CancelOrderPage() {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const previousOrderId = (location.state as { order?: { id?: string } } | null)?.order?.id
  const [order, setOrder] = useState<AccountOrder | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(orderId))
  const [loadError, setLoadError] = useState('')
  const [cancelError, setCancelError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reload, setReload] = useState(0)
  const submittingOrder = useRef(false)
  const activePage = useRef(true)

  useEffect(() => {
    activePage.current = true
    return () => { activePage.current = false }
  }, [])

  useEffect(() => {
    if (!orderId) return
    let active = true
    getOrder(orderId)
      .then((data) => { if (active) setOrder(data) })
      .catch((error) => { if (active) setLoadError(error instanceof Error ? error.message : 'Không tải được đơn hàng. Vui lòng thử lại.') })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [orderId, reload])

  function handleReload() {
    setIsLoading(true)
    setLoadError('')
    setReload((value) => value + 1)
  }

  async function handleCancelOrder(input: CancelOrderInput) {
    if (!order || submittingOrder.current) return
    submittingOrder.current = true
    setIsSubmitting(true)
    setCancelError('')
    try {
      await cancelOrder(order.id, input)
      if (activePage.current) navigate('/tai-khoan/don-hang', { replace: true })
    } catch (error) {
      if (!activePage.current) return
      setCancelError(error instanceof Error ? error.message : 'Chưa huỷ được đơn hàng. Vui lòng thử lại.')
      try {
        const updatedOrder = await getOrder(order.id)
        if (activePage.current) setOrder(updatedOrder)
      } catch {}
    } finally {
      submittingOrder.current = false
      if (activePage.current) setIsSubmitting(false)
    }
  }

  if (!orderId && previousOrderId) return <Navigate to={'/tai-khoan/don-hang/cancel/' + encodeURIComponent(previousOrderId)} replace />

  return (
    <div className="cancel-order-page">
      <div className="cancel-order-container">
        <nav className="cancel-order-breadcrumb" aria-label="Đường dẫn">
          <Link to="/tai-khoan/don-hang"><Icon icon={faArrowLeft} />Đơn hàng của tôi</Link>
          <span aria-hidden="true">/</span>
          {orderId && <><span>#{orderId}</span><span aria-hidden="true">/</span></>}
          <span aria-current="page">Huỷ đơn hàng</span>
        </nav>

        <div className="cancel-order-heading">
          <h1>Huỷ đơn hàng</h1>
          <p>Vui lòng kiểm tra đúng đơn hàng và cho Saponi biết lý do bạn muốn huỷ.</p>
        </div>

        {isLoading && <p className="cancel-order-message" role="status">Đang tải đơn hàng...</p>}
        {loadError && <div className="cancel-order-message cancel-order-error" role="alert"><p>{loadError}</p><button type="button" onClick={handleReload}>Thử lại</button></div>}
        {!orderId && <section className="cancel-order-panel cancel-order-unavailable"><h2>Chưa chọn đơn hàng cần huỷ</h2><p>Vui lòng chọn đơn hàng trong danh sách của bạn.</p><Link to="/tai-khoan/don-hang">Quay lại đơn hàng của tôi</Link></section>}
        {cancelError && <p className="cancel-order-message cancel-order-error" role="alert">{cancelError}</p>}

        {!isLoading && order && (
          <div className="cancel-order-layout">
            {canCancelOrder(order.status) ? <CancelReasonForm onConfirm={handleCancelOrder} isSubmitting={isSubmitting} /> : (
              <section className="cancel-order-panel cancel-order-unavailable" role="status">
                <h2>{order.status === 'cancelled' ? 'Đơn hàng đã được huỷ' : 'Đơn hàng không thể huỷ ở trạng thái hiện tại'}</h2>
                <p>{order.status === 'cancelled' ? order.cancelReason || 'Đơn hàng này đã được huỷ trước đó.' : 'Chỉ có thể huỷ đơn đang chờ xác nhận hoặc đã xác nhận.'}</p>
                {order.cancelNote && <p>Ghi chú: {order.cancelNote}</p>}
                <Link to="/tai-khoan/don-hang">Quay lại đơn hàng của tôi</Link>
              </section>
            )}
            <CancelOrderSummary order={order} />
            {canCancelOrder(order.status) && <CancelOrderActions isSubmitting={isSubmitting} />}
            <p className="cancel-order-help"><Icon icon={faHeadset} />Cần trợ giúp? <Link to="/contact">Liên hệ Saponi</Link></p>
          </div>
        )}
        {!isLoading && loadError && <Link className="cancel-order-back" to="/tai-khoan/don-hang">Quay lại đơn hàng của tôi</Link>}
      </div>
    </div>
  )
}
