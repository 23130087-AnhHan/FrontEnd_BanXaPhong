import type { Product } from '../data/products'
import { layNguoiDungHienTai } from './authApi'
import { accountFilter, currentUserId } from './accountApi'

export interface CartItem {
  id: string
  userId?: string
  productId: string | number
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

export async function getCartItems(userId = layNguoiDungHienTai()?.id): Promise<CartItem[]> {
  if (!userId) return []
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng thử lại.')
  const response = await request(accountFilter('userId', userId))
  const items: CartItem[] = await response.json()
  return items.filter((item) => item.userId === userId)
}

async function getOwnedItem(id: string, userId: string): Promise<CartItem> {
  const response = await request('/' + encodeURIComponent(id))
  const item: CartItem = await response.json()
  if (item.userId !== userId || currentUserId() !== userId) {
    throw new Error('Không tìm thấy sản phẩm trong giỏ hàng của bạn.')
  }
  return item
}

export async function updateCartQuantity(id: string, quantity: number, userId = currentUserId()): Promise<CartItem> {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new Error('Số lượng phải từ 1 đến 99.')
  }
  await getOwnedItem(id, userId)
  const response = await request('/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  })
  return response.json()
}

export async function addCartItem(product: Product): Promise<CartItem> {
  const userId = currentUserId()
  if (product.inStock === false) throw new Error('Sản phẩm đã hết hàng.')
  const items = await getCartItems(userId)
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng thử lại.')
  const existing = items.find((item) => String(item.productId) === String(product.id))
  if (existing) return updateCartQuantity(existing.id, existing.quantity + 1, userId)

  const response = await request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
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
  await getOwnedItem(id, currentUserId())
  await request('/' + encodeURIComponent(id), { method: 'DELETE' })
}
