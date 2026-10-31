import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import ChangePasswordForm from './components/ChangePasswordForm'
import '../../styles/AccountPage.css'

export default function ChangePasswordPage() {
  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Đổi mật khẩu</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="password" />
        <ChangePasswordForm />
      </div>
    </div>
  )
}
