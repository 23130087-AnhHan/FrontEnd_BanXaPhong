import { Link, useParams } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import AddAddressForm from './components/AddAddressForm'
import '../../styles/AccountPage.css'

export default function AddAddressPage() {
  const { addressId } = useParams()
  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan/dia-chi">Sổ địa chỉ</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{addressId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="addresses" />
        <AddAddressForm key={addressId ?? 'new'} />
      </div>
    </div>
  )
}
