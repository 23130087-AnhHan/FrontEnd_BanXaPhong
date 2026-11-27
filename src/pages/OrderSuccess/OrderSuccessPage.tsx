import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import { loadCart } from '../../store/cartSlice'
import { getOrder, formatMoney } from '../../api/orderApi'
import type { AccountOrder } from '../../api/orderApi'
import { cleanupCodCart, getCodCheckout } from '../../api/checkoutApi'
import { finalizeVnpay } from '../../api/paymentApi'
import { currentUserId } from '../../api/accountApi'
import { clearCheckoutDraft, readCheckoutDraft } from '../Checkout/checkoutStorage'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../components/Icon'
import OrderShippingInfo from './components/OrderShippingInfo'
import RecommendedProducts from './components/RecommendedProducts'
import './OrderSuccessPage.css'

export default function OrderSuccessPage() {
  const { orderId } = useParams()
  const [searchParams] = useSearchParams()
  const checkoutId = searchParams.get('checkout')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [order, setOrder] = useState<AccountOrder | null>(null)
  const [loading, setLoading] = useState(Boolean(orderId || checkoutId))
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [cleanupFailed, setCleanupFailed] = useState(Boolean(location.state?.cartCleanupFailed))
  const [cleaning, setCleaning] = useState(false)

  useEffect(() => {
    if (!orderId && !checkoutId) return
    let active = true
    const request = orderId ? getOrder(orderId) : getCodCheckout(checkoutId!).then((order) => getOrder(order.id))
    request.then((data) => {
      if (!active) return
      if (data.paymentMethod === 'vnpay' && data.paymentStatus !== 'paid') {
        navigate('/thanh-toan/vnpay/ket-qua?orderId=' + encodeURIComponent(data.id), { replace: true })
        return
      }
      setOrder(data)
      if (data.checkoutId && readCheckoutDraft(data.userId).checkoutId === data.checkoutId) clearCheckoutDraft(data.userId)
    }).catch((error: unknown) => {
      if (active) setError(error instanceof Error ? error.message : 'Chưa tải được đơn hàng.')
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [orderId, checkoutId, reload, navigate])

  async function retryCleanup() {
    if (!order || cleaning) return
    setCleaning(true)
    try {
      const result = order.paymentMethod === 'vnpay' ? await finalizeVnpay(order.id) : await cleanupCodCart(order.id)
      if (currentUserId() !== order.userId) return
      setCleanupFailed(result.incomplete)
      dispatch(loadCart())
      if (!result.incomplete) navigate('/dat-hang-thanh-cong/' + encodeURIComponent(order.id), { replace: true, state: null })
    } catch { setCleanupFailed(true) }
    finally { setCleaning(false) }
  }

  if (!order) return (
    <div className="order-success-page">
      <section className="order-shipping-info">
        {loading && <p role="status">Đang tải đơn hàng...</p>}
        {error && <p role="alert">{error} <button type="button" disabled={loading} onClick={() => { setLoading(true); setError(''); setReload((value) => value + 1) }}>Thử lại</button></p>}
        {!loading && !error && <p>Chọn đơn hàng từ lịch sử để xem thông tin.</p>}
        <Link to="/tai-khoan/don-hang">Xem lịch sử đơn hàng</Link>
        {checkoutId && <p><Link to="/thanh-toan">Quay lại thanh toán</Link></p>}
      </section>
    </div>
  )

  return (
    <div className="order-success-page">
      <nav className="order-success-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/gio-hang">Giỏ hàng</Link>
        <span aria-hidden="true">/</span>
        <Link to="/thanh-toan">Thanh toán</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Hoàn tất</span>
      </nav>

      <section className="order-success-message" aria-labelledby="order-success-title">
        {order.status !== 'cancelled' && <div className="order-success-check"><Icon icon={faCheck} /></div>}
        <h1 id="order-success-title">{order.status === 'cancelled' ? 'Đơn hàng đã hủy' : 'Đặt hàng thành công!'}</h1>
        <p>Cảm ơn bạn đã chọn Saponi. Mã đơn hàng: <strong>#{order.id}</strong></p>
        <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'VNPay'} · {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'} · Tổng tiền: <strong>{formatMoney(order.totalAmount)}</strong></p>
        <div className="order-success-actions">
          <Link to={'/tai-khoan/don-hang/chi-tiet/' + encodeURIComponent(order.id)} className="order-success-primary">
            Xem đơn hàng <Icon icon={faArrowRight} />
          </Link>
          <Link to="/products">Tiếp tục mua sắm</Link>
        </div>
      </section>
      {cleanupFailed && <div className="order-success-warning" role="status">
        <p>Đơn hàng đã được lưu. Một số sản phẩm trong giỏ chưa được xóa hoặc đã thay đổi. Bạn có thể kiểm tra lại giỏ hàng.</p>
        <button type="button" disabled={cleaning} onClick={retryCleanup}>{cleaning ? 'Đang cập nhật...' : 'Cập nhật lại giỏ hàng'}</button>
        <Link to="/gio-hang">Xem giỏ hàng</Link>
      </div>}
      <OrderShippingInfo order={order} />
      <RecommendedProducts />
    </div>
  )
}
