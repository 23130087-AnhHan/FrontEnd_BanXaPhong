import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { clearFeedback, loadCart } from '../store/cartSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, saving, error, message } = useSelector((state: RootState) => state.cart)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    dispatch(loadCart())
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
