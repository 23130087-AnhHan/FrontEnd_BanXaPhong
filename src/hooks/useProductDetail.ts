import { useState, useEffect } from 'react'
import { fetchProductDetail, fetchProductImages, fetchProductVariants } from '../api/productApi'
import type { ProductDetailData, ProductImageData, ProductVariantData } from '../api/productApi'

export function useProductDetail(productId?: string) {
  const [product, setProduct] = useState<ProductDetailData | null>(null)
  const [images, setImages] = useState<ProductImageData[]>([])
  const [variants, setVariants] = useState<ProductVariantData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) return

    setLoading(true)
    Promise.all([
      fetchProductDetail(productId),
      fetchProductImages(productId),
      fetchProductVariants(productId)
    ]).then(([prod, imgs, vars]) => {
      setProduct(prod)
      setImages(imgs)
      setVariants(vars)
      setLoading(false)
    }).catch(() => {
      setError('Lỗi khi tải thông tin sản phẩm')
      setLoading(false)
    })
  }, [productId])

  return { product, images, variants, loading, error }
}
