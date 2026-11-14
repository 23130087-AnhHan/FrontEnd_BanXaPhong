import type { CartItem } from '../../../api/cartApi'
import { Link } from 'react-router-dom'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import Icon from '../../../components/Icon'
import './CartTable.css'

interface CartTableProps {
  products: CartItem[]
  busy: boolean
  selectedIds: string[]
  onToggle: (id: string) => void
  onToggleAll: () => void
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartTable({ products, busy, selectedIds, onToggle, onToggleAll, onQuantityChange, onRemove }: CartTableProps) {
  const selectedProducts = products.filter((product) => selectedIds.includes(product.id))
  const savings = selectedProducts.reduce((sum, product) => sum + Math.max(0, (product.oldPrice ?? product.price) - product.price) * product.quantity, 0)

  return (
    <section className="cart-table" aria-label="Danh sách sản phẩm trong giỏ">
      <label className="cart-select-all">
        <input
          type="checkbox"
          checked={products.length > 0 && selectedIds.length === products.length}
          disabled={busy || products.length === 0}
          onChange={onToggleAll}
          ref={(input) => { if (input) input.indeterminate = selectedIds.length > 0 && selectedIds.length < products.length }}
        />
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
                  <input type="checkbox" checked={selectedIds.includes(product.id)} disabled={busy} onChange={() => onToggle(product.id)} aria-label={'Chọn ' + product.name} />
                  <img src={product.image} alt="" width="104" height="104" />
                  <div className="cart-product-info">
                    <h2>{product.name}</h2>
                    <p>{product.unit}</p>
                    {product.oldPrice != null && product.oldPrice > product.price && (
                      <span className="cart-discount">Tiết kiệm {((product.oldPrice - product.price) * product.quantity).toLocaleString('vi-VN')} đ</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="cart-unit-price">
                <span className="cart-mobile-label">Đơn giá</span>
                <span>{product.price.toLocaleString('vi-VN')} đ</span>
                {product.oldPrice != null && product.oldPrice > product.price && <del>{product.oldPrice.toLocaleString('vi-VN')} đ</del>}
              </td>
              <td className="cart-quantity-cell">
                <span className="cart-mobile-label">Số lượng</span>
                <div className="cart-quantity">
                  <button
                    type="button"
                    disabled={busy || product.quantity <= 1}
                    onClick={() => onQuantityChange(product.id, product.quantity - 1)}
                    aria-label={'Giảm số lượng ' + product.name}
                  ><Icon icon={faMinus} /></button>
                  <span>{product.quantity}</span>
                  <button
                    type="button"
                    disabled={busy || product.quantity >= 99}
                    onClick={() => onQuantityChange(product.id, product.quantity + 1)}
                    aria-label={'Tăng số lượng ' + product.name}
                  ><Icon icon={faPlus} /></button>
                </div>
              </td>
              <td className="cart-total-cell">
                <span className="cart-mobile-label">Thành tiền</span>
                <strong>{(product.price * product.quantity).toLocaleString('vi-VN')} đ</strong>
                <button type="button" className="cart-remove" disabled={busy} onClick={() => onRemove(product.id)} aria-label={'Xóa ' + product.name}>
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
        <span>Bạn đã tiết kiệm {savings.toLocaleString('vi-VN')} đ</span>
      </div>
    </section>
  )
}
