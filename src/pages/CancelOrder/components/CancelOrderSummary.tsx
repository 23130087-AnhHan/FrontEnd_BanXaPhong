import type { Order } from '../../MyOrders/components/OrderCard'
import './CancelOrderSummary.css'

export interface CancelOrderDetails extends Order {
  placedTime?: string
  shippingFee?: number
  discount?: number
  customerName?: string
  customerPhone?: string
  paymentMethod?: string
  products: (Order['products'][number] & { weight?: string })[]
}

interface CancelOrderSummaryProps {
  order: CancelOrderDetails
}

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const orderStatuses = {
  pending: 'Chờ xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã huỷ',
}

function formatPrice(amount: number) {
  return amount.toLocaleString('vi-VN') + ' đ'
}

export default function CancelOrderSummary({ order }: CancelOrderSummaryProps) {
  const subtotal = order.products.reduce(
    (sum, product) => sum + Number(product.total.replace(/\D/g, '')),
    0,
  )
  const discount = order.discount ?? 0

  return (
    <aside
      className="cancel-order-panel cancel-summary"
      aria-labelledby="cancel-summary-title"
    >
      <h2 id="cancel-summary-title">Đơn hàng cần huỷ</h2>
      <div className="cancel-summary-heading">
        <strong>#{order.id}</strong>
        <span>{orderStatuses[order.status]}</span>
      </div>
      <p className="cancel-summary-date">
        {order.placedTime ? 'Đặt lúc ' + order.placedTime + ', ' : 'Ngày đặt: '}{order.date}
      </p>

      <div className="cancel-summary-products">
        {order.products.map((product) => (
          <div key={product.name} className="cancel-summary-product">
            <img src={productImage} alt="" width={64} height={64} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.weight || '100g'} - SL: {product.quantity}</p>
              <strong>{product.total}</strong>
            </div>
          </div>
        ))}
      </div>

      <dl className="cancel-summary-costs">
        <div>
          <dt>Tạm tính ({order.quantity} sản phẩm)</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Phí vận chuyển</dt>
          <dd>{formatPrice(order.shippingFee ?? 0)}</dd>
        </div>
        <div className="cancel-summary-discount">
          <dt>Giảm giá voucher</dt>
          <dd>
            {discount > 0 ? '-' : ''}{formatPrice(discount)}
          </dd>
        </div>
      </dl>
      <div className="cancel-summary-total">
        <span>Tổng thanh toán</span>
        <strong>{order.total}</strong>
      </div>
      <p className="cancel-summary-note">Đã bao gồm VAT & phí vận chuyển</p>

      <div className="cancel-summary-customer">
        <strong>{order.customerName ?? 'Trần Bảo Hoàng'} - {order.customerPhone ?? '0983 234 567'}</strong>
        <p>{order.paymentMethod ?? 'Thanh toán khi nhận hàng (COD)'}</p>
      </div>
    </aside>
  )
}
