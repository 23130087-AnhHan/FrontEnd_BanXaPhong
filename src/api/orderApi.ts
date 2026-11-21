import { accountFilter, accountRequest, currentUserId } from './accountApi'
import type { Address } from './accountApi'
import { fetchProductsWithImages } from './productApi'
import type { ProductVariantData } from './productApi'

export interface AccountOrder {
  id: string
  userId: string
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled'
  shippingAddress: Pick<Address, 'receiverName' | 'receiverPhone' | 'province' | 'district' | 'ward' | 'detailAddress'>
  paymentMethod: string
  paymentStatus: string
  shippingMethod: string
  shippingCarrier: string | null
  subtotal: number
  shippingFee: number
  discount: number
  totalAmount: number
  note: string | null
  createdAt: string
  estimatedDeliveryAt: string | null
  date: string
  quantity: number
  total: string
  update: string
  products: { id: string; name: string; image: string; weight: string; quantity: number; price: string; total: string }[]
}

type OrderRecord = Omit<AccountOrder, 'date' | 'quantity' | 'total' | 'update' | 'products'>
interface OrderItem { id: string; orderId: string; productId: string; variantId: string; unitPrice: number; quantity: number }

export const orderStatusLabels = { pending: 'Chờ xác nhận', shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }
export const formatMoney = (amount: number) => amount.toLocaleString('vi-VN') + ' đ'

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
        return { id: item.id, name: product?.name ?? 'Sản phẩm không còn trong danh mục', image: product?.image ?? '', weight: variant ? variant.weightGrams + 'g' : 'Chưa cập nhật', quantity: item.quantity, price: formatMoney(item.unitPrice), total: formatMoney(item.unitPrice * item.quantity) }
      }),
    }
  })
}

export async function getOrders(): Promise<AccountOrder[]> {
  const userId = currentUserId()
  const orders = await accountRequest<OrderRecord[]>('/orders' + accountFilter('userId', userId))
  const owned = orders.filter((order) => order.userId === userId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  return addOrderProducts(owned)
}

export async function getOrder(id: string): Promise<AccountOrder> {
  const order = await accountRequest<OrderRecord>('/orders/' + encodeURIComponent(id))
  if (order.userId !== currentUserId()) throw new Error('Không tìm thấy đơn hàng của bạn.')
  const [result] = await addOrderProducts([order])
  return result
}
