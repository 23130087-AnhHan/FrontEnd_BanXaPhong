import type { Product } from '../data/products'

const API_URL = 'http://localhost:3001'

interface RawProduct {
  id: string
  categoryId: string
  brandId: string
  sku: string
  name: string
  price: number
  oldPrice: number | null
  shortDescription?: string
  description?: string
  soldCount: number
  viewCount: number
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  createdAt: string
}

interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  sortOrder: number
  isPrimary: boolean
}

export async function fetchProductsWithImages(): Promise<Product[]> {
  const [resProducts, resImages] = await Promise.all([
    fetch(`${API_URL}/products`),
    fetch(`${API_URL}/productImages`),
  ])

  if (!resProducts.ok) {
    throw new Error('Không thể tải danh sách sản phẩm từ máy chủ')
  }

  const rawProducts: RawProduct[] = await resProducts.json()
  const images: ProductImage[] = resImages.ok ? await resImages.json() : []

  // Map hình ảnh theo productId (ưu tiên isPrimary hoặc hình đầu tiên)
  const imageMap = new Map<string, string>()
  for (const img of images) {
    if (!imageMap.has(img.productId) || img.isPrimary) {
      imageMap.set(img.productId, img.imageUrl)
    }
  }

  const defaultImg = 'https://images.unsplash.com/photo-1607006314644-8cbdf6a94f6c?auto=format&fit=crop&w=600&q=80'

  return rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    unit: 'bánh 100g',
    rating: p.rating ?? 5,
    soldCount: p.soldCount,
    image: imageMap.get(p.id) || defaultImg,
    inStock: true,
    category: p.categoryId,
  }))
}

