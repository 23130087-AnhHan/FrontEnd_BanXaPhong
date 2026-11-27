# VNPay Sandbox

Dịch vụ Node ký URL và xác thực thông báo VNPay. React hiển thị giao diện, JSON Server lưu dữ liệu đồ án. Phần đăng nhập vẫn là tài khoản giả lập của dự án, chưa phải hệ thống xác thực để nhận tiền thật.

## Chạy trên máy

Dùng Node từ 22.12, khuyến nghị Node 24. Mở ba terminal tại thư mục dự án:

```bash
npm run server
```

```bash
npm run payment
```

```bash
npm run dev
```

Chưa có cấu hình VNPay vẫn chạy được dịch vụ và IPN. Thao tác thanh toán sẽ báo thiếu cấu hình và không tạo đơn mới.

## Đăng ký môi trường test

Máy cần có `cloudflared`. Khi dịch vụ payment đang chạy, mở thêm terminal:

```bash
npm run payment:tunnel
```

Lấy URL HTTPS do Cloudflare in ra và thêm `/api/payments/vnpay/ipn`. Đây là IPN URL để điền trong form đăng ký VNPay. Cổng 3003 chỉ nhận IPN; không đưa cổng JSON Server 3001 hoặc API riêng 3002 ra Internet. Giữ terminal tunnel chạy để VNPay gọi được. URL thử nghiệm thay đổi khi chạy lại tunnel; cần cập nhật IPN trong cấu hình merchant khi URL đổi.

Sau khi được cấp thông tin, tạo file `server/.env` và điền cấu hình riêng:

```dotenv
VNPAY_TMN_CODE=ma_website_duoc_cap
VNPAY_HASH_SECRET=khoa_bi_mat_duoc_cap
VNPAY_PAYMENT_URL=https://sandbox.vnpaytest.vn/paymentv2/vpcpay.html
```

URL thanh toán cần khớp email do VNPay cấp. `VNPAY_RETURN_URL` mặc định quay về React ở `http://localhost:5173/thanh-toan/vnpay/ket-qua`. Nếu Vite chạy cổng khác, thêm `FRONTEND_URL` và `VNPAY_RETURN_URL` tương ứng vào file cấu hình. Khởi động lại `npm run payment` sau khi sửa.

`server/.env` được Git bỏ qua. Không đưa HashSecret vào biến `VITE_`, mã frontend hay commit.

## Luồng xử lý

- Node đọc giỏ hàng và danh mục từ JSON Server, tính tiền và tạo đơn VNPay chưa thanh toán. Phí giao hàng giữ nguyên 30.000đ.
- URL gửi tới VNPay có chữ ký HMAC-SHA512, số tiền nhân 100, mã giao dịch riêng và thời hạn 15 phút.
- Return URL chỉ kiểm tra và hiển thị kết quả. IPN kiểm tra chữ ký, merchant, mã giao dịch và số tiền trước khi cập nhật thanh toán.
- IPN thành công đánh dấu đơn đã thanh toán rồi dọn đúng sản phẩm đã đặt. Nếu giỏ đã thay đổi hoặc dọn thất bại, giữ sản phẩm và hiển thị thông báo để kiểm tra lại.
- Thanh toán lại từ kết quả hủy/thất bại hợp lệ tạo mã giao dịch mới cho cùng đơn. Giao dịch còn chờ dùng lại URL chưa hết hạn. Trường hợp hết hạn nhưng chưa có kết quả xác nhận sẽ được giữ chờ đối soát, không tự đánh dấu thất bại hoặc thu tiền lại.

## Kiểm tra

```bash
npm run typecheck
npm run build
```

Sau khi có cấu hình merchant và IPN công khai, kiểm tra trên cổng Sandbox: thành công, hủy, thất bại và lịch sử đơn. Không dùng thẻ thật.

Tài liệu: [VNPay PAY](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html), [Cloudflare Quick Tunnel](https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/).
