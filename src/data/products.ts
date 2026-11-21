export interface Product {
  id: string | number
  name: string
  price: number
  oldPrice?: number | null
  unit?: string
  rating?: number
  soldCount?: string | number
  image: string
  category?: string
  brandId?: string
  inStock?: boolean
}
