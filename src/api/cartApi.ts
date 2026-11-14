import type { Product } from '../data/products'

export interface CartItem {
  id: string
  productId: number
  name: string
  price: number
  oldPrice?: number
  unit: string
  image: string
  quantity: number
}

const API_URL = 'http://localhost:3001/cartItems'

async function request(path = '', options?: RequestInit) {
  const response = await fetch(API_URL + path, options)
  if (!response.ok) throw new Error('Không thể lưu hoặc tải giỏ hàng. Vui lòng thử lại.')
  return response
}

export async function getCartItems(): Promise<CartItem[]> {
  const response = await request()
  return response.json()
}

export async function updateCartQuantity(id: string, quantity: number): Promise<CartItem> {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new Error('Số lượng phải từ 1 đến 99.')
  }
  const response = await request('/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  })
  return response.json()
}

export async function addCartItem(product: Product): Promise<CartItem> {
  if (product.inStock === false) throw new Error('Sản phẩm đã hết hàng.')
  const items = await getCartItems()
  const existing = items.find((item) => item.productId === product.id)
  if (existing) return updateCartQuantity(existing.id, existing.quantity + 1)

  const response = await request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      unit: product.unit,
      image: product.image,
      quantity: 1,
    }),
  })
  return response.json()
}

export async function deleteCartItem(id: string): Promise<void> {
  await request('/' + encodeURIComponent(id), { method: 'DELETE' })
}
