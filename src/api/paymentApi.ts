import { currentUserId } from './accountApi'
import type { CheckoutInput } from '../../shared/checkout.ts'

export interface PaymentResult {
  orderId: string
  paymentStatus: string
  cartCleanupPending: boolean
  gatewayResult?: 'success' | 'cancelled' | 'failed'
  canRetry?: boolean
  canResume?: boolean
}

export interface PaymentRedirect {
  orderId: string
  paymentUrl?: string
  paid?: boolean
}

async function paymentRequest<T>(path: string, data?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const userId = currentUserId()
  let response: Response
  try {
    response = await fetch('/api/payments/vnpay/' + path + (data ? '' : (path.includes('?') ? '&' : '?') + 'userId=' + encodeURIComponent(userId)), data ? {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, userId }), signal,
    } : { signal })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Chưa kết nối được dịch vụ thanh toán. Vui lòng kiểm tra npm run payment.')
  }
  const result = await response.json().catch(() => null)
  if (!response.ok || !result) throw new Error(result?.message || 'Chưa xử lý được thanh toán. Vui lòng thử lại.')
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng đăng nhập lại.')
  return result
}

export const startVnpay = (checkout: CheckoutInput) => paymentRequest<PaymentRedirect>('start', { checkout })
export const retryVnpay = (orderId: string, returnQuery?: string) => paymentRequest<PaymentRedirect>('create', { orderId, returnQuery })
export const verifyVnpayReturn = (query: string, signal?: AbortSignal) => paymentRequest<PaymentResult>('verify-return', { query }, signal)
export const getVnpayStatus = (orderId: string, signal?: AbortSignal) => paymentRequest<PaymentResult>('status?orderId=' + encodeURIComponent(orderId), undefined, signal)
export const getVnpayCheckout = (checkoutId: string, signal?: AbortSignal) => paymentRequest<PaymentResult>('checkout?checkoutId=' + encodeURIComponent(checkoutId), undefined, signal)
export const finalizeVnpay = (orderId: string) => paymentRequest<{ incomplete: boolean }>('finalize', { orderId })

export function openVnpay(result: PaymentRedirect) {
  if (!result.paymentUrl) throw new Error('Chưa nhận được đường dẫn thanh toán VNPay.')
  const url = new URL(result.paymentUrl)
  if (url.protocol !== 'https:' || !['sandbox.vnpayment.vn', 'pay.vnpaytest.vn'].includes(url.hostname)) throw new Error('Đường dẫn VNPay Sandbox không hợp lệ.')
  window.location.assign(url.href)
}
