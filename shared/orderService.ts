import { CHECKOUT_SHIPPING_FEE, filterBy } from './checkout.ts'
import type { CartItem, CheckoutContext, CheckoutInput, CheckoutVariant, OrderItem, OrderRecord, PaymentMethod } from './checkout.ts'

export async function findCheckout(checkoutId: string, method: PaymentMethod, context: CheckoutContext) {
  const { userId, request, checkUser } = context
  const orders = await request<OrderRecord[]>('/orders' + filterBy('checkoutId', checkoutId))
  const order = orders[0]
  checkUser()
  if (order && (order.userId !== userId || order.paymentMethod !== method)) {
    throw new Error('Không tìm thấy đơn hàng của tài khoản này.')
  }
  return order
}

export async function createCheckoutOrder(input: CheckoutInput, method: PaymentMethod, context: CheckoutContext): Promise<OrderRecord> {
  const { userId, request, checkUser } = context
  checkUser()
  if (!input.checkoutId || input.checkoutId.length > 100) throw new Error('Mã đặt hàng không hợp lệ.')
  const existing = await findCheckout(input.checkoutId, method, context)
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
    request<CartItem[]>('/cartItems' + filterBy('userId', userId)),
    request<CheckoutVariant[]>('/productVariants' + filterBy('productId', productIds)),
    request<{ id: string }[]>('/products' + filterBy('id', productIds)),
    request<{ id: string; userId: string }[]>('/addresses' + filterBy('userId', userId)),
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
    addressId: addresses.some((address) => address.id === input.addressId && address.userId === userId) ? input.addressId : null,
    voucherId: null, shippingAddress, status: 'pending' as const, paymentMethod: method, paymentStatus: 'unpaid',
    shippingMethod: 'standard', shippingCarrier: null, trackingCode: null, estimatedDeliveryAt: null,
    subtotal, shippingFee: CHECKOUT_SHIPPING_FEE, discount: 0, totalAmount: subtotal + CHECKOUT_SHIPPING_FEE,
    note: input.note.trim().slice(0, 1000) || null, cancelReason: null, cancelNote: null, cancelledAt: null, createdAt: now, updatedAt: now,
  }
  try {
    checkUser()
    const savedOrder = await request<OrderRecord>('/orders' + (existing ? '/' + encodeURIComponent(existing.id) : ''), {
      method: existing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order),
    })
    const savedItems = await request<OrderItem[]>('/orderItems' + filterBy('orderId', savedOrder.id))
    for (const item of savedItems.filter((saved) => !orderItems.some((item) => item.cartItemId === saved.cartItemId))) {
      checkUser()
      await request('/orderItems/' + encodeURIComponent(item.id), { method: 'DELETE' })
    }
    for (const item of orderItems) {
      checkUser()
      const saved = savedItems.find((saved) => saved.cartItemId === item.cartItemId)
      await request('/orderItems' + (saved ? '/' + encodeURIComponent(saved.id) : ''), {
        method: saved ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, orderId: savedOrder.id }),
      })
    }
    checkUser()
    const confirmedItems = await request<OrderItem[]>('/orderItems' + filterBy('orderId', savedOrder.id))
    if (confirmedItems.length !== orderItems.length || !orderItems.every((item) => confirmedItems.some((saved) => saved.cartItemId === item.cartItemId && saved.productId === item.productId && saved.variantId === item.variantId && saved.quantity === item.quantity && saved.unitPrice === item.unitPrice))) {
      throw new Error('Chưa lưu đủ sản phẩm của đơn hàng. Vui lòng thử lại.')
    }
    checkUser()
    return await request<OrderRecord>('/orders/' + encodeURIComponent(savedOrder.id), {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ checkoutStatus: 'complete' }),
    })
  } catch (error) {
    try {
      const saved = await findCheckout(input.checkoutId, method, context)
      if (saved?.checkoutStatus === 'complete') return saved
      if (saved) {
        const items = await request<OrderItem[]>('/orderItems' + filterBy('orderId', saved.id))
        for (const item of items) {
          checkUser()
          await request('/orderItems/' + encodeURIComponent(item.id), { method: 'DELETE' })
        }
        checkUser()
        await request('/orders/' + encodeURIComponent(saved.id), { method: 'DELETE' })
      }
    } catch {}
    throw error
  }
}

export async function cleanupOrderCart(orderId: string, context: CheckoutContext) {
  const { userId, request, checkUser } = context
  checkUser()
  const order = await request<OrderRecord>('/orders/' + encodeURIComponent(orderId))
  checkUser()
  if (order.userId !== userId || order.checkoutStatus !== 'complete' || (order.paymentMethod !== 'cod' && order.paymentStatus !== 'paid')) throw new Error('Chưa tìm thấy đơn hàng đã hoàn tất của bạn.')
  if (order.status === 'cancelled') return { removedIds: [] as string[], incomplete: true }
  const [items, cart] = await Promise.all([
    request<OrderItem[]>('/orderItems' + filterBy('orderId', orderId)), request<CartItem[]>('/cartItems' + filterBy('userId', userId)),
  ])
  const removedIds: string[] = []
  let incomplete = false
  for (const item of items) {
    if (!item.cartItemId) continue
    const current = cart.find((entry) => entry.id === item.cartItemId)
    if (!current) { removedIds.push(item.cartItemId); continue }
    if (current.userId !== userId || String(current.productId) !== item.productId || current.quantity !== item.quantity || current.price !== item.unitPrice) { incomplete = true; continue }
    try {
      checkUser()
      await request('/cartItems/' + encodeURIComponent(current.id), { method: 'DELETE' })
      removedIds.push(current.id)
    } catch { incomplete = true }
  }
  return { removedIds, incomplete }
}
