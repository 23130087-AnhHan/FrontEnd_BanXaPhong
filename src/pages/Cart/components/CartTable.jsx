import { Link } from 'react-router-dom'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import Icon from '../../../components/Icon'
import './CartTable.css'

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const products = [
  {
    id: 1,
    name: 'Xà phòng Oải hương Pháp',
    price: '180.000 đ',
    quantity: 2,
    total: '360.000 đ',
  },
  {
    id: 2,
    name: 'Xà phòng Hoa hồng Đất sét',
    price: '155.000 đ',
    oldPrice: '190.000 đ',
    quantity: 1,
    total: '155.000 đ',
    discount: 'Tiết kiệm 35.000 đ',
  },
]

export default function CartTable() {
  return (
    <section className="cart-table" aria-label="Danh sách sản phẩm trong giỏ">
      <label className="cart-select-all">
        <input type="checkbox" defaultChecked />
        Chọn tất cả
      </label>

      <table className="cart-products-table" aria-label="Sản phẩm trong giỏ hàng">
        <colgroup>
          <col />
          <col className="cart-price-column" />
          <col className="cart-quantity-column" />
          <col className="cart-total-column" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">SẢN PHẨM</th>
            <th scope="col">ĐƠN GIÁ</th>
            <th scope="col">SỐ LƯỢNG</th>
            <th scope="col">THÀNH TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="cart-product">
                  <input type="checkbox" defaultChecked aria-label={'Chọn ' + product.name} />
                  <img src={productImage} alt="" width="104" height="104" />
                  <div className="cart-product-info">
                    <h2>{product.name}</h2>
                    <p>Bánh 100g</p>
                    {product.discount && <span className="cart-discount">{product.discount}</span>}
                  </div>
                </div>
              </td>
              <td className="cart-unit-price">
                <span className="cart-mobile-label">Đơn giá</span>
                <span>{product.price}</span>
                {product.oldPrice && <del>{product.oldPrice}</del>}
              </td>
              <td className="cart-quantity-cell">
                <span className="cart-mobile-label">Số lượng</span>
                <div className="cart-quantity">
                  <button type="button" aria-label={'Giảm số lượng ' + product.name}><Icon icon={faMinus} /></button>
                  <span>{product.quantity}</span>
                  <button type="button" aria-label={'Tăng số lượng ' + product.name}><Icon icon={faPlus} /></button>
                </div>
              </td>
              <td className="cart-total-cell">
                <span className="cart-mobile-label">Thành tiền</span>
                <strong>{product.total}</strong>
                <button type="button" className="cart-remove" aria-label={'Xóa ' + product.name}>
                  <Icon icon={faTrashCan} />
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-table-footer">
        <Link to="/products"><Icon icon={faArrowLeft} />Tiếp tục mua sắm</Link>
        <span>Bạn đã tiết kiệm 35.000 đ</span>
      </div>
    </section>
  )
}
