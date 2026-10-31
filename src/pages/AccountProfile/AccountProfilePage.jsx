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
        <ProfileForm />
      </div>
    </div>
  )
}
