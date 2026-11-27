import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { config } from './config.ts'

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

export function createPaymentServer() {
  return createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://localhost')
    try {
      if (url.pathname === '/api/payments/vnpay/ipn' && request.method === 'GET') {
        json(response, { RspCode: '97', Message: 'Invalid signature' })
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
      json(response, { message: 'Không tìm thấy API.' }, 404)
    } catch (error) {
      json(response, { message: error instanceof Error ? error.message : 'Dịch vụ thanh toán chưa xử lý được yêu cầu.' }, 400)
    }
  })
}
