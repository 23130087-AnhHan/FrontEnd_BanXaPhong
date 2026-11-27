import { accountFilter, accountRequest, currentUserId } from './accountApi'
import type { OrderItem, OrderRecord } from '../../shared/checkout.ts'
export type { OrderItem, OrderRecord } from '../../shared/checkout.ts'
import { fetchProductsWithImages } from './productApi'
import type { ProductVariantData } from './productApi'

export interface AccountOrder extends OrderRecord {
  date: string
  quantity: number
  total: string
  update: string
  products: { id: string; name: string; image: string; weight: string; quantity: number; price: string; total: string }[]
}


export const orderStatusLabels = { pending: 'Chờ xác nhận', shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }
export const formatMoney = (amount: number) => amount.toLocaleString('vi-VN') + ' đ'
export const paymentStatusLabels: Record<string, string> = { unpaid: 'Chưa thanh toán', pending: 'Chờ thanh toán', paid: 'Đã thanh toán', failed: 'Thanh toán chưa thành công' }

async function addOrderProducts(orders: OrderRecord[]): Promise<AccountOrder[]> {
  if (orders.length === 0) return []
  const [items, products, variants] = await Promise.all([
    accountRequest<OrderItem[]>('/orderItems' + accountFilter('orderId', orders.map((order) => order.id))),
    fetchProductsWithImages(),
    accountRequest<ProductVariantData[]>('/productVariants'),
  ])
  return orders.map((order) => {
    const orderItems = items.filter((item) => item.orderId === order.id)
    return {
      ...order,
      date: new Date(order.createdAt).toLocaleDateString('vi-VN'),
      quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total: formatMoney(order.totalAmount),
      update: orderStatusLabels[order.status],
      products: orderItems.map((item) => {
        const product = products.find((product) => String(product.id) === item.productId)
        const variant = variants.find((variant) => variant.id === item.variantId)
        return { id: item.id, name: product?.name ?? 'Sản phẩm không còn trong danh mục', image: product?.image ?? '', weight: variant && variant.weightGrams > 0 ? variant.weightGrams + 'g' : '', quantity: item.quantity, price: formatMoney(item.unitPrice), total: formatMoney(item.unitPrice * item.quantity) }
      }),
    }
  })
}

export async function getOrders(): Promise<AccountOrder[]> {
  const userId = currentUserId()
  const orders = await accountRequest<OrderRecord[]>('/orders' + accountFilter('userId', userId))
  const owned = orders.filter((order) => order.userId === userId && order.checkoutStatus !== 'creating').sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  const result = await addOrderProducts(owned)
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng tải lại đơn hàng.')
  return result
}

export async function getOrder(id: string): Promise<AccountOrder> {
  const userId = currentUserId()
  const order = await accountRequest<OrderRecord>('/orders/' + encodeURIComponent(id))
  if (order.userId !== userId || currentUserId() !== userId || order.checkoutStatus === 'creating') throw new Error('Không tìm thấy đơn hàng đã hoàn tất của bạn.')
  const [result] = await addOrderProducts([order])
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng tải lại đơn hàng.')
  return result
}
