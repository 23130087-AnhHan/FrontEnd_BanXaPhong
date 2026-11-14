import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { changeQuantity } from '../../store/cartSlice'
import { faLeaf } from '@fortawesome/free-solid-svg-icons/faLeaf'
import Icon from '../../components/Icon'
import CartTable from './components/CartTable'
import CartSummary from './components/CartSummary'
import './CartPage.css'

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, saving } = useSelector((state: RootState) => state.cart)

  return (
    <div className="cart-page">
      <nav className="cart-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Giỏ hàng</span>
      </nav>

      <h1>Giỏ hàng của bạn</h1>

      <div className="cart-layout">
        <div className="cart-main">
          <CartTable
            products={items}
            busy={saving || status !== 'succeeded'}
            onQuantityChange={(id, quantity) => dispatch(changeQuantity({ id, quantity }))}
          />
          <div className="cart-benefit">
            <Icon icon={faLeaf} />
            <div>
              <h2>Dịu lành từ thiên nhiên, chăm chút bằng đôi tay</h2>
              <p>Xà phòng thủ công • Nguyên liệu thiên nhiên • Không chất bảo quản</p>
            </div>
          </div>
        </div>
        <CartSummary />
      </div>
    </div>
  )
}
