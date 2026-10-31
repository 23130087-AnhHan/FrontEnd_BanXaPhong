import { Link } from 'react-router-dom'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import { faReceipt } from '@fortawesome/free-solid-svg-icons/faReceipt'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket'
import Icon from './Icon'
import './AccountSidebar.css'

const items = [
  { id: 'profile', label: 'Thông tin cá nhân', href: '/tai-khoan', icon: faUser },
  { id: 'orders', label: 'Đơn hàng của tôi', href: '/tai-khoan/don-hang', icon: faReceipt },
  { id: 'password', label: 'Đổi mật khẩu', href: '/tai-khoan/doi-mat-khau', icon: faLock },
  { id: 'addresses', label: 'Sổ địa chỉ', href: '/tai-khoan/dia-chi', icon: faLocationDot },
]

export default function AccountSidebar({ activePage = 'profile' }) {
  return (
    <aside className="account-sidebar">
      <h2>Quản lý tài khoản</h2>
      <p>Theo dõi và cập nhật thông tin cá nhân, bảo mật và địa chỉ giao hàng.</p>

      <nav className="account-sidebar-nav" aria-label="Điều hướng tài khoản">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="account-sidebar-item"
            aria-current={activePage === item.id ? 'page' : undefined}
          >
            <span className="account-sidebar-icon"><Icon icon={item.icon} /></span>
            {item.label}
          </Link>
        ))}
        <button className="account-sidebar-item" type="button">
          <span className="account-sidebar-icon"><Icon icon={faArrowRightFromBracket} /></span>
          Đăng xuất
        </button>
      </nav>
    </aside>
  )
}
