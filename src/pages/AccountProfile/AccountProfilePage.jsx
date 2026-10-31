import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import ProfileForm from './components/ProfileForm'
import './AccountProfilePage.css'

export default function AccountProfilePage() {
  return (
    <div className="account-profile-page">
      <nav className="profile-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Thông tin cá nhân</span>
      </nav>

      <div className="account-profile-layout">
        <AccountSidebar activePage="profile" />
        <section className="account-profile-content" aria-labelledby="profile-title">
          <h1 id="profile-title">Thông tin cá nhân</h1>
          <p className="account-profile-description">
            Cập nhật thông tin liên hệ, số điện thoại và địa chỉ email để nhận thông báo đơn hàng và ưu đãi từ Saponi.
          </p>
          <ProfileForm />
        </section>
      </div>
    </div>
  )
}
