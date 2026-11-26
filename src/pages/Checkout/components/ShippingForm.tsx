import { Link } from 'react-router-dom'
import type { Address } from '../../../api/accountApi'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import Icon from '../../../components/Icon'
import './ShippingForm.css'

export interface ShippingDetails {
  receiverName: string
  receiverPhone: string
  email: string
  province: string
  district: string
  ward: string
  detailAddress: string
}

interface ShippingFormProps {
  addresses: Address[]
  addressId: string
  shipping: ShippingDetails
  onAddressChange: (id: string) => void
  onChange: (field: keyof ShippingDetails, value: string) => void
}

export default function ShippingForm({ addresses, addressId, shipping, onAddressChange, onChange }: ShippingFormProps) {
  return (
    <section className="checkout-section" aria-labelledby="shipping-title">
      <div className="checkout-section-heading">
        <span className="checkout-step">1</span>
        <h2 id="shipping-title">Thông tin giao hàng</h2>
        <Link to="/tai-khoan/dia-chi">Quản lý sổ địa chỉ</Link>
      </div>

      <p className="checkout-saved-address">
        <Icon icon={faLocationDot} />
        {addresses.find((address) => address.id === addressId)?.isDefault ? 'Đang dùng địa chỉ giao hàng mặc định' : 'Chọn địa chỉ đã lưu hoặc nhập thông tin giao hàng bên dưới.'}
      </p>

      <div className="checkout-shipping-fields">
        <div className="checkout-field">
          <label htmlFor="checkout-address">Địa chỉ đã lưu</label>
          <select id="checkout-address" value={addressId} onChange={(event) => onAddressChange(event.target.value)}>
            <option value="">Nhập địa chỉ khác</option>
            {addresses.map((address) => <option key={address.id} value={address.id}>{address.receiverName} — {address.detailAddress}{address.isDefault ? ' (Mặc định)' : ''}</option>)}
          </select>
        </div>
        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-name">Họ và tên người nhận *</label>
            <input id="checkout-name" type="text" autoComplete="name" value={shipping.receiverName} onChange={(event) => onChange('receiverName', event.target.value)} maxLength={100} pattern={'.*\\S.*'} required />
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-phone">Số điện thoại *</label>
            <input id="checkout-phone" type="tel" autoComplete="tel" value={shipping.receiverPhone} onChange={(event) => onChange('receiverPhone', event.target.value)} maxLength={20} pattern="(0|[+]84)([ ]*[0-9]){9}" title="Nhập số điện thoại gồm 10 chữ số bắt đầu bằng 0 hoặc dùng mã +84." required />
          </div>
        </div>

        <div className="checkout-field">
          <label htmlFor="checkout-email">Email nhận thông báo đơn hàng *</label>
          <input id="checkout-email" type="email" autoComplete="email" value={shipping.email} onChange={(event) => onChange('email', event.target.value)} maxLength={254} required />
        </div>

        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-city">Tỉnh / Thành phố *</label>
            <input id="checkout-city" autoComplete="address-level1" value={shipping.province} onChange={(event) => onChange('province', event.target.value)} maxLength={100} pattern={'.*\\S.*'} required />
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-district">Quận / Huyện</label>
            <input id="checkout-district" autoComplete="address-level2" value={shipping.district} onChange={(event) => onChange('district', event.target.value)} maxLength={100} />
          </div>
        </div>

        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-ward">Phường / Xã *</label>
            <input id="checkout-ward" autoComplete="address-level3" value={shipping.ward} onChange={(event) => onChange('ward', event.target.value)} maxLength={100} pattern={'.*\\S.*'} required />
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-street">Số nhà, tên đường *</label>
            <input id="checkout-street" type="text" autoComplete="street-address" value={shipping.detailAddress} onChange={(event) => onChange('detailAddress', event.target.value)} maxLength={255} pattern={'.*\\S.*'} required />
          </div>
        </div>
      </div>

      <p className="checkout-required-note">* Thông tin bắt buộc để giao hàng chính xác.</p>
    </section>
  )
}
