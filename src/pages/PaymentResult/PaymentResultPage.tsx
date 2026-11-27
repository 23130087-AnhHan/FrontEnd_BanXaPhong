import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import { loadCart } from '../../store/cartSlice'
import { layNguoiDungHienTai } from '../../api/authApi'
import { finalizeVnpay, getVnpayCheckout, getVnpayStatus, openVnpay, retryVnpay, verifyVnpayReturn } from '../../api/paymentApi'
import type { PaymentResult } from '../../api/paymentApi'
import { clearCheckoutDraft, readCheckoutDraft } from '../Checkout/checkoutStorage'
import './PaymentResultPage.css'

export default function PaymentResultPage() {
  const [search] = useSearchParams()
  const query = search.toString()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [result, setResult] = useState<PaymentResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [waiting, setWaiting] = useState(false)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [redirecting, setRedirecting] = useState(false)
  const submitting = useRef(false)

  useEffect(() => {
    let active = true
    let timer: number | undefined
    let receipt: PaymentResult | null = null
    let polls = 0
    const controller = new AbortController()
    const params = new URLSearchParams(query)
    const hasCallback = [...params.keys()].some((key) => key.startsWith('vnp_'))

    async function check() {
      try {
        const data = receipt ? await getVnpayStatus(receipt.orderId, controller.signal)
          : hasCallback ? await verifyVnpayReturn(query, controller.signal)
          : params.get('orderId') ? await getVnpayStatus(params.get('orderId')!, controller.signal)
          : params.get('checkout') ? await getVnpayCheckout(params.get('checkout')!, controller.signal)
          : null
        if (!active) return
        if (!data) throw new Error('Chưa có mã giao dịch để kiểm tra. Vui lòng chọn đơn hàng từ lịch sử.')
        receipt ??= data
        setResult({ ...data, gatewayResult: receipt.gatewayResult, canRetry: receipt.gatewayResult ? receipt.canRetry : data.canRetry, canResume: receipt.gatewayResult ? false : data.canResume })
        setLoading(false)
        if (data.paymentStatus === 'paid') {
          let incomplete = true
          try { incomplete = (await finalizeVnpay(data.orderId)).incomplete } catch {}
          if (!active) return
          const user = layNguoiDungHienTai()
          if (user && data.checkoutId && readCheckoutDraft(user.id).checkoutId === data.checkoutId) clearCheckoutDraft(user.id)
          await dispatch(loadCart())
          if (active) navigate('/dat-hang-thanh-cong/' + encodeURIComponent(data.orderId), { replace: true, state: { cartCleanupFailed: incomplete } })
          return
        }
        if ((receipt.gatewayResult === 'success' || (!receipt.gatewayResult && data.paymentStatus === 'pending')) && polls++ < 10) {
          setWaiting(true)
          timer = window.setTimeout(check, 2000)
        } else setWaiting(false)
      } catch (error) {
        if (!active) return
        setError(error instanceof Error ? error.message : 'Chưa kiểm tra được kết quả thanh toán.')
        setLoading(false)
        setWaiting(false)
      }
    }
    check()
    return () => { active = false; controller.abort(); window.clearTimeout(timer) }
  }, [query, reload, dispatch, navigate])

  async function payAgain() {
    if (!result || submitting.current) return
    submitting.current = true
    setRedirecting(true)
    setError('')
    try {
      const hasCallback = [...new URLSearchParams(query).keys()].some((key) => key.startsWith('vnp_'))
      const payment = await retryVnpay(result.orderId, hasCallback ? query : undefined)
      if (payment.paid) setReload((value) => value + 1)
      else openVnpay(payment)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Chưa mở lại được cổng VNPay.')
    } finally {
      submitting.current = false
      setRedirecting(false)
    }
  }

  const cancelled = result?.gatewayResult === 'cancelled'
  const failed = result?.gatewayResult === 'failed' || result?.paymentStatus === 'failed'
  return (
    <div className="payment-result-page">
      <section className="payment-result-panel" aria-busy={loading || redirecting}>
        <h1>{loading ? 'Đang kiểm tra thanh toán' : cancelled ? 'Bạn đã hủy thanh toán' : failed ? 'Thanh toán chưa thành công' : result?.paymentStatus === 'paid' ? 'Đang mở đơn hàng đã thanh toán' : 'Chờ xác nhận thanh toán'}</h1>
        {loading && <p role="status">Vui lòng chờ trong giây lát...</p>}
        {result && <p>Mã đơn hàng: <strong>#{result.orderId}</strong></p>}
        {result && result.paymentStatus !== 'paid' && <p>{cancelled || failed ? 'Sản phẩm vẫn được giữ trong giỏ hàng của bạn.' : 'Website chỉ xác nhận đã thanh toán sau khi nhận được thông báo hợp lệ từ VNPay.'}</p>}
        {waiting && <p role="status">Đang chờ kết quả xác nhận. Nếu mất thời gian, bạn có thể kiểm tra lại từ lịch sử đơn hàng.</p>}
        {error && <p className="payment-result-error" role="alert">{error}</p>}
        <div className="payment-result-actions">
          {result && (result.canRetry || result.canResume) && <button type="button" disabled={redirecting || loading} onClick={payAgain}>{redirecting ? 'Đang mở VNPay...' : result.canResume ? 'Tiếp tục thanh toán' : 'Thanh toán lại'}</button>}
          <button type="button" disabled={loading || redirecting} onClick={() => { setLoading(true); setError(''); setResult(null); setReload((value) => value + 1) }}>Kiểm tra lại</button>
          <Link to="/tai-khoan/don-hang">Lịch sử đơn hàng</Link>
          <Link to="/gio-hang">Quay lại giỏ hàng</Link>
        </div>
      </section>
    </div>
  )
}
