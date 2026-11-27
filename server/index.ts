import { createPaymentServer } from './app.ts'
import { config } from './config.ts'

const server = createPaymentServer()
server.on('error', (error) => {
  console.error('Không khởi động được dịch vụ thanh toán:', error.message)
  process.exitCode = 1
})
server.listen(config.port, '127.0.0.1', () => {
  console.log('Dịch vụ thanh toán: http://localhost:' + config.port)
  console.log('IPN: /api/payments/vnpay/ipn')
})
