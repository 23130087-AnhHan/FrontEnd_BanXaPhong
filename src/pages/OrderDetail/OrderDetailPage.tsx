import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import Icon from '../../components/Icon'
import OrderRecipientInfo from './components/OrderRecipientInfo'
import './OrderDetailPage.css'

export default function OrderDetailPage() {
  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        <div className="order-detail-meta">
          <nav className="order-detail-breadcrumb" aria-label="Đường dẫn">
            <Link to="/tai-khoan/don-hang"><Icon icon={faArrowLeft} />Trở về danh sách đơn hàng</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">#SPN-84920</span>
          </nav>
          <time dateTime="2024-10-28T14:30">14:30, 28/10/2024</time>
        </div>

        <div className="order-detail-tracking">
          <Link to="/tai-khoan/don-hang/track" className="order-detail-button">Theo dõi đơn hàng</Link>
        </div>

        <OrderRecipientInfo />
      </div>
    </div>
  )
}
