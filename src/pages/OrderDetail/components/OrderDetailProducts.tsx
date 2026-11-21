import type { AccountOrder } from '../../../api/orderApi'
import './OrderDetailProducts.css'

export default function OrderDetailProducts({ order }: { order: AccountOrder }) {
  return (
    <section className="order-detail-panel" aria-labelledby="order-detail-products-title">
      <div className="order-detail-panel-title">
        <h2 id="order-detail-products-title">Sản phẩm trong kiện hàng</h2>
        <span className="order-detail-product-count">({order.products.length} mặt hàng)</span>
      </div>

      <div className="order-detail-products">
        {order.products.map((product) => (
          <div className="order-detail-product" key={product.id}>
            <img src={product.image} alt="" width={80} height={80} />
            <div className="order-detail-product-info">
              <h3>{product.name}</h3>
              <div className="order-detail-product-meta">
                <span className="order-detail-product-weight">Khối lượng: {product.weight}</span>
                <span>SL: <strong>{product.quantity}</strong></span>
              </div>
            </div>
            <strong className="order-detail-product-total">{product.total}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
