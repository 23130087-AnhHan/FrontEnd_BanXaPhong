import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import OrderCard from './components/OrderCard'
import type { Order } from './components/OrderCard'
import '../../styles/AccountPage.css'
import './MyOrdersPage.css'

const filters = ['Tất cả (4)', 'Chờ xác nhận (1)', 'Đang giao (1)', 'Đã giao (1)', 'Đã hủy (1)']

const orders: Order[] = [
  {
    id: 'SP261027-018',
    date: '27/10/2026',
    status: 'pending',
    quantity: 3,
    total: '465.000 đ',
    update: 'Saponi đã nhận đơn và sẽ sớm xác nhận với bạn.',
    products: [
      { name: 'Xà phòng Trà xanh nguyên chất', quantity: 2, price: '150.000 đ', total: '300.000 đ' },
      { name: 'Xà phòng Mật ong & Yến mạch', quantity: 1, price: '165.000 đ', total: '165.000 đ' },
    ],
  },
  {
    id: 'SP261024-052',
    date: '24/10/2026',
    status: 'shipping',
    quantity: 2,
    total: '375.000 đ',
    update: 'Dự kiến giao: 28/10 – 29/10/2026',
    action: 'Theo dõi đơn',
    products: [
      { name: 'Xà phòng Oải hương hữu cơ', quantity: 1, price: '180.000 đ', total: '180.000 đ' },
      { name: 'Xà phòng Hoa hồng & Đất sét hồng', quantity: 1, price: '195.000 đ', total: '195.000 đ' },
    ],
  },
  {
    id: 'SP261008-031',
    date: '08/10/2026',
    status: 'delivered',
    quantity: 2,
    total: '330.000 đ',
    update: 'Đã giao thành công ngày 11/10/2026.',
    action: 'Mua lại',
    products: [
      { name: 'Xà phòng Mật ong & Yến mạch', quantity: 2, price: '165.000 đ', total: '330.000 đ' },
    ],
  },
  {
    id: 'SP260920-014',
    date: '20/09/2026',
    status: 'cancelled',
    quantity: 2,
    total: '350.000 đ',
    update: 'Đã hủy theo yêu cầu của bạn • Chưa thanh toán',
    action: 'Mua lại',
    products: [
      { name: 'Xà phòng Than tre & Bạc hà', quantity: 2, price: '175.000 đ', total: '350.000 đ' },
    ],
  },
]

export default function MyOrdersPage() {
  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Đơn hàng của tôi</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="orders" />
        <section className="account-form" aria-labelledby="my-orders-title">
          <div className="account-form-heading">
            <h1 id="my-orders-title">Đơn hàng của tôi</h1>
            <p>Theo dõi hành trình đơn hàng và tìm lại những sản phẩm thiên nhiên bạn yêu thích.</p>
          </div>

          <div className="order-filters" role="group" aria-label="Lọc trạng thái đơn hàng">
            {filters.map((filter, index) => (
              <button key={filter} type="button" aria-pressed={index === 0}>{filter}</button>
            ))}
          </div>

          <div className="order-list-info">
            <span>{orders.length} đơn hàng</span>
            <span>Sắp xếp: Mới nhất trước</span>
          </div>

          <div className="order-list">
            {orders.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
