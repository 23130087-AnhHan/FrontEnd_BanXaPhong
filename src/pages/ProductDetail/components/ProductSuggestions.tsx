import { products as catalog } from '../../../data/products'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './ProductSuggestions.css'

const suggestedProducts = [catalog[1], catalog[2], catalog[4], catalog[6]]

export default function ProductSuggestions() {
  return (
    <section className="product-suggestions" aria-labelledby="product-suggestions-title">
      <div className="product-suggestions-heading">
        <h2 id="product-suggestions-title">Gợi ý sản phẩm</h2>
        <Link to="/products">Xem tất cả bộ sưu tập <Icon icon={faArrowRight} /></Link>
      </div>
      <ProductList products={suggestedProducts} />
    </section>
  )
}
