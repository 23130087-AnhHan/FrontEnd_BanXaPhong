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


export const orderStatusLabels = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', shipping: 'Đang giao', delivered: 'Đã giao', returned: 'Đã trả hàng', cancelled: 'Đã hủy' }
export const formatMoney = (amount: number) => amount.toLocaleString('vi-VN') + ' đ'
export const paymentStatusLabels: Record<string, string> = { unpaid: 'Chưa thanh toán', pending: 'Chờ thanh toán', paid: 'Đã thanh toán', failed: 'Thanh toán chưa thành công' }

export const cancelReasons = [
  { id: 'change-products', label: 'Tôi muốn thay đổi sản phẩm hoặc số lượng' },
  { id: 'change-address', label: 'Tôi muốn thay đổi địa chỉ nhận hàng' },
  { id: 'change-payment', label: 'Tôi muốn thay đổi phương thức thanh toán' },
  { id: 'duplicate-order', label: 'Tôi đã đặt trùng đơn hàng' },
  { id: 'no-longer-needed', label: 'Tôi không còn nhu cầu mua' },
  { id: 'other', label: 'Lý do khác' },
]

export interface CancelOrderInput {
  reasonId: string
  note: string
}

export function canCancelOrder(status: OrderRecord['status']) {
  return status === 'pending' || status === 'confirmed'
}

export async function cancelOrder(id: string, input: CancelOrderInput): Promise<OrderRecord> {
  const userId = currentUserId()
  const reason = cancelReasons.find((reason) => reason.id === input.reasonId)
  const note = input.note.trim()
  if (!reason) throw new Error('Vui lòng chọn lý do huỷ đơn.')
  if (note.length > 500) throw new Error('Ghi chú không được quá 500 ký tự.')
  if (reason.id === 'other' && !note) throw new Error('Vui lòng nhập ghi chú cho lý do khác.')

  const orderPath = '/orders/' + encodeURIComponent(id)
  const order = await accountRequest<OrderRecord>(orderPath)
  if (order.userId !== userId || order.checkoutStatus === 'creating') 
    throw new Error('Không tìm thấy đơn hàng')
  if (currentUserId() !== userId) 
    throw new Error('Tài khoản đã thay đổi')
  if (order.status === 'cancelled') 
    return order

  const cancelledAt = new Date().toISOString()
  const cancelledOrder = await accountRequest<OrderRecord>(orderPath, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'cancelled', cancelReason: reason.label, cancelNote: note || null, cancelledAt, updatedAt: cancelledAt }),
  })
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng tải lại đơn hàng.')
  return cancelledOrder
}

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
      update: order.status === 'cancelled' && order.cancelReason ? 'Đã huỷ: ' + order.cancelReason : orderStatusLabels[order.status],
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

export async function markOrderReturned(id: string): Promise<OrderRecord> {
  const userId = currentUserId()
  const orderPath = '/orders/' + encodeURIComponent(id)
  const order = await accountRequest<OrderRecord>(orderPath)
  if (order.userId !== userId || order.checkoutStatus === 'creating') {
    throw new Error('Không tìm thấy đơn hàng đã hoàn tất của bạn.')
  }
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng thử lại.')
  if (order.status !== 'delivered' && order.status !== 'returned') {
    throw new Error('Chỉ có thể gửi yêu cầu trả hàng cho đơn đã giao.')
  }
  if (order.status === 'returned') return order

  const updatedOrder = await accountRequest<OrderRecord>(orderPath, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'returned', updatedAt: new Date().toISOString() }),
  })
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng tải lại đơn hàng.')
  return updatedOrder
}
