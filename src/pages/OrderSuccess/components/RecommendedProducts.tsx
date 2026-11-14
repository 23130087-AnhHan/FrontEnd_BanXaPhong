import { products as catalog } from '../../../data/products'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './RecommendedProducts.css'

const products = [catalog[1], catalog[2], catalog[4], catalog[6]]

export default function RecommendedProducts() {
  return (
    <section className="order-recommendations" aria-labelledby="order-recommendations-title">
      <div className="order-recommendations-heading">
        <h2 id="order-recommendations-title">Có thể bạn sẽ thích</h2>
        <Link to="/products">Xem tất cả bộ sưu tập <Icon icon={faArrowRight} /></Link>
      </div>
      <ProductList products={products} />
    </section>
  )
}
