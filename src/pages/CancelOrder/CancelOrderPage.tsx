import { Link, useLocation, useNavigate } from 'react-router-dom'
import { faArrowLeft, faHeadset } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../components/Icon'
import CancelReasonForm from './components/CancelReasonForm'
import CancelOrderSummary from './components/CancelOrderSummary'
import type { CancelOrderDetails } from './components/CancelOrderSummary'
import CancelOrderActions from './components/CancelOrderActions'
import './CancelOrderPage.css'

const previewOrder: CancelOrderDetails = {
  id: 'SPN-84920',
  date: '28/10/2024',
  placedTime: '14:30',
  status: 'pending',
  quantity: 4,
  total: '700.000 đ',
  update: '',
  shippingFee: 25000,
  discount: 30000,
  customerName: 'Trần Bảo Hoàng',
  customerPhone: '0983 234 567',
  paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  products: [
    {
      name: 'Xà phòng Oải hương hữu cơ',
      weight: '100g',
      quantity: 2,
      price: '180.000 đ',
      total: '360.000 đ',
    },
    {
      name: 'Xà phòng Trà xanh nguyên chất',
      weight: '200g',
      quantity: 1,
      price: '150.000 đ',
      total: '150.000 đ',
    },
    {
      name: 'Xà phòng Đất sét hoa hồng',
      weight: '100g',
      quantity: 1,
      price: '195.000 đ',
      total: '195.000 đ',
    },
  ],
}

export default function CancelOrderPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const order = (location.state as { order?: CancelOrderDetails } | null)?.order ?? previewOrder

  function handleCancelOrder() {
    navigate('/tai-khoan/don-hang', { state: { cancelledOrderId: order.id } })
  }

  return (
    <div className="cancel-order-page">
      <div className="cancel-order-container">
        <nav className="cancel-order-breadcrumb" aria-label="Đường dẫn">
          <Link to="/tai-khoan/don-hang">
            <Icon icon={faArrowLeft} />{' '}
            Đơn hàng của tôi
          </Link>
          <span aria-hidden="true">/</span>
          <span>#{order.id}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Huỷ đơn hàng</span>
        </nav>

        <div className="cancel-order-heading">
          <h1>Huỷ đơn hàng</h1>
          <p>Vui lòng kiểm tra đúng đơn hàng và cho Saponi biết lý do bạn muốn huỷ.</p>
        </div>
        <div className="cancel-order-layout">
          <CancelReasonForm onConfirm={handleCancelOrder} />
          <CancelOrderSummary order={order} />
          <CancelOrderActions />
          <p className="cancel-order-help">
            <Icon icon={faHeadset} />
            Cần trợ giúp?{' '}
            <Link to="/contact">Liên hệ Saponi</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
