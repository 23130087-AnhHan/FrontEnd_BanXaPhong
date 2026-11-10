import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import Icon from '../../../components/Icon'
import './OrderPaymentSummary.css'

export default function OrderPaymentSummary() {
  return (
    <section className="order-detail-panel" aria-labelledby="order-payment-title">
      <div className="order-detail-panel-title">
        <h2 id="order-payment-title">Tóm tắt thanh toán</h2>
      </div>
      <dl className="order-detail-costs">
        <div><dt>Tạm tính (4 sản phẩm)</dt><dd>705.000 đ</dd></div>
        <div><dt>Phí vận chuyển</dt><dd>25.000 đ</dd></div>
        <div className="order-detail-discount"><dt><Icon icon={faTag} />Giảm giá voucher</dt><dd>-30.000 đ</dd></div>
      </dl>
      <div className="order-detail-payment-total">
        <div>
          <strong>Tổng thanh toán</strong>
          <p>Đã bao gồm VAT &amp; phí vận chuyển</p>
        </div>
        <strong>700.000 đ</strong>
      </div>
    </section>
  )
}
