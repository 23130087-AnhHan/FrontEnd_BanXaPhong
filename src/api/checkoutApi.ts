import { accountRequest, currentUserId } from './accountApi'
import { createCheckoutOrder, findCheckout, cleanupOrderCart } from '../../shared/orderService.ts'
import type { CheckoutContext, CheckoutInput } from '../../shared/checkout.ts'

export { CHECKOUT_SHIPPING_FEE } from '../../shared/checkout.ts'
export type CodOrderInput = CheckoutInput

function context(): CheckoutContext {
  const userId = currentUserId()
  return { userId, request: accountRequest, checkUser: () => {
    if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng thử lại.')
  } }
}

export async function createCodOrder(input: CheckoutInput) {
  return createCheckoutOrder(input, 'cod', context())
}

export async function getCodCheckout(checkoutId: string) {
  const order = await findCheckout(checkoutId, 'cod', context())
  if (!order || order.checkoutStatus !== 'complete') throw new Error('Đơn hàng chưa được lưu đầy đủ. Vui lòng quay lại trang thanh toán để thử lại.')
  return order
}

export async function cleanupCodCart(orderId: string) {
  return cleanupOrderCart(orderId, context())
}
