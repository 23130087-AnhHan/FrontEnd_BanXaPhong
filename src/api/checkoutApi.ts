import { accountFilter, accountRequest, currentUserId, getAddresses } from './accountApi'
import { deleteCartItem, getCartItems } from './cartApi'
import type { CartItem } from './cartApi'
import type { OrderItem, OrderRecord } from './orderApi'
import type { ProductVariantData } from './productApi'

export const CHECKOUT_SHIPPING_FEE = 30000

export interface CodOrderInput {
  checkoutId: string
  items: CartItem[]
  shippingAddress: OrderRecord['shippingAddress'] & { email: string }
  addressId: string
  note: string
}

async function findCheckout(checkoutId: string, userId: string) {
  const orders = await accountRequest<OrderRecord[]>('/orders' + accountFilter('checkoutId', checkoutId))
  const order = orders[0]
  if (currentUserId() !== userId || (order && (order.userId !== userId || order.paymentMethod !== 'cod'))) {
    throw new Error('Không tìm thấy đơn COD của tài khoản này.')
  }
  return order
}

export async function getCodCheckout(checkoutId: string) {
  const order = await findCheckout(checkoutId, currentUserId())
  if (!order || order.checkoutStatus !== 'complete') throw new Error('Đơn hàng chưa được lưu đầy đủ. Vui lòng quay lại trang thanh toán để thử lại.')
  return order
}

