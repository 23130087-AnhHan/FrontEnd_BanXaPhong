import { Link } from 'react-router-dom'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import ProductDescription from './components/ProductDescription'
import ProductReviews from './components/ProductReviews'
import ProductSuggestions from './components/ProductSuggestions'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <nav className="product-detail-breadcrumb" aria-label="Đường dẫn">
          <Link to="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products">Sản phẩm</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products">Xà phòng thiên nhiên</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Xà phòng Oải hương Pháp</span>
        </nav>

        <div className="product-detail-overview">
          <ProductGallery />
          <ProductInfo />
        </div>
        <ProductDescription />
        <ProductReviews />
        <ProductSuggestions />
      </div>
    </div>
  )
}
