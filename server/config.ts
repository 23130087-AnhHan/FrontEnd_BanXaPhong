export const config = {
  port: Number(process.env.PAYMENT_PORT || 3002),
  apiUrl: process.env.JSON_SERVER_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  tmnCode: process.env.VNPAY_TMN_CODE || '',
  hashSecret: process.env.VNPAY_HASH_SECRET || '',
  paymentUrl: process.env.VNPAY_PAYMENT_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  returnUrl: process.env.VNPAY_RETURN_URL || 'http://localhost:5173/thanh-toan/vnpay/ket-qua',
}

export function requireVnpayConfig() {
  if (!config.tmnCode || !config.hashSecret) throw new Error('Chưa cấu hình TmnCode và HashSecret của VNPay Sandbox.')
  const url = new URL(config.paymentUrl)
  if (url.protocol !== 'https:' || !['sandbox.vnpayment.vn', 'pay.vnpaytest.vn'].includes(url.hostname)) {
    throw new Error('URL thanh toán phải thuộc môi trường VNPay Sandbox.')
  }
}
