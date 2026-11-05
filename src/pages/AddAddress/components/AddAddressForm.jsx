import { Link } from 'react-router-dom'
import './AddAddressForm.css'

export default function AddAddressForm() {
  return (
    <form className="account-form" aria-labelledby="add-address-title">
      <div className="account-form-heading">
        <h1 id="add-address-title">Thêm địa chỉ mới</h1>
        <p>
          Thêm địa chỉ giao hàng mới để sử dụng cho các đơn hàng tiếp theo.
          Bạn có thể đặt một trong các địa chỉ làm mặc định sau khi lưu.
        </p>
      </div>

      <div className="account-form-fields">
        <div className="account-field">
          <label htmlFor="add-address-name">Người nhận</label>
          <input id="add-address-name" type="text" autoComplete="name" placeholder="Nhập họ và tên người nhận" />
        </div>

        <div className="account-field">
          <label htmlFor="add-address-phone">Số điện thoại</label>
          <input id="add-address-phone" type="tel" autoComplete="tel" placeholder="Nhập số điện thoại liên hệ" />
        </div>

        <div className="add-address-row">
          <div className="account-field">
            <label htmlFor="add-address-city">Tỉnh / thành phố</label>
            <input id="add-address-city" type="text" autoComplete="address-level1" placeholder="Chọn tỉnh / thành phố" />
          </div>
          <div className="account-field">
            <label htmlFor="add-address-ward">Phường / xã</label>
            <input id="add-address-ward" type="text" autoComplete="address-level2" placeholder="Chọn phường / xã" />
          </div>
        </div>

        <div className="account-field">
          <label htmlFor="add-address-detail">Địa chỉ chi tiết</label>
          <input
            id="add-address-detail"
            type="text"
            autoComplete="street-address"
            placeholder="Số nhà, tên đường, khu vực, toà nhà..."
          />
        </div>

        <label className="add-address-default">
          <input type="checkbox" role="switch" />
          <span>Đặt làm địa chỉ mặc định</span>
        </label>
      </div>

      <div className="account-form-buttons add-address-actions">
        <Link to="/tai-khoan/dia-chi">Quay lại</Link>
        <button type="button" className="account-button-primary">Lưu địa chỉ</button>
      </div>
    </form>
  )
}
