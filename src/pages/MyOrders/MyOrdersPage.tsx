import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSidebar from '../../components/AccountSidebar'
import OrderCard from './components/OrderCard'
import { getOrders } from '../../api/orderApi'
import type { AccountOrder } from '../../api/orderApi'
import '../../styles/AccountPage.css'
import './MyOrdersPage.css'

type OrderFilter = 'all' | AccountOrder['status']

const filters: { status: OrderFilter; label: string }[] = [
  { status: 'all', label: 'Tất cả' },
  { status: 'pending', label: 'Chờ xác nhận' },
  { status: 'confirmed', label: 'Đã xác nhận' },
  { status: 'shipping', label: 'Đang giao' },
  { status: 'delivered', label: 'Đã giao' },
  { status: 'cancelled', label: 'Đã hủy' },
]


export default function MyOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('all')
  const [orders, setOrders] = useState<AccountOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    getOrders().then((data) => { if (active) setOrders(data) })
      .catch(() => { if (active) setError('Không tải được đơn hàng. Vui lòng thử lại.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])
  const filteredOrders = orders.filter((order) => activeFilter === 'all' || order.status === activeFilter)

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
            {filters.map((filter) => (
              <button
                key={filter.status}
                type="button"
                aria-pressed={activeFilter === filter.status}
                onClick={() => setActiveFilter(filter.status)}
              >
                {filter.label} ({orders.filter((order) => filter.status === 'all' || order.status === filter.status).length})
              </button>
            ))}
          </div>

          <div className="order-list-info">
            <span>{filteredOrders.length} đơn hàng</span>
            <span>Sắp xếp: Mới nhất trước</span>
          </div>

          <div className="order-list">
            {loading && <p className="account-message" role="status">Đang tải đơn hàng...</p>}
            {error && <p className="account-message account-error" role="alert">{error} <button type="button" disabled={loading} onClick={() => { setLoading(true); setError(''); setReload(reload + 1) }}>Thử lại</button></p>}
            {!loading && !error && filteredOrders.length === 0 && <p className="account-message">Chưa có đơn hàng trong mục này.</p>}
            {!loading && !error && filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
