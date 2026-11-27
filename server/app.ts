import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { config } from './config.ts'
import { createPayment, startPayment, paymentStatus, checkoutStatus, verifyReturn, finalizePayment, handleIpn, paymentTask } from './paymentService.ts'
import type { CheckoutInput } from '../shared/checkout.ts'

export function json(response: ServerResponse, data: unknown, status = 200) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(data))
}

export async function readBody(request: IncomingMessage): Promise<Record<string, unknown>> {
  if (!request.headers['content-type']?.startsWith('application/json')) throw new Error('Yêu cầu phải có định dạng JSON.')
  let body = ''
  for await (const chunk of request) {
    body += chunk.toString()
    if (Buffer.byteLength(body) > 16384) throw new Error('Dữ liệu gửi lên quá lớn.')
  }
  const data: unknown = JSON.parse(body)
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Dữ liệu gửi lên không hợp lệ.')
  return data as Record<string, unknown>
}

export function createPaymentServer(ipnOnly = false) {
  return createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://localhost')
    try {
      if (url.pathname === '/api/payments/vnpay/ipn' && request.method === 'GET') {
        json(response, await paymentTask(() => handleIpn(url.search)))
        return
      }
      if (ipnOnly) {
        json(response, { message: 'Chỉ hỗ trợ IPN VNPay.' }, 404)
        return
      }
      const origin = request.headers.origin
      if (origin && origin !== new URL(config.frontendUrl).origin) {
        json(response, { message: 'Nguồn yêu cầu không được phép.' }, 403)
        return
      }
      if (request.method === 'GET' && url.pathname === '/api/payments/health') {
        json(response, { ready: Boolean(config.tmnCode && config.hashSecret) })
        return
      }
      if (request.method === 'GET' && url.pathname === '/api/payments/vnpay/status') {
        json(response, await paymentStatus(url.searchParams.get('orderId') || '', url.searchParams.get('userId') || ''))
        return
      }
      if (request.method === 'GET' && url.pathname === '/api/payments/vnpay/checkout') {
        json(response, await checkoutStatus(url.searchParams.get('checkoutId') || '', url.searchParams.get('userId') || ''))
        return
      }
      if (request.method === 'POST' && url.pathname.startsWith('/api/payments/vnpay/')) {
        const body = await readBody(request)
        const userId = typeof body.userId === 'string' ? body.userId : ''
        if (!userId) throw new Error('Vui lòng đăng nhập để thanh toán.')
        const ip = request.socket.remoteAddress || '127.0.0.1'
        switch (url.pathname) {
          case '/api/payments/vnpay/start':
            json(response, await paymentTask(() => startPayment(body.checkout as CheckoutInput, userId, ip)))
            return
          case '/api/payments/vnpay/create':
            json(response, await paymentTask(() => createPayment(String(body.orderId || ''), userId, ip, typeof body.returnQuery === 'string' ? body.returnQuery : undefined)))
            return
          case '/api/payments/vnpay/verify-return':
            json(response, await verifyReturn(String(body.query || ''), userId))
            return
          case '/api/payments/vnpay/finalize':
            json(response, await paymentTask(() => finalizePayment(String(body.orderId || ''), userId)))
            return
        }
      }
      json(response, { message: 'Không tìm thấy API.' }, 404)
    } catch (error) {
      json(response, { message: error instanceof Error ? error.message : 'Dịch vụ thanh toán chưa xử lý được yêu cầu.' }, 400)
    }
  })
}
