import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { fetchProductsWithImages } from '../../../api/productApi'
import type { Product } from '../../../data/products'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './ProductSuggestions.css'

interface Props {
  currentProductId: string
  categoryId: string
}

export default function ProductSuggestions({ currentProductId, categoryId }: Props) {
  const [suggested, setSuggested] = useState<Product[]>([])

  useEffect(() => {
    fetchProductsWithImages().then((all) => {
      const sameCategory = all
        .filter((p) => String(p.id) !== currentProductId && p.category === categoryId)
        .slice(0, 4)
      setSuggested(sameCategory)
    })
  }, [currentProductId, categoryId])

  if (suggested.length === 0) return null

  return (
    <section className="product-suggestions" aria-labelledby="product-suggestions-title">
      <div className="product-suggestions-heading">
        <h2 id="product-suggestions-title">Gợi ý sản phẩm</h2>
        <Link to="/products">Xem tất cả bộ sưu tập <Icon icon={faArrowRight} /></Link>
      </div>
      <ProductList products={suggested} />
    </section>
  )
}
