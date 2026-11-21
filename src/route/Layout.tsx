import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { clearFeedback, loadCart, resetCart } from '../store/cartSlice'
import { store } from '../store/store'
import { layNguoiDungHienTai } from '../api/authApi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Icon from '../components/Icon'

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, saving, error, message } = useSelector((state: RootState) => state.cart)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    function syncCart() {
      const userId = layNguoiDungHienTai()?.id ?? null
      const cart = store.getState().cart
      if (cart.userId !== userId) {
        dispatch(resetCart(userId))
        dispatch(loadCart())
      } else if (cart.status === 'idle') dispatch(loadCart())
    }
    syncCart()
    window.addEventListener('auth-change', syncCart)
    window.addEventListener('storage', syncCart)
    return () => {
      window.removeEventListener('auth-change', syncCart)
      window.removeEventListener('storage', syncCart)
    }
  }, [dispatch])

  useEffect(() => {
    if (!message || saving || error) return
    const timer = window.setTimeout(() => dispatch(clearFeedback()), 5000)
    return () => window.clearTimeout(timer)
  }, [dispatch, message, saving, error, items])

  return (
    <>
      <Header cartCount={cartCount} />
      {(saving || error || message) && (
        <aside className={'cart-feedback' + (error ? ' cart-feedback-error' : '')} role={error ? 'alert' : 'status'} aria-atomic="true">
          <span className="cart-feedback-icon"><Icon icon={error ? faCircleExclamation : saving ? faBagShopping : faCheck} /></span>
          <div className="cart-feedback-content">
            <strong>{error ? 'Chưa thể cập nhật giỏ hàng' : saving ? 'Đang cập nhật giỏ hàng' : message.startsWith('Đã thêm ') ? 'Đã thêm vào giỏ hàng' : 'Đã cập nhật giỏ hàng'}</strong>
            <p>{error || (saving ? 'Vui lòng chờ trong giây lát...' : message)}</p>
            {!saving && (error ? (
              <button type="button" className="cart-feedback-link" onClick={() => dispatch(loadCart())}>Tải lại giỏ <Icon icon={faArrowRight} /></button>
            ) : (
              <Link to="/gio-hang" className="cart-feedback-link" onClick={() => { dispatch(clearFeedback()); window.scrollTo(0, 0) }}>Xem giỏ hàng <Icon icon={faArrowRight} /></Link>
            ))}
          </div>
          {!saving && <button type="button" className="cart-feedback-close" aria-label="Đóng thông báo giỏ hàng" onClick={() => dispatch(clearFeedback())}><Icon icon={faXmark} /></button>}
        </aside>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
