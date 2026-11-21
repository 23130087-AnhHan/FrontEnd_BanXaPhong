import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { clearFeedback, loadCart, resetCart } from '../store/cartSlice'
import { store } from '../store/store'
import { layNguoiDungHienTai } from '../api/authApi'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

  return (
    <>
      <Header cartCount={cartCount} />
      {(saving || error || message) && (
        <div className={'cart-feedback' + (error ? ' cart-feedback-error' : '')} role={error ? 'alert' : 'status'}>
          <span>{error || (saving ? 'Đang cập nhật giỏ hàng...' : message)}</span>
          {error && <button type="button" onClick={() => dispatch(loadCart())}>Tải lại giỏ</button>}
          {!saving && <button type="button" aria-label="Đóng thông báo giỏ hàng" onClick={() => dispatch(clearFeedback())}>Đóng</button>}
        </div>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
