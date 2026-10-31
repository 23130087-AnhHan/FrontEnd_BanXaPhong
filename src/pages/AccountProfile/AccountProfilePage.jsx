import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import ProfileForm from './components/ProfileForm'
import '../../styles/AccountPage.css'

export default function AccountProfilePage() {
  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Thông tin cá nhân</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="profile" />
        <ProfileForm />
      </div>
    </div>
  )
}
