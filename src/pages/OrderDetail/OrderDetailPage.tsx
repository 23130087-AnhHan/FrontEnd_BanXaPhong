import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import Icon from '../../components/Icon'
import OrderRecipientInfo from './components/OrderRecipientInfo'
import OrderDetailProducts from './components/OrderDetailProducts'
import OrderPaymentSummary from './components/OrderPaymentSummary'
import './OrderDetailPage.css'

export default function OrderDetailPage() {
  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        <div className="order-detail-meta">
          <nav className="order-detail-breadcrumb" aria-label="Đường dẫn">
            <Link to="/tai-khoan/don-hang" reloadDocument><Icon icon={faArrowLeft} />Trở về danh sách đơn hàng</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">#SPN-84920</span>
          </nav>
          <time dateTime="2024-10-28T14:30">14:30, 28/10/2024</time>
        </div>

        <div className="order-detail-tracking">
          <Link to="/tai-khoan/don-hang/track" className="order-detail-button" reloadDocument>Theo dõi đơn hàng</Link>
        </div>

        <OrderRecipientInfo />
        <OrderDetailProducts />
        <OrderPaymentSummary />

        <div className="order-detail-actions">
          <Link to="/tai-khoan/don-hang/cancel" className="order-detail-button order-detail-cancel" reloadDocument>
            <Icon icon={faXmark} />Hủy đơn
          </Link>
          <Link to="/gio-hang" className="order-detail-button order-detail-button-primary" reloadDocument>
            <Icon icon={faRepeat} />Mua lại
          </Link>
        </div>
      </div>
    </div>
  )
}
