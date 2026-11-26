import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { loadCart, selectItems } from '../../store/cartSlice'
import { layNguoiDungHienTai } from '../../api/authApi'
import { readCheckoutDraft, saveCheckoutDraft } from './checkoutStorage'
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
  const shippingFee = 30000
  const [addresses, setAddresses] = useState<Address[]>([])
  const shipping = draft.shipping ?? { receiverName: '', receiverPhone: '', email: '', province: '', district: '', ward: '', detailAddress: '' }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([getProfile(), getAddresses()]).then(([profile, savedAddresses]) => {
      if (!active || profile.id !== userId || layNguoiDungHienTai()?.id !== userId) return
      const address = savedAddresses.find((item) => item.isDefault)
      setAddresses(savedAddresses)
      setDraft((previous) => previous.shipping ? {
        ...previous, addressId: savedAddresses.some((item) => item.id === previous.addressId) ? previous.addressId : '',
      } : {
        ...previous, addressId: address?.id ?? '',
        shipping: { receiverName: address?.receiverName ?? profile.hoTen, receiverPhone: address?.receiverPhone ?? profile.phone ?? '', email: profile.email, province: address?.province ?? '', district: address?.district ?? '', ward: address?.ward ?? '', detailAddress: address?.detailAddress ?? '' },
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
    setDraft((previous) => ({ ...previous, addressId: address ? id : '', shipping: address ? { ...shipping, receiverName: address.receiverName, receiverPhone: address.receiverPhone, province: address.province, district: address.district, ward: address.ward, detailAddress: address.detailAddress } : shipping }))
    setMessage('')
  }

  function updateShipping(field: keyof ShippingDetails, value: string) {
    setDraft((previous) => ({ ...previous, shipping: { ...shipping, [field]: value }, addressId: field === 'email' ? previous.addressId : '' }))
    setMessage('')
  }

  function checkInformation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading || error || saving || !cartReady || products.length === 0 || layNguoiDungHienTai()?.id !== userId) return
    setMessage('Thông tin giao hàng hợp lệ. Chưa gửi đơn hàng.')
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

      {status !== 'failed' && !cartReady && <p className="checkout-state" role="status">Đang tải giỏ hàng...</p>}
      {status === 'failed' && <div className="checkout-state" role="alert"><p>Chưa tải được giỏ hàng.</p><button type="button" onClick={() => dispatch(loadCart())}>Thử lại</button></div>}
      {cartReady && products.length === 0 && <div className="checkout-state"><p>Chưa có sản phẩm được chọn để thanh toán.</p><Link to="/gio-hang">Quay lại giỏ hàng</Link></div>}
      {cartReady && products.length > 0 && <>
      {products.length !== draft.cartItemIds.length && <p className="checkout-state" role="status">Một số sản phẩm không còn trong giỏ hàng. Vui lòng kiểm tra lại trước khi tiếp tục.</p>}
      {loading && <p className="checkout-state" role="status">Đang tải thông tin giao hàng...</p>}
      {error && <div className="checkout-state" role="alert"><p>{error}</p><button type="button" onClick={() => { setLoading(true); setError(''); setReload((value) => value + 1) }}>Thử lại</button></div>}
      <form className="checkout-layout" onSubmit={checkInformation}>
        <fieldset className="checkout-main" disabled={loading || !!error}>
          <ShippingForm addresses={addresses} addressId={draft.addressId} shipping={shipping} onAddressChange={chooseAddress} onChange={updateShipping} />
          <CheckoutMethods />
          <Link to="/gio-hang" className="checkout-back">
            <Icon icon={faArrowLeft} />
            Quay lại giỏ hàng
          </Link>
        </fieldset>
        <CheckoutSummary products={products} shippingFee={shippingFee} busy={loading || !!error || saving || status !== 'succeeded'} message={message} />
      </form>
      </>}
    </div>
  )
}
