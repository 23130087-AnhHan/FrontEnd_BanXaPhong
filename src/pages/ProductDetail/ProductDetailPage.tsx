import { Link, useParams } from 'react-router-dom'
import { useProductDetail } from '../../hooks/useProductDetail'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import ProductDescription from './components/ProductDescription'
import ProductReviews from './components/ProductReviews'
import ProductSuggestions from './components/ProductSuggestions'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const { product, images, variants, loading, error } = useProductDetail(productId)

  if (loading) return <div className="product-detail-page"><p>Đang tải...</p></div>
  if (error || !product) return <div className="product-detail-page"><p>{error || 'Không tìm thấy sản phẩm.'}</p></div>

  const primaryImage = images.find((img) => img.isPrimary)?.imageUrl || images[0]?.imageUrl || ''

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <nav className="product-detail-breadcrumb" aria-label="Đường dẫn">
          <Link to="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products">Sản phẩm</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="product-detail-overview">
          <ProductGallery images={images} productName={product.name} />
          <ProductInfo product={product} variants={variants} primaryImage={primaryImage} />
        </div>
        <ProductDescription description={product.description} />
        <ProductReviews productId={product.id} reviewCount={product.reviewCount} rating={product.rating} />
        <ProductSuggestions currentProductId={product.id} categoryId={product.categoryId} />
      </div>
    </div>
  )
}
