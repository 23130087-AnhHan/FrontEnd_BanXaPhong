import { Link, useLocation } from 'react-router-dom'
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../components/Icon'
import type { Order } from '../MyOrders/components/OrderCard'
import './OrderReviewPage.css'

const previewOrder: Order = {
  id: 'SP261120-031',
  date: '20/11/2026',
  status: 'delivered',
  quantity: 3,
  total: '400.000 đ',
  update: 'Đơn hàng đã được giao thành công.',
  products: [
    {
      id: 'review-product-1',
      name: 'Xà bông thủ công Trái Bơ',
      image: 'https://www.lemai.com.vn/assets/anh-thu/xa-bong-trai-bo-avocado-thu-cong/xa-bong-trai-bo-avocado-thu-cong-le-mai-01.webp',
      weight: '100g',
      quantity: 2,
      price: '125.000 đ',
      total: '250.000 đ',
    },
    {
      id: 'review-product-2',
      name: 'Xà phòng Cold Process Motaluna',
      image: 'https://moonsoap.me/_astro/motaluna.BLhnAFf6_1o9cMJ.webp',
      weight: '100g',
      quantity: 1,
      price: '150.000 đ',
      total: '150.000 đ',
    },
  ],
}

export default function OrderReviewPage() {
  const location = useLocation()
  const order = (location.state as { order?: Order } | null)?.order ?? previewOrder

  return (
    <div className="order-review-page">
      <div className="order-review-container">
        <nav className="order-review-breadcrumb" aria-label="Đường dẫn">
          <Link to="/tai-khoan/don-hang"><Icon icon={faArrowLeft} />Đơn hàng của tôi</Link>
          <span aria-hidden="true">/</span>
          <span>#{order.id}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Đánh giá sản phẩm</span>
        </nav>

        <div className="order-review-heading">
          <h1>Đánh giá sản phẩm</h1>
          <p>Chia sẻ cảm nhận của bạn về những sản phẩm đã nhận từ Saponi.</p>
        </div>

        {order.status === 'delivered' ? (
          <>
            <div className="order-review-delivered">
              <Icon icon={faCircleCheck} />
              <div>
                <strong>Đơn hàng đã giao thành công</strong>
                <p>Cảm ơn bạn đã chọn Saponi. Hãy cho chúng tôi biết trải nghiệm của bạn nhé.</p>
              </div>
            </div>
          </>
        ) : (
          <section className="order-review-panel order-review-unavailable">
            <h2>Đơn hàng chưa thể đánh giá</h2>
            <p>Bạn có thể đánh giá sản phẩm sau khi đơn hàng được giao thành công.</p>
            <Link to="/tai-khoan/don-hang">Quay lại đơn hàng của tôi</Link>
          </section>
        )}
      </div>
    </div>
  )
}
