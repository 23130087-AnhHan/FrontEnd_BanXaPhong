import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AccountSidebar from '../../components/AccountSidebar'
import Icon from '../../components/Icon'
import AddressCard from './components/AddressCard'
import '../../styles/AccountPage.css'
import './AddressBookPage.css'

const addresses = [
  {
    id: 1,
    name: 'Nguyễn Văn Anh Hàn',
    phone: '090 123 4567',
    address: '12A Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Nguyễn Ngọc Anh',
    phone: '090 987 6543',
    address: 'Tầng 8, Tòa nhà Sky City, 88 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  },
  {
    id: 3,
    name: 'Mẹ Linh',
    phone: '090 555 1234',
    address: '45/12 Đường Lê Văn Sỹ, Phường 13, Quận Phú Nhuận, TP. Hồ Chí Minh',
  },
]

export default function AddressBookPage() {
  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Sổ địa chỉ</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="addresses" />
        <section className="account-form" aria-labelledby="address-book-title">
          <div className="address-book-header">
            <div className="account-form-heading">
              <h1 id="address-book-title">Sổ địa chỉ</h1>
              <p>Bạn đã lưu 3 địa chỉ giao hàng. Địa chỉ mặc định sẽ được sử dụng cho đơn hàng tiếp theo.</p>
            </div>
            <div className="address-add">
              <Link to="/tai-khoan/dia-chi/them-moi" className="address-add-button">
                <Icon icon={faPlus} />
                Thêm địa chỉ mới
              </Link>
            </div>
          </div>

          <div className="address-book-list">
            {addresses.map((address) => <AddressCard key={address.id} address={address} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
