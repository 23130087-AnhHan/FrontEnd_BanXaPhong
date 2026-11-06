import { Link } from 'react-router-dom'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import Icon from '../../../components/Icon'
import './ShippingForm.css'

export default function ShippingForm() {
  return (
    <form className="checkout-section" aria-labelledby="shipping-title">
      <div className="checkout-section-heading">
        <span className="checkout-step">1</span>
        <h2 id="shipping-title">Thông tin giao hàng</h2>
        <Link to="/tai-khoan/dia-chi">Chọn từ sổ địa chỉ</Link>
      </div>

      <p className="checkout-saved-address">
        <Icon icon={faLocationDot} />
        Đang dùng địa chỉ giao hàng mặc định
      </p>

      <div className="checkout-shipping-fields">
        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-name">Họ và tên người nhận *</label>
            <input id="checkout-name" type="text" autoComplete="name" defaultValue="Nguyễn Văn Anh Hàn" required />
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-phone">Số điện thoại *</label>
            <input id="checkout-phone" type="tel" autoComplete="tel" defaultValue="090 123 4567" required />
          </div>
        </div>

        <div className="checkout-field">
          <label htmlFor="checkout-email">Email nhận thông báo đơn hàng *</label>
          <input id="checkout-email" type="email" autoComplete="email" defaultValue="nguyenhan.be.dev@gmail.com" required />
        </div>

        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-city">Tỉnh / Thành phố *</label>
            <select id="checkout-city" autoComplete="address-level1" defaultValue="hcm" required>
              <option value="hcm">TP. Hồ Chí Minh</option>
            </select>
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-district">Quận / Huyện *</label>
            <select id="checkout-district" autoComplete="address-level2" defaultValue="quan-1" required>
              <option value="quan-1">Quận 1</option>
            </select>
          </div>
        </div>

        <div className="checkout-field-row">
          <div className="checkout-field">
            <label htmlFor="checkout-ward">Phường / Xã *</label>
            <select id="checkout-ward" autoComplete="address-level3" defaultValue="ben-nghe" required>
              <option value="ben-nghe">Phường Bến Nghé</option>
            </select>
          </div>
          <div className="checkout-field">
            <label htmlFor="checkout-street">Số nhà, tên đường *</label>
            <input id="checkout-street" type="text" autoComplete="street-address" defaultValue="12A Nguyễn Thị Minh Khai" required />
          </div>
        </div>
      </div>

      <p className="checkout-required-note">* Thông tin bắt buộc để giao hàng chính xác.</p>
    </form>
  )
}
