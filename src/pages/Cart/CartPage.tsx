import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { changeQuantity, loadCart, removeFromCart, toggleItem, toggleAll } from '../../store/cartSlice'
import { faLeaf } from '@fortawesome/free-solid-svg-icons/faLeaf'
import Icon from '../../components/Icon'
import CartTable from './components/CartTable'
import CartSummary from './components/CartSummary'
import './CartPage.css'

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, saving, selectedIds } = useSelector((state: RootState) => state.cart)
  const selectedItems = items.filter((item) => selectedIds.includes(item.id))
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const busy = saving || status !== 'succeeded'

  return (
    <div className="cart-page">
      <nav className="cart-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Giỏ hàng</span>
      </nav>

      <h1>Giỏ hàng của bạn</h1>

      <div className="cart-layout" aria-busy={saving || status === 'loading'}>
        <div className="cart-main">
          {(status === 'idle' || status === 'loading') && (
            <div className="cart-state" role="status">Đang tải giỏ hàng...</div>
          )}
          {status === 'failed' && (
            <div className="cart-state">
              <p>Chưa tải được giỏ hàng.</p>
              <button type="button" onClick={() => dispatch(loadCart())}>Thử lại</button>
            </div>
          )}
          {status === 'succeeded' && items.length === 0 && (
            <div className="cart-state">
              <p>Giỏ hàng của bạn đang trống.</p>
              <Link to="/products">Tiếp tục mua sắm</Link>
            </div>
          )}
          {status === 'succeeded' && items.length > 0 && <CartTable
            products={items}
            busy={busy}
            selectedIds={selectedIds}
            onToggle={(id) => dispatch(toggleItem(id))}
            onToggleAll={() => dispatch(toggleAll())}
            onQuantityChange={(id, quantity) => dispatch(changeQuantity({ id, quantity }))}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />}
          <div className="cart-benefit">
            <Icon icon={faLeaf} />
            <div>
              <h2>Dịu lành từ thiên nhiên, chăm chút bằng đôi tay</h2>
              <p>Xà phòng thủ công • Nguyên liệu thiên nhiên • Không chất bảo quản</p>
            </div>
          </div>
        </div>
        <CartSummary itemCount={itemCount} total={total} busy={busy} />
      </div>
    </div>
  )
}