export async function createCodOrder(input: CodOrderInput): Promise<OrderRecord> {
  const userId = currentUserId()
  if (!input.checkoutId || input.checkoutId.length > 100) throw new Error('Mã đặt hàng không hợp lệ.')
  const existing = await findCheckout(input.checkoutId, userId)
  if (existing?.checkoutStatus === 'complete') return existing

  const shippingAddress = {
    receiverName: input.shippingAddress.receiverName.trim(),
    receiverPhone: input.shippingAddress.receiverPhone.replace(/\s/g, ''),
    email: input.shippingAddress.email.trim(),
    province: input.shippingAddress.province.trim(),
    district: input.shippingAddress.district.trim(),
    ward: input.shippingAddress.ward.trim(),
    detailAddress: input.shippingAddress.detailAddress.trim(),
  }
  if (!shippingAddress.receiverName || !shippingAddress.province || !shippingAddress.ward || !shippingAddress.detailAddress || !/^(0\d{9}|\+84\d{9})$/.test(shippingAddress.receiverPhone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
    throw new Error('Vui lòng kiểm tra lại thông tin giao hàng.')
  }
  if (!input.items.length || new Set(input.items.map((item) => item.id)).size !== input.items.length) throw new Error('Vui lòng chọn sản phẩm trong giỏ hàng.')
  const productIds = input.items.map((item) => String(item.productId))
  const [cart, variants, products, addresses] = await Promise.all([
    getCartItems(userId),
    accountRequest<ProductVariantData[]>('/productVariants' + accountFilter('productId', productIds)),
    accountRequest<{ id: string }[]>('/products' + accountFilter('id', productIds)),
    getAddresses(),
  ])
  const orderItems = input.items.map((expected) => {
    const item = cart.find((item) => item.id === expected.id)
    if (!item || item.userId !== userId || String(item.productId) !== String(expected.productId) || item.quantity !== expected.quantity || item.price !== expected.price || item.unit !== expected.unit) {
      throw new Error('Giỏ hàng đã thay đổi. Vui lòng quay lại giỏ hàng và kiểm tra trước khi đặt đơn.')
    }
    const choices = variants.filter((variant) => variant.productId === String(item.productId))
    const weight = /^\d+\s*g$/i.test(item.unit) ? parseInt(item.unit, 10) : null
    const variant = weight === null ? choices.find((choice) => choice.isDefault) : choices.find((choice) => choice.weightGrams === weight)
    if (!products.some((product) => product.id === String(item.productId)) || !variant || variant.price !== item.price) {
      throw new Error('Sản phẩm hoặc giá bán đã thay đổi. Vui lòng xóa và thêm lại sản phẩm trong giỏ hàng.')
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || item.quantity > variant.stock || !Number.isFinite(item.price) || item.price < 0) {
      throw new Error('Số lượng sản phẩm không hợp lệ hoặc vượt quá số lượng còn hàng.')
    }
    return { cartItemId: item.id, productId: String(item.productId), variantId: variant.id, unitPrice: item.price, quantity: item.quantity }
  })
  const now = new Date().toISOString()
  const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const order = {
    userId, checkoutId: input.checkoutId, checkoutStatus: 'creating' as const,
    addressId: addresses.some((address) => address.id === input.addressId) ? input.addressId : null,
    voucherId: null, shippingAddress, status: 'pending' as const, paymentMethod: 'cod', paymentStatus: 'unpaid',
    shippingMethod: 'standard', shippingCarrier: null, trackingCode: null, estimatedDeliveryAt: null,
    subtotal, shippingFee: CHECKOUT_SHIPPING_FEE, discount: 0, totalAmount: subtotal + CHECKOUT_SHIPPING_FEE,
    note: input.note.trim().slice(0, 1000) || null, cancelReason: null, cancelNote: null, cancelledAt: null, createdAt: now, updatedAt: now,
  }
  try {
    if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
    const savedOrder = await accountRequest<OrderRecord>('/orders' + (existing ? '/' + encodeURIComponent(existing.id) : ''), {
      method: existing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order),
    })
    const savedItems = await accountRequest<OrderItem[]>('/orderItems' + accountFilter('orderId', savedOrder.id))
    for (const item of savedItems.filter((saved) => !orderItems.some((item) => item.cartItemId === saved.cartItemId))) {
      if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
      await accountRequest('/orderItems/' + encodeURIComponent(item.id), { method: 'DELETE' })
    }
    for (const item of orderItems) {
      if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
      const saved = savedItems.find((saved) => saved.cartItemId === item.cartItemId)
      await accountRequest('/orderItems' + (saved ? '/' + encodeURIComponent(saved.id) : ''), {
        method: saved ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, orderId: savedOrder.id }),
      })
    }
    if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
    const confirmedItems = await accountRequest<OrderItem[]>('/orderItems' + accountFilter('orderId', savedOrder.id))
    if (confirmedItems.length !== orderItems.length || !orderItems.every((item) => confirmedItems.some((saved) => saved.cartItemId === item.cartItemId && saved.productId === item.productId && saved.variantId === item.variantId && saved.quantity === item.quantity && saved.unitPrice === item.unitPrice))) {
      throw new Error('Chưa lưu đủ sản phẩm của đơn hàng. Vui lòng thử lại.')
    }
    if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
    return await accountRequest<OrderRecord>('/orders/' + encodeURIComponent(savedOrder.id), {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ checkoutStatus: 'complete' }),
    })
  } catch (error) {
    try {
      const saved = await findCheckout(input.checkoutId, userId)
      if (saved?.checkoutStatus === 'complete') return saved
      if (saved) {
        const items = await accountRequest<OrderItem[]>('/orderItems' + accountFilter('orderId', saved.id))
        for (const item of items) {
          if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
          await accountRequest('/orderItems/' + encodeURIComponent(item.id), { method: 'DELETE' })
        }
        if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
        await accountRequest('/orders/' + encodeURIComponent(saved.id), { method: 'DELETE' })
      }
    } catch {}
    throw error
  }
}

export async function cleanupCodCart(orderId: string) {
  const userId = currentUserId()
  const order = await accountRequest<OrderRecord>('/orders/' + encodeURIComponent(orderId))
  if (order.userId !== userId || currentUserId() !== userId || order.paymentMethod !== 'cod' || order.checkoutStatus !== 'complete') throw new Error('Chưa tìm thấy đơn COD đã hoàn tất của bạn.')
  if (order.status === 'cancelled') return { removedIds: [] as string[], incomplete: true }
  const [items, cart] = await Promise.all([
    accountRequest<OrderItem[]>('/orderItems' + accountFilter('orderId', orderId)), getCartItems(userId),
  ])
  const removedIds: string[] = []
  let incomplete = false
  for (const item of items) {
    if (!item.cartItemId) continue
    const current = cart.find((entry) => entry.id === item.cartItemId)
    if (!current) { removedIds.push(item.cartItemId); continue }
    if (String(current.productId) !== item.productId || current.quantity !== item.quantity || current.price !== item.unitPrice) { incomplete = true; continue }
    try {
      if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi.')
      await deleteCartItem(current.id)
      removedIds.push(current.id)
    } catch { incomplete = true }
  }
  return { removedIds, incomplete }
}
