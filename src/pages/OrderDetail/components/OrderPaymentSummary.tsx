import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import Icon from '../../../components/Icon'
import { formatMoney } from '../../../api/orderApi'
import type { AccountOrder } from '../../../api/orderApi'
import './OrderPaymentSummary.css'

export default function OrderPaymentSummary({ order }: { order: AccountOrder }) {
  return (
    <section className="order-detail-panel" aria-labelledby="order-payment-title">
      <div className="order-detail-panel-title">
        <h2 id="order-payment-title">Tóm tắt thanh toán</h2>
      </div>
      <dl className="order-detail-costs">
        <div><dt>Tạm tính ({order.quantity} sản phẩm)</dt><dd>{formatMoney(order.subtotal)}</dd></div>
        <div><dt>Phí vận chuyển</dt><dd>{formatMoney(order.shippingFee)}</dd></div>
        <div className="order-detail-discount"><dt><Icon icon={faTag} />Giảm giá voucher</dt><dd>{order.discount > 0 ? '-' : ''}{formatMoney(order.discount)}</dd></div>
      </dl>
      <div className="order-detail-payment-total">
        <div>
          <strong>Tổng thanh toán</strong>
          <p>Đã bao gồm VAT &amp; phí vận chuyển</p>
        </div>
        <strong>{formatMoney(order.totalAmount)}</strong>
      </div>
    </section>
  )
}
