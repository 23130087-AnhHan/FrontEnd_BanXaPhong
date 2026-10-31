import './ProfileForm.css'

export default function ProfileForm() {
  return (
    <form className="profile-form" aria-labelledby="profile-title">
      <div className="profile-form-heading">
        <h1 id="profile-title">Thông tin cá nhân</h1>
        <p>Cập nhật thông tin liên hệ, số điện thoại và địa chỉ email để nhận thông báo đơn hàng và ưu đãi từ Saponi.</p>
      </div>

      <div className="profile-form-fields">
        <div className="profile-field">
          <label htmlFor="profile-name">Họ và tên</label>
          <input id="profile-name" type="text" autoComplete="name" defaultValue="Nguyễn Văn Anh Hàn" />
        </div>

        <div className="profile-form-row">
          <div className="profile-field">
            <label htmlFor="profile-phone">Số điện thoại</label>
            <input id="profile-phone" type="tel" autoComplete="tel" defaultValue="090 123 4567" />
          </div>
          <div className="profile-field">
            <label htmlFor="profile-birthday">Ngày sinh</label>
            <input id="profile-birthday" type="text" autoComplete="bday" defaultValue="12/08/1994" />
          </div>
        </div>

        <div className="profile-field">
          <label htmlFor="profile-email">Địa chỉ email</label>
          <input id="profile-email" type="email" autoComplete="email" defaultValue="nguyenhan.be.dev@gmail.com" />
        </div>

        <div className="profile-field">
          <label htmlFor="profile-address">Địa chỉ giao hàng mặc định</label>
          <input
            id="profile-address"
            type="text"
            autoComplete="street-address"
            defaultValue="12A Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
          />
        </div>
      </div>

      <div className="profile-form-actions">
        <button type="reset">Huỷ bỏ</button>
        <button type="button" className="profile-save">Lưu thay đổi</button>
      </div>
    </form>
  )
}
