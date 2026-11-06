import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Icon from '../../components/Icon'
import ShippingForm from './components/ShippingForm'
import CheckoutMethods from './components/CheckoutMethods'
import CheckoutSummary from './components/CheckoutSummary'
import './CheckoutPage.css'

export default function CheckoutPage() {
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
        <CheckoutSummary />
      </div>
    </div>
  )
}
