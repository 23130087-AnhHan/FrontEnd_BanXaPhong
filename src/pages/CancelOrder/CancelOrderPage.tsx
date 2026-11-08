import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../components/Icon'
import './CancelOrderPage.css'

export default function CancelOrderPage() {
  return (
    <div className="cancel-order-page">
      <div className="cancel-order-container">
        <nav className="cancel-order-breadcrumb" aria-label="Đường dẫn">
          <Link to="/tai-khoan/don-hang"><Icon icon={faArrowLeft} /> Đơn hàng của tôi</Link>
          <span aria-hidden="true">/</span>
          <span>#SPN-84920</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Huỷ đơn hàng</span>
        </nav>

        <div className="cancel-order-heading">
          <h1>Huỷ đơn hàng</h1>
          <p>Vui lòng kiểm tra đúng đơn hàng và cho Saponi biết lý do bạn muốn huỷ.</p>
        </div>
      </div>
    </div>
  )
}
