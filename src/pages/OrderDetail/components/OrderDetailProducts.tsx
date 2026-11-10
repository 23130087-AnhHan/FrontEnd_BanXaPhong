import './OrderDetailProducts.css'

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const products = [
  { id: 1, name: 'Xà phòng Oải hương hữu cơ', weight: '100g', quantity: 2, total: '360.000 đ' },
  { id: 2, name: 'Xà phòng Trà xanh nguyên chất', weight: '200g', quantity: 1, total: '150.000 đ' },
  { id: 3, name: 'Xà phòng Đất sét hoa hồng', weight: '100g', quantity: 1, total: '195.000 đ' },
]

export default function OrderDetailProducts() {
  return (
    <section className="order-detail-panel" aria-labelledby="order-detail-products-title">
      <div className="order-detail-panel-title">
        <h2 id="order-detail-products-title">Sản phẩm trong kiện hàng</h2>
        <span className="order-detail-product-count">(3 sản phẩm)</span>
      </div>

      <div className="order-detail-products">
        {products.map((product) => (
          <div className="order-detail-product" key={product.id}>
            <img src={productImage} alt="" width={80} height={80} />
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
