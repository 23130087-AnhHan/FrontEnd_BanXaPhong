import { Link } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../components/Icon'
import OrderShippingInfo from './components/OrderShippingInfo'
import RecommendedProducts from './components/RecommendedProducts'
import './OrderSuccessPage.css'

export default function OrderSuccessPage() {
  return (
    <div className="order-success-page">
      <nav className="order-success-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/gio-hang">Giỏ hàng</Link>
        <span aria-hidden="true">/</span>
        <Link to="/thanh-toan">Thanh toán</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Hoàn tất</span>
      </nav>

      <section className="order-success-message" aria-labelledby="order-success-title">
        <div className="order-success-check"><Icon icon={faCheck} /></div>
        <h1 id="order-success-title">Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã chọn Saponi. Đơn hàng của bạn sẽ sớm được giao đến bạn.</p>
        <div className="order-success-actions">
          <Link to="/tai-khoan/don-hang" className="order-success-primary">
            Xem đơn hàng <Icon icon={faArrowRight} />
          </Link>
          <Link to="/products">Tiếp tục mua sắm</Link>
        </div>
      </section>
      <OrderShippingInfo />
      <RecommendedProducts />
    </div>
  )
}
