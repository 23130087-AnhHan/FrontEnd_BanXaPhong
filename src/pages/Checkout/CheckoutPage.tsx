import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
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
  const { items, selectedIds, status, saving } = useSelector((state: RootState) => state.cart)
  const products = items.filter((item) => selectedIds.includes(item.id))
  const shippingFee = 30000
  const [addresses, setAddresses] = useState<Address[]>([])
  const [addressId, setAddressId] = useState('')
  const [shipping, setShipping] = useState<ShippingDetails>({ receiverName: '', receiverPhone: '', email: '', province: '', district: '', ward: '', detailAddress: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([getProfile(), getAddresses()]).then(([profile, savedAddresses]) => {
      if (!active) return
      const address = savedAddresses.find((item) => item.isDefault)
      setAddresses(savedAddresses)
      setAddressId(address?.id ?? '')
      setShipping({ receiverName: address?.receiverName ?? profile.hoTen, receiverPhone: address?.receiverPhone ?? profile.phone ?? '', email: profile.email, province: address?.province ?? '', district: address?.district ?? '', ward: address?.ward ?? '', detailAddress: address?.detailAddress ?? '' })
    }).catch((error: unknown) => {
      if (active) setError(error instanceof Error ? error.message : 'Chưa tải được thông tin giao hàng.')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [reload])

  function chooseAddress(id: string) {
    const address = addresses.find((item) => item.id === id)
    setAddressId(id)
    if (address) setShipping((previous) => ({ ...previous, receiverName: address.receiverName, receiverPhone: address.receiverPhone, province: address.province, district: address.district, ward: address.ward, detailAddress: address.detailAddress }))
    setMessage('')
  }

  function updateShipping(field: keyof ShippingDetails, value: string) {
    setShipping((previous) => ({ ...previous, [field]: value }))
    if (field !== 'email') setAddressId('')
    setMessage('')
  }

  function checkInformation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading || error || saving || status !== 'succeeded' || products.length === 0) return
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

      {loading && <p className="checkout-state" role="status">Đang tải thông tin giao hàng...</p>}
      {error && <div className="checkout-state" role="alert"><p>{error}</p><button type="button" onClick={() => { setLoading(true); setError(''); setReload((value) => value + 1) }}>Thử lại</button></div>}
      <form className="checkout-layout" onSubmit={checkInformation}>
        <fieldset className="checkout-main" disabled={loading || !!error}>
          <ShippingForm addresses={addresses} addressId={addressId} shipping={shipping} onAddressChange={chooseAddress} onChange={updateShipping} />
          <CheckoutMethods />
          <Link to="/gio-hang" className="checkout-back">
            <Icon icon={faArrowLeft} />
            Quay lại giỏ hàng
          </Link>
        </fieldset>
        <CheckoutSummary products={products} shippingFee={shippingFee} busy={loading || !!error || saving || status !== 'succeeded'} message={message} />
      </form>
    </div>
  )
}
