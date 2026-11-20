import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductDetail, fetchProductImages } from '../../api/productApi'
import type { ProductDetailData, ProductImageData } from '../../api/productApi'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import ProductDescription from './components/ProductDescription'
import ProductReviews from './components/ProductReviews'
import ProductSuggestions from './components/ProductSuggestions'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<ProductDetailData | null>(null)
  const [images, setImages] = useState<ProductImageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    Promise.all([fetchProductDetail(productId), fetchProductImages(productId)]).then(([p, imgs]) => {
      setProduct(p)
      setImages(imgs)
      setLoading(false)
    })
  }, [productId])

  if (loading) return <div className="product-detail-page"><p>Đang tải...</p></div>
  if (!product) return <div className="product-detail-page"><p>Không tìm thấy sản phẩm.</p></div>

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
          <ProductInfo product={product} />
        </div>
        <ProductDescription description={product.description} />
        <ProductReviews productId={product.id} reviewCount={product.reviewCount} rating={product.rating} />
        <ProductSuggestions currentProductId={product.id} categoryId={product.categoryId} />
      </div>
    </div>
  )
}
