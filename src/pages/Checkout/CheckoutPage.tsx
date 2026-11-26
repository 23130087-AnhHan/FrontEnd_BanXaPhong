import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { checkoutCod, loadCart, selectItems } from '../../store/cartSlice'
import { layNguoiDungHienTai } from '../../api/authApi'
import { clearCheckoutDraft, readCheckoutDraft, saveCheckoutDraft } from './checkoutStorage'
import { CHECKOUT_SHIPPING_FEE } from '../../api/checkoutApi'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Icon from '../../components/Icon'
import ShippingForm from './components/ShippingForm'
import type { ShippingDetails } from './components/ShippingForm'
import { getAddresses, getProfile } from '../../api/accountApi'
import type { Address } from '../../api/accountApi'
import CheckoutMethods from './components/CheckoutMethods'
import CheckoutSummary from './components/CheckoutSummary'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const submitting = useRef(false)
  const location = useLocation()
  const userId = layNguoiDungHienTai()?.id ?? ''
  const { items, userId: cartUserId, status, saving } = useSelector((state: RootState) => state.cart)
  const [draft, setDraft] = useState(() => {
    const saved = readCheckoutDraft(userId)
    const selection = location.state
    if (selection?.userId === userId && Array.isArray(selection.cartItemIds) && selection.cartItemIds.every((id: unknown) => typeof id === 'string')) {
      saved.cartItemIds = [...new Set<string>(selection.cartItemIds)]
    }
    return saved
  })
  const cartReady = status === 'succeeded' && cartUserId === userId
  const products = cartReady ? items.filter((item) => draft.cartItemIds.includes(item.id)) : []
  const shippingFee = CHECKOUT_SHIPPING_FEE
  const [addresses, setAddresses] = useState<Address[]>([])
  const shipping = draft.shipping ?? {
    receiverName: '', receiverPhone: '', email: '', province: '', district: '', ward: '', detailAddress: '',
  }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (layNguoiDungHienTai()?.id !== userId) return
    let active = true
    Promise.all([getProfile(), getAddresses()]).then(([profile, savedAddresses]) => {
      if (!active || layNguoiDungHienTai()?.id !== userId) return
      if (profile.id !== userId) throw new Error('Thông tin tài khoản không khớp. Vui lòng đăng nhập lại.')
      const address = savedAddresses.find((item) => item.isDefault)
      setAddresses(savedAddresses)
      setDraft((previous) => previous.shipping ? {
        ...previous, addressId: savedAddresses.some((item) => item.id === previous.addressId) ? previous.addressId : '',
      } : {
        ...previous, addressId: address?.id ?? '',
        shipping: {
          receiverName: address?.receiverName ?? profile.hoTen,
          receiverPhone: address?.receiverPhone ?? profile.phone ?? '',
          email: profile.email,
          province: address?.province ?? '',
          district: address?.district ?? '',
          ward: address?.ward ?? '',
          detailAddress: address?.detailAddress ?? '',
        },
      })
    }).catch((error: unknown) => {
      if (active) setError(error instanceof Error ? error.message : 'Chưa tải được thông tin giao hàng.')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [reload, userId])

  useEffect(() => {
    if (draft.shipping && userId === layNguoiDungHienTai()?.id) saveCheckoutDraft(userId, draft)
  }, [draft, userId])

  useEffect(() => {
    if (cartReady) dispatch(selectItems(draft.cartItemIds))
  }, [cartReady, dispatch, draft.cartItemIds])

  function chooseAddress(id: string) {
    const address = addresses.find((item) => item.id === id)
    setDraft((previous) => ({
      ...previous,
      addressId: address ? id : '',
      shipping: address ? {
        ...shipping,
        receiverName: address.receiverName,
        receiverPhone: address.receiverPhone,
        province: address.province,
        district: address.district,
        ward: address.ward,
        detailAddress: address.detailAddress,
      } : shipping,
    }))
  }

  function updateShipping(field: keyof ShippingDetails, value: string) {
    setDraft((previous) => ({
      ...previous,
      shipping: { ...shipping, [field]: value },
      addressId: field === 'email' ? previous.addressId : '',
    }))
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || loading || error || saving || !cartReady || products.length === 0 || products.length !== draft.cartItemIds.length || draft.paymentMethod !== 'cod' || layNguoiDungHienTai()?.id !== userId) return
    submitting.current = true
    setMessage('')
    const checkoutId = draft.checkoutId || crypto.randomUUID()
    const nextDraft = { ...draft, checkoutId }
    setDraft(nextDraft)
    saveCheckoutDraft(userId, nextDraft)
    try {
      const result = await dispatch(checkoutCod({ checkoutId, items: products, shippingAddress: shipping, addressId: draft.addressId, note: draft.note })).unwrap()
      if (layNguoiDungHienTai()?.id !== userId) return
      clearCheckoutDraft(userId)
      navigate('/dat-hang-thanh-cong/' + encodeURIComponent(result.order.id), { replace: true, state: { cartCleanupFailed: result.incomplete } })
    } catch (error) {
      if (layNguoiDungHienTai()?.id === userId) setMessage(error instanceof Error ? error.message : (error as { message?: string })?.message || 'Chưa đặt được đơn hàng. Vui lòng thử lại.')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className="checkout-page">
      <nav className="checkout-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/gio-hang">Giỏ hàng</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Thanh toán</span>
      </nav>

      <h1>Thanh toán</h1>

      {draft.checkoutId && <p className="checkout-state"><Link to={'/dat-hang-thanh-cong?checkout=' + encodeURIComponent(draft.checkoutId)} state={{ cartCleanupFailed: true }}>Kiểm tra đơn vừa gửi</Link></p>}

      {status !== 'failed' && !cartReady && <p className="checkout-state" role="status">Đang tải giỏ hàng...</p>}
      {status === 'failed' && <div className="checkout-state" role="alert"><p>Chưa tải được giỏ hàng.</p><button type="button" onClick={() => dispatch(loadCart())}>Thử lại</button></div>}
      {cartReady && products.length === 0 && <div className="checkout-state"><p>Chưa có sản phẩm được chọn để thanh toán.</p><Link to="/gio-hang">Quay lại giỏ hàng</Link></div>}
      {cartReady && products.length > 0 && (
        <>
          {products.length !== draft.cartItemIds.length && <p className="checkout-state" role="status">Một số sản phẩm không còn trong giỏ hàng. Vui lòng kiểm tra lại trước khi tiếp tục.</p>}
          {loading && <p className="checkout-state" role="status">Đang tải thông tin giao hàng...</p>}
          {error && <div className="checkout-state" role="alert"><p>{error}</p><button type="button" onClick={() => { setLoading(true); setError(''); setReload((value) => value + 1) }}>Thử lại</button></div>}
          <form className="checkout-layout" onSubmit={submitOrder} onChange={() => setMessage('')} onInvalidCapture={() => setMessage('')} aria-busy={loading || saving}>
            <fieldset className="checkout-main" disabled={loading || !!error || saving} aria-label="Thông tin và phương thức giao hàng">
              <ShippingForm addresses={addresses} addressId={draft.addressId} shipping={shipping} onAddressChange={chooseAddress} onChange={updateShipping} />
              <CheckoutMethods
                shippingFee={shippingFee}
                paymentMethod={draft.paymentMethod}
                note={draft.note}
                onPaymentChange={(paymentMethod) => setDraft((previous) => ({ ...previous, paymentMethod }))}
                onNoteChange={(note) => setDraft((previous) => ({ ...previous, note }))}
              />
              <Link to="/gio-hang" className="checkout-back">
                <Icon icon={faArrowLeft} />
                Quay lại giỏ hàng
              </Link>
            </fieldset>
            <CheckoutSummary products={products} shippingFee={shippingFee} busy={loading || !!error || saving || products.length !== draft.cartItemIds.length} submitting={saving} paymentMethod={draft.paymentMethod} message={message} />
          </form>
        </>
      )}
    </div>
  )
}
