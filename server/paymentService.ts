import { randomUUID } from 'node:crypto'
import { config, requireVnpayConfig } from './config.ts'
import { signedParams, verifyCallback, vnpayDate, isRetryable } from './vnpay.ts'
import { createCheckoutOrder, cleanupOrderCart, findCheckout } from '../shared/orderService.ts'
import { filterBy, CHECKOUT_SHIPPING_FEE } from '../shared/checkout.ts'
import type { CheckoutInput, CheckoutContext, OrderItem, OrderRecord, PaymentAttempt } from '../shared/checkout.ts'

export async function dbRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(config.apiUrl + path, { ...options, signal: AbortSignal.timeout(10000) })
  if (!response.ok) throw new Error('Chưa đọc hoặc lưu được dữ liệu đơn hàng. Vui lòng thử lại.')
  return response.status === 204 ? undefined as T : response.json()
}

export function orderContext(userId: string): CheckoutContext {
  return { userId, request: dbRequest, checkUser: () => {} }
}

async function ownedOrder(orderId: string, userId: string) {
  if (!orderId || !userId) throw new Error('Vui lòng đăng nhập và chọn đơn hàng.')
  const order = await dbRequest<OrderRecord>('/orders/' + encodeURIComponent(orderId))
  if (order.userId !== userId || order.paymentMethod !== 'vnpay' || order.checkoutStatus !== 'complete') throw new Error('Không tìm thấy đơn VNPay của tài khoản này.')
  return order
}

export async function patchOrder(orderId: string, data: Partial<OrderRecord>) {
  return dbRequest<OrderRecord>('/orders/' + encodeURIComponent(orderId), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
}

function matchAttempt(order: OrderRecord, params: Record<string, string>) {
  const attempt = order.vnpayAttempts?.find((attempt) => attempt.txnRef === params.vnp_TxnRef)
  if (!attempt || Number(params.vnp_Amount) !== attempt.amount * 100 || attempt.amount !== order.totalAmount) throw new Error('Mã giao dịch hoặc số tiền VNPay không khớp đơn hàng.')
  return attempt
}

export async function paymentStatus(orderId: string, userId: string) {
  const order = await ownedOrder(orderId, userId)
  const attempt = order.vnpayAttempts?.at(-1)
  return {
    orderId: order.id, paymentStatus: order.paymentStatus, cartCleanupPending: Boolean(order.cartCleanupPending),
    canRetry: order.status === 'pending' && order.paymentStatus !== 'paid' && attempt?.status === 'failed',
    canResume: order.status === 'pending' && order.paymentStatus !== 'paid' && attempt?.status === 'pending' && Date.parse(attempt.expiresAt) > Date.now(),
  }
}

export async function checkoutStatus(checkoutId: string, userId: string) {
  const order = await findCheckout(checkoutId, 'vnpay', orderContext(userId))
  if (!order || order.checkoutStatus !== 'complete') throw new Error('Chưa tìm thấy đơn VNPay đã tạo. Vui lòng quay lại trang thanh toán.')
  return paymentStatus(order.id, userId)
}

export async function verifyReturn(query: string, userId: string) {
  const params = verifyCallback(query)
  const orders = await dbRequest<OrderRecord[]>('/orders' + filterBy('userId', userId))
  const candidate = orders.find((order) => order.vnpayAttempts?.some((attempt) => attempt.txnRef === params.vnp_TxnRef))
  if (!candidate) throw new Error('Không tìm thấy giao dịch của tài khoản này.')
  const order = await ownedOrder(candidate.id, userId)
  matchAttempt(order, params)
  return {
    ...await paymentStatus(order.id, userId),
    canResume: false,
    gatewayResult: params.vnp_ResponseCode === '00' && params.vnp_TransactionStatus === '00' ? 'success' : params.vnp_ResponseCode === '24' ? 'cancelled' : 'failed',
    canRetry: order.paymentStatus !== 'paid' && order.status !== 'cancelled' && order.vnpayAttempts?.at(-1)?.txnRef === params.vnp_TxnRef && isRetryable(params),
  }
}

export async function createPayment(orderId: string, userId: string, ipAddress: string, returnQuery?: string) {
  requireVnpayConfig()
  const order = await ownedOrder(orderId, userId)
  if (order.paymentStatus === 'paid') return { orderId: order.id, paid: true }
  if (order.status !== 'pending') throw new Error('Đơn hàng này không còn chờ thanh toán.')
  const items = await dbRequest<OrderItem[]>('/orderItems' + filterBy('orderId', order.id))
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  if (!items.length || items.some((item) => !Number.isInteger(item.quantity) || item.quantity < 1 || !Number.isSafeInteger(item.unitPrice) || item.unitPrice < 0) || subtotal !== order.subtotal || order.shippingFee !== CHECKOUT_SHIPPING_FEE || order.discount !== 0 || subtotal + order.shippingFee !== order.totalAmount || !Number.isSafeInteger(order.totalAmount * 100) || order.totalAmount <= 0 || order.totalAmount * 100 > 999999999999) {
    throw new Error('Số tiền hoặc sản phẩm trong đơn hàng không hợp lệ.')
  }
  const attempts = order.vnpayAttempts || []
  const previous = attempts.at(-1)
  if (returnQuery) {
    const params = verifyCallback(returnQuery)
    matchAttempt(order, params)
    if (previous?.txnRef !== params.vnp_TxnRef || !isRetryable(params)) throw new Error('Giao dịch đang chờ xác nhận. Vui lòng kiểm tra kết quả trước khi thanh toán lại.')
  } else if (previous?.status === 'pending') {
    if (Date.parse(previous.expiresAt) > Date.now()) return { orderId: order.id, paymentUrl: previous.paymentUrl }
    throw new Error('Giao dịch đã hết hạn và đang chờ đối soát. Vui lòng kiểm tra lại kết quả thanh toán.')
  }
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000)
  const txnRef = 'SPN' + randomUUID().replaceAll('-', '')
  const params = {
    vnp_Version: '2.1.0', vnp_Command: 'pay', vnp_TmnCode: config.tmnCode, vnp_Amount: String(order.totalAmount * 100),
    vnp_CreateDate: vnpayDate(now), vnp_ExpireDate: vnpayDate(expiresAt), vnp_CurrCode: 'VND',
    vnp_IpAddr: ipAddress.replace(/^::ffff:/, ''), vnp_Locale: 'vn', vnp_OrderInfo: 'Thanh toan don hang ' + order.id,
    vnp_OrderType: 'other', vnp_ReturnUrl: config.returnUrl, vnp_TxnRef: txnRef,
  }
  const paymentUrl = config.paymentUrl + '?' + signedParams(params)
  const attempt: PaymentAttempt = { txnRef, amount: order.totalAmount, expiresAt: expiresAt.toISOString(), paymentUrl, status: 'pending' }
  await patchOrder(order.id, { vnpayAttempts: [...attempts, attempt], paymentStatus: 'pending' })
  return { orderId: order.id, paymentUrl }
}

