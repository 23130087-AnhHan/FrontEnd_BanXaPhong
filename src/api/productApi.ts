import type { Product } from '../data/products'

const API_URL = 'http://localhost:3001'

export interface ProductDetailData {
  id: string
  categoryId: string
  brandId: string
  name: string
  price: number
  oldPrice: number | null
  shortDescription: string
  description: string
  soldCount: number
  rating: number
  reviewCount: number
}

export interface ProductImageData {
  id: string
  productId: string
  imageUrl: string
  sortOrder: number
  isPrimary: boolean
}

export async function fetchProductDetail(productId: string): Promise<ProductDetailData | null> {
  const res = await fetch(`${API_URL}/products/${productId}`)
  if (!res.ok) return null
  return res.json()
}

export async function fetchProductImages(productId: string): Promise<ProductImageData[]> {
  const res = await fetch(`${API_URL}/productImages?productId=${productId}&_sort=sortOrder`)
  if (!res.ok) return []
  return res.json()
}

export interface ProductVariantData {
  id: string
  productId: string
  sku: string
  weightGrams: number
  price: number
  oldPrice: number | null
  stock: number
  isDefault: boolean
}

export async function fetchProductVariants(productId: string): Promise<ProductVariantData[]> {
  const res = await fetch(`${API_URL}/productVariants?productId=${productId}`)
  if (!res.ok) return []
  return res.json()
}

export interface ReviewData {
  id: string
  userId: string | null
  productId: string
  authorName: string
  rating: number
  comment: string
  weightGrams?: number
  images: string[]
  createdAt: string
}

export async function fetchProductReviews(productId: string): Promise<ReviewData[]> {
  const res = await fetch(`${API_URL}/reviews?productId=${productId}`)
  if (!res.ok) return []
  const reviews: ReviewData[] = await res.json()
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

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

