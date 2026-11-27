import { createHmac, timingSafeEqual } from 'node:crypto'
import { config, requireVnpayConfig } from './config.ts'

export function encodeParams(params: Record<string, string>) {
  return Object.keys(params).sort().map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]).replace(/%20/g, '+')).join('&')
}

export function signedParams(params: Record<string, string>) {
  const query = encodeParams(params)
  return query + '&vnp_SecureHash=' + createHmac('sha512', config.hashSecret).update(query).digest('hex')
}

export function verifyCallback(query: string) {
  requireVnpayConfig()
  const search = new URLSearchParams(query)
  const params: Record<string, string> = {}
  for (const [key, value] of search) {
    if (!key.startsWith('vnp_')) continue
    if (Object.hasOwn(params, key)) throw new Error('Tham số VNPay bị trùng.')
    params[key] = value
  }
  const signature = params.vnp_SecureHash || ''
  delete params.vnp_SecureHash
  delete params.vnp_SecureHashType
  const expected = createHmac('sha512', config.hashSecret).update(encodeParams(params)).digest()
  if (!/^[a-f\d]{128}$/i.test(signature) || !timingSafeEqual(Buffer.from(signature, 'hex'), expected) || params.vnp_TmnCode !== config.tmnCode) {
    throw new Error('Chữ ký kết quả VNPay không hợp lệ.')
  }
  if (!params.vnp_TxnRef || (params.vnp_CurrCode && params.vnp_CurrCode !== 'VND') || !/^\d{1,12}$/.test(params.vnp_Amount || '') || !/^\d{2}$/.test(params.vnp_ResponseCode || '') || !/^\d{2}$/.test(params.vnp_TransactionStatus || '')) {
    throw new Error('Kết quả VNPay thiếu thông tin giao dịch.')
  }
  return params
}

export function vnpayDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(date)
  const value = (type: string) => parts.find((part) => part.type === type)?.value || ''
  return ['year', 'month', 'day', 'hour', 'minute', 'second'].map(value).join('')
}

export function isRetryable(params: Record<string, string>) {
  return ['09', '10', '11', '12', '13', '24', '51', '65', '75', '79'].includes(params.vnp_ResponseCode) && !['00', '04', '07'].includes(params.vnp_TransactionStatus)
}
