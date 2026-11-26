import type { ShippingDetails } from './components/ShippingForm'

export type PaymentMethod = 'vnpay' | 'cod'

export interface CheckoutDraft {
  cartItemIds: string[]
  shipping: ShippingDetails | null
  addressId: string
  paymentMethod: PaymentMethod
  note: string
  checkoutId?: string
}

export function readCheckoutDraft(userId: string): CheckoutDraft {
  const empty: CheckoutDraft = { cartItemIds: [], shipping: null, addressId: '', paymentMethod: 'cod', note: '' }
  try {
    const draft = JSON.parse(sessionStorage.getItem('saponi-checkout:' + userId) ?? 'null') as CheckoutDraft | null
    const fields: (keyof ShippingDetails)[] = ['receiverName', 'receiverPhone', 'email', 'province', 'district', 'ward', 'detailAddress']
    if (!draft || !Array.isArray(draft.cartItemIds) || !draft.cartItemIds.every((id) => typeof id === 'string') || typeof draft.addressId !== 'string' || typeof draft.note !== 'string' || !['vnpay', 'cod'].includes(draft.paymentMethod)) return empty
    if (draft.shipping !== null && (!draft.shipping || !fields.every((field) => typeof draft.shipping?.[field] === 'string'))) return empty
    return { cartItemIds: [...new Set(draft.cartItemIds)], shipping: draft.shipping, addressId: draft.addressId, paymentMethod: draft.paymentMethod, note: draft.note, checkoutId: typeof draft.checkoutId === 'string' ? draft.checkoutId : undefined }
  } catch {
    return empty
  }
}

export function clearCheckoutDraft(userId: string) {
  try { sessionStorage.removeItem('saponi-checkout:' + userId) } catch {}
}

export function saveCheckoutDraft(userId: string, draft: CheckoutDraft) {
  try {
    sessionStorage.setItem('saponi-checkout:' + userId, JSON.stringify(draft))
  } catch {
    return
  }
}
