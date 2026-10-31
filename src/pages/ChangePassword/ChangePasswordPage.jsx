import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import ChangePasswordForm from './components/ChangePasswordForm'
import './ChangePasswordPage.css'

export default function ChangePasswordPage() {
  return (
    <div className="change-password-page">
      <nav className="password-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Đổi mật khẩu</span>
      </nav>

      <div className="change-password-layout">
        <AccountSidebar activePage="password" />
        <ChangePasswordForm />
      </div>
    </div>
  )
}
