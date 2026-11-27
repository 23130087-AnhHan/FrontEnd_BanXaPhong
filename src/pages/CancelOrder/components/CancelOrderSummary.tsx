import { formatMoney, orderStatusLabels, paymentStatusLabels } from '../../../api/orderApi'
import type { AccountOrder } from '../../../api/orderApi'
import './CancelOrderSummary.css'

interface CancelOrderSummaryProps {
  order: AccountOrder
}

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

export default function CancelOrderSummary({ order }: CancelOrderSummaryProps) {
  return (
    <aside className="cancel-order-panel cancel-summary" aria-labelledby="cancel-summary-title">
      <h2 id="cancel-summary-title">Đơn hàng cần huỷ</h2>
      <div className="cancel-summary-heading">
        <strong>#{order.id}</strong>
        <span>{orderStatusLabels[order.status]}</span>
      </div>
      <p className="cancel-summary-date">
        Ngày đặt: {order.date}
      </p>

      <div className="cancel-summary-products">
        {order.products.map((product) => (
          <div key={product.id} className="cancel-summary-product">
            <img src={product.image || productImage} alt="" width={64} height={64} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.weight || 'Chưa cập nhật phân loại'} - SL: {product.quantity}</p>
              <strong>{product.total}</strong>
            </div>
          </div>
        ))}
      </div>

      <dl className="cancel-summary-costs">
        <div>
          <dt>Tạm tính ({order.quantity} sản phẩm)</dt>
          <dd>{formatMoney(order.subtotal)}</dd>
        </div>
        <div>
          <dt>Phí vận chuyển</dt>
          <dd>{formatMoney(order.shippingFee)}</dd>
        </div>
        <div className="cancel-summary-discount">
          <dt>Giảm giá voucher</dt>
          <dd>
            {order.discount > 0 ? '-' : ''}{formatMoney(order.discount)}
          </dd>
        </div>
      </dl>
      <div className="cancel-summary-total">
        <span>Tổng thanh toán</span>
        <strong>{order.total}</strong>
      </div>
      <p className="cancel-summary-note">Đã bao gồm VAT & phí vận chuyển</p>

      <div className="cancel-summary-customer">
        <strong>{order.shippingAddress.receiverName} - {order.shippingAddress.receiverPhone}</strong>
        <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'VNPay'} - {paymentStatusLabels[order.paymentStatus] || order.paymentStatus}</p>
      </div>
    </aside>
  )
}
