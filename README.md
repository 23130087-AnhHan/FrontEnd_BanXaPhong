# Website bán xà phòng

Đồ án cuối kỳ FrontEnd, sử dụng React + Vite + JavaScript.

## Chạy dự án

```sh
npm ci
npm run dev
```

Dùng Node.js 22.12 trở lên. Nếu PowerShell chặn `npm.ps1`, thay `npm` bằng `npm.cmd`.

## Cấu trúc

```text
public/          # Tài nguyên tĩnh, truy cập trực tiếp bằng đường dẫn
src/
  assets/        # Hình ảnh, icon import trong code
  components/    # Thành phần dùng chung: Header, Footer, ProductCard...
  pages/         # Các trang: trang chủ, sản phẩm, giỏ hàng...
  data/          # Dữ liệu sản phẩm mẫu
  styles/        # CSS dùng chung
  App.jsx        # Component gốc, ghép các trang
  main.jsx       # Điểm khởi chạy React
```

Thư mục trống có `.gitkeep` để Git lưu lại. Nhóm tự thêm file khi triển khai chức năng.

Trước khi commit, chạy `npm run lint` và `npm run build`.
