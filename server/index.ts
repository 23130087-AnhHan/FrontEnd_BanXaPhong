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

const ipnServer = createPaymentServer(true)
ipnServer.on('error', (error) => {
  console.error('Không khởi động được cổng IPN:', error.message)
  process.exitCode = 1
})
ipnServer.listen(config.ipnPort, '127.0.0.1', () => {
  console.log('Cổng IPN dành cho tunnel: http://127.0.0.1:' + config.ipnPort)
})
