import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Icon from '../../components/Icon'
import ShippingForm from './components/ShippingForm'
import CheckoutMethods from './components/CheckoutMethods'
import CheckoutSummary from './components/CheckoutSummary'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { items, selectedIds, status, saving } = useSelector((state: RootState) => state.cart)
  const products = items.filter((item) => selectedIds.includes(item.id))
  const shippingFee = 30000

  return (
    <div className="checkout-page">
      <nav className="checkout-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/gio-hang">Giỏ hàng</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Thanh toán</span>
      </nav>

      <h1>Thanh toán</h1>

      <div className="checkout-layout">
        <div className="checkout-main">
          <ShippingForm />
          <CheckoutMethods />
          <Link to="/gio-hang" className="checkout-back">
            <Icon icon={faArrowLeft} />
            Quay lại giỏ hàng
          </Link>
        </div>
        <CheckoutSummary products={products} shippingFee={shippingFee} busy={saving || status !== 'succeeded'} />
      </div>
    </div>
  )
}
