import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import Icon from '../../../components/Icon'
import type { Order } from '../../MyOrders/components/OrderCard'
import './ReviewOrderSummary.css'

interface ReviewOrderSummaryProps {
  order: Order
}

export default function ReviewOrderSummary({ order }: ReviewOrderSummaryProps) {
  return (
    <aside className="order-review-panel review-order-summary">
      <h2>Thông tin đơn hàng</h2>
      <div className="review-order-number">
        <strong>#{order.id}</strong>
        <span><Icon icon={faCircleCheck} />Đã giao</span>
      </div>

      <dl className="review-order-details">
        <div>
          <dt>Ngày đặt hàng</dt>
          <dd>{order.date}</dd>
        </div>
        <div>
          <dt>Số mặt hàng</dt>
          <dd>{order.products.length}</dd>
        </div>
        <div>
          <dt>Tổng số lượng</dt>
          <dd>{order.quantity} sản phẩm</dd>
        </div>
        <div className="review-order-total">
          <dt>Tổng thanh toán</dt>
          <dd>{order.total}</dd>
        </div>
      </dl>

      <div className="review-order-note">
        <h3>Chia sẻ trải nghiệm của bạn</h3>
        <p>Bạn có thể nhận xét về mùi hương, độ tạo bọt và cảm giác trên da sau khi dùng.</p>
        <p>Ảnh chụp thực tế sẽ giúp mọi người hiểu rõ hơn về sản phẩm.</p>
      </div>
    </aside>
  )
}