export async function startPayment(input: CheckoutInput, userId: string, ipAddress: string) {
  requireVnpayConfig()
  const user = await dbRequest<{ id: string }>('/users/' + encodeURIComponent(userId))
  if (user.id !== userId) throw new Error('Vui lòng đăng nhập lại.')
  const order = await createCheckoutOrder(input, 'vnpay', orderContext(userId))
  if (order.paymentStatus !== 'paid') {
    const items = await dbRequest<OrderItem[]>('/orderItems' + filterBy('orderId', order.id))
    if (items.length !== input.items.length || !input.items.every((item) => items.some((saved) => saved.cartItemId === item.id && saved.quantity === item.quantity && saved.unitPrice === item.price && saved.productId === String(item.productId)))) {
      throw new Error('Đơn chờ thanh toán đã có thông tin khác. Vui lòng kiểm tra đơn trong lịch sử.')
    }
  }
  return createPayment(order.id, userId, ipAddress)
}

export async function finalizePayment(orderId: string, userId: string) {
  const order = await ownedOrder(orderId, userId)
  if (order.paymentStatus !== 'paid') throw new Error('Đơn hàng chưa được VNPay xác nhận thanh toán.')
  const result = await cleanupOrderCart(order.id, orderContext(userId))
  await patchOrder(order.id, { cartCleanupPending: result.incomplete })
  return result
}

let pending = Promise.resolve()
export function paymentTask<T>(run: () => Promise<T>) {
  const result = pending.then(run)
  pending = result.then(() => {}, () => {})
  return result
}
