export type PaymentMethod = 'cod' | 'vnpay'

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

export interface ShippingAddress {
  receiverName: string
  receiverPhone: string
  province: string
  district: string
  ward: string
  detailAddress: string
  email?: string
}

export interface PaymentAttempt {
  txnRef: string
  amount: number
  expiresAt: string
  paymentUrl: string
  status: 'pending' | 'paid' | 'failed'
  responseCode?: string
  transactionNo?: string
}

export interface OrderRecord {
  id: string
  userId: string
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'returned' | 'cancelled'
  shippingAddress: ShippingAddress
  addressId?: string | null
  paymentMethod: string
  paymentStatus: string
  shippingMethod: string
  shippingCarrier: string | null
  subtotal: number
  shippingFee: number
  discount: number
  totalAmount: number
  note: string | null
  cancelReason?: string | null
  cancelNote?: string | null
  cancelledAt?: string | null
  updatedAt?: string
  createdAt: string
  estimatedDeliveryAt: string | null
  checkoutId?: string
  checkoutStatus?: 'creating' | 'complete'
  vnpayAttempts?: PaymentAttempt[]
  cartCleanupPending?: boolean
  paymentTransactionNo?: string
  paymentPaidAt?: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  variantId: string
  unitPrice: number
  quantity: number
  cartItemId?: string | null
}

export interface CheckoutInput {
  checkoutId: string
  items: CartItem[]
  shippingAddress: ShippingAddress & { email: string }
  addressId: string
  note: string
}

export interface CheckoutContext {
  userId: string
  request: <T>(path: string, options?: RequestInit) => Promise<T>
  checkUser: () => void
}

export interface CheckoutVariant {
  id: string
  productId: string
  weightGrams: number
  price: number
  stock: number
  isDefault: boolean
}

export const CHECKOUT_SHIPPING_FEE = 30000

export function filterBy(field: string, value: string | string[]) {
  return '?_where=' + encodeURIComponent(JSON.stringify({ [field]: Array.isArray(value) ? { in: value } : { eq: value } }))
}
