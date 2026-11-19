import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h2>Trang không tìm thấy</h2>
      <p>Địa chỉ bạn truy cập không tồn tại.</p>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  )
}
