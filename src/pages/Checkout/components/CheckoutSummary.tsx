import { Link } from 'react-router-dom'
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './CheckoutSummary.css'

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const products = [
  { id: 1, name: 'Xà phòng Oải hương Pháp', price: '180.000 đ', quantity: 2, total: '360.000 đ' },
  { id: 2, name: 'Xà phòng Hoa hồng Đất sét', price: '155.000 đ', oldPrice: '190.000 đ', quantity: 1, total: '155.000 đ' },
]

export default function CheckoutSummary() {
  return (
    <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
      <div className="checkout-summary-heading">
        <h2 id="checkout-summary-title">Đơn hàng của bạn</h2>
        <span>3 sản phẩm</span>
      </div>

      <div className="checkout-products">
        {products.map((product) => (
          <div className="checkout-product" key={product.id}>
            <img src={productImage} alt="" width={68} height={76} />
            <div className="checkout-product-info">
              <h3>{product.name}</h3>
              <p>Bánh 100g</p>
              <p>{product.quantity} × {product.price} {product.oldPrice && <del>{product.oldPrice}</del>}</p>
              <strong>{product.total}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-coupon">
        <label htmlFor="checkout-coupon">Mã ưu đãi</label>
        <div className="checkout-coupon-input">
          <input id="checkout-coupon" type="text" placeholder="Nhập mã ưu đãi" />
          <button type="button">Áp dụng</button>
        </div>
      </div>

      <div className="checkout-costs">
        <dl>
          <div><dt>Tạm tính (3 sản phẩm)</dt><dd>515.000 đ</dd></div>
          <div><dt>Ưu đãi bổ sung</dt><dd>0 đ</dd></div>
          <div><dt>Phí giao hàng tiêu chuẩn</dt><dd>30.000 đ</dd></div>
        </dl>
        <div className="checkout-grand-total">
          <span>Tổng thanh toán</span>
          <strong>545.000 đ</strong>
        </div>
        <p className="checkout-cost-note">Đã bao gồm phí vận chuyển.</p>
        <p className="checkout-savings"><Icon icon={faTag} />Bạn đã tiết kiệm 35.000 đ trong giá sản phẩm.</p>
      </div>

      <Link to="/dat-hang-thanh-cong" className="checkout-pay">
        Thanh toán 545.000 đ
        <Icon icon={faArrowRight} />
      </Link>
      <p className="checkout-terms">
        Bằng việc thanh toán, bạn đồng ý với <span>Điều khoản mua hàng</span> và <span>Chính sách bảo mật</span> của Saponi.
      </p>
    </aside>
  )
}
