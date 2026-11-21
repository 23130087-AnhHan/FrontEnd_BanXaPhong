import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store/store'
import { loadProducts } from '../../../components/ProductSlice'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './RecommendedProducts.css'

export default function RecommendedProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const allProducts = useSelector((state: RootState) => state.products.items)
  const products = allProducts.slice(0, 4)

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

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
